import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit { //antes de la llave va implements OnInit si habilito metodo ngOnInit()

  constructor(private _salaService: SalaService) { }
  
  sala = this._salaService.sala$

  ngOnInit() {
    const jugador_1 = document.getElementById("idJugador1") as HTMLInputElement;
    const jugador_2 = document.getElementById("jugador_2") as HTMLInputElement;
    const jugador_3 = document.getElementById("jugador_3") as HTMLInputElement;
    const jugador_4 = document.getElementById("jugador_4") as HTMLInputElement;

    function ocultarJugadores() {
      jugador_2.style.visibility = "hidden";
      jugador_3.style.visibility = "hidden";
      jugador_4.style.visibility = "hidden";
    }

    this._salaService.sala$.subscribe({

      next: (sala) => {
        console.log("Este es el objeto " + JSON.stringify(sala))
        if (sala.modoDeJuego == "Solitario") {
          ocultarJugadores();
        }
        //Falta el Multijugador
        jugador_1.value = sala.jugadores[0].nombreJugador;
      }
    })

  }
}


