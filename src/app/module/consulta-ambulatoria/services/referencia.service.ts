import { CambiarValoresEncriptados } from './../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from '../../../shared/services/base.service';


@Injectable()
export class ReferenciaService extends BaseService {

  private headers = new Headers();
  private URLAdmision: string;

  constructor(public _http: Http, public _configuration: Configuration, public _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLAdmision = this._configuration.Server + "admision/referencia";
  }

  public getIPRESSReferencia(param: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (param.idDiagnostico !== "" || param.idDiagnostico !== null) {
      queryParams.append('idDiagnosticos', param.idDiagnostico);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-ipress', options).map((result: Response) => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAreasReferencia(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idIPRESSDestino !== "" || params.idIPRESSDestino !== null) {
      queryParams.append('idIPRESSDestino', this._cambiarValores.replace(params.idIPRESSDestino));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-areas', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getEspecialidadesReferencia(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    // console.log(params);
    if (params.idIPRESSDestino !== "" || params.idIPRESSDestino !== null) {
      queryParams.append('idIPRESSDestino', this._cambiarValores.replace(params.idIPRESSDestino));
    }
    if (params.idArea !== undefined || params.idArea !== null) {
      queryParams.append('idArea', params.idArea);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-especialidades', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getActividadesReferencia(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idIPRESSDestino !== "" || params.idIPRESSDestino !== null) {
      queryParams.append('idIPRESSDestino', this._cambiarValores.replace(params.idIPRESSDestino));
    }
    if (params.idArea !== undefined || params.idArea !== null) {
      queryParams.append('idArea', params.idArea);
    }
    if (params.idEspecialidad !== undefined || params.idEspecialidad !== null) {
      queryParams.append('idEspecialidad', params.idEspecialidad);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-actividades', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getSubActividadesReferencia(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idIPRESSDestino !== "" || params.idIPRESSDestino !== null) {
      queryParams.append('idIPRESSDestino', this._cambiarValores.replace(params.idIPRESSDestino));
    }

    if (params.idArea !== undefined || params.idArea !== null) {
      queryParams.append('idArea', params.idArea);
    }
    if (params.idEspecialidad !== undefined || params.idEspecialidad !== null) {
      queryParams.append('idEspecialidad', params.idEspecialidad);
    }
    if (params.idActividad !== undefined || params.idActividad !== null) {
      queryParams.append('idActividad', params.idActividad);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-subActividades', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDiagnosticosReferencia(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idActoMedicoEncriptado !== undefined || params.idActoMedicoEncriptado !== null) {
      queryParams.append('idActoMedico', this._cambiarValores.replace(params.idActoMedicoEncriptado));
    }
    if (params.idAtencionEncriptado !== undefined || params.idAtencionEncriptado !== null || params.idAtencionEncriptado !== "" ) {
      queryParams.append('idAtencion', this._cambiarValores.replace(params.idAtencionEncriptado));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/obtener-diagnosticos', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public postReferencia(data) {
    return this._http.post(this.URLAdmision, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteReferencia(_param: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_param.idReferencia !== undefined) {
      queryParams.append('idReferencia', _param.idReferencia);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLAdmision + '/eliminar-referencia', options).map((result: Response) => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getReferencia(param: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (param.idReferencia !== "" || param.idReferencia !== null) {
      queryParams.append('idReferencia', param.idReferencia);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision, options).map((result: Response) => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }



}
