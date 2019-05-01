
import { PersonalContratanteService } from './services/personal-contratante.service';
import { MedicamentoService } from './services/medicamento.service';
import { IafasService } from './services/iafas.service';
import { CitaExamenesAuxiliaresService } from './../consulta-ambulatoria/services/cita-examenes-auxiliares.service';
import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MovimientoService } from './../farmacia/services/movimiento.service';
import { ProductoServiceService } from './services/producto-service.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TarifarioRoutingModule } from './tarifario-routing.module';
import { TarifarioContentComponent } from './tarifario-content/tarifario-content.component';
import { ServicioComponent } from './tarifario-content/servicio/servicio.component';
import { AdministrarServicioComponent } from './tarifario-content/servicio/administrar-servicio/administrar-servicio.component';
import { AsignarIafaComponent } from './tarifario-content/servicio/asignar-iafa/asignar-iafa.component';
import { ModuleModule } from '../module.module';
import { TarifarioService } from './services/tarifario.service';
import { CrearEditarServicioComponent } from './tarifario-content/servicio/administrar-servicio/crear-editar-servicio/crear-editar-servicio.component';
import { AreaService } from '../maestras/services/area.service';
import { AreaEspecialidadService } from '../maestras/services/area-especialidad.service';
import { AreaEspecialidadActividadService } from '../maestras/services/area-especialidad-actividad.service';
import { ProductoComponent } from './tarifario-content/producto/producto.component';
import { InsertarProductoComponent } from './tarifario-content/producto/insertar-producto/insertar-producto.component';
import { CoberturaServiceService } from './services/cobertura-service.service';
import { ConvenioService } from './services/convenio.service';
import { CoberturaComponent } from './tarifario-content/cobertura/cobertura.component';
import { EliminarProductoComponent } from './tarifario-content/producto/eliminar-producto/eliminar-producto.component';
import { ServicioCoberturaService } from './services/servicio-cobertura.service';
import { ServicioCoberturaComponent } from './tarifario-content/servicio-cobertura/servicio-cobertura.component';
import { InsertarEditarCoberturaComponent } from './tarifario-content/cobertura/insertar-editar-cobertura/insertar-editar-cobertura.component';
import { EliminarCoberturaComponent } from './tarifario-content/cobertura/eliminar-cobertura/eliminar-cobertura.component';
import { FijarPrecioComponent } from './tarifario-content/servicio/asignar-iafa/fijar-precio/fijar-precio.component';
import { ProcedimientosService } from '../consulta-ambulatoria/services/procedimientos.service';
import { EliminarComponent } from './tarifario-content/servicio/asignar-iafa/eliminar/eliminar.component';
import { MedicamentoComponent } from './tarifario-content/medicamento/medicamento.component';
import { ConvenioMedicamentoComponent } from './tarifario-content/medicamento/convenio-medicamento/convenio-medicamento.component';
import { InsertarServicioCoberturaComponent } from './tarifario-content/servicio-cobertura/insertar-servicio-cobertura/insertar-servicio-cobertura.component';
import { MedicamentoCoberturaComponent } from './tarifario-content/medicamento/medicamento-cobertura/medicamento-cobertura.component';
import { ContratanteComponent } from './tarifario-content/contratante/contratante.component';
import { ContratanteService } from './services/contratante.service';
import { InsertarEditarContratanteComponent } from './tarifario-content/contratante/insertar-editar-contratante/insertar-editar-contratante.component';
import { EliminarContratanteComponent } from './tarifario-content/contratante/eliminar-contratante/eliminar-contratante.component';
import { IafasComponent } from './tarifario-content/iafas/iafas.component';
import { CrearIafaComponent } from './tarifario-content/iafas/crear-iafa/crear-iafa.component';
import { EditarIafaComponent } from './tarifario-content/iafas/editar-iafa/editar-iafa.component';
import { AgregarMedicamentoComponent } from './tarifario-content/medicamento/medicamento-cobertura/agregar-medicamento/agregar-medicamento.component';
import { MantenimientoAnaquelService } from '../farmacia/services/mantenimiento-anaquel.service';
import { ConvenioComponent } from './tarifario-content/convenio/convenio.component';
import { InsertarEditarConvenioComponent } from './tarifario-content/convenio/insertar-editar-convenio/insertar-editar-convenio.component';
import { EliminarConvenioComponent } from './tarifario-content/convenio/eliminar-convenio/eliminar-convenio.component';
import { InsertarMedicamentoComponent } from './tarifario-content/medicamento/convenio-medicamento/insertar-medicamento/insertar-medicamento.component';
import { RecetaService } from '../consulta-ambulatoria/services/receta.service';
import { ConfirmacionComponent } from './tarifario-content/medicamento/convenio-medicamento/insertar-medicamento/confirmacion/confirmacion.component';
import { PersonalContratanteComponent } from './tarifario-content/personal-contratante/personal-contratante.component';

@NgModule({
  imports: [
    CommonModule,
    ModuleModule,
    TarifarioRoutingModule,

  ],
  declarations: [
    TarifarioContentComponent,
    ServicioComponent,
    AdministrarServicioComponent,
    AsignarIafaComponent,
    ProductoComponent,
    InsertarProductoComponent,
    CoberturaComponent,
    EliminarProductoComponent,
    CrearEditarServicioComponent,
    ServicioCoberturaComponent,
    InsertarEditarCoberturaComponent,
    EliminarCoberturaComponent,
    FijarPrecioComponent,
    EliminarComponent,
    MedicamentoComponent,
    ConvenioMedicamentoComponent,
    InsertarServicioCoberturaComponent,
    MedicamentoCoberturaComponent,
    FijarPrecioComponent,
    ContratanteComponent,
    InsertarEditarContratanteComponent,
    EliminarContratanteComponent,
    IafasComponent,
    CrearIafaComponent,
    EditarIafaComponent,
    AgregarMedicamentoComponent,
    ConvenioComponent,
    InsertarEditarConvenioComponent,
    EliminarConvenioComponent,
    InsertarMedicamentoComponent,
    ConfirmacionComponent,
    PersonalContratanteComponent
  ],

  entryComponents: [
    CrearEditarServicioComponent,
    InsertarProductoComponent,
    EliminarProductoComponent,
    InsertarEditarCoberturaComponent,
    EliminarCoberturaComponent,
    FijarPrecioComponent,
    EliminarComponent,
    CrearEditarServicioComponent,
    FijarPrecioComponent,
    InsertarServicioCoberturaComponent,
    ModalConfirmacionComponent,
    InsertarEditarContratanteComponent,
    EliminarContratanteComponent,
    CrearIafaComponent,
    EditarIafaComponent,
    AgregarMedicamentoComponent,
    InsertarEditarConvenioComponent,
    EliminarConvenioComponent,
    InsertarMedicamentoComponent,
    ConfirmacionComponent,
    ModalConfirmacionComponent

  ],

  providers: [
    TarifarioService,
    AreaService,
    AreaEspecialidadService,
    AreaEspecialidadActividadService,
    ProductoServiceService,
    CoberturaServiceService,
    ConvenioService,
    ServicioCoberturaService,
    ProcedimientosService,
    MedicamentoService,
    ContratanteService,
    IafasService,
    MantenimientoAnaquelService,
    RecetaService,
    MovimientoService,
    PersonalContratanteService,
    CitaExamenesAuxiliaresService
  ]
})
export class TarifarioModule { }
