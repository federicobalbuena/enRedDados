import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { SocketService } from '../../services/socket.service';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, map } from 'rxjs/operators';
import { Sala } from 'src/app/models/sala';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent {

  room: string = ""
  sala: Sala
  userName: string;
  name: string;
  isOnline: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private socket: SocketService
  ){}

  ngOnInit(): void {
    console.log("entrando...." + this.room)
    this.room = this.router.snapshot.paramMap.get('room')!
    this.cookieService.set('room', this.room)
    console.log(this.room)

  }

/*   joinPlayer() {
    var jugador = new Jugador()
    this.socket.emitJoinSala(jugador)
  } */

  exit() {
    this.socket.emitExit();
    this.isOnline = false;
  }

}
