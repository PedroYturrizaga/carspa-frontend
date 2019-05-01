import { CitaExamenesAuxiliaresService } from './../../../../../consulta-ambulatoria/services/cita-examenes-auxiliares.service';
import { setQuantifier, setValidatorPattern, setInputPattern } from './../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AreaService } from '../../../../../maestras/services/area.service';
import { AreaEspecialidadService } from '../../../../../maestras/services/area-especialidad.service';
import { AreaEspecialidadActividadService } from '../../../../../maestras/services/area-especialidad-actividad.service';
import { TarifarioService } from '../../../../services/tarifario.service';
import { ProcedimientosService } from '../../../../../consulta-ambulatoria/services/procedimientos.service';
import { ModalConfirmacionComponent } from '../../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-crear-editar-servicio',
  templateUrl: './crear-editar-servicio.component.html',
  styleUrls: ['./crear-editar-servicio.component.scss']
})
export class CrearEditarServicioComponent implements OnInit {

  @Input() servicioEdit;
  @ViewChild(MatPaginator) paginatorCpt: MatPaginator;
  @ViewChild(MatPaginator) paginatorAea: MatPaginator;

  constructor(private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearEditarServicioComponent>,
    private _citaExamAuxService: CitaExamenesAuxiliaresService,
    private _areaService: AreaService,
    private _areaEspecService: AreaEspecialidadService,
    private _areaEspecActService: AreaEspecialidadActividadService,
    private _tarifarioService: TarifarioService,
    private _modalDialog: MatDialog,
    private _ProcedimientosService: ProcedimientosService,) {
  }

  private request = {
    servicio: {
      idServicio: null,
      descripcionTarifario: null,
      unidad: null,
      precio: null,
      flgFha: null,
      flgFsa: null,
      flgCpt: null,
      flgActividad: null
    },
    cptList: [],
    areaEspecActList: []
  };

  private selects = { cpt: { descProcedimiento: null, idCpt: null }, area: null, especialidad: null, actividad: null };
  private radioButtons = { flgTipoServ: null, flgFactor: null, divCpt: false, divActividad: false }
  private cptList = [];
  private idCpt = 0;
  private areaList = [];
  private especialidadList = [];
  private actividadList = [];
  private descripcionProcedimiento = ""; 
  private descProcAutomplete = "";
  private codigoProcedimiento = "";
  private isValid: boolean = false;
  private lsNombreProcedimiento: any = [];
  private datoObtenerProcxNum: any = { nuProcedimiento: "", noProcedimiento: "" };


  private dcCpt = ['codigo','cptDetalle', 'eliminar'];
  dsCpt = new MatTableDataSource();

  private dcAreaEspecAct = ['area', 'especialidad', 'actividad', 'eliminar'];
  dsAreaEspecAct = new MatTableDataSource();

  ngOnInit() {
    this.getAreaList();
    this.setServicio();
  }

  private setServicio() {
    console.log(this.servicioEdit);

    if (this.servicioEdit != null || this.servicioEdit != undefined) {

      this.request.servicio.idServicio = this.servicioEdit.idServicio;
      this.request.servicio.descripcionTarifario = this.servicioEdit.descripcionTarifario;
      this.request.servicio.unidad = this.servicioEdit.unidad;
      this.request.servicio.precio = this.servicioEdit.precio;

      this.radioButtons.flgTipoServ = this.servicioEdit.flgCpt == 1 ? 'cpt' : (this.servicioEdit.flgActividad == 1 ? 'actividad' : null);
      this.radioButtons.flgFactor = this.servicioEdit.flgFha == 1 ? 'fha' : (this.servicioEdit.flgFsa == 1 ? 'fsa' : null);

      if (this.servicioEdit.jsonIdsCpt) {
        try {
          let cptlist = JSON.parse(this.servicioEdit.jsonIdsCpt);
          this.request.cptList = cptlist;

          this.radioButtons.divActividad = false;
          this.radioButtons.divCpt = true;

        } catch (error) {
        } finally {
          this.dsCpt = new MatTableDataSource(this.request.cptList);
          this._setDataSource('cpt');
        }
      }

      if (this.servicioEdit.jsonIdsAreaEspecAct) {
        let aeaList = JSON.parse(this.servicioEdit.jsonIdsAreaEspecAct);
        this.request.areaEspecActList = aeaList;
        this.radioButtons.divActividad = true;
        this.radioButtons.divCpt = false;
        this.dsAreaEspecAct = new MatTableDataSource(this.request.areaEspecActList);
        this._setDataSource('actividad');
      }

    }
  }

