import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { ActividadService } from './../../services/actividad.service';
import { AreaEspecialidadService } from './../../services/area-especialidad.service';
import { Observable } from 'rxjs/Observable';
import { AreaService } from './../../services/area.service';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AreaEspecialidadActividadService } from './../../services/area-especialidad-actividad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { setQuantifier, setValidatorPattern, setInputPattern, isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { CrearAeaComponent } from './crear-aea/crear-aea.component';

@Component({
  selector: 'app-area-especialidad-actividad',
  templateUrl: './area-especialidad-actividad.component.html',
  styleUrls: ['./area-especialidad-actividad.component.scss']
})
export class AreaEspecialidadActividadComponent implements OnInit {

  private variabletipo = 0;
  private variable = 0;

  //Para la busqueda
  private paramsBusqueda = { idArea: null, idEspecialidad: null, idActividad: null, nuPagina: null, nuRegiMostrar: null };

  @ViewChild(MatPaginator) matPag: MatPaginator;
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
  dataSource = new MatTableDataSource();
  //  displayedColumns = ['area', 'especialidad', 'actividad', 'actMed', 'pacHora', 'ambiente', 'cupoVol', 'cupoRec', 'cupoInt', 'cupoRef', 'cupoDia', 'topNue', 'topAdi', 'diasAde', 'formImp', 'flgAmb', 'editar', 'eliminar'];
  displayedColumns = ['area', 'especialidad', 'actividad', 'actMed', 'ambiente', 'formImp', 'flgAmb', 'editar', 'eliminar'];
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

