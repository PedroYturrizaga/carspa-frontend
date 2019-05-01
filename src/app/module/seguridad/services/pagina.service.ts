import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Response } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';

@Injectable()
export class PaginaService extends BaseService{

  private headers = new Headers();
  private urlPagina: String;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.urlPagina = _configuration.Server + "seguridad/paginas";
  }

  public getPaginasRol(idRol){
    return this._http.get(this.urlPagina + "/paginasRol/" + idRol ,{ headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public insertDesactivarPaginaRol(data: any) {
    return this._http.post(this.urlPagina + '/paginasRol', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
