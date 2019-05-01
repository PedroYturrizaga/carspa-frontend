import { DataService } from './../../../../../../shared/services/data.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { AtencionProcedimientosService } from '../../../../services/atencion-procedimientos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-procedimientos-a-realizar',
  templateUrl: './procedimientos-a-realizar.component.html',
  styleUrls: ['./procedimientos-a-realizar.component.scss']

})
export class ProcedimientosARealizarComponent implements OnInit {

  private idCitaProc = "";

  private informe = "";
  private nuevoEncriptado = "";

  private citasProcedimiento: any = [];
  private datosPaciente: any = {
    persona: {
      descripcionDocumento: "",
      numeroDocumentoIdentidad: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      sexo: "",
      idHistoria: 0
    }
  };

  private procedimientoSeleccionado: any = { idProcedimiento: null, idCPT: null, descProcedimiento: null };
  private procedimientoGuardar: any = { idProcedimiento: null, idCitaProcedimiento: "", informe: "" };
  private is_edit: boolean = true;

  private displayedColumnsProcedimientoAtender = ['numeroProcedimiento', 'descProcedimiento'];
  dataSource = new MatTableDataSource();


  constructor(
    private toastr: ToastsManager,
    private _atenderProcedimientoService: AtencionProcedimientosService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService) {
    this._route.queryParams.subscribe(params => {
      this.idCitaProc = params["idCitaProc"];
    });
  }

  private convertirEncriptado(idCitaProcedimiento) {
    this.nuevoEncriptado = idCitaProcedimiento.split('+').join('%2B');
    this.nuevoEncriptado = this.nuevoEncriptado.split('@').join('%40');
    this.nuevoEncriptado = this.nuevoEncriptado.split(':').join('%3A');
    this.nuevoEncriptado = this.nuevoEncriptado.split('$').join('%24');
    this.nuevoEncriptado = this.nuevoEncriptado.split(',').join('%2C');
    this.nuevoEncriptado = this.nuevoEncriptado.split(';').join('%3B');
    this.nuevoEncriptado = this.nuevoEncriptado.split('=').join('%3D');
    this.nuevoEncriptado = this.nuevoEncriptado.split('?').join('%3F');
    this.nuevoEncriptado = this.nuevoEncriptado.split('/').join('%2F');
    this.getDatosDelPaciente(this.nuevoEncriptado);
    this.getProcedimientosPaciente(this.nuevoEncriptado);
  }
  private getDatosDelPaciente(idCitaProcedimiento) {
    this._atenderProcedimientoService.getDatosPaciente(idCitaProcedimiento)
      .subscribe(data => {
        if (data.estado == 1) {
          this.datosPaciente = data.lsCitaProcedimiento[0];
        }
        else {
          this.toastr.error("idCita Incorrecta", "");
          this.retornarAtencionProcedimientos();
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getProcedimientosPaciente(idCitaProcedimiento: any) {
    this.citasProcedimiento = [];
    this._atenderProcedimientoService.getProcedimientosAtender(idCitaProcedimiento)
      .subscribe(data => {
        if (data.estado == 1) {
          this.citasProcedimiento = data.lsCitaProcedimiento;
          this.dataSource = this.citasProcedimiento;
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Procedimientos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getDatosToLlenar(p, informeForm) {
    informeForm.reset();
    this.procedimientoSeleccionado = {
      idProcedimiento: p.procedimiento.idProcedimiento,
      idCPT: p.procedimiento.idCpt,
      descProcedimiento: p.procedimiento.descProcedimiento
    };
    if (p.procedimiento.informe == undefined || p.procedimiento.informe == null) {
      this.informe = "";
    }
    else {
      this.informe = p.procedimiento.informe
    }
  }
  private grabarInformeProcedimiento(_controlVar, descProc) {
    if (_controlVar['invalid'] || _controlVar['pending'] || descProc == null || descProc == "") {
      return;
    }
    this.procedimientoGuardar = {
      idProcedimiento: this.procedimientoSeleccionado.idProcedimiento,
      informe: this.informe
    };
    console.log(this.procedimientoGuardar);
    this._atenderProcedimientoService.guardarAtencionProcedimiento(this.procedimientoGuardar)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Registro de Informe Exitoso", "");          
          this.limpiarCamposIngreso();
          this.getProcedimientosPaciente(this.nuevoEncriptado);

        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

  }
  private limpiarCamposIngreso() {
    this.procedimientoSeleccionado = { idProcedimiento: null, descProcedimiento: "", informe: "" };
    this.informe = "";
  }
  isDisabled(): boolean {
    return this.is_edit;
  }
  private isInvalid(_ngForm: any, descProc: any, informe: any): boolean {
    return _ngForm['invalid'] || _ngForm['pending'] || descProc == null || descProc == "" || informe == "" ||informe == null;
  }
  private retornarAtencionProcedimientos() {
    // this.ds.sendData('goToAtencionProcedimiento'); //CAMBIA ESTILO ATENCION PROCEDIMIENTO
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-de-procedimientos'], {queryParams : {"cambiarEstado": true}} );
  }
  ngOnInit() {
    this.convertirEncriptado(this.idCitaProc);
  }
}
