import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';

const routes: Routes = [
  {
    path: '', component: AlmacenContentComponent, children: [
      {
        path: 'registrar-material', component: RegistrarMaterialComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlmacenRoutingModule { }
