import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';
import 'rxjs/add/operator/map';

import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados'

@Injectable()
export class CitaExamenesAuxiliaresService extends BaseService {
  private URLExamenesAnteriores: string;
  private URLExamenTipos: string;
  private URLExamenAreas: string;
  private URLCPTExamenes: string;
  private URLOrdenExamenes: string;
  private URLImpresion: string;
  private URLActulizarOrdenExamenDetalle: string;
  private URLOrdenExamenesActoMedico: string;
  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();
    //this.URLExamenesAnteriores = this._configuration.Server + 'admision/ordenExamenDetalle';
    this.URLExamenesAnteriores = this._configuration.Server + 'admision/ordenExamenes/anterior';
    this.URLExamenTipos = this._configuration.Server + "commons/examenTipos";
    this.URLExamenAreas = this._configuration.Server + "commons/examenAreas";
    this.URLCPTExamenes = this._configuration.Server + "admision/cptExamenes";
    this.URLOrdenExamenes = this._configuration.Server + "admision/ordenExamenes";
    this.URLImpresion = this._configuration.Server + "admision/ordenExamenes/impresion";
    this.URLActulizarOrdenExamenDetalle = this._configuration.Server + "admision/ordenExamenes/OrdenExamenDetalle";
    this.URLOrdenExamenesActoMedico = this._configuration.Server + 'admision/ordenExamenes/actoMedico';
  }

  public obtenerExamenesAnteriores(_params: any) {
    /* Query params */
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona != null) {
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));
    }
    if (_params.idTipoExamen != null) {
      queryParams.append('idTipoExamen', _params.idTipoExamen);
    }
    if (_params.estadoExamen != null) {
      queryParams.append('estadoExamen', _params.estadoExamen);
    }
    if (_params.idTipoDocumentoIdentidad != null) {
      queryParams.append('idTipoDocumentoIdentidad', this._cambiarValores.replace(_params.idTipoDocumentoIdentidad));
    }
    if (_params.numeroDocumentoIdentidad != null) {
      queryParams.append('numeroDocumentoIdentidad', _params.numeroDocumentoIdentidad); 
    }
    if (_params.idOrdenExamenCabecera != null) {
      queryParams.append('idOrdenExamenCabecera', _params.idOrdenExamenCabecera);
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
      queryParams.append('nuRegisMostrar', '5');
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLExamenesAnteriores, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }



  public obtenerExamenTipos(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();


    if (_params.idExamenTipo != null) {
      queryParams.append('idExamenTipo', _params.idExamenTipo);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLExamenTipos, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));

  }

  public obtenerExamenAreas(idExamenTipo: number) {
    return this._http.get(this.URLExamenAreas + "/?idExamenTipo=" + idExamenTipo, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());

  }

  public obtenerCPTExamenes(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idExamenTipo != null) {
      queryParams.append('idExamenTipo', _params.idExamenTipo);
    }
    if (_params.idExamenArea != null) {
      queryParams.append('idExamenArea', _params.idExamenArea);
    }
    if (_params.codigoCpt != null) {
      queryParams.append('codigoCpt', _params.codigoCpt);
    }
    if (_params.descripcionCpt != null) {
      queryParams.append('descripcionCpt', _params.descripcionCpt);

    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    // console.log(options);
    return this._http.get(this.URLCPTExamenes, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarOrdenExamenes(_params: any) {
    // console.log(_params);
    return this._http.post(this.URLOrdenExamenes, _params, { headers: this.obtenerHeaders() })
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }



  public obtenerOrdenExamenes(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idExamenTipo != null) {
      queryParams.append('idExamenTipo', _params.idExamenTipo);
    }
    if (_params.idActoMedico != null) {
      queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedico));
    }
    if (_params.idAtencion != null) {
      queryParams.append('idAtencion', this._cambiarValores.replace(_params.idAtencion));
    }
    
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLOrdenExamenesActoMedico, options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }


  public eliminarOrdenExamenes(idOrdenExamenDetalle: number) {
    return this._http.delete(this.URLOrdenExamenes + "?idOrdenExamenDetalle=" + idOrdenExamenDetalle, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerImpresionExamenes(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idAtencion != null) {
      queryParams.append('idAtencionEncriptado', this._cambiarValores.replace(_params.idAtencion));
    }
    if (_params.idActoMedico != null) {
      queryParams.append('idActoMedicoEncriptado', this._cambiarValores.replace(_params.idActoMedico));
    }
    if (_params.idExamenTipo != null) {
      queryParams.append('idExamenTipo', _params.idExamenTipo);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    } else {
      queryParams.append('tipoFile', '2');
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLImpresion, options)
      .map(result => result.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public ActulizarOrdenExamenDetalle(data) {
    return this._http.put(this.URLActulizarOrdenExamenDetalle, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
}
