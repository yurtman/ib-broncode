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

export abstract class Grafiek<L extends Legenda> {
 
    maxY: number;

    constructor(maxY: number) {
        this.maxY = maxY;
    } 

    legenda: L;
    
    getLegenda() : L {
    if (this.legenda === undefined) {
        this.legenda = this.createLegenda();
    }
    return this.legenda;
    }

    abstract createLegenda() : L;

    getYDomain() : [number, number] {
      return [0, this.maxY];
    }
}