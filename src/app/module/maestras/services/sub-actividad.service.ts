import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { SubActividadComponent } from '../maestras-content/sub-actividad/sub-actividad.component';
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class SubActividadService extends BaseService {

  private headers = new Headers();
  private url_SubActividad: String;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_SubActividad = _configuration.Server + 'commons/areas/';
  }
    public getSubActividad(Params) {
    console.log(Params);

    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.descripcionSubActividad !== undefined && Params.descripcionSubActividad !== null) {
      queryParams.append('descripcionSubActividad', Params.descripcionSubActividad);
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
    console.log(options);
    return this._http.get(this.url_SubActividad + 'subactividad', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postSubActividad(data) {
    return this._http.post(this.url_SubActividad+ "insertar-subactividad", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteSubActividad(data) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
        if (data !== undefined && data !== null) {
          queryParams.append('idSubActividad', data);
        }
        let options = new RequestOptions({
          headers: this.obtenerHeaders(),
          search: queryParams
        });
    return this._http.delete(this.url_SubActividad+ "eliminar-subactividad", options).map((res: Response) => res.json());
  }

}
