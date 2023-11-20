import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TemporizadorComponent } from '../components/temporizador/temporizador.component';
import { Sala } from '../models/sala';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class SalaService implements OnInit {

  public initTemporizador$ = new BehaviorSubject<boolean>(false);
  public reiniciaTemporizador$ = new BehaviorSubject<boolean>(false);
  
  public sala$ = new BehaviorSubject<Sala>(new Sala());
  public respuestaCorrecta$ = new BehaviorSubject<boolean>(false);
  public respondio$ = new BehaviorSubject<boolean>(false);
  public podio$ = new BehaviorSubject<Jugador[]>([]);

  /*   url = "http:///api/PreguntasCDM/";
  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; */
  public static cachePodio: Jugador[];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.podio$.subscribe({
      next: (podio) => {
        SalaService.cachePodio = podio;
      }
    })
  }

 
}