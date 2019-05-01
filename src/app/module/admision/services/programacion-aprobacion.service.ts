import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import 'rxjs/add/operator/toPromise';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class ProgramacionAprobacionService extends BaseService{
  /*variables url*/
  private urlListaEspecialidad: string;
  private urlListaAreaHosp: string;
  private urlListaPersonales: string;
  private urlListaHorasTotales: string;
  private urlListaDetalleProgramacion: string;
  private urlActualizarProgramacion: string;
  private urlMotivosSuspencion: string;


  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) { 
    super();   
    /*asignacion de url para comumir servicios */
    this.urlListaEspecialidad = this._configuration.Server + "admision/especialidades";
    this.urlListaAreaHosp = this._configuration.Server + "admision/programacionesJ/horasProgramadas";
    this.urlListaPersonales = this._configuration.Server + "admision/programacionesJ/personales";
    this.urlListaHorasTotales = this._configuration.Server + "admision/programacionesJ/personales/horasTotales";
    this.urlListaDetalleProgramacion = this._configuration.Server + "admision/programacionesJ";
    this.urlActualizarProgramacion = this._configuration.Server + "admision/programacionesJ";
    this.urlMotivosSuspencion = this._configuration.Server + "admision/programacionesJ/motivoSuspension";
  }

  /*Declaracion de metodos para mantenimiento del crud*/
  public getAllEspecialidades(){
    return this._http.get(this.urlListaEspecialidad, {headers: this.obtenerHeaders()}).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  public getAllAreasHosp(data){
    let myparams = new URLSearchParams();
    if (data.idEspecialidad != null){
      myparams.append("idEspecialidad", data.idEspecialidad);        
    }
    if (data.anio != null){
      myparams.append("anio", data.anio);
    }
    if (data.mes != null){
      myparams.append("mes", data.mes);
    }

    let options = new RequestOptions ({
      headers: this.obtenerHeaders(),
      search: myparams
    });
    return this._http.get(this.urlListaAreaHosp, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getAllPersonales (data){
    let myparams = new URLSearchParams();
    if (data.idEspecialidad != null){
      myparams.append("idEspecialidad", data.idEspecialidad);        
    }
    if (data.anio != null){
      myparams.append("anio", data.anio);
    }
    if (data.mes != null){
      myparams.append("mes", data.mes);
    }
    let options = new RequestOptions ({
      headers:  this.obtenerHeaders(),
      search: myparams
    });
    return this._http.get(this.urlListaPersonales, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getAllHorasTotales(data){
    let myparams = new URLSearchParams();
    if (data.idPersonal != null){
      myparams.append("idPersonal", this._cambiarValores.replace(data.idPersonal));
    }
    if (data.idEspecialidad != null){
      myparams.append("idEspecialidad", data.idEspecialidad);        
    }
    if (data.anio != null){
      myparams.append("anio", data.anio);
    }
    if (data.mes != null){
      myparams.append("mes", data.mes);
    }
    let options = new RequestOptions ({
      headers: this.obtenerHeaders(),
      search: myparams
    });
    return this._http.get(this.urlListaHorasTotales, options).map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getAllDetalleProgramacion(data){
    let myparams = new URLSearchParams();
    if (data.idPersonal != null){
      myparams.append("idPersonal",this._cambiarValores.replace(data.idPersonal));        
    }
    if (data.idEspecialidad != null){
      myparams.append("idEspecialidad", data.idEspecialidad);        
    }
    if (data.anio != null){
      myparams.append("anio", data.anio);
    }
    if (data.mes != null){
      myparams.append("mes", data.mes);
    }
    let options = new RequestOptions ({
      headers: this.obtenerHeaders(),
      search: myparams
    });
    return this._http.get(this.urlListaDetalleProgramacion, options).map((res:Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public aprobarItemDetalle(id,prgramacionRequest){
    return this._http.put(this.urlActualizarProgramacion+"/"+id+"/estado", prgramacionRequest, { headers:  this.obtenerHeaders()}).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public suspenderItemDetalle(id,prgramacionRequest){
    return this._http.put(this.urlActualizarProgramacion+"/"+id+"/estado", prgramacionRequest, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getAllMotivosSuspencion(){
    return this._http.get(this.urlMotivosSuspencion, {headers: this.obtenerHeaders()}).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public aprobarProgramacionSync(id,prgramacionRequest){
      var url =  `${this.urlActualizarProgramacion}/${id}/estado`;
      var that = this;
      var promise = new Promise(function(resolve, reject)
      {
        that._http.put( url, prgramacionRequest, { headers: this.obtenerHeaders() })
                  .toPromise()
                  .then(function(data)
                  {
                      resolve( data.json() );
                  },
                  function( error )
                  {
                    reject( error.json().error );
                  });
      });

      return promise;
  }


}
