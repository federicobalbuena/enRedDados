import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PreguntaResponse } from 'src/app/models/preguntaResponse';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.component.html',
  styleUrls: ['./dado.component.css']
})
export class DadoComponent implements OnInit {

  preguntaResponse = new PreguntaResponse()
  respondio = false;
  contadorClicks = 0

  constructor(
    private location: Location,
    private router: Router,
    private _preguntaService: PreguntaService,
    private _salaService: SalaService
  ) { }

  obtenerPregunta() {
    const nroPregunta = document.getElementById("nroPregunta") as HTMLInputElement;
    const btnVerPregunta = document.getElementById("btnverpregunta") as HTMLButtonElement;

    this._preguntaService.obtenerPreguntaPost(nroPregunta.value).subscribe({
      next: data => {
        console.log(`Obteniendo pregunta ${nroPregunta.value}`);
        this.preguntaResponse.pregunta = data.pregunta;
        this.preguntaResponse.respuesta = data.respuesta;

        this._preguntaService.setPreguntaResponse(this.preguntaResponse)
        console.log(this.preguntaResponse);
        this._preguntaService.spinner$.next(false);
        this._preguntaService.pregunta$.next(true);
        this._salaService.initTemporizador$.next(true);
        btnVerPregunta.style.visibility = "hidden";
      }, 
      error: err => {
        console.log(err);
        this._preguntaService.spinner$.next(false);
      }
    })
  }

  ngOnInit() {

    let time = 1;
    let randomValue: Number;
    const dado: HTMLElement = document.querySelector('.dado') as HTMLElement;
    const nroPregunta = document.getElementById("nroPregunta") as HTMLInputElement;
    const btnVerPregunta = document.getElementById("btnverpregunta") as HTMLElement;

    dado.addEventListener('click', () => {
      this.contadorClicks++;
      if(this.contadorClicks <= 3){
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
          btnVerPregunta.style.visibility = "hidden";
          nroPregunta.value = "";
        }
        //mostrarResultados();

      }, time * 1);
      }
      
    });

    function limpiarCampos() {
      nroPregunta.value = "";

    }

    function mostrarResultados() {
      setTimeout(() => {
        nroPregunta.value = nroPregunta.value + randomValue.toString();
        nroPregunta.style.visibility ="visible";
        nroPregunta.value.length == 3 ? btnVerPregunta.style.visibility = "visible" : btnVerPregunta.style.visibility = "hidden";
      }, 1000);

    };

    this._salaService.respondio$.subscribe({
      next: (respuesta) => {
        this.respondio = respuesta;
    }})

    this._salaService.respuestaCorrecta$.subscribe({

      next: (respondioCorrectamente) => {
        if (this.respondio) {
          nroPregunta.style.visibility = "hidden";
          btnVerPregunta.style.visibility = "hidden";
          this.contadorClicks = 0
          limpiarCampos();
        }

      }
    })
  }
}
