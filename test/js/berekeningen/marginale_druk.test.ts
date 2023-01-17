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

import { assert, expect, test } from 'vitest'
import algemeen from '../../../src/js/berekeningen/algemeen.js'
import bi from '../../../src/js/berekeningen/beschikbaar_inkomen.js'
import md from '../../../src/js/berekeningen/marginale_druk.js'

const vis = {periode:'jaar'};
const arbeidsinkomen = 46377;

test('Marginale Druk Details ', () => {
  const personen = [{leeftijd:'V'}];
  const wonen = {woning_type:'huur', huur:600};
  const algemeneGegevens = algemeen.berekenAlgemeneGegevens(vis, personen, wonen);
  const ai = 27800;
  const berekening1 = bi.berekenBeschikbaarInkomen(ai, personen, wonen, algemeneGegevens);
  const berekening2 = bi.berekenBeschikbaarInkomen(ai * 1.03, personen, wonen, algemeneGegevens);
  let mdd = md.marginaleDruk(berekening1, berekening2);

  // arbeidsinkomen + 3% = 47768,31
  // Δarbeidsinkomen = 1391,31
  /*
     "algemeneHeffingsKorting": 1540,
     "arbeidsinkomen": 47768.31,
     "arbeidskorting": 4396,
     "budget": 36148.31,
  */
  // delta arbeidsinkomen = 1391.31
  // budget = 513.31
  // md = 0.36894006368 = 36.89%
  // algemeneHeffingsKorting = (1540 - 1624) / 1391.31
  let expected = {
    arbeidsinkomen: ai * 0.03,
    nettoInkomensBelasting: 33.81,
    algemeneHeffingsKorting: 6.12,
    arbeidskorting: 0,
    zorgtoeslag: 13.55,
    wonen: 31.65,
    kinderbijslag: 0,
    kindgebondenBudget: 0,
    inkomensafhankelijkeCombinatiekorting: 0,
    marginaleDruk: 85.13,
    //budget: 35635,
  };

  expect(mdd).toEqual(expected);
  expect(mdd.nettoInkomensBelasting + mdd.algemeneHeffingsKorting + mdd.arbeidskorting + mdd.zorgtoeslag 
    + mdd.wonen + mdd.kinderbijslag + mdd.kindgebondenBudget + mdd.inkomensafhankelijkeCombinatiekorting)
    .toEqual(mdd.marginaleDruk);
})
