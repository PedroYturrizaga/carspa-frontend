import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
@Injectable()
export class PersonalService extends BaseService {
  /*control acces headers*/
  private headers = new Headers();
  /*variables url*/
  private urlAdmision: string;
  private urlPersonales: string;
  private urlCondicionPersonal: string;
  private urlTipoProfesional: string;
  private urlAreasGrupoOcupacional: string;
  private urlEspecialidad: string;
  private urlActividad: string;
  private urlActividadesPersonal: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    /*asignacion de url para comumir servicios */
    this.urlAdmision = this._configuration.Server + "admision/";

    /*=============*/
    this.urlPersonales = this.urlAdmision + "personales";
    this.urlCondicionPersonal = this.urlAdmision + "condicionPersonal";
    this.urlTipoProfesional = this.urlAdmision + "tipoProfesional";
    this.urlAreasGrupoOcupacional = this.urlAdmision + "areas";
    this.urlEspecialidad = this.urlAdmision + "especialidades";
    this.urlActividad = this.urlAdmision + "actividades";
    this.urlActividadesPersonal = this.urlAdmision + "actividadesPersonal";
  }
  /**
   * lista personal 
   * @param data retorna un array de parametros para los header
   */
  public getAllPersonal(data: any[]) {
    let paramPersonal = new URLSearchParams();
    for (let key in data) {
      if (data[key].numeroDocumento != null) {
        paramPersonal.set("numeroDocumento", data[key].numeroDocumento);
      }
      if (data[key].apellidoPaternoPersonal != null) {
        paramPersonal.set("apellidoPaternoPersonal", data[key].apellidoPaternoPersonal);
      }
      if (data[key].apellidoMaternoPersonal != null) {
        paramPersonal.set("apellidoMaternoPersonal", data[key].apellidoMaternoPersonal);
      }
      if (data[key].nombrePersonal != null) {
        paramPersonal.set("nombrePersonal", data[key].nombrePersonal);
      }
      if (data[key].idPersonal != null) {
        paramPersonal.set("idPersonal", data[key].idPersonal);
      }
      if (data[key].numPagina != null) {
        paramPersonal.set("numPagina", data[key].numPagina);
      }
      if (data[key].numRegistroMostrar != null) {
        paramPersonal.set("numRegistroMostrar", data[key].numRegistroMostrar);
      }
      if (data[key].numeroCmp != null) {
        paramPersonal.set("numeroCmp", data[key].numeroCmp);
      }
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramPersonal
    });
    console.log(options);

    return this._http.get(this.urlPersonales, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * 
   * @param idPersonal para obtener por id de personal
   */
  public getPersonalId(idPersonal: string) {
    return this._http.get(this.urlPersonales + "/" + idPersonal, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Agregar personal
   * @param data json para el request de insertar
   */
  public agregarPersonal(data: any) {
    return this._http.post(this.urlPersonales, data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public actualizarPersonal(data: any) {
    return this._http.put(this.urlPersonales, data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public eliminarPersonal(idPersonal: string) {
    return this._http.delete(this.urlPersonales + "/" + idPersonal, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * obtiene condicion personal
   */
  public getCondicionPersonal() {
    return this._http.get(this.urlCondicionPersonal, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * listar tipo profesional
   */
  public getTipoProfesional() {
    return this._http.get(this.urlTipoProfesional, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * getAreasGrupoOcupacional
   */
  public getAreasGrupoOcupacional(idGrupoOcupacional) {
    let paramArea = new URLSearchParams();
    paramArea.set("idGrupoOcupacional", idGrupoOcupacional);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramArea
    });
    return this._http.get(this.urlAreasGrupoOcupacional, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * listadi de especialidades por area
   */
  public getEspecialidadesXArea(idGrupoOcupacional, idArea) {
    let paramEspecialidad = new URLSearchParams();
    paramEspecialidad.set("idGrupoOcupacional", idGrupoOcupacional);
    paramEspecialidad.set("idArea", idArea);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramEspecialidad
    });
    return this._http.get(this.urlEspecialidad + '/especialidadesArea', options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * listado de actividad 
   * @param idGrupoOcupacional 
   * @param idArea 
   * @param idEspecialidad 
   */
  public getActividadXEspecialidadXArea(idGrupoOcupacional, idArea, idEspecialidad) {
    let paramActividad = new URLSearchParams();
    paramActividad.set("idGrupoOcupacional", idGrupoOcupacional);
    paramActividad.set("idArea", idArea);
    paramActividad.set("idEspecialidad", idEspecialidad);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramActividad
    });
    return this._http.get(this.urlActividad, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * agregarActividadPersonal
   */
  public agregarActividadPersonal(data) {
    return this._http.post(this.urlActividadesPersonal, data, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * eliminarActividadPersonal
   */
  public eliminarActividadPersonal(data) {
    let paramActPersonal = new URLSearchParams();
    let idPersonal: string = data.idPersonal;

    paramActPersonal.set("idActividad", data.idActividad);
    paramActPersonal.set("idArea", data.idArea);
    paramActPersonal.set("idEspecialidad", data.idEspecialidad);
    paramActPersonal.set("idGrupoOcupacional", data.idGrupoOcupacional);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: paramActPersonal
    });
    return this._http.delete(this.urlActividadesPersonal + "/" + idPersonal, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * getActividadPersonal
   */
  public getActividadPersonal(idPersonal) {
    return this._http.get(this.urlActividadesPersonal + "/" + idPersonal, { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  public getPdfDocument(idPersonal, tipoDoc) {
    console.log(this.urlPersonales + "/" + idPersonal+"/reporte?tipoFile="+tipoDoc);

    return this._http.get(this.urlPersonales + "/" + idPersonal + "/reporte?tipoFile=" + tipoDoc, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  //Actualizar Estado del Personal
  public actualizarEstadoPersonal(data: any) {
    console.log(data); 
    return this._http.put(this.urlPersonales + "/actualizarEstado", data,  { headers: this.obtenerHeaders(), }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    public validarDocumentoIdentidad(Params){
 
    let queryParams: URLSearchParams = new URLSearchParams();

    if(Params.idPersonal !== undefined && Params.idPersonal !== null){
     queryParams.append('idPersonal', Params.idPersonal);
   }
 
  let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
  });
    return this._http.get(this.urlPersonales + '/validarDocumentoIdentidad', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
 }

}
