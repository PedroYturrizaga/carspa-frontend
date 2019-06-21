import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable()
export class OrdenCompraService extends BaseService {

  private URLMaterialOC: string;
  private URLOrdeCompra: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLOrdeCompra = this._configuration.Server + 'sigs-commons-ws/ordencompra';
    this.URLMaterialOC = this._configuration.Server + 'sigs-commons-ws/materialordencompra';
  }

  public postOrdenCompra(data: any) {
    return this._http.post(this.URLOrdeCompra + "/insertarOrdenCompra", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getMaterialesOC(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idMaterialOrdenCompra != null) {
      queryParams.append('idMaterialOrdenCompra', _params.idMaterialOrdenCompra);
    }

    if (_params.nombre != null) {
      queryParams.append('nombre', _params.nombre);
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
    return this._http.get(this.URLOrdeCompra + "/listarOrdenCompra", options).map((res: Response) => res.json());
  }

  public getOrdenCompraDetalle(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idOrdenCompra != null) {
      queryParams.append('idOrdenCompra', _params.idOrdenCompra);
    }
    if (_params.nombre != null) {
      queryParams.append('nombre', _params.nombre);
    }

    // queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    // queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLMaterialOC + "/listarDetalleOrdenCompra", options).map((res: Response) => res.json());
  }
}
