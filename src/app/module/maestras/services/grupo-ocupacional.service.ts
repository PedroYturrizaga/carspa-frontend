import { Observable } from 'rxjs';
import { Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from './../../../shared/configuration/app.constants';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class GrupoOcupacionalService extends BaseService {

  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
   // '/ordenPagos/obtenerOrdenPago'
    super();
    this.URLCommons = this._configuration.Server + "commons";
  }

  public insertarGrupoOcupacional(data: any) {
    console.log(data);
    return this._http.post(this.URLCommons + '/gruposOcupacionales/InsertarGrupoOcupacional', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
    // return this._http.post(this.URLCommons + '/areas', data, { headers: this.headers }).map((res: Response) => res.json());
  }

  public obtenerGrupoOcupacional(_params) {
    console.log(_params);
    let queryParams = new URLSearchParams();
    if (_params.idGrupoOcupacional != null) {
      queryParams.append("idGrupoOcupacional", _params.idGrupoOcupacional);
    }   
    if (_params.descripcionGrupoOcupacional != null) {
      queryParams.append("descripcionGrupoOcupacional", _params.descripcionGrupoOcupacional);
    }
    if (_params.idTipoProfesional != null) {
      queryParams.append("idTipoProfesional", _params.idTipoProfesional);
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
    return this._http.get(this.URLCommons + "/gruposOcupacionales/ObtenerGrupoOcupacional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public eliminarGrupoOcupacional(_params: any) {
    console.log(_params);
    let queryParams = new URLSearchParams();
    if (_params.idGrupoOcupacional != null) {
      queryParams.append("idGrupoOcupacional", _params.idGrupoOcupacional);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLCommons + "/gruposOcupacionales/EliminarGrupoOcupacional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
    // return this._http.post(this.URLCommons + '/areas', data, { headers: this.headers }).map((res: Response) => res.json());
  }

  public actualizaGrupoOcupacional(data: any){
    return this._http.put(this.URLCommons + "/gruposOcupacionales/ActualizarGrupoOcupacional", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerTipoProfesional() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    console.log(options);
    return this._http.get(this.URLCommons + "/gruposOcupacionales/ObtenerTipoProfesional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


}
 