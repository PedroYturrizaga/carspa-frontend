import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../../shared/services/base.service';

@Injectable()
export class GestionarProveedorService extends BaseService {
  private headers = new Headers();
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }
}
