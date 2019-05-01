import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AcreditaService } from '../../../../../services/acredita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  // @Input() coberturaResponse;
  // @Input() codiIafasLast;
  // @Input() codiCoberturaLast;



  constructor(
    // private _acreditaService: AcreditaService,
    // private activeModal: NgbActiveModal,
    // private toastr: ToastsManager
  ) { }

  // private IAFASRequest: any[] = [];
  // private CoberturaRequest: any[] = [];
  // private codigoAutorizacion: string;
  // private comboIafas: string;
  // private comboCobertura: string;
  // private editCantidades: boolean = true;
  // private copagoFijo: string;
  // private copagoVariable: string;
  // private descuentoFarm1: string;
  // private descuentoFarm2: string;
  // private coberturaResponse = {codigoAutorizacion:null,codigoIafas:null,codigoCobertura:null,copagoFijo:null,copagoVariable:null,
  //  descFarmacia1:null, descFarmacia2:null};



  // private getIAFAS() {
  //   this._acreditaService.getIAFAS()
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.IAFASRequest = data.iafasList;
  //         // console.log(this.IAFASRequest);
  //         let indexIafas = 0;
  //         for (let i of this.IAFASRequest) {
  //           if (i.codigoIafas == "0000000000") {
  //             this.IAFASRequest.splice(indexIafas, 1);
  //           }
  //           indexIafas++;
  //         }
  //       } else {
  //         console.log(data.mensaje);
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

  // private getCobertura() {
  //   this._acreditaService.getCoberturas()
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.CoberturaRequest = data.coberturaList;
  //         // console.log(data.coberturaList);
  //       } else {
  //         console.log(data.mensaje);
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

  // private validarCopagos() {
  //   let comboIafas = this.comboIafas.split(",", 2);
  //   let comboCobertura = this.comboCobertura.split(",", 2);
  //   if (comboCobertura[0] != "0" && comboIafas[0] != "0") {
  //     this.editCantidades = false;
  //   } else {
  //     this.editCantidades = true;
  //   }
  // }

  // private generarCobertura() {
  //   if (this.codigoAutorizacion == undefined || this.codigoAutorizacion == "") {
  //     this.toastr.error("debe ingresar el codigo de autorizaci&oacute;n", "Cobertura");
  //     return;
  //   }
  //   if (this.editCantidades == true) {
  //     this.toastr.error("debe seleccionar la IAFAS y la Cobertura", "Cobertura");
  //     return;
  //   }
  //   if (this.copagoFijo == undefined || this.copagoFijo == "") {
  //     this.toastr.error("debe ingresar el copago fijo", "Cobertura");
  //     return;
  //   } else if (!/^([0-9])*$/.test(this.copagoFijo)) {
  //     this.toastr.error("El valor de copago fijo " + this.copagoFijo + " no es un n&uacute;mero", "Cobertura");
  //     return;
  //   }

  //   if (this.copagoVariable == undefined || this.copagoVariable == "") {
  //     this.toastr.error("debe ingresar el copago variable", "Cobertura");
  //     return;
  //   } else if (!/^([0-9])*$/.test(this.copagoVariable)) {
  //     this.toastr.error("El valor de copago variable " + this.copagoVariable + " no es un n&uacute;mero", "Cobertura");
  //     return;
  //   }

  //   // if(this.descuentoFarm1 == undefined || this.descuentoFarm1 == ""){
  //   //   this.toastr.error("debe ingresar el decuento de farmacia 1", "Cobertura");
  //   //   return;
  //   // }else if(!/^([0-9])*$/.test(this.descuentoFarm1)){
  //   //   this.toastr.error("El valor de descuento farmacia 1 " + this.descuentoFarm2 + " no es un n&uacute;mero", "Cobertura");
  //   //   return;
  //   // }

  //   // if(this.descuentoFarm2 == undefined || this.descuentoFarm2 == ""){
  //   //   this.toastr.error("debe ingresar el descuento de farmacia 2", "Cobertura");
  //   //   return;
  //   // }else if(!/^([0-9])*$/.test(this.descuentoFarm2)){
  //   //   this.toastr.error("El valor de descuento farmacia 2 " + this.descuentoFarm2 + " no es un n&uacute;mero", "Cobertura");
  //   //   return;
  //   // }
  //   if (this.descuentoFarm1 == undefined || this.descuentoFarm1 == "") {
  //     this.descuentoFarm1 = "0";
  //   } else if (!/^([0-9])*$/.test(this.descuentoFarm1)) {
  //     this.toastr.error("El valor de descuento farmacia 1 " + this.descuentoFarm1 + " no es un n&uacute;mero", "Cobertura");
  //     return;
  //   }

  //   if (this.descuentoFarm2 == undefined || this.descuentoFarm2 == "") {
  //     this.descuentoFarm2 = "0";
  //   } else if (!/^([0-9])*$/.test(this.descuentoFarm2)) {
  //     this.toastr.error("El valor de descuento farmacia 2 " + this.descuentoFarm2 + " no es un n&uacute;mero", "Cobertura");
  //     return;
  //   }

  //   let datos: any = {
  //     codigoAutorizacion: null, codigoIafas: null, descripcionIafas: null, codigoCobertura: null, descripcionCobertura: null
  //     , copagoFijo: null, copagoVariable: null, descFarmacia1: null, descFarmacia2: null
  //   };

  //   let comboIafas = this.comboIafas.split(",", 2);
  //   let comboCobertura = this.comboCobertura.split(",", 2);

  //   datos.codigoAutorizacion = this.codigoAutorizacion;
  //   datos.codigoIafas = comboIafas[0];
  //   datos.descripcionIafas = comboIafas[1];
  //   datos.codigoCobertura = comboCobertura[0];
  //   datos.descripcionCobertura = comboCobertura[1];
  //   datos.copagoFijo = this.copagoFijo;
  //   datos.copagoVariable = this.copagoVariable;
  //   datos.descFarmacia1 = this.descuentoFarm1;
  //   datos.descFarmacia2 = this.descuentoFarm2;

  //   this.coberturaResponse[this.coberturaResponse.length] = datos;

  //   this.codiIafasLast[0] = comboIafas[0];
  //   // this.codiCoberturaLast = comboCobertura[0];

  //   console.log(this.codiIafasLast);

  //   console.log("pusheado");

  //   console.log(this.coberturaResponse);
  //   this.dismiss();
  // }

  // dismiss() {
  //   this.activeModal.dismiss();
  //   this.copagoFijo;
  // }
  // close() {
  //   this.activeModal.close();
  //   this.copagoFijo;
  // }

  ngOnInit() {
    // this.getIAFAS();
    // this.getCobertura();
    // this.comboIafas = "0";
    // this.comboCobertura = "0";
  }

}
