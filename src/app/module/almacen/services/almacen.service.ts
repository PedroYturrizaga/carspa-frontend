import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AlmacenService extends BaseService {

  private UrlAlmacen: string;
  private UrlAlmacen1: string;
  private UrlAnaquel: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.UrlAlmacen = this._configuration.Server + 'sigs-commons-ws/almacenOrdenCompra';
    this.UrlAlmacen1 = this._configuration.Server + 'sigs-commons-ws/almacenOrdenTrabajo';
    this.UrlAnaquel = this._configuration.Server + 'sigs-commons-ws/anaquel';
  }

  public getAlmacenOrdenCompra(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacenOrdenCompra != null) {
      queryParams.append('idAlmacenOrdenCompra', _params.idAlmacenOrdenCompra);
    }
    if (_params.estado != null) {
      queryParams.append('estado', _params.estado);
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
    return this._http.get(this.UrlAlmacen + "/listarAlmacenOrdenCompra", options).map((res: Response) => res.json());
  }

  public getAlmacenOrdenCompraMaterial(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacenOrdenCompra != null) {
      queryParams.append('idAlmacenOrdenCompra', _params.idAlmacenOrdenCompra);
    }
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.UrlAlmacen + "/listarMaterialesPorOrden", options).map((res: Response) => res.json());
  }

  public actualizarCantidadFisica(data) {
    return this._http.put(this.UrlAlmacen + "/actualizarCantidadFisica", data).map((res: Response) => res.json());
  }

  public actualizarEstado(data) {
    return this._http.put(this.UrlAlmacen + "/actualizarEstado", data).map((res: Response) => res.json());
  }

  public actualizarAnaquel(data) {
    return this._http.put(this.UrlAnaquel + "/actualizarAnaquel", data).map((res: Response) => res.json());
  }

  public listarAnaquel() {
    let queryParams: URLSearchParams = new URLSearchParams();

    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.UrlAnaquel + "/listarAnaquel", options).map((res: Response) => res.json());
  }

  public listarOT(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacenOrdenTrabajo != null) {
      queryParams.append('idAlmacenOrdenTrabajo', _params.idAlmacenOrdenTrabajo);
    }
    if (_params.estado != null) {
      queryParams.append('estado', _params.estado);
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

    return this._http.get(this.UrlAlmacen1 + "/listarOrdenTrabajo", options).map((res: Response) => res.json());
  }

  public listarMaterialOT(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacenOrdenTrabajo != null) {
      queryParams.append('idAlmacenOrdenTrabajo', _params.idAlmacenOrdenTrabajo);
    }
    let options = new RequestOptions({
      search: queryParams
    });

    return this._http.get(this.UrlAlmacen1 + "/listarMaterialesOT", options).map((res: Response) => res.json());
  }

  public actualizarCantidadFisicaOT(data) {
    return this._http.put(this.UrlAlmacen1 + "/actualizarCantidadFisicaOT", data).map((res: Response) => res.json());
  }

  public actualizarEstadoOT(data) {
    return this._http.put(this.UrlAlmacen1 + "/actualizarEstadoOT", data).map((res: Response) => res.json());
  }

  public listarKardex(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idMaterial != null) {
      queryParams.append('idMaterial', _params.idMaterial);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
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

    return this._http.get(this.UrlAlmacen1 + "/listarKardex", options).map((res: Response) => res.json());
  }

  public obtenerReporteKardex(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idMaterial != null) {
      queryParams.append('idMaterial', _params.idMaterial);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }

    let options = new RequestOptions({
      search: queryParams
    });

    return this._http.get(this.UrlAlmacen1 + "/obtenerKardex-Reporte", options).map((res: Response) => res.json());
  }

  public listarMateriales() {
    let queryParams: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({
      search: queryParams
    });

    return this._http.get(this.UrlAlmacen1 + "/listarMaterial", options).map((res: Response) => res.json());
  }

  public actualizarTerminar(data) {
    return this._http.put(this.UrlAlmacen1 + "/actualizarTerminado", data).map((res: Response) => res.json());
  }

}
