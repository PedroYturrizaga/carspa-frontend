import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from "../../../shared/configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
// import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AtencionProcedimientosService extends BaseService {

  private headers = new Headers();
  // private urlGetCitasAtencion: string;
  private urlGetProcedimientosAtender: string;
  // private name = "pedro";
  private urlGuardarAtencionProcedimiento: string;
  private urlGetDatosPaciente: string;
  // private urlNoSePresento: string;
  // private urlGetDatosPersonal: string;
  private URLAdmision: string;

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    // this.urlGetDatosPersonal = this._configuration.Server + "admision/personales";
    // this.urlGetCitasAtencion = this._configuration.Server + "admision/citaProcedimiento/procedimiento-por-fecha";
    this.urlGetProcedimientosAtender = this._configuration.Server + "admision/citaProcedimiento/lista-cita-procedimiento";
    this.urlGuardarAtencionProcedimiento = this._configuration.Server + "admision/citaProcedimiento/atencion-procedimiento";
    this.urlGetDatosPaciente = this._configuration.Server + "admision/citaProcedimiento/datos-paciente-cita-procedimiento";
    // this.urlNoSePresento = this._configuration.Server + "admision/citaProcedimiento/actualizar-estado-cita-procedimiento";
    this.URLAdmision = this._configuration.Server + "admision/"
  }


  public getDatosPersonal(getPersonal) {
    console.log(getPersonal);
    
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('numeroDocumento', getPersonal.numeroDocumento);
    queryParams.append('apellidoPaternoPersonal', getPersonal.apellidoPaternoPersonal);
    queryParams.append('apellidoMaternoPersonal', getPersonal.apellidoMaternoPersonal);
    queryParams.append('nombrePersonal', getPersonal.nombrePersonal);
    queryParams.append('idPersonal', getPersonal.idPersonal);
    queryParams.append('idPersonalEncript', this._cambiarValores.replace(getPersonal.idPersonalEncript) );
    queryParams.append('numPagina', getPersonal.numPagina);
    queryParams.append('numRegistroMostrar', getPersonal.numRegistroMostrar);
    queryParams.append('numeroCmp', getPersonal.numeroCmp)
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    console.log(options);
    
    return this._http.get(this.URLAdmision+"personales", options).map((res: Response) => res.json());
  }

  public getListaCitaxProgramacion(idProgramacion: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idProgramacion !== undefined) {
      queryParams.append("idProgramacion", idProgramacion);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + "/citadoPorProgramacion/citadoProgramacionProcedimiento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDatosPaciente(idCitaProcedimiento) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idCitaProcedimiento', idCitaProcedimiento);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetDatosPaciente, options).map((res: Response) => res.json());
  }
  // public getCitasAtencion(_params) {
  //   let queryParams: URLSearchParams = new URLSearchParams;
  //   queryParams.append('fecha', _params.fecha);
  //   queryParams.append('idArea', _params.idArea);
  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders(),
  //     params: queryParams
  //   });
  //   return this._http.get(this.urlGetCitasAtencion, options).map((res: Response) => res.json());
  // }
  public getProcedimientosAtender(idCitaProcedimiento) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idCitaProcedimiento', idCitaProcedimiento);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetProcedimientosAtender, options).map((res: Response) => res.json());
  }
  public guardarAtencionProcedimiento(data) {
    return this._http.post(this.urlGuardarAtencionProcedimiento, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  // public noSePresento(data) {
  //   return this._http.post(this.urlNoSePresento, data, { headers: this.obtenerHeaders(), })
  //     .map(result => result.json())
  //     .catch((error: any) => Observable.throw(error.json().error));
  // }


}
