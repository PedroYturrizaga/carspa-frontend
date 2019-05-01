import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Configuration } from '../../../shared/configuration/app.constants';
import { Http, Headers,Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportCierreCajaService  extends BaseService{

  private headers = new Headers();
  private URLReporteCierreCaja: string;

  constructor(public _http: Http, public _configuration: Configuration) { 
    super();
    this.headers = super.obtenerHeaders();
    this.URLReporteCierreCaja = this._configuration.Server + "caja/reportePagosCaja";
  }

  public obtenerReporteCierreCaja(_params) {
    console.log(_params);

    let queryParams = new URLSearchParams()
    // if (_params.idAperturaCaja != null) {
      queryParams.append("idAperturaCaja", _params.idAperturaCaja);
      queryParams.append("tipoFile", _params.tipoFile);
    // }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    console.log(options);

    return this._http.get(this.URLReporteCierreCaja + '/reportePagosCaja', options).map((res: Response) => res.json());
  }

}
