import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ProcedimientosService } from '../../../../services/procedimientos.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-atencion-procedimiento',
  templateUrl: './atencion-procedimiento.component.html',
  styleUrls: ['./atencion-procedimiento.component.scss']
})
export class AtencionProcedimientoComponent implements OnInit {

  displayedColumns = ['codProcedimiento', 'descProcedimiento', 'motivoProcedimiento', 'atender'];
  dataSourceProc = new MatTableDataSource();

  @ViewChild('formProcedimiento')
  private _pForm: NgForm;

  // @Input()
  citaParam: any;

  @Output()
  sendDataProcedimiento = new EventEmitter<string>();

  private lsProcedimientoCita: any[];
  private showTabla = 0;
  private procedDatos = {};
  private buttonDatos: string = 'Atender';
  private _actoMedico = { idActoMedicoEncript: '', idAtencionEncript: '' };

  constructor(private _procedimientosService: ProcedimientosService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute) {
    this._route.queryParams.subscribe(params => {
      this.citaParam = JSON.parse(localStorage.getItem("citaParamProcedimiento"));
      localStorage.removeItem('citaParamProcedimiento')
      // this.citaParam = JSON.parse(params["idCitaProc"]);
      // this.jsonNew.queryParams.idCitaProc = params["idCitaProc"];
      // this.jsonNew.queryParams.idPersona = params["idPersona"];
    });
  }

  ngOnInit() {
    console.log("citaParam: ", this.citaParam)
    this.ObtenerProcedimientosRegistrados()

  }


  ngOnChanges() {
    console.log("citaParam: ", this.citaParam)
    this.ObtenerProcedimientosRegistrados()
  }

  private ObtenerProcedimientosRegistrados() {
    // this.confirmarReserva.idCitaProcedimiento = this.idCitaProcedimientoAnular;
    // let param;

    console.log("asdasdasd ", this.citaParam);
    this._procedimientosService.listarProcedimientosCitados(this.citaParam)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.lsProcedimientoCita = data.lsProcedimientoRegistrado;
          for (let x of this.lsProcedimientoCita) {
            x['class'] = '';
          }
          this.dataSourceProc = new MatTableDataSource(this.lsProcedimientoCita);
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al onbtner Cita: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

    // console.log("asdasdasd ", this.citaParam);
    // this._procedimientosService.listarProcedimientosR(this.citaParam)
    //   .subscribe(data => {
    //     console.log(data);
    //     if (data.estado == 1) {
    //       this.lsProcedimientoCita = data.lsProcedimientoRegistrado;
    //       for (let x of this.lsProcedimientoCita) {
    //         x['class'] = '';
    //       }
    //       this.dataSourceProc = new MatTableDataSource(this.lsProcedimientoCita);
    //     }
    //     else {
    //       console.log(data.mensaje);
    //     }
    //     return true;
    //   },
    //     error => {
    //       console.error("Error al Suspender Cita: ");
    //       return Observable.throw(error);
    //     }),
    //   err => console.error(err),
    //   () => console.log('Request Complete');
  }

  private saveProcedimiento() {
    let _procedDatos = { citaProcedimiento: { idCitaProcedimientoEncrip: this.citaParam.idCitaProcedimientoEncrip, 
                                              procedimiento: this.procedDatos 
                                            } 
                        }
    console.log("DatosProc: ",_procedDatos);
    this._procedimientosService.saveProcedimiento(_procedDatos)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this._actoMedico = { idActoMedicoEncript: data.idActoMedicoEncript, idAtencionEncript: data.idAtencionEncript }
          localStorage.setItem('idActoMedicoEncriptado', this._actoMedico.idActoMedicoEncript);
          localStorage.setItem('idAtencionEncriptado', this._actoMedico.idAtencionEncript);
          this.toastr.success("Datos Insertador Correctamente", "Exitoso");
          // this.resetForm();
          // this.buttonDatos = 'Atender';
          this.ObtenerProcedimientosRegistrados();
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
          this.ObtenerProcedimientosRegistrados();
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
    this.showTabla=1;
    this.procedDatos = datosP;
    this.buttonDatos = 'Atender';
    console.log("datosp: ", this.procedDatos);
  }

  actualizar(datosP: any) {
    this.showTabla=1;
    this.procedDatos = datosP;
    this.buttonDatos = 'Actualizar';
    console.log("datosp: ", this.procedDatos);
    this.lsProcedimientoCita.map((_it, _ix) => { if (_it['codProcedimiento'] == datosP['codProcedimiento']) this.lsProcedimientoCita[_ix]['class'] = 'seleccion' });
    console.log("datospdes: ", this.lsProcedimientoCita);
  }

  registrarProcedimiento(ngForm: NgForm) {
    if (this.buttonDatos == 'Actualizar') {
      this.updateProcedimiento();
    } else if (this.buttonDatos == 'Atender') {
      this.saveProcedimiento();
    }
    this.showTabla=0;
  }

  private send(_params: any) {
    _params = this._actoMedico;
    this.sendDataProcedimiento.emit(_params);
  }

  backto() {
    // this.ds.sendData('regresar');
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-de-procedimientos']);
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
    return this.setQuantifier(_quantifier1, _quantifier2);
  }

}

