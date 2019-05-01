import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class ContratanteService extends BaseService{
  
  private url_Acredita: String;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_Acredita = _configuration.Server + 'acredita';
   }

   public getListContratante() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.url_Acredita + "/empresaExterna/obtenerEmpresaExterna", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public eliminarContratante(idEmpresaExterna) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if (idEmpresaExterna !== undefined && idEmpresaExterna !== null) {
      queryParams.append('idEmpresaExterna', idEmpresaExterna);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.url_Acredita+ '/empresaExterna/eliminarEmpresaExterna', options).map((res: Response) => res.json());
  }

  public editarContratante(data:any) {
    return this._http.put(this.url_Acredita + '/empresaExterna/actualizarEmpresaExterna', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public insertarContratante(data:any) {
    return this._http.post(this.url_Acredita + '/empresaExterna/insertarEmpresaExterna', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
