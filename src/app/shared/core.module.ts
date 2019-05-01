import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, Optional, SkipSelf } from '@angular/core';

/*Libreria Http*/
import { HttpModule, Http } from '@angular/http';

//#region shared services
import { ActividadService } from './services/actividad.service';
import { ActoMedicoCitaService } from './services/acto-medico-cita.service';
import { AmbienteService } from './services/ambiente.service';
import { AppService } from './services/app.service';
import { AreaService } from './services/area.service';
import { EspecialidadService } from './services/especialidad.service';
import { FechaService } from './services/fecha.service';
import { PersonaService } from './services/persona.service';
import { PersonalService } from './services/personal.service';
import { ReporteService } from './services/reporte.service';
import { SesionService } from './services/sesion.service';
import { TurnoService } from './services/turno.service';
import { VerActoMedicoService } from './services/ver-acto-medico.service'
//#endregion

//#region classes
/*ruta principal del servidor*/
import { Configuration } from './configuration/app.constants';
import { CambiarValoresEncriptados } from './helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Util } from './helpers/util/util';
//#endregion

//#region auth
import { AuthenticateHttpService } from './auth/authenticate-http/authenticate-http.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
//#endregion

@NgModule({
  exports: [
    HttpModule,
    NgbModule
  ],
  providers: [
    ActividadService,
    ActoMedicoCitaService,
    AmbienteService,
    AppService,
    AreaService,
    EspecialidadService,
    FechaService,
    PersonaService,
    PersonalService,
    ReporteService,
    SesionService,
    TurnoService,
    VerActoMedicoService,
    { provide: Http, useClass: AuthenticateHttpService },
    CambiarValoresEncriptados,
    Util,
    Configuration,
    AuthGuard,
    RoleGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
