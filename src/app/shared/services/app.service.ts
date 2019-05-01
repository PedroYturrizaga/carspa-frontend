import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../configuration/app.constants';
import { BaseService } from './base.service';
@Injectable()
export class AppService extends BaseService {

  private urlCommons: string;
  private headers: Headers;
  private urlTipoDocumento: string;
  private urlEstadoCivil: string;
  private urlSexos: string;
  private urlGrupoOcupacional: string;
  private urlUbigeos: string;
  private urlAreas: string;
  private urlEspecialidades: string;
  private urlActividades: string;
  private urlParentescos: string;
  private urlGradoInstruccion: string;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();

    this.urlCommons = this._configuration.Server + 'commons/';

    //servicios de commons
    this.urlTipoDocumento = this.urlCommons + "tiposDocumentos";
    this.urlEstadoCivil = this.urlCommons + "estadosCiviles";
    this.urlSexos = this.urlCommons + "sexos";
    this.urlGrupoOcupacional = this.urlCommons + "gruposOcupacionales";
    this.urlUbigeos = this.urlCommons + "ubigeos";
    this.urlAreas = this.urlCommons + "areas";
    this.urlEspecialidades = "especialidades";
    this.urlActividades = "actividades";
    this.urlParentescos = this.urlCommons + "parentescos";
    this.urlGradoInstruccion = this.urlCommons + "gradoInstruccion";
  }

  /**
   * lista tipo de documento de identidad
   */
  public getTipoDocumentos() {
    return this._http.get(this.urlTipoDocumento, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * lista estado civil
   */
  public getEstadosCiviles() {
    return this._http.get(this.urlEstadoCivil, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * lista sexo
   */
  public getSexos() {
    return this._http.get(this.urlSexos, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * lista grupos ocupacionales
   */
  public getGruposOcupacionales(codigoIeds) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (codigoIeds !== undefined && codigoIeds !== null) {
      queryParams.append('codigoIeds', codigoIeds);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    
    return this._http.get(this.urlGrupoOcupacional,  options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * listado de ubigeos
   */
  public getUbigeos(data) {
    let myparams = new URLSearchParams();
    if (data.codigoDepartamento != null) {
      myparams.append("codDepartamento", data.codigoDepartamento);
    }
    if (data.codigoProvincia != null) {
      myparams.append("codProvincia", data.codigoProvincia);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: myparams
    });
    return this._http.get(this.urlUbigeos, options)
      .map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * getAreas
   */
  public getAreas() {
    return this._http.get(this.urlAreas, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * obitene especialidades por area
   * @param idArea 
   */
  public getEspecialidadesXArea(idArea) {
    return this._http.get(this.urlAreas + "/" + idArea + "/" + this.urlEspecialidades, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getActividadesXEspecialidadesXArea(idArea, idEspecialidad) {

    return this._http.get(this.urlAreas + "/" + idArea + "/" + this.urlEspecialidades + "/" + idEspecialidad + "/" + this.urlActividades, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getParentescos() {
    return this._http.get(this.urlParentescos, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * obitene todos los grados de instrucciones
   */
  public getGradoInstruccion() {
    return this._http.get(this.urlGradoInstruccion, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
