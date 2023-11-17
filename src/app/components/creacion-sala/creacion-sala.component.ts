import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from '../../models/sala';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-creacion-sala',
  templateUrl: './creacion-sala.component.html',
  styleUrls: ['./creacion-sala.component.css']
})
export class CreacionSalaComponent {

  constructor(private _salaService: SalaService) { }

  jugadores = [new Jugador("Jugador 1", true, true),
  new Jugador("Jugador 2", false, false),
  new Jugador("Jugador 3", false, false),
  new Jugador("Jugador 4", false, false)];

  sala = new Sala(this.jugadores, "Solitario", 20);


  iniciarPartida() {

    if ((document.getElementById("nombreJugador") as HTMLInputElement).value != "") {
      this.sala.jugadores[0].nombreJugador = (document.getElementById("nombreJugador") as HTMLInputElement).value;
    }

    if ((document.getElementById("multijugador_local") as HTMLInputElement).checked) {
      this.sala.modoDeJuego = (document.getElementById("multijugador_local") as HTMLInputElement).value;
      this.jugarMultijugador();

    }

    if ((document.getElementById("medio") as HTMLInputElement).checked) {
      this.sala.dificultad = 15;
    }
    if ((document.getElementById("dificil") as HTMLInputElement).checked) {
      this.sala.dificultad = 10;
    }
    if ((document.getElementById("random") as HTMLInputElement).checked) {
      let posibles = [10, 15, 20];
      let rnd = Math.floor(Math.random() * posibles.length);
      this.sala.dificultad = posibles[rnd];
    }

    this.personalizar()

    console.log(this.sala.jugadores, this.sala.modoDeJuego, this.sala.dificultad) // Borrar

    this._salaService.sala$.next(this.sala)
  }

  jugarMultijugador() {
    let jugador_2 = document.getElementById("nombreJugador2") as HTMLInputElement;
    let jugador_3 = document.getElementById("nombreJugador3") as HTMLInputElement;
    let jugador_4 = document.getElementById("nombreJugador4") as HTMLInputElement;

    jugador_2.style.visibility = "visible";
    jugador_3.style.visibility = "visible";
    jugador_4.style.visibility = "visible";

    this.jugadores[1].nombreJugador = (document.getElementById("nombreJugador2") as HTMLInputElement).value;
    this.jugadores[2].nombreJugador = (document.getElementById("nombreJugador3") as HTMLInputElement).value;
    this.jugadores[3].nombreJugador = (document.getElementById("nombreJugador4") as HTMLInputElement).value;

  }

  personalizar() {
    let select = document.getElementById("tiempoPersonalizado") as HTMLInputElement

    if ((document.getElementById("personalizado") as HTMLInputElement).checked) {
      select.style.visibility = "visible";

      if (select.value != "0") {
        this.sala.dificultad = parseInt(select.value);
      }
      else {
        this.sala.dificultad = 20;
      }
    }
  }
}


