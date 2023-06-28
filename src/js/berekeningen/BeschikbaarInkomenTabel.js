import functies from "@/js/functies";
import { BeschikbaarInkomen } from "@/js/berekeningen/BeschikbaarInkomen";

export class BeschikbaarInkomenTabel extends BeschikbaarInkomen {
  constructor(vis, personen, wonen) {
    super(vis, personen, wonen);
  }

  verzamelTabelKolom(beschikbaarInkomen, id) {
    let columns = [functies.kolom("id", id)];
    if (beschikbaarInkomen.netto !== undefined) {
      columns.push(functies.kolom("netto", "netto")); 
    }
    columns.push(functies.kolom("algemeneHeffingsKorting", "ahk"));
    columns.push(functies.kolom("arbeidskorting", "ak"));
    const huren = super.algemeneGegevens.huren;
    columns.push(functies.kolom(huren ? "huurtoeslag" : "hypotheekrenteaftrek", huren ? "ht" : "hra"));
    columns.push(functies.kolom("zorgtoeslag", "zt"));
    columns.push(functies.kolom("kinderbijslag", "kbs"));
    columns.push(functies.kolom("kindgebonden budget", "kgb"));
    columns.push(functies.kolom("inkomenafh. combi krt", "iack"));
    return columns;
  }

  verzamelTabelData(alles, beschikbaarInkomen, id) {
    let factor = super.getFactor();
    let row = { "id": id };
    if (beschikbaarInkomen.netto !== undefined) {
      row["netto"] = functies.afronden(beschikbaarInkomen.netto, factor); 
    }
    row["ahk"] = functies.afronden(beschikbaarInkomen.algemeneHeffingsKorting, factor);
    row["ak"] = functies.afronden(beschikbaarInkomen.arbeidskorting, factor);
    row[super.algemeneGegevens.huren
          ? "ht"
          : "hra"] = functies.afronden(beschikbaarInkomen.wonen, factor);
    row["zt"] = functies.afronden(beschikbaarInkomen.zorgtoeslag, factor);
    row["kbs"] = functies.afronden(beschikbaarInkomen.kinderbijslag, factor);
    row["kgb"] = functies.afronden(beschikbaarInkomen.kindgebondenBudget, factor);
    row["iack"] = functies.afronden(beschikbaarInkomen.inkomensafhankelijkeCombinatiekorting, factor);
    alles.push(row);
  }
}
