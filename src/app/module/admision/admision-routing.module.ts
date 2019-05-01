import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { AdmisionContentComponent } from './admision-content/admision-content.component';

//#region acredita 
import { AcreditaComponent } from './admision-content/acredita/acredita/acredita.component';
// import { CoberturaComponent } from './admision-content/acredita/acredita/cobertura/cobertura.component';
//#endregion

//#region cita
import { CitaComponent } from './admision-content/cita/cita/cita.component';
import { AsignarCitaComponent } from './admision-content/cita/cita/asignar-cita/asignar-cita.component';
import { CitaVirtualComponent } from './admision-content/cita/cita/cita-virtual/cita-virtual.component';
import { ProgramacionesComponent } from './admision-content/cita/cita/cita-virtual/programaciones/programaciones.component';
//#endregion

//#region cita-procedimiento
import { CitaProcedimientoComponent } from './admision-content/cita-procedimiento/cita-procedimiento.component';
//#endregion

//#region filiacion
import { FiliacionComponent } from './admision-content/filiacion/filiacion.component';
import { PersonaComponent } from './admision-content/filiacion/persona/persona.component';
//#endregion

//#region personal
import { PersonalComponent } from './admision-content/personal/personal.component';
import { MantenimientoPersonalComponent } from './admision-content/personal/mantenimiento-personal/mantenimiento-personal.component';
//#endregion

//#region programacion
import { ProgramacionComponent } from './admision-content/programacion/programacion/programacion.component';
import { AprobacionComponent } from './admision-content/programacion/programacion/aprobacion/aprobacion.component';
import { DetallesComponent } from './admision-content/programacion/programacion/aprobacion/detalles/detalles.component';
import { RegistroComponent } from './admision-content/programacion/programacion/registro/registro.component';
//#endregion

// guards
import { AuthGuard } from '../../shared/auth/guards/auth.guard';
import { RoleGuard } from '../../shared/auth/guards/role.guard';
import { CoberturaComponent } from './admision-content/acredita/acredita/cobertura/cobertura.component';
import { ProformaComponent } from './admision-content/proforma/proforma.component';

const routes: Routes = [
  {
    path: '', component: AdmisionContentComponent, children: [

      { 
          // path: 'p-acredita', component: AcreditaComponent, pathMatch: 'full', children: [
         // { path: 'cobertura', component: CoberturaComponent },
        // path: 'acredita', loadChildren: './admision-content/acredita/acredita.module#AcreditaModule',
        path: 'p-acredita', component: AcreditaComponent, children: [
          { path: 'cobertura', component: CoberturaComponent },
        ],
        
      },

      {
        // path: 'cita', loadChildren: './admision-content/cita/cita.module#CitaModule',
        path: 'cita', component: CitaComponent, children: [
          { path: 'asignar-cita', component: AsignarCitaComponent },
          { path: 'cita-virtual', component: CitaVirtualComponent, children:[
              { path: 'programaciones', component: ProgramacionesComponent },
            ] 
          },
        ],
      },

      {
        path: 'cita-procedimiento', component: CitaProcedimientoComponent,
      },

      {
        path: 'filiacion', component: FiliacionComponent,
        // children: [
        //   { path: 'persona', component: PersonaComponent },
        // ],
      },

      {
        path: 'personal', component: PersonalComponent,children: [
          { 
            path: 'mantenimiento-personal', component: MantenimientoPersonalComponent
          },
        ],
      },  

      {
        // path: 'programacion', loadChildren: './admision-content/programacion/programacion.module#ProgramacionModule',
        path: 'programacion', component: ProgramacionComponent, children: [
          { path: 'programacion-personal', component: RegistroComponent },
          { path: 'aprobacion-personal', component: AprobacionComponent
            // children:[
            //   { path: 'detalles', component: DetallesComponent },
            // ] 
          },         
        ],
      }, 
      {
        path: 'proforma', component: ProformaComponent
      }

    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmisionRoutingModule { }