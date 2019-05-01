import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AtencionMedicaAmbulatoriaService } from '../../../../services/atencion-medica-ambulatoria.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-detalle-atencion-medica-ambulatoria',
  templateUrl: './detalle-atencion-medica-ambulatoria.component.html',
  styleUrls: ['./detalle-atencion-medica-ambulatoria.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.10, .10, .10)' }))
      ])
    ])
  ]
})
export class DetalleAtencionMedicaAmbulatoriaComponent implements OnInit {
  @Input() idCitaJson;

  constructor(public dialogRef: MatDialogRef<DetalleAtencionMedicaAmbulatoriaComponent>,
    private _atencionMedicaAmbulatoriaService: AtencionMedicaAmbulatoriaService,
    private toastr: ToastsManager) { }


  onNoClick(): void {
    this.dialogRef.close(1);
  }


  private confirmarFalta() {
    let jsonCita = '{"cita": {"idCitaEncrip" :"' + this.idCitaJson + '"}}';
    jsonCita = JSON.parse(jsonCita);
    console.log(jsonCita);
    this._atencionMedicaAmbulatoriaService.updateEstadoCita(jsonCita)
      .subscribe(data => {
        console.log(data);

        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.onNoClick();
            this.toastr.success("Cita Suspendida");
          } else if (data.confirmacion.id == 0) {
            this.toastr.info(data.confirmacion.mensaje);
          }
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

  ngOnInit() {
  }
}
