import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent implements OnInit{
  
  constructor(private _salaService: SalaService) { }

  tempInicial : number = 0;
  tiempoRestante: number = 0; // El valor lo va a tomar segun la dificultad seleccionada al momento de crear la partida
  colorFondo: string = 'rgb(35, 177, 77)'
  
  @ViewChild('audio')
  
  audio!: ElementRef;
  
  ngOnInit() {
    this._salaService.sala$.subscribe({

      next: (sala) => {
        this.tiempoRestante = sala.dificultad;
        this.tempInicial = sala.dificultad;
      }
    })

     // Con el subscribe escuchamos si la variable sufrió algún cambio
     this._salaService.initTemporizador$.subscribe(init => {
      if(init)
      this.iniciarCuenta();
    });
  }  


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
    this.audio.nativeElement.play();
    this.colorFondo = 'rgb(35, 177, 77)';
    this.tiempoRestante = this.tempInicial;
    
    clearInterval(interval);
    
  }
}
