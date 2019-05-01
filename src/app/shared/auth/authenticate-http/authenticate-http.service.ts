import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import * as TokenStorage from '../storage/token.storage';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AuthenticateHttpService extends Http {

  constructor(_backend: XHRBackend, _defaultOptions: RequestOptions, private _router: Router, private toastr: ToastsManager) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((res: Response) => {
      if ((res.status === 401 || res.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
        console.log('La sesión de autentificación expiró o el usuario no está autorizado. Por favor asegúrese de tener los permisos correctos.');
        //console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
        this.toastr.warning("Sesion Expirada","La sesión se cerró");
        TokenStorage.removeSession();

        this._router.navigate(['/login']);
      }
      return Observable.throw(res);
    });
  }
}
