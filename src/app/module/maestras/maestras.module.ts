import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ModuleModule } from '../module.module';

//routing
import { MaestrasRoutingModule } from './maestras-routing.module';

//content
import { MaestrasContentComponent } from './maestras-content/maestras-content.component';

//#region area-espe-acti-grup-ocup
import { AreaEspeActiGrupOcupComponent } from './maestras-content/area-espe-acti-grup-ocup/area-espe-acti-grup-ocup.component';
//#region area-especialidad-actividad
import { AreaEspecialidadActividadComponent } from './maestras-content/area-especialidad-actividad/area-especialidad-actividad.component';
//#region area
import { AreaComponent } from './maestras-content/area/area.component';
//#region especialidad
import { EspecialidadComponent } from './maestras-content/especialidad/especialidad.component';
//#region actividad
import { ActividadComponent } from './maestras-content/actividad/actividad.component';
//#region sub-actividad
import { SubActividadComponent } from './maestras-content/sub-actividad/sub-actividad.component';
//#region grupo-ocupacional
import { GrupoOcupacionalComponent } from './maestras-content/grupo-ocupacional/grupo-ocupacional.component';
//#region area-especialidad
import { AreaEspecialidadComponent } from './maestras-content/area-especialidad/area-especialidad.component';
//#region ambiente
import { AmbienteComponent } from './maestras-content/ambiente/ambiente.component';

import { CptEspecialidadComponent } from './maestras-content/cpt-especialidad/cpt-especialidad.component';
import { MaproComponent } from './maestras-content/mapro/mapro.component';


//services
import { AreaEspeActiGrupOcupService } from './services/area-espe-acti-grup-ocup.service';
import { GrupoOcupacionalService } from './services/grupo-ocupacional.service';
import { SubActividadService } from './services/sub-actividad.service';
import { AreaEspecialidadService } from './services/area-especialidad.service';
import { AreaEspecialidadActividadService } from './services/area-especialidad-actividad.service';
import { EspecialidadService } from './services/especialidad.service';
import { AreaService } from './services/area.service';
import { ActividadService } from './services/actividad.service';
import { TipoOrdenComponent } from './maestras-content/tipo-orden/tipo-orden.component';
import { TipoOrdenService } from './services/tipo-orden.service';
import { AmbienteService } from './services/ambiente.service';
import {CptEspecialidadService} from  './services/cpt-especialidad.service';

//modales
import { CrearEspecialidadComponent } from './maestras-content/especialidad/crear-especialidad/crear-especialidad.component';
import { EliminarEspecialidadComponent } from './maestras-content/especialidad/eliminar-especialidad/eliminar-especialidad.component';
import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { CrearSubActividadComponent } from './maestras-content/sub-actividad/crear-sub-actividad/crear-sub-actividad.component';
import { CrearActividadComponent } from './maestras-content/actividad/crear-actividad/crear-actividad.component';
import { CrearAreaComponent } from './maestras-content/area/crear-area/crear-area.component';
import { EliminarAeagpComponent } from './maestras-content/area-espe-acti-grup-ocup/eliminar-aeagp/eliminar-aeagp.component';
import { EliminarTipoOrdenComponent } from './maestras-content/tipo-orden/eliminar-tipo-orden/eliminar-tipo-orden.component';
import { EditarActividadComponent } from './maestras-content/actividad/editar-actividad/editar-actividad.component';
import { CrearGrupoOcupacionalComponent } from './maestras-content/grupo-ocupacional/crear-grupo-ocupacional/crear-grupo-ocupacional.component';
import { EditarGrupoOcupacionalComponent } from './maestras-content/grupo-ocupacional/editar-grupo-ocupacional/editar-grupo-ocupacional.component';
import { CrearAeaComponent } from './maestras-content/area-especialidad-actividad/crear-aea/crear-aea.component';
import { InsertarAmbienteComponent } from './maestras-content/ambiente/insertar-ambiente/insertar-ambiente.component';
import { EliminarAmbienteComponent } from './maestras-content/ambiente/eliminar-ambiente/eliminar-ambiente.component';
import { CrearEditarCptEspecComponent } from './maestras-content/cpt-especialidad/crear-editar-cpt-espec/crear-editar-cpt-espec.component';
import { ProcedimientosService } from '../consulta-ambulatoria/services/procedimientos.service';
import { ActualizarMaproComponent } from './maestras-content/mapro/actualizar-mapro/actualizar-mapro.component';


@NgModule({
  imports: [
    ModuleModule,
    CommonModule,
    MaestrasRoutingModule
  ],

  declarations: [
    MaestrasContentComponent,
    AreaEspeActiGrupOcupComponent,
    AreaEspecialidadActividadComponent,
    AreaComponent,
    EspecialidadComponent,
    ActividadComponent,
    SubActividadComponent,
    GrupoOcupacionalComponent,
    AreaEspecialidadComponent,
    TipoOrdenComponent,
    CrearEspecialidadComponent,
    EliminarEspecialidadComponent,
    CrearSubActividadComponent,
    CrearActividadComponent,
    CrearAreaComponent,
    EliminarAeagpComponent,
    EliminarTipoOrdenComponent,
    EditarActividadComponent,
    CrearGrupoOcupacionalComponent,
    EditarGrupoOcupacionalComponent,
    CrearAeaComponent,
    AmbienteComponent,
    InsertarAmbienteComponent,
    EliminarAmbienteComponent,
    CptEspecialidadComponent,
    CrearEditarCptEspecComponent,
    MaproComponent,
    ActualizarMaproComponent
  ],

  entryComponents: [
    CrearEspecialidadComponent,
    EliminarEspecialidadComponent,
    ModalConfirmacionComponent,
    CrearSubActividadComponent,
    CrearAreaComponent,
    EliminarAeagpComponent,
    CrearActividadComponent,
    EliminarTipoOrdenComponent,
    EditarActividadComponent,
    CrearGrupoOcupacionalComponent,
    EditarGrupoOcupacionalComponent,
    CrearAeaComponent,
    InsertarAmbienteComponent,
    EliminarAmbienteComponent,
    CrearEditarCptEspecComponent,
    ActualizarMaproComponent
  ],

  providers: [
    AreaService,
    EspecialidadService,
    ActividadService,
    SubActividadService,
    AreaEspecialidadService,
    AreaEspecialidadActividadService,
    GrupoOcupacionalService,
    AreaEspeActiGrupOcupService,
    //TipoOrdenComponent,
    TipoOrdenService,
    AmbienteService,
    CptEspecialidadService,
    ProcedimientosService
  ]
})

export class MaestrasModule { }
