import { NgModule } from '@angular/core';

// module
import { ModuleModule } from '../../../module.module';

// routing
import { GestionarProveedorRoutingModule } from './gestionar-proveedor-routing.module';

//#region gestionar-proveedor
import { GestionarProveedorComponent } from './gestionar-proveedor/gestionar-proveedor.component';
//#endregion

//#region services
import { GestionarProveedorService } from './services/gestionar-proveedor.service';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    GestionarProveedorRoutingModule
  ],
  declarations: [
    GestionarProveedorComponent
  ],
  providers: [
    GestionarProveedorService
  ]
})
export class GestionarProveedorModule { }
