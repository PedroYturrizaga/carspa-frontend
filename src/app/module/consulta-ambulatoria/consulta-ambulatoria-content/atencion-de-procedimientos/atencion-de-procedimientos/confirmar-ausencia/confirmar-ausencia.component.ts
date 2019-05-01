import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AtencionProcedimientosService } from '../../../../services/atencion-procedimientos.service';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar-ausencia',
  templateUrl: './confirmar-ausencia.component.html',
  styleUrls: ['./confirmar-ausencia.component.scss'],
})
export class ConfirmarAusenciaComponent implements OnInit {
  @Input() idCitaProcedimientoAnular;
  private confirmarReserva: any = { idCitaProcedimiento: 0 };

  constructor(
    private _atenderProcedimientoService: AtencionProcedimientosService,
    public dialogRef: MatDialogRef<ConfirmarAusenciaComponent>
  ) { }

  // private cambiarEstadoPaciente() {
  //   this.confirmarReserva.idCitaProcedimiento = this.idCitaProcedimientoAnular;
  //   this._atenderProcedimientoService.noSePresento(this.confirmarReserva)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.close();
  //       }
  //       else {
  //         console.log(data.mensaje);
  //       }
  //       return true;
  //     },
  //       error => {
  //         console.error("Error al Suspender Cita: ");
  //         return Observable.throw(error);
  //       }),
  //     err => console.error(err),
  //     () => console.log('Request Complete');
  // }
  close() {
    this.dialogRef.close(1);
  }
  dismiss() {
    this.dialogRef.close(0);
  }
  ngOnInit() {
  }

}
