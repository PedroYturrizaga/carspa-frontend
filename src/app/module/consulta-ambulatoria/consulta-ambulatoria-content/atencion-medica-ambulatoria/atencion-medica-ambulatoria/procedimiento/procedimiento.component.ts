import { CambiarValoresEncriptados } from './../../../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { startWith } from 'rxjs/operators/startWith';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ProcedimientosAnterioresComponent } from './procedimientos-anteriores/procedimientos-anteriores.component';
import { DetallesProcedimientoComponent } from './procedimientos-anteriores/detalles-procedimiento/detalles-procedimiento.component';
import { ProcedimientosService } from '../../../../services/procedimientos.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.scss']
})

export class ProcedimientoComponent implements OnInit {

  private numActoMedico: string;
  private idAtencion;
  private idPersona: string;
  private idCita: string;

  // MOSTRAR TABLAS
  private isValid: boolean = false;
  private showButton: Number = 1;
  private showProcRegi: Number = 1;
  private showProcAnt: Number = 1;


  // VARIABLES
  private cantidadProc = "1";
  private codigoProcedimiento = ""; //formulario CODIGOCPT
  private descripcionProcedimiento = ""; //formulario input autocomplete
  private descProcAutomplete = ""; //texto completo autocomplete
  private motivo = "";
  private idCpt = 0;
  private codigoCPT = "";

  // JSONS
  private obtenerDatosAct: any = { idProcedimiento: 0 };
  private datoObtenerProcxNum: any = { nuProcedimiento: "", noProcedimiento: "" };
  private datosGuardarProc: any = {
    procedimiento: {
      actoMedico: { idActoMedicoEncriptado: "" },
      cantidad: "",
      descProcedimiento: "",
      idCpt: 0,
      motivoProcedimiento: ""
    }
  };
  private datosActualizar: any = { procedimiento: { idProcedimiento: 0, cantidad: 0, descProcedimiento: "", motivoProcedimiento: "", idCpt: 0 } };
  private datoEliminar: any = { procedimiento: { idProcedimiento: 0 } };
  private datosListarProcRegi: any = { idActoMedicoEncrip: null, idAtencionEncrip: null, idCitaProcedimientoEncrip: null };
  private listarProcA: any = { idPersona: "" };

  // LISTAS
  private lsNombreProcedimiento: any = [];
  private procedimientoR: any = [];
  private procedimientoA: any = [];
  private procedimientoAlimit2: any = [];
  private vector: any = [];
  private datosParaEditar: any = {};
  private procedimiento: any[] = [];
  private datosProc: any[] = [];
  private estadoDetalle: any = [];

