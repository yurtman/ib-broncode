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

/**
 * Basis class voor legenda in grafiek.
 */
export class Legenda {
  static EURO = "€";

  appendLegendText(group) {
    return group
      .append("text")
      .attr("fill", "currentColor")
      .attr("dy", "0.55em")
      .attr("font-size", "10px")
      .attr("font-family", "courier new");
  }

  padGeld(e, tekst, getal, width) {
    return e.text(tekst.padEnd(width, ".") + " " + Legenda.EURO + " " + getal);
  }

  addLegenda(group, series, width, colorLegend) {}

  setLegendaText(legendaData, data, length, offset, d) {}

  getLabelYAs() {}

  getFactorYas() {}
}
