import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../../shared/configuration/app.constants';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable()
export class SolicitudCotizacionService extends BaseService {

  private URLSolicitudCotizacion: string;
  private URLSolicitudProveedor: string;
  private URLMaterialordencompra: string;
  private URLCotizacionproveedor: string;
  private URLCotizacionproveedorDetalle: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLSolicitudCotizacion = this._configuration.Server + 'sigs-commons-ws/solicitudcotizacion';
    this.URLSolicitudProveedor = this._configuration.Server + 'sigs-commons-ws/solicitudcproveedor';
    this.URLMaterialordencompra = this._configuration.Server + 'sigs-commons-ws/materialordencompra';
    this.URLCotizacionproveedor = this._configuration.Server + 'sigs-commons-ws/cotizacionproveedor';
    this.URLCotizacionproveedorDetalle = this._configuration.Server + 'sigs-commons-ws/cotizacionproveedordetalle';
  }

  public getSolicitudesCabecera(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idSolicitudCotizacion != null) {
      queryParams.append('idSolicitudCotizacion', _params.idSolicitudCotizacion);
    }
    if (_params.codigo != null) {
      queryParams.append('codigo', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLSolicitudCotizacion + "/listarSolicitudCotizacion", options).map((res: Response) => res.json());
  }

  public getSolicitudesCabeceraProveedor(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idSolicitudCotizacion != null) {
      queryParams.append('idSolicitudCotizacion', _params.idSolicitudCotizacion);
    }
    if (_params.codigo != null) {
      queryParams.append('nombreProveedor', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLSolicitudProveedor + "/listarSolicitudProveedor", options).map((res: Response) => res.json());
  }

  public getSolicitudesProveedorDetalle(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idSolicitudProveedor != null) {
      queryParams.append('idSolicitudProveedor', _params.idSolicitudProveedor);
    }
    if (_params.codigo != null) {
      queryParams.append('nombreProveedor', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '100');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLMaterialordencompra + "/listarDetalleSolicitudProveedor", options).map((res: Response) => res.json());
  }

  postGenerarCotizacion(data: any) {
    return this._http.post(this.URLCotizacionproveedor + "/insertarCotizacionProveedor", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }


  public getCotizacionDetalle(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idSolicitudProveedor != null) {
      queryParams.append('idSolicitudProveedor', _params.idSolicitudProveedor);
    }
    if (_params.codigo != null) {
      queryParams.append('nombreProveedor', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '100');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLCotizacionproveedorDetalle + "/listarCotizacionProvedorDetalle", options).map((res: Response) => res.json());
  }

  postPreciosCotizacion(data: any) {
    return this._http.post(this.URLCotizacionproveedorDetalle + "/insertarPreciosCotizacionProveedorDetalle", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  postgenerarSolicitud(data: any) {
    return this._http.post(this.URLSolicitudCotizacion + "/insertarSolicitudCotizacion", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  getcomparativo(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idSolicitudCotizacion != null) {
      queryParams.append('idSolicitudCotizacion', _params.idSolicitudCotizacion);
    }
    if (_params.codigo != null) {
      queryParams.append('nombreProveedor', _params.codigo);
    }

    queryParams.append('nuPagina', _params.nuPagina ? _params.nuPagina : '1');
    queryParams.append('nuRegisMostrar', _params.nuRegisMostrar ? _params.nuRegisMostrar : '10');
    let options = new RequestOptions({
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLSolicitudProveedor + "/listarSolicitudProveedor", options).map((res: Response) => res.json());

  }
}
