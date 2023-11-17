import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Respuesta } from "src/app/models/respuesta";
import { Sala } from 'src/app/models/sala';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-preguntas-respuestas',
  templateUrl: './preguntas-respuestas.component.html',
  styleUrls: ['./preguntas-respuestas.component.css']
})
export class PreguntasRespuestasComponent implements OnInit, OnDestroy {
  respuestasList: Respuesta[] = []
  pregunta: string = ""
  respondio = false;

  @Output() onComplete = new EventEmitter<void>();
  private preguntaResponseRef: Subscription = new Subscription;

  constructor(
    private _preguntaService: PreguntaService,
    private _salaService: SalaService) { }

  ngOnInit() {
    //this.timer.restartCountdown(this.init); 
    let pregunta = document.getElementById("pregunta") as HTMLElement;
    let txtPregunta = document.getElementById("txtPregunta") as HTMLInputElement;

    this.preguntaResponseRef = this._preguntaService.preguntaResponse.subscribe(
      res => {
        this.respuestasList = res.respuesta;
        this.pregunta = `Pregunta: ${res.pregunta}`;
        this.onComplete.emit()
      });

      this._salaService.respondio$.subscribe({
        next: (respuesta) => {
          this.respondio = respuesta;
      }})
      
      this._salaService.respuestaCorrecta$.subscribe({

        next: (respondioCorrectamente) => {
          if (this.respondio) {
            pregunta.style.visibility = "hidden";
            this._salaService.respondio$.next(false);
            limpiarCampos();
          }
        }
      })

      this._preguntaService.pregunta$.subscribe({

        next: (vioPregunta) => {
          vioPregunta? pregunta.style.visibility ="visible" : pregunta.style.visibility ="hidden";
        }
      })

      function limpiarCampos() {
        txtPregunta.value = "";
    
      }
  }

  ngOnDestroy() {
    this.preguntaResponseRef.unsubscribe();
  }
  
  
  
  validarRespuesta() {
    this._salaService.reiniciaTemporizador$.next(true);
    this._salaService.initTemporizador$.next(false);
    this._preguntaService.pregunta$.next(false);
    this._salaService.respondio$.next(true);
    let respuesta = document.getElementsByName("optionsRadios") as NodeListOf<HTMLInputElement>;
    var respondioCorrectamente: Boolean = false

    respuesta.forEach(c => {
        if (c.checked && c.value == "true") {
         console.log("respuesta correcta");
         respondioCorrectamente = true;
        }
      });
      console.log(respondioCorrectamente == true ? true : false) 
      this._salaService.respuestaCorrecta$.next(respondioCorrectamente == true ? true : false)
      //TODO
      //llamar al método que avanza o retrocede según respuesta correcta
      //pasarle como parametro respondioCorrectamente == true ? true : false
  }

}