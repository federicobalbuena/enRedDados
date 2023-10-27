import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Respuesta } from "src/app/models/respuesta";
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-preguntas-respuestas',
  templateUrl: './preguntas-respuestas.component.html',
  styleUrls: ['./preguntas-respuestas.component.css']
})
export class PreguntasRespuestasComponent implements OnInit, OnDestroy {
  respuestasList: Respuesta[] = []
  pregunta: string = ""

  @Output() onComplete = new EventEmitter<void>();
  private preguntaResponseRef: Subscription = new Subscription;

  constructor(private _preguntaService: PreguntaService){}
  
  ngOnInit(){

    const mensaje = document.getElementById("mensaje") as HTMLElement;

      //this.timer.restartCountdown(this.init); 
      this.preguntaResponseRef = this._preguntaService.preguntaResponse.subscribe(
      res => {
        this.respuestasList = res.respuesta;
        this.pregunta = res.pregunta;
        this.onComplete.emit()
      });

        this._preguntaService.mostrarMensaje$.subscribe(mostrar => {
          if(mostrar)
          mensaje.style.visibility = "visible"
        });
    
  }
  ngOnDestroy(){
      this.preguntaResponseRef.unsubscribe();
  }

}