import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { PersonalService } from '../../../../services/personal.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-actividad-personal-delete',
  templateUrl: './actividad-personal-delete.component.html',
  styleUrls: ['./actividad-personal-delete.component.scss']
})
export class ActividadPersonalDeleteComponent implements OnInit {

  @Input() actividadPersonalDel;

  private personal: string;
  private actividadesPersonalRequest: any;
  constructor(private activeModal: NgbActiveModal, private _personalService: PersonalService, private toastr: ToastsManager) {


  }

  private eliminarActividadPersonal() {
    // this.personal = this.actividadPersonalDel.idPersonal;
    this.actividadesPersonalRequest = this.actividadPersonalDel;
    this._personalService.eliminarActividadPersonal(this.actividadesPersonalRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Actividad  Personal");
          this.close();
        } else if (data.estado == 0 && data.confirmacion.id == 0) {
          this.toastr.error(data.mensaje, "Actividad  Personal");
        }
      },
        err => {
          console.log(err);
        },
        () => {
          console.log("completado");

        });
  }
  dismiss() {
    this.activeModal.dismiss();
  }
  close() {
    this.activeModal.close();
  }
  ngOnInit() {
  }

}
