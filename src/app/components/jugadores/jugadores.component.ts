import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  constructor(private _salaService: SalaService) { }

  private sala = this._salaService.sala$

  salaActual = new Sala();

  ngOnInit() {

    let idJugador1 = document.getElementById("idJugador1") as HTMLInputElement;
    let idJugador2 = document.getElementById("idJugador2") as HTMLInputElement;
    let idJugador3 = document.getElementById("idJugador3") as HTMLInputElement;
    let idJugador4 = document.getElementById("idJugador4") as HTMLInputElement;

    let idJugadores = [idJugador1, idJugador2, idJugador3, idJugador4];

    let visibilidadJugador1= document.getElementById("jugador_1") as HTMLInputElement;
    let visibilidadJugador2= document.getElementById("jugador_2") as HTMLInputElement;
    let visibilidadJugador3= document.getElementById("jugador_3") as HTMLInputElement;
    let visibilidadJugador4= document.getElementById("jugador_4") as HTMLInputElement;

    let jugadoresVisibles = [visibilidadJugador1, visibilidadJugador2, visibilidadJugador3, visibilidadJugador4];

    this._salaService.sala$.subscribe({

      next: (sala) => {
        for (let index = 0; index < sala.jugadores.length; index++) {
          idJugadores[index].value = sala.jugadores[index].nombreJugador;

          if (sala.jugadores[index].participa == true) {
            jugadoresVisibles[index].style.visibility = "visible";
          }
        }
        this.salaActual = sala;
      }
    })
  }
}


