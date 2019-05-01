import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CoberturaService extends BaseService {

  private headers = new Headers();

  private urlAcredita: string;

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();

    this.urlAcredita = this._configuration.Server + "acredita/";

  }

  public getCoberturas(data: any) {
    return this._http.post(this.urlAcredita+"coberturas", data, { headers: this.obtenerHeaders()}).map((res: Response) => res.json());
    // return this._http.post(this._configuraa+"admision/p", data, {headers: this.obtenerHeaders()}).map((res:Response) => res.json());
  }

  // public insertarProgramacion(datos)
  // {
  // }
}
