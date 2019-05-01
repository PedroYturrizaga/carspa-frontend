import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../shared/configuration/app.constants';
import { BaseService } from './base.service';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonalService extends BaseService {
  private URLPersonal;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLPersonal = this._configuration.Server + 'commons/areas';
  }

  public obtenerPersonales(_params: any) {
    return this._http.get(this.URLPersonal + `/${_params.idArea}/especialidades/${_params.idEspecialidad}/actividades/${_params.idActividad}/subActividades/${_params.idSubActividad}/personales`, { headers: this.obtenerHeaders() })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
}
