import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { HospitalizacionRoutingModule } from './hospitalizacion-routing.module';

// content
import { HospitalizacionContentComponent } from './hospitalizacion-content/hospitalizacion-content.component';

@NgModule({
  imports: [
    ModuleModule,
    HospitalizacionRoutingModule
  ],
  declarations: [
    HospitalizacionContentComponent // content
  ],
  entryComponents: [

  ],
  providers: [
    
  ]
})
export class HospitalizacionModule { }
