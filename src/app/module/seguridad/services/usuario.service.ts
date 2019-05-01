import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class UsuarioService extends BaseService{


  private headers = new Headers();
  private urlUsuario: string;
  private urlTipoDocumento: string;
  private urlPersonal: string;
  private urlRol:string;
  private urlUsuarioConRoles: string;
  private urlRolPorUsuario:string;
  private urlUsuarioSeleccionado: string;
  private urlUsuarioActualizado: string;
  private urlUsuarioEliminado:string;
  private urlgetConfirmarPutValidar:string;
  private urlgetRolGrupoOcupacional:string;
  private urlgetAcargoUsuario:string;
  private urlpostAcargoUsuario:string;
  private urldeleteAcargoUsuario:string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();

    this.urlUsuario = _configuration.Server + "seguridad/usuarios";
    this.urlTipoDocumento = _configuration.Server + "commons/tiposDocumentos";
    this.urlPersonal= _configuration.Server + "seguridad/usuarios/personales";

    this.urlRol= _configuration.Server + "seguridad/roles";
    this.urlUsuarioConRoles= _configuration.Server + "seguridad/usuarios/usuarios";
    this.urlRolPorUsuario= _configuration.Server +"seguridad/usuarios/rol";
    this.urlUsuarioSeleccionado= _configuration.Server + "seguridad/usuarios/usuarios";
    this.urlUsuarioActualizado= _configuration.Server + "seguridad/usuarios/usuarios";
    this.urlUsuarioEliminado= _configuration.Server + "seguridad/usuarios/usuarios";
    this.urlgetConfirmarPutValidar = _configuration.Server + "seguridad/usuarios/actualizaValidaUsuarioContrasena";
    this.urlgetRolGrupoOcupacional = _configuration.Server + "seguridad/roles/byGrupoOcupacinal";
    this.urlgetAcargoUsuario = _configuration.Server + "seguridad/usuarios/acargo";
    this.urlpostAcargoUsuario = _configuration.Server + "seguridad/usuarios/acargoUsuario";
    this.urldeleteAcargoUsuario = _configuration.Server + "seguridad/usuarios/acargoUsuario";
 
   }

  public getAllUsuarios(usuario) {
    let queryParams: URLSearchParams = new URLSearchParams();
      if (usuario.idTipoDocumento != null) {
        queryParams.append('idTipoDocumento', usuario.idTipoDocumento);
      }
      if (usuario.numeroDocumentoIdentidad != null &&  usuario.numeroDocumentoIdentidad.trim() != "" && usuario.numeroDocumentoIdentidad != undefined) {
        queryParams.append('numeroDocumentoIdentidad', usuario.numeroDocumentoIdentidad);
      }
      if (usuario.apellidoPaternoPersonal != null &&  usuario.apellidoPaternoPersonal.trim() != "" && usuario.apellidoPaternoPersonal != undefined) {
        queryParams.append('apellidoPaternoPersonal', usuario.apellidoPaternoPersonal);
      }
      if (usuario.apellidoMaternoPersonal != null &&  usuario.apellidoMaternoPersonal.trim() != "" && usuario.apellidoMaternoPersonal != undefined) {
        queryParams.append('apellidoMaternoPersonal', usuario.apellidoMaternoPersonal);
      }
      if (usuario.nombrePersonal != null &&  usuario.nombrePersonal.trim() != "" && usuario.nombrePersonal != undefined) {
        queryParams.append('nombrePersonal', usuario.nombrePersonal);
      }
      if (usuario.nuPagina != null) { 
        queryParams.append('nuPagina', usuario.nuPagina);
      }
      if (usuario.nuRegisMostrar != null) {
        queryParams.append('nuRegisMostrar', usuario.nuRegisMostrar);
      }

      let options = new RequestOptions({
        headers: this.obtenerHeaders(),
        search: queryParams
      });
      
    return this._http.get(this.urlUsuario,options).map((res: Response) => res.json());
    
  }
  public getTipoDocumento(){
    let options = new RequestOptions({
        headers: this.obtenerHeaders()
      });
    return this._http.get(this.urlTipoDocumento, options).map((res: Response)=> res.json());
  }

  public getPersonalesByUsuario(personal){
    let queryParams: URLSearchParams = new URLSearchParams();
      if (personal.idPersonal != null) {
        queryParams.append('idPersonal', personal.idPersonal);
      }    
      if (personal.tipoDocumentoIdentidad != null) {
        queryParams.append('tipoDocumentoIdentidad', personal.tipoDocumentoIdentidad);
      }
      if (personal.numeroDocumentoIdentidad != null &&  personal.numeroDocumentoIdentidad.trim() != "" && personal.numeroDocumentoIdentidad != undefined) {
        queryParams.append('numeroDocumentoIdentidad', personal.numeroDocumentoIdentidad);
      }
      if (personal.apellidoPaternoPersonal != null &&  personal.apellidoPaternoPersonal.trim() != "" && personal.apellidoPaternoPersonal != undefined) {
        queryParams.append('apellidoPaternoPersonal', personal.apellidoPaternoPersonal);
      }
      if (personal.apellidoMaternoPersonal != null &&  personal.apellidoMaternoPersonal.trim() != "" && personal.apellidoMaternoPersonal != undefined) {
        queryParams.append('apellidoMaternoPersonal', personal.apellidoMaternoPersonal);
      }
      if (personal.nombre != null &&  personal.nombre.trim() != "" && personal.nombre != undefined) {
        queryParams.append('nombrePersonal', personal.nombre);
      }
      if (personal.nuPagina != null) { 
        queryParams.append('nuPagina', personal.nuPagina);
      }
      if (personal.nuRegisMostrar != null) {
        queryParams.append('nuRegisMostrar', personal.nuRegisMostrar);
      }
      if (personal.flOperacion != null) {
        queryParams.append('flOperacion', personal.flOperacion);
      }
      
      let options = new RequestOptions({
        headers: this.obtenerHeaders(),
        search: queryParams
      });
    return this._http.get(this.urlPersonal, options).map((res: Response)=> res.json());
  }

  public getAllPersonal(personal){
    return this._http.get(this.urlPersonal+"?tipoDocumentoIdentidad="+personal.tipoDocumentoIdentidad+"&numeroDocumentoIdentidad="+personal.numeroDocumentoIdentidad, {headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getRolGrupoOcupacional(idPersonal){
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if (idPersonal != null) {
        queryParams.append('idPersonal',idPersonal);
      }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });  
    return this._http.get(this.urlgetRolGrupoOcupacional,options).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getAcargoUsuario(idUsuario,paginado){
    let queryParams: URLSearchParams = new URLSearchParams();
    
    if (idUsuario != null && idUsuario.trim() !="" && idUsuario != undefined) {
        queryParams.append('idUsuario',idUsuario);
      }
    if (paginado.nuPagina != null && paginado.nuPagina != undefined) {
        queryParams.append('nuPagina',paginado.nuPagina);
      }
    if (paginado.nuRegisMostrar != null && paginado.nuRegisMostrar != undefined) {
        queryParams.append('nuRegisMostrar',paginado.nuRegisMostrar);
      }    

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });  
    return this._http.get(this.urlgetAcargoUsuario,options).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getValidacionPutContraseña(data){
    return this._http.put(this.urlgetConfirmarPutValidar, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getAllRoles(){
    return this._http.get(this.urlRol, {headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public insertarAcargoUsuario(data){
    return this._http.post(this.urlpostAcargoUsuario, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  
  public eliminarAcargoUsuario(data){
     let queryParams: URLSearchParams = new URLSearchParams();
      if (data.idUsuario != null) {
        queryParams.append('idUsuario', data.idUsuario);
      }    
      if (data.idRol != null) {
        queryParams.append('idRol', data.idRol);
      }
      if (data.idArea != null) {
        queryParams.append('idArea', data.idArea);
      }
      if (data.idEspecialidad != null) {
        queryParams.append('idEspecialidad', data.idEspecialidad);
      }
      if (data.idAmbiente != null) {
        queryParams.append('idAmbiente', data.idAmbiente);
      }
      
      let options = new RequestOptions({
        headers: this.obtenerHeaders(),
        search: queryParams
      });
    return this._http.delete(this.urldeleteAcargoUsuario, options).map((res: Response) => res.json());
  }

  public addUsuarioConRoles(data){
    return this._http.post(this.urlUsuarioConRoles,data,{headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getRolPorUsuario(idUsuario){ 
    return this._http.get(this.urlRolPorUsuario+"?idUsuario="+idUsuario,{headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getUsuarioSeleccionado(idUsuario){
     return this._http.get(this.urlUsuarioSeleccionado+"?idUsuario="+idUsuario ,{headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  public updateUsuario(data){
     return this._http.put(this.urlUsuarioActualizado,data,{headers: this.headers}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  
  public deleteUsuario(id:number){
    console.log(this.obtenerHeaders(),id);
    
    return this._http.delete(this.urlUsuarioEliminado+"?idUsuario="+id ,{headers: this.obtenerHeaders()}).map((res: Response)=> res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
