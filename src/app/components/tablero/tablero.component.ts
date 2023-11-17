import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from 'src/app/models/sala';
import { Jugador } from 'src/app/models/jugador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  constructor(
    private _salaService: SalaService,
    private router: Router) { }

  _sala: Sala = new Sala;
  jugadores: Jugador[] = [new Jugador()];
  respuestaSeleccionada: boolean = false;
  fichasActivas: HTMLElement[] = [];
  cantidadDeJugadores = 0;
  primerPuesto: string = "";
  segundoPuesto: string = "";
  tercerPuesto: string = "";
  podio: Jugador[] = [new Jugador()];
  ngOnInit() {

    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;
    let fichas = [ficha1, ficha2, ficha3, ficha4];
    let cantidadDeJugadores = 4;

    this._salaService.sala$.subscribe({

      next: (sala) => {
        this._sala = sala
        this.jugadores = sala.jugadores;

        if (sala.modoDeJuego == "Solitario") {
          ficha1.style.visibility = "visible";
          this.fichasActivas = [ficha1];
          this.cantidadDeJugadores = 1;

          for (let index = 1; index < this.jugadores.length; index++) {
            this.jugadores[index].participa = false;
          }
        } else {
          this.cantidadDeJugadores = cantidadDeJugadores;

          for (let index = 0; index < this.cantidadDeJugadores; index++) {
            this.jugadores[index].participa = true;
            fichas[index].style.visibility = "visible";
            this.fichasActivas[index] = fichas[index];
          }
        }
        console.log(JSON.stringify(this.jugadores));

        if (sala.modoDeJuego == "Solitario") {
          ficha2.style.visibility = "hidden";
          ficha3.style.visibility = "hidden";
          ficha4.style.visibility = "hidden";
          this.jugadores = sala.jugadores;
        } else {
          for (let index = 0; index < sala.jugadores.length; index++) {
            if (sala.jugadores[index].participa == true) {
              this.jugadores[index] = sala.jugadores[index];
              if (fichas[index].style.visibility == "visible") {
                this.fichasActivas[index] = fichas[index];
              }
            }
          }
        }
      }
    })
  }

  @ViewChild('audio')

  audio!: ElementRef;

  responder(esCorrecta: boolean) {

    let cantidad = 3;

    for (let index = 0; index < this.jugadores.length; index++) {

      if (this.jugadores[index].turno) {
        if (esCorrecta) {
          avanzar(this.fichasActivas[index], cantidad)
          this.jugadores[index].puntos = this.jugadores[index].puntos + 3;
          console.log("El jugador " + this.jugadores[index].nombreJugador + " tiene " + JSON.stringify(this.jugadores[index].puntos + " puntos"));
          this.jugadores[index].puntos >= 18 ? this.ganarPartida() : "";
          index = index--;
        } else {
          retroceder(this.fichasActivas[index]);
          this.jugadores[index].turno = false;
          if (this.jugadores[index].puntos > 0) {
            this.jugadores[index].puntos = this.jugadores[index].puntos - 1;
          }
          console.log("El jugador " + this.jugadores[index].nombreJugador + " tiene " + JSON.stringify(this.jugadores[index].puntos + " puntos"));
          let pepe: number = index + 1;
          if (pepe == this.cantidadDeJugadores) {
            this.jugadores[0].turno = true;
            index = 0;
          } else {
            this.jugadores[pepe].turno = true;
          }
          break
        }
      }
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

  ganarPartida() {

    this.podio = this.jugadores.sort((a, b) => b.puntos - a.puntos);
    console.log("El primer puesto es para " + this.podio[0].nombreJugador);
    console.log("El segundo puesto es para " + this.podio[1].nombreJugador);
    console.log("El tercer puesto es para " + this.podio[2].nombreJugador);

    this.audio.nativeElement.play();

   setTimeout(() => {
      let queryParams = { queryParams: { array: JSON.stringify(this.podio) } };
      this.router.navigate(["/podio"], queryParams);
    }, 4500);
  }
}