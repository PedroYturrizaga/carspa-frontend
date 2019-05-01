import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class ConvenioService extends BaseService {
  private url_Acredita: String;


  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_Acredita = _configuration.Server + 'acredita';
  }

  public getComboConvenio() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.url_Acredita + "/convenios/obtener-convenio", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getListConvenio() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.url_Acredita + "/convenios/obtenerConvenio/IAFAS-Empresa", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarConvenio(data: any) {
    return this._http.post(this.url_Acredita + '/convenios/insertarConvenio/IAFAS-Empresa', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public actualizarConvenio(data: any) {
    return this._http.put(this.url_Acredita + '/convenios/actualizarConvenio/IAFAS-Empresa', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public eliminarConvenio(idConvenio) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idConvenio !== undefined && idConvenio !== null) {
      queryParams.append('idConvenio', idConvenio);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.delete(this.url_Acredita + '/convenios/eliminarConvenio/IAFAS-Empresa', options).map((res: Response) => res.json());
  }
}
