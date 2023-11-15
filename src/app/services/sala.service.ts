import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TemporizadorComponent } from '../components/temporizador/temporizador.component';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  public initTemporizador$ = new BehaviorSubject<boolean>(false);
  
  public sala$ = new BehaviorSubject<Sala>(new Sala());


/*   url = "http:///api/PreguntasCDM/";
  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; */
 
  
  constructor(private http: HttpClient) { }

  responder(){
    
  }  

}