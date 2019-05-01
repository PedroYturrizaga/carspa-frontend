import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from '../../../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-confirmar-select-cita',
  templateUrl: './confirmar-select-cita.component.html',
  styleUrls: ['./confirmar-select-cita.component.scss']
})
export class ConfirmarSelectCitaComponent implements OnInit {

  @Input() idPlan;
  @Input() idCita;
  @Input() flgModalConfirmarSelectPlan;
  @Input() descripMedico;
  @Input() tipoCita;
  @Input() descripServicio;
  @Input() descripCobertura;
  @Input() descripIafas;

  constructor(
    private _citaService: CitaService,
    public dialogRef: MatDialogRef<ConfirmarSelectCitaComponent>,
    private toastr: ToastsManager) { }

  private citaRequest = {
    confirmacionCita: null, estadoCita: null, flgCondicion: null, idCita: null,
    idMotivoAnulacion: null, idPlan: null
  };

  private ConfirmarCitaComponent() {
    this.citaRequest.idCita = this.idCita;
    this.citaRequest.flgCondicion = 1;
    this.citaRequest.confirmacionCita = 1;
    this.citaRequest.idPlan = this.idPlan;

    this._citaService.putCitas(this.citaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.onNoClick();
          this.toastr.success("Se confirmo correctamente la reserva", "Registro Acredita");
          this.flgModalConfirmarSelectPlan[0] = 1;
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
  }

}
