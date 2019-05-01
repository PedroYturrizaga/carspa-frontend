import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from "../../shared/configuration/app.constants";
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class ActoMedicoCitaService  extends BaseService{

  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) { 
    super();
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getActoMedicoByCita(idCita: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idCita !== undefined) {
      queryParams.append('idCita', idCita);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/actosMedicos/cita', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
