import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { Configuration } from '../../shared/configuration/app.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ComboGeneralService extends BaseService {
  private URLComboGeneral:string;

  constructor(public _http : Http, public _configuration:Configuration) { 
    super();
    this.URLComboGeneral = this._configuration.Server + "commons/comboGeneral";
  }
  public obtenerCombo(param:any) {
    let queryParams : URLSearchParams = new URLSearchParams();
    if(param.comboGeneral != undefined) {
      queryParams.append('codigoGrupo', param.comboGeneral);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLComboGeneral, options)
                     .map(result => result.json())
                     .catch((error:any) => Observable.throw(error.json().error));
  }
}
