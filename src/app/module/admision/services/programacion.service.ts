import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgramacionService extends BaseService
{
  private URLProgramacion:string;

  constructor(public _http: Http, public _configuration: Configuration)
  {
    super();
    this.URLProgramacion = this._configuration.Server + 'admision/programaciones';
  }

  public obtenerProgramaciones( _params:any )
  {
    /* Query params */
    let queryParams:URLSearchParams = new URLSearchParams();
    
    if( _params.idPersonal !== undefined )
      queryParams.append( 'idPersonal', _params.idPersonal );
    if( _params.idArea !== undefined )
      queryParams.append( 'idArea', _params.idArea )
    if( _params.idEspecialidad !== undefined )
      queryParams.append( 'idEspecialidad', _params.idEspecialidad );
    if( _params.idActividad !== undefined )
      queryParams.append( 'idActividad', _params.idActividad );
    if( _params.idSubActividad !== undefined )
      queryParams.append( 'idSubActividad', _params.idSubActividad );
    if( _params.mes !== undefined )
      queryParams.append( 'mes', _params.mes );
    if( _params.anio !== undefined )
      queryParams.append( 'anio', _params.anio );

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get( this.URLProgramacion, options )
                     .map( result => result.json() )
                     .catch( ( error:any ) => Observable.throw( error.json().error ) );
  }

  public insertarProgramacion(datos)
  {
    return this._http.post(this._configuration.Server+"admision/programaciones",datos,{headers: this.obtenerHeaders()}).map((res:Response) => res.json());
  }

  public eliminarProgramacion( _params:any )
  {
    return this._http.delete( `${this.URLProgramacion}/${_params.idProgramacion}`, { headers: this.obtenerHeaders(), params : { 'esIPRESSPrivada': `${_params.esIPRESSPrivada}` } } )
                     .map( result => result.json() )
                     .catch( ( error : any ) => Observable.throw( error.json().error ) );
  }
}
