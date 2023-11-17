import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css']
})
export class PodioComponent {
  constructor (private route: ActivatedRoute) {};

  ganadores = JSON.parse(this.route.snapshot.queryParams['array']);
  
  primero = this.ganadores[0].nombreJugador;
  segundo = this.ganadores[1].nombreJugador;
  tercero = this.ganadores[2].nombreJugador;
  
 

  
}
