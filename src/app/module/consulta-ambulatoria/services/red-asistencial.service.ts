import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Response, Headers,URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Observable } from 'rxjs/Observable';
import { SesionService } from '../../../shared/services/sesion.service';

@Injectable()
export class RedAsistencialService extends BaseService {
  private URLRedAsistencial:string;
  private URLCentroMedico:string;
  private URLArea:string;
  private URLInserReferencia:string;
  private headers = new Headers();
  constructor(public _http : Http, public _configuration:Configuration) { 
    super();
    this.URLRedAsistencial  = this._configuration.Server + "admision/redAsistencial";
    this.URLCentroMedico    = this._configuration.Server + "admision/centroMedico";
    this.URLArea            = this._configuration.Server + "admision/areas";
    this.URLInserReferencia = this._configuration.Server + "admision/referencia";
  }

  public obtenerRedAsistencial() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
    });
    return this._http.get(this.URLRedAsistencial, options)
                     .map(result => result.json())
                     .catch((error:any) => Observable.throw(error.json().error));
  }

  public obtenerCentrosMedicos(idRedAsistencial:any) {
    let queryParams : URLSearchParams = new URLSearchParams();
    if(idRedAsistencial != undefined) {
      queryParams.append('idRedAsistencial', idRedAsistencial);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCentroMedico, options)
                     .map(result => result.json())
                     .catch((error:any) => Observable.throw(error.json().error));
  }

  public obtenerArea(paramArea:any) {
    console.log(paramArea);
    let queryParams : URLSearchParams = new URLSearchParams();
    if(paramArea.idGrupoOcupacional != undefined) {
      queryParams.append('idGrupoOcupacional', paramArea.idGrupoOcupacional);
    }
      // let headers = new Headers();
      // let sesion = SesionService.obtenerElementos();

      // headers.append( 'Content-Type', 'application/json' );
      // headers.append( 'Accept', 'application/json' );
      // headers.append( 'codUsuario', sesion.seguridad.codUsuario );
      // headers.append( 'token', sesion.seguridad.token );
      // headers.append( 'idIPRESS', paramArea.idIPRESSDestino);
    
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLArea, options)
                     .map(result => result.json())
                     .catch((error:any) => Observable.throw(error.json().error));
  }

  public insertReferencia(param:any) {
    let sesion = SesionService.obtenerElementos();
    return this._http.post(this.URLInserReferencia, param, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
