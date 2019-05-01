import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PrincipalComponent } from './principal/principal.component';

// guards
import { AuthGuard } from './../shared/auth/guards/auth.guard';
import { RoleGuard } from './../shared/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children: [
      {
        path: 'almacen', loadChildren: '../module/almacen/almacen.module#AlmacenModule',
        canLoad: [AuthGuard, RoleGuard]
      },
      {
        path: 'inventario', loadChildren: '../module/inventario/inventario.module#InventarioModule',
        canLoad: [AuthGuard, RoleGuard]
      },
      {
        path: 'compra', loadChildren: '../module/compra/compra.module#CompraModule',
        canLoad: [AuthGuard, RoleGuard]
      },
      // {
      //   path: 'farmacia', loadChildren: '../module/farmacia/farmacia.module#FarmaciaModule',
      //   canLoad: [AuthGuard, RoleGuard]
      // },
      // {
      //   path: 'mantenimiento', loadChildren: '../module/mantenimiento/mantenimiento.module#MantenimientoModule',
      //   canLoad: [AuthGuard, RoleGuard]
      // },
      //  {
      //   path: 'seguridad', loadChildren: '../module/seguridad/seguridad.module#SeguridadModule',
      //   canLoad: [AuthGuard, RoleGuard]
      // },
      // {
      //  path: 'maestras', loadChildren: '../module/maestras/maestras.module#MaestrasModule',
      //  canLoad: [AuthGuard, RoleGuard]
      // },
      // {
      //   path: 'caja', loadChildren: '../module/caja/caja.module#CajaModule',
      //   canLoad: [AuthGuard, RoleGuard]
      // },
      // {
      //   path: 'tarifario', loadChildren: '../module/tarifario/tarifario.module#TarifarioModule',
      //   canLoad: [AuthGuard, RoleGuard]
      // }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
