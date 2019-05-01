import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../../shared/services/base.service';

@Injectable()
export class GestionarAlmacenService extends BaseService {
  private headers = new Headers();
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getAllAreaSinAlmacen() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    })

    return this._http.get(this.URLCommons + "/areas/sinAlmacen", options).map((res: Response) => res.json());
  }

  public obtenerAlmacen() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    })

    return this._http.get(this.URLFarmacia + "/almacenes/ipress", options).map((res: Response) => res.json());
  }

  public insertarAlmacen(insertAlmacen) {
    return this._http.post(this.URLFarmacia + '/almacenes', insertAlmacen, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public changeEstado(data) {
    this.headers = this.obtenerHeaders();
    return this._http.put(this.URLFarmacia + '/almacenes/activo', data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
