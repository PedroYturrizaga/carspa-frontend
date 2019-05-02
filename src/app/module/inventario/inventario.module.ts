import { NgModule } from '@angular/core';
import { ModuleModule } from '../module.module';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioContentComponent } from './inventario-content/inventario-content.component';
import { AdministrarMaquinariaComponent } from './inventario-content/administrar-maquinaria/administrar-maquinaria.component';
import { AdministrarMaterialComponent } from './inventario-content/administrar-material/administrar-material.component';
import { RegistrarActualizarComponent } from './inventario-content/administrar-material/registrar-actualizar/registrar-actualizar.component';
import { MaterialesInactivoComponent } from './inventario-content/administrar-material/materiales-inactivo/materiales-inactivo.component';

@NgModule({
  imports: [
    ModuleModule,
    InventarioRoutingModule
  ],
  declarations: [InventarioContentComponent, AdministrarMaquinariaComponent, AdministrarMaterialComponent, RegistrarActualizarComponent, MaterialesInactivoComponent]
})
export class InventarioModule { }
