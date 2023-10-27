import { Component, OnInit } from '@angular/core';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  

  constructor(private _preguntaService: PreguntaService) { }

  

  ngOnInit() {
    let ficha1 = document.getElementById("ficha1") as HTMLElement;
    let ficha2 = document.getElementById("ficha2") as HTMLElement;
    let ficha3 = document.getElementById("ficha3") as HTMLElement;
    let ficha4 = document.getElementById("ficha4") as HTMLElement;


    function avanzar(ficha: HTMLElement, cantidad: number) {
      console.log("llegue a avanzar")
      console.log("cant: " + cantidad)
      for (let index = 0; index < cantidad; index++) {
        let nextDivFicha = ficha.parentElement?.nextElementSibling;
        nextDivFicha?.appendChild(ficha);
      }
    }
  
    function retroceder(ficha: HTMLElement, cantidad: number) {
      let prevDivFicha = ficha.parentElement?.previousElementSibling;
      //prevDivFicha?.appendChild(ficha);
      for (let index = 0; index < cantidad; index++) {
        prevDivFicha = ficha.parentElement?.nextElementSibling;
        prevDivFicha?.appendChild(ficha);
      }
    }
  
      // Con el subscribe escuchamos si la variable sufrió algún cambio
      this._preguntaService.cantAvanzar$.subscribe(cant => {
        avanzar(ficha1, cant);
      });

      // Con el subscribe escuchamos si la variable sufrió algún cambio
      this._preguntaService.cantRetroceder$.subscribe(cant => {
        retroceder(ficha1, cant);
      });
  
    function respuesta(esCorrecta: boolean) {
  
      let jugador = (document.getElementById("jugador") as HTMLInputElement).value;
      let cantidad = 3;
      console.log(jugador);
  
      switch (jugador) {
        case "1":
          esCorrecta ? avanzar(ficha1, cantidad) : retroceder(ficha1, cantidad)
          break;
        case "2":
          esCorrecta ? avanzar(ficha2, cantidad) : retroceder(ficha2, cantidad)
          break;
        case "3":
          esCorrecta ? avanzar(ficha3, cantidad) : retroceder(ficha3, cantidad)
          break;
        case "4":
          esCorrecta ? avanzar(ficha4, cantidad) : retroceder(ficha4, cantidad)
          break;
  
      }
  
    }


}
}
