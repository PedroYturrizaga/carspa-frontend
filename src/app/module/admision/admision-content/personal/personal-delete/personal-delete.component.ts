import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { PersonalService } from '../../../services/personal.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal-delete',
  templateUrl: './personal-delete.component.html',
  styleUrls: ['./personal-delete.component.scss']
})
export class PersonalDeleteComponent implements OnInit {
  @Input() idPersonal;

  constructor(public activeModal: NgbActiveModal,
    private _personalService: PersonalService,
    private toastr: ToastsManager) { }


  /**
   * eliminar personal
   */
  private eliminarPersonal() {
    console.log(this.idPersonal);
    
    if (this.idPersonal != "") {
      this._personalService.eliminarPersonal(this.idPersonal)
        .subscribe(data => {
          console.log(this.idPersonal);
          
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
            this.close();
          } else if (data.estado == 0 && data.confirmacion.id == 0) {
            this.toastr.warning(data.confirmacion.mensaje);
            this.close();
          }
        },
          error => {

            console.error(error)
          });
    }
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
