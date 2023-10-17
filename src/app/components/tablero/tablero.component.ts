import { Component } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {

  respuesta(esCorrecta: boolean) {
    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;
    let jugador = (document.getElementById("jugador") as HTMLInputElement).value;
    let cantidad = 3;
    console.log(jugador);

    switch (jugador) {
      case "1":
        esCorrecta ? avanzar(ficha1, cantidad) : retroceder(ficha1)
        break;
      case "2":
        esCorrecta ? avanzar(ficha2, cantidad) : retroceder(ficha2)
        break;
      case "3":
        esCorrecta ? avanzar(ficha3, cantidad) : retroceder(ficha3)
        break;
      case "4":
        esCorrecta ? avanzar(ficha4, cantidad) : retroceder(ficha4)
        break;

    }

    function avanzar(ficha: HTMLElement, cantidad: number) {
      for (let index = 0; index < cantidad; index++) {
        let nextDivFicha = ficha.parentElement?.nextElementSibling;
        nextDivFicha?.appendChild(ficha);
      }
    }

    function retroceder(ficha: HTMLElement) {
      let prevDivFicha = ficha.parentElement?.previousElementSibling;
      prevDivFicha?.appendChild(ficha);
    }
  }
}
