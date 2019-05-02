import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../shared/services/base.service';
import { Configuration } from '../../shared/configuration/app.constants';
@Injectable()
export class AdministrarMaterialService  extends BaseService{


  private urlMaterial: string;
  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.urlMaterial = this._configuration.Server + "material/";
   }

   public getProveedores() {
    return this._http.get(this.urlMaterial+"listarProveedores").map((res: Response) => res.json());
}
   public getMateriales(_params): any{
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", _params.nombre);
    queryParams.append("estado", _params.estado);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    })
    return this._http.get(this.urlMaterial+"listarMateriales", options).map((res: Response) => res.json());
   }
   public anularMaterial(data: any): any  {
    return this._http.put(this.urlMaterial + "eliminarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());

  }
  public activarMaterial(data: any): any {
    return this._http.put(this.urlMaterial + "activarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public updateMaterial(data: any): any {
    return this._http.put(this.urlMaterial + "actualizarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
  public insertMaterial(data): any {
    return this._http.post(this.urlMaterial + "insertarMaterial", data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }


}
