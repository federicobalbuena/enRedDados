import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from '../../models/sala';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-creacion-sala',
  templateUrl: './creacion-sala.component.html',
  styleUrls: ['./creacion-sala.component.css']
})
export class CreacionSalaComponent implements OnInit {

  constructor(private _salaService: SalaService) { }

  jugadores = [new Jugador("Jugador 1", true, false, 0, false),
  new Jugador("Jugador 2", false, false, 0, false),
  new Jugador("Jugador 3", false, false, 0, false),
  new Jugador("Jugador 4", false, false, 0, false)];
  sala = new Sala(this.jugadores, "Solitario", 20);
  jugadoresHTML: HTMLInputElement[] = [];
  ngOnInit() {
    let jugadorHTML1 = document.getElementById("nombreJugador2") as HTMLInputElement;
    let jugadorHTML2 = document.getElementById("nombreJugador2") as HTMLInputElement;
    let jugadorHTML3 = document.getElementById("nombreJugador3") as HTMLInputElement;
    let jugadorHTML4 = document.getElementById("nombreJugador4") as HTMLInputElement;
    this.jugadoresHTML = [jugadorHTML1, jugadorHTML2, jugadorHTML3, jugadorHTML4];
 }
  
  iniciarPartida() {

    (document.getElementById("nombreJugador1") as HTMLInputElement).value != "" ? this.sala.jugadores[0].nombreJugador = (document.getElementById("nombreJugador1") as HTMLInputElement).value : "";

    (document.getElementById("multijugador_local") as HTMLInputElement).checked ? this.jugarMultijugadorLocal() : "";

    //(document.getElementById("multijugador_red") as HTMLInputElement).checked ? this.jugarMultijugadorRed() : "";

    this.establecerDificultad();

    this._salaService.sala$.next(this.sala)
  }

  establecerDificultad() {
    (document.getElementById("medio") as HTMLInputElement).checked ? this.sala.dificultad = 15 : "";

    (document.getElementById("dificil") as HTMLInputElement).checked ? this.sala.dificultad = 10 : "";

    (document.getElementById("random") as HTMLInputElement).checked ? this.establecerRandom() : this.personalizar();
  }

  establecerRandom() {
    let posibles = [5, 10, 15, 20, 25];
    let rnd = Math.floor(Math.random() * posibles.length);
    this.sala.dificultad = posibles[rnd];
  }

  ocultarJugadores() {
    for (let index = 1; index < this.jugadoresHTML.length; index++) {
      this.jugadoresHTML[index].style.display = "none";
    }
  }

  mostrarMultiJugador() {
    /* for (let index = 1; index < this.jugadoresHTML.length; index++) {
      this.jugadoresHTML[index].style.display = "block";
    } */
    this.jugadoresHTML[1].style.display = "block"
  }

  jugarMultijugadorLocal() {
    for (let index = 1; index < this.jugadores.length; index++) {
      if (this.jugadoresHTML[index].value != "") {
        this.jugadores[index].nombreJugador = this.jugadoresHTML[index].value
        this.jugadores[index].participa = true;
      }
    }
    //console.log("Muestro jugadores participantes desde el componente creacion-sala " + JSON.stringify(this.jugadores))
  }

  jugarMultijugadorRed() {
    this.sala.modoDeJuego = (document.getElementById("multijugador_red") as HTMLInputElement).value;
    alert("¡¡¡Proximamente!!!");
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

  habilitarJugador3 () {
    this.jugadoresHTML[2].style.display = "block";
  }

  habilitarJugador4 () {
    this.jugadoresHTML[3].style.display = "block";
  }
}


