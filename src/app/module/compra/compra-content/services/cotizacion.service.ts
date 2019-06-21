import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable()
export class CotizacionService extends BaseService {

  private URLMaterialOC: string;
  private URLOrdeCompra: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLMaterialOC = this._configuration.Server + 'sigs-commons-ws/materialordencompra';
    this.URLMaterialOC = this._configuration.Server + 'sigs-commons-ws/ordencompra';
  }


  public getMaterialesOC(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idMaterialOrdenCompra != null) {
      queryParams.append('idMaterialOrdenCompra', _params.idMaterialOrdenCompra);
    }

    if (_params.nombre != null) {
      queryParams.append('idMaterialOrdenCompra', _params.nombre);
    }
    
    if (_params.estado != null) {
      queryParams.append('estado', _params.estado);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLMaterialOC + "/listarMaterialOrdenCompra", options).map((res: Response) => res.json());
  }

  public getOrdenCompraCabecera(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idCotizacionProveedor != null) {
      queryParams.append('idOrdenCompra', _params.idCotizacionProveedor);
    }
    if (_params.codigo != null) {
      queryParams.append('codigo', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLMaterialOC + "/listarOrdenCompra", options).map((res: Response) => res.json());
  }

  // public getCotizaciones(_params: any) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if (_params.codCotizacion != null) {
  //     queryParams.append('idCotizacionProveedor', _params.codCotizacion);
  //   }

  //   if (_params.idProveedor != null) {
  //     queryParams.append('idProveedor', _params.idProveedor);
  //   }
  //   if (_params.esCotizacion != null) {
  //     queryParams.append('flEstado', _params.esCotizacion);
  //   }
    
  //   if (_params.feCotizacion != null) {
  //     queryParams.append('fecha', _params.feCotizacion);
  //   }

  //   queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');

  //   queryParams.append('nuTotalReg', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');

  //   let options = new RequestOptions({
  //     search: queryParams
  //   });
  //   console.log(options);
  //   return this._http.get(this.URLCotizacion + "/listarCotizaciones", options).map((res: Response) => res.json());
  // }

  // public getCotizacionesDetalle(_params: any) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if (_params.idCotizacionProveedor != null) {
  //     queryParams.append('idCotizacionProveedor', _params.idCotizacionProveedor);
  //   }

  //   let options = new RequestOptions({
  //     search: queryParams
  //   });
  //   console.log(options);
  //   return this._http.get(this.URLCotizacion + "/listarCotizacionesDetalle", options).map((res: Response) => res.json());
  // }
}
