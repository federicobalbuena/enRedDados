import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css']
})
export class PodioComponent implements OnInit{
  constructor (private route: ActivatedRoute) {};
  
  @ViewChild('audio')

  audio!: ElementRef;
  
  ganadores = JSON.parse(this.route.snapshot.queryParams['array']);
  primero = this.ganadores[0].nombreJugador;
  segundo = this.ganadores[1].nombreJugador;
  tercero = this.ganadores[2].nombreJugador;

  ngOnInit() {
    
  }
  //this.audio.nativeElement.play(); Esto irá dentro del metodo que muestre los ganadores segun la cantidad de participantes

}
