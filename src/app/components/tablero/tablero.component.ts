import { Component } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {

  respuestaCorrecta() {
    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;
    let jugador = (document.getElementById("jugador") as HTMLInputElement).value;
    console.log(jugador);

    switch (jugador) {
      case "1":
        for (let index = 0; index < 3; index++) {
          let nextDivFicha1 = ficha1.parentElement?.nextElementSibling;
          nextDivFicha1?.appendChild(ficha1);
        }

        break;
      case "2":
        for (let index = 0; index < 3; index++) {
          let nextDivFicha2 = ficha2.parentElement?.nextElementSibling;
          nextDivFicha2?.appendChild(ficha2);
        }

        break;

      case "3":
        for (let index = 0; index < 3; index++) {
          let nextDivFicha3 = ficha3.parentElement?.nextElementSibling;
          nextDivFicha3?.appendChild(ficha3);
        }

        break;

      case "4":
        for (let index = 0; index < 3; index++) {
          let nextDivFicha4 = ficha4.parentElement?.nextElementSibling;
          nextDivFicha4?.appendChild(ficha4);
        }

        break;

      default:
        break;
    }

  }

  respuestaIncorrecta() {
    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;
    let jugador = (document.getElementById("jugador") as HTMLInputElement).value;

    switch (jugador) {
      case "1":
          for (let index = 0; index < 1; index++) {
              let prevDivFicha1 = ficha1.parentElement?.previousElementSibling;
              prevDivFicha1?.appendChild(ficha1);
          }
          break;
      case "2":
          for (let index = 0; index < 1; index++) {
              let prevDivFicha2 = ficha2.parentElement?.previousElementSibling;
              prevDivFicha2?.appendChild(ficha2);
          }
          break;
      case "3":
          for (let index = 0; index < 1; index++) {
              let prevDivFicha3 = ficha3.parentElement?.previousElementSibling;
              prevDivFicha3?.appendChild(ficha3);
          }
          break;
      case "4":
          for (let index = 0; index < 1; index++) {
              let prevDivFicha4 = ficha4.parentElement?.previousElementSibling;
              prevDivFicha4?.appendChild(ficha4);
          }
          break;

      default:
          break;
  }
  }
}
