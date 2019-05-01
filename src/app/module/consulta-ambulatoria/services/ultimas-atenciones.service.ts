import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { HttpParams } from '@angular/common/http';    
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class UltimasAtencionesService extends BaseService {

  private URLAdmision: String;
  constructor(public _http: Http, 
              public _configuration: Configuration,
              private _cambiarValores: CambiarValoresEncriptados) { 
    super();
    this.URLAdmision = this._configuration.Server + "admision";
  }

  public getActosMedicosAtenciones(params){
    let queryParams: URLSearchParams = new URLSearchParams();

    if ((params.idPersona != undefined || params.idPersona != null) && params.idPersona != "") {
      queryParams.append("idPersona", this._cambiarValores.replace(params.idPersona));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    //console.log(options)
    return this._http.get(this.URLAdmision + "/actosMedicos/Atenciones",options)
                     .map(result => result.json())
                     .catch((error: any) => Observable.throw(error.json().error));
  }

  public getAtencionesPorActoMedico(idActoMedico){
    let queryParams: URLSearchParams = new URLSearchParams();

    if((idActoMedico != undefined || idActoMedico != null) && idActoMedico != ""){
      queryParams.append("idActoMedico",this._cambiarValores.replace(idActoMedico));
    }
     let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + "/actosMedicos/AtencionesActoMedico", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAntecedentesHistorial(idActoMedico, idAtencion){
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if((idActoMedico != undefined || idActoMedico != null) && idActoMedico != ""){
      queryParams.append("idActoMedico",this._cambiarValores.replace(idActoMedico));
    }
    if(idAtencion != undefined && idAtencion != null   && idAtencion != ""){
      queryParams.append("idAtencion",this._cambiarValores.replace(idAtencion));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options)
    return this._http.get(this.URLAdmision + "/antecedentesHistorial/atencedentes-historial-por-acto-medico", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}