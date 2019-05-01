import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
@Injectable()
export class AreaService extends BaseService {
  private url_Area: String;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_Area = _configuration.Server + 'commons/areas/';
  }

  public getAreas(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (Params.descripcionArea !== undefined && Params.descripcionArea !== null) {
      queryParams.append('descripcionArea', Params.descripcionArea);
    }
    if (Params.numPagina !== undefined) {
      queryParams.append('numPagina', Params.numPagina);
    }
    if (Params.numRegisMostrar !== undefined) {
      queryParams.append('numRegisMostrar', Params.numRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Area + 'obtenerAreas', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postArea(data) {
    return this._http.post(this.url_Area + "insertarArea", data, { headers: this.obtenerHeaders()}).map((res: Response) => res.json());
  }

  public deleteArea(data) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (data !== undefined && data !== null) {
      queryParams.append('idArea', data);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.url_Area + "eliminarArea", options).map((res: Response) => res.json());
  }
}

