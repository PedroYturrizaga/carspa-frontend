import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class HistorialExamenesService extends BaseService {

  private headers = new Headers();
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public ObtenerHistorialOrdenesExamenesCita(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idTipoDocumentoIdentidad != null) {
      queryParams.append('idTipoDocumento', _params.idTipoDocumentoIdentidad);
    }
    if (_params.nuDocumento != null) {
      queryParams.append('numeroDocumento', _params.nuDocumento);
    }
    if (_params.idTipoExamen != null) {
      queryParams.append('idTipoExamen', _params.idTipoExamen);
    }
    if (_params.idTipoExamen != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.idTipoExamen != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/citas/historialCitaAuxiliar', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public SuspenderOrdenesExamenesCita(data) {
    return this._http.put(this.URLAdmision + '/citas/CitaAuxiliar', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
