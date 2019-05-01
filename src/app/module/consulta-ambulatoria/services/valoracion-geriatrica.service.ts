import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class ValoracionGeriatricaService extends BaseService {

  private URLAdmision: String;
  constructor(public _http: Http, 
              public _configuration: Configuration,
              private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLAdmision = this._configuration.Server + "admision";
  }

  public getResultadoPuntajePorValoracion(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (params.idGrupoValoracion != undefined) {
      queryParams.append("idGrupoValoracion", params.idGrupoValoracion);
    }
    // console.log("getResultadoPuntajePorValoracion\npuntaje: "+puntaje);
    if (params.puntaje != undefined) {
      queryParams.append("puntaje", params.puntaje);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLAdmision + "/valoracionGeriatrica/resultadoPuntaje", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDiagnosticosAnteriores(params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if ((params.idPersona != undefined || params.idPersona != null) && params.idPersona != "") {
      queryParams.append("idPersona", this._cambiarValores.replace(params.idPersona));
    }
    if ((params.idActoMedico != undefined || params.idActoMedico != null) && params.idActoMedico != "" ) {
      queryParams.append("idActoMedicoEncrip", this._cambiarValores.replace(params.idActoMedico));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLAdmision + "/valoracionGeriatrica/diagnosticosAnteriores", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDiagnosticoPersonaNueva(idGrupoValoracion: any){

    let queryParams: URLSearchParams = new URLSearchParams();

    if (idGrupoValoracion != undefined) {
      queryParams.append("idGrupoValoracion", idGrupoValoracion);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    
    return this._http.get(this.URLAdmision + "/valoracionGeriatrica", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


}
 