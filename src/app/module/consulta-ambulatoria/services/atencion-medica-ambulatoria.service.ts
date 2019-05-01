import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from "@angular/http";
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class AtencionMedicaAmbulatoriaService extends BaseService {

  private URLAdmision: String;
  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLAdmision = this._configuration.Server + "admision";
  }

  public getListaCitaxPersonal(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idPersonal !== undefined) {
      queryParams.append("idPersonal", this._cambiarValores.replace(params.idPersonal));
    }
    if (params.feProgramacion !== undefined) {
      queryParams.append("feProgramacion", params.feProgramacion);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search : queryParams
    });
    // console.log(options);
    return this._http.get(this.URLAdmision + "/citaPorPersonal", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getListaCitaxPersonalProcedimiento(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idPersonal !== undefined) {
      queryParams.append("idPersonal", this._cambiarValores.replace(params.idPersonal));
    }
    if (params.feProgramacion !== undefined) {
      queryParams.append("feProgramacion", params.feProgramacion);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search : queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + "/citaPorPersonal/ProgramacionProcedimiento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getListaCitaxProgramacion(idProgramacion:any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if(idProgramacion !== undefined) {
      queryParams.append("idProgramacion", idProgramacion);
    }
    let options = new RequestOptions({
      headers : this.obtenerHeaders(),
      search  : queryParams
    });
    // console.log(options);
    return this._http.get(this.URLAdmision + "/citadoPorProgramacion/citado-por-programacion", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getListaCitaxProgramacionProcedimiento(idProgramacion:any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if(idProgramacion !== undefined) {
      queryParams.append("idProgramacion", idProgramacion);
    }
    let options = new RequestOptions({
      headers : this.obtenerHeaders(),
      search  : queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + "/citadoPorProgramacion/citadoProgramacionProcedimiento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public updateEstadoCita(data) {
    // console.log(data);
    return this._http.post(this.URLAdmision + "/citadoPorProgramacion/actualizar-estado-cita",data,{headers:this.obtenerHeaders()}).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
