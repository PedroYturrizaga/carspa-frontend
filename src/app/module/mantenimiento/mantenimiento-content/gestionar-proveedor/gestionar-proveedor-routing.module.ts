import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

//#region gestionar-proveedor
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';
//#endregion

const routes: Routes = [
  {
    path: '', component: GestionarProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarProveedorRoutingModule { }
