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
import { Berekenen } from "./Berekenen";
import { BeschikbaarInkomen } from "./BeschikbaarInkomen";
import { MarginaleDruk } from "./MarginaleDruk";
import { EffectieveBelasting } from "./EffectieveBelasting";
import { BlueminkBeschikbaarInkomen } from "../../bluemink/BlueminkBeschikbaarInkomen";
import { GrafiekType, LeeftijdType, PeriodeType, PersoonType, TabType, WonenType, WoningType } from "../../types";

const stap: number = 100;

function berekenGrafiekData(path: string, type: TabType, vis: GrafiekType, personen: PersoonType[], wonen: WoningType) {
  let berekenen: Berekenen = null;
  let bi =
    path == "/bluemink"
      ? new BlueminkBeschikbaarInkomen(vis, personen, wonen)
      : new BeschikbaarInkomen(vis, personen, wonen);

  switch (type) {
    case TabType.BI:
      berekenen = bi;
      break;
    case TabType.MD:
      berekenen = new MarginaleDruk(vis, personen, wonen, bi);
      break;
    case TabType.EB:
      berekenen = new EffectieveBelasting(vis, personen, wonen, bi);
      break;
  }
  let series = [];

  for (let i = vis.van_tot[0]; i <= vis.van_tot[1]; i += stap) {
    let id = Math.round(i * berekenen.factor);

    berekenen.verzamelGrafiekSeries(series, berekenen.bereken(i), id);
  }
  return { berekenen: berekenen, series: series };
}

export default {
  berekenGrafiekData,
};
