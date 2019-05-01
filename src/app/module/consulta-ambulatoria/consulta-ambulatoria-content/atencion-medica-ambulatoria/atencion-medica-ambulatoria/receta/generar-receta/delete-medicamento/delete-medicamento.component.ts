import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RecetaService } from '../../../../../../services/receta.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-medicamento',
  templateUrl: './delete-medicamento.component.html',
  styleUrls: ['./delete-medicamento.component.scss']
})
export class DeleteMedicamentoComponent implements OnInit {

  @Input() idDetalleReceta;

  constructor(
    public activeModal: NgbActiveModal,
    private _recetaService: RecetaService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
  }

  private deleteMedicamento() {
    this._recetaService.deleteDetalleReceta(this.idDetalleReceta)
      .subscribe(data => {
        if (data.estado == 1) {
          this.close();
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.confirmacion.mensaje);
        }
        return true;
      },
        error => {
          this.toastr.error('Error al Eliminar', 'Medicamento');
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  dismiss() {
    this.activeModal.dismiss();
  }
  close() {
    this.activeModal.close();
  }

}
