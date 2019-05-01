import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class RolService extends BaseService {

  private headers = new Headers();
  private urlRol: string;
  private urlPagina: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.urlRol = _configuration.Server + "seguridad/roles";
    this.urlPagina = _configuration.Server + "seguridad/paginas";

  }

  public getAllRoles(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idRol != null) {
      queryParams.append('idRol', _params.idRol);
    }
    if (_params.descripRol != null && _params.descripRol.trim() != "" && _params.descripRol != undefined) {
      queryParams.append('descripRol', _params.descripRol);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.urlRol, options).map((res: Response) => res.json());
  }

  public getRol(id) {
    return this._http.get(this.urlRol + "/" + id, { headers: this.headers }).map((res: Response) => res.json());
  }

  public deleteRol(id: number) {
    return this._http.delete(this.urlRol + "/" + id, { headers: this.headers }).map((res: Response) => res.json());
  }

  public getAllPaginasPadreHijo() {
    return this._http.get(this.urlPagina, { headers: this.headers }).map((res: Response) => res.json());
  }

  public getPaginasPorRol(idRol) {
    return this._http.get(this.urlPagina + "/seleccionadasRol?idRol=" + idRol, { headers: this.headers }).map((res: Response) => res.json());
  }

  public addRol(data) {
    return this._http.post(this.urlRol, data, { headers: this.headers }).map((res: Response) => res.json());
  }

  public updateRol(data) {
    return this._http.put(this.urlRol, data, { headers: this.headers }).map((res: Response) => res.json());
  }

  //----------------------------------------------------------------------------------------------------------------------

  public getRolesGrupOcup() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.urlRol + "/rolesConGrupOcup" ,options).map((res: Response) => res.json());
  }

  public insertRolGrupOcup(data: any) {
    return this._http.post(this.urlRol + '/rolConGrupOcup', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public updateRolGrupOcup(data: any) {
    return this._http.put(this.urlRol + "/rolConGrupOcup", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteRolGrupOcup(idRol: number) {
    return this._http.delete(this.urlRol + "/rolesConGrupOcup/" + idRol, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
