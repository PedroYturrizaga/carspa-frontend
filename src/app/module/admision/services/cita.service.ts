import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from "../../../shared/configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CitaService extends BaseService {

  private headers = new Headers();
  // private urlAcredita: string;
  private urlFiliacion: string;
  private urlListDaysProg: string;
  private urlProgramacionCitaVirtual: string;
  private urlObtenerHorarioCitaVirtual: string;
  private urlCitaVirtualProgramada: string;
  private urlInsertarCitaVirtualProgramada: string;
  private urlListSolicitudCita: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Accept', 'application/json');
    // this.headers.append('codUsuario', 'acastillo');
    // this.headers.append('idIPRESS', "gONZnF9vN/bocT+JhfnMGw==");
    // this.headers.append('token', 'token');

    // this.urlAcredita = this._configuration.Server + "acredita";
    this.urlFiliacion = this._configuration.Server + "admision/pacientes";
    this.urlListDaysProg = this._configuration.Server + "admision/citas/listDaysPro";
    this.urlProgramacionCitaVirtual = this._configuration.Server + "admision/programacionCitaVirtual";
    this.urlObtenerHorarioCitaVirtual = this._configuration.Server + "admision/horarioCitaVirtual";
    this.urlCitaVirtualProgramada = this._configuration.Server + "admision/citaProgramada";
    this.urlInsertarCitaVirtualProgramada = this._configuration.Server + "admision/citaVirtual";
    this.urlListSolicitudCita = this._configuration.Server + "admision/pacientes/solicitud";

  }

  public getAllTipoDocumento() {
    return this._http.get(this._configuration.Server + "commons/tiposDocumentos", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public getPaciente(numDocutipoDocumentoIdentidad: any, numDocunumeroDocumentoIdentidad: any, numDocuapellidoPaterno: any, numDocuapellidoMaterno: any, numDocunombres: any) {
    let numDocunuRegisMostrar: any = 15;
    let nuPagina: any = 1;
    let queryParams: URLSearchParams = new URLSearchParams();

    if (numDocutipoDocumentoIdentidad != null && numDocutipoDocumentoIdentidad != 0)
      queryParams.append('tipoDocumentoIdentidad', numDocutipoDocumentoIdentidad);
    if (numDocunumeroDocumentoIdentidad != null)
      queryParams.append('numeroDocumentoIdentidad', numDocunumeroDocumentoIdentidad);
    if (numDocuapellidoPaterno != null)
      queryParams.append('apellidoPaterno', numDocuapellidoPaterno);
    if (numDocuapellidoMaterno != null)
      queryParams.append('apellidoMaterno', numDocuapellidoMaterno);
    if (numDocunombres != null)
      queryParams.append('nombres', numDocunombres);
    if (numDocunuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', numDocunuRegisMostrar);
    } else {
      queryParams.append('nuRegisMostrar', "15");
    }
    if (nuPagina != null) {
      queryParams.append('nuPagina', nuPagina);
    } else {
      queryParams.append('nuPagina', "1");
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.urlFiliacion, options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getCitasPorPaciente(idPaciente, flgHistoria) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idPaciente != null) {
      queryParams.append('idPaciente', idPaciente);
    }
    if (flgHistoria != null) {
      queryParams.append('flgHistoria', flgHistoria);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this._configuration.Server + "admision/citas", options).map((res: Response) => res.json());
  }

  public getMotivosAnulacion() {
    return this._http.get(this._configuration.Server + "admision/motivosAnulacion", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public putCitas(data) {
    return this._http.put(this._configuration.Server + "admision/citas", data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public imprimirReporte(idPaciente: String, idCita: Number, tipoFile: number, nombreIpress: String, nombreAdmisionista: String) {
    return this._http.get(this._configuration.Server + "admision/citas/reporte?idPaciente=" + idPaciente + "&idCita=" + idCita +
      "&tipoFile=" + tipoFile + "&nombreIpress=" + nombreIpress + "&nombreAdmisionista=" + nombreAdmisionista,
      { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public imprimirHistorialCita(idPersona, numeroDocumento, flgHistoria, tipoFile) {
    let queryParams: URLSearchParams = new URLSearchParams();

    queryParams.append('idPaciente', idPersona);
    queryParams.append('numeroDocumento', numeroDocumento);
    queryParams.append('flgHistoria', flgHistoria);
    queryParams.append('tipoFile', tipoFile);


    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this._configuration.Server + "admision/citas/historialReporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerAreas() {

    return this._http.get(this._configuration.Server + "commons/areas/obtieneAreaConsultaAmbulatoria", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public obtenerEspecialida(idArea) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idArea != null) {
      queryParams.append('idArea', idArea);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this._configuration.Server + "commons/areas/obtenerEspecialidadesConsultaAmbulatoria", options).map((res: Response) => res.json());
  }

  public obtenerActividad(idArea, idEspecialidad) {

    let queryParams: URLSearchParams = new URLSearchParams();
    if (idArea != null) {
      queryParams.append('idArea', idArea);
    }
    if (idEspecialidad != null) {
      queryParams.append('idEspecialidad', idEspecialidad);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this._configuration.Server + "commons/areas/obtenerAreasCitaAmbulatoria", options).map((res: Response) => res.json());

  }

  public obtenerSubActividad(idArea: number, idEspecialidad: number, idActividad: number) {
    return this._http.get(this._configuration.Server + "commons/areas/" + idArea + "/especialidades/" + idEspecialidad +
      "/actividades/" + idActividad + "/subActividades", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public obtenerListaTurnoMedico(idPersona, idArea, idEspecialidad, idActividad, idSubActividad, fechaBase, idPersonal) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idPersona != null) {
      queryParams.append('idPersona', idPersona);
    }
    if (idArea != null) {
      queryParams.append('idArea', idArea);
    }
    if (idEspecialidad != null) {
      queryParams.append('idEspecialidad', idEspecialidad);
    }
    if (idActividad != null) {
      queryParams.append('idActividad', idActividad)
    }
    if (idSubActividad != null) {
      queryParams.append('idSubActividad', idSubActividad);
    }
    if (fechaBase != null) {
      queryParams.append('fechaBase', fechaBase)
    }
    if (idPersonal != null) {
      queryParams.append('idPersonal', idPersonal)
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this._configuration.Server + "admision/citas/turnosMedicos", options).map((res: Response) => res.json());
  }

  public obtenerAreEspecActSubAct(idPaciente: String, idCita: number) {
    return this._http.get(this._configuration.Server + "admision/citas/detalleCita?idPaciente=" + idPaciente + "&idCita=" + idCita, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public obtenerProgramacionCitaVirtual(_param: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_param.idPersonal !== undefined)
      queryParams.append('idPersonal', _param.idPersonal);
    if (_param.idArea !== undefined)
      queryParams.append('idArea', _param.idArea);
    if (_param.idEspecialidad !== undefined)
      queryParams.append('idEspecialidad', _param.idEspecialidad);
    if (_param.idActividad !== undefined)
      queryParams.append('idActividad', _param.idActividad)
    if (_param.idSubActividad !== undefined)
      queryParams.append('idSubActividad', _param.idSubActividad);
    if (_param.mes !== undefined)
      queryParams.append('mes', _param.mes)
    if (_param.ano !== undefined)
      queryParams.append('ano', _param.ano);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlProgramacionCitaVirtual, options).map((res: Response) => res.json());
  }

  public obtenerHorarioCitaVirtual(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idProgramacion !== undefined)
      queryParams.append('idProgramacion', _params.idProgramacion);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlObtenerHorarioCitaVirtual, options).map((res: Response) => res.json());
  }

  public CitaVirtualProgramada(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersonal !== undefined)
      queryParams.append('idPersonal', _params.idPersonal);
    if (_params.flag !== undefined)
      queryParams.append('flag', _params.flag);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlCitaVirtualProgramada, options).map((res: Response) => res.json());
  }

  public insertarCitaVirtualProgramada(data) {
    return this._http.post(this.urlInsertarCitaVirtualProgramada, data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public getListadoDetalleProgramacion(idProgramacion: number) {
    return this._http.get(this._configuration.Server + "admision/citas/detalleProgramacion?idProgramacion=" + idProgramacion, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public getCoberturaVigente(idPersona: number) {
    return this._http.get(this._configuration.Server + "acredita/acreditaciones/planVigente?idPersona=" + idPersona, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public postPullCitas(data) {
    return this._http.post(this._configuration.Server + "admision/citas/insertarCita", data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }

  public getAdicionalCupo(idpro) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idpro != null) {
      queryParams.append('idProgramacion', idpro);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this._configuration.Server + "admision/citas/darAccionalCupo", options).map((res: Response) => res.json());
  }

  // public getListDaysProg(jsonRequest: any) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if (jsonRequest.idArea != null) {
  //     queryParams.append('idArea', jsonRequest.idArea);
  //   }
  //   if (jsonRequest.idEspecialidad != null) {
  //     queryParams.append('idEspecialidad', jsonRequest.idEspecialidad);
  //   }
  //   if (jsonRequest.idActividad != null) {
  //     queryParams.append('idActividad', jsonRequest.idActividad);
  //   }
  //   if (jsonRequest.idSubactividad != null) {
  //     queryParams.append('idSubactividad', jsonRequest.idSubactividad);
  //   }
  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders(),
  //     search: queryParams
  //   });
  //   return this._http.get(this.urlListDaysProg, options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  // }

  public getSolicitudCita(_param: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_param.tipoDocumentoIdentidad != null && _param.tipoDocumentoIdentidad != 0) {
      queryParams.append('tipoDocumentoIdentidad', _param.tipoDocumentoIdentidad);
    }
    if (_param.numeroDocumentoIdentidad != null && _param.numeroDocumentoIdentidad != 0) {
      queryParams.append('numeroDocumentoIdentidad', _param.numeroDocumentoIdentidad);
    }

    queryParams.append('apellidoPaterno', _param.apellidoPaterno);
    queryParams.append('apellidoMaterno', _param.apellidoMaterno);
    queryParams.append('nombres', _param.nombres);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    console.log(options);
    return this._http.get(this.urlListSolicitudCita, options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getListDaysProg(jsonRequest: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (jsonRequest.idArea != null) {
      queryParams.append('idArea', jsonRequest.idArea);
    }
    if (jsonRequest.idEspecialidad != null) {
      queryParams.append('idEspecialidad', jsonRequest.idEspecialidad);
    }
    if (jsonRequest.idActividad != null) {
      queryParams.append('idActividad', jsonRequest.idActividad);
    }
    if (jsonRequest.idSubactividad != null) {
      queryParams.append('idSubactividad', jsonRequest.idSubactividad);
    }
    if (jsonRequest.idPersonal != null) {
      queryParams.append('idPersonal', jsonRequest.idPersonal);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.urlListDaysProg, options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
