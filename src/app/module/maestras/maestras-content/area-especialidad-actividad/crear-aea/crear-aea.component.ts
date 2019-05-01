import { AreaEspecialidadActividadComponent } from './../area-especialidad-actividad.component';
import { ToastsManager } from 'ng2-toastr';
import { ActividadService } from './../../../services/actividad.service';
import { AreaEspecialidadActividadService } from './../../../services/area-especialidad-actividad.service';
import { AreaEspecialidadService } from './../../../services/area-especialidad.service';
import { AreaService } from '../../../services/area.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { setQuantifier, setValidatorPattern, setInputPattern, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { Observable } from 'rxjs/Observable';
import { CrearActividadComponent } from '../../actividad/crear-actividad/crear-actividad.component';

@Component({
  selector: 'app-crear-aea',
  templateUrl: './crear-aea.component.html',
  styleUrls: ['./crear-aea.component.scss']
})
export class CrearAeaComponent implements OnInit {

  @Input() elementaea;
  private variabletipo = 0;
  private variable = 0;

  //Para la busqueda
  private paramsBusqueda = { idArea: null, idEspecialidad: null, idActividad: null, nuPagina: null, nuRegiMostrar: null };

  // @ViewChild(MatPaginator) matPag: MatPaginator;
  //Para la paginacion
  private displayedSize: number[];
  private pagination: any;
  private pageSize: number;

  //Para listar
  private actMeds: any[] = [{ id: 0, valor: "NO" }, { id: 1, valor: "SI" }];
  private ambientes: any[] = [{ id: 0, valor: "NO" }, { id: 1, valor: "SI" }];
  private formImps: any[] = [{ idFormImpre: 1, valor: "HORA INICIO DEL TURNO" }, { idFormImpre: 2, valor: "HORA CADA 60 MINUTOS" }, { idFormImpre: 3, valor: "HORA EXACTA DE LA CITA" }];

  private ls_Areas: any = [];
  private ls_Especialidades: any = [];
  private ls_Actividades: any = [];

  private ls_AreaEspAct: any = [];
  //dataSource = new MatTableDataSource();
  displayedColumns = ['area', 'especialidad', 'actividad', 'actMed', 'pacHora', 'ambiente', 'cupoVol', 'cupoRec', 'cupoInt', 'cupoRef', 'cupoDia', 'topNue', 'topAdi', 'diasAde', 'formImp', 'flgAmb', 'editar', 'eliminar'];

  //Para los porcentajes
  private porcentajes = { "cCitasVoluntarias": 0, "cRecitas": 0, "cInterconsultas": 0, "cCitarReferido": 0, "cCitasDias": 0 };
  private checkeds = { "prioVolu": false, "prioRecita": false, "prioInter": false, "prioReferidos": false, "prioDias": false };
  private variableCheck = 0;

  private habilitaCheck = { "prioVolu": false, "prioRecita": false, "prioInter": false, "prioReferidos": false, "prioDias": false };
  private habilitaInput = { "prioVolu": false, "prioRecita": false, "prioInter": false, "prioReferidos": false, "prioDias": false };

  private sumaPorcentaje: any;
  private diferenciaPorcen: any;
  private retrocede = { "cCitasVoluntarias": 0, "cRecitas": 0, "cInterconsultas": 0, "cCitarReferido": 0, "cCitasDias": 0 }

  private suma = { "cCitasVoluntarias": null, "cRecitas": null, "cInterconsultas": null, "cCitarReferido": null, "cCitasDias": null };

  //Para el request
  private areaRequest = {
    descripcionArea: null,
    numPagina: 1,
    numRegisMostrar: 1000
  };

  private areaEspecialidadRequest = {
    idArea: null,
    idEspecialidad: null,
    numPagina: 1,
    numRegisMostrar: 1000
  };

  private actividadRequest = {
    descripcionActividad: null,
    nuPagina: 1,
    nuRegisMostrar: 1000
  };

