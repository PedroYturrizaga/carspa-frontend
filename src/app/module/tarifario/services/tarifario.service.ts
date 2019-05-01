import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class TarifarioService extends BaseService {
  private headers = new Headers();
  private urlListaTipoMoneda: string;
  private urlListaConvenios: string;
  private urlListaServicio: string;
  private urlListaServicioConvenio: string;
  private urlInsertarServicioConvenio: string;
  private URLTarifario: string;
  private urlActutalizarServicioConvenio: string;
  private urlEliminarServicioConvenio: string;
  private urlVerServicioConvenio: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLTarifario = this._configuration.Server + "acredita";
    this.headers = super.obtenerHeaders();
    this.urlListaConvenios = _configuration.Server + "acredita/convenios/obtener-convenio";
    this.urlListaServicio = _configuration.Server + "acredita/tarifario/combo";
    this.urlListaServicioConvenio = _configuration.Server + "acredita/servicioConvenio/select";
    this.urlListaTipoMoneda = _configuration.Server + "acredita/tipoMonedas/combo";
    this.urlInsertarServicioConvenio = _configuration.Server + "acredita/servicioConvenio/insertar";
    this.urlActutalizarServicioConvenio = _configuration.Server + "acredita/servicioConvenio/actualizar";
    this.urlEliminarServicioConvenio = _configuration.Server + "acredita/servicioConvenio/eliminar";
    this.urlVerServicioConvenio = _configuration.Server + "acredita/servicioConvenio/ver";

  }
  public getAllMoneda() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    })
    return this._http.get(this.urlListaTipoMoneda, options).map((res: Response) => res.json());
  }
  public getAllConvenios() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    })
    return this._http.get(this.urlListaConvenios, options).map((res: Response) => res.json());
  }
  public getObtenerServicios(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("busServicio", _params.busServicio);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })
    return this._http.get(this.urlListaServicio, options).map((res: Response) => res.json());
  }

  public getListarServicioConvenio(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idConvenio", _params.idConvenio);
    queryParams.append("idServicio", _params.idServicio);
    queryParams.append("flgCpt", _params.flgCpt);
    queryParams.append("flgActividad", _params.flgActividad);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })
    return this._http.get(this.urlListaServicioConvenio, options).map((res: Response) => res.json());
  }

  public getServicios(_params) {
    let queryParams = new URLSearchParams();
    if (_params.descripcionTarifario != null) {
      queryParams.append("descripcionTarifario", _params.descripcionTarifario);
    }
    if (_params.flgCpt != null) {
      queryParams.append("flgCpt", _params.flgCpt);
    }
    if (_params.flgActividad != null) {
      queryParams.append("flgActividad", _params.flgActividad);
    }
    if (_params.nuPagina != null) {
      queryParams.append("nuPagina", _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLTarifario + "/tarifario/servicios", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertServicios(data: any) {
    return this._http.post(this.URLTarifario + '/tarifario/servicio', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public updateServicios(data: any) {
    return this._http.put(this.URLTarifario + "/tarifario/servicio", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public insertServiciosConvenio(data: any) {
    return this._http.post(this.urlInsertarServicioConvenio, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public updateServiciosConvenio(data: any) {
    return this._http.put(this.urlActutalizarServicioConvenio, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public deleteServicioConvenio(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idServicioConvenio", _params);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.urlEliminarServicioConvenio, options).map((res: Response) => res.json());
  }

  public deleteServicio(idServicio) {
    let queryParams = new URLSearchParams();
    if(idServicio){
      queryParams.append("idServicio", idServicio);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLTarifario + "/tarifario/servicio", options).map((res: Response) => res.json());
  }
}