  constructor(
    private _areaEspActService: AreaEspecialidadActividadService,
    private _areaService: AreaService,
    private _areaEspecialidadService: AreaEspecialidadService,
    private _actividadService: ActividadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegiMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  ngOnInit() {
    this.obtenerListaAreaEspAct(1);
    this.getAllAreas();

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
  crearAreaEspecialidadActividad(param) {
    const dialogRef = this._modalDialog.open(CrearAeaComponent, {
      autoFocus: false,
      // maxWidth: '1200px',
       width: '80%',
      maxHeight: '90%',
     height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.elementaea = param;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //this.obtenerSubActividad();
        this.obtenerListaAreaEspAct(1);
      }
    });
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
            //ver si puedo resetear los parametros de especialidad
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

  private getAllActividades() {
    if (this.AreaEspActRequest.idEspecialidad == null) {
      this.toastr.warning("Debe seleccionar una Especialidad");
      this.AreaEspActRequest.idActividad == null
      return;
    } else {
      this.areaEspecialidadRequest.idEspecialidad = this.AreaEspActRequest.idEspecialidad;
      this._areaEspActService.getAreaEspActList(this.areaEspecialidadRequest)
        .subscribe(data => {
          if (data.estado == 1) {
            this.ls_Actividades = data.areaEspecialidadActividadList;
            console.log(this.ls_Actividades);
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
    this.limpiar();
    this.variable = 0;
    this.variabletipo = 0;
  }

  //Paginacion
  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.pagination.nuPagina = (this.pagination.nuPagina) ? this.pagination.nuPagina : this.pagination.nuPagina;
    this.paramsBusqueda.nuPagina = this.pagination.nuPagina;
    this.paramsBusqueda.nuRegiMostrar = this.pageSize;
    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });
    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegiMostrar: this.pageSize
    };
    this._areaEspActService.getAreaEspActList(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ls_AreaEspAct = this.convertirBinario(data.areaEspecialidadActividadList);
          this.dataSource = new MatTableDataSource(this.ls_AreaEspAct);
          if (this.matPag) {
            this.matPag._pageIndex = (this.pagination.nuPagina) ? this.pagination.nuPagina - 1 : this.matPag._pageIndex;
          }
          if (this.ls_AreaEspAct.length > 0) {
            this.pagination.nuRegiMostrar = this.ls_AreaEspAct[0].nuTotalReg;
          }
          // this.obtenerListaAreaEspAct();
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron datos");
          this.ls_AreaEspAct = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
    //    this.obtenerListaAreaEspAct();
  }

  //Consumir Servicios
  private obtenerListaAreaEspAct(numPagina?: number) {
    this.paramsBusqueda.idArea = this.AreaEspActRequest.idArea;
    this.paramsBusqueda.idEspecialidad = this.AreaEspActRequest.idEspecialidad;
    this.paramsBusqueda.idActividad = this.AreaEspActRequest.idActividad;
    // this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
    this.paramsBusqueda.nuPagina = 1;
    this.paramsBusqueda.nuRegiMostrar = 10;
    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });
    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegiMostrar: this.pageSize
    };
    this._areaEspActService.getAreaEspActList(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(this.paramsBusqueda);
          console.log(data.areaEspecialidadActividadList);
          this.ls_AreaEspAct = this.convertirBinario(data.areaEspecialidadActividadList);
          this.dataSource = new MatTableDataSource(this.ls_AreaEspAct);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.ls_AreaEspAct.length > 0) {
            this.pagination.nuRegiMostrar = this.ls_AreaEspAct[0].nuTotalReg;
            console.log(this.ls_AreaEspAct[0].nuTotalReg);
          }
          this.AreaEspActRequest = {
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
            flgAmb: null

          };
          this.areaEspecialidadRequest = {
            idArea: null, idEspecialidad: null, numPagina: null, numRegisMostrar: null
          };
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron datos");
          this.ls_AreaEspAct = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
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
    if (this.variableCheck == 0) {
      this.toastr.error("Debes seleccionar un checkbox");
    } else {
      this._areaEspActService.insertarAreaEspAct(this.AreaEspActRequest)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se insertó correctamente")
            FormAreaxEspecxActividad.resetForm();
            this.limpiar();
            this.obtenerListaAreaEspAct(1);
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
    if (this.variableCheck == 0) {
      this.toastr.error("Debes seleccionar un checkbox");
    } else {
      Object.keys(this.AreaEspActRequest).forEach(key => {
        this.AreaEspActRequest[key] = (this.AreaEspActRequest[key] === '') ? null : this.AreaEspActRequest[key];
      });
      this._areaEspActService.editAreaEspAct(this.AreaEspActRequest)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se edito correctamente la informacion");
            this.limpiar();
            FormAreaxEspecxActividad.resetForm();
            this.obtenerListaAreaEspAct(1);
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
  }

  private eliminarAreaEspAct(param, FormAreaxEspecxActividad) {
    this.AreaEspActRequest.idArea = param.idArea;
    this.AreaEspActRequest.idEspecialidad = param.idEspecialidad;
    this.AreaEspActRequest.idActividad = param.idActividad;
    // Object.keys(this.AreaEspActRequest).forEach(key => {
    //   this.AreaEspActRequest[key] = (this.AreaEspActRequest[key] === '') ? null : this.AreaEspActRequest[key];
    // });
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._areaEspActService.deleteAreaEspAct(this.AreaEspActRequest)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success("Se Eliminó correctamente");
              FormAreaxEspecxActividad.resetForm();
              this.limpiar();
              this.obtenerListaAreaEspAct(1);
              // this.variableArea = false;
            } else {
              this.toastr.error("Hubo un error");
            }
            return true;
          }, error => {
            console.error(error);
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      }
    });
  }

  //Set variables para actualizar
  private setAreaEspAct(param) {
    const dialogRef = this._modalDialog.open(CrearAeaComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.elementaea = "¿Desea actualizar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.limpiar();
        this.AreaEspActRequest.idArea = param.idArea;
        this.getAllEspecialidades();
        this.AreaEspActRequest.idEspecialidad = param.idEspecialidad;
        this.getAllActividades();
        this.AreaEspActRequest.idActividad = param.idActividad;
        this.variable = 1;
        this.getTipoProgramacion(this.AreaEspActRequest.idActividad);
        if (this.variabletipo == 0) {
          this.toastr.error("No se puede Editar, unicamente ELIMINAR");
        } else {
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
      }
    });
  }

  //Cancelar actualizacion
  private cancelarAreaEspAct(FormAreaxEspecxActividad) {
    FormAreaxEspecxActividad.resetForm();
    this.limpiar();
    this.obtenerListaAreaEspAct(1);
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
    let idProgramacion;
    Object.keys(this.ls_Actividades).forEach(key => {
      if (this.ls_Actividades[key]["idActividad"] == param) {
        idProgramacion = this.ls_Actividades[key]["tipoProgramacion"] ? this.ls_Actividades[key]["tipoProgramacion"] : '-'
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
    if (idProgramacion == 2 || idProgramacion == null) {
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
      if (sumando > parseInt(this.AreaEspActRequest.pacienteHora)) {
        this.toastr.error("No puedes exceder el limite");
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
