import { Observable } from 'rxjs/Observable';
import { Configuration } from './../../../shared/configuration/app.constants';
import { RequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AreaEspecialidadActividadService extends BaseService{

  private URLCommonsAreaEspecAct: string;
  private headers = new Headers();

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append("codUsuario", "codUsuario");
    this.headers.append("token", "token");
    this.headers.append("IdPRESS","gONZnF9vN/bocT+JhfnMGw==");
    this.URLCommonsAreaEspecAct = this._configuration.Server + "commons/areaEspecialidadActividad/";
  }

  public getAreaEspActList(_params: any) {
    let queryParams = new URLSearchParams();
    if (_params.idArea !== undefined) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.idEspecialidad !== undefined) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.idActividad !== undefined) {
      queryParams.append('idActividad', _params.idActividad);
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegiMostrar !== undefined) {
      queryParams.append('nuRegiMostrar', _params.nuRegiMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCommonsAreaEspecAct + "obtenerAreaEspecialidadActividad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarAreaEspAct(data) {
    console.log(data);
    return this._http.post(this.URLCommonsAreaEspecAct + "insertarAreaEspecialidadActividad", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public editAreaEspAct(data) {
    console.log(data);
    return this._http.put(this.URLCommonsAreaEspecAct + "actualizarAreaEspecialidadActividad", data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error));;
  }

  public deleteAreaEspAct(_params:any){
    let queryParams = new URLSearchParams();
    if (_params.idArea !== undefined) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.idEspecialidad !== undefined) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.idActividad !== undefined) {
      queryParams.append('idActividad', _params.idActividad);
    }let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options.headers);
    return this._http.delete(this.URLCommonsAreaEspecAct + "eliminarAreaEspecialidadActividad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
} 