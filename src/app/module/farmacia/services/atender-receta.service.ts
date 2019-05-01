import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AtenderRecetaService extends BaseService {
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

  public getAllTipoDocumento() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this._configuration.Server + "commons/tiposDocumentos", options).map((res: Response) => res.json());
  }

  public getRecetabyBusqueda(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idTipoDocumentoIdentidad !== undefined) {
      queryParams.append('idTipoDocumentoIdentidad', _params.idTipoDocumentoIdentidad);
    }
    if (_params.numeroDocumentoIdentidad !== undefined) {
      queryParams.append('numeroDocumentoIdentidad', _params.numeroDocumentoIdentidad)
    }
    if (_params.idActoMedico !== undefined) {
      queryParams.append('idActoMedico', _params.idActoMedico);
    }
    if (_params.idReceta !== undefined) {
      queryParams.append('idReceta', _params.idReceta);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    console.log(options);
    
    return this._http.get(this.URLFarmacia + '/recetas/busqueda/despacho', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getHistorialRecetaByPersona(idPersona: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idPersona !== undefined) {
      queryParams.append('idPersona', idPersona);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLFarmacia + '/recetas/persona', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getActoMedicobyReceta(idReceta) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idReceta !== undefined) {
      queryParams.append('idReceta', idReceta);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/actosMedicos/receta', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getRecetaById(idReceta, idPersona) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idReceta !== undefined) {
      queryParams.append('idReceta', idReceta);
    }
    if (idPersona !== undefined) {
      queryParams.append('idPersona', idPersona);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/recetas/atencion', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public atenderReceta(data) {
    console.log("Data de Service: ",data)
    return this._http.post(this.URLFarmacia + '/recetas/atender-receta', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getFarmaciaConfigPorNombre(nombreConfig) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (nombreConfig !== undefined) {
      queryParams.append('nombreConfig', nombreConfig);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/farmaciaConfig/obtenerFarmaciaConfigByNombre', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertOrdenPagoFarmacia(data){
    return this._http.post(this.URLFarmacia + '/ordenPagoFarmacia/insertar-orden-pago-farmacia', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public reporteOrdenPagoFarmacia(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idOrdenPagoFarmacia !== undefined) {
      queryParams.append('idOrdenPagoFarmacia', params.idOrdenPagoFarmacia);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + '/ordenPagoFarmacia/obtener-orden-pago-farmacia', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
