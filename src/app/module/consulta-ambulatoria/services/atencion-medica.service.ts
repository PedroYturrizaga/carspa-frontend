import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
import { Configuration } from "../../../shared/configuration/app.constants";
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs/Observable';
import { query } from '@angular/animations/src/animation_metadata';
import { CambiarValoresEncriptados } from '../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';


@Injectable()
export class AtencionMedicaService extends BaseService{
  private headers = new Headers();

  private urlfecha: string;
  private urlActosMedicosCita: string;
  private urlComboBox: string;
  //Acto Medico
  private urlActosMedicosAdicionalActoMedico: string;
  //Diagnostico
  private urlDiagnosticoActoMedico: string;
  private urlDiagnostico: string;
  private urlDiagnosticoPorActoMedico: string;
  private urlgetAllDiagnosticoxidActoMedico: string;
  //Antecedentes
  private urlAntecedentePrenatalPersona: string;
  private urlAntecedentePerinatalPersona: string;
  private urlAntecedenteGeneralPersona: string;
  private urlAntecedenteAlimentacionPersona: string;
  private urlAntecedenteFisiologicoPersona: string;
  private urlAntecedenteMedicamentoDescripcion: string;
  private urlMedicamentoDescripcion: string;
  private urlAntecedentePatologico: string;

  //inserta
  private urlPostAtencionMedica: string; 

  constructor(public _http: Http, public _configuration: Configuration, private _cambiarValores: CambiarValoresEncriptados) {
    super();

    this.urlfecha = this._configuration.Server + "commons/fechaAnual";
    this.urlComboBox = this._configuration.Server + "commons/comboGeneral";
    //Acto Medico
    this.urlActosMedicosAdicionalActoMedico = this._configuration.Server + "admision/actosMedicos/adicional";
    this.urlActosMedicosCita = this._configuration.Server + "admision/actosMedicos/cita";
    this.urlPostAtencionMedica = this._configuration.Server + "admision/actosMedicos/registraAmbulatoria";
    
    //Diagnostico
    this.urlDiagnosticoActoMedico = this._configuration.Server + "admision/diagnosticos/descripcion";
    this.urlDiagnostico = this._configuration.Server + "admision/diagnosticos/codigoDescripcion";
    this.urlDiagnosticoPorActoMedico = this._configuration.Server + "admision/diagnosticos/actoMedico";
    this.urlgetAllDiagnosticoxidActoMedico = this._configuration.Server + "admision/diagnosticos/idActoMedico";
    
    //Antecedentes
    this.urlAntecedentePrenatalPersona = this._configuration.Server + "admision/antecedente/prenatal-persona";
    this.urlAntecedentePerinatalPersona = this._configuration.Server + "admision/antecedente/perinatal-persona";
    this.urlAntecedenteGeneralPersona = this._configuration.Server + "admision/antecedente/general-persona";
    this.urlAntecedenteAlimentacionPersona = this._configuration.Server + "admision/antecedente/alimentacion-persona";
    this.urlAntecedenteFisiologicoPersona = this._configuration.Server + "admision/antecedente/fisiologico-persona";
    this.urlAntecedentePatologico = this._configuration.Server + "admision/antecedente/patologico-persona";
    this.urlAntecedenteMedicamentoDescripcion = this._configuration.Server + "admision/antecedente/medicamento-persona";
    this.urlMedicamentoDescripcion = this._configuration.Server + "farmacia/medicamentos/busqueda-descripcion";
 
  }

