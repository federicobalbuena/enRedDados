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

    let jugador_1_Visible = document.getElementById("jugador_1") as HTMLInputElement;
    let jugador_2_Visible = document.getElementById("jugador_2") as HTMLInputElement;
    let jugador_3_Visible = document.getElementById("jugador_3") as HTMLInputElement;
    let jugador_4_Visible = document.getElementById("jugador_4") as HTMLInputElement;

    let jugadoresVisibles = [jugador_1_Visible, jugador_2_Visible, jugador_3_Visible, jugador_4_Visible];

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