  private AreaEspActRequest: any = {
    idArea: null,
    descripcionArea: null,
    idEspecialidad: null,
    descripcionEspecialidad: null,
    idActividad: null,
    descripcionActividad: null,
    actMedica: null,
    pacienteHora: null,
    ambiente: null,
    cCitasVoluntarias: null,
    cRecitas: null,
    cInterconsultas: null,
    cCitarReferido: null,
    cCitasDias: null,
    tCuposNuevos: null,
    tCuposAdicionales: null,
    dAdeLiberaCupos: null,
    idFormImpre: null,
    descImpForm: null,
    prioVolu: null,
    prioRecita: null,
    prioInter: null,
    prioReferidos: null,
    prioDias: null,
    flgAmb: null,
  }
  private lsActividad = [];

  constructor(private _areaEspActService: AreaEspecialidadActividadService,
    private _areaService: AreaService,
    private _ActividadService: ActividadService,
    private _areaEspecialidadService: AreaEspecialidadService,
    private _actividadService: ActividadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialogRef<CrearActividadComponent>) {
    this.pagination = { nuPagina: 1, nuRegiMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  ngOnInit() {
    this.getAllAreas();
    this.obtenerActividad();
    if (this.elementaea) this.setAreaEspAct(this.elementaea);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
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

  close(add) {
    this._modalDialog.close(add);
  }

  //Set variables para actualizar
  private setAreaEspAct(param) {
    // this.AreaEspActRequest.idArea = param.idArea;
    //   this.limpiar();
    this.AreaEspActRequest.idArea = param.idArea;
    this.getAllEspecialidades();
    this.AreaEspActRequest.idEspecialidad = param.idEspecialidad;
    this.obtenerActividad();
    this.AreaEspActRequest.idActividad = param.idActividad;
    this.variable = 1;
    this.getTipoProgramacion(this.AreaEspActRequest.idActividad);

    console.log(this.actMeds);
    console.log(this.AreaEspActRequest.actMedica);
    console.log(param.actMedica);
    this.AreaEspActRequest.actMedica = this.convertStringToBit(param.actMedica);
    console.log(this.AreaEspActRequest.actMedica);
    this.AreaEspActRequest.pacienteHora = param.pacienteHora;
    this.AreaEspActRequest.ambiente = this.convertStringToBit(param.ambiente);
    this.AreaEspActRequest.cCitasVoluntarias = param.cCitasVoluntarias;
    this.AreaEspActRequest.cRecitas = param.cRecitas;
    this.AreaEspActRequest.cInterconsultas = param.cInterconsultas;
    this.AreaEspActRequest.cCitarReferido = param.cCitarReferido;
    this.AreaEspActRequest.cCitasDias = param.cCitasDias;
    this.AreaEspActRequest.tCuposNuevos = param.tCuposNuevos;
    this.AreaEspActRequest.tCuposAdicionales = param.tCuposAdicionales;
    this.AreaEspActRequest.dAdeLiberaCupos = param.dAdeLiberaCupos;
    this.AreaEspActRequest.idFormImpre = param.idFormImpre;
    this.AreaEspActRequest.prioVolu = param.prioVolu;
    this.AreaEspActRequest.prioRecita = param.prioRecita;
    this.AreaEspActRequest.prioInter = param.prioInter;
    this.AreaEspActRequest.prioReferidos = param.prioReferidos;
    this.AreaEspActRequest.prioDias = param.prioDias;
    this.AreaEspActRequest.flgAmb = param.flgAmb == "SI" ? true : false;
    this.variabletipo = param.tipoProgramacion == 1 ? 1 : 0;
    Object.keys(this.AreaEspActRequest).forEach(key => {
      let para = { checked: false }
      this.onKey(key)
      this.validarPrioridad(para, key);
      this.verificaSuma(key);
    });
    Object.keys(this.habilitaCheck).forEach(key => {
      if (this.AreaEspActRequest[key] == 1) {
        this.checkeds[key] = 1;
      } else {
        this.checkeds[key] = 0;
      }
    });
    this.diferenciaPorcen = (100 - this.sumaPorcentaje);
    var difere = (100 - this.sumaPorcentaje);
    if (this.checkeds.prioVolu) {
      var a = this.porcentajes.cCitasVoluntarias;
      var b = difere;
      var sum = parseFloat(a + "") + parseFloat(b + "");
      var c = this.sumaPorcentaje;
      var total = parseFloat(c) + parseFloat(b + "");
      this.porcentajes["cCitasVoluntarias"] = parseFloat(sum.toFixed(2));
      this.sumaPorcentaje = total;
      this.retrocede.cCitasVoluntarias = 1;
    }
    if (this.checkeds.prioRecita) {
      var a = this.porcentajes.cRecitas;
      var b = difere;
      var sum = parseFloat(a + "") + parseFloat(b + "");
      var c = this.sumaPorcentaje;
      var total = parseFloat(c) + parseFloat(b + "");
      this.porcentajes["cRecitas"] = parseFloat(sum.toFixed(2));
      this.sumaPorcentaje = total;
      this.retrocede.cRecitas = 1;
    }
    if (this.checkeds.prioInter) {
      var a = this.porcentajes.cInterconsultas;
      var b = difere;
      var sum = parseFloat(a + "") + parseFloat(b + "");
      var c = this.sumaPorcentaje;
      var total = parseFloat(c) + parseFloat(b + "");
      this.porcentajes["cInterconsultas"] = parseFloat(sum.toFixed(2));
      this.sumaPorcentaje = total;
      this.retrocede.cInterconsultas = 1;
    }
    if (this.checkeds.prioReferidos) {
      var a = this.porcentajes.cCitarReferido;
      var b = difere;
      var sum = parseFloat(a + "") + parseFloat(b + "");
      var c = this.sumaPorcentaje;
      var total = parseFloat(c) + parseFloat(b + "");
      this.porcentajes["cCitarReferido"] = parseFloat(sum.toFixed(2));
      this.sumaPorcentaje = total;
      this.retrocede.cCitarReferido = 1;
    }
    if (this.checkeds.prioDias) {
      var a = this.porcentajes.cCitasDias;
      var b = difere;
      var sum = parseFloat(a + "") + parseFloat(b + "");
      var c = this.sumaPorcentaje;
      var total = parseFloat(c) + parseFloat(b + "");
      this.porcentajes["cCitasDias"] = parseFloat(sum.toFixed(2));
      this.sumaPorcentaje = total;
      this.retrocede.cCitasDias = 1;


    }

  }
  private cancelarAreaEspAct(FormAreaxEspecxActividad) {
    FormAreaxEspecxActividad.resetForm();
    this.limpiar();
    //this.obtenerListaAreaEspAct(1);
  }

  //Llenar ComboBox
  private getAllAreas() {
    this._areaService.getAreas(this.areaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ls_Areas = data.areaList;
        } else {
          this.toastr.error(data.mensaje);
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
    // this.limpiarform();
    this.sumaPorcentaje = null;
    this.variabletipo = 0;
    this.variable = 0;
  }

  private getAllEspecialidades() {
    this.AreaEspActRequest.idEspecialidad = null;
    if (this.AreaEspActRequest.idArea == null) {
      this.toastr.warning("Debe seleccionar un Area");
    }
    else {
      this.areaEspecialidadRequest.idArea = this.AreaEspActRequest.idArea;
      this._areaEspecialidadService.obtenerAreaXEspecialidad(this.areaEspecialidadRequest)
        .subscribe(data => {
          if (data.estado == 1) {
            this.ls_Especialidades = data.areaEspecialidadList;
            console.log(this.ls_Especialidades);
          }
          else {
            this.toastr.error(data.mensaje);
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

  private obtenerActividad() {
    //console.log(this.Param);
    // this.paginator.nuPagina = (numPagina) ? numPagina : this.paginator.nuPagina;

    // Object.keys(this.Param).forEach(key => {
    //   this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    // });

    // this.Param = {
    //   ...this.Param,
    //   ...this.paginator,
    //   nuRegisMostrar: this.pageSize
    // };
    let Param = {};
    this._ActividadService.getActividad(Param)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          this.lsActividad = data.actividadList;

          // let count = ((this.paginator.nuPagina - 1) * this.pageSize) + 1
          // this.lsActividad.forEach(element => {
          //   element["index"] = count
          //   count++
          // });
          console.log(this.lsActividad);
          // this.dataSource = new MatTableDataSource(this.lsActividad);

          // for (let i of this.lsActividad) {
          //   console.log(i);
          //   console.log(i.tipoActividad);
          //   i.tipoActividadDesc = this.verificarTipoActividad(i.tipoActividad);
          // }
          // console.log(this.nombreTipoActividad);

          // for (let i of this.lsActividad) {
          //   console.log(i);
          //   console.log(i.tipoProgramacion);
          //   i.tipoProgramacionDesc = this.verificarTipoProgramacion(i.tipoProgramacion);
          // }
          // console.log(this.nombreTipoProgramacion);


          // console.log(this.dataSource);
          // if (this.matPaginator) {
          //   this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
          // }

          // if (this.lsActividad.length > 0) {
          //   this.paginator.nuRegisMostrar = this.lsActividad[0].nuTotalReg;
          // }
          //this.dataSource.sort = this.matSort;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  public insertarAreaEspAct(FormAreaxEspecxActividad) {
    Object.keys(this.checkeds).forEach(key => {
      if (this.checkeds[key] == true) {
        this.checkeds[key] = 1;
        this.variableCheck = 1;
      } else {
        this.checkeds[key] = 0;
      }
    });
    this.AreaEspActRequest.flgAmb = this.AreaEspActRequest.flgAmb ? 1 : 0;
    this.AreaEspActRequest = {
      ...this.AreaEspActRequest,
      ...this.checkeds
    }

    if (this.variabletipo == 1) {
      if (this.variableCheck == 0) {
        this.toastr.error("Debes seleccionar un checkbox");
        return;
      }
    }

    this._areaEspActService.insertarAreaEspAct(this.AreaEspActRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se insertó correctamente")
          FormAreaxEspecxActividad.resetForm();
          this.limpiar();
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
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

  private editAreaEspAct(FormAreaxEspecxActividad) {
    Object.keys(this.checkeds).forEach(key => {
      if (this.checkeds[key] == true) {
        this.checkeds[key] = 1;
        this.variableCheck = 1;
      } else {
        this.checkeds[key] = 0;
      }
    });

    this.AreaEspActRequest.flgAmb = this.AreaEspActRequest.flgAmb ? 1 : 0;

    this.AreaEspActRequest = {
      ...this.AreaEspActRequest,
      ...this.checkeds
    }
    if (this.variabletipo == 1) {
      if (this.variableCheck == 0) {
        this.toastr.error("Debes seleccionar un checkbox");
        return;
      }
    }
    Object.keys(this.AreaEspActRequest).forEach(key => {
      this.AreaEspActRequest[key] = (this.AreaEspActRequest[key] === '') ? null : this.AreaEspActRequest[key];
    });
    this._areaEspActService.editAreaEspAct(this.AreaEspActRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se edito correctamente la informacion");
          this.limpiar();
          FormAreaxEspecxActividad.resetForm();
          this.close(1);
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Editar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

    this.variableCheck = 0;

  }
  //LOGICA------------------------------------------------------------------

  //SI/NO
  private convertStringToBit(descripcion) {
    if (descripcion == 'SI') {
      return 1;
    } else if (descripcion == 'NO') {
      return 0;
    }
  }
  //SI/NO lista
  private convertirBinario(dataList) {
    var nuevaLista = [];
    dataList.forEach(element => {
      if (element.actMedica == 1) {
        element.actMedica = 'SI';
      } else if (element.actMedica == 0) {
        element.actMedica = 'NO';
      } else {
      }

      if (element.ambiente == 1) {
        element.ambiente = 'SI';
      } else if (element.ambiente == 0) {
        element.ambiente = 'NO';
      } else {
      }

      if (element.flgAmb == 1) {
        element.flgAmb = 'SI';
      } else if (element.flgAmb == 0) {
        element.flgAmb = 'NO';
      } else {
      }

      nuevaLista.push(element);
    });
    return nuevaLista;
  }

  //
  private getTipoProgramacion(param) {
    // this.limpiar();
    //lsActividad
    // tipoProgramacion
    //ls_Actividades
    // idProgramacion

    //let idProgramacion;
    Object.keys(this.lsActividad).forEach(key => {
      if (this.lsActividad[key]["idActividad"] == param) {
        this.AreaEspActRequest.tipoProgramacion = this.lsActividad[key]["tipoProgramacion"] ? this.lsActividad[key]["tipoProgramacion"] : '-'
      }
    }
    );
    Object.keys(this.checkeds).forEach(key => {
      if (this.checkeds[key] == true) {
        this.checkeds[key] = 1;
      } else {
        this.checkeds[key] = 0;
      }
    });
    if (this.AreaEspActRequest.tipoProgramacion == 2 || this.AreaEspActRequest.tipoProgramacion == null) {
      this.variabletipo = 0;
    } else {
      this.variabletipo = 1;
      this.checkeds.prioVolu = true;
    }
  }

  //Calcular Porcentajes
  private onKey(key) {
    Object.keys(this.porcentajes).forEach(key => {
      if (this.AreaEspActRequest[key] > 0) {
        this.porcentajes[key] = ((this.AreaEspActRequest[key] / this.AreaEspActRequest.pacienteHora) * 100).toFixed(2);
      }
      else {
        this.porcentajes[key] = null;
      }
    });
  }

  //Disabled cupos si no hay paciente Hora
  private cambioVacioC() {
    if (this.AreaEspActRequest.pacienteHora == null || this.AreaEspActRequest.pacienteHora == undefined || this.AreaEspActRequest.pacienteHora == '' || this.AreaEspActRequest.pacienteHora == 0) {
      this.AreaEspActRequest.cCitarReferido = "";
      this.AreaEspActRequest.cCitasDias = "";
      this.AreaEspActRequest.cCitasVoluntarias = "";
      this.AreaEspActRequest.cInterconsultas = "";
      this.AreaEspActRequest.cRecitas = "";
      this.porcentajes = { "cCitasVoluntarias": null, "cRecitas": null, "cInterconsultas": null, "cCitarReferido": null, "cCitasDias": null };
    }
  }

  //Limpiar cupos si se reingresa paciente hora
  private verificarPacienteHora(key) {
    let sumando: number = 0;
    let sumaporcentual: any = 0;
    Object.keys(this.suma).forEach(key => {
      this.AreaEspActRequest[key] = "";
      this.porcentajes[key] = "";
    });
    this.sumaPorcentaje = 0;
    this.diferenciaPorcen = 0;
    Object.keys(this.habilitaCheck).forEach(key => {
      this.habilitaCheck[key] = false;
    });
    Object.keys(this.AreaEspActRequest).forEach(key => {
      let para = { checked: false }
      this.onKey(key)
      this.validarPrioridad(para, key);
      this.verificaSuma(key);
    });
    return true;
  }

  //Calcula la suma de porcentaje
  private verificaSuma(key) {
    let sumando: number = 0;
    let sumaporcentual: any = 0;
    Object.keys(this.suma).forEach(key => {
      sumando = + (this.AreaEspActRequest[key] == null) ? (sumando + 0) : (sumando + parseInt(this.AreaEspActRequest[key]));
      if (sumando > 100) {
        this.toastr.error("No puedes exceder el 100%");
        this.AreaEspActRequest[key] = this.suma[key];
        this.porcentajes[key] = "";
      }
      sumaporcentual = + ((((this.AreaEspActRequest[key] / this.AreaEspActRequest.pacienteHora) * 100).toFixed(2)) == null) ? (sumaporcentual + 0) : (sumaporcentual + parseFloat(((this.AreaEspActRequest[key] / this.AreaEspActRequest.pacienteHora) * 100).toFixed(2)));
    });
    if (sumaporcentual >= 0) {
      this.sumaPorcentaje = sumaporcentual;
    }

    return true;
  }

  //Escoger solo un checkbox
  private validarPrioridad(event, key) {
    Object.keys(this.habilitaCheck).forEach(key => {
      this.habilitaCheck[key] = false;
      this.habilitaInput[key] = false;
    });
    if (event.checked == true) {
      Object.keys(this.checkeds).forEach(key => {
        this.checkeds[key] = false; /*//////////////////////////////////////////////////////////////////////////////////////////////*/
      });
      this.checkeds = { "prioVolu": !event.checked, "prioRecita": !event.checked, "prioInter": !event.checked, "prioReferidos": !event.checked, "prioDias": !event.checked };
      this.checkeds[key] = event.checked;
      Object.keys(this.habilitaInput).forEach(key => {
        this.habilitaInput[key] = true;
      });
      if (this.sumaPorcentaje < 100) {
        this.diferenciaPorcen = (100 - this.sumaPorcentaje);
        var difere = (100 - this.sumaPorcentaje);
        if (this.checkeds.prioVolu) {
          var a = this.porcentajes.cCitasVoluntarias;
          var b = difere;
          var sum = parseFloat(a + "") + parseFloat(b + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(b + "");
          this.porcentajes["cCitasVoluntarias"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitasVoluntarias = 1;
        }
        if (this.checkeds.prioRecita) {
          var a = this.porcentajes.cRecitas;
          var b = difere;
          var sum = parseFloat(a + "") + parseFloat(b + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(b + "");
          this.porcentajes["cRecitas"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cRecitas = 1;
        }
        if (this.checkeds.prioInter) {
          var a = this.porcentajes.cInterconsultas;
          var b = difere;
          var sum = parseFloat(a + "") + parseFloat(b + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(b + "");
          this.porcentajes["cInterconsultas"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cInterconsultas = 1;
        }
        if (this.checkeds.prioReferidos) {
          var a = this.porcentajes.cCitarReferido;
          var b = difere;
          var sum = parseFloat(a + "") + parseFloat(b + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(b + "");
          this.porcentajes["cCitarReferido"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitarReferido = 1;
        }
        if (this.checkeds.prioDias) {
          var a = this.porcentajes.cCitasDias;
          var b = difere;
          var sum = parseFloat(a + "") + parseFloat(b + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(b + "");
          this.porcentajes["cCitasDias"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitasDias = 1;
        }
      } else {
        Object.keys(this.retrocede).forEach(key => {
          if (this.retrocede[key] == 1) {
            var d = this.porcentajes[key];
            var e = this.diferenciaPorcen;
            var res = parseFloat(d + "") - parseFloat(e + "");
            var f = this.sumaPorcentaje;
            var total = parseFloat(f) - parseFloat(e + "");
            this.porcentajes[key] = parseFloat(res.toFixed(2));
            this.sumaPorcentaje = total;
            this.retrocede[key] = 0;
          }
        });
        if (this.checkeds.prioVolu) {
          var a = this.porcentajes.cCitasVoluntarias;
          var f = this.diferenciaPorcen;
          var sum = parseFloat(a + "") + parseFloat(f + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(f + "");
          this.porcentajes["cCitasVoluntarias"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitasVoluntarias = 1;
        }
        if (this.checkeds.prioRecita) {
          var a = this.porcentajes.cRecitas;
          var f = this.diferenciaPorcen;
          var sum = parseFloat(a + "") + parseFloat(f + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(f + "");
          this.porcentajes["cRecitas"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cRecitas = 1;
        }
        if (this.checkeds.prioInter) {
          var a = this.porcentajes.cInterconsultas;
          var f = this.diferenciaPorcen;
          var sum = parseFloat(a + "") + parseFloat(f + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(f + "");
          this.porcentajes["cInterconsultas"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cInterconsultas = 1;
        }
        if (this.checkeds.prioReferidos) {
          var a = this.porcentajes.cCitarReferido;
          var f = this.diferenciaPorcen;
          var sum = parseFloat(a + "") + parseFloat(f + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(f + "");
          this.porcentajes["cCitarReferido"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitarReferido = 1;
        }
        if (this.checkeds.prioDias) {
          var a = this.porcentajes.cCitasDias;
          var f = this.diferenciaPorcen;
          var sum = parseFloat(a + "") + parseFloat(f + "");
          var c = this.sumaPorcentaje;
          var total = parseFloat(c) + parseFloat(f + "");
          this.porcentajes["cCitasDias"] = parseFloat(sum.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede.cCitasDias = 1;
        }
      }
    }
    else {
      Object.keys(this.retrocede).forEach(key => {
        if (this.retrocede[key] == 1) {
          var d = this.porcentajes[key];
          var e = this.diferenciaPorcen;
          var res = parseFloat(d + "") - parseFloat(e + "");
          var f = this.sumaPorcentaje;
          var total = parseFloat(f) - parseFloat(e + "");
          this.porcentajes[key] = parseFloat(res.toFixed(2));
          this.sumaPorcentaje = total;
          this.retrocede[key] = 0;
        }
      });
      this.checkeds = { "prioVolu": event.checked, "prioRecita": event.checked, "prioInter": event.checked, "prioReferidos": event.checked, "prioDias": event.checked };
    }
    Object.keys(this.checkeds).forEach(key => {
      if (this.checkeds[key] == true) {
        this.checkeds[key] = 1;
      } else {
        this.checkeds[key] = 0;
      }
    });
  }

  private limpiar() {
    this.AreaEspActRequest.actMedica = null;
    this.AreaEspActRequest.pacienteHora = null;
    this.AreaEspActRequest.ambiente = null;
    this.AreaEspActRequest.cCitasVoluntarias = null;
    this.AreaEspActRequest.cRecitas = null;
    this.AreaEspActRequest.cInterconsultas = null;
    this.AreaEspActRequest.cCitarReferido = null;
    this.AreaEspActRequest.cCitasDias = null;
    this.AreaEspActRequest.tCuposNuevos = null;
    this.AreaEspActRequest.tCuposAdicionales = null;
    this.AreaEspActRequest.dAdeLiberaCupos = null;
    this.AreaEspActRequest.idFormImpre = null;
    this.AreaEspActRequest.prioVolu = null;
    this.AreaEspActRequest.prioRecita = null;
    this.AreaEspActRequest.prioInter = null;
    this.AreaEspActRequest.prioReferidos = null;
    this.AreaEspActRequest.prioDias = null;
    this.AreaEspActRequest.flgAmb = null;
    this.porcentajes.cCitarReferido = null;
    this.porcentajes.cCitasDias = null;
    this.porcentajes.cCitasVoluntarias = null;
    this.porcentajes.cInterconsultas = null;
    this.porcentajes.cRecitas = null;
    this.sumaPorcentaje = null;
    this.variabletipo = 0;
    this.variable = 0;
    this.variableCheck = 0;
  }

}