  private insertarActualizarServicio(metodo) {
    let genError = false;
    try {
      if (this.radioButtons.flgTipoServ == 'cpt') {
        this.request.servicio.flgCpt = 1;
        this.request.servicio.flgActividad = 0;
        this.request.areaEspecActList = [];
        if (this.request.cptList.length == 0) {
          this.toastr.warning("Debe ingresar al menos un Procedimiento.");
          genError = true;
        }
      } else if (this.radioButtons.flgTipoServ == 'actividad') {
        this.request.servicio.flgCpt = 0;
        this.request.servicio.flgActividad = 1;
        this.request.cptList = [];
        if (this.request.areaEspecActList.length == 0) {
          this.toastr.warning("Debe ingresar al menos una Actividad.");
          genError = true;
        }
      } else {
        this.request.servicio.flgCpt = 0;
        this.request.servicio.flgActividad = 0;
        this.request.areaEspecActList = [];
        this.request.cptList = [];
      }

      if (this.radioButtons.flgFactor == 'fha') {
        this.request.servicio.flgFha = 1;
        this.request.servicio.flgFsa = 0;
      } else if (this.radioButtons.flgFactor == 'fsa') {
        this.request.servicio.flgFha = 0;
        this.request.servicio.flgFsa = 1;
      } else {
        this.request.servicio.flgFha = 0;
        this.request.servicio.flgFsa = 0;
        this.request.servicio.unidad = null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!genError) {
        console.log(this.request);

        if (metodo == 1) {
          this._tarifarioService.insertServicios(this.request)
            .subscribe(data => {
              console.log(data);

              if (data.estado == 1) {
                this.toastr.success(data.mensaje);
                this.close(1);
              } else if (data.estado == 0) {
                this.toastr.warning(data.confirmacion.mensaje);
              } else {
                this.toastr.error(data.mensaje);
              }
            },
              error => {
                console.log(error);
              });
        } else {
          this._tarifarioService.updateServicios(this.request)
            .subscribe(data => {
              console.log(data);

              if (data.estado == 1) {
                this.toastr.success(data.mensaje);
                this.close(1);
              } else if (data.estado == 0) {
                this.toastr.warning(data.confirmacion.mensaje);
              } else {
                this.toastr.error(data.mensaje);
              }
            },
              error => {
                console.log(error);
              });
        }

      }
    }
  }

  private agregarCpt() {
    let existe = this.existElementInList(this.request.cptList, "codigo", this.codigoProcedimiento);
    if (existe) {
      this.toastr.warning("Ya se ha agregado este CPT a la lista.");
    }
    else{
        let cpt = {
          codigo:this.codigoProcedimiento,
          id: this.selects.cpt.idCpt,
          descProcedimiento: this.selects.cpt.descProcedimiento
        }
        this.request.cptList.push(cpt);
        this.dsCpt = new MatTableDataSource(this.request.cptList);
        this._setDataSource('cpt');
      }       
      this.codigoProcedimiento = null;
      this.descripcionProcedimiento = null;
  }

  private deleteCpt(indice) {
    this.selects.cpt.idCpt = null;
    this.codigoProcedimiento=null;
    this.descripcionProcedimiento=null;
    // this.selects.cpt.codProcedimiento = null;
    this.selects.cpt.descProcedimiento = null;
    this.request.cptList.splice(indice, 1);
    this.dsCpt = new MatTableDataSource(this.request.cptList);
    this._setDataSource('cpt');
  }

