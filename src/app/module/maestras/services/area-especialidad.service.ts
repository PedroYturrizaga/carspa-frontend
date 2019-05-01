import { Observable } from 'rxjs';
import { Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from './../../../shared/configuration/app.constants';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AreaEspecialidadService extends BaseService {

  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLCommons = this._configuration.Server + "commons";
  }

  public insertarArea_x_especialidad(data: any) {
    console.log(data);
    return this._http.post(this.URLCommons + '/areaEspecialidad/insertarAreaXEspecialidad', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
    // return this._http.post(this.URLCommons + '/areas', data, { headers: this.headers }).map((res: Response) => res.json());
  }

  public obtenerAreaXEspecialidad(_params) {
    console.log(_params);
    let queryParams = new URLSearchParams();
    if (_params.idArea != null) {
      queryParams.append("idArea", _params.idArea);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    if (_params.nuPagina != null) {
      queryParams.append("nuPagina", _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCommons + "/areaEspecialidad/obtenerAreaXEspecialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public eliminarArea_x_especialidad(_params: any) {
    console.log(_params);
    let queryParams = new URLSearchParams();
    if (_params.idArea != null) {
      queryParams.append("idArea", _params.idArea);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLCommons + "/areaEspecialidad/eliminarAreaxEspecialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public actualizarAreaxEspecialidad(data: any){
    return this._http.put(this.URLCommons + '/areaEspecialidad/actualizarAreaxEspecialidad', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerSexos() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    console.log(options);
    return this._http.get(this.URLCommons + "/sexos", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
