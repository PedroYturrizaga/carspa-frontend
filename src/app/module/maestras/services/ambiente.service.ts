import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from './../../../shared/configuration/app.constants';
import { _MatProgressBarMixinBase } from '@angular/material';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AmbienteService extends BaseService {
  private headers = new Headers();
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getAmbientes(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idArea != null) {
      queryParams.append('idArea', _param.idArea);
    }
    if (_param.descripcionAmbiente != null) {
      queryParams.append('descripcionAmbiente', _param.descripcionAmbiente);
    }
    if (_param.idEspecialidad != null) {
      queryParams.append('idEspecialidad', _param.idEspecialidad);
    }
    if (_param.idActividad != null) {
      queryParams.append('idActividad', _param.idActividad);
    }
    if (_param.nuPagina != null) {
      queryParams.append('nuPagina', _param.nuPagina);
    }
    if (_param.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _param.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/ambientes/obtener-ambiente-especialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public deleteAmbiente(idAmbiente) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idAmbiente !== undefined && idAmbiente !== null) {
      queryParams.append('idAmbiente', idAmbiente);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLCommons + '/ambientes/elimina-ambiente', options).map((res: Response) => res.json());
  }

  public insertarProducto(data: any) {
    return this._http.post(this.URLCommons + '/ambientes/inserta-ambiente', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getAmbientexAreaEsp(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idArea != null) {
      queryParams.append('idArea', _param.idArea);
    }
    if (_param.idEspecialidad != null) {
      queryParams.append('idEspecialidad', _param.idEspecialidad);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/ambientes/obtener-actividad-ambiente", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public actualizarProducto(data: any) {
    return this._http.put(this.URLCommons + '/ambientes/actualizar-ambiente', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
