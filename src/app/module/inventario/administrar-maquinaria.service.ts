import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Http, RequestOptions } from '@angular/http';
import { Configuration } from '../../shared/configuration/app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class AdministrarMaquinariaService extends BaseService{

  private urlMaquinaria: string;
  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.urlMaquinaria = this._configuration.Server + "maquinaria/";
   }


   public getMaquinarias (_params){
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    queryParams.append("estado", _params.estado);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })
    // return this._http.get(this.urlMaquinaria+"listarMaquinarias", options).map((res: Response) => res.json());
   }
   public anularMaquinaria(data: any) {
    // return this._http.put(this.urlMaquinaria  + "eliminarMaquinaria", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public activarMaquinaria(data: any) {
    // return this._http.put(this.urlMaquinaria  + "activarMaquinaria", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public updateMaquinaria(data: any) {
    // return this._http.put(this.urlMaquinaria  + "actualizarMaquinaria", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public insertMaquinaria(data) {
    // return this._http.post(this.urlMaquinaria  + "insertarMaquinaria", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }


}
