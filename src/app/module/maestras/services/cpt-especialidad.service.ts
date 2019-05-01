import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from './../../../shared/configuration/app.constants';
import { _MatProgressBarMixinBase } from '@angular/material';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CptEspecialidadService extends BaseService{
  private headers = new Headers();
  private URLCommons: string;
  constructor(public _http: Http, public _configuration: Configuration) { 
    super();
    this.URLCommons = this._configuration.Server + 'commons';
  }
  public getCptEspecialidades(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
      queryParams.append('idEspecialidad', _param.idEspecialidad);
      queryParams.append('idCpt', _param.idCpt);
      queryParams.append('nuPagina', _param.nuPagina);
      queryParams.append('nuRegisMostrar', _param.nuRegisMostrar);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/cptEspecialidades/obtener", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public deleteCptEspecialidades(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
      queryParams.append('idEspecialidad', _param.idEspecialidad);
      queryParams.append('idCpt', _param.idCpt);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLCommons + "/cptEspecialidades/eliminar", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public updateCptEspecialidades(_param) {
    return this._http.put(this.URLCommons + "/cptEspecialidades/actualizar", _param, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error));;
  }
  public insertCptEspecialidades(_param) {
    return this._http.post(this.URLCommons + "/cptEspecialidades/insertar", _param, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error));;
  }

  public getEspecialidades() {
    let queryParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/cptEspecialidades/obtenerEspecialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public getCptPorEspecialidad(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
      queryParams.append('idEspecialidad', _param.idEspecialidad);
      queryParams.append('descripcion', _param.descripcion);
      queryParams.append('codigoCpt', _param.codigoCpt);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/cptEspecialidades/cpt-especialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public actualizarCptEspecialidades(_param) {
    return this._http.put(this.URLCommons + "/cptEspecialidades/actualizar-cpt", _param, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error));;
  }

}
