import { NgModule } from '@angular/core';
import { ModuleModule } from '../module.module';

import { CompraRoutingModule } from './compra-routing.module';
import { CompraContentComponent } from './compra-content/compra-content.component';
<<<<<<< Updated upstream
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ModuleModule } from '../module.module';
import { InsertarProveedorComponent } from './compra-content/listar-proveedor/insertar-proveedor/insertar-proveedor.component';
import { InsertarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/insertar-material-proveedor/insertar-material-proveedor.component';
import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component';
import { GenerarOcComponent } from './compra-content/orden-compra/generar-oc/generar-oc.component'
// import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
=======
import { AdministrarProveedorComponent } from './compra-content/administrar-proveedor/administrar-proveedor.component';
import { RegistrarActualizarComponent } from './compra-content/administrar-proveedor/registrar-actualizar/registrar-actualizar.component';
import { AdministrarProveedorService } from './administrar-proveedor.service';
import { ModalConfirmacionComponent } from '../../shared/others/modal-confirmacion/modal-confirmacion.component';

>>>>>>> Stashed changes

import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { VisualizarOcComponent } from './compra-content/orden-compra/visualizar-oc/visualizar-oc.component';

@NgModule({
  imports: [
    ModuleModule,
    CompraRoutingModule
  ],
<<<<<<< Updated upstream

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
=======
  declarations: [CompraContentComponent, AdministrarProveedorComponent, RegistrarActualizarComponent],
  entryComponents:[ModalConfirmacionComponent,RegistrarActualizarComponent],
  providers:[AdministrarProveedorService]
>>>>>>> Stashed changes
})
export class CompraModule { }
