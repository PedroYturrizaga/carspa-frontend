import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { ExamenesAuxiliaresContentComponent } from './examenes-auxiliares-content/examenes-auxiliares-content.component';

//#region asignar-cobertura
import { AsignarCoberturaComponent } from './examenes-auxiliares-content/asignar-cobertura/asignar-cobertura.component';
//#endregion

//#region examenes-auxiliares-imagenologia
import { ExamenesAuxiliaresImagenologiaComponent } from './examenes-auxiliares-content/examenes-auxiliares-imagenologia/examenes-auxiliares-imagenologia.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { CitaImagenologiaComponent } from './examenes-auxiliares-content/examenes-auxiliares-imagenologia/cita-imagenologia/cita-imagenologia.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { ListadoProgramacionImagenologiaComponent } from './examenes-auxiliares-content/examenes-auxiliares-imagenologia/cita-imagenologia/listado-programacion-imagenologia/listado-programacion-imagenologia.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

//#region examenes-auxiliares-laboratorio
import { ExamenesAuxiliaresLaboratorioComponent } from './examenes-auxiliares-content/examenes-auxiliares-laboratorio/examenes-auxiliares-laboratorio.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { CitaLaboratorioComponent } from './examenes-auxiliares-content/examenes-auxiliares-laboratorio/cita-laboratorio/cita-laboratorio.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

//#region historial-examenes
import { HistorialExamenesComponent } from './examenes-auxiliares-content/historial-examenes/historial-examenes.component';
//#endregion

// LOS COMPONENTES QUE NO INCLUYAS EN LAS RUTAS, COMENTAR ARRIBA ^

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesAuxiliaresRoutingModule { }
