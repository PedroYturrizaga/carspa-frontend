import { NgModule } from '@angular/core';
import { ModuleModule } from '../module.module';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioContentComponent } from './inventario-content/inventario-content.component';
import { AdministrarMaquinariaComponent } from './inventario-content/administrar-maquinaria/administrar-maquinaria.component';
import { AdministrarMaterialComponent } from './inventario-content/administrar-material/administrar-material.component';
import { RegistrarActualizarComponent } from './inventario-content/administrar-material/registrar-actualizar/registrar-actualizar.component';
import { MaterialesInactivoComponent } from './inventario-content/administrar-material/materiales-inactivo/materiales-inactivo.component';
import { MaquinariasInactivoComponent } from './inventario-content/administrar-maquinaria/maquinarias-inactivo/maquinarias-inactivo.component';
import { AdministrarMaterialService } from './administrar-material.service';
import { AdministrarMaquinariaService } from './administrar-maquinaria.service';
import { ModalConfirmacionComponent } from '../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { RegistActuaComponent } from './inventario-content/administrar-maquinaria/regist-actua/regist-actua.component';
import { ControlarStockComponent } from './inventario-content/controlar-stock/controlar-stock.component';
import { OrdenPedidoComponent } from './inventario-content/controlar-stock/orden-pedido/orden-pedido.component';

@NgModule({
  imports: [
    ModuleModule,
    InventarioRoutingModule
  ],
  declarations: [InventarioContentComponent, AdministrarMaquinariaComponent, AdministrarMaterialComponent, RegistrarActualizarComponent, MaterialesInactivoComponent, MaquinariasInactivoComponent, RegistActuaComponent, ControlarStockComponent, OrdenPedidoComponent],
  entryComponents:[ModalConfirmacionComponent,MaterialesInactivoComponent,MaquinariasInactivoComponent,RegistrarActualizarComponent,RegistActuaComponent,OrdenPedidoComponent],
  providers:[AdministrarMaquinariaService,AdministrarMaterialService]
})
export class InventarioModule { }
