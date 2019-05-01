import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../shared/configuration/app.constants';

import { BaseService } from './base.service';

@Injectable()
export class TurnoService extends BaseService {
  private URLTurnos: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLTurnos = this._configuration.Server + 'commons/turnos?';
  }

  public obtenerTurnos(idActividad) {
    return this._http.get(this.URLTurnos + "idActividad=" + idActividad, { headers: this.obtenerHeaders() })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarTurno(datos) {
    return this._http.post(this.URLTurnos, datos, { headers: this.obtenerHeaders() })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
}
