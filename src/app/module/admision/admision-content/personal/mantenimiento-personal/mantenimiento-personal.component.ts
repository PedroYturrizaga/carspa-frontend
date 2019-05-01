import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../../../shared/services/app.service';
import { PersonalService } from '../../../services/personal.service';
import { ActividadPersonalDeleteComponent } from './actividad-personal-delete/actividad-personal-delete.component';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { DataService } from '../../../../../shared/services/data.service';
import { reject } from 'q';

@Component({
  selector: 'app-mantenimiento-personal',
  templateUrl: './mantenimiento-personal.component.html',
  styleUrls: ['./mantenimiento-personal.component.scss']
})
export class MantenimientoPersonalComponent implements OnInit {
  // @Input() idPersonal;
  @Output() regresa = new EventEmitter<boolean>();
  private idPersonal;
  private fechaFiltro = "";
  private tamDoc: any = "?";
  private feNacimiento: Date;
  private options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  /*variable para el request de personal   */
  private personalRequest = {
    idPersonal: null,
    codigoPersonal: null,
    numeroDocuentoIdentidad: null,
    numeroCmp: null,
    numeroRne: null,
    apellidoPaternoPersonal: null,
    apellidoMaternoPersonal: null,
    nombrePersonal: null,
    feNacimiento: null,
    lugarNacimiento: null,
    personalDestacado: null,
    maximoHorasNormales: null,
    maximoHorasExtras: null,
    maximoHorasExtrasDia: null,
    tipoStaff: null,
    direccion: null,
    telefonoFijo: null,
    telefonoMovil: null,
    email: null,
    ruc: null,
    cuposAdicionales: null,
    idCondicionPersonal: null,
    idSexo: null,
    idEstadoCivil: null,
    idTipoDocumentoIdentidad: null,
    idGrupoOcupacional: null,
    codigoUbigeo: null,
    idTipoProfesional: null,
    tiempoPromedioAtencion: null
  };
  private personalRequest2 = {
    idPersonal: null,
    codigoPersonal: null,
    numeroDocuentoIdentidad: null,
    numeroCmp: null,
    numeroRne: null,
    apellidoPaternoPersonal: null,
    apellidoMaternoPersonal: null,
    nombrePersonal: null,
    feNacimiento: null,
    lugarNacimiento: null,
    personalDestacado: null,
    maximoHorasNormales: null,
    maximoHorasExtras: null,
    maximoHorasExtrasDia: null,
    tipoStaff: null,
    direccion: null,
    telefonoFijo: null,
    telefonoMovil: null,
    email: null,
    ruc: null,
    cuposAdicionales: null,
    idCondicionPersonal: null,
    idSexo: null,
    idEstadoCivil: null,
    idTipoDocumentoIdentidad: null,
    idGrupoOcupacional: null,
    codigoUbigeo: null,
    idTipoProfesional: null,
    tiempoPromedioAtencion: null
  };

  private actividadesPersonalRequest = {
    idPersonal: null,
    idArea: null,
    idEspecialidad: null,
    idActividad: null,
    idGrupoOcupacional: null
  };
  private condicionPersonal: any[] = [];
  private tipoDocumentos: any[] = [];
  private tipoProfesional: any[] = [];
  private estadosCiviles: any[] = [];
  private sexos: any[] = [];
  private departamentos: any[] = [];
  private provincias: any[] = [];
  private distritos: any[] = [];
  private grupoOcupacional: any[] = [];
  private areas: any[] = [];
  private especialidades: any[] = [];
  private actividades: any[] = [];
  private actividadesPersonal: any[] = [];
  /*variable para pasar los requestparam*/
  private paramUbigeo = { codigoDepartamento: null, codigoProvincia: null };
  /*variables para concatenacion de ubigeo*/
  private codDepartamento: string = null;
  private codProvincia: string = null;
  private codDistrito: string = null;
  private noEspecialidad: any[] = [];
  private noActividad: any[] = [];
  private flbotones: boolean = true;

  constructor(private _appService: AppService, private _personalService: PersonalService, private toastr: ToastsManager, private route: ActivatedRoute, private location: Location, private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService) {
    this._route.queryParams.subscribe(params => {
      this.idPersonal = params["idPersonal"];
    });
    // this.feNacimiento = new Date();
  }
  /**
   * Agregar personal
   */
  private agregarPersonal(_ngForm: any) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.personalRequest.feNacimiento = ((this.feNacimiento).toLocaleDateString('es-PE', options)).split('/').join('-');
    // if (this.personalRequest.idGrupoOcupacional != 1) {
    //   this.personalRequest.numeroCmp = null;
    //   this.personalRequest.numeroRne = null;

