import { Component, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})


export class TemporizadorComponent {

  constructor(private _preguntaService: PreguntaService) { }

  tiempoRestante: number = 5; // El valor lo va a tomar segun la dificultad seleccionada al momento de crear la partida
  colorFondo: string = 'rgb(35, 177, 77)'
  @ViewChild('audio')
  audio!: ElementRef;
  
    iniciarCuenta() {
      let interval = setInterval(() => { // Crea un intervalo que se ejecute cada segundo
      this.tiempoRestante > 0 ? this.cuentaAtras() : this.cambioJugador(interval);
      
    }, 1000); // El segundo parámetro es el tiempo en milisegundos entre cada ejecución
  }

  cuentaAtras() {
    this.tiempoRestante--;
    if (this.tiempoRestante < 5) {
      this.colorFondo = 'rgb(254, 45, 57)';
      
    } else if (this.tiempoRestante < 10) {
      this.colorFondo = 'rgb(255, 197, 35)';
      
    }
  }

  cambioJugador(interval: any) {
    //this.audio.nativeElement.play();
    this.colorFondo = 'rgb(35, 177, 77)';
    this.tiempoRestante = 5;
    clearInterval(interval);
    this._preguntaService.mostrarMensaje$.next(true);
  }

  ngOnInit() {
    // Con el subscribe escuchamos si la variable sufrió algún cambio
    this._preguntaService.initTemporizador$.subscribe(init => {
      if(init)
      this.iniciarCuenta();
    });
}
}
