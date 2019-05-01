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
export class CoberturaServiceService extends BaseService {
  private url_Acredita: String;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.url_Acredita = _configuration.Server + 'acredita';
   }

   
  public getComboTipoCobertura() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.url_Acredita + "/subtipocoberturas/obtener-tipo-cobertura", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getCoberturaConvenio(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idConvenio != null) {
      queryParams.append('idConvenio', _param.idConvenio);
    }
    if (_param.coProdCode != null) {
      queryParams.append('coProdCode', _param.coProdCode);
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
    return this._http.get(this.url_Acredita + "/subtipocoberturas/obtener-cobertura", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarCobertura(data:any) {
    return this._http.post(this.url_Acredita + '/subtipocoberturas/inserta-cobertura', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public editarCobertura(data:any) {
    return this._http.put(this.url_Acredita + '/subtipocoberturas/actualizar-cobertura', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public eliminarCobertura(coSubTipoCober) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if (coSubTipoCober !== undefined && coSubTipoCober !== null) {
      queryParams.append('coSubTipoCober', coSubTipoCober);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.url_Acredita+ '/subtipocoberturas/eliminar-cobertura', options).map((res: Response) => res.json());
  }

  public getSubTipoCobertura(_param){
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_param.coCoberSubCober != null) {
      queryParams.append('coCoberSubCober', _param.coCoberSubCober);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Acredita + "/subtipocoberturas/obtener-sub-tipo-cobertura", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getComboCalifServicio() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.url_Acredita + "/subtipocoberturas/obtener-calif-servicios", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
