import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../shared/services/base.service';
import { Configuration } from '../../shared/configuration/app.constants';



@Injectable()
export class AdministrarProveedorService extends BaseService{

  private urlProveedor: string;
  constructor(public _http: Http, public _configuration: Configuration) 
  {
    super();
    this.urlProveedor = this._configuration.Server + "sigs-commons-ws/proveedor/";
   }

   public getProveedores (_params){
    let queryParams = new URLSearchParams();
    queryParams.append("idProveedor", _params.idProveedor);
    queryParams.append("nombreProveedor", _params.nombreProveedor);
    queryParams.append("nuPagina", _params.nuPagina);
    queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);

    let options = new RequestOptions({
      search: queryParams
    })

    return this._http.get(this.urlProveedor+"listarProveedores", options).map((res: Response) => res.json());
   }
   public anularMaquinaria(data: any)
    {
    return this._http.put(this.urlProveedor  + "eliminarProveedor", data).map((res: Response) => res.json());
  }
  public activarMaquinaria(data: any) {
    return this._http.put(this.urlProveedor  + "activarMaquinaria", data).map((res: Response) => res.json());
  }
  public updateMaquinaria(data: any) {
    return this._http.put(this.urlProveedor  + "actualizarProveedor", data).map((res: Response) => res.json());
  }
  public insertMaquinaria(data) {
    return this._http.post(this.urlProveedor  + "insertarProveedor", data).map((res: Response) => res.json());
  }
   public getUbicacion (){
    return this._http.get(this.urlProveedor+"listarUbicacion").map((res: Response) => res.json());

   }

}
