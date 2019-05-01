import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class AreaEspeActiGrupOcupService extends BaseService {


  private urlasagro = "";
  private headers = new Headers();
  private urlAreas: string;
  private urlEspecialidadxAreas: string;
  private urlActividadesxEspecialidades: string;
  private urlListarAreaEspAct: string;
  private urlListarAreaEspActGrup: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.urlEspecialidadxAreas = _configuration.Server + 'obtenerAreaXEspecialidad';
    // areas/obtenerEspecialidades
    this.urlActividadesxEspecialidades = _configuration.Server + 'listar-AreaEspAct';
    this.URLCommons = _configuration.Server + 'commons';
    this.urlListarAreaEspActGrup = _configuration.Server + 'sgruposOcupacionales/';
  }

  insertAreaEspActGrpOcp(data) {
    console.log("esta es la data");
    console.log(data);
    return this._http.post(this.URLCommons + '/areaEspecialidadActividadGrupoOcupacional/insertar_Area_Actividad_Especialidad_GrupoOcupacional', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());

  }

  public eliminarAreaEspActGrpOcp(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idArea !== undefined) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.idEspecialidad !== undefined) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.idActividad !== undefined) {
      queryParams.append('idActividad', _params.idActividad);
    }
    if (_params.idGrupoOcupacional !== undefined) {
      queryParams.append('idGrupoOcupacional', _params.idGrupoOcupacional);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLCommons + '/areaEspecialidadActividadGrupoOcupacional/eliminar_Area_Actividad_Especialidad_GrupoOcupacional', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

    // return this._http.delete(`${this.urlasagro}` + "eliminar_Area_Actividad_Especialidad_GrupoOcupacional", { headers: this.obtenerHeaders(), params: { 'idArea': `${_params.idArea}`, 'idEspecialidad': `${_params.idEspecialidad}`, 'idActividad': `${_params.idActividad}`, 'idGrupoOcupacional': `${_params.idGrupoOcupacional}`}})
    // .map(result => result.json())
    // .catch((error: any) => Observable.throw(error.json().error));

  }

  public obtenerAreaXEspecialidadXActividadXGrupoOcupacional(_params) {
    // console.log("----------------------------------------------");
    // console.log(_params);
    // console.log("----------------------------------------------");

    let queryParams = new URLSearchParams();
    if (_params.idArea != null) {
      queryParams.append("idArea", _params.idArea);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    if (_params.idActividad != null) {
      queryParams.append("idActividad", _params.idActividad);
    }
    if (_params.idGrupoOcupacional != null) {
      queryParams.append("idGrupoOcupacional", _params.idGrupoOcupacional);
    }
    if (_params.nuPagina != null) {
      queryParams.append("nuPagina", _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLCommons + "/areaEspecialidadActividadGrupoOcupacional/obtenerAreaXEspecialidadXActividadXGrupoOcupacional", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  //localhost:9090/sigs-commons-ws/areaEspecialidadActividadGrupoOcupacional/obtenerAreaXEspecialidadXActividadXGrupoOcupacional?nuPagina=1&nuRegisMostrar=100
  //localhost:9090/sigs-commons-ws/areaEspecialidadActividadGrupoOcupacional/obtenerAreaXEspecialidadXActividadXGrupoOcupacional?nuPagina=1&nuRegisMostrar=10

  public obtenerAreas() {
    let queryParams = new URLSearchParams();
    queryParams.append("numPagina", "1");
    queryParams.append("numRegisMostrar", "1000");
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCommons + '/areas/obtenerAreas', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


  public getEspecialidadesxArea(_params: any) {


    let queryParams = new URLSearchParams();
    if (_params.idArea != undefined) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    if (_params.nuPagina != undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLCommons + "/areaEspecialidad/obtenerAreaXEspecialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAreaEspAct(_params: any) {
    let queryParams = new URLSearchParams();
    if (_params.idArea !== undefined) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.idEspecialidad !== undefined) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.idActividad !== undefined) {
      queryParams.append('idActividad', _params.idActividad);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCommons + '/areaEspecialidadActividad/obtenerAreaEspecialidadActividad', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAreaEspActGrup(_params: any) {
    let queryParams = new URLSearchParams();
    // if (_params.idArea != null) {
    //   queryParams.append('idArea', _params.idArea);
    // }
    // if (_params.idEspecialidad != null) {
    //   queryParams.append('idEspecialidad', _params.idEspecialidad);
    // }
    // if (_params.idActividad != null) {
    //   queryParams.append('idActividad', _params.idActividad);
    // }
    if (_params.idGrupoOcupacional != null) {
      queryParams.append('idGrupoOcupacional', _params.idGrupoOcupacional);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', '1');
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', '10000');
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCommons + '/gruposOcupacionales/ObtenerGrupoOcupacional', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


}
