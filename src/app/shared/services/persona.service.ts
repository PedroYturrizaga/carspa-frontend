import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from "../../shared/configuration/app.constants";
import { BaseService } from '../../shared/services/base.service';
import { CambiarValoresEncriptados } from '../helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class PersonaService extends BaseService {

  private headers = new Headers();

  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getDatosPersona(idCita: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idCita != null) {
      // console.log(idCita)
      queryParams.append('idCita', this._cambiarValores.replace(idCita)); //this._cambiarValores.replace(idCita)
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLCommons + '/personas/datos/cita', options).map((res: Response) => res.json());
  }

  public getDatosPersonaPorActoMedico(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idActoMedicoEncriptado != null) {
      queryParams.append('idActoMedicoEncriptado', this._cambiarValores.replace(params.idActoMedicoEncriptado));
    }

    if (params.idAtencionEncriptado != null) {
      queryParams.append('idAtencionEncriptado', this._cambiarValores.replace(params.idAtencionEncriptado));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLCommons + '/personas/datos/actoMedico', options).map((res: Response) => res.json());
  }

  public getEstadoCivil() {
    return this._http.get(this.URLCommons + '/estadosCiviles', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getTipoDocumento() {
    return this._http.get(this.URLCommons + '/tiposDocumentos', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getTipoSangre() {
    return this._http.get(this.URLCommons + '/tipoSangre', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getGradoInstruccion() {
    return this._http.get(this.URLCommons + '/gradoInstruccion', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getOcupacionPersona(descripcion) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (descripcion !== undefined) {
      queryParams.append('descripcion', descripcion);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + '/ocupaciones/descripcion', options).map((res: Response) => res.json());
  }

  public getOcupacion() {

    return this._http.get(this.URLCommons + '/ocupaciones', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
}