    // }
    this.personalRequest.codigoUbigeo = this.codDepartamento + this.codProvincia + this.codDistrito;
    this._personalService.agregarPersonal(this.personalRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Personal");
          this.sendData();
        } else if (data.estado == 0 && data.confirmacion.id == 0) {
          this.toastr.warning(data.mensaje, "Personal");
        }
      },
        err => {
          console.log(err);
        },
        () => {
          console.log("completado");

        });
  }
  /**actualizar personal */
  private actualizarPersonal() {
    this.personalRequest.codigoUbigeo = this.codDepartamento + this.codProvincia + this.codDistrito;
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.personalRequest.feNacimiento = ((this.feNacimiento).toLocaleDateString('es-PE', options)).split('/').join('-');

    let miPath: any;
    miPath = this.route.params.subscribe(params => {
      this.idPersonal = params["idPersonal"];
    });

    if (this.personalRequest.idTipoDocumentoIdentidad == null || this.personalRequest.numeroDocuentoIdentidad == ""
      || this.personalRequest.apellidoPaternoPersonal == "" || this.personalRequest.apellidoMaternoPersonal == "" ||
      this.personalRequest.nombrePersonal == "" || this.personalRequest.idEstadoCivil == null || this.personalRequest.feNacimiento == "" ||
      this.personalRequest.idSexo == null || this.personalRequest.personalDestacado == null || this.personalRequest.tipoStaff == null || this.personalRequest.idCondicionPersonal == null
      || this.personalRequest.idTipoProfesional == null || this.personalRequest.idGrupoOcupacional == null) {
      this.toastr.error("debe llenar los campos obligatorios", "Mantenimiento Personal");
      return;
    }

    // if (this.personalRequest.idGrupoOcupacional != 1) {
    //   this.personalRequest.numeroCmp = "";
    //   this.personalRequest.numeroRne = "";
    // }

    if (this.personalRequest.apellidoMaternoPersonal == this.personalRequest2.apellidoMaternoPersonal &&
      this.personalRequest.apellidoPaternoPersonal == this.personalRequest2.apellidoPaternoPersonal &&
      this.personalRequest.codigoPersonal == this.personalRequest2.codigoPersonal &&
      this.personalRequest.codigoUbigeo == this.personalRequest2.codigoUbigeo &&
      this.personalRequest.cuposAdicionales == this.personalRequest2.cuposAdicionales &&
      this.personalRequest.direccion == this.personalRequest2.direccion &&
      this.personalRequest.email == this.personalRequest2.email &&
      this.personalRequest.feNacimiento == this.personalRequest2.feNacimiento &&
      this.feNacimiento == this.personalRequest.feNacimiento &&
      this.personalRequest.idCondicionPersonal == this.personalRequest2.idCondicionPersonal &&
      this.personalRequest.idEstadoCivil == this.personalRequest2.idEstadoCivil &&
      this.personalRequest.idGrupoOcupacional == this.personalRequest2.idGrupoOcupacional &&
      this.personalRequest.idSexo == this.personalRequest2.idSexo &&
      this.personalRequest.idTipoDocumentoIdentidad == this.personalRequest2.idTipoDocumentoIdentidad &&
      this.personalRequest.idTipoProfesional == this.personalRequest2.idTipoProfesional &&
      this.personalRequest.lugarNacimiento == this.personalRequest2.lugarNacimiento &&
      this.personalRequest.maximoHorasExtras == this.personalRequest2.maximoHorasExtras &&
      this.personalRequest.maximoHorasExtrasDia == this.personalRequest2.maximoHorasExtrasDia &&
      this.personalRequest.maximoHorasNormales == this.personalRequest2.maximoHorasNormales &&
      this.personalRequest.nombrePersonal == this.personalRequest2.nombrePersonal &&
      this.personalRequest.numeroCmp == this.personalRequest2.numeroCmp &&
      this.personalRequest.numeroDocuentoIdentidad == this.personalRequest2.numeroDocuentoIdentidad &&
      this.personalRequest.numeroRne == this.personalRequest2.numeroRne &&
      this.personalRequest.personalDestacado == this.personalRequest2.personalDestacado &&
      this.personalRequest.ruc == this.personalRequest2.ruc &&
      this.personalRequest.telefonoFijo == this.personalRequest2.telefonoFijo &&
      this.personalRequest.telefonoMovil == this.personalRequest2.telefonoMovil &&
      this.personalRequest.tiempoPromedioAtencion == this.personalRequest2.tiempoPromedioAtencion &&
      this.personalRequest.tipoStaff == this.personalRequest2.tipoStaff.trim()) {
      this.toastr.error("No se a realizado ningun cambio", "Mantenimiento Personal");
      return;
    }

    if (this.idPersonal != "") {

      //this.personalRequest.idPersonal = this.idPersonal;

      this._personalService.actualizarPersonal(this.personalRequest)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje, "Personal");
            this.sendData();
          } else if (data.estado == 0 && data.confirmacion.id == 0) {
            this.toastr.warning(data.mensaje, "Personal");
          }
        },
          err => {
            console.log(err);
          },
          () => {
            console.log("completado");

          });
    }
  }
  /**
   * obtener personal por id para listar los campos
   */
  private getPersonalId() {

    // let miPath: any;
    // miPath = this.route.params.subscribe(params => {
    //   this.idPersonal = params["idPersonal"];
    // });
    this.flbotones = false;
    this.personalRequest.numeroDocuentoIdentidad = "";
    this.personalRequest.numeroCmp = "";
    this.personalRequest.numeroRne = "";
    this.personalRequest.apellidoPaternoPersonal = "";
    this.personalRequest.apellidoMaternoPersonal = "";
    this.personalRequest.nombrePersonal = "";
    this.personalRequest.feNacimiento = "";
    if (this.idPersonal != "") {

      let personal: any[] = [];
      this.flbotones = true;
      this._personalService.getPersonalId(this.idPersonal)
        .subscribe(data => {
          console.log(data);

          /*evaluacion del resultado de la peticion al servidor*/
          if (data.estado == 1) {
            personal = data.personalList;

            this.personalRequest.codigoPersonal = personal[0].codigoPersonal;
            this.personalRequest2.codigoPersonal = personal[0].codigoPersonal;

            this.personalRequest.nombrePersonal = personal[0].nombrePersonal;
            this.personalRequest2.nombrePersonal = personal[0].nombrePersonal;

            this.personalRequest.apellidoMaternoPersonal = personal[0].apellidoMaternoPersonal;
            this.personalRequest2.apellidoMaternoPersonal = personal[0].apellidoMaternoPersonal;

            this.personalRequest.apellidoPaternoPersonal = personal[0].apellidoPaternoPersonal;
            this.personalRequest2.apellidoPaternoPersonal = personal[0].apellidoPaternoPersonal;

            this.personalRequest.codigoUbigeo = personal[0].codigoUbigeo;
            this.personalRequest2.codigoUbigeo = personal[0].codigoUbigeo;

            this.personalRequest.idEstadoCivil = personal[0].idEstadoCivil;
            this.personalRequest2.idEstadoCivil = personal[0].idEstadoCivil;

            this.personalRequest.idCondicionPersonal = personal[0].idCondicionPersonal;
            this.personalRequest2.idCondicionPersonal = personal[0].idCondicionPersonal;

            this.personalRequest.idGrupoOcupacional = personal[0].idGrupoOcupacional;
            this.personalRequest2.idGrupoOcupacional = personal[0].idGrupoOcupacional;

            this.personalRequest.idSexo = personal[0].idSexo;
            this.personalRequest2.idSexo = personal[0].idSexo;

            this.personalRequest.idTipoDocumentoIdentidad = personal[0].idTipoDocumentoIdentidad;
            this.personalRequest2.idTipoDocumentoIdentidad = personal[0].idTipoDocumentoIdentidad;
            this.verificarTamanio(this.personalRequest.idTipoDocumentoIdentidad);

            this.personalRequest.codigoUbigeo = personal[0].codigoUbigeo;
            this.personalRequest2.codigoUbigeo = personal[0].codigoUbigeo;

            this.personalRequest.direccion = personal[0].direccion;
            this.personalRequest2.direccion = personal[0].direccion;

            this.personalRequest.feNacimiento = personal[0].feNacimiento;
            this.personalRequest2.feNacimiento = personal[0].feNacimiento;
            this.feNacimiento = new Date(this.personalRequest.feNacimiento);

            this.personalRequest.idPersonal = personal[0].idPersonal;
            this.personalRequest2.idPersonal = personal[0].idPersonal;

            this.personalRequest.numeroCmp = personal[0].numeroCmp;
            this.personalRequest2.numeroCmp = personal[0].numeroCmp;

            this.personalRequest.numeroDocuentoIdentidad = personal[0].numeroDocuentoIdentidad;
            this.personalRequest2.numeroDocuentoIdentidad = personal[0].numeroDocuentoIdentidad;

            this.personalRequest.numeroRne = personal[0].numeroRne;
            this.personalRequest2.numeroRne = personal[0].numeroRne;

            this.personalRequest.personalDestacado = personal[0].personalDestacado;
            this.personalRequest2.personalDestacado = personal[0].personalDestacado;

            this.personalRequest.tipoStaff = Number(personal[0].tipoStaff);
            this.personalRequest2.tipoStaff = personal[0].tipoStaff;

            this.personalRequest.lugarNacimiento = (personal[0].lugarNacimiento);
            this.personalRequest2.lugarNacimiento = (personal[0].lugarNacimiento);

            this.personalRequest.maximoHorasExtras = personal[0].maximoHorasExtras;
            this.personalRequest2.maximoHorasExtras = personal[0].maximoHorasExtras;

            this.personalRequest.maximoHorasExtrasDia = personal[0].maximoHorasExtrasDia;
            this.personalRequest2.maximoHorasExtrasDia = personal[0].maximoHorasExtrasDia;

            this.personalRequest.maximoHorasNormales = personal[0].maximoHorasNormales;
            this.personalRequest2.maximoHorasNormales = personal[0].maximoHorasNormales;

            this.personalRequest.cuposAdicionales = personal[0].cuposAdicionales;
            this.personalRequest2.cuposAdicionales = personal[0].cuposAdicionales;

            this.personalRequest.email = personal[0].email;
            this.personalRequest2.email = personal[0].email;

            this.personalRequest.ruc = personal[0].ruc;
            this.personalRequest2.ruc = personal[0].ruc;

            this.personalRequest.telefonoFijo = personal[0].telefonoFijo;
            this.personalRequest2.telefonoFijo = personal[0].telefonoFijo;

            this.personalRequest.telefonoMovil = personal[0].telefonoMovil;
            this.personalRequest2.telefonoMovil = personal[0].telefonoMovil;

            this.personalRequest.tiempoPromedioAtencion = personal[0].tiempoPromedioAtencion;
            this.personalRequest2.tiempoPromedioAtencion = personal[0].tiempoPromedioAtencion;

            this.personalRequest.idTipoProfesional = this.personalRequest.codigoPersonal.substr(-2);
            this.getGruposOcupacionales(this.personalRequest.idTipoProfesional);
            this.personalRequest2.idTipoProfesional = this.personalRequest.codigoPersonal.substr(-2);


            this.personalRequest.codigoUbigeo = personal[0].codigoUbigeo;
            this.getDepartamentos();
            this.codDepartamento = this.personalRequest.codigoUbigeo.substr(0, 2);
            this.getProvincias();
            this.codProvincia = this.personalRequest.codigoUbigeo.substr(2, 2);
            this.getDistritos();
            this.codDistrito = this.personalRequest.codigoUbigeo.substr(4, 2);

            this.personalRequest2.codigoUbigeo = personal[0].codigoUbigeo;
            this.getDepartamentos();
            this.codDepartamento = this.personalRequest2.codigoUbigeo.substr(0, 2);
            this.getProvincias();
            this.codProvincia = this.personalRequest2.codigoUbigeo.substr(2, 2);
            this.getDistritos();
            this.codDistrito = this.personalRequest2.codigoUbigeo.substr(4, 2);

            this.getAreasGrupoOcupacional();

          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else if (data.estado == -1) {
            console.log(data.mensaje);
          }
        },
          err => {
            console.log(err)
          });

    }
  }
  /**
   * obtiene condicion personal
   */
  private getCondicionPesonal() {
    this._personalService.getCondicionPersonal()
      .subscribe(data => {
        if (data.estado == 1) {
          this.condicionPersonal = data.condicionPersonaList;
        } else if (data.estado == 0) {
          console.log(data.mensaje);
        } else {
          console.log(data.mensaje);
        }
      },
        err => {
          console.log(err);
        });
  }
  /**
   *Lista tipos de documento
   */
  private getTipoDocumentos() {
    this._appService.getTipoDocumentos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.tipoDocumentos = data.tipoDocumentoList;
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
  /**
   * Lista tipo profesional
   */
  private getTipoProfesional() {
    this._personalService.getTipoProfesional()
      .subscribe(
        data => {
          console.log(data);
          if (data.estado == 1) {
            this.tipoProfesional = data.tipoProfesionalList;
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
  /**
   * Lista estados civiles 
   */
  private getEstadosCiviles() {
    this._appService.getEstadosCiviles()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.estadosCiviles = data.estadoCivilList;
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
  /**
   * Lista sexos
   */
  private getSexos() {
    this._appService.getSexos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.sexos = data.sexoList;
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

  /**
   * obtiene todos los departamentos
   */
  private getDepartamentos() {
    this.provincias = [];
    this.distritos = [];
    this.paramUbigeo.codigoDepartamento = null;
    this.paramUbigeo.codigoProvincia = null;
    this._appService.getUbigeos(this.paramUbigeo)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.departamentos = data.ubigeoList;
            this.provincias = [];
            this.distritos = [];
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
  /**
   * obtiene todos las provincias por departamento
   */
  private getProvincias() {
    this.provincias = [];
    this.distritos = [];
    this.paramUbigeo.codigoDepartamento = this.codDepartamento;
    this.paramUbigeo.codigoProvincia = null;
    this._appService.getUbigeos(this.paramUbigeo)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.provincias = data.ubigeoList;
            this.distritos = [];
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
  /**
   * obtiene los distritos por codigo de departamento y provincia
   */
  private getDistritos() {
    this.paramUbigeo.codigoDepartamento = this.codDepartamento;
    this.paramUbigeo.codigoProvincia = this.codProvincia;
    this._appService.getUbigeos(this.paramUbigeo)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.distritos = data.ubigeoList;
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
  /**
   * lista grupo ocupacional
   */


  private getGruposOcupacionales(codigo) {
    console.log(codigo);
    this._appService.getGruposOcupacionales(codigo)
      .subscribe(
        data => {
          console.log(data);
          
          if (data.estado == 1) {
            this.grupoOcupacional = data.grupoOcupacionalList;
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


  /**
   * Metodo para mandar nulo en caso el Grupo Ocupacional sea diferente de "Medico"
   */
  private olnyMedico() {
    if (this.personalRequest.idGrupoOcupacional != 1) {
      this.personalRequest.numeroCmp = "";
      this.personalRequest.numeroRne = "";
    }
  }
  /**
   * regresar a la ventana anterior
   */
  // private goBack(): void {
  //   // @this.location.back();
  //   // this._router.navigate([('principal/admision')]);
  //   let param: boolean;
  //   param = true;
  //   this.regresa.emit(param);
  //   this._router.navigate([('principal/admision/personal')]);
  // }

  /**
   * get areas
   */
  private getAreasGrupoOcupacional() {
    let idGrupoOcupacional = this.personalRequest.idGrupoOcupacional;

    if (idGrupoOcupacional != '') {
      this._personalService.getAreasGrupoOcupacional(idGrupoOcupacional).subscribe(
        data => {
          if (data.estado == 1) {
            this.areas = data.areaPorGrupoOcupacionalList;

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
  }
  /**
   * lista especialidades por area
   */
  private getEspecialidadesXArea() {
    let idArea = this.actividadesPersonalRequest.idArea;
    let idGrupoOcupacional = this.personalRequest.idGrupoOcupacional;
    this.especialidades = [];
    this.actividadesPersonalRequest.idEspecialidad = null;
    let deleteArry = this.noEspecialidad;
    if (idArea != null) {
      this._personalService.getEspecialidadesXArea(idGrupoOcupacional, idArea)
        .subscribe(data => {
          if (data.estado == 1) {
            this.especialidades = data.especialidadesList;

            let agregado: number = 0;
            for (let l of this.especialidades) {
              l.marca = agregado;
              agregado++;
            }

            for (let a = 0; a < this.noEspecialidad.length; a++) {
              for (let b = 0; b < this.especialidades.length; b++) {

                if (this.noEspecialidad[a].idEspecialidad == this.especialidades[b].idEspecialidad) {

                  if (this.especialidades[b].cantidadActividad == this.noEspecialidad[a].idActividad.length) {
                    this.especialidades.splice(this.especialidades[b].marca, 1);
                    agregado = 0;
                    for (let l of this.especialidades) {
                      l.marca = agregado;
                      agregado++;
                    }
                  }

                }
              }
            }

          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
          err => {
            console.log(err)
          });
    } else {
      this.especialidades = [];
      this.actividades = [];
      this.actividadesPersonalRequest.idEspecialidad = null;
      this.actividadesPersonalRequest.idActividad = null;
    }
  }

  private getActividadesXEspecialidadesXArea() {
    let idArea = this.actividadesPersonalRequest.idArea;
    let idEspecialidad = this.actividadesPersonalRequest.idEspecialidad;
    let idGrupoOcupacional = this.personalRequest.idGrupoOcupacional;
    this.actividades = [];
    this.actividadesPersonalRequest.idActividad = null;
    if (idEspecialidad != null) {
      this._personalService.getActividadXEspecialidadXArea(idGrupoOcupacional, idArea, idEspecialidad)
        .subscribe(data => {
          if (data.estado == 1) {
            this.actividades = data.actividadesList;
            let agregado: number = 0;

            for (let l of this.actividades) {
              l.marca = agregado;
              agregado++;
            }
            for (let f of this.noEspecialidad) {
              if (f.idEspecialidad == idEspecialidad) {
                for (let a = 0; a < f.idActividad.length; a++) {
                  for (let b = 0; b < this.actividades.length; b++) {
                    if (f.idActividad[a] == this.actividades[b].idActividad) {
                      this.actividades.splice(this.actividades[b].marca, 1);
                      agregado = 0;
                      for (let l of this.actividades) {
                        l.marca = agregado;
                        agregado++;
                      }
                    }
                  }
                }
              }
            }

          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
          err => {
            console.log(err)
          });
    } else {
      this.actividades = [];
      this.actividadesPersonalRequest.idActividad = null;
    }
  }
  private agregarActividadPersonal() {
    this.actividadesPersonalRequest.idPersonal = this.idPersonal;
    this.actividadesPersonalRequest.idGrupoOcupacional = this.personalRequest.idGrupoOcupacional;

    this._personalService.agregarActividadPersonal(this.actividadesPersonalRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Actividad  Personal");
          this.getActividadPersonal();
          this.especialidades = [];
          this.actividades = [];
          this.actividadesPersonalRequest.idArea = null;
          this.actividadesPersonalRequest.idEspecialidad = null;
          this.actividadesPersonalRequest.idActividad = null;
          this.getAreasGrupoOcupacional();
        } else if (data.estado == 0 && data.confirmacion.id == 0) {
          this.toastr.error(data.confirmacion.mensaje, "Actividad  Personal");
        }
      },
        err => {
          console.log(err);
        },
        () => { });
  }
  /**
   * eliminar actividad de personal
   */
  private modalActividadPersonalDelete(personal: string, actividad: number, area: number, especialidad: number, grupoOcupacional: number) {

    let actividadPersonal = {
      idPersonal: personal,
      idActividad: actividad,
      idArea: area,
      idEspecialidad: especialidad,
      idGrupoOcupacional: grupoOcupacional
    };

    const modalRef = this.modalService.open(ActividadPersonalDeleteComponent, { size: 'sm' });
    modalRef.componentInstance.actividadPersonalDel = actividadPersonal;

    modalRef.result.then((result) => {
      this.getActividadPersonal();
      this.actividadesPersonalRequest.idArea = null;
      this.actividadesPersonalRequest.idEspecialidad = null;
      this.actividadesPersonalRequest.idActividad = null;

    }, (reason) => {
      this.getActividadPersonal();
    });
  }

  private getActividadPersonal() {
    let idPers = this.idPersonal;
    if (idPers != '') {
      this._personalService.getActividadPersonal(idPers).subscribe(
        data => {
          if (data.estado == 1) {
            this.actividadesPersonal = data.actividadPersonalList;
            this.noEspecialidad = [];
            for (let a of this.actividadesPersonal) {
              let hay: number = 0;
              if (this.noEspecialidad.length != 0) {
                for (let c of this.noEspecialidad) {
                  if (c.idEspecialidad == a.idEspecialidad) {
                    hay = 1;
                  }
                }
              }

              if (hay == 0) {
                let jsonGrande: any = { idEspecialidad: null, idActividad: null };
                let actividades: any[] = [];

                for (let b of this.actividadesPersonal) {
                  if (a.idEspecialidad == b.idEspecialidad) {
                    actividades.push(b.idActividad);
                  }
                }
                jsonGrande.idEspecialidad = a.idEspecialidad;
                jsonGrande.idActividad = actividades;
                this.noEspecialidad.push(jsonGrande);
              }

              a.delete = "";
              if (a.flg_delete == 1) {
                a.delete = "matardisabled";
              }
            }

          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  private verificarTamanio(item) {
    if (item == 1) {
      this.tamDoc = '8';
    }
    if (item == 2) {
      this.tamDoc = '12';
    }
    if (item == 3) {
      this.tamDoc = '12';
    }
    if (item == 4) {
      this.tamDoc = '15';
    }
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private getFecha(event) {
    this.fechaFiltro = ((event.value).toLocaleDateString('es-PE', this.options));
  }

  sendData() {
    this._router.navigate([('principal/admision/personal')]);
    this.ds.sendData('vuelve');
  }

  ngOnDestroy() {
    this.ds.clearData();
  }

  ngOnInit() {
    console.log(this.idPersonal);
    
    this.getPersonalId();
    this.getCondicionPesonal();

    this.getTipoDocumentos();
    this.getTipoProfesional();


    // this.getGruposOcupacionales(this.idPersonal);


    this.getEstadosCiviles();
    this.getSexos();
    this.getDepartamentos();
    this.getActividadPersonal();
    this.getEspecialidadesXArea();
    this.AuxiliarCombo();
    // this.getDomicilioNacimiento();
    // this.getDomicilioActual();
  }

  promiseProvinciaDistrito(){

    let promise = new Promise((resolve, reject) => {
      this.provincias = [];
      this.distritos = [];
      this.paramUbigeo.codigoDepartamento = this.codDepartamento;
      this.paramUbigeo.codigoProvincia = null;
      this._appService.getUbigeos(this.paramUbigeo)
        .subscribe(
          data => {
            if (data.estado == 1) {
              this.provincias = data.ubigeoList;
              this.distritos = [];
            } else if (data.estado == 0) {
              console.log(data.mensaje);
            } else {
              console.log(data.mensaje);
            }
            resolve();
          },
          err => {
            console.log(err)
            reject();
          });

    });
    return promise;
    }

   private AuxiliarCombo(){
     this.promiseProvinciaDistrito().then(data => {
      this.paramUbigeo.codigoDepartamento = this.codDepartamento;
      this.paramUbigeo.codigoProvincia = this.codProvincia;
      this._appService.getUbigeos(this.paramUbigeo)
        .subscribe(
          data => {
            if (data.estado == 1) {
              this.distritos = data.ubigeoList;
            } else if (data.estado == 0) {
              console.log(data.mensaje);
            } else {
              console.log(data.mensaje);
            }
          }
          // ,
          // err => {
          //   console.log(err)
          // }
          );

     }).catch(error => {
      console.log(error)

     });
   }
  

   private validarDocumentoExistente(){
    // this.verificarTamanio(this.personalRequest.idTipoDocumentoIdentidad);
    // console.log( this.verificarTamanio(this.personalRequest.idTipoDocumentoIdentidad));
    
    if(this.personalRequest.numeroDocuentoIdentidad.length == 8){
      let param = {
        idPersonal : this.personalRequest.idTipoDocumentoIdentidad+this.personalRequest.numeroDocuentoIdentidad+'00'
      }
  
      console.log(param);
  
      this._personalService.validarDocumentoIdentidad(param)
        .subscribe(data=> {
          console.log(data)
          if(data.estado == 1){
            console.log(data)
            // this.toastr.success("OK");
         
          }else{
            this.toastr.warning("verifique el numero de documento en la busqueda de personal.", "DOCUMENTO SE ENCUENTRA REGISTRADO.");
          // this.toastr.success("Producto Farmacútico/Dispositivo Médico no encontrado");
          this.personalRequest.numeroDocuentoIdentidad = null;
          }
  
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
          err => this.toastr.error(err),
          ()=> this.toastr.success('Request Complete')
  
    }

    
   }


}
