import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class FiliacionService extends BaseService {

  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();

    this.URLAdmision = this._configuration.Server + "admision";
    this.URLCommons = this._configuration.Server + "commons/";

  }

  public getPaciente(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.tipoDocumentoIdentidad != null && _params.tipoDocumentoIdentidad != 0)
      queryParams.append('tipoDocumentoIdentidad', _params.tipoDocumentoIdentidad);
    if (_params.numeroDocumentoIdentidad != null)
      queryParams.append('numeroDocumentoIdentidad', _params.numeroDocumentoIdentidad);
    if (_params.apellidoPaterno != null)
      queryParams.append('apellidoPaterno', _params.apellidoPaterno);
    if (_params.apellidoMaterno != null)
      queryParams.append('apellidoMaterno', _params.apellidoMaterno);
    if (_params.nombres != null)
      queryParams.append('nombres', _params.nombres);
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    } else {
      queryParams.append('nuRegisMostrar', "15");
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    } else {
      queryParams.append('nuPagina', "1");
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + "/pacientes", options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public getPersona(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.tipoDocumentoIdentidad != null && _params.tipoDocumentoIdentidad != 0)
      queryParams.append('tipoDocumentoIdentidad', _params.tipoDocumentoIdentidad);
    if (_params.numeroDocumentoIdentidad != null)
      queryParams.append('numeroDocumentoIdentidad', _params.numeroDocumentoIdentidad);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + "/personas/personas", options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public postPaciente(_params) {
    console.log(_params);

    return this._http.post(this.URLAdmision + "/pacientes", _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public actulizarPaciente(_params){
    return this._http.put(this.URLAdmision + "/pacientes", _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }



  // public obtnenrTipoDocumento() {
  //   return this._http.get(this.URLCommons+"tiposDocumentos", { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  // }
 
}


