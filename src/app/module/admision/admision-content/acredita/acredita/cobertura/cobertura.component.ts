import { Component, OnInit, Input, Output, ContentChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AcreditaService } from '../../../../services/acredita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AcreditaComponent } from '../../acredita/acredita.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { ManualComponent } from './manual/manual.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.scss']
})
export class CoberturaComponent implements OnInit {
  @Input() lsCoberturas: any = { inConCod271Detalles: null };
  @Input() lsAcreditacion: any = { conAse270: null };
  @Input() params: any;
  // displayedColumnIafas = ['descripcionIafas', 'descripcionContratante'];
  // dataSource1 = new MatTableDataSource();

  // displayedColumnCobertura = ['descripcionCobertura', 'copagoFijo', 'copagoVariable', 'descuentoFarmacia1', 'descuentoFarmacia2'];
  // dataSource2 = new MatTableDataSource();

  // displayedColumnCoberturaHoy = ['descripcionIafas', 'descripcionContratante', 'descripcionCobertura', 'copagoFijo', 'copagoVariable', 'descuentoFarmacia1', 'descuentoFarmacia2'];
  // dataSourceHoy = new MatTableDataSource();

  // @Input() paramJson;
  // @Output() coberturaDisabled = new EventEmitter<boolean>();

  // private id: any;
  // private numeroDoc: number;
  // private tipoDoc: number;
  // private idIafas: number;
  // private idContratante: number;
  // public persona: any[] = [];
  // private iafas: any[] = [];
  // private cobertura: any[] = [];
  // private paciente: any[] = [];
  // private flVisionFiliar: boolean = false;
  // private flVisionPlanTable: boolean = false;
  // private nombreCoberturaModal: string = "";
  // private plan: any[] = [];
  // private flgNoServicio: boolean = false;
  // private flgNoServicio1: boolean = false;
  // public coberturaResponse: any[] = [];
  // public codiIafasLast: any[] = [];
  // private flgManual: number = 0;
  // // public codiCoberturaLast: String;

  // private planRequest = {
  //   plan: {
  //     codigoAsegurado: null, codigoAutorizacion: null, codigoCobertura: null,
  //     codigoDocumentoAutorizacion: null, codigoIafas: null, copagoFijo: null,
  //     copagoVariable: null, descripcionContratante: null, descuentoFarmacia1: null,
  //     descuentoFarmacia2: null, idContratante: null, idPersona: null,
  //     numeroDocumentoAutorizacion: null, parentesco: null, tipoAfiliacion: null
  //   }
  // };

  displayedColumnCobertura = ['codigo', 'coberturas', 'restricciones', 'copagoFijo', 'CopagoVariable', 'finCarencia', 'cartaGarantia'];
  dataSourceCobertura = new MatTableDataSource();

  @Output() sendCobertura = new EventEmitter<string>();
  private requestPlan = {
    "plan": {
      "codigoAsegurado": null,
      "copagoFijo": null,
      "copagoVariable": null,
      "descuentoFarmacia1": null,
      "descuentoFarmacia2": null,
      "codigoAutorizacion": null,
      "numeroDocumentoAutorizacion": null,
      "tipoAfiliacion": null,
      "idPersona": null,
      "codigoIafas": null,
      "idContratante": null,
      "codigoCobertura": null,
      "codigoDocumentoAutorizacion": null,
      "descripcionCobertura": null,
      "parentesco": null,
      "idSubTipoCobertura": null,
      "idTipoCobertura": null,

      // "descripcionContratante": null,
      // "descripcionIafas": null,
      // "idPlan": null,
    }
  }

