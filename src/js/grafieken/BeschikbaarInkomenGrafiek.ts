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

import functies from "../functies";
import { BeschikbaarInkomenLegenda } from "./BeschikbaarInkomenLegenda";
import { Legenda } from "./Legenda";

import { Grafiek} from "./Grafiek";

export class BeschikbaarInkomenGrafiek extends Grafiek<BeschikbaarInkomenLegenda> {
    
    createLegenda() : BeschikbaarInkomenLegenda {
      return new BeschikbaarInkomenLegenda(this);
    }
    
    getYDomain() : [number, number] {
        let yDomain = super.getYDomain();
    
        return [0, (Math.round(yDomain[1] / 1000))];
      }

      verzamelGrafiekSeries(alles, beschikbaarInkomen, id) {
        let factor = this.getFactor();
        if (beschikbaarInkomen.netto !== undefined) {
          alles.push({
            id: id,
            type: "netto",
            getal: functies.afronden(beschikbaarInkomen.netto, factor),
          });
        }
        alles.push(
          {
            id: id,
            type: "algemeneHeffingsKorting",
            getal: functies.afronden(
              beschikbaarInkomen.algemeneHeffingsKorting,
              factor
            ),
          },
          {
            id: id,
            type: "arbeidskorting",
            getal: functies.afronden(beschikbaarInkomen.arbeidskorting, factor),
          },
          {
            id: id,
            type: this.algemeneGegevens.huren
              ? "huurtoeslag"
              : "hypotheekrenteaftrek",
            getal: functies.afronden(beschikbaarInkomen.wonen, factor),
          },
          {
            id: id,
            type: "zorgtoeslag",
            getal: functies.afronden(beschikbaarInkomen.zorgtoeslag, factor),
          },
          {
            id: id,
            type: "kinderbijslag",
            getal: functies.afronden(beschikbaarInkomen.kinderbijslag, factor),
          },
          {
            id: id,
            type: "kindgebonden budget",
            getal: functies.afronden(beschikbaarInkomen.kindgebondenBudget, factor),
          },
          {
            id: id,
            type: "inkomenafh. combi krt",
            getal: functies.afronden(
              beschikbaarInkomen.inkomensafhankelijkeCombinatiekorting,
              factor
            ),
          }
        );
      }
    
}