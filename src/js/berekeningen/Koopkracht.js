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
import { BeschikbaarInkomen } from "@/js/berekeningen/BeschikbaarInkomen";
import { Berekenen } from "@/js/berekeningen/Berekenen";

const AVG_ZORG_PREMIE = 1600 + 180;
const AANTAL_MAANDEN = 12;

export class Koopkracht extends Berekenen {
  constructor(vis, personen, wonen, kosten, bi) {
    super(vis, personen, wonen, kosten);
    this.bi = bi;
    this.woonkosten = Math.floor(
      functies.isHuur(wonen) ? wonen.huur * AANTAL_MAANDEN : wonen.rente
    );
    this.zorgkosten = Math.floor(functies.telVolwassenen() * kosten.zorgpremie);
    this.totaalKosten = this.woonkosten + this.zorgkosten;
  }

  createLegenda() {
  }

  getYMax() {
    return 100;
  }

  bereken(arbeidsInkomen) {
    const berekening = this.berekenBeschikbaarInkomen(arbeidsInkomen);

    return {
      arbeidsinkomen: berekening.arbeidsinkomen,
      koopkracht: berekening.beschikbaarInkomen - this.totaalKosten,
      belastingPercentage: Math.floor(
        (arbeidsinkomen - koopkracht) / arbeidsinkomen
      ),
    };
  }

  verzamelGrafiekSeries(alles, gegevens, id) {
    alles.push({
      id: id,
      type: "algemeneHeffingsKorting",
      getal: afronden(gegevens.algemeneHeffingsKorting, this.getFactor()),
    });
  }
}
