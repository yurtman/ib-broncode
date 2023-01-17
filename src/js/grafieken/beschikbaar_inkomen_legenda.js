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

import { Legenda } from "@/js/grafieken/Legenda";

const LEGENDA_TEXT_OFFSET_X = 50;
const LEGENDA_TEXT_OFFSET_Y = 40;
const LEGENDA_TEXT_LENGTH = 23;

/**
 * Legenda in grafiek voor tonen beschikbaar inkomen.
 */
export class BeschikbaarInkomenLegenda extends Legenda {
  addLegenda(group, series, width, colorLegend) {
    let achtergrond = group
      .append("rect")
      .attr("width", 220)
      .attr("height", 170)
      .attr("x", LEGENDA_TEXT_OFFSET_X - 10)
      .attr("y", LEGENDA_TEXT_OFFSET_Y - 10)
      .attr("fill", "none");
    var bruto = this.appendLegendText(group);
    var hoverLines = [];
    var hoverColors = [];
    for (let i = 0; i < series.length; i++) {
      hoverLines[i] = this.appendLegendText(group);
      hoverColors[i] = group
        .append("circle")
        .style("stroke", "gray")
        .style("fill", colorLegend(i))
        .attr("r", 4);
    }
    var bottomLine = group.append("line").attr("stroke", "#777");
    var netto = this.appendLegendText(group);
    return {
      achtergrond: achtergrond,
      bruto: bruto,
      netto: netto,
      bottomLine: bottomLine,
      items: hoverLines,
      itemColors: hoverColors,
    };
  }

  padGeld(e, tekst, getal) {
    return super.padGeld(e, tekst, getal, LEGENDA_TEXT_LENGTH);
  }

  setLegendaText(legendaData, data, length, offset, d) {
    legendaData.achtergrond.attr("fill", "white");
    this.padGeld(legendaData.bruto, "ArbeidsInkomen", d["id"])
      .attr("x", LEGENDA_TEXT_OFFSET_X + 10)
      .attr("y", LEGENDA_TEXT_OFFSET_Y);

    let totaal = 0;
    for (let j = 0; j < length; j++) {
      let entry = data[offset + j];
      let getal = entry.getal;
      totaal += getal;
      this.padGeld(
        legendaData.items[j],
        entry.type,
        (getal + "").padStart(5, "\u00A0")
      )
        .attr("x", LEGENDA_TEXT_OFFSET_X + 10)
        .attr("y", LEGENDA_TEXT_OFFSET_Y + (length - j) * 15);
      legendaData.itemColors[j]
        .attr("cx", LEGENDA_TEXT_OFFSET_X)
        .attr("cy", LEGENDA_TEXT_OFFSET_Y + 3 + (length - j) * 15);
    }

    let totaal_y = LEGENDA_TEXT_OFFSET_Y + 13 + length * 15;
    legendaData.bottomLine
      .attr("x1", LEGENDA_TEXT_OFFSET_X - 5)
      .attr("y1", totaal_y)
      .attr("x2", LEGENDA_TEXT_OFFSET_X + 200)
      .attr("y2", totaal_y);

    this.padGeld(legendaData.netto, "beschikbaar inkomen", totaal)
      .attr("x", LEGENDA_TEXT_OFFSET_X + 10)
      .attr("y", totaal_y + 5);
  }

  getLabelYAs() {
    return "Beschikbaar inkomen in x " + Legenda.EURO + " 1.000";
  }

  getFactorYas() {
    return 1 / 1000;
  }
}
