import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../shared/configuration/app.constants';

import { BaseService } from './base.service';

@Injectable()
export class AmbienteService extends BaseService
{
  private URLAmbientes:string;

  constructor(public _http: Http, public _configuration: Configuration)
  { 
    super();    
    this.URLAmbientes = this._configuration.Server + 'commons/ambientes'
  }
 
  public obtenerAmbientes(idArea,idEspecialidad,idActividad)
  {
    return this._http.get( this.URLAmbientes + "?idArea="+idArea+"&idEspecialidad="+idEspecialidad+"&idActividad="+idActividad, { headers : this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( (error:any) => Observable.throw( error.json().error ) );
  }
}
