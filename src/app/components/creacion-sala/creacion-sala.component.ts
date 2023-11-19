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

  jugadores = [new Jugador("Jugador 1", true, true, 0, false),
  new Jugador("Jugador 2", false, false, 0, false),
  new Jugador("Jugador 3", false, false, 0, false),
  new Jugador("Jugador 4", false, false, 0, false)];

  sala = new Sala(this.jugadores, "Solitario", 20);
 
  iniciarPartida() {

    (document.getElementById("nombreJugador1") as HTMLInputElement).value != "" ? this.sala.jugadores[0].nombreJugador = (document.getElementById("nombreJugador1") as HTMLInputElement).value : "";

    (document.getElementById("multijugador_local") as HTMLInputElement).checked ? this.jugarMultijugadorLocal() : "";

    (document.getElementById("multijugador_red") as HTMLInputElement).checked ? this.jugarMultijugadorRed() : "";

    (document.getElementById("medio") as HTMLInputElement).checked ? this.sala.dificultad = 15 : "";

    (document.getElementById("dificil") as HTMLInputElement).checked ? this.sala.dificultad = 10 : "";

    (document.getElementById("random") as HTMLInputElement).checked ? this.establecerRandom() : "";

    this.personalizar()

    this._salaService.sala$.next(this.sala)
  }

  establecerRandom() {
    let posibles = [5, 10, 15, 20, 25];
    let rnd = Math.floor(Math.random() * posibles.length);
    this.sala.dificultad = posibles[rnd];
  }

  ocultarJugadores() {
    let jugadorHTML2 = document.getElementById("nombreJugador2") as HTMLInputElement;
    let jugadorHTML3 = document.getElementById("nombreJugador3") as HTMLInputElement;
    let jugadorHTML4 = document.getElementById("nombreJugador4") as HTMLInputElement;

    jugadorHTML2.style.display = "none";
    jugadorHTML3.style.display = "none";
    jugadorHTML4.style.display = "none";
  }

  mostrarMultiJugador() {
    let jugadorHTML2 = document.getElementById("nombreJugador2") as HTMLInputElement;
    let jugadorHTML3 = document.getElementById("nombreJugador3") as HTMLInputElement;
    let jugadorHTML4 = document.getElementById("nombreJugador4") as HTMLInputElement;

    jugadorHTML2.style.display = "block";
    jugadorHTML3.style.display = "block";
    jugadorHTML4.style.display = "block";
  }

  jugarMultijugadorLocal() {
    this.sala.modoDeJuego = (document.getElementById("multijugador_local") as HTMLInputElement).value;
    let jugadorHTML1 = (document.getElementById("nombreJugador2") as HTMLInputElement).value;
    let jugadorHTML2 = (document.getElementById("nombreJugador2") as HTMLInputElement).value;
    let jugadorHTML3 = (document.getElementById("nombreJugador3") as HTMLInputElement).value;
    let jugadorHTML4 = (document.getElementById("nombreJugador4") as HTMLInputElement).value;
    let jugadoresHTML = [jugadorHTML1, jugadorHTML2, jugadorHTML3, jugadorHTML4];

    for (let index = 1; index < this.jugadores.length; index++) {
      if (jugadoresHTML[index] != "") {
        this.jugadores[index].nombreJugador = jugadoresHTML[index]
        this.jugadores[index].participa = true;
      }
    }
    //console.log("Muesto jugadores participantes desde el componente creacion-sala " + JSON.stringify(this.jugadores))
  }

  jugarMultijugadorRed() {
    this.sala.modoDeJuego=(document.getElementById("multijugador_red") as HTMLInputElement).value;
    alert("Acá debe asignar un codigo de sala e ir a la partida multijugador");
  }

  ocultarDificultad() {
    let select = document.getElementById("selectTiempoPersonalizado") as HTMLInputElement
    select.style.display = "none";
  }

  personalizar() {
    let select = document.getElementById("selectTiempoPersonalizado") as HTMLInputElement

    if ((document.getElementById("personalizado") as HTMLInputElement).checked) {
      select.style.display = "block";

      if (select.value != "0") {
        this.sala.dificultad = parseInt(select.value);
      }
      else {
        this.sala.dificultad = 20;
      }
    }
  }
}


