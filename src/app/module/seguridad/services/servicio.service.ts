import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from '../../../shared/configuration/app.constants';

@Injectable()
export class ServicioService {

  private headers = new Headers();
  private urlServicio: string;
  private urlListarComponente: string;
  private urlListarPagina: string;
  private urlPaginasSeleccionadas: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append("codUsuario", "JBaldeon");
    this.headers.append("idIPRESS", "gONZnF9vN/bocT+JhfnMGw==");
    this.headers.append("token", "token");
    this.urlServicio = _configuration.Server + "seguridad/serviciosWeb";
    this.urlListarComponente = _configuration.Server + "seguridad/componentes";
    this.urlListarPagina = _configuration.Server + "seguridad/paginas";
    this.urlPaginasSeleccionadas = _configuration.Server + "seguridad/paginas/seleccionadas";
  }

  public getServicios(params) {
    let parametros = new URLSearchParams();

    if (params.nombreServicio != null) {
      parametros.append("nombreServicio", params.nombreServicio);
    }
    if (params.nuPagina != null) {
      parametros.append("nuPagina", params.nuPagina);
    } else {
      parametros.append("nuPagina", "1");
    }
    if (params.nuRegisMostrar != null) {
      parametros.append("nuRegisMostrar", params.nuRegisMostrar)
    } else {
      parametros.append("nuRegisMostrar", "10");
    }

    let opciones = new RequestOptions({
      headers: this.headers,
      search: parametros
    });
    return this._http.get(this.urlServicio, opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));

  }

  public getComponentes(idComponente) {
    let parametros = new URLSearchParams();
    parametros.append("idComponente", idComponente);
    let opciones = new RequestOptions({
      headers: this.headers,
      search: parametros
    })
    return this._http.get(this.urlListarComponente, opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));
  }

  public getPaginasSeleccionadas(idServicio?) {
    let parametros = new URLSearchParams();
    parametros.append("idServicio", idServicio);
    let opciones = new RequestOptions({
      headers: this.headers,
      search: parametros
    });
    return this._http.get(this.urlPaginasSeleccionadas, opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));
  }

  public addServicio(data) {
    return this._http.post(this.urlServicio, data, { headers: this.headers }).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));
  }

  public editServicio(data) {
    return this._http.put(this.urlServicio, data, { headers: this.headers }).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));
  }

  public deleteServicio(idServicio) {
    let parametros = new URLSearchParams()
    parametros.append("idServicio", idServicio);
    let opciones = new RequestOptions({
      headers: this.headers,
      search: parametros
    });
    return this._http.delete(this.urlServicio, opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server Error"));
  }
}
