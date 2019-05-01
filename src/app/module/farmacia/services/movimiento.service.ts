import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class MovimientoService extends BaseService {
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public insertNotaEntrada(data) {
    return this._http.post(this.URLFarmacia + '/comprobanteFarmacia/nota-entrada', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public imprimirNotaEntradaIventarioInicial(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idComprobante !== undefined) {
      queryParams.append('idComprobante', params.idComprobante);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/impresion/inventario-inicial-nota-entrada', options)
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicamentosByBusqueda(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/medicamentos/busqueda/ipress-almacen', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDispMedicoByBusqueda(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/dispositivoMedicoProductosSanitario/busqueda/ipress-almacen', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertDetalleCompFarmacia(data) {
    return this._http.post(this.URLFarmacia + '/comprobanteFarmacia/requerimiento', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getComprobanteFarmacia(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.feDesde !== undefined) {
      queryParams.append('feDesde', _params.feDesde);
    }
    if (_params.feHasta !== undefined) {
      queryParams.append('feHasta', _params.feHasta)
    }
    if (_params.flEstadoComprobante !== undefined) {
      queryParams.append('flEstadoComprobante', _params.flEstadoComprobante);
    }
    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.numeroComprobante !== undefined) {
      queryParams.append('numeroComprobante', _params.numeroComprobante);
    }
    if (_params.idAlmacenDestino !== undefined) {
      queryParams.append('idAlmacenDestino', _params.idAlmacenDestino);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    //console.log(options);
    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/requerimiento', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAlmacenPadre(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/almacenes/padre', options).map((res: Response) => res.json());
  }

  public imprimirSolicitudRequerimiento(idComprobante, tipoComprobante) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idComprobante !== undefined) {
      queryParams.append('idComprobante', idComprobante);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/impresion/' +
      (tipoComprobante === 1 ? 'requerimiento' : 'transferencia-nota-salida'), options)
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleComprobanteFarmacia(idComprobante) {
    //console.log(idComprobante)
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idComprobante !== undefined) {
      queryParams.append('idComprobante', idComprobante);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/detalle', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicamentoLote(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.idMedicamento !== undefined) {
      queryParams.append('idMedicamento', _params.idMedicamento)
    }
    if (_params.idDispMedicoProdSanitario !== undefined) {
      queryParams.append('idDispMedicoProdSanitario', _params.idDispMedicoProdSanitario);
    }
    if (_params.idMedicamento !== undefined) {
      queryParams.append('idUnidad', _params.idUnidad)
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/medicamentoLote', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarComprobanteFarmaciaTransferencia(params) {


    let data: any;
    if (params.tipoComprobante !== undefined) {
      if (params.tipoComprobante == 1) {
        data = params.transferenciaRequest;
      } else if (params.tipoComprobante == 2) {
        data = params.notaSalidaRequest;
      }
    }
    console.log(this.obtenerHeaders);
    console.log(data);
    return this._http.post(this.URLFarmacia + '/comprobanteFarmacia/transferencia-nota-salida?tipoComprobante=' + params.tipoComprobante, data, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }

  public confirmarSolicitud(idComprobante: any) {
    let variable = {
      "idComprobante": idComprobante
    }
    return this._http.put(this.URLFarmacia + '/comprobanteFarmacia', variable, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public eliminarSolicitud(_params: any) {
    let paramActPersonal = new URLSearchParams();

    paramActPersonal.set("idComprobante", _params);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramActPersonal
    });
    return this._http.delete(this.URLFarmacia + "/comprobanteFarmacia", options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // ---- Servicio Agregado para Detalles Adicionales a Comprobante Farmacia Atendidos:
  public getComprobanteFarmaciaDetalleAtendidos(idComprobante) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idComprobante !== undefined) {
      queryParams.append('idComprobante', idComprobante);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/comprobante-farmaciadetalle-atendidos', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getUnidadMedicamentoDispositivo(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    queryParams.append('idMedicamento', _params.idMedicamento);
    queryParams.append('idDispMedicoProdSanitario', _params.idDispMedicoProdSanitario);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/unidad/obtenerUnidadesMedicamento', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirTransferenciaNotaSalida(idComprobante) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idComprobante !== undefined) {
      queryParams.append('idComprobante', idComprobante);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/impresion/transferencia-nota-salida', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  /*
  public getActividad(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (Params.descripcionActividad !== undefined && Params.descripcionActividad !== null) {
      queryParams.append('descripcionActividad', Params.descripcionActividad);
    }
    if (Params.nuPagina !== undefined) {
      queryParams.append('nuPagina', Params.nuPagina);
    }
    if (Params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', Params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_Actividad + 'obtenerActividad-descripcion', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public getDetalleComprobanteFarmacia(idComprobante) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idComprobante !== undefined) {
      queryParams.append('idComprobante', idComprobante);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/comprobanteFarmacia/detalle', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
   */
}