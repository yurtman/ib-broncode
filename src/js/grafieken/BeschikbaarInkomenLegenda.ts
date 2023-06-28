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

import { Legenda } from "./Legenda";

/**
 * Legenda voor tonen beschikbaar inkomen.
 */
export class BeschikbaarInkomenLegenda extends Legenda {
  constructor(berekenen: any) {
    super(berekenen);
  }

  setLegendaText(data: any, length: number, offset: number) {
    let totaal = 0;
    let b = super.berekenGetallen(data[offset]);
    let ld = {
      grafiek: [] as any,
      titel: "Beschikbaar inkomen",
      arbeidsInkomen: data[offset].id.toFixed(),
      totals: {} as any,
    };

    for (let j = 0; j < length; j++) {
      let entry = data[offset + j];
      let getal = entry.getal;
      totaal += getal;
      ld.grafiek.unshift({
        color: super.colorFunction(j),
        naam: entry.type,
        bedrag: super.geld(entry.getal),
      });
    }
    ld.totals = [
      { naam: "beschikbaar inkomen", bedrag: super.geld(totaal) },
      {
        naam: "bruto",
        bedrag: super.geld(b.arbeidsinkomen * super.berekenen.getFactor()),
      },
    ];
    super.legendaFunction(ld);
  }

  getLabelYAs() {
    return "Beschikbaar inkomen in x " + Legenda.EURO + " 1.000";
  }

  getFactorYas() {
    return 1 / 1000;
  }
}
