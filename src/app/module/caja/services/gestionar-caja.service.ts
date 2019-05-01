import { Observable } from 'rxjs/Observable';
import { Configuration } from './../../../shared/configuration/app.constants';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class GestionarCajaService extends BaseService {
  private headers = new Headers();

  private URLgestionarCaja: string;
  private URLaperturaCajas:string;
  private URLcommons: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.headers = super.obtenerHeaders();
    this.URLgestionarCaja = this._configuration.Server + "caja/gestionarCaja";
    this.URLaperturaCajas=this._configuration.Server+"caja/aperturaCajas/obtenerAperturaCierreCajas";
    this.URLcommons = this._configuration.Server + "commons/areas";
  }

  public obtenerAreaFisica() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    console.log(options);

    return this._http.get(this.URLcommons, options).map((res: Response) => res.json());
  }

  public obtenerAperturaCierreCajas(_params) {
  console.log(_params);
    let queryParams = new URLSearchParams()
    
    queryParams.append("fechaInicio",_params.fechaInicio);
  
    
    queryParams.append("fechaFin",_params.fechaFin);
    queryParams.append("estado", _params.estado);
    
    
    queryParams.append("idArea", _params.idArea);
    if(_params.nuPagina!=null){
      queryParams.append("nuPagina", _params.nuPagina);
      }
    
    if(_params.nuRegisMostrar!=null){
    queryParams.append("nuRegisMostrar",_params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLaperturaCajas , options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
