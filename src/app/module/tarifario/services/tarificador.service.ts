import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Headers, Response } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';

@Injectable()
export class TarificadorService extends BaseService{

  private headers = new Headers();
  private urlTarificador: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = super.obtenerHeaders();
    this.urlTarificador = this._configuration.Server + "acredita";
  }

  public obtenerProforma(data: any) {
    return this._http.post(this.urlTarificador + '/tarificador/obtener-proforma', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
