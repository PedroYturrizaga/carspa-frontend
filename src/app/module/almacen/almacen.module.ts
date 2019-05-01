import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';
import { ModuleModule } from '../module.module';

@NgModule({
  imports: [
    ModuleModule,
    AlmacenRoutingModule
  ],
  declarations: [AlmacenContentComponent, RegistrarMaterialComponent]
})
export class AlmacenModule { }
