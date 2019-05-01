import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from '../../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-confirmar-cita',
  templateUrl: './confirmar-cita.component.html',
  styleUrls: ['./confirmar-cita.component.scss']
})
export class ConfirmarCitaComponent implements OnInit {

  @Input() pacienteConf;
  @Input() tipoConfirmacion;
  @Input() tipoCita;
  @Input() cmbMotivoSuspencion;
  @Input() flgActualizacionTableInterModal;

  private flgMensaje: number = 0;
  private flgTipoConfirmacion: boolean;
  private citaRequest = {
    confirmacionCita: null, estadoCita: null, flgCondicion: null, idCita: null,
    idMotivoAnulacion: null, idPlan: null
  }

  constructor(private _citaService: CitaService,
              private toastr: ToastsManager,
              public dialogRef: MatDialogRef<ConfirmarCitaComponent>,
               ) { }


  private ConfirmarCitaComponent() {
    this.citaRequest.idCita = this.pacienteConf.idCita;
    this.citaRequest.flgCondicion = 1;
    this.citaRequest.confirmacionCita = 1;
    // this.citaRequest.idPlan = this.pacienteConf.idPlan;

    this._citaService.putCitas(this.citaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.onNoClick();
          this.toastr.success("Se confirmo correctamente la reserva", "Registro Acredita");
          this.flgActualizacionTableInterModal[0] = 1;
        } else {
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

  private suspenderCita() {
    this.citaRequest.estadoCita = "S";
    this.citaRequest.flgCondicion = 0;
    this.citaRequest.idCita = this.pacienteConf.idCita;
    this.citaRequest.idMotivoAnulacion = this.cmbMotivoSuspencion;

    this._citaService.putCitas(this.citaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          if (this.flgMensaje == 0) {
            this.toastr.success("Se suspendio correctamente la reserva", "Registro Acredita");
          } else {
            this.toastr.success("Se suspendio correctamente la cita", "Registro Acredita");
          }
          this.flgActualizacionTableInterModal[0] = 1;
          this.onNoClick();
        } else {
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

  
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    if (this.tipoConfirmacion == 0) {
      //activo para confirmacion de aprobacion de una reserva
      this.flgTipoConfirmacion = true;
    } else {
      //activo para confirmacion de suspencion
      this.flgTipoConfirmacion = false;
    }
    if (this.tipoCita == "") {
      this.flgMensaje = 1;
      this.tipoCita = this.pacienteConf.tipoCita;
    } else {
      this.tipoCita = this.tipoCita + " de " + this.pacienteConf.tipoCita;
    }

  }

}
