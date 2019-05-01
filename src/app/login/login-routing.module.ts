import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContentComponent } from './login-content/login-content.component';

const routes: Routes = [
  {
    path: '', component: LoginContentComponent,
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