  private agregarAreaEspecAct() {
    let param = {
      area: {
        id: this.selects.actividad.idArea,
        nombre: this.selects.actividad.descripcionArea
      },
      especialidad: {
        id: this.selects.actividad.idEspecialidad,
        nombre: this.selects.actividad.descripcionEspecialidad
      },
      actividad: {
        id: this.selects.actividad.idActividad,
        nombre: this.selects.actividad.descripcionActividad
      }
    }

    this.request.areaEspecActList.push(param);

    this.dsAreaEspecAct = new MatTableDataSource(this.request.areaEspecActList);
    this._setDataSource('actividad');

    this.selects.area = null;
    this.selects.especialidad = null;
    this.selects.actividad = null;
  }

  private deleteAreaEspecAct(indice) {
    this.selects.area = null;
    this.selects.especialidad = null;
    this.selects.actividad = null;
    this.request.areaEspecActList.splice(indice, 1);
    this.dsAreaEspecAct = new MatTableDataSource(this.request.areaEspecActList);
    this._setDataSource('actividad');
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.lsNombreProcedimiento.filter(value => value.descProcedimiento.toLowerCase().indexOf(filterValue));
  }
  filterDescProcs(val: string) {
    this.lsNombreProcedimiento = val ? this._filter(val) : this.lsNombreProcedimiento;
  }
  private isValidModify(){
    return this.isValid;
  }

  //AutoComplete CPT --------------------------------------------------------------------------
  private getProcedimientos(descBusq) {
    this.codigoProcedimiento = "";
    this.descProcAutomplete = "";
    if (descBusq.length == 0) {
      this.lsNombreProcedimiento = [];
      return;
    }
    if (descBusq.length % 2 == 0) {
      this.datoObtenerProcxNum.noProcedimiento = descBusq;
      // this.datoObtenerProcxNum.idCitaEncript = this.idCita;
      this._ProcedimientosService.ObtenerNombreProcedimientos(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            this.datoObtenerProcxNum = { nuProcedimiento: "", noProcedimiento: "" };
            this.lsNombreProcedimiento = data.lsProcedimiento;
            console.log(this.lsNombreProcedimiento);
            
            this.filterDescProcs(descBusq);
          }
          else {
            console.log(data.mensaje);
          }
          return true;
        },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }

  private placeNumDesc(detallesProc) {
    console.log(detallesProc);
    this.codigoProcedimiento = detallesProc.codProcedimiento.trim();
    this.selects.cpt.idCpt = detallesProc.idCpt;
    this.selects.cpt.descProcedimiento = detallesProc.descProcedimiento;
    // this.is_edit = true;
    this.lsNombreProcedimiento = [];
  }

