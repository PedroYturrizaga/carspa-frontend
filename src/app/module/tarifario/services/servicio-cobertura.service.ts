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
export class ServicioCoberturaService extends BaseService {

  private url_ServicioCobertura: String;


  constructor(public _http: Http, public _configuration: Configuration) {


    super();
    this.url_ServicioCobertura = _configuration.Server + 'acredita';

  }

  public getServicioCobertura(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.coProdCode !== undefined && Params.coProdCode !== null) {
      queryParams.append('coProdCode', Params.coProdCode);
    }
   
      queryParams.append('nuPagina', Params.nuPagina);
    
 
      queryParams.append('nuRegisMostrar', Params.nuRegisMostrar);
    


    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_ServicioCobertura + '/serviciocoberturas/obtener-servicio-cobertura', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getServicioCoberturaModal(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.coCoberCode !== undefined && Params.coCoberCode !== null) {
      queryParams.append('coCoberCode', Params.coCoberCode);
    }
    if (Params.coSubTipoCober !== undefined && Params.coSubTipoCober !== null) {
      queryParams.append('coSubTipoCober', Params.coSubTipoCober);
    }
    
      queryParams.append('nuPagina', Params.nuPagina);
    
  
      queryParams.append('nuRegisMostrar', Params.nuRegisMostrar);
    

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_ServicioCobertura + '/serviciocoberturas/obtener-servicio-coberturaModal', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public putServicioCobertura(data: any) {
    return this._http.post(this.url_ServicioCobertura + '/serviciocoberturas/insertarServicioCobertura', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }


  
  public getServicioporConvenio(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.idConvenio !== undefined && Params.idConvenio !== null) {
      queryParams.append('idConvenio', Params.idConvenio);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_ServicioCobertura + '/serviciocoberturas/obtener-servicio-por-convenio', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public deleteServicioCobertura(Params){
    let queryParams: URLSearchParams = new URLSearchParams();
    
        if (Params.idServicio !== undefined && Params.idServicio!== null) {
          queryParams.append('idServicio', Params.idServicio);
        }
        if (Params.coCoberCode !== undefined && Params.coCoberCode!== null) {
          queryParams.append('coCoberCode', Params.coCoberCode);
        }
        if (Params.coSubTipoCober !== undefined && Params.coSubTipoCober!== null) {
          queryParams.append('coSubTipoCober', Params.coSubTipoCober);
        }
        
        let options = new RequestOptions({
          headers: this.obtenerHeaders(),
          search: queryParams
        });
    return this._http.delete(this.url_ServicioCobertura+ '/serviciocoberturas/eliminar-servicio-sobertura', options).map((res: Response) => res.json());



  }



}

