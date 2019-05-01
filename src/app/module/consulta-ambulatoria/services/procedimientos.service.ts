import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from "../../../shared/configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ProcedimientosService extends BaseService {

  private urlNombreProcedimiento: string;
  private urlGuardarProcedimiento: string;
  private urlListarProcedimientoR: string;
  private urlProcedimientoCitados: string;
  private urlListarProcedimientoA: string;
  private urlListarDetalleProcedimiento: string;
  private urlObtenerDatosProcedimientoActualizar: string;
  private urlActualizarProcedimiento: string;
  private urlEliminarProcedimiento: string;
  private urlProcedimiento: string;
  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.urlNombreProcedimiento = this._configuration.Server + "admision/procedimiento/nombre-procedimiento";
    this.urlGuardarProcedimiento = this._configuration.Server + "admision/procedimiento/inserta-procedimiento";
    this.urlListarProcedimientoR = this._configuration.Server + "admision/procedimiento/procedimiento-registrado";
    this.urlListarProcedimientoA = this._configuration.Server + "admision/procedimiento/procedimiento-anterior";
    this.urlListarDetalleProcedimiento = this._configuration.Server + "admision/procedimiento/obtener-detalle-procedimiento";
    this.urlObtenerDatosProcedimientoActualizar = this._configuration.Server + "admision/procedimiento/obtener-datos-procedimiento-para-actualizar";
    this.urlActualizarProcedimiento = this._configuration.Server + "admision/procedimiento/actualizar-procedimiento";
    this.urlEliminarProcedimiento = this._configuration.Server + "admision/procedimiento/eliminar-procedimiento";
    this.urlProcedimiento = this._configuration.Server + "admision/procedimiento/";
    this.urlProcedimientoCitados = this._configuration.Server + 'admision/procedimiento/procedimiento-citados'
  }

  public listarProcedimientosCitados(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    if (_params.idActoMedicoEncrip !== undefined && _params.idActoMedicoEncrip !== "")
      queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedicoEncrip));

    if (_params.idAtencionEncrip !== undefined && _params.idAtencionEncrip !== "")
      queryParams.append('idAtencion', this._cambiarValores.replace(_params.idAtencionEncrip));

    if (_params.idCitaProcedimientoEncrip !== undefined && _params.idCitaProcedimientoEncrip !== "")
      queryParams.append('idCitaEncrip', this._cambiarValores.replace(_params.idCitaProcedimientoEncrip));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    console.log(options);
    return this._http.get(this.urlProcedimientoCitados, options).map((res: Response) => res.json());
  }

  public listarProcedimientosR(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    if (_params.idActoMedicoEncrip !== undefined && _params.idActoMedicoEncrip !== "")
      queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedicoEncrip));

    if (_params.idAtencionEncrip !== undefined && _params.idAtencionEncrip !== "")
      queryParams.append('idAtencion', this._cambiarValores.replace(_params.idAtencionEncrip));

    if (_params.idCitaProcedimientoEncrip !== undefined && _params.idCitaProcedimientoEncrip !== "")
      queryParams.append('idCitaEncrip', this._cambiarValores.replace(_params.idCitaProcedimientoEncrip));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    console.log(options);
    return this._http.get(this.urlListarProcedimientoR, options).map((res: Response) => res.json());
  }

  public listarProcedimientosA(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;

    if (_params.idPersona !== undefined && _params.idPersona !== "")
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    console.log(options)
    return this._http.get(this.urlListarProcedimientoA, options).map((res: Response) => res.json());
  }

  public ObtenerNombreProcedimientos(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    if (_params.nuProcedimiento !== undefined && _params.nuProcedimiento !== "")
      queryParams.append('nuProcedimiento', _params.nuProcedimiento);

    if (_params.noProcedimiento !== undefined && _params.noProcedimiento !== "")
      queryParams.append('noProcedimiento', _params.noProcedimiento);
    // if (_params.noProcedimiento !== undefined && _params.idCitaEncript !== "")
    //   queryParams.append('idCitaEncript', _params.idCitaEncript);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlNombreProcedimiento, options).map((res: Response) => res.json());
  }
  public ObtenerDetallesProc(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;

    queryParams.append('idProcedimiento', _params.idProcedimiento);

    queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedico));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlListarDetalleProcedimiento, options).map((res: Response) => res.json());
  }
  public GuardarProcedimiento(data) {
    return this._http.post(this.urlGuardarProcedimiento, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  public obtenerDatosEditar(data) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idProcedimiento', data.idProcedimiento);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlObtenerDatosProcedimientoActualizar, options).map((res: Response) => res.json());
  }
  public ActualizarProcedimiento(data) {
    return this._http.post(this.urlActualizarProcedimiento, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  public EliminarProcedimiento(datoEliminar) {
    return this._http.post(this.urlEliminarProcedimiento, datoEliminar, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public updateProcedimiento(data: any) {
    return this._http.put(this.urlProcedimiento + "actualizar-procedimiento-cita", data, { headers: this.obtenerHeaders(), })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  public saveProcedimiento(data: any) {
    return this._http.post(this.urlProcedimiento + "insertarProcedimientoxCita", data, { headers: this.obtenerHeaders(), })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
}
