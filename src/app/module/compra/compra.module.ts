import { CompraService } from './compra-content/services/compra.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraRoutingModule } from './compra-routing.module';
import { CompraContentComponent } from './compra-content/compra-content.component';
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ModuleModule } from '../module.module';
import { InsertarProveedorComponent } from './compra-content/listar-proveedor/insertar-proveedor/insertar-proveedor.component';
import { InsertarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/insertar-material-proveedor/insertar-material-proveedor.component';
import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component';
import { GenerarOcComponent } from './compra-content/orden-compra/generar-oc/generar-oc.component'
// import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';

import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { VisualizarOcComponent } from './compra-content/orden-compra/visualizar-oc/visualizar-oc.component';

@NgModule({
  imports: [
    ModuleModule,
    CompraRoutingModule
  ],

  declarations: [
    CompraContentComponent,
    
    ListarProveedorComponent,
    ListarMaterialProveedorComponent,
    InsertarProveedorComponent ,
    InsertarMaterialProveedorComponent,
    OrdenCompraComponent,
    GenerarOcComponent,
    VisualizarOcComponent
  ],

  entryComponents: [
    InsertarProveedorComponent,
    InsertarMaterialProveedorComponent,
    GenerarOcComponent,
    VisualizarOcComponent,
    ModalConfirmacionComponent
  ],

  providers: [
    CompraService
  ]
})
export class CompraModule { }
