import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados'

@Injectable()
export class ExamenesAuxiliaresService extends BaseService {

  private headers = new Headers();
  private URLAdmision: string;
  private URLCommons: string;

  constructor(
    public _http: Http,
    public _configuration: Configuration,
    private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public obtenerTiposDocumentos() {
    return this._http.get(this.URLCommons + '/tiposDocumentos', { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public obtenerOrdenExamen(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idTipoExamen != null) {
      queryParams.append('idTipoExamen', _params.idTipoExamen);
    }
    if (_params.idTipoDocumentoIdentidad != null) {
      queryParams.append('idTipoDocumentoIdentidad', _params.idTipoDocumentoIdentidad);
    }
    if (_params.nuDocumento != null) {
      queryParams.append('nuDocumento', _params.nuDocumento);
    }
    if (_params.idOrdenExamenCabecera != null) {
      queryParams.append('idOrdenExamenCabecera', _params.idOrdenExamenCabecera);
    }
    if (_params.idArea != null) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    } else {
      queryParams.append('nuPagina', '1');
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    } else {
      queryParams.append('nuRegisMostrar', '40');
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/ordenExamenes/cita', options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerPersonaDatos(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idActoMedico != null) {
      queryParams.append('idActoMedico', _params.idActoMedico);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLCommons + '/personas/datos/actoMedico', options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerProgramacion(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idArea != null) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.feDesde != null) {
      queryParams.append('feDesde', _params.feDesde);
    }
    if (_params.feHasta != null) {
      queryParams.append('feHasta', _params.feHasta);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    } else {
      queryParams.append('nuPagina', '1');
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    } else {
      queryParams.append('nuRegisMostrar', '40');
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/programaciones/imagenologia', options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerListadoProgramacion(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idProgramacion != null) {
      queryParams.append('idProgramacion', _params.idProgramacion);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/citas/detalleProgramacion', options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarCitasImagenologia(data) {
    return this._http.post(this.URLAdmision + '/citas/imagenologia', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerAmbientes(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.feDesde != null) {
      queryParams.append('feDesde', _params.feDesde);
    }
    if (_params.feHasta != null) {
      queryParams.append('feHasta', _params.feHasta);
    }
    if (_params.idArea != null) {
      queryParams.append('idArea', _params.idArea);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    } else {
      queryParams.append('nuPagina', '1');
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    } else {
      queryParams.append('nuRegisMostrar', '40');
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/ambientes/HorarioLaboratorio', options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarCitasLaboratorio(data) {
    return this._http.post(this.URLAdmision, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
