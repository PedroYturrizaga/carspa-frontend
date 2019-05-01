import { RolesComponent } from './seguridad-content/roles/roles.component';
import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { SeguridadContentComponent } from './seguridad-content/seguridad-content.component';

//#region rol
import { RolComponent } from './seguridad-content/rol/rol.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { MantenimientoComponent } from './seguridad-content/rol/mantenimiento/mantenimiento.component';
import { NuevoRolComponent } from './seguridad-content/rol/nuevo-rol/nuevo-rol.component';
import { RolDeleteComponent } from './seguridad-content/rol/rol-delete/rol-delete.component';// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

//#region servicio
import { ServicioComponent } from './seguridad-content/servicio/servicio.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { DeleteServicioComponent } from './seguridad-content/servicio/delete-servicio/delete-servicio.component';
import { NuevoServicioComponent } from './seguridad-content/servicio/nuevo-servicio/nuevo-servicio.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

//#region usuario
import { UsuarioComponent } from './seguridad-content/usuario/usuario.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { NuevoUsuarioComponent } from './seguridad-content/usuario/nuevo-usuario/nuevo-usuario.component';
import { UsuarioDeleteComponent } from './seguridad-content/usuario/usuario-delete/usuario-delete.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

// BORRAR LOS IMPORTS QUE NO SE USEN ^

// const routes: Routes = [
//   { path: 'servicio', component: ServicioComponent },
//   { path: 'rol', component: RolComponent },
//   { path: 'rol/nuevoRol/:idRol', component: NuevoRolComponent },
//   { path: 'rol/nuevoRol', component: NuevoRolComponent },
//   { path: 'usuario', component: UsuarioComponent,children :[

//   ] }
// ];
console.log('Seguridad')
  const routes : Routes = [
    { path:'', component: SeguridadContentComponent, children: 
      [
        { path: 'usuario', component: UsuarioComponent },
        { path: 'roles', component: RolesComponent }
      ] 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
