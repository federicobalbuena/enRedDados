import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  { ObjPregunta }  from '../models/ObjPregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
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
}