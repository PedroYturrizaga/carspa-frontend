import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class IafasService extends BaseService {
  private headers = new Headers();
  private URLIafas: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = super.obtenerHeaders();
    this.URLIafas = this._configuration.Server + "acredita/aseguradoras";
  }
  public obtenerIafas(_params) {

    let queryParams = new URLSearchParams()
    queryParams.append("coEntilden", _params.coEntilden);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    queryParams.append("codIafa", _params.codIafa);
    queryParams.append("nombre", _params.nombre);
    queryParams.append("flagEnUso", _params.flagEnUso);
    queryParams.append("flagPropio", _params.flagPropio);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLIafas + '/listarIafas', options).map((res: Response) => res.json());
  }
  public insertarIafa(data) {
    return this._http.post(this.URLIafas + '/insertarIafa', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public actualizarIafa(data) {
    console.log(data);
    return this._http.put(this.URLIafas + '/actualizarIafa', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());

  }
  public deleteIafa(data) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (data !== undefined && data !== null) {
      queryParams.append('coEntilden', data);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLIafas + "/eliminarIafa", options).map((res: Response) => res.json());
  }

  public comboIafa(param) {
    let queryParams = new URLSearchParams()
    queryParams.append("coEntilden", param.coEntilden);
    queryParams.append("nuPagina", param.nuPagina);
    queryParams.append("nuRegisMostrar", param.nuRegisMostrar);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLIafas + "/listarIafas", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }
}

