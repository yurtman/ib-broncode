/*
 * Copyright Hilbrand Bouwkamp
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/.
 */

import functies from "@/js/functies";

function mdPercentage(netto1, netto2, ΔBudget, inverse) {
  let ΔNetto = netto2 - netto1;
  let percentage = ΔBudget == 0 ? 0 : ΔNetto / ΔBudget;
  let result = (percentage * 100).toFixed(2);

  let relevantResult =
    isNaN(result) || result == 0 ? 0 : inverse ? -result : 1 * result;
  return relevantResult;
}

function inkomstenBelastingAangepast(berekening) {
  return (
    berekening.brutoInkomstenBelasting -
    (berekening.algemeneHeffingsKorting + berekening.arbeidskorting)
  );
}

function nettoInkomensBelasting(
  berekening1,
  berekening2,
  ΔBruto,
  ΔalgemeneHeffingsKortin,
  Δarbeidskorting,
  negativeSumΔtoeslagen
) {
  let nettoInkomensBelasting = mdPercentage(
    inkomstenBelastingAangepast(berekening1),
    inkomstenBelastingAangepast(berekening2),
    ΔBruto,
    false
  );

  return nettoInkomensBelasting - (ΔalgemeneHeffingsKortin + Δarbeidskorting);
}

function marginaleDrukTotaal(
  alles,
  berekening1,
  berekening2,
  arbeidsinkomen_grafiek
) {
  let ΔNetto = berekening2.beschikbaarInkomen - berekening1.beschikbaarInkomen;
  let ΔBruto = berekening2.arbeidsinkomen - berekening1.arbeidsinkomen;
  let md = ΔNetto > 0 ? (100 - (ΔNetto / ΔBruto) * 100).toFixed(2) : 0;

  alles.push({
    id: arbeidsinkomen_grafiek,
    type: "marginale druk",
    getal: isNaN(md) ? 0 : md,
  });
}

function belastingdruk(alles, berekening1, arbeidsinkomen_grafiek) {
  let belastingdruk =
    berekening1.arbeidsinkomen > 0
      ? functies.negatiefIsNul(
          100 -
            (berekening1.beschikbaarInkomen / berekening1.arbeidsinkomen) * 100
        )
      : 0;
  alles.push({
    id: arbeidsinkomen_grafiek,
    type: "belastingdruk",
    getal: belastingdruk < 0 ? 0 : belastingdruk.toFixed(2),
  });
}

function sumNegative(values) {
  return values.filter((v) => v < 0).reduce((a, b) => a + -b, 0);
}

function marginaleDruk(berekening1, berekening2) {
  let ΔNetto = berekening2.beschikbaarInkomen - berekening1.beschikbaarInkomen;
  let ΔBruto = berekening2.arbeidsinkomen - berekening1.arbeidsinkomen;
  let md =
    100 -
    mdPercentage(
      berekening1.beschikbaarInkomen,
      berekening2.beschikbaarInkomen,
      ΔBruto,
      false
    );

  let ΔalgemeneHeffingsKorting = functies.negatiefIsNul(
    mdPercentage(
      berekening1.algemeneHeffingsKorting,
      berekening2.algemeneHeffingsKorting,
      ΔBruto,
      true
    )
  );
  let Δarbeidskorting = functies.negatiefIsNul(
    mdPercentage(
      berekening1.arbeidskorting,
      berekening2.arbeidskorting,
      ΔBruto,
      true
    )
  );

  let Δtoeslagen = {
    zorgtoeslag: mdPercentage(
      berekening1.zorgtoeslag,
      berekening2.zorgtoeslag,
      ΔBruto,
      true
    ),
    wonen: mdPercentage(berekening1.wonen, berekening2.wonen, ΔBruto, true),
    kinderbijslag: mdPercentage(
      berekening1.kinderbijslag,
      berekening2.kinderbijslag,
      ΔBruto,
      true
    ),
    kindgebondenBudget: mdPercentage(
      berekening1.kindgebondenBudget,
      berekening2.kindgebondenBudget,
      ΔBruto,
      true
    ),
    inkomensafhankelijkeCombinatiekorting: mdPercentage(
      berekening1.inkomensafhankelijkeCombinatiekorting,
      berekening2.inkomensafhankelijkeCombinatiekorting,
      ΔBruto,
      true,
      true
    ),
  };
  let negativeSumΔtoeslagen = sumNegative([
    Δtoeslagen.zorgtoeslag,
    Δtoeslagen.wonen,
    Δtoeslagen.kinderbijslag,
    Δtoeslagen.kindgebondenBudget,
    Δtoeslagen.inkomensafhankelijkeCombinatiekorting,
  ]);

  let nib = nettoInkomensBelasting(
    berekening1,
    berekening2,
    ΔBruto,
    ΔalgemeneHeffingsKorting,
    Δarbeidskorting,
    negativeSumΔtoeslagen
  );
  let nettoInkomensBelastingNul = functies.negatiefIsNul(
    nib - negativeSumΔtoeslagen
  );

  return {
    arbeidsinkomen: berekening2.arbeidsinkomen - berekening1.arbeidsinkomen,
    nettoInkomensBelasting: nettoInkomensBelastingNul,
    algemeneHeffingsKorting: ΔalgemeneHeffingsKorting,
    arbeidskorting: Δarbeidskorting,
    zorgtoeslag: functies.negatiefIsNul(Δtoeslagen.zorgtoeslag),
    wonen: functies.negatiefIsNul(Δtoeslagen.wonen),
    kinderbijslag: functies.negatiefIsNul(Δtoeslagen.kinderbijslag),
    kindgebondenBudget: functies.negatiefIsNul(Δtoeslagen.kindgebondenBudget),
    inkomensafhankelijkeCombinatiekorting: functies.negatiefIsNul(
      Δtoeslagen.inkomensafhankelijkeCombinatiekorting
    ),
    marginaleDruk: md,
  };
}

export default {
  marginaleDruk,
};
