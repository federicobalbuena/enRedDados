import { Component } from '@angular/core';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {

  ingresarCodigo() {
    var ver = document.getElementById('inputCodigo') as HTMLElement;
    ver.style.visibility = "visible";
  }
}
