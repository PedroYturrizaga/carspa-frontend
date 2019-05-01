import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from "../../shared/configuration/app.constants";
import { BaseService } from '../../shared/services/base.service';
import { getCodUsuario} from "../../shared/auth/storage/cabecera.storage";

@Injectable()
export class MenuPrincipalService extends BaseService {

  private URLSeguridad: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLSeguridad = this._configuration.Server + 'seguridad';
  }

  public getMenuByCodUsuario(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.codigoUsuario !== undefined && _params.codigoUsuario !== null) {
      queryParams.append('codigoUsuario', _params.codigoUsuario);
    } else {
      queryParams.append('codigoUsuario', this.obtenerHeaders().get('codUsuario'));
    }
    if (_params.flagMaestro !== undefined && _params.flagMaestro !== null) {
      queryParams.append('flagMaestro', _params.flagMaestro);
    } else {
      queryParams.append('flagMaestro', '1000');
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLSeguridad + '/menu', options)
      .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public updatePassword(_params) {
    _params.codUsuario = getCodUsuario();
    // let queryParams: URLSearchParams = new URLSearchParams();
    // queryParams.append('pOldPassword', _params.pOldPassword);
    // queryParams.append('pNewPassword', _params.pNewPassword);
    // queryParams.append('codUsuario', getCodUsuario());
    // let options = new RequestOptions({
    // //  W2 headers: this.obtenerHeaders(),
    //   search: queryParams
    // });

    return this._http.put(this.URLSeguridad + '/usuarios/updatePasswordInLogin', _params,{headers: this.obtenerHeaders()}).map((res: Response) => res.json());

    // return this._http.put(this.URLSeguridad + '/usuarios/updatePasswordInLogin', options)
    //   .map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