  public obtenerFecha(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.inferiorFecha !== undefined)
      queryParams.append('inferiorFecha', _params.inferiorFecha);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlfecha, options).map((res: Response) => res.json());
  }
  
  public obtenerActoMedicoCita(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idCita !== undefined)
      queryParams.append('idCita', this._cambiarValores.replace(_params.idCita));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlActosMedicosCita, options).map((res: Response) => res.json());
  }

  public busquedaDiagnostico(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.descripcionDiagnostico !== undefined)
      queryParams.append('descripcionDiagnostico', _params.descripcionDiagnostico);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlDiagnosticoActoMedico, options).map((res: Response) => res.json());
  }

  public obtenerMedicamentoDescripcion(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.medicamentoDescripcion !== undefined && _params.medicamentoDescripcion !== "")
      queryParams.append('medicamentoDescripcion', _params.medicamentoDescripcion);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlMedicamentoDescripcion, options).map((res: Response) => res.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  /**
   * obtiene el registro de todos Diagnostico
   */

  public obtenerDiagnosticoPoridActoMedico(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (_params.idActoMedicoEncriptado != undefined) {
      queryParams.append('IdActoMedico', this._cambiarValores.replace(_params.idActoMedicoEncriptado));
    }
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlgetAllDiagnosticoxidActoMedico, options).map((res: Response) => res.json());

  }

  // public getAllDiagnosticoxActoMedico(_params) {
  //   let queryParams: URLSearchParams = new URLSearchParams();

  //   if (_params.idActoMedico != null) {
  //     queryParams.append('IdActoMedico', _params.dActoMedico);
  //   } 
  //   let options = new RequestOptions({
  //     headers: this.obtenerHeaders(),
  //     params: queryParams
  //   });
  //   return this._http.get(this.urlDiagnostico, options).map((res: Response) => res.json());
  // }

  public obtenerDiagnostico(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.sexo != null) {
      queryParams.append('sexo', _params.sexo);
    } 
    if (_params.codigoDiagnostico != null) {
      queryParams.append('codigoDiagnostico', _params.codigoDiagnostico);
    }
    if (_params.descripcionDiagnostico != null) {
      queryParams.append('descripcionDiagnostico', _params.descripcionDiagnostico);
    }
    // console.log(queryParams);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlDiagnostico, options).map((res: Response) => res.json());
  }

  public obtenerComboBox(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.codigoGrupo !== undefined)
      queryParams.append("codigoGrupo", _params.codigoGrupo);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    return this._http.get(this.urlComboBox, options).map((res: Response) => res.json());
  }

  /**
   * obtiene el registro de todos los antecedentes y atencion medica
   */

  public obtenerActoMedicoAdicionalAdicional(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idActoMedicoEncriptado != undefined){
      queryParams.append('idActoMedico', this._cambiarValores.replace(_params.idActoMedicoEncriptado));
    }
    if (_params.idAtencionEncriptado != undefined){
      queryParams.append('idAtencion', this._cambiarValores.replace(_params.idAtencionEncriptado));
    }

    let options = new RequestOptions({  
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    console.log(options);
    return this._http.get(this.urlActosMedicosAdicionalActoMedico, options).map((res: Response) => res.json());
  }

  public obtenerPrenatales(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedentePrenatalPersona, options).map((res: Response) => res.json());
  }

  public obtenerAntecedentePerinatal(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedentePerinatalPersona, options).map((res: Response) => res.json());
  }

  public obtenerAntecedenteGeneral(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });
    // console.log(options);
    return this._http.get(this.urlAntecedenteGeneralPersona, options).map((res: Response) => res.json());
  }

  public obtenerAntecedenteAlimentacion(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedenteAlimentacionPersona, options).map((res: Response) => res.json());
  }

  public obtenerAntecedenteFisiologicoPersona(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedenteFisiologicoPersona, options).map((res: Response) => res.json());
  }

  public obtenerAntecedentesPatologicos(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedentePatologico, options).map((res: Response) => res.json());
  }

  public obtenerAntecedentesMedicamento(_params) {
    let queryParams: URLSearchParams = new URLSearchParams();

    if (_params.idPersona !== undefined)
      queryParams.append('idPersona', this._cambiarValores.replace(_params.idPersona));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      params: queryParams
    });

    return this._http.get(this.urlAntecedenteMedicamentoDescripcion, options).map((res: Response) => res.json());
  }

  public insertAtencionMedica(data){
    return this._http.post(this.urlPostAtencionMedica, data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
