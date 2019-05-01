import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { BaseService } from '../../../shared/services/base.service';


@Injectable()
export class ConveniosService extends BaseService {

  private headers = new Headers();

  private urlAcredita: string;

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();

    this.urlAcredita = this._configuration.Server + "acredita/";

  }

  public getConvenioIafas() {
    return this._http.get(this.urlAcredita+ "convenios/obtenerConvenio/IAFAS-Empresa", { headers: this.obtenerHeaders(), }).map((res: Response) => res.json());
  }
  
}
