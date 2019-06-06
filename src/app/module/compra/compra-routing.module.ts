import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraContentComponent } from './compra-content/compra-content.component';
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component'

const routes: Routes = [
  {
    path: '', component: CompraContentComponent, children: [
      {
        path: 'listarProveedor', component: ListarProveedorComponent
      },

      {
        path: 'listarMaterialProveedor', component: ListarMaterialProveedorComponent
      },
      {
        path:'ordenCompra', component: OrdenCompraComponent
      }
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
