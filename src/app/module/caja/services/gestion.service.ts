import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';

@Injectable()
export class GestionService {

  private headers = new Headers();
  private urlTurno: string;
  private urlOrigen: string;
  private urlAperCaja: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append("codUsuario", "codUsuario");
    this.headers.append("token", "token");
    this.urlTurno = _configuration.Server + 'commons/turno-controller';
  }

  public getAllTurnos(idPress: string) {
    this.headers.append("idIPRESS", idPress);
    return this._http.get(this.urlTurno, { headers: this.headers })
      .map((res: Response) => res.json());
  }

  public getAllOrigen(idPress: string) {
    this.headers.append("idIPRESS", idPress);
    return this._http.get(this.urlOrigen, { headers: this.headers })
      .map((res: Response) => res.json());
  }
  public getAllAperturaCaja(_idPress: string, _params: any[]) {
    let parametros = new URLSearchParams();

    parametros.append("IdPRESS", _idPress);
    for (let key in _params) {
      if (_params[key].idOrigen) {
        parametros.append("nuPagina", _params[key].nuPagina);
      }
      if (_params[key].nuRegisMostrar) {
        parametros.append("nuRegisMostrar", _params[key].nuRegisMostrar);
      }
      if (_params[key].idOrigen) {
        parametros.append("idOrigen", _params[key].idOrigen);
      }
      if (_params[key].idTurno) {
        parametros.append("idTurno", _params[key].idTurno);
      }
    }
    let opciones = new RequestOptions({
      headers: this.headers,
      search: parametros
    });
    return this._http.get(this.urlAperCaja, opciones)
      .map((res: Response) => res.json());
  }
}
