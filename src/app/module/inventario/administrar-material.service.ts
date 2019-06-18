import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../shared/services/base.service';
import { Configuration } from '../../shared/configuration/app.constants';
@Injectable()
export class AdministrarMaterialService extends BaseService {


  private urlMaterial: string;
  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.urlMaterial = this._configuration.Server + "sigs-commons-ws/material/";
  }

  public getProveedores() {
    return this._http.get(this.urlMaterial + "listarProveedores").map((res: Response) => res.json());
  }
  public getMateriales(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    queryParams.append("estado", _params.estado);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      search: queryParams
    })
    return this._http.get(this.urlMaterial + "listarMateriales", options).map((res: Response) => res.json());
  }
  public anularMaterial(data: any) {
    return this._http.put(this.urlMaterial + "eliminarMaterial", data).map((res: Response) => res.json());

  }
  public activarMaterial(data: any) {
    return this._http.put(this.urlMaterial + "activarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public updateMaterial(data: any) {
    return this._http.put(this.urlMaterial + "actualizarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public insertMaterial(data) {
    return this._http.post(this.urlMaterial + "insertarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public getMaterialesAlerta(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    queryParams.append("idAlerta1", _params.idAlerta1);
    queryParams.append("idAlerta2", _params.idAlerta2);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      search: queryParams
    })
    return this._http.get(this.urlMaterial + "listarMaterialesAlertas", options).map((res: Response) => res.json());
  }
  public ordenPedido(data) {
    return this._http.post(this.urlMaterial + "ordenPedido", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public getMaterialesAlertaReporte(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    queryParams.append("idAlerta1", _params.idAlerta1);
    queryParams.append("idAlerta2", _params.idAlerta2);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      search: queryParams
    })
    return this._http.get(this.urlMaterial + "listarMaterialesAlertasReporte", options).map((res: Response) => res.json());
  }
  public getMaterialesCombo(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    let options = new RequestOptions({
      search: queryParams
    })
    return this._http.get(this.urlMaterial + "comboMaterial", options).map((res: Response) => res.json());
  }
    public getMaterialMes(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idMaterial", _params.idMaterial);
    queryParams.append("tipoFile", _params.tipoFile);
    let options = new RequestOptions({
      search: queryParams
    })
    return this._http.get(this.urlMaterial + "listarMaterialesMes", options).map((res: Response) => res.json());
  }

}
