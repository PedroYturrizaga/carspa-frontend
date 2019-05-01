import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class MantenimientoAnaquelService extends BaseService {
  private headers = new Headers();
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getAlmacenesAsignados() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.URLFarmacia + '/almacenes/asignados', options).map((res: Response) => res.json());
  }

  public getMedicamentoDispositivo(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    // if (_params.idAlmacen = null) {
      queryParams.append('idAlmacen', null);
    // }
    if (_params.descripcionMedicDispProdSanid != null) {
      queryParams.append('descripcionMedicDispProdSanid', _params.descripcionMedicDispProdSanid);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + "/medicamentoDispMedicoProdSanitario", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAnaqueles(idAlmacen) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idAlmacen !== undefined) {
      queryParams.append('idAlmacen', idAlmacen);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + "/almacen-medicamento/anaquel-lista", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAlmacenMedicamentos(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idDispMedicoProdSanitario != null) {
      queryParams.append('idDispMedicoProdSanitario', _params.idDispMedicoProdSanitario);
    }
    if (_params.anaquel != null && _params.anaquel != 0) {
      queryParams.append('anaquel', _params.anaquel);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + "/almacen-medicamento/anaquel", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public updateAnaquel(data) {
    this.headers = this.obtenerHeaders();
    return this._http.put(this.URLFarmacia + "/almacen-medicamento/anaquel", data, { headers: this.headers }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
