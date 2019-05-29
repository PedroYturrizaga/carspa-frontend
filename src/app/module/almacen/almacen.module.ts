import { AlmacenService } from './services/almacen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';
import { ModuleModule } from '../module.module';
import { VisualizarMaterialesComponent } from './almacen-content/registrar-material/visualizar-materiales/visualizar-materiales.component';
import { RegistrarAnaquelComponent } from './almacen-content/registrar-material/registrar-anaquel/registrar-anaquel.component';

@NgModule({
  imports: [
    ModuleModule,
    AlmacenRoutingModule
  ],
  declarations: [
    AlmacenContentComponent,
    RegistrarMaterialComponent,
    VisualizarMaterialesComponent,
    RegistrarAnaquelComponent
  ],

  entryComponents: [
    VisualizarMaterialesComponent,
    RegistrarAnaquelComponent
  ],

  providers: [
    AlmacenService
  ]
})
export class AlmacenModule { }
