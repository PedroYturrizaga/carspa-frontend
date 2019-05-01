import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AcreditaService } from '../../../../../services/acredita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent implements OnInit {

  @Input() planRequestModal;
  @Input() nombreCoberturaModal;

  constructor(
    // private _acreditaService: AcreditaService,
    // private activeModal: NgbActiveModal,
    // private toastr: ToastsManager,
    // private router: Router
    ) { }

  // public guardarAcreditacion() {
  //   this._acreditaService.addPlan(this.planRequestModal)
  //     .subscribe(data => {
  //       console.log(data.estado); console.log(data.mensaje);


  //       if (data.estado == 1) {
  //         this.dismiss();
  //         this.toastr.success("Se registro correctamente el plan", "Registro Acredita");
  //         // this.router.navigate(['/acredita']);
  //       } else {
  //         this.toastr.error(data.mensaje, "Registro Acredita");
  //       }
  //       return true;
  //     },
  //       error => {
  //         console.error("Error al Listar");
  //         return Observable.throw(error);
  //       }),
  //     err => console.error(err),
  //     () => console.log('Request Complete');
  // }

  // dismiss() {
  //   this.activeModal.dismiss();
  // }
  // close() {
  //   this.activeModal.close();
  // }

  ngOnInit() {
  }

}
