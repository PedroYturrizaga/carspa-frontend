import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class InventarioService extends BaseService {
  private headers = new Headers();
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;
  private URLInventario: string;
  constructor(
    public _http: Http,
    public _configuration: Configuration
  ) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
    this.URLInventario = this._configuration.Server + 'inventarios';
  }

  public insertInventarioInicial(data) {
    return this._http.post(this.URLFarmacia + '/comprobanteFarmacia/inventario-inicial', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getPersonalByAlmacen(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.descripcionPersonal !== undefined) {
      queryParams.append('descripcionPersonal', _params.descripcionPersonal);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/personales/almacen', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertInventarioByTurno(data) {
    console.log(data);
    return this._http.post(this.URLFarmacia + '/inventarios', data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getInventariosByAlmacen(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.numeroInventario !== undefined) {
      queryParams.append('numeroInventario', params.numeroInventario)
    }
    if (params.feDesde !== undefined) {
      queryParams.append('feDesde', params.feDesde);
    }
    if (params.feHasta !== undefined) {
      queryParams.append('feHasta', params.feHasta);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/busqueda/almacen', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleInventarioByIdInventario(params) {
    debugger
    console.log("params: servicio: ", params)
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.anaquel !== undefined) {
      queryParams.append('anaquel', params.anaquel)
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/id-inventario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAnaquelesByAlmacen(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/almacen-medicamento/anaquel-lista', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public updateInventario(data) {
    console.log(data)
    return this._http.put(this.URLFarmacia + '/inventarios/cantidad-contada', data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public updateCerrarInventario(data) {
    return this._http.put(this.URLFarmacia + '/inventarios/cerrar-inventario', data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirInventarioCerrado(idInventario, tipoInventario) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idInventario !== undefined) {
      queryParams.append('idInventario', idInventario);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/impresion/' +
      (tipoInventario === 1 ? 'cerrar-iventario' : 'asd'), options)
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getInventarioDiferenciaByAlmacen(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/diferencia-almacen', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleInventarioDiferenciaByInventario(idInventario) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idInventario !== undefined) {
      queryParams.append('idInventario', idInventario);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/diferencia-detalle', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


  public updateRegularizarInventario(data) {
    return this._http.put(this.URLFarmacia + '/inventarios/regularizar-inventario', data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleInventarioByIdIventario(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.anaquel !== undefined) {
      queryParams.append('anaquel', params.anaquel)
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/id-inventario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirRegularizarDiario(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.anaquel !== undefined) {
      queryParams.append('anaquel', params.anaquel)
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/impresion/regularizarDiario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public getListarInventarioPorIdIventario(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.anaqueL !== undefined) {
      queryParams.append('anaquel', params.anaqueL)
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/inventarios/listarInventarioPorIdInventario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getCabeceraInventario(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/inventarios/listarCabeceraInventario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteInventario(params) {
    console.log("servicio" + params);
    let queryParams = new URLSearchParams()
    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append("tipoFile", params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLFarmacia + '/inventarios/reporteInventario', options).map((res: Response) => res.json());

  }

  public getDoctorByAlmacen(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.descripcionPersonal !== undefined) {
      queryParams.append('nombrePersonal', _params.nombrePersonal);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/personales/medico', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

   
  public imprimirReporteDiferencias(params) {
    console.log("servicio" + params);
    let queryParams = new URLSearchParams()

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append("tipoFile", params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLFarmacia + '/inventarios/reporteDiferenciaInventario', options).map((res: Response) => res.json());

  }
  public imprimirReporteRegularizar(params){
    console.log("servicio" + params);
    let queryParams = new URLSearchParams()

    if (params.idInventario !== undefined) {
      queryParams.append('idInventario', params.idInventario);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append("tipoFile", params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLFarmacia + '/inventarios/reporteRegularizarInventarioPorTurno', options).map((res: Response) => res.json());

  }
  public validarCantidadEquivalencia(params) {
    let queryParams = new URLSearchParams()
    if (params.idMedicamento !== undefined) {
      queryParams.append('idMedicamento', params.idMedicamento);
    }
    if (params.idDispMedicoProdSanitario !== undefined) {
      queryParams.append('idDispMedicoProdSanitario', params.idDispMedicoProdSanitario);
    }
    if (params.cantidadContada !== undefined) {
      queryParams.append('cantidadContada', params.cantidadContada);
    }
    if (params.idUnidad !== undefined) {
      queryParams.append('idUnidad', params.idUnidad);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    console.log(options);

    return this._http.get(this.URLFarmacia + '/inventarios/validarCantidadEquivalencia', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


  public regularizarInventario(data) {
    return this._http.post(this.URLFarmacia + '/inventarios/regularizarInventario', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
}
