// import { TerapiaService } from './../../services/terapia.service';
// import { TerapiaComponent } from './atencion-medica-ambulatoria/terapia/terapia.component';
// import { VerDetalleComponent } from './atencion-medica-ambulatoria/receta/generar-receta/ver-detalle/ver-detalle.component';
// import { DataService } from './../../../../shared/services/data.service';
// import { NgModule } from '@angular/core';
// // module
// import { ModuleModule } from '../../../module.module';

// import { AtencionMedicaAmbulatoriaRoutingModule } from './atencion-medica-ambulatoria-routing.module';
// import { AtencionMedicaAmbulatoriaComponent } from './atencion-medica-ambulatoria/atencion-medica-ambulatoria.component';

// //#region atencion-medica-ambulatoria
// import { AtencionMedicaComponent } from './atencion-medica-ambulatoria/atencion-medica/atencion-medica.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { AntecedentesAlimentacionComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-alimentacion/antecedentes-alimentacion.component';
// import { AntecedentesFisiologicosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-fisiologicos/antecedentes-fisiologicos.component';
// import { AntecedentesGeneralesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-generales/antecedentes-generales.component';
// import { AntecedentesMedicamentosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-medicamentos/antecedentes-medicamentos.component';
// import { AntecedentesPatologicosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-patologicos/antecedentes-patologicos.component';
// import { AntecedentesPerinatalesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-perinatales/antecedentes-perinatales.component';
// import { AntecedentesPrenatalesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-prenatales/antecedentes-prenatales.component';
// import { DiagnosticoComponent } from './atencion-medica-ambulatoria/atencion-medica/diagnostico/diagnostico.component';
// import { EsquemaDeVacunacionComponent } from './atencion-medica-ambulatoria/atencion-medica/esquema-de-vacunacion/esquema-de-vacunacion.component';
// import { ExamenFisicoComponent } from './atencion-medica-ambulatoria/atencion-medica/examen-fisico/examen-fisico.component';
// import { ResultadoAtencionComponent } from './atencion-medica-ambulatoria/atencion-medica/resultado-atencion/resultado-atencion.component';
// import { ValoracionGeriatricaComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/valoracion-geriatrica.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { EstadoAfectivoComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-afectivo/estado-afectivo.component';
// import { EstadoCognitivoComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-cognitivo/estado-cognitivo.component';
// import { EstadoSocioFamiliarComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-socio-familiar/estado-socio-familiar.component';
// import { ValoracionFuncionalComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/valoracion-funcional/valoracion-funcional.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// import { CitaExamenesAuxiliaresComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/cita-examenes-auxiliares.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { ExamenesAnatomiaPatologicaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anatomia-patologica/examenes-anatomia-patologica.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { ExamenesAnatomiaPatologicaActualizaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anatomia-patologica/examenes-anatomia-patologica-actualiza/examenes-anatomia-patologica-actualiza.component';
// import { ExamenesAnatomiaPatologicaDeleteComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anatomia-patologica/examenes-anatomia-patologica-delete/examenes-anatomia-patologica-delete.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// import { ExamenesAnterioresComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anteriores/examenes-anteriores.component';
// import { ExamenesImagenologiaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-imagenologia/examenes-imagenologia.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { ExamenesImagenologiaActualizaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-imagenologia/examenes-imagenologia-actualiza/examenes-imagenologia-actualiza.component';
// import { ExamenesImagenologiaDeleteComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-imagenologia/examenes-imagenologia-delete/examenes-imagenologia-delete.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// import { ExamenesLaboratorioComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-laboratorio/examenes-laboratorio.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { ExamenesLaboratorioDeleteComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-laboratorio/examenes-laboratorio-delete/examenes-laboratorio-delete.component';
// import { ExamenesLaboratorioActualizaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-laboratorio/examenes-laboratorio-actualiza/examenes-laboratorio-actualiza.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// import { DetalleAtencionMedicaAmbulatoriaComponent } from './atencion-medica-ambulatoria/detalle-atencion-medica-ambulatoria/detalle-atencion-medica-ambulatoria.component';
// import { ProcedimientoComponent } from './atencion-medica-ambulatoria/procedimiento/procedimiento.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { ProcedimientosAnterioresComponent } from './atencion-medica-ambulatoria/procedimiento/procedimientos-anteriores/procedimientos-anteriores.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { DetallesProcedimientoComponent } from './atencion-medica-ambulatoria/procedimiento/procedimientos-anteriores/detalles-procedimiento/detalles-procedimiento.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// import { ProcedimientosARealizarComponent } from './atencion-medica-ambulatoria/procedimientos-a-realizar/procedimientos-a-realizar.component';
// import { RecetaComponent } from './atencion-medica-ambulatoria/receta/receta.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { BuscarMedicamentoComponent } from './atencion-medica-ambulatoria/receta/buscar-medicamento/buscar-medicamento.component';
// import { BuscarRecetaComponent } from './atencion-medica-ambulatoria/receta/buscar-receta/buscar-receta.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { VisualizarDetalleRecetaComponent } from './atencion-medica-ambulatoria/receta/buscar-receta/visualizar-detalle-receta/visualizar-detalle-receta.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// import { GenerarRecetaComponent } from './atencion-medica-ambulatoria/receta/generar-receta/generar-receta.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
// import { DeleteMedicamentoComponent } from './atencion-medica-ambulatoria/receta/generar-receta/delete-medicamento/delete-medicamento.component';
// import { DeleteRecetaComponent } from './atencion-medica-ambulatoria/receta/generar-receta/delete-receta/delete-receta.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// import { ReferenciaComponent } from './atencion-medica-ambulatoria/referencia/referencia.component';
// import { UltimasAtencionesComponent } from './atencion-medica-ambulatoria/ultimas-atenciones/ultimas-atenciones.component';
// // /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { HistoriaClinicaComponent } from './atencion-medica-ambulatoria/ultimas-atenciones/historia-clinica/historia-clinica.component';
// // \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// // \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
// import { ExamenesTipoComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-tipo/examenes-tipo.component'
// import { ExamenTipoEliminaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-tipo/examen-tipo-elimina/examen-tipo-elimina.component'
// import { ExamenTipoAcatualizaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-tipo/examen-tipo-acatualiza/examen-tipo-acatualiza.component'
// // \|||||||||||||||||||||||||||||||||||||||||||||||||/ 
// import { AtencionProcedimientoComponent } from './atencion-medica-ambulatoria/atencion-procedimiento/atencion-procedimiento.component';


