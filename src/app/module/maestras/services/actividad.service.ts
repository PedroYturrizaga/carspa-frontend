import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { ActividadComponent } from '../maestras-content/actividad/actividad.component';
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class ActividadService extends BaseService {

  private url_Actividad: String;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_Actividad = _configuration.Server + 'commons/areas/';
  }

  public getActividad(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.descripcionActividad !== undefined && Params.descripcionActividad !== null) {
      queryParams.append('descripcionActividad', Params.descripcionActividad);
    }
    if (Params.nuPagina !== undefined) {
      queryParams.append('nuPagina', Params.nuPagina);
    }
    if (Params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', Params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Actividad + 'obtenerActividad-descripcion', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postActividad(data) {
    return this._http.post(this.url_Actividad+ "insertar-actividad", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteActividad(data) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (data !== undefined && data !== null) {
      queryParams.append('idActividad', data);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.url_Actividad+ "eliminar-actividad", options).map((res: Response) => res.json());
  }
public actualizarActividad(data){
console.log(data);
return this._http.put(this.url_Actividad+'actualizar-actividad',data,{headers:this.obtenerHeaders()}).map((res:Response)=> res.json());

}

}