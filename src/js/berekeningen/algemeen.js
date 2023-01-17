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
import inkomen from "@/js/belasting/inkomen";
import iack from "@/js/belasting/inkomensafhankelijke_combinatiekorting";
import kbs from "@/js/belasting/kinderbijslag";
import kgb from "@/js/belasting/kindgebonden_budget";
import hra from "@/js/belasting/hypotheekrente_aftrek";
import bi from "@/js/berekeningen/beschikbaar_inkomen";
import md from "@/js/berekeningen/marginale_druk";

const stap = 100;

function factorBerekening(periode) {
  return "maand" == periode ? 1 / 12 : 1;
}

function afronden(getal, factor) {
  return (getal * factor).toFixed("2") * 1;
}

function berekenAlgemeneGegevens(vis, personen, wonen) {
  let toeslagenpartner = functies.toeslagenPartner(personen);
  let huren = wonen.woning_type == "huur";

  return {
    toeslagenpartner: toeslagenpartner,
    iacbInkomen: iack.bepaalLaagsteArbeidsInkomenAnderen(personen),
    kinderbijslag: kbs.kinderbijslag(personen),
    maxKindgebondenBudget: kgb.maxKindgebondenBudget(
      personen,
      toeslagenpartner
    ),
    nk: inkomen.nettoKortingenInkomens(personen),
    huren: huren,
    hypotheekRenteAftrek: huren
      ? 0
      : hra.hypotheekRenteAftrek(wonen.rente, wonen.woz),
  };
}

function budgetData(
  alles,
  berekening,
  arbeidsinkomen_grafiek,
  algemeneData,
  factor
) {
  if (berekening.netto !== undefined) {
    alles.push({
      id: arbeidsinkomen_grafiek,
      type: "netto",
      getal: afronden(berekening.netto, factor),
    });
  }
  if (berekening.nettoInkomensBelasting !== undefined) {
    alles.push({
      id: arbeidsinkomen_grafiek,
      type: "netto belasting",
      getal: afronden(berekening.nettoInkomensBelasting, factor),
    });
  }
  alles.push(
    {
      id: arbeidsinkomen_grafiek,
      type: "algemeneHeffingsKorting",
      getal: afronden(berekening.algemeneHeffingsKorting, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: "arbeidskorting",
      getal: afronden(berekening.arbeidskorting, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: algemeneData.huren ? "huurtoeslag" : "hypotheekrenteaftrek",
      getal: afronden(berekening.wonen, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: "zorgtoeslag",
      getal: afronden(berekening.zorgtoeslag, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: "kinderbijslag",
      getal: afronden(berekening.kinderbijslag, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: "kindgebonden budget",
      getal: afronden(berekening.kindgebondenBudget, factor),
    },
    {
      id: arbeidsinkomen_grafiek,
      type: "inkomenafh. combi krt",
      getal: afronden(berekening.inkomensafhankelijkeCombinatiekorting, factor),
    }
  );
}

function log(berekening, berekening2) {
  console.log("".padEnd(30, "."));
  console.log("berekening2.budget:" + berekening2.budget);
  console.log("berekening1.budget :" + berekening.budget);
  console.log("berekening2.arbeidsinkomen:" + berekening2.arbeidsinkomen);
  console.log("berekening1.arbeidsinkomen :" + berekening.arbeidsinkomen);
  console.log("berekening2:" + JSON.stringify(berekening2));
  console.log("berekening1:" + JSON.stringify(berekening));
}

function berekenGrafiekData(type, vis, personen, wonen) {
  let alles = [];
  let factor = factorBerekening(vis.periode);
  let algemeneData = berekenAlgemeneGegevens(vis, personen, wonen);

  for (let i = vis.ondergrens; i <= vis.bovengrens; i += stap) {
    let berekening = bi.berekenBeschikbaarInkomen(
      i,
      personen,
      wonen,
      algemeneData
    );
    let arbeidsinkomen_grafiek = Math.round(i * factor);

    if ("beschikbaar_inkomen_grafiek" == type) {
      budgetData(
        alles,
        berekening,
        arbeidsinkomen_grafiek,
        algemeneData,
        factor
      );
    } else if ("marginale_druk" == type) {
      console.log("vis.salarisVerhoging:" + vis.salarisVerhoging);
      //belastingdruk(alles, berekening, arbeidsinkomen_grafiek);
      let berekening2 = bi.berekenBeschikbaarInkomen(
        i + i * (vis.salarisVerhoging / 100),
        personen,
        wonen,
        algemeneData
      );

      //marginaleDruk(alles, berekening, berekening2, arbeidsinkomen_grafiek);
      budgetData(
        alles,
        md.marginaleDruk(berekening, berekening2, arbeidsinkomen_grafiek),
        arbeidsinkomen_grafiek,
        algemeneData,
        1 // bij marginale druk geen factor op percentage toepassen.
      );
    }
  }
  return alles;
}

export default {
  berekenAlgemeneGegevens,
  berekenGrafiekData,
};
