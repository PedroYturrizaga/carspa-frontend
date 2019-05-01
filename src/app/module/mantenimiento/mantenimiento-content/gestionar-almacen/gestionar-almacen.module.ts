import { NgModule } from '@angular/core';

// module
import { ModuleModule } from '../../../module.module';

// routing
import { GestionarAlmacenRoutingModule } from './gestionar-almacen-routing.module';

//#region gestionar-almacen
import { GestionarAlmacenComponent } from './gestionar-almacen/gestionar-almacen.component';
//#endregion

//#region services
import { GestionarAlmacenService } from './services/gestionar-almacen.service';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    GestionarAlmacenRoutingModule
  ],
  declarations: [
    GestionarAlmacenComponent
  ],
  providers: [
    GestionarAlmacenService
  ]
})
export class GestionarAlmacenModule { }
