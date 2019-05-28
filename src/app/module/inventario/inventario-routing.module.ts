import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioContentComponent } from './inventario-content/inventario-content.component';
import { AdministrarMaquinariaComponent } from './inventario-content/administrar-maquinaria/administrar-maquinaria.component';
import { AdministrarMaterialComponent } from './inventario-content/administrar-material/administrar-material.component';
import { ControlarStockComponent } from "./inventario-content/controlar-stock/controlar-stock.component";

const routes: Routes = [
  {
    path: '', component: InventarioContentComponent, children: [
      {
        path: 'administrarMaquinaria', component: AdministrarMaquinariaComponent
      },
      {
        path: 'administrarMaterial', component: AdministrarMaterialComponent
      },
      {
        path: 'controlarStock', component: ControlarStockComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
