import { Params } from '@angular/router';
import 'rxjs/add/operator/map';
import { concat } from 'rxjs/operators/concat';  
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from './../../../shared/configuration/app.constants';
import { _MatProgressBarMixinBase } from '@angular/material';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class MedicamentoService extends BaseService {
  private headers = new Headers();
  private URLAcredita: string;
  private url_acredita: String;
  constructor(public _http: Http, public _configuration: Configuration) { 
    super();
    this.URLAcredita = this._configuration.Server + 'acredita';
    this.url_acredita = _configuration.Server + 'acredita';
  }
  public getMedicamCober(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.coSubtipocober != null) {
      queryParams.append('coSubtipocober', _param.coSubtipocober);
    }
    if (_param.nuPagina != null) {
      queryParams.append("nuPagina", _param.nuPagina);
    }
    if (_param.nuRegisMostrar != null) {
      queryParams.append("nuRegisMostrar", _param.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAcredita + "/medicamentoCobertura/select", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAuto(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.busqueda != null) {
      queryParams.append('busqueda', _param.busqueda);
    }
    if (_param.idConvenio != null) {
      queryParams.append("idConvenio", _param.idConvenio);
    }
    if (_param.tipoMedicamento != null) {
      queryParams.append("tipoMedicamento", _param.tipoMedicamento);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAcredita + "/medicamentoCobertura/autoCompl", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public insertMedicamentos(data: any) {
    return this._http.post(this.URLAcredita + '/medicamentoCobertura/insert', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteMedicamentoCober(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idMedicamentoCobertura", _params);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLAcredita + '/medicamentoCobertura/eliminar', options).map((res: Response) => res.json());
  } 
      public getConvenioMedDisp(Params){

    
     let queryParams: URLSearchParams = new URLSearchParams();

     if(Params.idConvenio !== undefined && Params.idConvenio !== null){
      queryParams.append('idConvenio', Params.idConvenio);
    }
  
      queryParams.append("idMedicamento", Params.idMedicamento);   
      queryParams.append("idDispMedicoProdSanitario", Params.idDispMedicoProdSanitario);

    if(Params.nuPagina !== undefined){
        queryParams.append('nuPagina', Params.nuPagina);
    }

   if (Params.nuTotalReg !== undefined) {
       queryParams.append('nuTotalReg', Params.nuTotalReg);
    }

   let options = new RequestOptions({
       headers: this.obtenerHeaders(),
       search: queryParams
   });
     return this._http.get(this.url_acredita + '/convenioMedDisp/obtener', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postConvenioMedDisp(data:any){
    return this._http.post(this.url_acredita + '/convenioMedDisp/insertar', data, {headers: this.obtenerHeaders()}).map((res: Response)=> res.json());
  }

  public validarConvMedDispExiste(Params){
 
    let queryParams: URLSearchParams = new URLSearchParams();

    if(Params.idConvenio !== undefined && Params.idConvenio !== null){
     queryParams.append('idConvenio', Params.idConvenio);
   }
 
     queryParams.append("idMedicamento", Params.idMedicamento);   
     queryParams.append("idDispMedicoProdSanitario", Params.idDispMedicoProdSanitario);

  let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
  });
    return this._http.get(this.url_acredita + '/convenioMedDisp/validarConvMedDisp', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
 }


  public putConvenioMedDisp(data:any){
    return this._http.put(this.url_acredita + '/convenioMedDisp/actualizar', data, {headers: this.obtenerHeaders()}).map((res: Response)=> res.json());
  }
  
  public deleteConvenioMedDisp(Params){

    let queryParams: URLSearchParams = new URLSearchParams();

    if(Params.idConvenio !== undefined && Params.idConvenio !== null){
     queryParams.append('idConvenio', Params.idConvenio);
   }
 
     queryParams.append("idMedicamento", Params.idMedicamento);   
     queryParams.append("idDispMedicoProdSanitario", Params.idDispMedicoProdSanitario);

  let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
  }); 
    return this._http.delete(this.url_acredita + '/convenioMedDisp/eliminar', options).map((res: Response)=> res.json());
  }

  public getPrecioUnidadXConvMedDisp(Params){

    let queryParams: URLSearchParams = new URLSearchParams();

    if(Params.idConvenio !== undefined && Params.idConvenio !== null){
     queryParams.append('idConvenio', Params.idConvenio);
   }
 
     queryParams.append("idMedicamento", Params.idMedicamento);   
     queryParams.append("idDispMedicoProdSanitario", Params.idDispMedicoProdSanitario);

  let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
  });
    return this._http.get(this.url_acredita + '/convenioMedDisp/obtenerUnidadPrecio', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
 }
}
