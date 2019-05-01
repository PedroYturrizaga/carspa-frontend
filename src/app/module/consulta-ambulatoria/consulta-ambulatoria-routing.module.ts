import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { ConsultaAmbulatoriaContentComponent } from './consulta-ambulatoria-content/consulta-ambulatoria-content.component';

// guards
import { AuthGuard } from '../../shared/auth/guards/auth.guard';
import { RoleGuard } from '../../shared/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', component: ConsultaAmbulatoriaContentComponent, children: [
      
      { 
        // path: 'atencion-de-procedimientos', component: AtencionDeProcedimientosComponent , children: [
        // ]
        path: 'atencion-de-procedimientos', loadChildren: './consulta-ambulatoria-content/atencion-de-procedimientos/atencion-de-procedimientos.module#AtencionDeProcedimientosModule',
        canLoad: [AuthGuard, RoleGuard]
        
      },

      { 
        // path: 'atencion-de-procedimientos', component: AtencionDeProcedimientosComponent , children: [
        // ]
        path: 'atencion-medica-ambulatoria', loadChildren: './consulta-ambulatoria-content/atencion-medica-ambulatoria/atencion-medica-ambulatoria.module#AtencionMedicaAmbulatoriaModule',
        canLoad: [AuthGuard, RoleGuard]
        
      },
    
      // {
      //   path: 'atencion-medica-ambulatoria', component: AtencionMedicaAmbulatoriaComponent, children: [
      //     { path: 'atencion-medica', component: AtencionMedicaComponent, children:[
      //         { path: 'antecedentes-alimentacion', component: AntecedentesAlimentacionComponent },
      //         { path: 'antecedentes-fisiologicos', component: AntecedentesFisiologicosComponent },
      //         { path: 'antecedentes-generales', component: AntecedentesGeneralesComponent },
      //         { path: 'antecedentes-medicamentos', component: AntecedentesMedicamentosComponent },
      //         { path: 'antecedentes-patologicos', component: AntecedentesPatologicosComponent },
      //         { path: 'antecedentes-perinatales', component: AntecedentesPerinatalesComponent },
      //         { path: 'antecedentes-prenatales', component: AntecedentesPrenatalesComponent },
      //         { path: 'diagnostico', component: DiagnosticoComponent },
      //         { path: 'esquema-de-vacunacion', component: EsquemaDeVacunacionComponent },
      //         { path: 'examen-fisico', component: ExamenFisicoComponent },
      //         { path: 'resultado-atencion', component: ResultadoAtencionComponent },
      //         { path: 'valoracion-geriatrica', component: ValoracionGeriatricaComponent },
      //       ] 
      //     },

      //     { path: 'cita-examenes-auxiliares', component: CitaExamenesAuxiliaresComponent, children:[
      //         { path: 'examenes-anatomia-patologica', component: ExamenesAnatomiaPatologicaComponent },
      //         { path: 'examenes-anteriores', component: ExamenesAnterioresComponent },
      //         { path: 'examenes-imagenologia', component: ExamenesImagenologiaComponent },
      //         { path: 'examenes-laboratorio', component: ExamenesLaboratorioComponent },
      //        ] 
      //     },

      //     { path: 'detalle-atencion-medica', component: DetalleAtencionMedicaAmbulatoriaComponent },

      //     { path: 'orden-procedimiento', component: ProcedimientoComponent },

      //     { path: 'atencion-procedimiento', component: ProcedimientosARealizarComponent },

      //     { path: 'atencion-medica-receta', component: RecetaComponent, children:[
      //         { path: 'buscar-medicamento', component: BuscarMedicamentoComponent },
      //         { path: 'buscar-receta', component: BuscarRecetaComponent },
      //         { path: 'generar-receta', component: GenerarRecetaComponent },
      //        ] 
      //     },

      //     { path: 'atencion-medica-referencia', component: ReferenciaComponent },

      //     { path: 'ultimas-atenciones', component: UltimasAtencionesComponent },

      //   ],
      // },
      
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaAmbulatoriaRoutingModule { }
