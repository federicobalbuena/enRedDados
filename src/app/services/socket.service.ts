import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { CookieService} from 'ngx-cookie-service'
import { SalaService } from './sala.service';
import { Sala } from '../models/sala';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root',
})
export class SocketService extends Socket {
  //constructor(private socket: Socket) {}

  outEven: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();
  sala$: Sala

   constructor(
    private _cookieService: CookieService,
    private _salaService: SalaService) {

    super({
      url: 'http://localhost:8080',
      options: {
        query: {
          nameRoom: _cookieService.get('room')
        }
      }
    })
    console.log(`SocketWebService... ${_cookieService.get('room')}`)
    this.listen()
  }

    listen = () => {
      this.ioSocket.on('event', (res: any) => this.callback.emit(res))
   }

   emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload);
   }

  emitSala(sala: Sala): void {
    this.ioSocket.emit('update-sala-status', sala)
  }

  emitJoinSala(jugador: Jugador): void {
    this.ioSocket.emit('join-player', jugador)
  }

  emitExit(): void {
    this.ioSocket.emit('exit');
  }

  getClientId(): Observable<string> {
    return this.ioSocket.fromEvent('user-id');
  }

}