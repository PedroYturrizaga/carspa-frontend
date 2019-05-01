import { TerapiaComponent } from './atencion-medica-ambulatoria/terapia/terapia.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtencionMedicaAmbulatoriaComponent } from './atencion-medica-ambulatoria/atencion-medica-ambulatoria.component';
import { AtencionMedicaComponent } from './atencion-medica-ambulatoria/atencion-medica/atencion-medica.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { AntecedentesAlimentacionComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-alimentacion/antecedentes-alimentacion.component';
import { AntecedentesFisiologicosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-fisiologicos/antecedentes-fisiologicos.component';
import { AntecedentesGeneralesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-generales/antecedentes-generales.component';
import { AntecedentesMedicamentosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-medicamentos/antecedentes-medicamentos.component';
import { AntecedentesPatologicosComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-patologicos/antecedentes-patologicos.component';
import { AntecedentesPerinatalesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-perinatales/antecedentes-perinatales.component';
import { AntecedentesPrenatalesComponent } from './atencion-medica-ambulatoria/atencion-medica/antecedentes-prenatales/antecedentes-prenatales.component';
import { DiagnosticoComponent } from './atencion-medica-ambulatoria/atencion-medica/diagnostico/diagnostico.component';
import { EsquemaDeVacunacionComponent } from './atencion-medica-ambulatoria/atencion-medica/esquema-de-vacunacion/esquema-de-vacunacion.component';
import { ExamenFisicoComponent } from './atencion-medica-ambulatoria/atencion-medica/examen-fisico/examen-fisico.component';
import { ResultadoAtencionComponent } from './atencion-medica-ambulatoria/atencion-medica/resultado-atencion/resultado-atencion.component';
import { ValoracionGeriatricaComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/valoracion-geriatrica.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 3
import { EstadoAfectivoComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-afectivo/estado-afectivo.component';
import { EstadoCognitivoComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-cognitivo/estado-cognitivo.component';
import { EstadoSocioFamiliarComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/estado-socio-familiar/estado-socio-familiar.component';
import { ValoracionFuncionalComponent } from './atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/valoracion-funcional/valoracion-funcional.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 3
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1


// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { CitaExamenesAuxiliaresComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/cita-examenes-auxiliares.component';

// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { ExamenesAnatomiaPatologicaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anatomia-patologica/examenes-anatomia-patologica.component';
import { ExamenesAnterioresComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-anteriores/examenes-anteriores.component';
import { ExamenesImagenologiaComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-imagenologia/examenes-imagenologia.component';
import { ExamenesLaboratorioComponent } from './atencion-medica-ambulatoria/cita-examenes-auxiliares/examenes-laboratorio/examenes-laboratorio.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { AtencionProcedimientoComponent } from './atencion-medica-ambulatoria/atencion-procedimiento/atencion-procedimiento.component';


// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { DetalleAtencionMedicaAmbulatoriaComponent } from './atencion-medica-ambulatoria/detalle-atencion-medica-ambulatoria/detalle-atencion-medica-ambulatoria.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1

// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { ProcedimientoComponent } from './atencion-medica-ambulatoria/procedimiento/procedimiento.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1

// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { ProcedimientosARealizarComponent } from './atencion-medica-ambulatoria/procedimientos-a-realizar/procedimientos-a-realizar.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1

// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { RecetaComponent } from './atencion-medica-ambulatoria/receta/receta.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { BuscarMedicamentoComponent } from './atencion-medica-ambulatoria/receta/buscar-medicamento/buscar-medicamento.component';
import { BuscarRecetaComponent } from './atencion-medica-ambulatoria/receta/buscar-receta/buscar-receta.component';
import { GenerarRecetaComponent } from './atencion-medica-ambulatoria/receta/generar-receta/generar-receta.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1

// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { ReferenciaComponent } from './atencion-medica-ambulatoria/referencia/referencia.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1

// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
// import { UltimasAtencionesComponent } from './atencion-medica-ambulatoria/ultimas-atenciones/ultimas-atenciones.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

// guards
import { AuthGuard } from '../../../../shared/auth/guards/auth.guard';
import { RoleGuard } from '../../../../shared/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', component: AtencionMedicaAmbulatoriaComponent, children: [
      {
        path: 'atencion-medica', component: AtencionMedicaComponent, children: [
          { path: 'antecedentes-alimentacion', component: AntecedentesAlimentacionComponent },
          { path: 'antecedentes-fisiologicos', component: AntecedentesFisiologicosComponent },
          { path: 'antecedentes-generales', component: AntecedentesGeneralesComponent },
          { path: 'antecedentes-medicamentos', component: AntecedentesMedicamentosComponent },
          { path: 'antecedentes-patologicos', component: AntecedentesPatologicosComponent },
          { path: 'antecedentes-perinatales', component: AntecedentesPerinatalesComponent },
          { path: 'antecedentes-prenatales', component: AntecedentesPrenatalesComponent },
          { path: 'diagnostico', component: DiagnosticoComponent },
          { path: 'esquema-de-vacunacion', component: EsquemaDeVacunacionComponent },
          { path: 'examen-fisico', component: ExamenFisicoComponent },
          { path: 'resultado-atencion', component: ResultadoAtencionComponent },
          { path: 'valoracion-geriatrica', component: ValoracionGeriatricaComponent },
        ],
      },
      {
        path: 'atencion-procedimiento', component: AtencionProcedimientoComponent,
      },
      {
        path: 'cita-examenes-auxiliares', component: CitaExamenesAuxiliaresComponent, children: [
          { path: 'examenes-anatomia-patologica', component: ExamenesAnatomiaPatologicaComponent },
          { path: 'examenes-anteriores', component: ExamenesAnterioresComponent },
          { path: 'examenes-imagenologia', component: ExamenesImagenologiaComponent },
          { path: 'examenes-laboratorio', component: ExamenesLaboratorioComponent },
        ]
      },

      { path: 'orden-procedimiento', component: ProcedimientoComponent },

      { path: 'atencion-procedimiento', component: ProcedimientosARealizarComponent },

      {
        path: 'atencion-medica-receta', component: RecetaComponent, children: [
          { path: 'buscar-medicamento', component: BuscarMedicamentoComponent },
          { path: 'buscar-receta', component: BuscarRecetaComponent },
          { path: 'generar-receta', component: GenerarRecetaComponent },
        ]
      },

      { path: 'atencion-medica-referencia', component: ReferenciaComponent },

      { path: 'terapia', component: TerapiaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionMedicaAmbulatoriaRoutingModule { }
