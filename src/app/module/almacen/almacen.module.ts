import { AlmacenService } from './services/almacen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';
import { ModuleModule } from '../module.module';
import { VisualizarMaterialesComponent } from './almacen-content/registrar-material/visualizar-materiales/visualizar-materiales.component';

@NgModule({
  imports: [
    ModuleModule,
    AlmacenRoutingModule
  ],
  // DENTRO DE DECLARATIONS VAN TUS COMPONENTES PRINCIPALES Y MODALES
  declarations: [AlmacenContentComponent, RegistrarMaterialComponent, VisualizarMaterialesComponent],
  // DENTRO DE ENTRY COMPOMENTS VAN SOLO MODALES
  entryComponents: [
    VisualizarMaterialesComponent
  ],
  // DENTRO DE PROVIDERS VAN SOLO SERVICES
  providers: [
    AlmacenService
  ]
})
export class AlmacenModule { }
