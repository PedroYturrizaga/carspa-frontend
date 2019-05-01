import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraContentComponent } from './compra-content/compra-content.component';
import { RegistrarProveedorComponent } from './compra-content/registrar-proveedor/registrar-proveedor.component';


const routes: Routes = [
  {
    path: '', component: CompraContentComponent, children: [
      {
        path: 'registrarProveedor', component: RegistrarProveedorComponent
      },
      // {
      //   path: 'administrarMaterial', component: AdministrarMaterialComponent
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