// //#endregion

// //#region services
// import { AtencionMedicaAmbulatoriaService } from '../../services/atencion-medica-ambulatoria.service';
// import { AtencionMedicaService } from '../../services/atencion-medica.service';
// import { CitaExamenesAuxiliaresService } from '../../services/cita-examenes-auxiliares.service';
// import { EsquemaDeVacunacionService } from '../../services/esquema-de-vacunacion.service';
// import { ExamenFisicoService } from '../../services/examen-fisico.service';
// import { ProcedimientosService } from '../../services/procedimientos.service';
// // import { RecetaService } from '../../services/receta.service';
// import { RedAsistencialService } from '../../services/red-asistencial.service';
// import { ResultadoAtencionService } from '../../services/resultado-atencion.service';
// import { UltimasAtencionesService } from '../../services/ultimas-atenciones.service';
// import { ValoracionGeriatricaService } from '../../services/valoracion-geriatrica.service';
// import { ComboGeneralService } from '../../../../shared/services/combo-general.service';
// import { ReferenciaService } from '../../services/referencia.service';

// //#endregion
// const EXPORTS = [
//   RecetaComponent,
//   BuscarMedicamentoComponent,
//   BuscarRecetaComponent, // 2
//   VisualizarDetalleRecetaComponent, // 3
//   GenerarRecetaComponent, // 2
//   DeleteMedicamentoComponent,
//   DeleteRecetaComponent, // 3
//   VerDetalleComponent
// ];

// @NgModule({
//   imports: [
//     ModuleModule,
//     AtencionMedicaAmbulatoriaRoutingModule,
//     //RecetaComponent
//   ],
//   exports: EXPORTS,
//   declarations: [
//     AtencionMedicaAmbulatoriaComponent, // atencion-medica-ambulatoria
//     AtencionMedicaComponent, // 1
//     AntecedentesAlimentacionComponent, AntecedentesFisiologicosComponent, // 1
//     AntecedentesGeneralesComponent, AntecedentesMedicamentosComponent, // 1
//     AntecedentesPatologicosComponent, AntecedentesPerinatalesComponent, // 1
//     AntecedentesPrenatalesComponent, // 1
//     DiagnosticoComponent, EsquemaDeVacunacionComponent, // 1
//     ExamenFisicoComponent, ResultadoAtencionComponent, // 1
//     ValoracionGeriatricaComponent, // 1
//     EstadoAfectivoComponent, EstadoCognitivoComponent, //2
//     EstadoSocioFamiliarComponent, ValoracionFuncionalComponent, //2
//     CitaExamenesAuxiliaresComponent, // 1
//     ExamenesAnatomiaPatologicaComponent, // 1
//     ExamenesAnatomiaPatologicaActualizaComponent, ExamenesAnatomiaPatologicaDeleteComponent, // 2
//     ExamenesAnterioresComponent, ExamenesImagenologiaComponent, // 1
//     ExamenesImagenologiaActualizaComponent, ExamenesImagenologiaDeleteComponent, // 2
//     ExamenesLaboratorioComponent, // 1
//     ExamenesLaboratorioActualizaComponent, ExamenesLaboratorioDeleteComponent, // 2
//     DetalleAtencionMedicaAmbulatoriaComponent, ProcedimientoComponent, // 1
//     ProcedimientosAnterioresComponent, // 2
//     DetallesProcedimientoComponent, // 3
//     ProcedimientosARealizarComponent,
//     RecetaComponent, // 1
//     BuscarMedicamentoComponent,
//     BuscarRecetaComponent, // 2
//     VisualizarDetalleRecetaComponent, // 3
//     GenerarRecetaComponent, // 2
//     DeleteMedicamentoComponent,
//     DeleteRecetaComponent, // 3
//     VerDetalleComponent,
//     ReferenciaComponent, UltimasAtencionesComponent, // 1
//     HistoriaClinicaComponent, // 2
//     ExamenesTipoComponent,
//     ExamenTipoEliminaComponent,
//     ExamenTipoAcatualizaComponent,
//     AtencionProcedimientoComponent,
//     TerapiaComponent
//   ],
//   entryComponents: [
//     //atencion-medica-ambulatoria
//     //cita-examenes-auxiliares:
//     ExamenesAnatomiaPatologicaActualizaComponent, ExamenesAnatomiaPatologicaDeleteComponent,
//     ExamenesImagenologiaActualizaComponent, ExamenesImagenologiaDeleteComponent,
//     ExamenesLaboratorioDeleteComponent, ExamenesLaboratorioActualizaComponent,
//     //procedimiento
//     ProcedimientosAnterioresComponent, DetallesProcedimientoComponent,
//     //receta
//     VisualizarDetalleRecetaComponent, DeleteMedicamentoComponent, DeleteRecetaComponent,
//     //ultimas-atenciones
//     HistoriaClinicaComponent,

//     DetalleAtencionMedicaAmbulatoriaComponent,
//     ExamenesTipoComponent, ExamenTipoAcatualizaComponent, ExamenTipoEliminaComponent

//   ],
//   providers: [
//     AtencionMedicaAmbulatoriaService,
//     AtencionMedicaService,
//     CitaExamenesAuxiliaresService,
//     EsquemaDeVacunacionService,
//     ExamenFisicoService,  
//     ProcedimientosService,
//     RedAsistencialService,
//     ResultadoAtencionService,
//     UltimasAtencionesService,
//     ValoracionGeriatricaService,
//     ComboGeneralService,
//     DataService,
//     ReferenciaService,
//     TerapiaService
//   ]
// })
// export class AtencionMedicaAmbulatoriaModule { }
