import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonalContratanteService extends BaseService {
  private headers = new Headers();
  private URLPersonalContratante: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = super.obtenerHeaders();
    this.URLPersonalContratante = this._configuration.Server + "acredita/personaContratante";
  }
  public obtenerConvenioPersonaContratante() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    });
    return this._http.get(this.URLPersonalContratante + '/obtener-convenio-contratante', options).map((res: Response) => res.json());

  }
  public obtenerGeneroPersonaContratante(){
    let options= new RequestOptions({
      headers:this.obtenerHeaders(),
    });
    return this._http.get(this.URLPersonalContratante + '/obtener-genero', options).map((res:Response)=> res.json());
  }
  public obtenerParentezco(){
    let options= new RequestOptions({
      headers:this.obtenerHeaders(),
    });
    return this._http.get(this.URLPersonalContratante + '/obtener-parentesco', options).map((res:Response)=> res.json()); 
  }
  public obtenerDocumento(){
    let options= new RequestOptions({
      headers:this.obtenerHeaders(),
    });
    return this._http.get(this.URLPersonalContratante + '/obtener-documento', options).map((res:Response)=> res.json()); 
  }
  public obtenerEstadoCivil(){
    let options= new RequestOptions({
      headers: this.obtenerHeaders(),
    });
    return this._http.get(this.URLPersonalContratante + '/obtener-estadocivil', options).map((res:Response)=> res.json());
  }
  public insertarPersonaContratante(data){
    return this._http.post(this.URLPersonalContratante + '/insertarPersonaContratante', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  
  }
  public listarPersonaContratante(_params){
    let queryParams = new URLSearchParams()
    queryParams.append("tipoDocumento", _params.tipoDocumento);
    queryParams.append("nroDocumento",_params.nroDocumento);
    queryParams.append("idConvenio",_params.idConvenio);
 let options = new RequestOptions({
  headers: this.obtenerHeaders(),
  search: queryParams
 });
console.log(options);
return this._http.get(this.URLPersonalContratante + '/listarPersonaContratante', options).map((res: Response) => res.json());
  }
}
