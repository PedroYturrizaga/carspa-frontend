import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';

// content
import { MantenimientoContentComponent } from './mantenimiento-content/mantenimiento-content.component';
import { ModalConfirmacionComponent } from '../../shared/others/modal-confirmacion/modal-confirmacion.component';

@NgModule({
  imports: [
    ModuleModule,
    MantenimientoRoutingModule
  ],
  declarations: [
    MantenimientoContentComponent
  ],
  entryComponents: [
    ModalConfirmacionComponent
    
  ] 
})
export class MantenimientoModule { }
