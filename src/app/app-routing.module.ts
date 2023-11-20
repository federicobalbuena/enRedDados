import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { CreacionSalaComponent } from './components/creacion-sala/creacion-sala.component';
import { PodioComponent } from './components/podio/podio.component';
import { GanadorComponent } from './components/ganador/ganador.component';
import { PartidaComponent } from './components/partida/partida.component';

const routes: Routes = [
  {path:"", component: IngresoComponent},
  {path:"crear-sala", component: CreacionSalaComponent},
  {path:"podio", component: PodioComponent},
  {path:"ganador", component: GanadorComponent},
  {path:"partida", component:PartidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