  //Llenar Combos-----------------------------------------------------------------------------------------------------
  private getAreaList() {
    let params = { descripcionArea: null, numPagina: 1, numRegisMostrar: 999999 };
    this._areaService.getAreas(params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.areaList = data.areaList;

        } else {
          this.toastr.error(data.mensaje);
          this.areaList = [];
        }
      },
        error => {
          this.toastr.error("Error al listar las Areas");
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getEspecialidadList() {
    this.selects.especialidad = null;
    if (this.selects.area) {
      let params = { idArea: this.selects.area.idArea, idEspecialidad: null, nuPagina: null, nuRegisMostrar: null };
      this._areaEspecService.obtenerAreaXEspecialidad(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.especialidadList = data.areaEspecialidadList;

          } else {
            this.toastr.error(data.mensaje);
            this.especialidadList = [];
          }
        },
          error => {
            this.toastr.error("Error al listar los Grupos Ocupacionales");
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    }
  }

  private getActividadList() {
    this.selects.actividad = null;
    if (this.selects.especialidad) {
      let params = { idArea: this.selects.area.idArea, idEspecialidad: this.selects.especialidad.especialidad.id, idActividad: null, nuPagina: null, nuRegisMostrar: null };
      this._areaEspecActService.getAreaEspActList(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.actividadList = data.areaEspecialidadActividadList;

            // this.request.areaEspecActList.forEach(aea => {
            //   for (let i = 0; i < this.actividadList.length; i++) {
            //     const element = this.actividadList[i];
            //     if (element.idActividad == aea.actividad.id) {
            //       this.actividadList.splice(i, 1);
            //       break;
            //     }
            //   }
            // });

          } else {
            this.toastr.error(data.mensaje);
            this.actividadList = [];
          }
        },
          error => {
            this.toastr.error("Error al listar los Grupos Ocupacionales");
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    }
  }

  //Cerrar el Modal--------------------------------------------------------------
  private close(add) {
    this.dialogRef.close(add);
  }

  //Validaciones-----------------------------------------------------------------
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

  //Paginacion con ngIf
  _setDataSource(tipoServicio) {
    setTimeout(() => {
      switch (tipoServicio) {
        case 'cpt':
          !this.dsCpt.paginator ? this.dsCpt.paginator = this.paginatorCpt : null;
          break;
        case 'actividad':
          !this.dsAreaEspecAct.paginator ? this.dsAreaEspecAct.paginator = this.paginatorAea : null;
          break;
      }
    });
  }

  private limpiarListaTipoServicio() {
    if (this.radioButtons.flgTipoServ == 'cpt') {
      if (this.request.areaEspecActList.length != 0) {
        const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
          autoFocus: false,
          disableClose: true,
          hasBackdrop: true
        });
        dialogRef.componentInstance.mensajeConfirmacion = 'La lista de Actividades está llena, al cambiar se borrarán los datos. ¿Desea continuar?';
        dialogRef.afterClosed().subscribe(result => {
          if (result == 1) {
            this.request.areaEspecActList = [];
            this.dsAreaEspecAct = new MatTableDataSource(this.request.areaEspecActList);
            this.radioButtons.divActividad = false;
            this.radioButtons.divCpt = true;
          } else {
            this.radioButtons.flgTipoServ = 'actividad';
          }
        });
      } else {
        this.radioButtons.divActividad = false;
        this.radioButtons.divCpt = true;
      }

    } else {
      if (this.request.cptList.length != 0) {
        const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
          autoFocus: false,
          disableClose: true,
          hasBackdrop: true
        });
        dialogRef.componentInstance.mensajeConfirmacion = 'La lista de Procedimientos está llena, al cambiar se borrarán los datos. ¿Desea continuar?';
        dialogRef.afterClosed().subscribe(result => {
          if (result == 1) {
            this.request.cptList = [];
            this.dsCpt = new MatTableDataSource(this.request.cptList);
            this.radioButtons.divActividad = true;
            this.radioButtons.divCpt = false;
          } else {
            this.radioButtons.flgTipoServ = 'cpt'
          }
        });
      } else {
        this.radioButtons.divActividad = true;
        this.radioButtons.divCpt = false;
      }
    }
  }
  private onSearchChange(event) {
    if (event.length < 5) {
      this.descripcionProcedimiento = "";
      this.descProcAutomplete = "";
      // this.is_edit = false;
    }
    else {
      this.datoObtenerProcxNum.nuProcedimiento = event;
      this._ProcedimientosService.ObtenerNombreProcedimientos(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.lsProcedimiento.length == 0) {
              this.descripcionProcedimiento = "";
              this.descProcAutomplete = "";
              // this.is_edit = false;
              if (event.length == 8) {
                this.toastr.warning("No se encontraron Resultados");
              }
            }
            else {
              this.datoObtenerProcxNum = { nuProcedimiento: "", noProcedimiento: "" };
              // this.is_edit = true;
              this.idCpt = data.lsProcedimiento[0].idCpt;
              this.descripcionProcedimiento = data.lsProcedimiento[0].descProcedimiento;
              this.descProcAutomplete = data.lsProcedimiento[0].descProcedimiento;
              this.selects.cpt.idCpt = data.lsProcedimiento[0].idCpt;
              this.selects.cpt.descProcedimiento = data.lsProcedimiento[0].descProcedimiento;
            }
          }
          else {
            console.log(data.mensaje);
          }
          return true;
        },
          error => {
            console.error("Error al Obtener Procedimiento");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  private existElementInList(list, prop, element): boolean {
    console.log(list);
    for (let _item of list) {
      if (_item[prop] == element) {
        return true;
        // break;
      }
    }
    return false;
  }
}