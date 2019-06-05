import { Injectable } from "@angular/core";
import { EmpaqueModel } from "../models/models.model";

@Injectable({
  providedIn: "root"
})
export class EmpaquesService {
  mapaE = new Map<string, string>();
  bolsas: EmpaqueModel[] = new EmpaqueModel()[0];
  constructor() {
    this.bolsas = [];
    this.mapaE.set("LUNA DE MIEL", "bolsa");
    this.mapaE.set("VIDA MÍA", "bolsa1");
    this.mapaE.set("ALGUIEN COMO TÚ", "bolsa2");
    this.mapaE.set("CLAVE DE AMOR", "caja");
  }

  guardarEmpaque(empaque: EmpaqueModel, parametro: string) {
    if (parametro == "nuevo") {
      if (localStorage.getItem("empaques")) {
        this.bolsas = JSON.parse(localStorage.getItem("empaques"));
        this.bolsas.push(empaque);
        localStorage.setItem("empaques", JSON.stringify(this.bolsas));
      } else {
        this.bolsas.push(empaque);
        localStorage.setItem("empaques", JSON.stringify(this.bolsas));
      }
    } else {
      this.actualizarEmpaque(empaque, parametro);
    }
  }

  actualizarEmpaque(empaque: EmpaqueModel, param: string) {
    this.bolsas = JSON.parse(localStorage.getItem("empaques"));
    this.bolsas[Number(param)] = empaque;
    localStorage.setItem("empaques", JSON.stringify(this.bolsas));
  }

  verEmpaquesP() {
    if (localStorage.getItem("empaques")) {
      this.bolsas = JSON.parse(localStorage.getItem("empaques"));
      for (let i = 0; i < this.bolsas.length; i++) {
        this.bolsas[i].clase = this.mapaE.get(this.bolsas[i].tipo);
      }
    }

    return this.bolsas;
  }

  verEmpaquesC() {
    if (localStorage.getItem("empaques")) {
      this.bolsas = JSON.parse(localStorage.getItem("empaques"));
      for (let i = 0; i < this.bolsas.length; i++) {
        if (
          this.bolsas[i].tamano === "PEQUEÑO" &&
          (this.bolsas[i].tipo === "ALGUIEN COMO TÚ" ||
            this.bolsas[i].tipo === "CLAVE DE AMOR")
        ) {
          this.bolsas[i].clase = this.mapaE.get(this.bolsas[i].tipo) + "MF";
        } else {
          this.bolsas[i].clase = this.mapaE.get(this.bolsas[i].tipo) + "F";
        }
      }
    }
    return this.bolsas;
  }

  eliminarLocal() {
    localStorage.removeItem("empaques");
  }

  eliminarEmpaque(a: number) {
    this.bolsas = JSON.parse(localStorage.getItem("empaques"));
    this.bolsas.splice(a, 1);
    localStorage.removeItem("empaques");
    localStorage.setItem("empaques", JSON.stringify(this.bolsas));
  }

  verEmpaque(i: number) {
    this.bolsas = JSON.parse(localStorage.getItem("empaques"));
    let bolsa = this.bolsas[i];
    return bolsa;
  }
}
