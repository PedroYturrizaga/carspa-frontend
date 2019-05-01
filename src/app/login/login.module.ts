import { NgModule } from '@angular/core';
import { ModuleModule } from './../module/module.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginContentComponent } from './login-content/login-content.component';

@NgModule({
  imports: [
    ModuleModule,
    LoginRoutingModule
  ],
  declarations: [LoginContentComponent]
})
export class LoginModule { }
