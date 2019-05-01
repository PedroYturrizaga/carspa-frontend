import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RecetaService } from '../../../../../../services/receta.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-receta',
  templateUrl: './delete-receta.component.html',
  styleUrls: ['./delete-receta.component.scss']
})
export class DeleteRecetaComponent implements OnInit {

  @Input() idReceta;

  constructor(
    public activeModal: NgbActiveModal,
    private _recetaService: RecetaService,
    private toastr: ToastsManager) { }

  ngOnInit() {
  }

  private deleteReceta() {
    console.log('idReceta: ' + this.idReceta);

    this._recetaService.deleteReceta(this.idReceta)
      .subscribe(data => {
        if (data.estado == 1) {
          this.close();
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error('Error al Eliminar', 'Receta');
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
