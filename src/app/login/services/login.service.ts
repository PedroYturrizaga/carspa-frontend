import { Component, OnInit,Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Configuration } from "../../shared/configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginService extends BaseService{

  private username : string = 'sigs-frontend';
  private password : string = '123456789';
  // private ip : string = 'http://192.168.3.91:9090/';
  private ip : string = 'http://localhost:9090/';
  private URLCommons: string;

  constructor(private http:HttpClient, private _http:Http, private _configuration:Configuration) { 
    super();
    this.URLCommons = this._configuration.Server + 'commons';
  }
  
   _configutation : String = this.ip+'sic-oauth2-ws/oauth/token?';

   headers = new HttpHeaders().set("Authorization", "Basic " + btoa(this.username + ":" + this.password))
                              .set('Accept', 'application/json')
                              .set("Content-Type", "application/json");

  solicitarToken ( userDAO ){ 
    let body = 'grant_type=password&username='+userDAO.usuarioID+'&password='+userDAO.contrasena;
    return this.http.post(this._configutation+body,null,{headers : this.headers})
  }

  getIpress (){
    let opciones = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.URLCommons+"/ipress", opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));
  }

}
