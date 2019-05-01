import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { ExamenesAuxiliaresRoutingModule } from './examenes-auxiliares-routing.module';

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

//#region services
import { AsignarCoberturaService } from './services/asignar-cobertura.service';
import { ExamenesAuxiliaresService } from './services/examenes-auxiliares.service';
import { HistorialExamenesService } from './services/historial-examenes.service';
import { CitaExamenesAuxiliaresService } from '../consulta-ambulatoria/services/cita-examenes-auxiliares.service';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    ExamenesAuxiliaresRoutingModule
  ],
  declarations: [
    ExamenesAuxiliaresContentComponent, // content
    AsignarCoberturaComponent, // asignar-cobertura
    ExamenesAuxiliaresImagenologiaComponent, // examenes-auxiliares-imagenologia
    CitaImagenologiaComponent, // 1
    ListadoProgramacionImagenologiaComponent, // 2
    ExamenesAuxiliaresLaboratorioComponent, // examenes-auxiliares-laboratorio
    CitaLaboratorioComponent, // 1
    HistorialExamenesComponent // historial-examenes
  ],
  entryComponents: [

  ],
  providers: [
    AsignarCoberturaService,
    ExamenesAuxiliaresService,
    HistorialExamenesService,
    CitaExamenesAuxiliaresService
  ]
})
export class ExamenesAuxiliaresModule { }
