import { Diagnostico } from './../../../../../../shared/class/diagnostico';
import { Component, OnInit, ViewChildren, QueryList, Injectable, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';

import { Persona } from './../../../../../../shared/interfaces/persona';
import { CambiarValoresEncriptados } from '../../../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { DataService } from './../../../../../../shared/services/data.service';
import { AtencionMedicaService } from '../../../../services/atencion-medica.service';
import { PersonaService } from '../../../../../../shared/services/persona.service';
import { getidNivelIPRESS } from '../../../../../../shared/auth/storage/cabecera.storage';

@Component({
  selector: 'app-atencion-medica',
  templateUrl: './atencion-medica.component.html',
  styleUrls: ['./atencion-medica.component.scss']
})
// @Injectable()
export class AtencionMedicaComponent implements OnInit {
  //variables que se usaran para almacenar los parametros que se necesitan los servicios
  private param: any = {
    idPersona: "",
    inferiorFecha: "",
    descripcionDiagnostico: "",
    codigoGrupo: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
  };
  // uso para que el acordeon se muestre 
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  //variable General para insertar
  private AtencionMedicaREQUEST: any = {
    actoMedico: {
      antecedente: {},
      persona: { idEstadoCivil: null, idGradoInstruccion: null, idTipoSangre: null, domicilio: null, telefono: null }
    }
  };

  // type elementAteAmbulatoria = string | number;

  private listfechas: any[];
  private listActoMedico: any = {};
  private listActoMedicoAdicional: any = { apetito: 0, sed: 0, depocision: null, sueno: 0 };
  private listaDiagnostico: any[];

  private cabeceraDatosPersona: any = {
    persona: {
      planList: [{ iafas: {}, cobertura: { descripcionCobertura: null } }],
      estadoCivil: { id: null },
      tipoDocumentoIdentidad: {},
      tipoSangre: { id: null },
      ocupacion: { valor: null },
      sexo: { id: null },
      historiaList: [{}],
      gradoInstruccion: { id: null },
      filiadoList: [{ ubigeo: {}, parentescoAcompanante: {}, domicilioActual: null, telefonoMovil: null }],
      feNacimiento: "",
      idGrupoEtareo: "",
      nombreAcompanante: null,
      edadAcompanante: null,
      idTipoDocumentoAcompanante: null,
      diAcompanante: null,
      edad: null
    }
  };

  private listEstadoCivil: any = [];
  private listTipoDocumento: any = [];
  private listOCupaciones: any = [{ id: null, valor: null }];
  private listOcupacion: any = [];
  private ocupacion: any;

  //lista para agregar el arreglo de comboBox para todos los hijos
  private listaComboBox: any = null;
  private listaDisabled: any = {
    datoPaciente: { acompaniante: null, estadoCivil: null },
    general: { gradoInstruccion: null, alimentacion: null },
    alimentacion: false,
    fisiologico: { fisiologico: null, metodoAnticonceptivo: null, fur: null, climaterio: null },
    medicamento: { medicamento: false, medicamentoFrecuente: true },
    prenatales: false,
    perinatales: false,
    patologicos: { psicosociales: null, saludSexul: null },
    esquemaVacunacion: { esquemaVacunacion: null, a: null }
  }

  private DocumentoIdentidad: String = "";
  private idGrupoEtareo: String = "";
  private lsComboSed: any;
  private lsComboDeposicion: any;
  private lsComboSuenio: any;
  private lsComboApetito: any;
  private lsComboCategAdulto: any;
  private lsComboGradoInstruccion: any;
  private lsComboTipoSangre: any;
  private lsformaInicio = [{ value: "Brusco" }, { value: "Insidioso" }];
  private lscursoEnfermedad = [{ value: "Progresivo" }, { value: "Intermitente" }, { value: "Estacionario" }];

  private lsTipocontigenciaLey = [{ valor: "No Comprende" }, { valor: "Accidente de Trabajo" }, { valor: "Enfermedad Profesional" }]
  private idNivelIPRESS: string;


  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService,
    private _personaService: PersonaService,
    private config: NgbAccordionConfig,
    private _cambiarValores: CambiarValoresEncriptados,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService
  ) {
    this.config.closeOthers = true;
    this.config.type = 'info';
    this.idNivelIPRESS = getidNivelIPRESS()

    this._route.queryParams.subscribe(params => {
      // console.log(params);
      this.param.numActoMedico = params["idActoMedico"];
      this.param.idPersona = params["idPersona"];
      this.param.idCita = params["idCita"];
    });
  }


  ngOnInit() {
    console.log("persona: ", this.cabeceraDatosPersona);
    console.log(this.idNivelIPRESS);
    this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado = localStorage.getItem('idActoMedicoEncriptado');

    // localStorage.setItem('idAtencionEncriptado', data.idAtencion);
    this.param.idActoMedicoEncriptado = (localStorage.getItem('idActoMedicoEncriptado') != null) ? localStorage.getItem('idActoMedicoEncriptado') : "";
    this.param.idAtencionEncriptado = (localStorage.getItem('idAtencionEncriptado') != null) ? localStorage.getItem('idAtencionEncriptado') : "";

    if (this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado == "" || this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado == null) {
      delete this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado;
      delete this.AtencionMedicaREQUEST.actoMedico.idAtencionEncriptado;
    }
    // debugger
    this.obtenerPersona();
    this.obtenerActoMedico();
    this.obtenerComboBoxGeneral();
    this.obtenerEstadoCivil();
    this.obtenerTipoDocumento();
    this.obtenerTipoSangre();
    this.obtenerGradoInstruccion();
    this.obtenerOcupacion();
    // console.log(this.param);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.listOCupaciones.filter(v => v.valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: { valor: string }) => x.valor;

  requestActoMedico(_params) {

    // debugger
    console.log(_params);
    if (_params.prenatales != undefined && _params.prenatales != null) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedentePrenatal = this.Jsondelete(_params.prenatales);
    } else if (_params.perinatales != undefined && _params.perinatales != null) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedentePerinatal = this.Jsondelete(_params.perinatales);
    } else if (_params.patologicos != undefined && _params.patologicos != null) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedentePatologico = this.Jsondelete(_params.patologicos);
      if (this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedentePatologico.diagnosticoPersonalJson != undefined) {
        delete this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedentePatologico.diagnosticoPersonalJson;
      }
    } else if (_params.generales != undefined && _params.generales != null) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedenteGeneral = this.Jsondelete(_params.generales);
    } else if (_params.medicamentos != undefined) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedenteMedicamento = this.Jsondelete(_params.medicamentos);
    } else if (_params.alimentacion != undefined) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedenteAlimentacion = this.Jsondelete(_params.alimentacion);
    } else if (_params.fisiologico != undefined && _params.fisiologico != null) {
      this.AtencionMedicaREQUEST.actoMedico.antecedente.antecedenteFisiologico = this.Jsondelete(_params.fisiologico);
    } else if (_params.esquemaVacunacion != undefined) {
      this.AtencionMedicaREQUEST.actoMedico.esquemaVacunacion = _params.esquemaVacunacion;
    } else if (_params.examenFisico != undefined && _params.examenFisico != null) {
      _params.examenFisico = this.Jsondelete(_params.examenFisico);
      for (let x in _params.examenFisico) {
        this.AtencionMedicaREQUEST.actoMedico[x] = _params.examenFisico[x];
      }
    } else if ((_params.diagnostico != undefined || _params.diagnostico != null) && _params.diagnostico.length != 0) {
      this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico = _params.diagnostico;
    } else if (_params.valoracionGeriatrica != undefined || _params.valoracionGeriatrica != null) {
      this.AtencionMedicaREQUEST.actoMedico.valoracionGeriatrica = { ..._params.valoracionGeriatrica };
    } else if (_params.resultadoAtencion != undefined || _params.resultadoAtencion != null) {
      // console.log(_params.resultadoAtencion);
      this.AtencionMedicaREQUEST.actoMedico.idDestino = _params.resultadoAtencion.idDestino;
      this.AtencionMedicaREQUEST.actoMedico.destinoAtencion = _params.resultadoAtencion.destinoAtencion;
    }
    // console.log(this.Jsondelete(this.AtencionMedicaREQUEST));
  }

  private insertarAtencionMedica() {
    // obteniendo idActoMedicoEncriptado

    console.log(this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico, this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.length);
    console.log(this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico[0].altaDiagnostico);
    console.log(this.AtencionMedicaREQUEST);
    // console.log(this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico, this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.length);
    
    this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado = (localStorage.getItem('idActoMedicoEncriptado') != undefined) ? localStorage.getItem('idActoMedicoEncriptado') : "";
    if (this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado == "" || this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado == null) {
      delete this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado;
    }
    //guarda el idcita
    this.AtencionMedicaREQUEST.actoMedico.idCitaEncriptado = this.param.idCita;

    //guarda el idpersona
    this.AtencionMedicaREQUEST.actoMedico.idPersona = this.param.idPersona;
    //console.log(this.AtencionMedicaREQUEST);

    //insertar datos generales
    this.AtencionMedicaREQUEST.actoMedico.persona.idEstadoCivil = this.cabeceraDatosPersona.persona.estadoCivil.id;
    this.AtencionMedicaREQUEST.actoMedico.persona.idGradoInstruccion = this.cabeceraDatosPersona.persona.gradoInstruccion.id;
    this.AtencionMedicaREQUEST.actoMedico.persona.idTipoSangre = this.cabeceraDatosPersona.persona.tipoSangre.id ? this.cabeceraDatosPersona.persona.tipoSangre.id : 0;
    this.AtencionMedicaREQUEST.actoMedico.persona.domicilio = this.cabeceraDatosPersona.persona.filiadoList[0].domicilioActual;
    this.AtencionMedicaREQUEST.actoMedico.persona.telefono = this.cabeceraDatosPersona.persona.filiadoList[0].telefonoMovil;
    this.AtencionMedicaREQUEST.actoMedico.persona.idOcupacion = this.cabeceraDatosPersona.persona.ocupacion.id;
    this.AtencionMedicaREQUEST.actoMedico.nombreAcompanante = this.cabeceraDatosPersona.persona.nombreAcompanante;
    this.AtencionMedicaREQUEST.actoMedico.edadAcompanante = this.cabeceraDatosPersona.persona.edadAcompanante;
    this.AtencionMedicaREQUEST.actoMedico.idTipoDocumentoAcompanante = this.cabeceraDatosPersona.persona.idTipoDocumentoAcompanante;
    this.AtencionMedicaREQUEST.actoMedico.numeroDocumentoAcompanante = this.cabeceraDatosPersona.persona.diAcompanante;

    // if (this.AtencionMedicaREQUEST.actoMedico.persona.idOcupacion == "" || this.AtencionMedicaREQUEST.actoMedico.persona.idOcupacion == null) {
    //   this.toastr.warning("Debe Ingresar una ocupacion")
    //   $("#ocupacion").focus();
    //   return;
    // }

    //Validacion para Anamnesis 
    if (this.listActoMedicoAdicional.motivoConsulta == null || this.listActoMedicoAdicional.motivoConsulta == "") {
      this.toastr.warning("Debe Ingresar un Motivo de Consulta")
      $("#motivoConsulta").focus();
      return;
    } else if (this.listActoMedicoAdicional.cursoEnfermedad == null || this.listActoMedicoAdicional.cursoEnfermedad == "") {
      this.toastr.warning("Debe Ingresar Curso de Enfermedad")
      $("#cursoEnfermedad").focus();
      return;
    } else if (this.listActoMedicoAdicional.tiempoEnfermedad == null || this.listActoMedicoAdicional.tiempoEnfermedad == "") {
      this.toastr.warning("Debe Ingresar un Tiempo de Enermedad")
      $("#tiempoEnfermedad").focus();
      return;
    } else if (this.listActoMedicoAdicional.formaInicio == null || this.listActoMedicoAdicional.formaInicio == "") {
      this.toastr.warning("Debe Ingresar una Forma de Inicio")
      $("#formaInicio").focus();
      return;
    } else if (this.listActoMedicoAdicional.anamnesisRelato == null || this.listActoMedicoAdicional.anamnesisRelato == "") {
      this.toastr.warning("Debe Ingresar un Relato")
      $("#anamnesisRelato").focus();
      return;
    } else {
      this.AtencionMedicaREQUEST.actoMedico.motivoConsulta = this.listActoMedicoAdicional.motivoConsulta;
      this.AtencionMedicaREQUEST.actoMedico.tiempoEnfermedad = this.listActoMedicoAdicional.tiempoEnfermedad;
      this.AtencionMedicaREQUEST.actoMedico.formaInicio = this.listActoMedicoAdicional.formaInicio;
      this.AtencionMedicaREQUEST.actoMedico.anamnesisRelato = this.listActoMedicoAdicional.anamnesisRelato;
    }

    //validando funciones Biologicas
    if (this.idGrupoEtareo == "1" || this.idGrupoEtareo == "2") {
      this.AtencionMedicaREQUEST.actoMedico.apetito = null;
      this.AtencionMedicaREQUEST.actoMedico.sed = null;
      this.AtencionMedicaREQUEST.actoMedico.orina = null;
      this.AtencionMedicaREQUEST.actoMedico.deposicion = null;
      this.AtencionMedicaREQUEST.actoMedico.suenio = null;
    } else {
      if (this.listActoMedicoAdicional.apetito == null || this.listActoMedicoAdicional.apetito == "") {
        this.toastr.warning("Debe Debe completar el campo de Motivo de Apetito");
        $("#apetito").focus();
        return;
      } else if (this.listActoMedicoAdicional.sed == null || this.listActoMedicoAdicional.sed == "") {
        this.toastr.warning("Debe Debe completar el campo de Motivo de Sed");
        $("#sed").focus();
        return;
      } else if (this.listActoMedicoAdicional.orina == null || this.listActoMedicoAdicional.orina == "") {
        this.toastr.warning("Debe Debe completar el campo de Motivo de Orina");
        $("#orina").focus();
        return;
      } else if (this.listActoMedicoAdicional.depocision == null || this.listActoMedicoAdicional.depocision == "") {
        this.toastr.warning("Debe Debe completar el campo de Deposicion");
        $("#deposicion").focus();
        return;
      } else if (this.listActoMedicoAdicional.sueno == null || this.listActoMedicoAdicional.sueno == "") {
        this.toastr.warning("Debe Completar el campo de Sueño");
        $("#suenio").focus();
        return;
      } else {
        this.AtencionMedicaREQUEST.actoMedico.apetito = this.listActoMedicoAdicional.apetito;
        this.AtencionMedicaREQUEST.actoMedico.sed = this.listActoMedicoAdicional.sed;
        this.AtencionMedicaREQUEST.actoMedico.orina = this.listActoMedicoAdicional.orina;
        this.AtencionMedicaREQUEST.actoMedico.dciDepocision = this.listActoMedicoAdicional.depocision;
        this.AtencionMedicaREQUEST.actoMedico.sueno = parseInt(this.listActoMedicoAdicional.sueno);
      }
    }

    //validando Plan de Trabajo
    if (this.listActoMedicoAdicional.planTrabajo == null || this.listActoMedicoAdicional.planTrabajo == "") {
      this.toastr.warning("Debe completar el campo de Plan de Trabajo");
      $("#planTrabajo").focus();
      return;
    } else {
      this.AtencionMedicaREQUEST.actoMedico.planTrabajo = this.listActoMedicoAdicional.planTrabajo;
    }
    
    //Validando Diagnosticos
    if(this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.length == 0){
      this.toastr.warning("Debe ingresar al menos un Diagnostico");
      return;
    }

    //validando Destino Atencion
    // if ((this.AtencionMedicaREQUEST.actoMedico.idDestino != null || this.AtencionMedicaREQUEST.actoMedico.idDestino) && this.AtencionMedicaREQUEST.actoMedico.idDestino == "") {
    //   this.AtencionMedicaREQUEST.actoMedico.idDestino = this.listActoMedicoAdicional;
    // }
    // console.log(this.AtencionMedicaREQUEST.actoMedico.idDestino, this.listActoMedicoAdicional);

    if (this.AtencionMedicaREQUEST.actoMedico.idDestino == "" || this.AtencionMedicaREQUEST.actoMedico.idDestino == undefined) {
      this.toastr.warning("No ha seleccionado un destino");
      $("#comboDestinosAtencion").focus();
      return;
    }
    if (this.AtencionMedicaREQUEST.actoMedico.idDestino == 7) {
      if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.codigoOperacion == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.codigoOperacion == "") {
        this.toastr.warning("Debe Ingresar un Servicio Hospitalario");
        $("#comboServicioHopsInternamiento").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.fechaOperacion == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.fechaOperacion == "") {
        this.toastr.warning("Debe Ingresar una fecha de Operacion");
        $("#fechaInternamiento").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.descripcionOperacion == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.descripcionOperacion == "") {
        this.toastr.warning("Debe Ingresar una descripcion");
        $("#motivoHospi").focus();
        return;
      }
    } else if (this.AtencionMedicaREQUEST.actoMedico.idDestino == 8) {
      if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idEspecialidad == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idEspecialidad == "") {
        this.toastr.warning("Debe seleccionar una Especialidad");
        $("#comboEspecialidad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idActividad == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idActividad == "") {
        this.toastr.warning("Debe seleccionar una Actividad");
        $("#comboActividad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion./*descripcionOpeidSubActividadracion*/idSubActividad == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idSubActividad == "") {
        this.toastr.warning("Debe Seleccionar una SubActividad");
        $("#comboSubActividad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasInterconsulta == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasInterconsulta == "") {
        this.toastr.warning("Debe Ingresar fecha");
        $("#diasProximaInterconsulta").focus();
        return;
      }
    } else if (this.AtencionMedicaREQUEST.actoMedico.idDestino == 11) {
      if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasRecita == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasRecita == "") {
        this.toastr.warning("Debe seleccionar un numero de Re Cita");
        $("#numeroDiasProximaRecita").focus();
        return;
      }
    } else if (this.AtencionMedicaREQUEST.actoMedico.idDestino == 12) {
      if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idEspecialidad == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idEspecialidad == "") {
        this.toastr.warning("Debe seleccionar una Especialidad");
        $("#comboEspecialidad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idActividad == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idActividad == "") {
        this.toastr.warning("Debe seleccionar una Actividad");
        $("#comboActividad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.descripcionOpeidSubActividadracion == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.idSubActividad == "") {
        this.toastr.warning("Debe Seleccionar una SubActividad");
        $("#comboSubActividad").focus();
        return;
      } else if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasInterconsulta == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasInterconsulta == "") {
        this.toastr.warning("Debe Ingresar fecha");
        $("#diasProximaInterconsulta").focus();
        return;
      } if (this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasRecita == null || this.AtencionMedicaREQUEST.actoMedico.destinoAtencion.nroDiasRecita == "") {
        this.toastr.warning("Debe seleccionar un numero de Re Cita");
        $("#numeroDiasProximaRecita").focus();
        return;
      }
      console.log(this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.altaDiagnostico);
      
      console.log(this.AtencionMedicaREQUEST.actoMedico.idDestino);
      
    }else if(this.AtencionMedicaREQUEST.actoMedico.idDestino == 1){
      let con = 0;
      for (let index = 0; index < this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.length; index++) {
        const element = this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico[index];      
        console.log(element);
        // con ++;
        if(element.altaDiagnostico == 1 && element.calificacionDiagnostico == "D"){
          con ++;
        }    
      }
      if(con == this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico.length  ){
        // this.toastr.success("nice");
      }
      else{
        this.toastr.warning("Para el disto Alta el tipo de diagnostico debe ser Definitivo");
        return ;
      } 
    }

    //Validar categoria adulto
    if (this.idGrupoEtareo == "3" || this.idGrupoEtareo == "4") {
      this.AtencionMedicaREQUEST.actoMedico.categoriaAdulto = this.listActoMedicoAdicional.categoriaAdulto;
    }

    this.AtencionMedicaREQUEST = this.Jsondelete(this.AtencionMedicaREQUEST); //param;

    // let cont=0;
    // for(let x of this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico){
    //   if(x['flgReferencia']) cont++;
    // }
    // console.log(cont);
    // (cont>0) ? this.ds.sendData('verificarStorages') : this.ds.sendData('verificarStoragesRefFalse');
    // // this.ds.sendData('verificarStorages'); //DESBLOQUEA MENUS SI SE LLENA EL STORAGE

    console.log(this.AtencionMedicaREQUEST);

    this._atencionService.insertAtencionMedica(this.AtencionMedicaREQUEST)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Insertado Correctamente");
          //guardar el actomedico en el localStorage
          localStorage.setItem('idActoMedicoEncriptado', data.idActoMedico);
          localStorage.setItem('idAtencionEncriptado', data.idAtencion);
          // localStorage.setItem('idArea', "1");
          this.param.idActoMedicoEncriptado = data.idActoMedico;
          this.param.idAtencionEncriptado = data.idAtencion;
          this.AtencionMedicaREQUEST.actoMedico.idActoMedicoEncriptado == data.idActoMedico;
          this.AtencionMedicaREQUEST.actoMedico.idAtencionEncriptado == data.idAtencion;

          let cont = 0;
          for (let x of this.AtencionMedicaREQUEST.actoMedico.listDiagnosticoActoMedico) {
            if (x['flgReferencia']) cont++;
          }
          (cont > 0) ? this.ds.sendData('verificarStorages') : this.ds.sendData('verificarStoragesRefFalse');
          // this.ds.sendData('verificarStorages'); //DESBLOQUEA MENUS SI SE LLENA EL STORAGE
          window.scroll(0, 0);
        } else {
          this.toastr.error("Error al insertarAtencionMedica");
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          this.listarFechas();
          this.grupoEtario(this.idGrupoEtareo);
          this.obtenerActoMedicoAdicional().then();
        });
  }

  private obtenerPersona() {
    // console.log(this.param);
    this._personaService.getDatosPersona(this.param.idCita)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraDatosPersona.persona = data.persona;
          // console.log(this.cabeceraDatosPersona);
          this.DocumentoIdentidad = (this.cabeceraDatosPersona.persona["idPersona"].substring(1, 9));
          this.param.inferiorFecha = this.cabeceraDatosPersona.persona.feNacimiento.substring(0, 4);
          this.idGrupoEtareo = this.cabeceraDatosPersona.persona.idGrupoEtareo;
          this.param.idGrupoEtareo = this.cabeceraDatosPersona.persona.idGrupoEtareo;
          this.param.sexo = this.cabeceraDatosPersona.persona.sexo.id;
          this.param.edad = this.cabeceraDatosPersona.persona.edad;
          this.param.edadLetra = this.cabeceraDatosPersona.persona.edadLetra;
          this.param.feNacimiento = this.cabeceraDatosPersona.persona.feNacimiento;
          this.cabeceraDatosPersona.persona.tipoSangre.id = this.cabeceraDatosPersona.persona.tipoSangre.id ? this.cabeceraDatosPersona.persona.tipoSangre.id : 0;
          this.listOCupaciones[0].id = this.cabeceraDatosPersona.persona.ocupacion.id ? this.cabeceraDatosPersona.persona.ocupacion.id : 0;
          this.listOCupaciones[0].valor = this.cabeceraDatosPersona.persona.ocupacion.valor ? this.cabeceraDatosPersona.persona.ocupacion.valor : '';
          // console.log(this.listOCupaciones);
        } else {
          this.toastr.error("Error al obtenerPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          this.listarFechas();
          this.grupoEtario(this.idGrupoEtareo);
        });
  }

  private obtenerEstadoCivil() {
    this._personaService.getEstadoCivil()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listEstadoCivil = data.estadoCivilList;
          // console.log(this.listEstadoCivil);
        } else {
          this.toastr.error("Error al obtenerEstadoCivil" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private obtenerTipoDocumento() {
    this._personaService.getTipoDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listTipoDocumento = data.tipoDocumentoList;
        } else {
          this.toastr.error("Error al obtenerTipoDocumento" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private obtenerTipoSangre() {
    this._personaService.getTipoSangre()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsComboTipoSangre = data.tipoSangre;
        } else {
          this.toastr.error("Error al obtenerTipoSangre" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private obtenerGradoInstruccion() {
    this._personaService.getGradoInstruccion()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsComboGradoInstruccion = data.gradoInstruccionList;
        } else {
          this.toastr.error("Error al obtenerGradoInstruccion" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private obtenerOcupacion() {
    this._personaService.getOcupacion()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listOcupacion = data.ocupacionList;
        } else {
          this.toastr.error("Error al obtenerOcupacionPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private obtenerOcupacionPersona(param) {
    this._personaService.getOcupacionPersona(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listOCupaciones = data.ocupacionList;
        } else {
          this.toastr.error("Error al obtenerOcupacionPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private busquedaDiagnosticoDescripcion(value) {
    if (value.length % 2 == 0) {
      this.obtenerOcupacionPersona(value);
    }
  }

  private seleccionar(valor) {
    // console.log(valor);
    this.AtencionMedicaREQUEST.actoMedico.persona.idOcupacion = valor.id;
  }

  private listarFechas() {
    if (this.param.inferiorFecha != "") {
      this._atencionService.obtenerFecha(this.param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.listfechas = data.lsFechaGeneradas;
          } else {
            this.toastr.error("Error listarFechas" + data.mensaje);
          }
          return true;
        },
          error => {
            console.error(error);
            return Observable.throw(error);
          }
        ),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }

  private obtenerActoMedico() {
    this._atencionService.obtenerActoMedicoCita(this.param)
      .subscribe(data => {
        if (data.estado == 1) {
          // console.log(data);
          this.listActoMedico = data.lsActoMedicoAtencion;
          if (this.listActoMedico.idActoMedico != undefined) {
            this.param.idActoMedico = this.listActoMedico.idActoMedico;
          }
        } else {
          this.toastr.error("Error al listar ActoMedico: " + data.mensaje);
          //console.log(data);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          if ((this.param.idActoMedicoEncriptado != null && this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
            // console.log("entro "+ this.param.idActoMedicoEncriptado);
            this.obtenerActoMedicoAdicional().then();
          }
        });
  }

  private obtenerActoMedicoAdicional() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerActoMedicoAdicionalAdicional(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listActoMedicoAdicional = data.actoMedico;
            this.param.idDestino = data.actoMedico.idDestino;
            this.AtencionMedicaREQUEST.actoMedico.idDestino = data.actoMedico.idDestino;
          } else {
            this.toastr.error("Error al listar ActoMedico Adicional " + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerComboBoxGeneral() {
    this.param.codigoGrupo = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
    this._atencionService.obtenerComboBox(this.param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listaComboBox = data.lsComboGeneral;
          // console.log(this.listaComboBox);
          this.lsComboApetito = this.listaComboBox[8].lsOpcionValorCombo;
          this.lsComboSed = this.listaComboBox[9].lsOpcionValorCombo;
          this.lsComboDeposicion = this.listaComboBox[10].lsOpcionValorCombo;
          this.lsComboSuenio = this.listaComboBox[11].lsOpcionValorCombo;
          this.lsComboCategAdulto = this.listaComboBox[12].lsOpcionValorCombo;
          this.lsComboGradoInstruccion = this.listaComboBox[5].lsOpcionValorCombo;
          // console.log(this.lsComboGradoInstruccion);
        } else if (data.estado == 0) {
          this.listaComboBox = data.lsComboGeneral;
        } else {
          this.toastr.error("Error al obteobtenerComboBoxGeneral" + data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private grupoEtario(_params) {
    if (_params == 1) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = true;
      this.listaDisabled.fisiologico.fisiologico = false;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = false;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = true;
      this.listaDisabled.perinatales = true;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = true;
      this.listaDisabled.datoPaciente.estadoCivil = true;
      this.listaDisabled.funcionesBiologicas = false;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = true;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = false;

    } else if (_params == 2) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = true;
      this.listaDisabled.fisiologico.fisiologico = false;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = false;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = true;
      this.listaDisabled.perinatales = true;
      this.listaDisabled.patologicos.psicosociales = true;
      this.listaDisabled.patologicos.saludSexul = true;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = true;
      this.listaDisabled.funcionesBiologicas = false;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = true;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = false;

    } else if (_params == 3) {
      this.listaDisabled.general.gradoInstruccion = true;
      this.listaDisabled.general.alimentacion = true;
      this.listaDisabled.alimentacion = false;
      this.listaDisabled.fisiologico.fisiologico = true;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = true;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = true;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = false;
      this.listaDisabled.perinatales = false;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = true;
      this.listaDisabled.funcionesBiologicas = true;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = false;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = false;

    } else if (_params == 4) {
      this.listaDisabled.general.gradoInstruccion = true;
      this.listaDisabled.general.alimentacion = true;
      this.listaDisabled.alimentacion = false;
      this.listaDisabled.fisiologico.fisiologico = true;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = true;
      this.listaDisabled.medicamento.medicamento = true;
      this.listaDisabled.medicamento.medicamentoFrecuente = true;
      this.listaDisabled.prenatales = false;
      this.listaDisabled.perinatales = false;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = true;
      this.listaDisabled.funcionesBiologicas = true;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = false;
      this.listaDisabled.valoracionGeriatrica = true;
      this.listaDisabled.categoriaAdulto = true;

    }
  }

  private Jsondelete(objArray) {
    // debugger
    let newArray: any[];
    let propNameArray = Object.keys(objArray);
    // if(objArray instanceof Object){

    // }

    //forma1
    for (let i = 0; i <= propNameArray.length; i++) {
      let propName = propNameArray[i];
      if (objArray[propName] == null || objArray[propName] == undefined) {
        delete objArray[propName];
      } else if (objArray[propName].length == 0) {
        delete objArray[propName];
      }
    }
    return objArray;
  }

  backto() {
    this.ds.sendData('regresar');
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-medica-ambulatoria']);
  }
}
