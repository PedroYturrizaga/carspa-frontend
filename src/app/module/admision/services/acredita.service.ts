import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AcreditaService extends BaseService {

  private urlAcredita: string;
  private urlFiliacion: string;
  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();

    this.urlAcredita = this._configuration.Server + "acredita";
    this.urlFiliacion = this._configuration.Server + "admision/pacientes";
  }

  public getAllTipoDocumento() {
    return this._http.get(this._configuration.Server + "commons/tiposDocumentos", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }


  public getAllAcreditaciones(jsonRequest: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (jsonRequest.tipoDocumento != null) {
      queryParams.append('tipoDocumento', jsonRequest.tipoDocumento.toString());
    }

    if (jsonRequest.numeroDocumento != null) {
      queryParams.append('numeroDocumento', jsonRequest.numeroDocumento.toString());
    }

    if (jsonRequest.codigoIafa != null) {
      queryParams.append('codigoIafa', jsonRequest.codigoIafa.toString());
    }

    if (jsonRequest.apPaterno != null) {
      queryParams.append('apellidoPaterno', jsonRequest.apPaterno.toString());
    }

    if (jsonRequest.apMaterno != null) {
      queryParams.append('apellidoMaterno', jsonRequest.apMaterno.toString());
    }

    if (jsonRequest.nommAsegurado != null) {
      queryParams.append('nombres', jsonRequest.nommAsegurado.toString());
    }

    if (jsonRequest.fiTipo != null) {
      queryParams.append('fiTipo', jsonRequest.fiTipo.toString());
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    console.log(options);

    return this._http.get(this.urlAcredita + "/acreditaciones/personas", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


  public postPlan(data: any) {
    return this._http.post(this.urlAcredita + "/acreditaciones/planes", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  // public getAllpersonas(tipoDoc: any, codiAseg: any, apellPat: any, apellMat: any, nombr: any) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if(tipoDoc != null )
  //     queryParams.append('tipoDocumento', tipoDoc);
  //   if(codiAseg != null )
  //     queryParams.append('numeroDocumento', codiAseg);
  //   if(apellPat != null )
  //     queryParams.append('apellidoPaterno', apellPat);
  //   if(apellMat != null )
  //     queryParams.append('apellidoMaterno', apellMat);
  //   if(nombr != null )
  //     queryParams.append('nombres', nombr);

  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders(),
  //     search: queryParams
  //   });
  //   console.log(options);
  //   return this._http.get(this.urlAcredita + "/acreditaciones/personas", options)
  //     .map(result => result.json())
  //     .catch((error: any) => Observable.throw(error.json().error));
  // }


  // public getAllPersona(numDocu: number, tipoDocu: number) {
  //   return this._http.get(this.urlAcredita + "/acreditaciones/coberturas?numeroDocumento=" + numDocu + "&tipoDocumento=" + tipoDocu, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public getPaciente(tipoDoc: number, numDocu: number) {
  //   return this._http.get(this.urlFiliacion + "?tipoDocumentoIdentidad=" + tipoDoc + "&numeroDocumentoIdentidad=" + numDocu, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public addPlan(data) {
  //   console.log(data);
  //   return this._http.post(this.urlAcredita + "/acreditaciones/coberturas", data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public getPlan(numeDoc: number, tipoDoc: number) {
  //   return this._http.get(this.urlAcredita + "/acreditaciones/planes?numeroDocumento=" + numeDoc + "&tipoDocumento=" + tipoDoc, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public getIAFAS() {
  //   return this._http.get(this.urlAcredita + "/aseguradoras", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public getCoberturas() {
  //   return this._http.get(this.urlAcredita + "/coberturas", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }

  // public insertarPlan(data) {
  //   console.log(data.plan.idPersona)

  //   data.plan.idPersona = this._cambiarValores.replace(data.plan.idPersona);
  //   console.log(data.plan.idPersona)

  //   console.log(data)
  //   return this._http.post(this.urlAcredita + '/acreditaciones/coberturas', data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  // }
}
