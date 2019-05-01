import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { SeguridadRoutingModule } from './seguridad-routing.module';

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

//#region services
import { RolService } from './services/rol.service';
import { ServicioService } from './services/servicio.service';
import { UsuarioService } from './services/usuario.service';
import { RolesComponent } from './seguridad-content/roles/roles.component';
import { CrearEditarRolComponent } from './seguridad-content/roles/crear-editar-rol/crear-editar-rol.component';
import { GrupoOcupacionalService } from '../maestras/services/grupo-ocupacional.service';
import { ModalConfirmacionComponent } from '../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { PaginasComponent } from './seguridad-content/roles/paginas/paginas.component';
import { PaginaService } from './services/pagina.service';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    SeguridadRoutingModule
  ],
  declarations: [
    SeguridadContentComponent, // content
    RolComponent, // rol
    MantenimientoComponent, NuevoRolComponent, // 1
    RolDeleteComponent, // 1
    ServicioComponent, // servicio
    DeleteServicioComponent, NuevoServicioComponent, // 1
    UsuarioComponent, // usuario
    NuevoUsuarioComponent, UsuarioDeleteComponent, RolesComponent, CrearEditarRolComponent, PaginasComponent, // 1
  ],
  entryComponents: [NuevoUsuarioComponent,
    CrearEditarRolComponent,
    ModalConfirmacionComponent,
    PaginasComponent
  ],
  providers: [
              RolService,
              ServicioService,
              UsuarioService,
              GrupoOcupacionalService,
              PaginaService
            ]
})
export class SeguridadModule { }

