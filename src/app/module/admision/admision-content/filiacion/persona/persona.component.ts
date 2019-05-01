import { json } from './../../../../../shared/helpers/custom-validators/ng4-validators/json/validator';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiliacionService } from '../../../services/filiacion.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../../../shared/services/app.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  @Input() params;
  @Input() persona;
  @Input() disabled;
  @Output() regresar = new EventEmitter<any>();

  private tipoDocumentos: any[] = [];
  private sexosList: any[] = [];
  private estadoCivilList: any[] = [];
  private gradoInstruccionList: any[] = [];

  private parentescos: any[] = [];
  private checkboxDomicilio: boolean = false;
  private checkboxAcompanante: boolean = false;
  private apellidoPaternoHijo: any;
  private apellidoMaternoHijo: any;
  private fechaNacimientoHijo: any;
  private numeroHijo: number = null;
  private nombreRecienNacido: any;
  private codigoRecienNacido: any = "";
  private tipoPersona: any = null;
  private ubigeo: any = { codDepartamento: 0, codProvincia: 0 };

  //variables para guardar las listas de ubigeo
  private departamento: any[] = [];
  private provincia: any[] = [];
  private distrito: any[] = [];

  private departamentoNacimiento: any[] = [];
  private provinciaNacimiento: any[] = [];
  private distritoNacimiento: any[] = [];

  private departamentoDomicilio: any[] = [];
  private provinciaDomicilio: any[] = [];
  private distritoDomicilio: any[] = [];

  private jsRegistrar = {
    // idPersona:null,
    tipoDocumento: null,
    numeroDocumentoIdentidad: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    nombres: null,
    idSexo: null,
    descripcionSexo: null,
    fechaNacimiento: null,
    departamentoNacimiento: null,
    provinciaNacimiento: null,
    distritoNacimiento: null,
    gradoInstruccion: null,
    estadoCivil: null,
    estatura: null,
    fechInscripcion: null,
    nombrePadre: null,
    nombreMadre: null,
    fechExpedicion: null,
    restriccion: null,
    direccionDomicilio: null,
    departamentoDomicilio: null,
    provinciaDomicilio: null,
    distritoDomicilio: null,
    direccionActual: null,
    departamento: null,
    provincia: null,
    distrito: null,
    tipoPaciente: null,
    tipoDocumentoAcompanante: null,
    numeroDocumentoIdentidadAcompanante: null,
    nombreAcompanante: null,
    edadAcompanante: null,
    idParentescoAcompanante: null,
    telefonoMovilAcompanante: null,
    telefonoFijoAcompanante: null,
    domicilioAcompanante: null,
    tipoDocumentoRepresentanteLegal: null,
    numeroDocumentoIdentidadRepresentanteLegal: null,
    nombreRepresentanteLegal: null,
    edadRepresentanteLegal: null,
    idParentescoRepresentanteLegal: null,
    telefonoMovilRepresentanteLegal: null,
    telefonoFijoRepresentanteLegal: null,
    domicilioRepresentanteLegal: null,

    tipoDocumentoPadre: null,
    dniPadre: null,
    edadPadre: null,
    domicilioPadre: null,
    idEstadoCivil: null,
    telefonoFijo: null,
    telefonoMovil: null,
    email: null,
    codigoDepartamento: null,
    codigoProvincia: null,
    codigoDistrito: null
  };

  private disabledDomicilio: any = false;
  private disableRepLegal: any = false;

  //variables de entorno
  private labelPosition = 'before';
  // private minfecha: Date = new Date();
  private maxfechRN: Date = new Date();

  private longitudDocumento = "?";
  private longitudDocumento2 = "?";
  private longitudDocumento3 = "?";
  private longitudDocumento4 = "?";

  private numeroTelefonoFijo1 = [
    {
      "placeholder": "Télefono Fijo 1",
      "numTelefonoFijo": ""
    },
  ];
  private numeroTelefonoCelular1 = [
    {
      "placeholder": "Télefono Celular 1",
      "numTelefonoCelular": ""
    },
  ];
  private correos1 = [
    {
      "placeholder": "Correo 1",
      "correoEle1": ""
    },
  ];

  private numeroTelefonoFijo2 = [
    {
      "placeholder": "Télefono Fijo 1",
      "numTelefonoFijo": ""
    },
  ];
  private numeroTelefonoCelular2 = [
    {
      "placeholder": "Télefono Celular 1",
      "numTelefonoCelular": ""
    },
  ];
  private numeroTelefonoFijo3 = [
    {
      "placeholder": "Télefono Fijo 1",
      "numTelefonoFijo": ""
    },
  ];
  private numeroTelefonoCelular3 = [
    {
      "placeholder": "Télefono Celular 1",
      "numTelefonoCelular": ""
    },
  ];
  private DomicilioDirecciones = {
    direccion1: "",
    direccion2: "",
    direccion3: ""
  }
  private NacimientoDirecciones = {
    direccion1: "",
    direccion2: "",
    direccion3: ""
  }

  constructor(
    private _appService: AppService,
    private _filiacionService: FiliacionService,
    private toastr: ToastsManager
  ) {
    this.disableRepLegal = false;

    // let vari: any = this.minfecha.getFullYear();
    // this.minfecha.setFullYear(vari - 120);
  }

  ngOnInit() {
    this.getTipoDocumentos();
    this.getSexos();
    this.getEstadosCiviles();
    this.getGradoInstruccion();
    this.getParentescos();
    this.getUbigeoDepartamentoPromise();

    this.checkboxDomicilio = false;
    if (this.disabled.datoRecienNacido == false) {
      if (this.persona != null) {
        this.disabledDomicilio = false;
        this.jsRegistrar.direccionActual = this.persona[0].domicilioActual;
        this.jsRegistrar.telefonoFijo = this.persona[0].telefonoFijo;
        this.jsRegistrar.telefonoMovil = this.persona[0].telefonoMovil;
        this.jsRegistrar.email = this.persona[0].email;
        this.changeToArray();
        this.getDomicilioNacimiento();
        this.getDomicilioActual();
        if (this.persona[0].codigoUbigeo != null) {
          this.myFunction(true, true);
          this.disabledDomicilio = false;
        }
      }
    }
  }
  public getDomicilioNacimiento() {
    this.obtenerUbigeosAux(4).then(() => {
      this.obtenerUbigeosAux(5).then(() => {
        this.obtenerUbigeosAux(6)
      })
    })
  }
  public getDomicilioActual() {
    this.obtenerUbigeosAux(1).then(() => {
      this.obtenerUbigeosAux(2).then(() => {
        this.obtenerUbigeosAux(3)
      })
    })
  }
  obtenerUbigeosAux(num) {
    let ubigeo: any = { codigoDepartamento: 0, codigoProvincia: 0 };
    switch (num) {
      case 1: ubigeo = { codigoDepartamento: 0, codigoProvincia: 0 };
        break;
      case 2: ubigeo = { codigoDepartamento: this.persona[0].departamentoDomicilio, codigoProvincia: 0 };
        break;
      case 3: ubigeo = { codigoDepartamento: this.persona[0].departamentoDomicilio, codigoProvincia: this.persona[0].provinciaDomicilio };
        break;
      case 4: ubigeo = { codigoDepartamento: 0, codigoProvincia: 0 };
        break;
      case 5: ubigeo = { codigoDepartamento: this.persona[0].departamentoNacimiento, codigoProvincia: 0 };
        break;
      case 6: ubigeo = { codigoDepartamento: this.persona[0].departamentoNacimiento, codigoProvincia: this.persona[0].provinciaNacimiento };
        break;
      default:
        break;
    }
    let promise = new Promise((resolve, reject) => {
      this._appService.getUbigeos(ubigeo)
        .toPromise().then(data => {
          if (data.estado == 1) {
            switch (num) {
              case 1:
                this.departamentoDomicilio = data.ubigeoList;
                Object.keys(this.departamentoDomicilio).forEach(key => {
                  if (this.departamentoDomicilio[key]["id"] == this.persona[0]["departamentoDomicilio"]) {
                    this.DomicilioDirecciones.direccion1 = this.departamentoDomicilio[key]["nombre"]
                  }
                });
                break;
              case 2:
                this.provinciaDomicilio = data.ubigeoList;
                Object.keys(this.provinciaDomicilio).forEach(key => {
                  if (this.provinciaDomicilio[key]["id"] == this.persona[0]["provinciaDomicilio"]) {
                    this.DomicilioDirecciones.direccion2 = this.provinciaDomicilio[key]["nombre"]
                  }
                });
                break;
              case 3:
                this.distritoDomicilio = data.ubigeoList;
                Object.keys(this.distritoDomicilio).forEach(key => {
                  if (this.distritoDomicilio[key]["id"] == this.persona[0]["distritoDomicilio"]) {
                    this.DomicilioDirecciones.direccion3 = this.distritoDomicilio[key]["nombre"]
                  }
                });
                break;
                case 4:
                this.departamentoNacimiento = data.ubigeoList;
                Object.keys(this.departamentoNacimiento).forEach(key => {
                  if (this.departamentoNacimiento[key]["id"] == this.persona[0]["departamentoNacimiento"]) {
                    this.NacimientoDirecciones.direccion1 = this.departamentoNacimiento[key]["nombre"]
                  }
                });
                break;
              case 5:
                this.provinciaNacimiento = data.ubigeoList;
                Object.keys(this.provinciaNacimiento).forEach(key => {
                  if (this.provinciaNacimiento[key]["id"] == this.persona[0]["provinciaNacimiento"]) {
                    this.NacimientoDirecciones.direccion2 = this.provinciaNacimiento[key]["nombre"]
                  }
                });
                break;
              case 6:
                this.distritoNacimiento = data.ubigeoList;
                Object.keys(this.distritoNacimiento).forEach(key => {
                  if (this.distritoNacimiento[key]["id"] == this.persona[0]["distritoNacimiento"]) {
                    this.NacimientoDirecciones.direccion3 = this.distritoNacimiento[key]["nombre"]
                  }
                });
                break;

              default:
                break;
            }
          } else {
            this.toastr.error("Error en obtener Ubicaciones");
          }
          resolve();
        },
          err => {
            console.log(err)
          });
    })
    return promise;
  }
  changeToArray() {
    var array = this.jsRegistrar.telefonoFijo.split(",");
    var array2 = this.jsRegistrar.telefonoMovil.split(",");
    var array3 = this.jsRegistrar.email.split(",");
    this.numeroTelefonoFijo1 = []
    this.numeroTelefonoCelular1 = []
    this.correos1 = []
    for (let index = 0; index < array.length; index++) {
      let auxiliarFijo = {
        "placeholder": "Télefono Fijo " + (index + 1),
        "numTelefonoFijo": array[index]
      }
      this.numeroTelefonoFijo1.push(auxiliarFijo);
    }

    for (let index = 0; index < array2.length; index++) {
      let auxiliarCelular = {
        "placeholder": "Télefono Celular " + (index + 1),
        "numTelefonoCelular": array2[index]
      }
      this.numeroTelefonoCelular1.push(auxiliarCelular);
    }

    for (let index = 0; index < array3.length; index++) {
      let auxiliarCorreos = {
        "placeholder": "Correo " + (index + 1),
        "correoEle1": array3[index]
      }
      this.correos1.push(auxiliarCorreos);
    }
  }
  private agregarTelefono(num) {

    switch (num) {
      case 1:
        let longitud = this.numeroTelefonoFijo1.length;
        let json = {
          "placeholder": "Télefono Fijo: " + (longitud + 1),
          "numTelefonoFijo": "",
        };
        this.numeroTelefonoFijo1.push(json)
        break;

      case 2:
        let longitud2 = this.numeroTelefonoCelular1.length;
        let json2 = {
          "placeholder": "Télefono Celular: " + (longitud2 + 1),
          "numTelefonoCelular": "",
        };
        this.numeroTelefonoCelular1.push(json2)
        break;

      case 3:
        let longitud3 = this.correos1.length;
        let json3 = {
          "placeholder": "Correo: " + (longitud3 + 1),
          "correoEle1": "",
        };
        this.correos1.push(json3)
        break;

      case 4:
        let longitud4 = this.numeroTelefonoCelular2.length;
        let json4 = {
          "placeholder": "Télefono Celular: " + (longitud4 + 1),
          "numTelefonoCelular": "",
        };
        this.numeroTelefonoCelular2.push(json4)
        break;

      case 5:
        let longitud5 = this.numeroTelefonoFijo2.length;
        let json5 = {
          "placeholder": "Télefono Fijo: " + (longitud5 + 1),
          "numTelefonoFijo": "",
        };
        this.numeroTelefonoFijo2.push(json5)
        break;

      case 6:
        let longitud6 = this.numeroTelefonoCelular3.length;
        let json6 = {
          "placeholder": "Télefono Celular: " + (longitud6 + 1),
          "numTelefonoCelular": "",
        };
        this.numeroTelefonoCelular3.push(json6)
        break;

      case 7:
        let longitud7 = this.numeroTelefonoFijo3.length;
        let json7 = {
          "placeholder": "Télefono Fijo: " + (longitud7 + 1),
          "numTelefonoFijo": "",
        };
        this.numeroTelefonoFijo3.push(json7)
        break;
    }

  }
  private deleteTelefono(num) {
    switch (num) {
      case 1:
        if (this.numeroTelefonoFijo1.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoFijo1.pop();
        break;

      case 2:
        if (this.numeroTelefonoCelular1.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoCelular1.pop();
        break;

      case 3:
        if (this.correos1.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.correos1.pop();
        break;

      case 4:
        if (this.numeroTelefonoCelular2.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoCelular2.pop();
        break;

      case 5:
        if (this.numeroTelefonoFijo2.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoFijo2.pop();
        break;

      case 6:
        if (this.numeroTelefonoCelular3.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoCelular3.pop();
        break;

      case 7:
        if (this.numeroTelefonoFijo3.length === 1) {
          this.toastr.error("No se puede eliminar todos los campos")
          return;
        }
        this.numeroTelefonoFijo3.pop();
        break;

    }
  }
  private concatenarTodo() {
    let numerosTelefonoFijo1 = []
    this.numeroTelefonoFijo1.forEach(element => {
      if (element.numTelefonoFijo === "" || element.numTelefonoFijo == null || element.numTelefonoFijo == undefined) {
        return;
      }
      numerosTelefonoFijo1.push(element.numTelefonoFijo)
    });
    this.jsRegistrar.telefonoFijo = numerosTelefonoFijo1.toString();

    let numerosTelefonoCelular1 = []
    this.numeroTelefonoCelular1.forEach(element => {
      if (element.numTelefonoCelular === "" || element.numTelefonoCelular == null || element.numTelefonoCelular == undefined) {
        return;
      }
      numerosTelefonoCelular1.push(element.numTelefonoCelular)
    });
    this.jsRegistrar.telefonoMovil = numerosTelefonoCelular1.toString();

    let correosElectronicos = []
    this.correos1.forEach(element => {
      if (element.correoEle1 === "" || element.correoEle1 == null || element.correoEle1 == undefined) {
        return;
      }
      correosElectronicos.push(element.correoEle1)
    });
    this.jsRegistrar.email = correosElectronicos.toString();

    let numerosTelefonoFijo2 = []
    this.numeroTelefonoFijo2.forEach(element => {
      if (element.numTelefonoFijo === "" || element.numTelefonoFijo == null || element.numTelefonoFijo == undefined) {
        return;
      }
      numerosTelefonoFijo2.push(element.numTelefonoFijo)
    });
    this.jsRegistrar.telefonoFijoAcompanante = numerosTelefonoFijo2.toString();


    let numerosTelefonoCelular2 = []
    this.numeroTelefonoCelular2.forEach(element => {
      if (element.numTelefonoCelular === "" || element.numTelefonoCelular == null || element.numTelefonoCelular == undefined) {
        return;
      }
      numerosTelefonoCelular2.push(element.numTelefonoCelular)
    });
    this.jsRegistrar.telefonoMovilAcompanante = numerosTelefonoCelular2.toString();

    let numerosTelefonoFijo3 = []
    this.numeroTelefonoFijo3.forEach(element => {
      if (element.numTelefonoFijo === "" || element.numTelefonoFijo == null || element.numTelefonoFijo == undefined) {
        return;
      }
      numerosTelefonoFijo3.push(element.numTelefonoFijo)
    });
    this.jsRegistrar.telefonoFijoRepresentanteLegal = numerosTelefonoFijo3.toString();

    let numerosTelefonoCelular3 = []
    this.numeroTelefonoCelular3.forEach(element => {
      if (element.numTelefonoCelular === "" || element.numTelefonoCelular == null || element.numTelefonoCelular == undefined) {
        return;
      }
      numerosTelefonoCelular3.push(element.numTelefonoCelular)
    });
    this.jsRegistrar.telefonoMovilRepresentanteLegal = numerosTelefonoCelular3.toString();

  }
  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
      this.jsRegistrar.numeroDocumentoIdentidad = null;
    }
    if (tipoDoc == 1) {
      this.longitudDocumento = '8';
    }
    if (tipoDoc == 2) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 3) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 4) {
      this.longitudDocumento = '15';
    }
  }
  private getTipoDocumentos() {
    this._appService.getTipoDocumentos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.tipoDocumentos = data.tipoDocumentoList;
            //console.log(this.tipoDocumentos);
          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  private getSexos() {
    this._appService.getSexos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.sexosList = data.sexoList;
            //console.log(this.tipoDocumentos);
          } else if (data.estado == 0) {
            this.toastr.warning(data.mensaje);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  private getEstadosCiviles() {
    this._appService.getEstadosCiviles()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.estadoCivilList = data.estadoCivilList;
          } else if (data.estado == 0) {
            this.toastr.warning(data.mensaje);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  private getGradoInstruccion() {
    this._appService.getGradoInstruccion()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.gradoInstruccionList = data.gradoInstruccionList;
            //console.log(this.gradoInstruccionList);
          } else if (data.estado == 0) {
            this.toastr.warning(data.mensaje);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  private getParentescos() {
    this._appService.getParentescos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.parentescos = data.parentescoList;
            //console.log(this.parentescos);
          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  private getUbigeoDepartamentoPromise() {
    let promise = new Promise((resolve, reject) => {
      this._appService.getUbigeos(this.ubigeo)
        .toPromise().then(
          data => {
            if (data.estado == 1) {
              this.departamento = data.ubigeoList;
              this.departamentoNacimiento = data.ubigeoList;
              this.departamentoDomicilio = data.ubigeoList;
            } else if (data.estado == 0) {
              console.log(data.mensaje);
            } else {
              console.log(data.mensaje);
            }
            resolve();
          },
          err => {
            console.log(err)
          });
    })
    return promise;
  }

  private obtenerUbigeo(param) {
    if (param == 1) this.jsRegistrar.provinciaNacimiento = null;
    if (param == 2) this.jsRegistrar.provinciaDomicilio = null;
    if (param == 3) this.jsRegistrar.codigoProvincia = null;

    this.obtenerUbigeos(param).then();
  }

  private obtenerUbigeos(param) {
    // debugger
    let ubigeo: any = { codigoDepartamento: 0, codigoProvincia: 0 };
    if (param == 1) {
      ubigeo.codigoDepartamento = this.jsRegistrar.departamentoNacimiento;
      ubigeo.codigoProvincia = this.jsRegistrar.provinciaNacimiento;
    } else if (param == 2) {
      ubigeo.codigoDepartamento = this.jsRegistrar.departamentoDomicilio;
      ubigeo.codigoProvincia = this.jsRegistrar.provinciaDomicilio;
    } else if (param == 3) {
      ubigeo.codigoDepartamento = this.jsRegistrar.codigoDepartamento;
      ubigeo.codigoProvincia = this.jsRegistrar.codigoProvincia;
    }
    let promise = new Promise((resolve, reject) => {
      this._appService.getUbigeos(ubigeo)
        .toPromise().then(data => {
          if (data.estado == 1) {
            // debugger
            if (param == 1) {
              //ubigeo de Nacimiento:
              if (this.jsRegistrar.departamentoNacimiento == null && this.jsRegistrar.provinciaNacimiento == null) {
                this.departamentoNacimiento = data.ubigeoList;
                this.provinciaNacimiento = null;
                this.jsRegistrar.provinciaNacimiento = null;
                this.distritoNacimiento = null;
                this.jsRegistrar.distritoNacimiento = null;
              } else if (this.jsRegistrar.departamentoNacimiento != null && this.jsRegistrar.provinciaNacimiento == null) {
                this.provinciaNacimiento = data.ubigeoList;
                this.distritoNacimiento = null;
                this.jsRegistrar.distritoNacimiento = null;
              } else if (this.jsRegistrar.departamentoNacimiento != null && this.jsRegistrar.provinciaNacimiento != null) {
                this.distritoNacimiento = data.ubigeoList;
              }
            } else if (param == 2) {
              // obtener ubigeos para Domicilio
              if (this.jsRegistrar.departamentoDomicilio == null && this.jsRegistrar.provinciaDomicilio == null) {
                this.departamentoDomicilio = data.ubigeoList;
                this.provinciaDomicilio == null;
                this.jsRegistrar.provinciaDomicilio = null;
                this.distritoDomicilio = null;
                this.jsRegistrar.distritoDomicilio = null;
              } else if (this.jsRegistrar.departamentoDomicilio != null && this.jsRegistrar.provinciaDomicilio == null) {
                this.provinciaDomicilio = data.ubigeoList;
                this.distritoDomicilio = null;
                this.jsRegistrar.distritoDomicilio = null;
              } else if (this.jsRegistrar.departamentoDomicilio != null && this.jsRegistrar.provinciaDomicilio != null) {
                this.distritoDomicilio = data.ubigeoList;
              }
            } else if (param == 3) {
              // obtener ubigeos para Domicilio direccion actual
              if (this.jsRegistrar.codigoDepartamento == null && this.jsRegistrar.codigoProvincia == null) {
                this.departamento = data.ubigeoList;
                this.provincia = null;
                this.jsRegistrar.codigoProvincia = null;
                this.distrito = null;
                this.jsRegistrar.codigoDistrito = null;
              } else if (this.jsRegistrar.codigoDepartamento != null && this.jsRegistrar.codigoProvincia == null) {
                this.provincia = data.ubigeoList;
                this.distrito = null;
                this.jsRegistrar.codigoDistrito = null;
              } else if (this.jsRegistrar.codigoDepartamento != null && this.jsRegistrar.codigoProvincia != null) {
                this.distrito = data.ubigeoList;
                // this.jsRegistrar.codigoDistrito = (this.persona != null) ? this.persona[0].codigoDistrito : this.jsRegistrar.distritoDomicilio;
              }
            }
          } else {
            this.toastr.error("Error en obtenerUbigeos" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.log(err)
          });
    })
    return promise;
  }

  public myFunction(value: boolean, option: boolean) {
    if (value) {
      this.jsRegistrar.codigoDepartamento = (this.persona) ? this.persona[0].codigoUbigeo.substring(0, 2) : this.jsRegistrar.departamentoDomicilio;
      this.obtenerUbigeos(3).then(() => {
        this.jsRegistrar.codigoProvincia = (this.persona) ? this.persona[0].codigoUbigeo.substring(2, 4) : this.jsRegistrar.provinciaDomicilio;
        this.obtenerUbigeos(3).then(() => {
          this.jsRegistrar.codigoDistrito = (this.persona) ? this.persona[0].codigoUbigeo.substring(4, 6) : this.jsRegistrar.distritoDomicilio;
          this.obtenerUbigeos(3).then();
        });
        
      });
      this.disabledDomicilio = true;
      this.jsRegistrar.direccionActual = (this.persona) ? this.persona[0].domicilioActual : this.jsRegistrar.direccionDomicilio;
    }
    else {
      this.disabledDomicilio = false;
      this.jsRegistrar.direccionActual = null;
      this.jsRegistrar.codigoDepartamento = null;
      this.jsRegistrar.codigoProvincia = null;
      this.jsRegistrar.codigoDistrito = null;
      this.provincia = null;
      this.distrito = null;
    }
  }

  private myFunction2(value: boolean) {
    if (value) {
      this.disableRepLegal = true;
      this.jsRegistrar.tipoDocumentoRepresentanteLegal = this.jsRegistrar.tipoDocumentoAcompanante;
      this.jsRegistrar.numeroDocumentoIdentidadRepresentanteLegal = this.jsRegistrar.numeroDocumentoIdentidadAcompanante;
      this.jsRegistrar.nombreRepresentanteLegal = this.jsRegistrar.nombreAcompanante;
      this.jsRegistrar.edadRepresentanteLegal = this.jsRegistrar.edadAcompanante;
      this.jsRegistrar.idParentescoRepresentanteLegal = this.jsRegistrar.idParentescoAcompanante;
      this.jsRegistrar.domicilioRepresentanteLegal = this.jsRegistrar.domicilioAcompanante;
      this.longitudDocumento3 = this.longitudDocumento2;

      this.numeroTelefonoFijo3 = this.numeroTelefonoFijo2;
      this.numeroTelefonoCelular3 = this.numeroTelefonoCelular2;
      // this.jsRegistrar.telefonoMovilRepresentanteLegal = this.jsRegistrar.telefonoMovilAcompanante;
      // this.jsRegistrar.telefonoFijoRepresentanteLegal = this.jsRegistrar.telefonoFijoAcompanante;
    }
    else {
      this.disableRepLegal = false;
      this.jsRegistrar.tipoDocumentoRepresentanteLegal = null;
      this.jsRegistrar.numeroDocumentoIdentidadRepresentanteLegal = null;
      this.jsRegistrar.nombreRepresentanteLegal = null;
      this.jsRegistrar.edadRepresentanteLegal = null;
      this.jsRegistrar.idParentescoRepresentanteLegal = null;
      this.jsRegistrar.domicilioRepresentanteLegal = null;
      this.longitudDocumento3 = "?";
      this.numeroTelefonoFijo3 = [
        {
          "placeholder": "Télefono Fijo 1",
          "numTelefonoFijo": ""
        },
      ];
      this.numeroTelefonoCelular3 = [
        {
          "placeholder": "Télefono Celular 1",
          "numTelefonoCelular": ""
        },
      ];
      // this.jsRegistrar.telefonoMovilRepresentanteLegal = null;
      // this.jsRegistrar.telefonoFijoRepresentanteLegal = null;
    }
  }


  private insertarPaciente(_ngGroup: any) {
    // if (isInvalid(_ngGroup)) {
    //   return;
    // }

    this.concatenarTodo();
    let llave: any;
    let params: any;
    params = Object.keys(this.jsRegistrar).every(cv => {
      llave = cv;
      return this.jsRegistrar[cv] != null || this.jsRegistrar[cv] != 0
    })

    if (params == false) {
      this.toastr.warning("Debe llennar Campo" + llave);
      return;
    }
    if (this.disabled.datoRecienNacido == true) {
      this.checkboxAcompanante == false;
      // this.myFunction2();

      // this.jsRegistrar.direccionActual = this.persona[0].domicilio;
      // this.jsRegistrar.departamento = this.persona[0].codigoDepartamento;
      // this.jsRegistrar.provincia = this.persona[0].codigoProvincia;
      // this.jsRegistrar.distrito = this.persona[0].codigoDistrito;
      this.jsRegistrar.numeroDocumentoIdentidad = this.codigoRecienNacido;
      this.jsRegistrar.tipoDocumento = this.persona[0].tipoDocumento;
      this.jsRegistrar.nombres = this.nombreRecienNacido;
      this.jsRegistrar.apellidoPaterno = this.apellidoPaternoHijo;
      this.jsRegistrar.apellidoMaterno = this.apellidoMaternoHijo;
      this.jsRegistrar.fechaNacimiento = this.fechaNacimientoHijo;
      this.jsRegistrar.idEstadoCivil = Number(this.jsRegistrar.idEstadoCivil)
    } else if (this.persona != null) {
      this.jsRegistrar.tipoDocumento = this.persona[0].tipoDocumento;

      Object.keys(this.jsRegistrar).forEach(cv => this.jsRegistrar[cv] = ((this.persona[0])[cv]) ? (this.persona[0])[cv] : this.jsRegistrar[cv]);

      this.jsRegistrar.idSexo = Number(this.persona[0].sexo);
      this.jsRegistrar.direccionDomicilio = this.persona[0].domicilio;
      this.jsRegistrar.fechExpedicion = this.persona[0].fecExpedicion;
      this.jsRegistrar.fechInscripcion = this.persona[0].fecInscripcion;
    }
    this.jsRegistrar.departamento = this.jsRegistrar.codigoDepartamento;
    this.jsRegistrar.provincia = this.jsRegistrar.codigoProvincia;
    this.jsRegistrar.distrito = this.jsRegistrar.codigoDistrito;

    let request: any = { paciente: null }
    request.paciente = this.jsRegistrar;
    request.paciente.codigoUbigeo = this.jsRegistrar.codigoDepartamento + "" + this.jsRegistrar.codigoProvincia + "" + this.jsRegistrar.codigoDistrito;
    this._filiacionService.postPaciente(request)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje)
            this.regresaFiliacion()
          } else if (data.estado == 0) {
            this.toastr.warning("Documento de Identidad ya registrado")
          } else {
            this.toastr.warning("Documento de Identidad ya registrado")
          }
        },
        err => {
          console.log(err)
        });
  }

  actualizar(_ngGroup) {
    if (isInvalid(_ngGroup)) {
      return;
    }
    this.concatenarTodo();
    this.jsRegistrar.numeroDocumentoIdentidad = this.persona[0].idPersona;
    this.remove(this.jsRegistrar);
    let request: any = { paciente: null }
    request.paciente = this.jsRegistrar;
    request.paciente.codigoUbigeo = this.jsRegistrar.codigoDepartamento + "" + this.jsRegistrar.codigoProvincia + "" + this.jsRegistrar.codigoDistrito;
    console.log(request);
    this._filiacionService.actulizarPaciente(request)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje)
            this.regresaFiliacion();
          } else if (data.estado == 0) {
            this.toastr.warning(data.mensaje)
          } else {
            this.toastr.error(data.mensaje)
          }
        },
        err => {
          console.log(err)
        });
  }


  private setearNombre() {
    this.nombreRecienNacido = "RN0" + "" + this.numeroHijo;
    this.codigoRecienNacido = this.params.tipoDocumentoIdentidad + "" + this.params.numeroDocumentoIdentidad + "" + "0" + "" + this.numeroHijo;
  }
  private regresaFiliacion() {
    this.regresar.emit(false);
  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  remove(variable) {
    // debugger
    //cuando es un json
    if (variable.length == undefined) {
      //recorrer un json
      Object.keys(variable).forEach(key => {
        // debugger
        if (variable[key] !== null) {
          //comprueba si la siguiente propiedad es un arreglo
          // console.log(variable[key]);
          // console.log(variable[key].length);
          if (variable[key].length === undefined) {
            this.remove(variable[key]);
          }
        } else {
          delete variable[key];
        }

      });
      //cuando es un arreglo
    } else {
      Object.keys(variable).forEach(key => {
        this.remove(variable[key]);
      })
    }
  }

  private validatipoDoc(num) {
    if (num == 1) {
      if (this.jsRegistrar.tipoDocumentoAcompanante != null && this.jsRegistrar.tipoDocumentoAcompanante != 0 && this.jsRegistrar.tipoDocumentoAcompanante != undefined) {

        if (this.jsRegistrar.tipoDocumentoAcompanante == 1) {
          this.longitudDocumento2 = '8';
        }
        if (this.jsRegistrar.tipoDocumentoAcompanante == 2) {
          this.longitudDocumento2 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoAcompanante == 3) {
          this.longitudDocumento2 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoAcompanante == 4) {
          this.longitudDocumento2 = '15';
        }

      } else if (this.jsRegistrar.tipoDocumentoAcompanante == undefined || this.jsRegistrar.tipoDocumentoAcompanante == null) {
        this.jsRegistrar.numeroDocumentoIdentidadAcompanante = null;
        this.longitudDocumento3 = "?";
      }
    }
    else if (num == 2) {
      if (this.jsRegistrar.tipoDocumentoRepresentanteLegal != null && this.jsRegistrar.tipoDocumentoRepresentanteLegal != 0 && this.jsRegistrar.tipoDocumentoRepresentanteLegal != undefined) {

        if (this.jsRegistrar.tipoDocumentoRepresentanteLegal == 1) {
          this.longitudDocumento3 = '8';
        }
        if (this.jsRegistrar.tipoDocumentoRepresentanteLegal == 2) {
          this.longitudDocumento3 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoRepresentanteLegal == 3) {
          this.longitudDocumento3 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoRepresentanteLegal == 4) {
          this.longitudDocumento3 = '15';
        }

      } else if (this.jsRegistrar.tipoDocumentoRepresentanteLegal == undefined || this.jsRegistrar.tipoDocumentoRepresentanteLegal == null) {
        this.jsRegistrar.numeroDocumentoIdentidadRepresentanteLegal = null;
        this.longitudDocumento3 = "?";
      }
    }
    else if (num == 3) {
      if (this.jsRegistrar.tipoDocumentoPadre != null && this.jsRegistrar.tipoDocumentoPadre != 0 && this.jsRegistrar.tipoDocumentoPadre != undefined) {

        if (this.jsRegistrar.tipoDocumentoPadre == 1) {
          this.longitudDocumento4 = '8';
        }
        if (this.jsRegistrar.tipoDocumentoPadre == 2) {
          this.longitudDocumento4 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoPadre == 3) {
          this.longitudDocumento4 = '12';
        }
        if (this.jsRegistrar.tipoDocumentoPadre == 4) {
          this.longitudDocumento4 = '15';
        }

      } else if (this.jsRegistrar.tipoDocumentoPadre == undefined || this.jsRegistrar.tipoDocumentoPadre == null) {
        this.jsRegistrar.dniPadre = null;
        this.longitudDocumento4 = "?";
      }
    }
  }
}
