import { VerProcedimientosComponent } from './admision-content/cita-procedimiento/ver-procedimientos/ver-procedimientos.component';
import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { AdmisionRoutingModule } from './admision-routing.module';

// content
import { AdmisionContentComponent } from './admision-content/admision-content.component';
//importando air datepicker
import { AirdatepickerDirective } from '../../shared/helpers/directivas/airdatepicker.directive';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

//#acredita 
import { AcreditaComponent } from './admision-content/acredita/acredita/acredita.component';
import { CoberturaComponent } from './admision-content/acredita/acredita/cobertura/cobertura.component';
import { ConfirmarComponent } from './admision-content/acredita/acredita/cobertura/confirmar/confirmar.component';
import { ManualComponent } from './admision-content/acredita/acredita/cobertura/manual/manual.component';
import { ParticularComponent } from './admision-content/acredita/acredita/particular/particular.component';
//#acredita

//#region cita
import { CitaComponent } from './admision-content/cita/cita/cita.component';
import { AsignarCitaComponent } from './admision-content/cita/cita/asignar-cita/asignar-cita.component';
import { ListadoProgramacionComponent } from './admision-content/cita/cita/asignar-cita/listado-programacion/listado-programacion.component';
import { CitaVirtualComponent } from './admision-content/cita/cita/cita-virtual/cita-virtual.component';
import { ProgramacionesComponent } from './admision-content/cita/cita/cita-virtual/programaciones/programaciones.component';
import { RegistrarCitaVirtualComponent } from './admision-content/cita/cita/cita-virtual/registrar-cita-virtual/registrar-cita-virtual.component';
import { VerHorarioComponent } from './admision-content/cita/cita/cita-virtual/registrar-cita-virtual/ver-horario/ver-horario.component';
import { ConfirmarCitaComponent } from './admision-content/cita/cita/confirmar-cita/confirmar-cita.component';
import { HistorialComponent } from './admision-content/cita/cita/historial/historial.component';
import { SearchPacienteComponent } from './admision-content/cita/cita/search-paciente/search-paciente.component';
import { SelectCitaComponent } from './admision-content/cita/cita/select-cita/select-cita.component';
import { ConfirmarSelectCitaComponent } from './admision-content/cita/cita/select-cita/confirmar-select-cita/confirmar-select-cita.component';
import { SuspenderCitaComponent } from './admision-content/cita/cita/suspender-cita/suspender-cita.component';
import { ModalMadresComponent} from "../../shared/helpers/modal-madres/modal-madres.component";
//#endregion

//#region cita-procedimiento
import { CitaProcedimientoComponent } from './admision-content/cita-procedimiento/cita-procedimiento.component';
import { PacientesCitadosComponent } from './admision-content/cita-procedimiento/pacientes-citados/pacientes-citados.component';
import { ConfirmarReservaComponent } from './admision-content/cita-procedimiento/confirmar-reserva/confirmar-reserva.component';
//#endregion

//#region filiacion
import { FiliacionComponent } from './admision-content/filiacion/filiacion.component';
import { PersonaComponent } from './admision-content/filiacion/persona/persona.component';
//#endregion

//#region personal
import { PersonalComponent } from './admision-content/personal/personal.component';
import { MantenimientoPersonalComponent } from './admision-content/personal/mantenimiento-personal/mantenimiento-personal.component';
import { ActividadPersonalDeleteComponent } from './admision-content/personal/mantenimiento-personal/actividad-personal-delete/actividad-personal-delete.component';
import { PersonalDeleteComponent } from './admision-content/personal/personal-delete/personal-delete.component';
//#endregion


//#region programacion
import { ProgramacionComponent } from './admision-content/programacion/programacion/programacion.component';
import { AprobacionComponent } from './admision-content/programacion/programacion/aprobacion/aprobacion.component';
import { DetallesComponent } from './admision-content/programacion/programacion/aprobacion/detalles/detalles.component';
import { AprobarTodosComponent } from './admision-content/programacion/programacion/aprobacion/detalles/aprobar-todos/aprobar-todos.component';
import { ConfirmacionComponent } from './admision-content/programacion/programacion/aprobacion/detalles/confirmacion/confirmacion.component';
import { SuspenderComponent } from './admision-content/programacion/programacion/aprobacion/detalles/suspender/suspender.component';
import { RegistroComponent } from './admision-content/programacion/programacion/registro/registro.component';
import { AddTurnoComponent } from './admision-content/programacion/programacion/registro/add-turno/add-turno.component';
import { ModalDeleteComponent } from './admision-content/programacion/programacion/registro/modal-delete/modal-delete.component';
import { ModalRestriccionesComponent } from './admision-content/programacion/programacion/registro/modal-restricciones/modal-restricciones.component';
//#endregion

