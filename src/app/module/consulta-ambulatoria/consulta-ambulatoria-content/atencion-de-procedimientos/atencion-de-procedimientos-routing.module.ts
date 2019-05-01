import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtencionDeProcedimientosComponent } from './atencion-de-procedimientos/atencion-de-procedimientos.component';

const routes: Routes = [
  {
    path: '', component: AtencionDeProcedimientosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionDeProcedimientosRoutingModule { }
