import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CorrelativoService extends BaseService {
  private headers = new Headers();

  private urlFarmacia: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();

    this.urlFarmacia = this._configuration.Server + "farmacia/";
  }

  public getCorrelativo(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.anio !== undefined) {
      queryParams.append('anio', _params.anio);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.urlFarmacia + "secuenciaComprobantes/obtener-secuencia-comprobante", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public updateCorrelativo(data: any) {
    return this._http.put(this.urlFarmacia + 'secuenciaComprobantes/actualiza-secuencia-comprobante', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public insertCorrelativo(data: any) {
    return this._http.post(this.urlFarmacia + 'secuenciaComprobantes/inserta-secuencia-comprobante', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getComboTipoDocumento() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.urlFarmacia + "secuenciaComprobantes/obtener-tipo-documento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public confirmTipoComprobante(data:any){
    return this._http.post(this.urlFarmacia + 'secuenciaComprobantes/confirma-tipo-comprobante', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
}
