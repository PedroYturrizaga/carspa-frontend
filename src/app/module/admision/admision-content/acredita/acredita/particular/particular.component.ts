import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AcreditaService } from '../../../../services/acredita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit {

  // @Input() idPersona;
  // @Input() nombres;
  // @Input() apellidoMaterno;
  // @Input() apellidoPaterno;

  constructor(
    private _acreditaService: AcreditaService,
    private activeModal: NgbActiveModal,
    private toastr: ToastsManager) { }

  // private planRequest = {
  //   plan: {
  //     codigoAsegurado: null, codigoAutorizacion: null, codigoCobertura: null,
  //     codigoDocumentoAutorizacion: "99", codigoIafas: "0000000000", copagoFijo: 0,
  //     copagoVariable: 0, descripcionContratante: null, descuentoFarmacia1: 0,
  //     descuentoFarmacia2: 0, idContratante: "00000000000", idPersona: null,
  //     numeroDocumentoAutorizacion: null, parentesco: 16, tipoAfiliacion: "1"
  //   }
  // };

  // public guardarServicio() {
  //   this.planRequest.plan.idPersona = "hzm9at5+1392Gv7klvMpTg==";//this.idPersona;
  //   this._acreditaService.insertarPlan(this.planRequest)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.dismiss();
  //         this.toastr.success("Se registro correctamente el plan", "Registro Acredita");
  //       } else {
  //         console.log(data.mensaje);
  //         this.toastr.success("Ocurrio un error al registrar el plan", "Registro Acredita");
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
