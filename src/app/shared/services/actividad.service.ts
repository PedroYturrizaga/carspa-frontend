import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../shared/configuration/app.constants';

import { BaseService } from './base.service';
import { SesionService } from './sesion.service';

@Injectable()
export class ActividadService extends BaseService
{
  private URLActividad: string;

  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.URLActividad = this._configuration.Server + 'commons/areas';
  }

  public obtenerActividades( _params:any )
  {
    let headers = new Headers();
    let sesion = SesionService.obtenerElementos();

    headers.append( 'Content-Type', 'application/json' );
    headers.append( 'Accept', 'application/json' );
    headers.append( 'codUsuario', sesion.seguridad.codUsuario );
    headers.append( 'token', sesion.seguridad.token );
    headers.append( 'idIPRESS', _params.idCentroMedico);
    
    return this._http.get( this.URLActividad + `/${_params.idArea}/especialidades/${_params.idEspecialidad}/actividades`, { headers: this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( ( error:any ) => Observable.throw( error.json().error ) );
  }

  public obtenerSubActividades( _params:any )
  {
    return this._http.get( this.URLActividad + `/${_params.idArea}/especialidades/${_params.idEspecialidad}/actividades/${_params.idActividad}/subActividades`, { headers : this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( ( error:any ) => Observable.throw( error.json().error ) );
  }
}
