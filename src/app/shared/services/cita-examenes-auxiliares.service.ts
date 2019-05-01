import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../shared/configuration/app.constants';
import { BaseService } from '../../shared/services/base.service';
import 'rxjs/add/operator/map';
import { log } from 'util';

@Injectable()
export class CitaExamenesAuxiliaresService extends BaseService {

  private URLTipoDocumento: string;
  private URLOrdenExamen: string;
  private URLObtienePersonaDatos: string;
  private URLObteneAmbiente: string;
  private URLInsertaCitasLaboratorio: string;
  private URLObtenerProgramacionImagenologia: string;
  private URLObtenerListadoProgramacion: string;
  private URLInsertaCitasImagenologia: string;
  private URLObtenerHistorialOrdenesExamenesCita: string;
  private URLSuspenderOrdenesExamenesCita: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLTipoDocumento = this._configuration.Server + 'commons/tiposDocumentos';
    this.URLOrdenExamen = this._configuration.Server + 'admision/ordenExamenes/cita';
    this.URLObtienePersonaDatos = this._configuration.Server + 'commons/personas/datos/actoMedico';
    this.URLObteneAmbiente = this._configuration.Server + 'admision/ambientes/HorarioLaboratorio';
    this.URLInsertaCitasLaboratorio = this._configuration.Server + 'admision';
    this.URLObtenerProgramacionImagenologia = this._configuration.Server + '/admision/programaciones/imagenologia';
    this.URLObtenerListadoProgramacion = this._configuration.Server + '/admision/citas/detalleProgramacion';
    this.URLInsertaCitasImagenologia = this._configuration.Server + 'admision';
    this.URLObtenerHistorialOrdenesExamenesCita = this._configuration.Server + 'admision/citas/historialCitaAuxiliar';
    this.URLSuspenderOrdenesExamenesCita = this._configuration.Server + 'admision/citas/CitaAuxiliar';
  }

  public obtenerTiposDocumentos() {
    return this._http.get(this.URLTipoDocumento, { headers: this.obtenerHeaders() }).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
    return this._http.get(this.URLOrdenExamen, options)
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

    return this._http.get(this.URLObtienePersonaDatos, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
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
    return this._http.get(this.URLObteneAmbiente, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarCitasLaboratorio(data) {
    return this._http.post(this.URLInsertaCitasLaboratorio + '/citas/laboratorio', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
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
    return this._http.get(this.URLObtenerProgramacionImagenologia, options)
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
    // console.log(options);
    return this._http.get(this.URLObtenerListadoProgramacion, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarCitasImagenologia(data) {
    // console.log(data);
    return this._http.post(this.URLInsertaCitasImagenologia + '/citas/imagenologia', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
}