  // private lsCobertura: any = [{ codigo: 4100, coberturas: 'CONS. AMB', restricciones: 'VER DETALLES', copagoFijo: '30.00 SOLES POR ATENCION', CopagoVariable: 'cubierto al 80%', finCarencia: '03/02/2023', cartaGarantia: 'SI' },
  // { codigo: 100, coberturas: 'CONS. AMB', restricciones: 'VER DETALLES', copagoFijo: '45.00 SOLES POR ATENCION', CopagoVariable: 'cubierto al 70%', finCarencia: '03/02/2027', cartaGarantia: 'SI' }]
  constructor(
    private _acreditaService: AcreditaService,
    private toastr: ToastsManager,
    // private modalService: NgbModal,
    // private router: ActivatedRoute
  ) {

  }

  sendRequest(_lsrequest: any) {
    console.log(_lsrequest);
    let _codigo = this.aleatorio(1,999999999999999);
    this.requestPlan = {
      "plan": {
        "codigoAsegurado": this.lsAcreditacion.conAse270.coAfPaciente,
        "copagoFijo": _lsrequest.coPagoFijo.toString(),
        "copagoVariable": _lsrequest.coPagoVariable.toString(),
        "descuentoFarmacia1": "0.0",
        "descuentoFarmacia2": "0.0",
        "codigoAutorizacion": _codigo,
        "numeroDocumentoAutorizacion": _codigo,
        "tipoAfiliacion": this.lsCoberturas.tiDoPaciente,
        "idPersona": this.lsCoberturas.nuDoPaciente,
        "codigoIafas": this.lsAcreditacion.conAse270.idRemitente,
        "idContratante": this.lsCoberturas.coReContratante,
        "codigoCobertura": _lsrequest.nuCobertura,
        "codigoDocumentoAutorizacion": "1",
        "descripcionCobertura": _lsrequest.desCobertura,
        "parentesco": this.lsCoberturas.coParentesco,
        "idSubTipoCobertura": _lsrequest.coSubTiCobertura,
        "idTipoCobertura": _lsrequest.coTiCobertura
      }
    }
    console.log(this.requestPlan)
    // postPlan

  }

