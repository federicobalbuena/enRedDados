import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from 'src/app/models/sala';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  
  constructor(private _salaService: SalaService) { }

  _sala: Sala = new Sala;
  jugadores: Jugador[] = [new Jugador()];
  jugadoresFiltrados: Jugador[] = [new Jugador()];
  respuestaSeleccionada: boolean = false;
  fichasActivas: HTMLElement[] = [];
  fichasActivasFiltradas: HTMLElement[] = [];
  cantidadDeJugadores = 0;
  primerPuesto: string = "";
  segundoPuesto: string = "";
  tercerPuesto: string = "";
  podio: Jugador[] = [new Jugador()];
  item = 0;
  rnd = 0;
  posibles: Number[] = [];
  mensaje: string = "" // VER POSIBILIDAD DE QUE MUESTRE UN CARTEL AL RESPONDER BIEN O MAL, O QUE HAGA UN SONIDO
  
  ngOnInit() {

    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;
    let fichas = [ficha1, ficha2, ficha3, ficha4];
    
    this._salaService.sala$.subscribe({

      next: (sala) => {
        this._sala = sala
        this.jugadores = sala.jugadores;
        console.log("Juegan estos jugadores: " + JSON.stringify(sala.jugadores));

        for (let index = 0; index < this.jugadores.length; index++) {
          if (this.jugadores[index].participa == true) {
            this.cantidadDeJugadores++
            fichas[index].style.visibility = "visible";
            this.fichasActivas[index] = fichas[index];
            this.posibles.push(this.item);
            this.item++;
          };
        }

        this.rnd = Math.floor(Math.random() * this.posibles.length);
        this.jugadores[this.rnd].turno = true;

        //console.log("Juegan estos jugadores: " + JSON.stringify(sala.jugadores));
        //console.log(`Es el turno del jugador ${this.rnd}`)
        //console.log(`Juegan ${this.cantidadDeJugadores} de jugadores`);
      }
    })

    this._salaService.respuestaCorrecta$.subscribe({

      next: (respondioCorrectamente) => {
        this.responder(respondioCorrectamente);
      }
    })
  }

  @ViewChild('audio')

  audio!: ElementRef;

  responder(esCorrecta: boolean) {
    // FUNCIONA TODO, SALVO EN MODO MULTIJUGADOR CUANDO SE DEJA UN NOMBRE EN EL MEDIO EN BLANCO,
    // POR EJEMPLO, SE PONE NOMBRE AL JUGADOR 1 Y EL 3 PERO NO EL 2. SI BIEN EL JUGADOR 2 NO FIGURA
    // COMO PARTICIPANTE, ROMPE EL CICLO. PIENSO QUE FILTRANDO/ORDENANDO LOS VECTORES DE JUGADORES Y FICHAS SE PUEDE SOLUCIONAR
    // (HAY DOS VECTORES CREADOS, JUGADORESFILTRADOS Y FICHASACTIVASFILTRADAS)
    let cantidad = 3;

    for (let index = 0; index < this.cantidadDeJugadores; index++) {
      if (this.jugadores[index].turno) {
        console.log("es el turno del jugador " + this.jugadores[index].nombreJugador)
        if (esCorrecta) {
          avanzar(this.fichasActivas[index], cantidad);
          this.jugadores[index].puntos = this.jugadores[index].puntos + 3;
          this.jugadores[index].puntos >= 18 ? this.ganarPartida() : "";
          index = index--;
          console.log(`el jugador ${this.jugadores[index].nombreJugador} tiene ${this.jugadores[index].puntos} puntos.`)
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
    // FALTA RUTEO PARA EL PODIO
    this.podio = this.jugadores.sort((a, b) => b.puntos - a.puntos);
    
    let podioTXT = [this.podio[0].nombreJugador, this.podio[1].nombreJugador, this.podio[2].nombreJugador]
    this.audio.nativeElement.play();

    this._salaService.podio$.next(podioTXT)
    
  }
}