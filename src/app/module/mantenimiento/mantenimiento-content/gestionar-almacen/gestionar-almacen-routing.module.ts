import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

//#region gestionar-almacen
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
//#endregion

const routes: Routes = [
  {
    path: '', component: GestionarAlmacenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarAlmacenRoutingModule { }
