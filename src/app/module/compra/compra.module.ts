import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraRoutingModule } from './compra-routing.module';
import { CompraContentComponent } from './compra-content/compra-content.component';
import { RegistrarProveedorComponent } from './compra-content/registrar-proveedor/registrar-proveedor.component';
import { ModuleModule } from '../module.module';

@NgModule({
  imports: [
    ModuleModule,
    CompraRoutingModule
  ],
  declarations: [CompraContentComponent, RegistrarProveedorComponent]
})
export class CompraModule { }