//#region services
import { AcreditaService } from './services/acredita.service';
import { CitaProcedimientoService } from './services/cita-procedimiento.service';
import { CitaService } from './services/cita.service';
import { FiliacionService } from './services/filiacion.service';
import { PersonalService } from './services/personal.service';
import { ProgramacionAprobacionService } from './services/programacion-aprobacion.service';
import { ProgramacionService } from './services/programacion.service';
import { DataService } from './../../shared/services/data.service';
import { ListarOrdenesCobroService } from '../caja/services/listar-ordenes-cobro.service';
import { ModalPdfComponent } from '../../shared/helpers/modal-pdf/modal-pdf.component';
import { SuspensionCitaComponent } from './admision-content/cita-procedimiento/suspension-cita/suspension-cita.component';
import { ProformaComponent } from './admision-content/proforma/proforma.component';
import { CoberturaServiceService } from '../tarifario/services/cobertura-service.service';
import { ServicioCoberturaService } from '../tarifario/services/servicio-cobertura.service';
import { TarificadorService } from '../tarifario/services/tarificador.service';
import { MedicamentoService } from '../tarifario/services/medicamento.service';
import { MovimientoService } from '../farmacia/services/movimiento.service';
import { TarifarioService } from '../tarifario/services/tarifario.service';
import { MantenimientoAnaquelService } from '../farmacia/services/mantenimiento-anaquel.service';
import { CoberturaService } from './services/cobertura.service';
import { ConveniosService } from './services/convenios.service';
import { BuscarCoberturaComponent } from './admision-content/proforma/buscar-cobertura/buscar-cobertura.component';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    AdmisionRoutingModule,

    MatFormFieldModule,
    MatInputModule

  ],
  declarations: [
    AdmisionContentComponent,
    AcreditaComponent, // acredita
      CoberturaComponent, // 1
        ConfirmarComponent, ManualComponent, // 2
      ParticularComponent, // 1
    CitaComponent, // cita
    AsignarCitaComponent, // 1
    ListadoProgramacionComponent, // 2
    CitaVirtualComponent, // 1
    ProgramacionesComponent, RegistrarCitaVirtualComponent, // 2
    VerHorarioComponent, // 3
    ConfirmarCitaComponent, HistorialComponent, // 1
    SearchPacienteComponent, SelectCitaComponent, // 1
    ConfirmarSelectCitaComponent, // 2
    SuspenderCitaComponent, // 1,
    ModalMadresComponent,
    CitaProcedimientoComponent, // cita-procedimiento
    ConfirmarReservaComponent, PacientesCitadosComponent,VerProcedimientosComponent,// 1
    FiliacionComponent, // filiacion
    PersonaComponent, // 1
    PersonalComponent, // personal
    MantenimientoPersonalComponent, // 1
    ActividadPersonalDeleteComponent, // 2
    PersonalDeleteComponent, // 1
    ProgramacionComponent, // programacion
    AprobacionComponent, // 1
    DetallesComponent, // 2
    AprobarTodosComponent, ConfirmacionComponent, // 3
    SuspenderComponent, // 3
    RegistroComponent, // 1
    AddTurnoComponent, ModalDeleteComponent, // 2
    ModalRestriccionesComponent, // 2
    AirdatepickerDirective, SuspensionCitaComponent, ProformaComponent, BuscarCoberturaComponent

  ],
  entryComponents: [
    //MODALES ACREDITA COMPONENTE:
    CoberturaComponent, ConfirmarComponent, ManualComponent, ParticularComponent,

    //MODALES CITA:
    ListadoProgramacionComponent, RegistrarCitaVirtualComponent,
    VerHorarioComponent, ConfirmarCitaComponent, HistorialComponent,
    SearchPacienteComponent, SelectCitaComponent, ConfirmarSelectCitaComponent,
    SuspenderCitaComponent,ModalMadresComponent,

    //MODALES CITA-PROCEDIMIENTO
    ConfirmarReservaComponent, PacientesCitadosComponent,VerProcedimientosComponent,SuspensionCitaComponent,

    //MODALES PERSONAL
    ActividadPersonalDeleteComponent, PersonalDeleteComponent,

    //MODALES PROGRAMACION
    AprobarTodosComponent, ConfirmacionComponent, SuspenderComponent,
    AddTurnoComponent, ModalDeleteComponent, ModalRestriccionesComponent,
    ModalPdfComponent,

    //PROFORMA 
    BuscarCoberturaComponent
  ],
  providers: [
    AcreditaService,
    CitaProcedimientoService,
    CitaService,
    FiliacionService,
    PersonalService,
    ProgramacionAprobacionService,
    ProgramacionService,
    DataService,
    ListarOrdenesCobroService,
    CoberturaServiceService,
    ServicioCoberturaService,
    TarificadorService,
    MedicamentoService,
    MovimientoService,
    TarifarioService,
    MantenimientoAnaquelService,
    CoberturaService,
    ConveniosService
  ]
})
export class AdmisionModule { }
