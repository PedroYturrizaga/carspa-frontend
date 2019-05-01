import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// guards
import { AuthGuard } from './shared/auth/guards/auth.guard';
import { RoleGuard } from './shared/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginModule',
  },
  // {
  //   path: 'resetPassword/:id', loadChildren: './login/login.module#LoginModule',
  // },
  {
    path: 'principal', loadChildren: './principal/principal.module#PrincipalModule',
    // canActivate: [AuthGuard]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
