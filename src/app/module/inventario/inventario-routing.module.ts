import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioContentComponent } from './inventario-content/inventario-content.component';
import { AdministrarMaquinariaComponent } from './inventario-content/administrar-maquinaria/administrar-maquinaria.component';
import { AdministrarMaterialComponent } from './inventario-content/administrar-material/administrar-material.component';

const routes: Routes = [
  {
    path: '', component: InventarioContentComponent, children: [
      {
        path: 'administrarMaquinaria', component: AdministrarMaquinariaComponent
      },
      {
        path: 'administrarMaterial', component: AdministrarMaterialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