  displayedProcedimientosRegistrados = ['codigo', 'descProcedimiento', 'cantidad', 'motivo', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource();

  displayedProcedimientosAnteriores = ['codigo', 'descProcedimientoss', 'cantidad', 'informe',
                                       'fecha',  'personal', 'estadoProc', 'ver'];
  dataSource2 = new MatTableDataSource();

  // BOOLEANOS
  private noRegistroos: boolean = true; //bloquear VER MAS
  private cont = true;

  constructor(
    private toastr: ToastsManager,
    private _ProcedimientosService: ProcedimientosService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    public cambiarValores: CambiarValoresEncriptados
  ) {
    this._route.queryParams.subscribe(params => {
      // this.numActoMedico = params["idActoMedico"];
      this.idPersona = params["idPersona"];
      this.idCita = params["idCita"];
    });
    this.numActoMedico = localStorage.getItem("idActoMedicoEncriptado");
    this.idAtencion = localStorage.getItem('idAtencionEncriptado');
  }
  filterDescProcs(val: string) {
    this.lsNombreProcedimiento = val ? this._filter(val) : this.lsNombreProcedimiento;
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.lsNombreProcedimiento.filter(value => value.descProcedimiento.toLowerCase().indexOf(filterValue));
  }
  private getProcedimientos(descBusq) {
    this.codigoProcedimiento = "";
    this.descProcAutomplete = "";
    if (descBusq.length == 0) {
      this.lsNombreProcedimiento = [];
      return;
    }
    if (descBusq.length % 2 == 0) {
      this.datoObtenerProcxNum.noProcedimiento = descBusq;
      this.datoObtenerProcxNum.idCitaEncript = this.idCita;
      this._ProcedimientosService.ObtenerNombreProcedimientos(this.datoObtenerProcxNum)
        .subscribe(data => {
          console.log(data);
          if (data.estado == 1) {
            this.datoObtenerProcxNum = { nuProcedimiento: "", noProcedimiento: "" };
            this.lsNombreProcedimiento = data.lsProcedimiento;
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
    this.codigoProcedimiento = detallesProc.codProcedimiento.trim();
    this.idCpt = detallesProc.idCpt;
    this.descProcAutomplete = detallesProc.descProcedimiento;
    // this.is_edit = true;
    this.lsNombreProcedimiento = [];
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
  private openModalListar(){
    const dialogRef = this.dialog.open(ProcedimientosAnterioresComponent, {
      autoFocus: false,
      width: '90%',
      maxWidth: '90%',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.procedimientoA = this.procedimientoA;
    dialogRef.afterClosed().subscribe(result => { });
  }

  private verDetalles(detProcedimiento){
    const dialogRef = this.dialog.open(DetallesProcedimientoComponent, {
      autoFocus: false,
      maxWidth: '80%',
      width: '60%',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.detProcedimiento = detProcedimiento;
    dialogRef.afterClosed().subscribe(result => { });
  }
  private grabarProcedimiento(_controlVar) {
    if (this.isInvalid()) {
      return;
    }
    if(this.numActoMedico == null){
      this.toastr.info("No hay Procedimiento anteriores");
      return;
    }
    this.datosGuardarProc = {
      procedimiento: {
        actoMedico: { idActoMedicoEncriptado: this.numActoMedico, idAtencionEncriptado: this.idAtencion },
        cantidad: Number(this.cantidadProc),
        descProcedimiento: this.descripcionProcedimiento,
        idCpt: this.idCpt,
        motivoProcedimiento: this.motivo,
        codigoProcedimiento: this.codigoProcedimiento
      }
    };
    let a = 0;
    //Validacion para que no se seleccione 2 veces el mismo procedimiento
    console.log(this.procedimientoR)
    console.log(this.datosGuardarProc)
    for(let i  of this.procedimientoR){
      if(i.codProcedimiento == this.datosGuardarProc.procedimiento.codigoProcedimiento && i.descProcedimiento == this.datosGuardarProc.procedimiento.descProcedimiento){
        this.toastr.warning("El procedimiento ya ha sido Seleccionado");
        return;
      }
    };
    if (a != 0) {
      return;      
    }
    this._ProcedimientosService.GuardarProcedimiento(this.datosGuardarProc)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("EXITOSO", "Registro de Orden de Procedimiento");
          this.listarProcedimientosRegi();
          this.cleanRegistro(_controlVar);
        } else {
          console.log(data);
        }
        return true;
      },
        error => {
          console.error("Error al Insertar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private obtenerDatosProcedimientoActualizar(procAct) {
    this.descProcAutomplete = "";
    this.obtenerDatosAct.idProcedimiento = procAct.idProcedimiento;
    this.codigoCPT = procAct.codProcedimiento.trim();
    this._ProcedimientosService.obtenerDatosEditar(this.obtenerDatosAct)
      .subscribe(data => {
        if (data.estado == 1) {
          this.datosParaEditar = data.lsProcedimiento[0];
          this.showButton = 2; // mostrar boton "ACTUALIZAR CANCELAR"
          this.codigoProcedimiento = this.codigoCPT;
          this.descripcionProcedimiento = this.datosParaEditar.descProcedimiento;
          this.descProcAutomplete = this.datosParaEditar.descProcedimiento;
          this.idCpt = this.datosParaEditar.idCpt;
          this.cantidadProc = this.datosParaEditar.cantidad;
          this.motivo = this.datosParaEditar.motivoProcedimiento;
          this.isValid = true;
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos para Editar ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private ActualizarProcedimiento(_controlVar) {
    if (this.isInvalid()) {
      return;
    }
    this.datosActualizar = {
      procedimiento: {
        idProcedimiento: this.obtenerDatosAct.idProcedimiento,
        cantidad: Number(this.cantidadProc),
        descProcedimiento: this.datosParaEditar.descProcedimiento,
        motivoProcedimiento: this.motivo,
        idCpt: this.idCpt
      }
    };
    console.log(this.datosActualizar)
    this._ProcedimientosService.ActualizarProcedimiento(this.datosActualizar)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Actualizacion de Orden de Procedimiento Exitosa");
          this.listarProcedimientosRegi();
          this.cleanRegistro(_controlVar);
          this.showButton = 1;
        }
        else {
          console.log(data);
        }
        return true;
      },
        error => {
          console.error("Error al Actualizar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private cancelarActualizacion(_controlVar) {
    this.cleanRegistro(_controlVar);
    this.showButton = 1;
    this.isValid = false;
  }
  private eliminarSolicitudProcedimiento(idEliminar) {
    this.datoEliminar.procedimiento.idProcedimiento = idEliminar;
    this._ProcedimientosService.EliminarProcedimiento(this.datoEliminar)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Exitoso", "Eliminacion de Solicitud de Procedimiento");
          this.listarProcedimientosRegi();
        }
        else {
          this.toastr.warning("", "Procedimiento ya Cuenta con Cita, Imposible Eliminar");
          console.log(data);
        }
        return true;
      },
        error => {
          console.error("Error al Eliminar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private listarProcedimientosRegi() {
    if(this.numActoMedico == null){
      this.toastr.warning("No tiene Un acto Medico, No puede ver Procedimientos Registrados")
      return;
    }else {
      this.datosListarProcRegi.idActoMedicoEncrip = this.numActoMedico;
      this.datosListarProcRegi.idAtencionEncrip = this.idAtencion;
      this.datosListarProcRegi.idCitaProcedimientoEncrip = this.idCita;
      console.log(this.datosListarProcRegi)
      this._ProcedimientosService.listarProcedimientosR(this.datosListarProcRegi)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          if (data.lsProcedimientoRegistrado.length == 0) {
            this.showProcRegi = 1;
            this.toastr.info("Aun no se han Ordenado Procedimientos");
          }
          else {
            this.showProcRegi = 2;
            this.procedimientoR = data.lsProcedimientoRegistrado;
            this.dataSource = new MatTableDataSource(this.procedimientoR);
          }
        }
        else {
          this.toastr.error(data.mensaje);
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
  private listarProcedimientosAnt() {
    // this.listarProcA.idPersona = 'mLZddbRuBjFVHK0PDT6cwA==';
    this.listarProcA.idPersona = this.idPersona;
    // this.listarProcA.idPersona = this.listarProcA.idPersona;
    console.log(this.listarProcA)
    this._ProcedimientosService.listarProcedimientosA(this.listarProcA)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          if (data.lsProcedimientoAnterior.length == 0) {
            this.showProcAnt = 1;
            this.toastr.info("El Paciente no tiene Procedimientos Anteriores");
          }
          else {
            this.showProcAnt = 2;
            this.procedimientoA = data.lsProcedimientoAnterior;
            this.verificarEstadoProcedimiento();
            if (data.lsProcedimientoAnterior.length == 1) {
              this.procedimientoAlimit2[0] = data.lsProcedimientoAnterior[0];
              this.noRegistroos = true;
            }
            else {
              this.procedimientoAlimit2[0] = data.lsProcedimientoAnterior[0];
              this.procedimientoAlimit2[1] = data.lsProcedimientoAnterior[1];
              this.noRegistroos = true ;
              if(this.procedimientoA.length > 2){
                this.noRegistroos = false;
              }
            }
            this.dataSource2 = new MatTableDataSource(this.procedimientoAlimit2);
          }
        }
        else {
          console.log(data.mensaje);
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Listar Procedimientos Anteriores");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

  }
  private verificarEstadoProcedimiento() {
    for (var i = 0; i < this.procedimientoA.length; i++) {
      if (this.procedimientoA[i].estadoOrden == 'Atendida') {
        this.estadoDetalle[i] = 1;
      }
      else {
        this.estadoDetalle[i] = 2;
      }
    }
  }
  private cleanRegistro(_controlVar: any) {
    _controlVar.reset();
    this.cantidadProc = "1";
    this.descProcAutomplete = "";
    this.isValid = false;
  }
  private noRegistros(){
    return this.noRegistroos;
  }
  private isValidModify(){
    return this.isValid;
  }
  private isInvalid(): boolean {
    return this.codigoProcedimiento == "" || this.codigoProcedimiento == null || this.codigoProcedimiento == undefined ||
      this.descripcionProcedimiento == "" || this.descripcionProcedimiento == null || this.descripcionProcedimiento == undefined ||
      this.cantidadProc == "" || this.cantidadProc == null || this.cantidadProc == undefined || this.descProcAutomplete == "" || this.descProcAutomplete == null || this.descProcAutomplete == undefined;
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
  ngOnInit() {
    this.listarProcedimientosRegi();
    this.listarProcedimientosAnt();
  }
}