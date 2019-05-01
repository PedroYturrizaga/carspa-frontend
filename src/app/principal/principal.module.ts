

import { NgModule } from '@angular/core';
import { ModuleModule } from './../module/module.module';
import { PrincipalRoutingModule } from './principal-routing.module';

import { PrincipalComponent } from './principal/principal.component';
import { CambiarContrasenaComponent } from './principal/cambiar-contrasena/cambiar-contrasena.component';

@NgModule({
  imports: [
    ModuleModule,
    PrincipalRoutingModule
  ],
  declarations: [PrincipalComponent, CambiarContrasenaComponent],

  entryComponents: [ CambiarContrasenaComponent],
})
export class PrincipalModule { }
