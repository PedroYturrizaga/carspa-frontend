import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { concat } from 'rxjs/operators/concat';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class TerapiaService extends BaseService {
  private url_Acredita: String;
  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.url_Acredita = _configuration.Server + 'admision';
  }


  public getTerapias() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    console.log(options);
    return this._http.get(this.url_Acredita + "/terapias/obtener-terapia", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getTerapiasEncrip(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idActoMedicoEncriptado != null) {
      queryParams.append('idActoMedicoEncriptado', this._cambiarValores.replace(_param.idActoMedicoEncriptado));
    }
    if (_param.idAtencionEncriptado != null) {
      queryParams.append('idAtencionEncriptado', this._cambiarValores.replace(_param.idAtencionEncriptado));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Acredita + "/terapias/obtener-solicitud-terapia", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarTerapia(data) {
    return this._http.post(this.url_Acredita + '/terapias/inserta-solicitud-terapia', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public eliminarProducto(idActoMedicoEncriptado, idAtencionEncriptado, idSolicitudTerapia) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idActoMedicoEncriptado !== undefined && idActoMedicoEncriptado !== null) {
      queryParams.append('idActoMedicoEncriptado', idActoMedicoEncriptado);
    }
    if (idAtencionEncriptado !== undefined && idAtencionEncriptado !== null) {
      queryParams.append('idAtencionEncriptado', idAtencionEncriptado);
    }
    if (idSolicitudTerapia !== undefined && idSolicitudTerapia !== null) {
      queryParams.append('idSolicitudTerapia', idSolicitudTerapia);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.url_Acredita + '/terapias/elimina-solicitud-terapia', options).map((res: Response) => res.json());
  }
}
