import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configuration } from '../../../shared/configuration/app.constants';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class ReporteFarmaciaService extends BaseService {
  private headers = new Headers();
  private URLFarmacia: string;
  private URLAdmision: string;
  private URLCommons: string;

  constructor(public _http: Http, public _configuration: Configuration) {
    super();
    this.URLFarmacia = this._configuration.Server + 'farmacia';
    this.URLAdmision = this._configuration.Server + 'admision';
    this.URLCommons = this._configuration.Server + 'commons';
  }

  public getAbastecimiento(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo !== undefined) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento !== undefined) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.feIni !== undefined) {
      queryParams.append('feIni', _params.feIni);
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

    return this._http.get(this.URLFarmacia + "/almacen-medicamento/abastecimiento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getAbastecimiento_Reporte(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen !== undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo !== undefined) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento !== undefined) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.feIni !== undefined) {
      queryParams.append('feIni', _params.feIni);
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
    if (_params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', _params.descripcionMedicamento);
    }
    if (_params.noTipo !== undefined) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.tipoFile !== undefined) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/almacen-medicamento/abastecimiento/Reporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicamentoxServicio(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/medicamentos/consumo-por-servicio", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public obtenerEspecialidadesxalm(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.idArea != null) {
      queryParams.append('idArea', params.idArea);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/almacenes/especialidad", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirMedicamentoxServicioSP(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.idEspecialidad != null) {
      queryParams.append('idEspecialidad', _params.idEspecialidad);
    }
    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    if (_params.noTipo != null) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionAlmacen != null) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.descripcionEspecialidad != null) {
      queryParams.append('descripcionEspecialidad', _params.descripcionEspecialidad);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/medicamentos/consumo-por-servicio/Reporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicamentosxReceta(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
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

    return this._http.get(this.URLFarmacia + "/recetas/obtenerMedicamentos-Receta", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteMedicamentos_Receta(params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.feIni != null) {
      queryParams.append('feIni', params.feIni);
    }
    if (params.feFin != null) {
      queryParams.append('feFin', params.feFin);
    }
    if (params.fiTipo != null) {
      queryParams.append('fiTipo', params.fiTipo);
    }
    if (params.idMedicamento != null) {
      queryParams.append('idMedicamento', params.idMedicamento);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    if (params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', params.descripcionAlmacen);
    }
    if (params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', params.descripcionMedicamento);
    }
    if (params.noTipo !== undefined) {
      queryParams.append('noTipo', params.noTipo);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/reporte/medicamento_receta", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicoxProductoCaro(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idPersonal != null) {
      queryParams.append('idPersonal', _params.idPersonal);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/obtenerMedico-por-ProductoCaro", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMedicoxProductoCaroSP(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != undefined) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fhinicio != undefined) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != undefined) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.idMedicamento != undefined) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idPersonal != undefined) {
      queryParams.append('idPersonal', _params.idPersonal);
    }
    if (_params.fiTipo != undefined) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.nuPagina != undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    if (_params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', _params.descripcionMedicamento);
    }
    if (_params.noTipo !== undefined) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionPersonal !== undefined) {
      queryParams.append('descripcionPersonal', _params.descripcionPersonal);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/reporte/obtenerMedico-por-ProductoCaro", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMovimientoIngresoMedicamento(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idComprobante != null) {
      queryParams.append('idComprobante', _params.idComprobante);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
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

    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteMovimientoIngresomedicamento(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idComprobante != null) {
      queryParams.append('idComprobante', _params.idComprobante);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.noTipo !== undefined) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', _params.descripcionMedicamento);
    }
    if (_params.numeroComprobante !== undefined) {
      queryParams.append('numeroComprobante', _params.numeroComprobante);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamentoSP-Reporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMovimientosporComprobanteFarmacia(params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.numeroComprobante != null) {
      queryParams.append('numeroComprobante', params.numeroComprobante);
    }
    if (params.feIni !== undefined) {
      queryParams.append('feIni', params.feIni);
    }
    if (params.feFin !== undefined) {
      queryParams.append('feFin', params.feFin);
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/comprobanteFarmacia/lista/comprobanteFarmacia", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMovimientosporComprobanteFarmacia_Impresion(params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.numeroComprobante != null) {
      queryParams.append('numeroComprobante', params.numeroComprobante);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    if (params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', params.descripcionAlmacen);
    }
    if (params.feIni !== undefined) {
      queryParams.append('feIni', params.feIni);
    }
    if (params.feFin !== undefined) {
      queryParams.append('feFin', params.feFin);
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }
    if (params.descripcionComprobante !== undefined) {
      queryParams.append('descripcionComprobante', params.descripcionComprobante);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/comprobanteFarmacia/lista/comprobanteFarmacia-Impresion", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteMovimientoIngresomedicamento_porSalida(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idComprobante != null) {
      queryParams.append('idComprobante', _params.idComprobante);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.noTipo !== undefined) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', _params.descripcionMedicamento);
    }
    if (_params.numeroComprobante !== undefined) {
      queryParams.append('numeroComprobante', _params.numeroComprobante);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamentoSP-Reporte-porSalida", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMovimientosporComprobanteFarmacia_Impresion_porSalida(params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.numeroComprobante != null) {
      queryParams.append('numeroComprobante', params.numeroComprobante);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    if (params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', params.descripcionAlmacen);
    }
    if (params.feIni !== undefined) {
      queryParams.append('feIni', params.feIni);
    }
    if (params.feFin !== undefined) {
      queryParams.append('feFin', params.feFin);
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }
    if (params.descripcionComprobante !== undefined) {
      queryParams.append('descripcionComprobante', params.descripcionComprobante);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/comprobanteFarmacia/lista/comprobanteFarmacia-Impresion-porSalida", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getProductosMasRecetados(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/productos-mas-recetados", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteProductosMasRecetadosSP(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.tipoFile != null) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    if (_params.noTipo != null) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionAlmacen != null) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/reporte/productos-mas-recetados", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getRecetasAtendidasNoAtendidas(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != undefined) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.fhinicio != undefined) {
      queryParams.append('fhinicio', params.fhinicio);
    }
    if (params.fhfin != undefined) {
      queryParams.append('fhfin', params.fhfin);
    }
    if (params.nuPagina != null) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/obtenerRecetas-Atendidas-NoAtendidas", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getRecetasAtendidasNoAtendidasSP(params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != undefined) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.fhinicio != undefined) {
      queryParams.append('fhinicio', params.fhinicio);
    }
    if (params.fhfin != undefined) {
      queryParams.append('fhfin', params.fhfin);
    }
    if (params.nuPagina != null) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }
    if (params.tipoFile != null) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/recetas/reporte/obtenerRecetas-Atendidas-NoAtendidas", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getMovimientoIngresoMedicamento_salida(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.nuSalida != null) {
      queryParams.append('nuSalida', _params.nuSalida);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
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

    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamentoPorSalida", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public imprimirReporteMovimientoIngresomedicamento_salida(params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (params.idAlmacen != null) {
      queryParams.append('idAlmacen', params.idAlmacen);
    }
    if (params.feIni != null) {
      queryParams.append('feIni', params.feIni);
    }
    if (params.feFin != null) {
      queryParams.append('feFin', params.feFin);
    }
    if (params.nuSalida !== undefined) {
      queryParams.append('nuSalida', params.nuSalida);
    }
    if (params.fiTipo != null) {
      queryParams.append('fiTipo', params.fiTipo);
    }
    if (params.idMedicamento != null) {
      queryParams.append('idMedicamento', params.idMedicamento);
    }
    if (params.tipoFile !== undefined) {
      queryParams.append('tipoFile', params.tipoFile);
    }
    if (params.nuPagina !== undefined) {
      queryParams.append('nuPagina', params.nuPagina);
    }
    if (params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', params.nuRegisMostrar);
    }
    if (params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', params.descripcionAlmacen);
    }
    if (params.noTipo !== undefined) {
      queryParams.append('noTipo', params.noTipo);
    }
    if (params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', params.descripcionMedicamento);
    }
    if (params.descripcionNuSalida !== undefined) {
      queryParams.append('descripcionNuSalida', params.descripcionNuSalida);
    }
    if (params.descripcionIni !== undefined) {
      queryParams.append('descripcionIni', params.descripcionIni);
    }
    if (params.descripcionFin !== undefined) {
      queryParams.append('descripcionFin', params.descripcionFin);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamentoPorSalida-Reporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
  public getPacientebyReceta(idReceta) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (idReceta !== undefined) {
      queryParams.append('idReceta', idReceta);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLAdmision + '/pacientes/receta', options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public listarMovimientoIngresoMedicamento(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.numeroDocumento != null) {
      queryParams.append('numeroDocumento', _params.numeroDocumento);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
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
    console.log(options);
    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamento", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }

  public listarMovimientoIngresoMedicamento_Impresion(_params: any) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.numeroDocumento != null) {
      queryParams.append('numeroDocumento', _params.numeroDocumento);
    }
    if (_params.feIni != null) {
      queryParams.append('feIni', _params.feIni);
    }
    if (_params.feFin != null) {
      queryParams.append('feFin', _params.feFin);
    }
    if (_params.nuPagina !== undefined) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar !== undefined) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.descripcionAlmacen !== undefined) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.noTipo !== undefined) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.descripcionMedicamento !== undefined) {
      queryParams.append('descripcionMedicamento', _params.descripcionMedicamento);
    }
    if (_params.descripcionDocumento !== undefined) {
      queryParams.append('descripcionDocumento', _params.descripcionDocumento);
    }
    if (_params.descripcionIni !== undefined) {
      queryParams.append('descripcionIni', _params.descripcionIni);
    }
    if (_params.descripcionFin !== undefined) {
      queryParams.append('descripcionFin', _params.descripcionFin);
    }
    if (_params.tipoFile !== undefined) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log("options", options);
    return this._http.get(this.URLFarmacia + "/medicamentos/movimientoIngresoMedicamentoSP-Reporte", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));

  }
  public getMedicoxProductoCaroNoGeneral(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }

    if (_params.fhinicio != null) {
      queryParams.append('fhinicio', _params.fhinicio);
    }
    if (_params.fhfin != null) {
      queryParams.append('fhfin', _params.fhfin);
    }
    if (_params.idMedicamento != null) {
      queryParams.append('idMedicamento', _params.idMedicamento);
    }
    if (_params.idPersonal != null) {
      queryParams.append('idPersonal', _params.idPersonal);

    }
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });


    return this._http.get(this.URLFarmacia + "/recetas/obtenerMedico-por-ProductoCaroNoGeneral", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getKardex(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.fhInicio != null) {
      queryParams.append('fhInicio', _params.fhInicio);
    }
    if (_params.fhFin != null) {
      queryParams.append('fhFin', _params.fhFin);
    }
    if (_params.idMedicamentoDispositivo != null) {
      queryParams.append('idMedicamentoDispositivo', _params.idMedicamentoDispositivo);
    }
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/kardexs/obtener-kardex", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }

  public getKardexImpresion(_params: any) {

    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.fiTipo != null) {
      queryParams.append('fiTipo', _params.fiTipo);
    }
    if (_params.fhInicio != null) {
      queryParams.append('fhInicio', _params.fhInicio);
    }
    if (_params.fhFin != null) {
      queryParams.append('fhFin', _params.fhFin);
    }
    if (_params.idMedicamentoDispositivo != null) {
      queryParams.append('idMedicamentoDispositivo', _params.idMedicamentoDispositivo);
    }
    if (_params.idAlmacen != null) {
      queryParams.append('idAlmacen', _params.idAlmacen);
    }
    if (_params.nuPagina != null) {
      queryParams.append('nuPagina', _params.nuPagina);
    }
    if (_params.nuRegisMostrar != null) {
      queryParams.append('nuRegisMostrar', _params.nuRegisMostrar);
    }
    if (_params.noTipo != null) {
      queryParams.append('noTipo', _params.noTipo);
    }
    if (_params.dciMedicamentoDispositivo != null) {
      queryParams.append('dciMedicamentoDispositivo', _params.dciMedicamentoDispositivo);
    }
    if (_params.descripcionAlmacen != null) {
      queryParams.append('descripcionAlmacen', _params.descripcionAlmacen);
    }
    if (_params.tipoFile !== undefined) {
      queryParams.append('tipoFile', _params.tipoFile);
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLFarmacia + "/kardexs/obtener-kardex-sp", options).map(result => result.json()).catch((error: any) => Observable.throw(error.json().error));
  }
}

