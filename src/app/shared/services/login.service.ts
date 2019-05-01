import { Component, OnInit,Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Configuration } from "../configuration/app.constants";
import { query } from '@angular/animations/src/animation_metadata';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginService {

  constructor(public http :HttpClient) { 
  }
 

   username : string = 'sigs-frontend';
   password : string = '123456789';
  //  _configutation : String = 'http://192.168.3.91:9090/sic-oauth2-ws/oauth/token?';
   _configutation : String = 'http://localhost:9090/sic-oauth2-ws/oauth/token?';

   headers = new HttpHeaders().set("Authorization", "Basic " + btoa(this.username + ":" + this.password))
                              .set('Accept', 'application/json')
                              .set("Content-Type", "application/json");

 solicitarToken ( userDAO ){ 
 let body = 'grant_type=password&username='+userDAO.usuarioID+'&password='+userDAO.contrasena;
 console.log(this._configutation+body);
 console.log(this.headers);
 
 
 return this.http.post(this._configutation+body,null,{headers : this.headers})
}

}
