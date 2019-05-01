import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

import { HistorialExamenesService } from './../../services/historial-examenes.service';
import { log } from 'util';

@Component({
  selector: 'app-historial-examenes',
  templateUrl: './historial-examenes.component.html',
  styleUrls: ['./historial-examenes.component.scss']
})
export class HistorialExamenesComponent implements OnInit {
  @Input() idTipoDocumentoIdentidad;
  @Input() nuDocumento;
  @Input() idTipoExamen;

  constructor(private _activeModal: NgbActiveModal,
    private toastr: ToastsManager,
    private _historialExamenes: HistorialExamenesService
  ) { }

  private obtenerHistorialOrdenesExamenesCita: any[];

  ngOnInit() {
    console.log(this.idTipoDocumentoIdentidad + "\n" + this.nuDocumento + "\n" + this.idTipoExamen);
    this.GETObtenerHistorialOrdenesExamenesCita();
  }

  dismiss() {
    this._activeModal.dismiss();
  }
  close() {
    this._activeModal.close();
  }

  private GETObtenerHistorialOrdenesExamenesCita() {
    let params: any = { idTipoDocumentoIdentidad: null, nuDocumento: null, idTipoExamen: null, nuPagina: null, nuRegisMostrar: null };
    params.idTipoDocumentoIdentidad = this.idTipoDocumentoIdentidad;
    params.nuDocumento = this.nuDocumento;
    params.idTipoExamen = this.idTipoExamen;
    params.nuPagina = 1;
    params.nuRegisMostrar = 5;
    this._historialExamenes.ObtenerHistorialOrdenesExamenesCita(params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.obtenerHistorialOrdenesExamenesCita = data.listCita;
          console.log(this.obtenerHistorialOrdenesExamenesCita);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          console.error(error);
        });
  }

  supenderOrdenExamen(cita, oExamenDetalle) {
    let param: any = { idCita: cita, ordenesExamenesDetalle: oExamenDetalle }
    this._historialExamenes.SuspenderOrdenesExamenesCita(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se Suspendió Correctamente");
          this.GETObtenerHistorialOrdenesExamenesCita();
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }
}
