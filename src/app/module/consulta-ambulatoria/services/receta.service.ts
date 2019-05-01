import { CambiarValoresEncriptados } from './../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class RecetaService extends BaseService {

  private headers = new Headers();
  private URLAdmision: string;
  private URLFarmacia: string;
  constructor(public _http: Http, public _configuration: Configuration, public _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLFarmacia = this._configuration.Server + "farmacia";
    this.URLAdmision = this._configuration.Server + "admision";
  }

  public getAlmacenes(idOrigen: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idOrigen !== undefined) {
      queryParams.append('idOrigen', idOrigen);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLFarmacia + '/almacenes', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAntecedentes(idPersona: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idPersona !== undefined) {
      queryParams.append('idPersona', idPersona);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/antecedente/paciente', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDiagnosticos(idActoMedico: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idActoMedico !== undefined) {
      queryParams.append('idActoMedico', idActoMedico);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/diagnosticos/actoMedico', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDiagnosticosxPersona(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined) {
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + '/diagnosticos/DiagnosticoxPersona', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicamentosxPersona(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined) {
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.idPersona !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + '/recetas/Cabecera-DetallexPersona', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetalleRecetaCabezera(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idActoMedico != null || _params.idActoMedico != undefined) {
      queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedico));
    }
    if (_params.idAtencion != null || _params.idAtencion != undefined) {
      queryParams.append('idAtencion', this._cambiarValores.replace(_params.idAtencion));
    }
    if (_params.impresion !== undefined) {
      queryParams.append('impresion', _params.impresion);
    }
    if (_params.tipoFile !== undefined) {
      queryParams.append('tipoFile', _params.tipoFile);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);
    return this._http.get(this.URLAdmision + "/recetas", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public addCabeceraReceta(data: any) {
    let dataAux: any;
    dataAux = data;
    if (dataAux.recetaCabecera.recetaDetalleList[0].medicamento.idMedicamento != null) {
      dataAux.recetaCabecera.recetaDetalleList[0].dispMedicoProdSanitario = null;
    } else {
      if (dataAux.recetaCabecera.recetaDetalleList[0].dispMedicoProdSanitario.idDispMedicoProdSanitario != null) {
        dataAux.recetaCabecera.recetaDetalleList[0].medicamento = null;
      }
    }
    return this._http.post(this.URLAdmision + "/recetas", dataAux, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public getMedicamentos(data?: any[]) {
    let parametros = new URLSearchParams();
    for (let key in data) {
      if (data[key].idAlmacen != null) {
        parametros.append("idAlmacen", data[key].idAlmacen);
      }
      if (data[key].cum != null) {
        parametros.append("cum", data[key].cum);
      }
      if (data[key].descripcionMedicamento != null) {
        parametros.append("descripcionMedicamento", data[key].descripcionMedicamento);
      }
      if (data[key].nuPagina != null) {
        parametros.append("nuPagina", data[key].nuPagina);
      } else {
        parametros.append("nuPagina", "1");
      }
      if (data[key].nuRegisMostrar != null) {
        parametros.append("nuRegisMostrar", data[key].nuRegisMostrar)
      } else {
        parametros.append("nuRegisMostrar", "10");
      }
      
    }
    let opciones = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: parametros
    });
    return this._http.get(this.URLFarmacia + '/medicamentos/almacen', opciones).map((res: Response) => res.json()).catch((error => Observable.throw(error.json.error) || "Server error"));

  }

  public deleteDetalleReceta(idRecetaDetalle: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idRecetaDetalle !== undefined) {
      queryParams.append('idRecetaDetalle', idRecetaDetalle);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLAdmision + '/recetasDetalle', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public deleteReceta(idReceta: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (idReceta !== undefined) {
      queryParams.append('idReceta', idReceta);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.delete(this.URLAdmision + '/recetas', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  // public getMedicDispMedProdSanit() {
  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders()
  //   });
  //   return this._http.get(this.URLAdmision + '/medicamentoDispMedicoProdSanitario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  // }

  public getMedicDispMedProdSanit(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.descripMedicDispProd !== undefined) {
      queryParams.append('descripcionMedicDispProdSanid', _params.descripMedicDispProd);
    }
    if (_params.idActoMedico != null || _params.idActoMedico != undefined) {
      queryParams.append('idActoMedicoEncriptado', this._cambiarValores.replace(_params.idActoMedico));
    }
    if (_params.idAtencion != null || _params.idAtencion != undefined) {
      queryParams.append('idAtencionEncriptado', this._cambiarValores.replace(_params.idAtencion));
    }
    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLAdmision + '/medicamentoDispMedicoProdSanitario', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getRecetasAnteriores(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined) {
      queryParams.append('idPersona',this._cambiarValores.replace(_params.idPersona));
    }
    if (_params.feInicio !== undefined) {
      queryParams.append('feInicio', _params.feInicio);
    }
    if (_params.feFin !== undefined) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + "/recetas/cabecera-anterior", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getDetallesRecetasAnteriores(idReceta) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idReceta !== undefined) {
      queryParams.append('idReceta', idReceta);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + "/recetas/detalle-anterior", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

}
