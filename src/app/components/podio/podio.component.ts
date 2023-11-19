import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css']
})
export class PodioComponent implements OnInit {
  constructor(private _salaService: SalaService,) { };

  primero: string = "";
  segundo: string = "";
  tercero: string = "";

  @ViewChild('audio')

  audio!: ElementRef;

  podio: string[] = [];

  ngOnInit() {
    this._salaService.podio$.subscribe({
      next: (podio) => {
        for (let index = 0; index < podio.length; index++) {
          this.podio[index] = podio[index];
        }
      }
    })

    this.premiar()
  }

  premiar() {
    this.audio.nativeElement.play();
    this.primero = this.podio[0];
    this.segundo = this.podio[1];
    this.tercero = this.podio[2];
  }
}