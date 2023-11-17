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

  private sala = this._salaService.sala$

  salaActual = new Sala();

  //estado: boolean[] = [];//agregado para cambiar las clases en el html
  

  ngOnInit() {

    //constantes para asignar valores (nombres)
    const jugador_1 = document.getElementById("idJugador1") as HTMLInputElement;//linea original
    const jugador_2 = document.getElementById("idJugador2") as HTMLInputElement;
    const jugador_3 = document.getElementById("idJugador3") as HTMLInputElement;
    const jugador_4 = document.getElementById("idJugador4") as HTMLInputElement;

    
    //constantes para ocultar o no jugadores
    //const jugador1 = document.getElementById("jugador_1") as HTMLInputElement;
    const jugador2 = document.getElementById("jugador_2") as HTMLInputElement;
    const jugador3 = document.getElementById("jugador_3") as HTMLInputElement;
    const jugador4 = document.getElementById("jugador_4") as HTMLInputElement; 

    function ocultarJugadores() {
      jugador2.style.visibility = "hidden";
      jugador3.style.visibility = "hidden";
      jugador4.style.visibility = "hidden";
    }

    function jugarMultijugador(sala: Sala) {
      switch (sala.jugadores.length) {
        case 2:
          jugador_2.value = sala.jugadores[1].nombreJugador = "Lucas";
          jugador3.style.visibility = "hidden";
          jugador4.style.visibility = "hidden";
          // sala.jugadores[0].turno = false;
          // sala.jugadores[1].turno = true;
          break;
        case 3:
          jugador_2.value = sala.jugadores[1].nombreJugador = "Lucas";
          jugador_3.value = sala.jugadores[2].nombreJugador = "Fede";
          jugador4.style.visibility = "hidden";
          // sala.jugadores[0].turno = true;
          // sala.jugadores[1].turno = false;
          // sala.jugadores[2].turno = false;              
          break;
        default:
          jugador_2.value = sala.jugadores[1].nombreJugador = "Lucas";
          jugador_3.value = sala.jugadores[2].nombreJugador = "Fede";
          jugador_4.value = sala.jugadores[3].nombreJugador = "Moni";
          // sala.jugadores[0].turno = false;
          // sala.jugadores[1].turno = false;
          // sala.jugadores[2].turno = false;
          // sala.jugadores[3].turno = true;
          break;
      }
    }

    this._salaService.sala$.subscribe({

      next: (sala) => {
        console.log("Este es el objeto " + JSON.stringify(sala))

        jugador_1.value = sala.jugadores[0].nombreJugador;//nombre que escribo en input crear sala

        if (sala.modoDeJuego == "Solitario")
          ocultarJugadores();
        else
        jugarMultijugador(sala);

        //resalta el jugador que tiene el turno
        // for (let i = 0; i < sala.jugadores.length; i++) {
        //   if (sala.jugadores[i].turno == true)
        //     this.estado[i] = true;
        //   else
        //     this.estado[i] = false;
        // }

        this.salaActual = sala;
      }
    })
  }
}


