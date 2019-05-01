import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';


@Injectable()
export class ResultadoAtencionService extends BaseService{

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) 
  { 
    super();
  }
 
  public ObtenerDestinos()
  {
    return this._http.get(this._configuration.Server + 'commons/destinosAtencion',{headers: this.obtenerHeaders()}).map((res:Response) => res.json());
  }

  public obtenerEspecialida(idArea: number) {
    return this._http.get(this._configuration.Server + "commons/areas/" + idArea + "/especialidades", { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerActividad(idArea: number, idEspecialidad: number) {
    return this._http.get(this._configuration.Server + "commons/areas/" + idArea + "/especialidades/" + idEspecialidad +
      "/actividades", { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerSubActividad(idArea: number, idEspecialidad: number, idActividad: number) {
    return this._http.get(this._configuration.Server + "commons/areas/" + idArea + "/especialidades/" + idEspecialidad +
      "/actividades/" + idActividad + "/subActividades", { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerResultadoAtencion(idActoMedico) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idActoMedico !== undefined) {
      queryParams.append('idActoMedico', this._cambiarValores.replace(idActoMedico));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this._configuration.Server + "admision/destino", options).map((res: Response) => res.json());
  }
}
