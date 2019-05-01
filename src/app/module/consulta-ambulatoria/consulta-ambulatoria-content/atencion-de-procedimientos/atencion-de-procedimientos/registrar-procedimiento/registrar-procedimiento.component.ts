import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ProcedimientosService } from '../../../../services/procedimientos.service';
import { Observable } from 'rxjs/Rx';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-registrar-procedimiento',
  templateUrl: './registrar-procedimiento.component.html',
  styleUrls: ['./registrar-procedimiento.component.scss']
})
export class RegistrarProcedimientoComponent implements OnInit {

  displayedColumns = ['codProcedimiento', 'descProcedimiento', 'motivoProcedimiento', 'atender'];
  dataSourceProc = new MatTableDataSource();

  @ViewChild('formProcedimiento')
  private _pForm: NgForm;

  @Input()
  citaParam: any;

  @Output()
  sendDataProcedimiento = new EventEmitter<string>();

  private lsProcedimientoCita: any[];
  private procedDatos = {};
  private buttonDatos: string = 'Atender';
  private _actoMedico = { idActoMedicoEncript: '', idAtencionEncript: '' };

  constructor(private _procedimientosService: ProcedimientosService,
    private toastr: ToastsManager) { }

  ngOnInit() {
    console.log("cita param: ", this.citaParam);
  }

  ngOnChanges() {
    this.ObtenerProcedimientosCitados()
  }

  private ObtenerProcedimientosCitados() {
    // this.confirmarReserva.idCitaProcedimiento = this.idCitaProcedimientoAnular;
    // let param;
    this._procedimientosService.listarProcedimientosR(this.citaParam)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.lsProcedimientoCita = data.lsProcedimientoRegistrado;
          this.dataSourceProc = new MatTableDataSource(this.lsProcedimientoCita);
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Suspender Cita: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private saveProcedimiento() {
    let _procedDatos = { citaProcedimiento: { idCitaProcedimientoEncrip: this.citaParam.idCitaProcedimientoEncrip, procedimiento: this.procedDatos } }
    this._procedimientosService.saveProcedimiento(_procedDatos)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this._actoMedico = { idActoMedicoEncript: data.idActoMedicoEncript, idAtencionEncript: data.idAtencionEncript }
          localStorage.setItem('idActoMedicoEncriptado',this._actoMedico.idActoMedicoEncript);
          localStorage.setItem('idAtencionEncriptado',this._actoMedico.idAtencionEncript);
          this.toastr.success("Datos Insertador Correctamente", "Exitoso");
          this.resetForm();
          // this.buttonDatos = 'Atender';
          this.ObtenerProcedimientosCitados();
        } else if (data.estado == 0) {
          this.toastr.warning(data.confirmacion, "Advertencia");
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Suspender Cita: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => {
      };
  }

  private updateProcedimiento() {
    let _procedDatos = { procedimiento: this.procedDatos }
    this._procedimientosService.updateProcedimiento(_procedDatos)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.toastr.success("Datos Actualizados Correctamente", "Exitoso");
          this.resetForm();
          this.buttonDatos = 'Atender';
          this.ObtenerProcedimientosCitados();
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Suspender Cita: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => {
      };
  }

  selectProced(datosP: any) {
    this.procedDatos = datosP;
    this.buttonDatos = 'Atender';
    console.log("datosp: ", this.procedDatos);
  }

  actualizar(datosP: any) {
    this.procedDatos = datosP;
    this.buttonDatos = 'Actualizar';
    console.log("datosp: ", this.procedDatos);

  }

  registrarProcedimiento(ngForm: NgForm) {
    if (this.buttonDatos == 'Actualizar') {
      this.updateProcedimiento();
    } else if (this.buttonDatos == 'Atender') {
      this.saveProcedimiento();
    }
  }

  private send(_params: any) {
    _params = this._actoMedico;
    this.sendDataProcedimiento.emit(_params);
  }

  /*----------------------------------
  ----------- Validaciones -----------
  -----------------------------------*/
  resetForm() {
    this._pForm.resetForm();
  }
  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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

}
