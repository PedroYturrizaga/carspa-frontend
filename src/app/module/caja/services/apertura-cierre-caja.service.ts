import { CambiarValoresEncriptados } from './../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from "../../../shared/services/base.service"

@Injectable()
export class AperturaCierreCajaService extends BaseService {

  private headers = new Headers();
  // private header = new Headers();
  private URLAperturaCajas: string;
  // private urlListAperturaCierreCaja: string;
  // private urlListAperturarCaja: string;
  // private urlObtieneMontoFinal: string;
  // private urlCierreCajaFinal: string;
  // private urlImprimirReporte: string;

  constructor(public _http: Http, public _configuration: Configuration,  private _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.headers = super.obtenerHeaders();
    this.URLAperturaCajas = this._configuration.Server + "caja/aperturaCajas";
    // this.header.append("Content-Type", "application/json");
    // this.header.append("Accept", "application/json");
    // this.header.append("codUsuario", "farce@t-integro.com");
    // this.header.append("idIPRESS", "gONZnF9vN/bocT+JhfnMGw==");
    // this.header.append("token", "dasdas");
    // this.urlListAperturaCierreCaja = _configuration.Server + "caja/aperturaCajas/detalle";
    // this.urlListAperturarCaja = _configuration.Server + "caja/aperturaCajas";
    // this.urlObtieneMontoFinal = _configuration.Server + "caja/aperturaCajas/montoFinal?idAperturaCaja=";
    // this.urlCierreCajaFinal = _configuration.Server + "caja/aperturaCajas/cerrar";
    // this.urlImprimirReporte = _configuration.Server + "caja/aperturaCajas/detalle/impresion";
  }

  public obtenerProgramacionPorPersonal(_params) {
    console.log("-----------------");
    console.log("cgEy4f/jjvFVHK0PDT6cwA==");
    console.log(_params);

    console.log(this._cambiarValores.replace(_params));
    let queryParams = new URLSearchParams()
    if (_params != null) {
      queryParams.append("idPersonal", this._cambiarValores.replace(_params));
    }
    // queryParams.append("idPersonal", this._cambiarValores.replace("cgEy4f/jjvFVHK0PDT6cwA=="));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLAperturaCajas+'/obtenerProgramacionDelPersonal', options).map((res: Response) => res.json());

    // return this._http.get(this.URLAperturaCajas + "obtenerProgramacionDelPersonal", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerAperturaCajaPorPersonal(_params) {
    let queryParams = new URLSearchParams()
    console.log(this._cambiarValores.replace(_params));
    if (_params != null) {
      queryParams.append("idUsuario", this._cambiarValores.replace(_params));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log("Headerssssss")
    console.log(options);
    return this._http.get(this.URLAperturaCajas+'/obtenerAperturarCajaPorPersonal', options).map((res: Response) => res.json());

    // return this._http.get(this.URLAperturaCajas + "obtenerProgramacionDelPersonal", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public insertarAperturaCaja(data: any) {
    console.log(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    return this._http.post(this.URLAperturaCajas + '/aperturarCaja', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerMontoFinalAperturaCaja(_params){
    let queryParams = new URLSearchParams();
    queryParams.append("idAperturaCaja", _params);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAperturaCajas+'/obtenerMontoFinalAperturarCaja', options).map((res: Response) => res.json());
  }

  public actualizarCerrarAperturaCaja(data: any){
    console.log(data);
    return this._http.put(this.URLAperturaCajas + '/cerrarCaja', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }
public obtenerAperturaCajaPorId(_params){
  let queryParams=new URLSearchParams();
  queryParams.append("idApertura",_params);
  let options= new RequestOptions({
    headers:this.obtenerHeaders(),
    search:queryParams
  });

  console.log(options)
  return this._http.get(this.URLAperturaCajas+'/obtenerAperturarCajaPorId', options).map((res: Response) => res.json());

}


public confirmarCierreCaja(data: any){
  console.log(data);
  return this._http.put(this.URLAperturaCajas+'/confirmarCierreCaja',data,{headers:this.obtenerHeaders()}).map((res:Response)=> res.json());
  };
}

  // public obtenerAperturaCaja() {
  //   return this._hhtp.get(this.urlListAperturaCierreCaja, { headers: this.headers })
  //     .map(result => result.json())
  //     .catch((error: any) => Observable.throw(error.json.error || 'Server error'));
  // }

  // public insertarAperturaCaja(data) {
  //   return this._hhtp.post(this.urlListAperturarCaja, data, { headers: this.headers }).map((res: Response) => res.json());
  // }

  // public obtieneMontoFinalCaja(idAperturaCaja) {
  //   return this._hhtp.get(this.urlObtieneMontoFinal + idAperturaCaja, { headers: this.headers }).map((res: Response) => res.json());
  // }

  // public cierreCaja(data) {
  //   return this._hhtp.put(this.urlCierreCajaFinal, data, { headers: this.headers }).map((res: Response) => res.json());
  // }

  // public imprimirReporte(idAperturaCaja, tipoFile) {
  //   console.log(this.urlImprimirReporte + "?idAperturaCaja=" + idAperturaCaja + "&tipoFile=" + tipoFile);
  //   return this._hhtp.get(this.urlImprimirReporte + "?idAperturaCaja=" + idAperturaCaja + "&tipoFile=" + tipoFile, { headers: this.headers }).map((res: Response) => res.json());
  // }

