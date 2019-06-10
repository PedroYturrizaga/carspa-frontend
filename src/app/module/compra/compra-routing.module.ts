import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraContentComponent } from './compra-content/compra-content.component';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component'
=======
import { AdministrarProveedorComponent } from './compra-content/administrar-proveedor/administrar-proveedor.component';
=======
import { AdministrarProveedorComponent } from './compra-content/administrar-proveedor/administrar-proveedor.component';

>>>>>>> Stashed changes


>>>>>>> Stashed changes

const routes: Routes = [
  {
    path: '', component: CompraContentComponent, children: [
      {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        path: 'listarProveedor', component: ListarProveedorComponent
      },

      {
        path: 'listarMaterialProveedor', component: ListarMaterialProveedorComponent
      },
      {
        path:'ordenCompra', component: OrdenCompraComponent
=======
        path: 'administrarProveedor', component: AdministrarProveedorComponent
>>>>>>> Stashed changes
=======
        path: 'administrarProveedor', component: AdministrarProveedorComponent
>>>>>>> Stashed changes
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
