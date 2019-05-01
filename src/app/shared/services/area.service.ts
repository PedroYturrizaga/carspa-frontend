import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../shared/configuration/app.constants';
import { BaseService } from './base.service';

@Injectable()
export class AreaService extends BaseService
{
  private URLAreas:string;
  
  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.URLAreas = this._configuration.Server + 'commons/areas'
  }

  public obtenerAreas()
  {
    return this._http.get( this.URLAreas, { headers : this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( (error:any) => Observable.throw( error.json().error ) );
  }

  public obtenerAreaPorID(_idArea:number)
  {
    return this._http.get( `${this.URLAreas}/${_idArea}`, { headers : this.obtenerHeaders() } )
                     .map( result => result.json() )
                     .catch( (error:any) => Observable.throw( error.json().error ) );
  }
}
