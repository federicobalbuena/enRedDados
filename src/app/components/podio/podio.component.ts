import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { Jugador } from 'src/app/models/jugador';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css']
})

export class PodioComponent implements OnInit {

  podio: Jugador[] = [];

  constructor(private _salaService: SalaService, private _route: ActivatedRoute) {
    this.podio = JSON.parse(this._route.snapshot.queryParams['array']);;

    console.log("Tipo de array " + typeof (this.podio))
    console.log(JSON.stringify(this.podio))
  };

  primero: Jugador;
  segundo: Jugador;
  tercero: Jugador;

  @ViewChild('audio')

  audio!: ElementRef;

  ngOnInit() {
    this.premiar()
  }

  contador = 0;

  obtenerCantidadDeJugadoresActivosEnEstePartido() {
    this.podio.forEach((jugador) => {
      if (jugador.participa) this.contador++
    })
  }

  premiar() {
    this.obtenerCantidadDeJugadoresActivosEnEstePartido()
    console.log(this.contador)
    switch (this.contador) {
      case 2:
        (document.getElementById("tercero") as HTMLElement).style.visibility = "hidden";
        break;
      case 1:
        (document.getElementById("tercero") as HTMLElement).style.visibility = "hidden";
        (document.getElementById("segundo") as HTMLElement).style.visibility = "hidden";
        break;
      default:
        break;
    }

    this.primero = this.podio[0];
    this.segundo = this.podio[1];
    this.tercero = this.podio[2];

    this.sonar()
  }


  sonar() {
    setTimeout(() => {
      this.audio.nativeElement.play();
    }, 200);
  }
}