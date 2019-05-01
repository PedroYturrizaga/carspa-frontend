import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { trigger, state, style, animate, transition } from '@angular/animations';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaProcedimientoService } from '../../../services/cita-procedimiento.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.scss'],
})
export class ConfirmarReservaComponent implements OnInit {
  @Input() requestInsertar;

  private idCitaProcedimiento: 0;
  constructor(
    private _otorgarCitaService: CitaProcedimientoService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<ConfirmarReservaComponent>,
  ) { }
  close(_param?: any) {
    this.dialogRef.close(_param);
  }
  dismiss() {
    this.dialogRef.close(false);
  }
  private confirmarReserva() {
    this._otorgarCitaService.confirmarReserva(this.requestInsertar)    
      .subscribe(data => {
        if (data.estado == 1) {
          this.idCitaProcedimiento=data.idCitaProcedimiento;
          console.log(this.idCitaProcedimiento);
          this.toastr.success("", "Reserva de Cita Exitosa");
          this.close(true);
        }
        else {
          this.toastr.error(data.mensaje, "Confirmacion de Reserva");
        }
        return true;
      },
        error => {
          console.error("Error al Confirmar Reserva: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

  }


  ngOnInit() {
  }

}
