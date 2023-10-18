import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PreguntaResponse } from 'src/app/models/preguntaResponse';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.component.html',
  styleUrls: ['./dado.component.css']
})
export class DadoComponent implements OnInit {

  preguntaResponse = new PreguntaResponse()

  constructor(
    private location: Location,
    private router: Router,
    private _preguntaService: PreguntaService
  ) { }

  obtenerPregunta() {

    let nroPregunta = document.getElementById("nroPregunta") as HTMLInputElement;

    this._preguntaService.obtenerPreguntaPost(nroPregunta.value).subscribe({
      next: data => {
        console.log(`Obteniendo pregunta ${nroPregunta.value}`);
        this.preguntaResponse.pregunta = data.pregunta;
        this.preguntaResponse.respuesta = data.respuesta;

        console.log(this.preguntaResponse)
      }, error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit() {

    let time = 2;
    let randomValue: Number;
    const dado: HTMLElement = document.querySelector('.dado') as HTMLElement;
    const nroPregunta = document.getElementById("nroPregunta") as HTMLInputElement;
    const verPregunta = document.getElementById("btnverpregunta") as HTMLElement;

    dado.addEventListener('click', () => {
      dado.style.transition = '';
      dado.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      setTimeout(() => {
        dado.style.transition = `transform ${time}s`;
        randomValue = Math.floor((Math.random() * 6) + 1);
        console.log(`randomValue: ${randomValue}`);

        switch (randomValue) {
          case 1:
            dado.style.transform = `translateY(0px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
            break;
          case 2:
            dado.style.transform = `translateY(0px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
            break;
          case 3:
            dado.style.transform = `translateY(0px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
            break;
          case 4:
            dado.style.transform = `translateY(0px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
            break;
          case 5:
            dado.style.transform = `translateY(0px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
            break;
          case 6:
            dado.style.transform = `translateY(0px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
            break;
        };

        if (nroPregunta.value.length < 3) {
          mostrarResultados()
        } else {
          verPregunta.style.visibility = "hidden";
          nroPregunta.value = "";
        }
      }, time * 10);
    });

    function mostrarResultados() {
      setTimeout(() => {
        nroPregunta.value = nroPregunta.value + randomValue.toString();
        nroPregunta.value.length == 3 ? verPregunta.style.visibility = "visible" : verPregunta.style.visibility = "hidden";
      }, 2000);

    };
  }
}
