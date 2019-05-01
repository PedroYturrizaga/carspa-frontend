import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ServicioService } from '../../../services/servicio.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-servicio',
  templateUrl: './delete-servicio.component.html',
  styleUrls: ['./delete-servicio.component.scss']
})
export class DeleteServicioComponent implements OnInit {

  constructor(private _servicioService: ServicioService, private activeModal: NgbActiveModal, private toastr: ToastsManager) { }

  @Input() idServicio: number;

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

  private eliminarSerivcio() {
    this._servicioService.deleteServicio(this.idServicio)
      .subscribe((data) => {
        if (data.confirmacion.id == 0) {
          this.toastr.error(data.confirmacion.mensaje, "Eliminar servicio");
          this.dismiss();
        } else if (data.confirmacion.id == -1) {
          this.toastr.error(data.confirmacion.mensaje, "Eliminar Servicio")
        } else if (data.estado == -1) {
          this.dismiss();
          this.toastr.error(data.mensaje, "Eliminar servicio")
        } else if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Eliminar servicio")
          this.dismiss();
        }
      });
  }

  ngOnInit() {
  }

}
