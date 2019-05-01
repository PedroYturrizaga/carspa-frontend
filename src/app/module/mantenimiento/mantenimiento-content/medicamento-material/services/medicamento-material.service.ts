import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../../shared/services/base.service';
import { _MatProgressBarMixinBase } from '@angular/material';

@Injectable()
export class MedicamentoMaterialService extends BaseService {
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

  public getAllMedicamentos(_params: any, _grupo: number) {
    let queryParams: URLSearchParams = new URLSearchParams();

    Object.keys(_params).forEach(key => {
      queryParams.append(key, _params[key]);
    });

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia +
      ((_grupo === 1) ?
        '/medicamentos/buscarMedicamentos' :
        '/dispositivoMedicoProductosSanitario/buscarDispositivosMedicos'),
      options)
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAllTiposDispositivo(_idTipoDispositivo: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_idTipoDispositivo) {
      queryParams.append('idTipoDispositivo', _idTipoDispositivo);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/tipoDispositivo", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAllCombos(_idsCombo: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_idsCombo) {
      queryParams.append('codigoGrupo', _idsCombo);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/comboGeneralFarmacia", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertUpdateMedicamento(_data: any, _grupo: number, _accion: number) {
    let url = this.URLFarmacia + ((_grupo === 1) ?
      '/medicamentos' : '/dispositivoMedicoProductosSanitario');

    let headers = { headers: this.obtenerHeaders() };

    return ((_accion === 1) ?
      this._http.post(url, _data, headers) :
      this._http.put(url, _data, headers))
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getUnidades(_param) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idUnidad != null) {
      queryParams.append('idUnidad', _param.idUnidad);
    }
    if (_param.tipo != null) {
      queryParams.append('tipo', _param.tipo);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + "/unidad/obtenerUnidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public deleteUpdateEstadoMedicamentoDispositivo(_param) {
    return this._http.put(this.URLFarmacia + "/medicamentos/eliminar-medicamento", _param, { headers: this.obtenerHeaders() }).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}