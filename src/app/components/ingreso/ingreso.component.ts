import { Component } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Sala } from 'src/app/models/sala';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {

  private sala: Sala = new Sala()

  constructor(private socket: SocketService) {}

  ingresarCodigo() {
    var ver = document.getElementById('inputCodigo') as HTMLElement;
    ver.style.visibility = "visible";
  }

  joinPlayer() {
    var nJugador = document.getElementById('tuNombre') as HTMLInputElement;
    var codigoSala = document.getElementById('codigoSala') as HTMLInputElement;

    var player: Jugador = new Jugador(nJugador.value, false, codigoSala.value)
    this.socket.emitJoinSala(player)
  }


}
