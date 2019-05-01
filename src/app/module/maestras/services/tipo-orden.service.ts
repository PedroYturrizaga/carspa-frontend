import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class TipoOrdenService extends BaseService {
  private headers = new Headers();
  private URLCaja: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLCaja = this._configuration.Server + 'caja/';
  }

  public getTipoOrden(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLCaja + "tipoOrden/obtener-tipoOrdenURL", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public deleteTipoOrden(idTipoOrden) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idTipoOrden !== undefined) {
      queryParams.append('idTipoOrden', idTipoOrden);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.delete(this.URLCaja + "tipoOrden/eliminar-tipoOrdenURL", options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public insertTipoOrden(data) {
    return this._http.post(this.URLCaja + "tipoOrden/insertar/tipoOrden", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public actualizarTipoOrden(data) {
    return this._http.put(this.URLCaja + "tipoOrden/actualizar/tipoOrden", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
