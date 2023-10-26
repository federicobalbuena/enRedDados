import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { CreacionSalaComponent } from './components/creacion-sala/creacion-sala.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { DadoComponent } from './components/dado/dado.component';
import { TemporizadorComponent } from './components/temporizador/temporizador.component';
import { PreguntasRespuestasComponent } from './components/preguntas-respuestas/preguntas-respuestas.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { GanadorComponent } from './components/ganador/ganador.component';
import { PodioComponent } from './components/podio/podio.component';
import { PartidaComponent } from './components/partida/partida.component';
import { PreguntaService } from './services/pregunta.service';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    CreacionSalaComponent,
    JugadoresComponent,
    DadoComponent,
    TemporizadorComponent,
    PreguntasRespuestasComponent,
    TableroComponent,
    GanadorComponent,
    PodioComponent,
    PartidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PreguntaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
