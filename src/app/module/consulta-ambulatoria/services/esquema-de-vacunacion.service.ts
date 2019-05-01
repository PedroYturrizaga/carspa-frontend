import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class EsquemaDeVacunacionService extends BaseService {
  
  private URLAdmicion: String;
  constructor(public _http: Http, 
              public _configuration: Configuration,
              private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLAdmicion = this._configuration.Server + "admision";
  }

  public getFechasEsqVac(idPersona: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if(idPersona !== undefined) {
      queryParams.append("idPersona", this._cambiarValores.replace(idPersona));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search : queryParams
    });
    // console.log(options)
    return this._http.get(this.URLAdmicion+"/esquemaVacunacion",options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
