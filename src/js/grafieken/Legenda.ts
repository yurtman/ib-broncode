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

export interface ColorFunction {
  (i: number): any;
}

export interface LegendaFunction {
  (data: any): void;
}

export interface UpdateFunction {
  (id: number): void;
}

/**
 * Basis class voor legenda in grafiek.
 */
export abstract class Legenda {
  static EURO = "€";

  berekenen: any;
  colorFunction: ColorFunction;
  legendaFunction: LegendaFunction;
  updateFunction: UpdateFunction;

  constructor(berekenen: any) {
    this.berekenen = berekenen;
  }

  setColorFunction(colorFunction: ColorFunction) {
    this.colorFunction = colorFunction;
  }

  setLegendaFunction(legendaFunction: LegendaFunction) {
    this.legendaFunction = legendaFunction;
  }

  setUpdateFunction(updateFunction: UpdateFunction) {
    this.updateFunction = updateFunction;
  }

  percentage(getal: number) : string {
    return (
      (getal > 0 ? (1 * getal).toFixed(2) : "-").padStart(5, "\u00A0") + " %"
    );
  }

  geld(bedrag: number) : string {
    return bedrag > 0
      ? Legenda.EURO + " " + bedrag.toFixed().padStart(4, "\u00A0")
      : "-";
  }

  setLegendaVast(data: any, length: number, offset: number) {
    this.berekenen.vis.arbeidsInkomen = data[offset].id;
    this.setLegendaText(data, length, offset);
  }

  abstract setLegendaText(data: any, length: number, offset: number): void;

  setGetal() {
    let ab = this.berekenen.vis.arbeidsInkomen;
    if (ab > 0) {
      let b = this.berekenen.bereken(ab);
      let id = ab * this.berekenen.getFactor();
      var data = [];
      this.berekenen.verzamelGrafiekSeries(data, b, id);
      this.setLegendaText(data, data.length, 0);
      this.updateFunction(id);
    }
  }

  berekenGetallen(entry: any) : any {
    return this.berekenen.bereken(entry.id / this.berekenen.getFactor());
  }

  getLabelYAs() : string {
    return "";
  }

  getFactorYas() : number {
    return 1;
  }
}
