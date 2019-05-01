import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { AdministrarCajaComponent } from '../caja-content/administrar-caja/administrar-caja.component';
import { concat } from 'rxjs/operators/concat';

@Injectable()
export class AdministrarCajaService extends BaseService {

  private url_Caja: String;
  private url_tipoOrden: String;


  constructor(public _http: Http, public _configuration: Configuration) {


    super();
    this.url_Caja = _configuration.Server + 'caja/caja/';
    this.url_tipoOrden = _configuration.Server + 'caja/tipoOrden/';

  }

  public getCaja(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (Params.idArea !== undefined && Params.idArea !== null) {
      queryParams.append('idArea', Params.idArea);
    }
    if (Params.tipoOrden !== undefined && Params.tipoOrden != null) {
      queryParams.append('tipoOrden', Params.tipoOrden);
    }
    if (Params.idCaja !== undefined && Params.idCaja != null) {
      queryParams.append('idCaja', Params.idCaja);
    }
    if (Params.nuPagina !== undefined && Params.nuPagina != null) {
      queryParams.append('nuPagina', Params.nuPagina);
    }
    if (Params.nuRegisMostrar !== undefined && Params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', Params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Caja + 'obtener-caja', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getTipoOrdenPago() {

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      
    });
    return this._http.get(this.url_tipoOrden + 'obtener-tipoOrden', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }

  public getCajaDescripcion() {
   

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    
    });
    return this._http.get(this.url_Caja + 'obtener-CajaDescripcion', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }

  public postCaja(data) {
    console.log(data);
    return this._http.post(this.url_Caja + "insertar-caja", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public updateCaja(data: any) {
    return this._http.put(this.url_Caja + "actualizar-caja", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getAreaTipoCobre(idCaja) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idCaja !== undefined && idCaja !== null) {
      queryParams.append('idCaja', idCaja);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Caja + 'listarAreaCobroTipoOrden', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }

  public getTipoOrdenCaja(idCaja) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idCaja !== undefined && idCaja != null) {
      queryParams.append('idCaja', idCaja);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Caja + 'listarTipoOrdenCaja', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
    public deleteCaja(idCaja) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
        if (idCaja !== undefined && idCaja !== null) {
          queryParams.append('idCaja', idCaja);
        }
        let options = new RequestOptions({
          headers: this.obtenerHeaders(),
          search: queryParams
        });
    return this._http.delete(this.url_Caja+ 'eliminar-caja', options).map((res: Response) => res.json());
  }

}
