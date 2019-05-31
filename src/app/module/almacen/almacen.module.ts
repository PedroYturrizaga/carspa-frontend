import { AlmacenService } from './services/almacen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';
import { ModuleModule } from '../module.module';
import { VisualizarMaterialesComponent } from './almacen-content/registrar-material/visualizar-materiales/visualizar-materiales.component';
import { RegistrarAnaquelComponent } from './almacen-content/registrar-material/registrar-anaquel/registrar-anaquel.component';
import { SalidaMaterialComponent } from './almacen-content/salida-material/salida-material.component';

@NgModule({
  imports: [
    ModuleModule,
    AlmacenRoutingModule
  ],
  declarations: [
    AlmacenContentComponent,
    RegistrarMaterialComponent,
    VisualizarMaterialesComponent,
    RegistrarAnaquelComponent,
    SalidaMaterialComponent
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
