import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class EspecialidadService extends BaseService {

 private url_Especialidad: String;

  constructor(public _http: Http, public _configuration: Configuration) {
    
    super();
    this.url_Especialidad = _configuration.Server + 'commons/areas/';
   }
  
public getEspecialidad(Params){
  let queryParams: URLSearchParams = new URLSearchParams();

  if(Params.descripcionEspecialidad !== undefined && Params.descripcionEspecialidad !== null){
      queryParams.append('descripcion_especialidad', Params.descripcionEspecialidad);
  }

  if(Params.numPagina !== undefined){
      queryParams.append('numPagina', Params.numPagina);
  }

  if (Params.numMostrarPagina !== undefined) {
      queryParams.append('numMostrarPagina', Params.numMostrarPagina);
  }

  let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
  });
    return this._http.get(this.url_Especialidad + 'obtenerEspecialidades', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
}
     
public postEspecialidad(data) {
  return this._http.post(this.url_Especialidad+ "insertarEspecialidad", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public deleteEspecialidad(data) {
    let queryParams: URLSearchParams = new URLSearchParams();
        
    if (data !== undefined && data !== null) {
    queryParams.append('idEspecialidad', data);
    }
    let options = new RequestOptions({
    headers: this.obtenerHeaders(),
    search: queryParams
    });
  return this._http.delete(this.url_Especialidad+ "eliminarEspecialidad", options).map((res: Response) => res.json());
  }
}