  postService() {
    this._acreditaService.postPlan(this.requestPlan)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Registro Exitoso");
          this.toBack();
        } else if (data.estado == 0) {
          // this.iafaList = data.convenioList;
          this.toastr.warning(data.mensaje, "Advertencia");
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private toBack() {
    let _params: any = { flagview: true };

    this.sendCobertura.emit(_params);
  }

  aleatorio(minimo: number, maximo: number): String {
    let as: any = Math.floor(Math.random() * ((maximo + 1) - minimo) + minimo);
    return as.toString();
  }

  // private getPersona(numDocumento: number, tipDocumento: number) {
  //   this._acreditaService.getAllPersona(numDocumento, tipDocumento)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.persona = data.personaList;
  //         console.log(this.persona[0]["iafasList"]);
  //         console.log(this.persona[0]["coberturaList"]);

  //         for (let ia of this.persona[0]["iafasList"]) {
  //           //se ve la vigencia de la iafa con contratante
  //           if (ia.flEstado == 1) {
  //             ia.color = "";
  //             if (ia.idIafas == this.idIafas && ia.idContratante == this.idContratante) {
  //               ia.color = "bg-primary";
  //             }
  //             this.iafas.push(ia);
  //           }
  //         }
  //         this.dataSource1 = new MatTableDataSource(this.iafas);
  //         for (let cob of this.persona[0]["coberturaList"]) {
  //           cob.color = "";
  //           if (cob.idIafas == this.idIafas) {
  //             this.cobertura.push(cob);
  //           }
  //         }
  //         this.dataSource2 = new MatTableDataSource(this.cobertura);
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

  // private getCoberturas(idIafas: number, idContratante: number) {
  //   if (idContratante != null) {
  //     this.cobertura = [];
  //     this.iafas = [];
  //     for (let ia of this.persona[0]["iafasList"]) {
  //       if (ia.flEstado == 1) {
  //         ia.color = "";
  //         if (ia.idIafas == idIafas && ia.idContratante == idContratante) {
  //           ia.color = "bg-primary";
  //         }
  //         this.iafas.push(ia);
  //       }s
  //     }

  //     for (let le of this.persona[0]["coberturaList"]) {
  //       le.color = "";
  //       if (idIafas == le.idIafas) {
  //         this.cobertura.push(le);
  //       }
  //     }

  //   } else {
  //     this.cobertura = [];
  //     for (let a of this.iafas) {
  //       a.color = "";
  //       if (a.codigoIafas == idIafas) {
  //         a.color = "bg-primary";
  //       }
  //     }
  //     for (let a of this.coberturaResponse) {
  //       let cobertura: any;
  //       if (a.codigoIafas == idIafas) {
  //         cobertura = {
  //           codigoCobertura: a.codigoCobertura, color: null, copagoFijo: a.copagoFijo, copagoVariable: a.copagoVariable,
  //           descripcionCobertura: a.descripcionCobertura, descuentoFarmacia1: a.descFarmacia1,
  //           descuentoFarmacia2: a.descFarmacia2, flEstado: null, idCobertura: a.codigoCobertura, idIafas: a.codigoIafas, idTipoCobertura: null
  //         };
  //         this.cobertura.push(cobertura);
  //       }
  //     }

  //   }
  // }

  // private setCobertura(idCobertura: number, idIafas: number) {

  //   console.log("entrooooooooooooo");

  //   if (this.flgManual == 0) {
  //     this.cobertura = [];
  //     for (let ia of this.persona[0]["coberturaList"]) {
  //       if (ia.idIafas == idIafas) {
  //         ia.color = "";
  //         if (ia.idCobertura == idCobertura) {
  //           ia.color = "bg-primary";
  //         }
  //         this.cobertura.push(ia);
  //       }
  //     }
  //   } else {
  //     for (let a of this.cobertura) {
  //       if (a.idIafas == idIafas) {
  //         a.color = "";
  //         if (a.idCobertura == idCobertura) {
  //           a.color = "bg-primary";
  //         }
  //       }
  //     }
  //   }
  // }

  // public guardarServicioModal() {
  //   let condicIafas: number = 0;
  //   let condicCobertu: number = 0;

  //   for (let ia of this.iafas) {
  //     if (ia.color != "" && ia.color != null) {
  //       condicIafas = 1
  //     }
  //   }
  //   for (let cb of this.cobertura) {
  //     if (cb.color != "" && cb.color != null) {
  //       condicCobertu = 1;
  //     }
  //   }

  //   if (condicIafas == 0) {
  //     this.toastr.error("Debe seleccionar una IAFAS", "Registro Acredita");
  //     return;
  //   }
  //   if (condicCobertu == 0) {
  //     this.toastr.error("Debe seleccionar una cobertura", "Registro Acredita");
  //     return;
  //   }

  //   this._acreditaService.getPaciente(this.tipoDoc, this.numeroDoc)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.paciente = data.pacienteList;
  //         if (this.paciente.length != 0) {
  //           this.flVisionFiliar = false;
  //           if (this.flgManual == 0) {
  //             // console.log('este es 1');

  //             this.planRequest.plan.codigoDocumentoAutorizacion = this.persona[0]["idDocumentoAutorizacion"];
  //             this.planRequest.plan.idPersona = this.paciente[0]["idPersona"];
  //             this.planRequest.plan.numeroDocumentoAutorizacion = this.persona[0]["numeroDocumentoAutorizacion"];
  //             for (let ia of this.iafas) {
  //               if (ia.color != "") {
  //                 this.planRequest.plan.codigoAsegurado = ia.codigoAsegurado;
  //                 this.planRequest.plan.codigoIafas = ia.codigoIafas;
  //                 this.planRequest.plan.descripcionContratante = ia.descripcionContratante;
  //                 this.planRequest.plan.idContratante = ia.idContratante;
  //                 this.planRequest.plan.tipoAfiliacion = ia.tipoAfiliacion;
  //               }
  //             }
  //             for (let cb of this.cobertura) {
  //               if (cb.color != "") {
  //                 this.nombreCoberturaModal = cb.descripcionCobertura;
  //                 this.planRequest.plan.codigoCobertura = cb.codigoCobertura;
  //                 this.planRequest.plan.copagoFijo = cb.copagoFijo;
  //                 this.planRequest.plan.copagoVariable = cb.copagoVariable;
  //                 this.planRequest.plan.descuentoFarmacia1 = cb.descuentoFarmacia1;
  //                 this.planRequest.plan.descuentoFarmacia2 = cb.descuentoFarmacia2;
  //                 this.planRequest.plan.parentesco = cb.parentescos;
  //                 // this.planRequest.plan.idTipoCobertura = cb.idTipoCobertura;
  //               }
  //             }
  //           } else {
  //             // this.planRequest.plan.codigoDocumentoAutorizacion = this.persona[0]["idDocumentoAutorizacion"];
  //             this.planRequest.plan.idPersona = this.paciente[0]["idPersona"];
  //             // this.planRequest.plan.numeroDocumentoAutorizacion = this.persona[0]["numeroDocumentoAutorizacion"];
  //             for (let ia of this.iafas) {
  //               if (ia.color != "") {
  //                 this.planRequest.plan.codigoAutorizacion = ia.codigoAutorizacion;
  //                 // this.planRequest.plan.codigoAsegurado = ia.codigoAsegurado;
  //                 this.planRequest.plan.codigoIafas = ia.codigoIafas;
  //                 // this.planRequest.plan.descripcionContratante = ia.descripcionContratante;
  //                 // this.planRequest.plan.idContratante = ia.idContratante;
  //                 // this.planRequest.plan.tipoAfiliacion = ia.tipoAfiliacion;
  //               }
  //             }
  //             for (let cb of this.cobertura) {
  //               if (cb.color != "") {
  //                 this.nombreCoberturaModal = cb.descripcionCobertura;
  //                 this.planRequest.plan.codigoAutorizacion = cb.codigoAutorizacion;
  //                 this.planRequest.plan.codigoCobertura = cb.codigoCobertura;
  //                 this.planRequest.plan.copagoFijo = cb.copagoFijo;
  //                 this.planRequest.plan.copagoVariable = cb.copagoVariable;
  //                 this.planRequest.plan.descuentoFarmacia1 = cb.descuentoFarmacia1;
  //                 this.planRequest.plan.descuentoFarmacia2 = cb.descuentoFarmacia2;
  //                 // this.planRequest.plan.parentesco = cb.parentesco;
  //                 // this.planRequest.plan.idTipoCobertura = cb.idTipoCobertura;
  //               }
  //             }
  //           }

  //           console.log(this.planRequest);

  //           const modalRef = this.modalService.open(ConfirmarComponent, { size: "sm" });
  //           modalRef.componentInstance.planRequestModal = this.planRequest;
  //           modalRef.componentInstance.nombreCoberturaModal = this.nombreCoberturaModal;
  //           modalRef.result.then(result => {

  //             // this.acreditaRequest.acredita.codigoAsegurado.set; 
  //           }, reason => {
  //             this.sendcitaEvent();
  //             console.log("asdasd123");
  //           });

  //         } else {
  //           this.toastr.error("No se encuentra filiado esta persona", "Acreditar")
  //           this.flVisionFiliar = true;
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


  // sendcitaEvent() {
  //   console.log("send");

  //   let param: any;
  //   param = true;
  //   this.coberturaDisabled.emit(param);
  // }

  // private getPlan(numDocumento: number, tipDocumento: number) {
  //   this._acreditaService.getPlan(numDocumento, tipDocumento)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.plan = data.planList;
  //         console.log("plan", this.plan);
  //         this.dataSourceHoy = new MatTableDataSource(this.plan);
  //         if (this.plan.length > 0) {
  //           this.flVisionPlanTable = true;
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

  // private openModalManual(content) {
  //   const modalRef = this.modalService.open(ManualComponent, { size: "sm" });
  //   modalRef.componentInstance.coberturaResponse = this.coberturaResponse;
  //   modalRef.componentInstance.codiIafasLast = this.codiIafasLast;
  //   // modalRef.componentInstance.codiCoberturaLast = this.codiCoberturaLast;
  //   // modalRef.componentInstance.nombreCoberturaModal = this.nombreCoberturaModal;
  //   modalRef.result.then(result => {
  //   }, reason => {
  //     this.flgManual = 1;
  //     this.iafas = [];
  //     this.cobertura = [];
  //     if (this.coberturaResponse.length != 0) {
  //       this.flgNoServicio1 = true;
  //     }

  //     for (let a of this.coberturaResponse) {

  //       let colores: String = "";
  //       let iafas: any;
  //       let cobertura: any;

  //       if (this.iafas.length == 0) {
  //         if (this.codiIafasLast[0] == a.codigoIafas) {
  //           colores = "bg-primary";
  //         }
  //         iafas = {
  //           codigoAsegurado: null, codigoIafas: a.codigoIafas,
  //           color: colores, descripcionContratante: "-", descripcionIafas: a.descripcionIafas,
  //           descripcionIafasTipo: null, flEstado: null, idContratante: null, idIafas: a.codigoIafas,
  //           idIafasTipo: null, tipoAfiliacion: null
  //         };
  //         this.iafas.push(iafas);
  //       } else {
  //         let flgExiste: boolean = true;
  //         for (let b of this.iafas) {
  //           if (b.codigoIafas != a.codigoIafas) {
  //             flgExiste = false;
  //           } else {
  //             flgExiste = true;
  //             break;
  //           }
  //         }
  //         if (flgExiste != true) {
  //           if (this.codiIafasLast[0] == a.codigoIafas) {
  //             colores = "bg-primary";
  //           }
  //           iafas = {
  //             codigoAsegurado: null, codigoIafas: a.codigoIafas,
  //             color: colores, descripcionContratante: "-", descripcionIafas: a.descripcionIafas, idIafas: a.codigoIafas,
  //             descripcionIafasTipo: null, flEstado: null, idContratante: null, idIafasTipo: null, tipoAfiliacion: null
  //           };
  //           this.iafas.push(iafas);
  //         }
  //       }

  //       if (a.codigoIafas == this.codiIafasLast[0]) {
  //         cobertura = {
  //           codigoCobertura: a.codigoCobertura, codigoAutorizacion: a.codigoAutorizacion, color: null, copagoFijo: a.copagoFijo, copagoVariable: a.copagoVariable,
  //           descripcionCobertura: a.descripcionCobertura, descuentoFarmacia1: a.descFarmacia1,
  //           descuentoFarmacia2: a.descFarmacia2, flEstado: null, idCobertura: a.codigoCobertura, idIafas: a.codigoIafas, idTipoCobertura: null
  //         };
  //         this.cobertura.push(cobertura);
  //       }
  //     }
  //     console.log(this.iafas);
  //     console.log(this.cobertura);
  //   });
  // }

  ngOnInit() {
    console.log(this.lsAcreditacion);

    this.dataSourceCobertura = new MatTableDataSource(this.lsCoberturas.inConCod271Detalles);
    // this.numeroDoc = this.paramJson.numeroDocumento;
    // this.tipoDoc = this.paramJson.tipoDocumento;
    // this.idIafas = this.paramJson.idIAFAS;
    // this.idContratante = this.paramJson.idContratante;

    // if (this.idIafas != 6969652635 && this.idContratante != 6969652635) {
    //   this.getPersona(this.numeroDoc, this.tipoDoc);
    //   this.getPlan(this.numeroDoc, this.tipoDoc);
    //   this.flgNoServicio1 = true;
    // } else {
    //   this.flgNoServicio = true;
    //   this.getPlan(this.numeroDoc, this.tipoDoc);
    //   // this.openModalManual();
    // }

  }

}
