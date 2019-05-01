import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from "../../../shared/configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CitaProcedimientoService extends BaseService {

  private headers = new Headers();
  private urlGetTipoDoc: string;
  private urlGetDataPaciente: string;
  private urlGetProcParaCita: string;
  private urlGetDocsParaAtencion: string;
  private urlGetNumDocs: string;
  private urlgetPacientesCitados: string;
  private urlgetHistorialProcedimientos: string;
  private urlgetCitasReservadas: string;
  private urlconfirmarReserva: string;
  private urlGetArea: string;
  private urlGetEspecialidad: string;
  private urlGetSolicProced: string;
  private urlGetMedicos: string;
  private urlOtorgarCita: string;
  private urlComprobanteCita: string;
  private urlProcedCita: string;
  private urlSupenderDetaCita: string;
  private urlSupenderCabeCita: string;
  private urlDayColor: string;
  



  constructor(
    public _http: Http, public _configuration: Configuration
  ) {
    super();
    this.urlGetTipoDoc = this._configuration.Server + "commons/comboGeneral/combo-tipo-documento";
    this.urlGetDataPaciente = this._configuration.Server + "commons/personas/datos/id-persona";
    this.urlGetNumDocs = this._configuration.Server + "commons/personas/id-persona";
    this.urlgetPacientesCitados = this._configuration.Server + "admision/medicosDisponibles/mostrar-citados";
    this.urlgetHistorialProcedimientos = this._configuration.Server + "admision/citaProcedimiento/historial-procedimiento";
    this.urlgetCitasReservadas = this._configuration.Server + "admision/citaProcedimiento/citas-reservadas";
    this.urlComprobanteCita = this._configuration.Server + "admision/citaProcedimiento/citas-comprobante";
    this.urlconfirmarReserva = this._configuration.Server + "admision/citaProcedimiento/insertar-cita-procedimiento";
    this.urlGetArea = this._configuration.Server + "admision/areas/listar";
    this.urlGetEspecialidad = this._configuration.Server + "admision/especialidades/especialidadesAreaPersona";
    this.urlGetSolicProced = this._configuration.Server + "admision/solicitudProcedimientos/porPersona";
    this.urlGetMedicos = this._configuration.Server + "admision/medicosDisponibles/listar";
    this.urlOtorgarCita = this._configuration.Server + "admision/medicosDisponibles/otorgar-cita";
    this.urlProcedCita = this._configuration.Server + "admision/citaProcedimiento/ver-procedimientos";
    this.urlSupenderDetaCita = this._configuration.Server + "admision/citaProcedimiento/cancelar-detalle";
    this.urlSupenderCabeCita = this._configuration.Server + "admision/citaProcedimiento/cancelar-cabecera";
    this.urlDayColor = this._configuration.Server + "admision/medicosDisponibles/listDaysPro";

  }

  public suspenderDetalleReserva(data) {
    return this._http.post(this.urlSupenderDetaCita, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  
  public suspenderCabeceraReserva(data) {
    return this._http.post(this.urlSupenderCabeCita, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  public getTipoDocumentos() {
    let queryParams: URLSearchParams = new URLSearchParams;

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    });
    return this._http.get(this.urlGetTipoDoc, options).map((res: Response) => res.json());
  }

  public ObtenerNumeroDocs(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idTipoDocumentoIdentidad', _params.idTipoDocumento);
    queryParams.append('numeroDocumento', _params.nuDocumento);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetNumDocs, options).map((res: Response) => res.json());
  }
  public ObtenerEspecialidades(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idArea', _params.idArea);
    queryParams.append('idPersona', _params.idPersona);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetEspecialidad, options).map((res: Response) => res.json());
  }
  public ObtenerSolicitudes(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idEspecialidad', _params.idEspecialidad);
    queryParams.append('idArea', _params.idArea);
    queryParams.append('idPersona', _params.idPersona);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetSolicProced, options).map((res: Response) => res.json());
  }
  public ObtenerMedicos(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('tiempo', _params.tiempo);
    queryParams.append('fecha', _params.fecha);
    queryParams.append('idEspecialidad', _params.idEspecialidad);
    queryParams.append('idArea', _params.idArea);
    queryParams.append('opcion', _params.opcion);
    queryParams.append('numPagina', _params.numPagina);
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);


    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetMedicos, options).map((res: Response) => res.json());
  }
  public ObtenerCita(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idProgramacion', _params.idProgramacion);
    queryParams.append('dataProc', _params.dataProc);
    queryParams.append('idEspecialidad', _params.idEspecialidad);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlOtorgarCita, options).map((res: Response) => res.json());
  }
  public ObtenerAreas() {
    let queryParams: URLSearchParams = new URLSearchParams;
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.urlGetArea, options).map((res: Response) => res.json());

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

  public getProcedimientosParaCita(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idPersona', _params.idPersona);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetProcParaCita, options).map((res: Response) => res.json());
  }
  
  public getDocParaAtencion(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idEspecialidad', _params.idEspecialidad);
    console.log('SERVICIO: ' + _params.idEspecialidad);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlGetDocsParaAtencion, options).map((res: Response) => res.json());
  }
  public getPacientesCitados(_params) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idProgramacion', _params.idProgramacion);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlgetPacientesCitados, options).map((res: Response) => res.json());
  }
  public getHistorialProcedimientos(idPersona) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idPersona',idPersona);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlgetHistorialProcedimientos, options).map((res: Response) => res.json());
  }
  public getCitasReservadas(idPersona) {
    let queryParams: URLSearchParams = new URLSearchParams;
    queryParams.append('idPersona',idPersona);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlgetCitasReservadas, options).map((res: Response) => res.json());
  }
  public confirmarReserva(data) {
    return this._http.post(this.urlconfirmarReserva, data, { headers: this.obtenerHeaders(), })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }
  public getObtenerComprobante(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idCitaProcedimiento", _params.idCitaProcedimiento);
    queryParams.append("tipoFile", _params.tipoFile);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlComprobanteCita, options).map((res: Response) => res.json());
  }
  public getObtenerProc(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idCitaProcedimiento", _params.idCitaProcedimiento);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })

    console.log(options);
    return this._http.get(this.urlProcedCita, options).map((res: Response) => res.json());
  }

  public getDayColor(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append('tiempo', _params.tiempo);
    queryParams.append('idEspecialidad', _params.idEspecialidad);
    queryParams.append('idArea', _params.idArea);
    
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })
    return this._http.get(this.urlDayColor, options).map((res: Response) => res.json());
  }
}
