import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from "../../../shared/services/base.service"

@Injectable()
export class ListarOrdenesCobroService extends BaseService {
  private url_caja: String;
  private url_admision: String;
  private urlGetTipoDoc: string;
  private urlGetDataPaciente: string;
  private urlGetNumDocs: string;

  private headers = new Headers();
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.urlGetTipoDoc = this._configuration.Server + "commons/comboGeneral/combo-tipo-documento";
    this.urlGetDataPaciente = this._configuration.Server + "commons/personas/datos/id-persona";
    this.urlGetNumDocs = this._configuration.Server + "commons/personas/id-persona";
    this.url_caja = this._configuration.Server + "caja";
    this.url_admision = this._configuration.Server + "admision";
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append("codUsuario", "farce@gmail.com");
    this.headers.append("idIPRESS", "gONZnF9vN/bocT+JhfnMGw==");
    this.headers.append("token", "dasdas");
  }


  public getTipoDocumentos() {
    let queryParams: URLSearchParams = new URLSearchParams;

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    });
    return this._http.get(this.urlGetTipoDoc, options).map((res: Response) => res.json());
  }

  public ObtenerNumeroDocs(_params) {
    console.log(_params);
    
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idTipoDocumentoIdentidad', _params.idTipoDocumento);
    queryParams.append('numeroDocumento', _params.nuDocumento);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetNumDocs, options).map((res: Response) => res.json());

  }
  public getDatosPaciente(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idPersona', _params.idPersona);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetDataPaciente, options).map((res: Response) => res.json());
  }

  public getOrdenPago(idCliente, idAperturaCaja) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idCliente !== undefined && idCliente !== null) {
      queryParams.append('idCliente', idCliente);
    }
    if (idAperturaCaja !== undefined && idAperturaCaja !== null) {
      queryParams.append('idAperturaCaja', idAperturaCaja);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_caja + '/ordenPagos/obtenerOrdenPago', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleOrdenPago(Params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (Params.idOrdenPago !== undefined && Params.idOrdenPago !== null) {
      queryParams.append('idOrdenPago', Params.idOrdenPago);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.url_caja + '/detalleOrdenPagos/obtenerDetalleOrdenPago', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postComprobanteDetalle(data) {
    console.log(data);
    return this._http.post(this.url_caja + "/detalleComprobantePago/insertar-comprobante-pago", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  // public getPaciente(Params) {
  //   let queryParams: URLSearchParams = new URLSearchParams();
  //   if (Params.tipoDocumento !== undefined && Params.tipoDocumento !== null) {
  //     queryParams.append('tipoDocumento', Params.tipoDocumento);
  //   }
  //   if (Params.idCliente !== undefined && Params.idCliente !== null) {
  //     queryParams.append('idCliente', Params.idCliente);
  //   }
  //   if (Params.apellidoPaterno !== undefined) {
  //     queryParams.append('apellidoPaterno', Params.apellidoPaterno);
  //   }
  //   if (Params.apellidoMaterno !== undefined) {
  //     queryParams.append('apellidoMaterno', Params.apellidoMaterno);
  //   }
  //   if (Params.nombres !== undefined) {
  //     queryParams.append('nombres', Params.nombres);
  //   }

  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders(),
  //     search: queryParams
  //   });
  //   return this._http.get(this.url_admision + '/pacientes', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  // }

}
