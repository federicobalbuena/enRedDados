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


  @Output() onComplete = new EventEmitter<void>();
  private preguntaResponseRef: Subscription = new Subscription;

  constructor(
    private _preguntaService: PreguntaService,
    private _salaService: SalaService) { }

  ngOnInit() {
    //this.timer.restartCountdown(this.init); 
    this.preguntaResponseRef = this._preguntaService.preguntaResponse.subscribe(
      res => {
        this.respuestasList = res.respuesta;
        this.pregunta = res.pregunta;
        this.onComplete.emit()
      });
  }
  ngOnDestroy() {
    this.preguntaResponseRef.unsubscribe();
  }

  pepearRespuesta() {

    /* let respuesta = document.getElementsByName("optionsRadios") as NodeListOf<HTMLInputElement>;
      respuesta.forEach(c => {
        if (c.checked && c.value == "true") {
         console.log("respuesta correcta");
        }
        console.log("respuesta incorrecta");
      return false;
      });
       */

    let listado = document.getElementById("listaRespuestas") as HTMLInputElement;
    
    for (let index = 0; index < this.respuestasList.length; index++) {
      if (listado.checked && this.respuestasList[index].esLaCorrecta) {
        console.log("respuesta correcta");
      } else {
        console.log("respuesta incorrecta");
      };
      
    }
  }

}