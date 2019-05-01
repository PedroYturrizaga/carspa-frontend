import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { MantenimientoContentComponent } from './mantenimiento-content/mantenimiento-content.component';

// guards
import { AuthGuard } from '../../shared/auth/guards/auth.guard';
import { RoleGuard } from '../../shared/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', component: MantenimientoContentComponent, children: [
      {
        path: 'gestionar-almacen', loadChildren: './mantenimiento-content/gestionar-almacen/gestionar-almacen.module#GestionarAlmacenModule',
        canLoad: [AuthGuard, RoleGuard]
      },
      {
        path: 'gestionar-proveedor', loadChildren: './mantenimiento-content/gestionar-proveedor/gestionar-proveedor.module#GestionarProveedorModule',
        canLoad: [AuthGuard, RoleGuard]
      },
      {
        path: 'mantenimiento-medicamento', loadChildren: './mantenimiento-content/medicamento-material/medicamento-material.module#MedicamentoMaterialModule',
        canLoad: [AuthGuard, RoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
