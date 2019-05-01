import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class ExamenFisicoService extends BaseService {
  private URLAdmision: string;

  constructor(public _http : Http,
              public _configuration : Configuration,
              private _cambiarValores: CambiarValoresEncriptados) { 
    super();
    this.URLAdmision = this._configuration.Server + "admision";
  }

  public getActoMedico(idActoMedico:any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if(idActoMedico !== undefined) {
      queryParams.append("idActoMedico", this._cambiarValores.replace(idActoMedico));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search : queryParams
    });
    return this._http.get(this.URLAdmision+"/actosMedicos/adicional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  
  public getExamenNutricional(params:any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.peso !== undefined) {
      queryParams.append("peso", params.peso);
    }
    if (params.talla !== undefined) {
      queryParams.append("talla", params.talla);
    }
    if (params.idPersona !== undefined) {
      queryParams.append("idPersona", this._cambiarValores.replace(params.idPersona));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search : queryParams
    });
    return this._http.get(this.URLAdmision + "/examenFisico/nutricional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}
