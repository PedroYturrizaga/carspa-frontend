import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from './../../../shared/configuration/app.constants';
import { _MatProgressBarMixinBase } from '@angular/material';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class ProductoServiceService extends BaseService {
  private headers = new Headers();
  private URLAcredita: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLAcredita = this._configuration.Server + 'acredita';
  }

  public getProductoConvenio(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idConvenio != null) {
      queryParams.append('idConvenio', _param.idConvenio);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAcredita + "/producto/obtenerProductoPorConvenio", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarProducto(data: any) {
    return this._http.post(this.URLAcredita + '/producto/registrarProducto', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public actualizarProducto(data: any) {
    return this._http.put(this.URLAcredita + '/producto/actualizarProducto', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public eliminarProducto(coProdCode) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (coProdCode !== undefined && coProdCode !== null) {
      queryParams.append('coProdCode', coProdCode);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.delete(this.URLAcredita + '/producto/eliminarProducto', options).map((res: Response) => res.json());
  }
}
