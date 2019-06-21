import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable()
export class CompraService extends BaseService {

  private UrlCompra: string;
  private UrlCompra2: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.UrlCompra = this._configuration.Server + 'sigs-commons-ws/proveedor';
    this.UrlCompra2 = this._configuration.Server + 'sigs-commons-ws/materialproveedor';
  }

  public getProveedor(_params?: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idProveedor != null) {
      queryParams.append('idProveedor', _params.idProveedor);
    }
    if (_params.nombreProveedor != null) {
      queryParams.append('nombreProveedor', _params.nombreProveedor);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.UrlCompra + "/listarProveedor", options).map((res: Response) => res.json());
  }

 
  public actualizarProveedor(data) {
    return this._http.put(this.UrlCompra + "/actualizarProveedor", data).map((res: Response) => res.json());
  }

  public registrarProveedor(data) {
    return this._http.post(this.UrlCompra + "/insertarProveedor", data).map((res: Response) => res.json());
  }


  public getTipoPago (){
    return this._http.get(this.UrlCompra+"/listarTipoPago").map((res: Response) => res.json());

   }



  public getMaterialProveedor(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idMaterialProveedor != null) {
      queryParams.append('idMaterialProveedor', _params.idMaterialProveedor);
    }
    if (_params.idProveedor != null) {
      queryParams.append('idProveedor', _params.idProveedor);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.UrlCompra2 + "/listarMaterialProveedor", options).map((res: Response) => res.json());
  }



  public registrarMaterialProveedor(data) {
    return this._http.post(this.UrlCompra2 + "/insertarMaterialProveedor", data).map((res: Response) => res.json());
  }

  public actualizarMaterialProveedor(data) {
    return this._http.put(this.UrlCompra2 + "/actualizarMaterialProveedor", data).map((res: Response) => res.json());
  }

  public getMaterial (){
    return this._http.get(this.UrlCompra2+"/listarMaterial").map((res: Response) => res.json());

   }







}