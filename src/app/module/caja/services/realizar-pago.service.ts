import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';

@Injectable()
export class RealizarPagoService extends BaseService {
  private headers = new Headers();
  private urlListaMedioPago: string;
  private urlListaOrdenes: string;

  private urlListaBoleta: string;
  private urlInsertarPago: string;
  private urlListaFactura: string;
  private urlEliminaComprobante: string;
  private urlListaComprobante: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = super.obtenerHeaders();
    this.urlListaMedioPago = _configuration.Server + "caja/medioPago/listar";
    this.urlListaOrdenes = _configuration.Server + "caja/detalleOrdenPagos/listar";
    this.urlListaBoleta = _configuration.Server + "caja/boleta/mostrar";
    this.urlInsertarPago=_configuration.Server+"caja/pago/insertar";
    this.urlListaFactura=_configuration.Server+"caja/factura/mostrar";
    this.urlEliminaComprobante=_configuration.Server+"caja/comprobante/eliminar-comprobante-pago";
    this.urlListaComprobante = _configuration.Server + "caja/comprobante/mostrar";
  }
  public deleteComprobante(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idComprobantePago", _params);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.delete(this.urlEliminaComprobante, options).map((res: Response) => res.json());
  }

  public getObtenerBoleta(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idComprobantePago", _params.idComprobantePago);
    queryParams.append("tipoFile", _params.tipoFile);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlListaBoleta, options).map((res: Response) => res.json());
  }
  public getObtenerComprobante(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idComprobantePago", _params.idComprobantePago);
    queryParams.append("tipoFile", _params.tipoFile);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlListaComprobante, options).map((res: Response) => res.json());
  }
  public getObtenerFactura(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idComprobantePago", _params.idComprobantePago);
    queryParams.append("tipoFile", _params.tipoFile);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlListaFactura, options).map((res: Response) => res.json());
  }

  public getAllMedioPago() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    })
    return this._http.get(this.urlListaMedioPago, options).map((res: Response) => res.json());
  }

  public getAllOrdenes(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idComprobantePago", _params);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlListaOrdenes, options).map((res: Response) => res.json());
  }
  public postInsertPago(data: any ){
    console.log(data);
    return this._http.post(this.urlInsertarPago,data,{headers:this.obtenerHeaders()}).map((res:Response)=> res.json());
  }
} 
