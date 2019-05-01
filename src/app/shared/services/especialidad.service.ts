import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../shared/configuration/app.constants';

import { BaseService } from "./base.service";

@Injectable()
export class EspecialidadService extends BaseService
{
  private URLEspecialidad:string;

  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.URLEspecialidad = this._configuration.Server + 'commons/areas';
  }

  public obtenerEspecialidades( _idArea: number )
  {
    return this._http.get( this.URLEspecialidad + `/${_idArea}/especialidades`, { headers : this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( ( error:any ) => Observable.throw( error.json().error || 'Server error' ) );
  }
}
