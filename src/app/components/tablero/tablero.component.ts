import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from 'src/app/models/sala';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor(private _salaService: SalaService,) { }


  // jugador = (document.getElementById("jugador") as HTMLInputElement).value;

  

  _sala : Sala = new Sala;
  jugadores : Jugador[] = [new Jugador()];

  ngOnInit() {

    let fichaOculta2 = document.getElementById("ficha2") as HTMLElement;
    let fichaOculta3 = document.getElementById("ficha3") as HTMLElement;
    let fichaOculta4 = document.getElementById("ficha4") as HTMLElement;

    this._salaService.sala$.subscribe({

      next: (sala) => {
        this._sala = sala
        this.jugadores = sala.jugadores
        if (sala.modoDeJuego == "Solitario") {
          fichaOculta2.style.visibility = "hidden";
          fichaOculta3.style.visibility = "hidden";
          fichaOculta4.style.visibility = "hidden";
        }
      }
      
    })
  }
  
  responder(esCorrecta: boolean) {
    
  let ficha1 = document.getElementById("ficha1") as HTMLElement;
  let ficha2 = document.getElementById("ficha2") as HTMLElement;
  let ficha3 = document.getElementById("ficha3") as HTMLElement;
  let ficha4 = document.getElementById("ficha4") as HTMLElement;
  let fichas = [ficha1, ficha2, ficha3, ficha4];
  console.log("entre a responder" + typeof(this.jugadores) + typeof(fichas))
    //let jugador = (document.getElementById("jugador") as HTMLInputElement).value;
    let cantidad = 3;
    //console.log(jugador);

    for (let index = 0; index < this.jugadores.length; index++) {

      if (this.jugadores[index].participa && this.jugadores[index].turno) {
        console.log("Es el turno de " + this.jugadores[index].nombreJugador);
        if (esCorrecta) {
          avanzar(fichas[index], cantidad)
          console.log(this.jugadores[index].nombreJugador + " respondio bien");
          index = index --;
        } else {
          retroceder(fichas[index]);
          this.jugadores[index].turno = false;
          let pepe : number = index + 1;
          if (pepe == this.jugadores.length) {
            this.jugadores[0].turno = true;
            index = 0;
          console.log(this.jugadores[index].nombreJugador + " respondio mal" + " turno " + this.jugadores[index].turno)
          } else {
            this.jugadores[pepe].turno = true;
          }
          break
        }

      }

    }

    /* switch (jugador) {
      case "1":
        esCorrecta ? avanzar(ficha1, cantidad) : retroceder(ficha1);
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

    } */

    function avanzar(ficha: HTMLElement, cantidad: number) {
      console.log("Estoy avanzando" + ficha)
      for (let index = 0; index < cantidad; index++) {
        let nextDivFicha = ficha.parentElement?.nextElementSibling;
        nextDivFicha?.appendChild(ficha);
      }
    }

    function retroceder(ficha: HTMLElement) {
      console.log("Estoy retrocediendo" + ficha)
      let prevDivFicha = ficha.parentElement?.previousElementSibling;
      prevDivFicha?.appendChild(ficha);
    }
  }
}
