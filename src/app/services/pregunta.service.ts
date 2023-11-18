import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import  { ObjPregunta }  from '../models/ObjPregunta';
import { PreguntaResponse } from '../models/preguntaResponse';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private preguntaResponseSubject = new BehaviorSubject<PreguntaResponse>(new PreguntaResponse());
  public preguntaResponse = this.preguntaResponseSubject.asObservable();

  
/*   public cantAvanzar$ = new BehaviorSubject<number>(0);
  public cantRetroceder$ = new BehaviorSubject<number>(0);

  public mostrarMensaje$ = new BehaviorSubject<boolean>(false); */

  public sala$ = new BehaviorSubject<Sala>(new Sala());

  url = "http:///api/PreguntasCDM/";

  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
 
  
  constructor(private http: HttpClient) { }

  obtenerPreguntaPost(nroPregunta: string): Observable<any>{

    let pregunta: ObjPregunta = {
        nroPregunta: nroPregunta
    }

    return this.http.post(
      this.url, 
      JSON.stringify(pregunta), 
      this.headers
      );
  }

  setPreguntaResponse(obj: PreguntaResponse) {
    this.preguntaResponseSubject.next(obj)
  }

}