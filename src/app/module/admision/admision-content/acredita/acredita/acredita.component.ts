import { Component, OnInit, Input, ContentChild, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AcreditaService } from '../../../services/acredita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ParticularComponent } from './particular/particular.component';
import { CitaService } from '../../../services/cita.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { CoberturaService } from '../../../services/cobertura.service';
import { ConveniosService } from '../../../services/convenios.service';

@Component({
  selector: 'app-acredita, book',
  templateUrl: './acredita.component.html',
  styleUrls: ['./acredita.component.scss']
})
export class AcreditaComponent implements OnInit {
  // displayedColumnAcredita = ['codigoAsegurado', 'iafas', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'parentesco', 'contratante', 'estado'];
  // dataSource = new MatTableDataSource();
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnProducto = ['nomProducto', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'parentesco', 'contratante', 'estado', 'codAsegurado'];
  dataSourceProducto = new MatTableDataSource();

  private iafaList: any = []; //[{ id: "200001", valor: 'Rimac Seguros SAC' }, { id: "1333", valor: 'Pacifico Seguros SAC' }, { id: "1222", valor: 'Clinica San Juan Pablo Privado' }];
  private tipoDocumento: any[] = [];
  private params: any = {};
  private longitudDocumento = "?";
  private CombotipoDocumento = null;

  private lsProductos: any = null;
  private lsCoberturas: any;
  private requestCoberturas = {
    "fiTipo": null,
    "conAse270": {
      "inConNom271Detalles": null,
      "apMaternoPaciente": null,
      "apPaternoPaciente": null,
      "beMaxInicial": null,
      "caPaciente": null,
      "caReceptor": null,
      "caRemitente": null,
      "caServicio": null,
      "coAfPaciente": null,
      "coAplicativoTx": null,
      "coCalservicio": null,
      "coEspecialidad": null,
      "coInProducto": null,
      "coParentesco": null,
      "coProducto": null,
      "coReContratante": null,
      "coSuTiCobertura": null,
      "coTiCobertura": null,
      "deCobertura": null,
      "deProducto": null,
      "feAccidente": null,
      "feTransaccion": null,
      "hoTransaccion": null,
      "idCorrelativo": null,
      "idReContratante": null,
      "idReceptor": null,
      "idRemitente": null,
      "idTransaccion": null,
      "noContratante": null,
      "noMaContratante": null,
      "noPaContratante": null,
      "noPaciente": null,
      "noTransaccion": null,
      "nuAutOrigen": null,
      "nuCobertura": null,
      "nuControl": null,
      "nuControlST": null,
      "nuDocumento": null,
      "nuPlan": null,
      "nuRucRemitente": null,
      "tiAccidente": null,
      "tiCaContratante": null,
      "tiDoContratante": null,
      "tiDocumento": null,
      "tiFinalidad": null,
      "txRequest": null
    }
  };

  private flgView: boolean = true;
  private flgviewB: boolean = false;

  constructor(
    // private _citaService: CitaService,
    private _acreditaService: AcreditaService,
    private _coberturaService: CoberturaService,
    private _conveniosService: ConveniosService,
    private toastr: ToastsManager,
    // private modalService: NgbModal,
    // private router: Router
  ) { }
  falg = 1;

  private getAllAcreditaciones() {
    // let _params: any;
    console.log(this.params);

    this._acreditaService.getAllAcreditaciones(this.params)
      .subscribe(data => {
        console.log(data);

        this.flgviewB = false;
        if (data.estado == 1) {
          this.lsProductos = data.acreditaList;
          this.requestCoberturas.conAse270 = this.lsProductos;
          this.dataSourceProducto = new MatTableDataSource(this.lsProductos.inConNom271Detalles);
        } else if (data.estado == 0) {
          this.toastr.warning("No se encontraron datos con los parametros buscados", "Advertencia")
        } else {
          this.toastr.error("Error de Servicios")
          console.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllCoberturas(_requestParam: any) {
    this._coberturaService.getCoberturas(_requestParam)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.toastr.success("Exitoso");
          this.flgView = false;

          this.lsCoberturas = data.coberturaList;
          // this.lsProductos.inConNom271Detalles.map(ls => { if (ls.coEsPaciente)})
          // this.dataSourceProducto = new MatTableDataSource(this.lsProductos.inConNom271Detalles);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Datos No Encontrados")
        } else {
          this.toastr.warning(data.mensaje, "Error Interno")
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllTipoDocumento() {
    this._acreditaService.getAllTipoDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          if (this.falg == 1) {
            //lo que sea
            this.falg = 0
          }
          this.tipoDocumento = data.tipoDocumentoList;
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getConvenioIafas() {
    this._conveniosService.getConvenioIafas()
      .subscribe(data => {
        console.log(data);

        if (data.estado == 1) {
          this.iafaList = data.convenioList;
        } else {
          this.toastr.error("Error al obtenerTipoDocumento" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  searchAsegurado() {
    this.flgviewB = true;
    this.params.fiTipo = this.iafaList[this.iafaList.findIndex(_item => _item.codigo == this.params.codigoIafa)]['fiTipo'];
    this.getAllAcreditaciones();
    // this.lsProductos = [{ nomProducto: 'SCTR', apellidoPaterno: 'Retamozo', apellidoMaterno: 'Salazar', nombres: 'Fernando Saliel', parentesco: 'TITULAR', contratante: 'SIEMENS SAC', estado: 'VIGENTE', codAsegurado: '3637963' }];
    // this.dataSourceProducto = new MatTableDataSource(this.lsProductos);
  }

  goToCobertura(row: any) {
    console.log(row);
    this.requestCoberturas.conAse270 = { ... this.requestCoberturas.conAse270, ...row }

    // this.requestCoberturas.conAse270.idRemitente = this.lsProductos.idReceptor;
    this.requestCoberturas.conAse270.idReceptor = this.lsProductos.idRemitente;
    this.requestCoberturas.conAse270.tiDocumento = row.tiDoPaciente;
    this.requestCoberturas.conAse270.nuDocumento = row.nuDoPaciente;
    this.requestCoberturas.conAse270.nuRucRemitente = "20414955020";
    this.requestCoberturas.conAse270.idRemitente = this.params.codigoIafa;
    this.requestCoberturas.fiTipo = this.params.fiTipo;
    delete this.requestCoberturas.conAse270.nuControl;
    delete this.requestCoberturas.conAse270.nuControlST;
    delete this.requestCoberturas.conAse270.inConNom271Detalles;

    // this.flgView = false;
    console.log(this.requestCoberturas);
    /**No enviar el request con parametros null, si no se cae */
    this.getAllCoberturas(this.requestCoberturas);
  }
  requestView(evn: any) {
    this.flgView = true;
  }
  
  // private paciente: any[] = [];
  // private personas: any[] = [];
  // private seleccionada: boolean = false;
  // private numDoct: number = null;
  // private flVisionTablaAcredita: boolean = false;
  // private flVisionButtonFilia: boolean = false;
  // private flVisionNoServicio: boolean = false;
  // private flVisionTamanoCampoNumero: boolean = false;
  // private flCampoNumero1 = false;

  // private editNumeroDoc: String = "true";
  // private editNumeroDoc2: String = "false";
  // private acreditaRequest = { acredita: { codigoAsegurado: null, tipoDocumento: null, apellidoPaterno: null, apellidoMaterno: null, nombres: null } };

  // // variables para la ruta
  // private link: String = "";
  // private numeroDocRouter: number;
  // private tipoDocRouter: number;
  // private idIafasRouter: number;
  // private idContratanteRouter: number;

  // //json que se enviara a cobertura con los parametro a usar
  // private paramJson: any = { numeroDocumento: null, tipoDocumento: null, idIAFAS: null, idContratante: null };
  // private coberturaDisabled: boolean = true;

  // private _bPacien: boolean = false;

  // private getAllpersonas() {
  //   this._bPacien = true;
  //   if (this.acreditaRequest.acredita.tipoDocumento != 0) {
  //     if (this.acreditaRequest.acredita.codigoAsegurado == null || this.acreditaRequest.acredita.codigoAsegurado == '') {
  //       this.toastr.error("Debe ingresar el número de documento", "Acreditar");
  //       return;
  //     } else if (!/^([0-9])*$/.test(this.acreditaRequest.acredita.codigoAsegurado)) {
  //       this.toastr.error("El valor " + this.acreditaRequest.acredita.codigoAsegurado + " no es un número", "Acreditar");
  //       return;
  //     } else if (this.acreditaRequest.acredita.codigoAsegurado.length != 8) {
  //       this.toastr.error("El número de documento debe contener 8 dígitos", "Acreditar");
  //       return;
  //     }
  //   }

  //   this.acreditaRequest.acredita.tipoDocumento = this.acreditaRequest.acredita.tipoDocumento == undefined ? 0 : this.acreditaRequest.acredita.tipoDocumento;
  //   this.acreditaRequest.acredita.codigoAsegurado = this.acreditaRequest.acredita.codigoAsegurado == undefined ? 0 : this.acreditaRequest.acredita.codigoAsegurado;
  //   this._acreditaService.getAllpersonas(this.acreditaRequest.acredita.tipoDocumento, this.acreditaRequest.acredita.codigoAsegurado,
  //     this.acreditaRequest.acredita.apellidoPaterno, this.acreditaRequest.acredita.apellidoMaterno,
  //     this.acreditaRequest.acredita.nombres)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this._bPacien = false;
  //         let serVigente: number = 0;
  //         for (let ia of data.acreditaList) {
  //           if (ia.servVigente == null) {
  //             serVigente = 0;
  //             if (ia.estado != "NO VIGENTE") {
  //               this.personas.push(ia);
  //             }
  //           } else {
  //             serVigente = ia.servVigente;
  //             this.personas.push(ia);
  //             this.personas[0]["tipoDocumento"] = this.acreditaRequest.acredita.tipoDocumento;
  //             this.personas[0]["numeroDocumento"] = this.acreditaRequest.acredita.codigoAsegurado;
  //             this.personas[0]["idIAFAS"] = 6969652635;
  //             this.personas[0]["idContratante"] = 6969652635;
  //             // console.log(this.personas);
  //           }
  //         }
  //         this.dataSource = new MatTableDataSource(this.personas)
  //         // console.log(serVigente);
  //         this.flVisionTablaAcredita = true;
  //         this.flVisionButtonFilia = false;
  //         this.flVisionNoServicio = false;
  //         if (serVigente != 0) {
  //           this.flVisionNoServicio = true;
  //           this.flVisionTablaAcredita = false;
  //         } else {
  //           this.flVisionNoServicio = false;
  //           if (this.personas.length == 0) {
  //             this.flVisionTablaAcredita = false;
  //             this.toastr.error("No se ha encontrado esta persona", "Acreditar")
  //           }
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

  //   if (this.acreditaRequest.acredita.codigoAsegurado == 0) {
  //     this.acreditaRequest.acredita.codigoAsegurado = null;
  //     this.acreditaRequest.acredita.tipoDocumento = 0;
  //     this.validarComboTipo();
  //   }
  //   this.personas = [];
  // }

  // private AtencionParticular(tipDoc: number, numDoc: number, idIPRESS: number) {
  //   // console.log(this.acreditaRequest.acredita.tipoDocumento);
  //   // console.log(this.acreditaRequest.acredita.codigoAsegurado);
  //   if (this.acreditaRequest.acredita.tipoDocumento != null && this.acreditaRequest.acredita.codigoAsegurado != null && this.acreditaRequest.acredita.codigoAsegurado != '') {
  //     this._citaService.getPaciente(this.acreditaRequest.acredita.tipoDocumento, this.acreditaRequest.acredita.codigoAsegurado, null, null, null)
  //       .subscribe(data => {
  //         if (data.estado == 1) {
  //           this.paciente = data.pacienteList;
  //           if (this.paciente.length != 0) {
  //             this.flVisionButtonFilia = false;
  //             this.flVisionTablaAcredita = false;
  //             this.flVisionNoServicio = false;
  //             const modalRef = this.modalService.open(ParticularComponent, { size: "lg" });
  //             modalRef.componentInstance.idPersona = this.paciente[0]["idPersona"];
  //             modalRef.componentInstance.nombres = this.paciente[0]["nombres"];
  //             modalRef.componentInstance.apellidoMaterno = this.paciente[0]["apellidoMaterno"];
  //             modalRef.componentInstance.apellidoPaterno = this.paciente[0]["apellidoPaterno"];
  //             modalRef.result.then(result => {
  //               // this.acreditaRequest.acredita.codigoAsegurado.set; 
  //             }, reason => {
  //               this.acreditaRequest.acredita.tipoDocumento = 0;
  //               this.acreditaRequest.acredita.codigoAsegurado = ""
  //               this.validarComboTipo();
  //             });
  //           } else {
  //             this.flVisionButtonFilia = true;
  //             this.flVisionTablaAcredita = false;
  //             this.flVisionNoServicio = false;
  //             this.toastr.error("No se encuentra filiado esta persona", "Acreditar")
  //           }
  //         } else {
  //           console.log(data.mensaje);
  //         }
  //         return true;
  //       },
  //         error => {
  //           console.error("Error al Listar");
  //           return Observable.throw(error);
  //         }),
  //       err => console.error(err),
  //       () => console.log('Request Complete');
  //   } else {
  //     this.paciente = [];
  //     this.toastr.error("Debe ingresar el tipo y número de documento", "Acreditar")
  //   }
  // }

  // private validarComboTipo() {
  //   this.acreditaRequest.acredita.codigoAsegurado = null;
  //   this.flVisionTamanoCampoNumero = false;
  //   this.editNumeroDoc = "true";
  //   this.editNumeroDoc2 = "false";
  //   if (this.acreditaRequest.acredita.tipoDocumento != 0) {
  //     this.editNumeroDoc = "false";
  //     this.editNumeroDoc2 = "true";
  //   }
  // }

  // private validarTamano() {
  //   this.flVisionTamanoCampoNumero = false;
  //   if (this.acreditaRequest.acredita.codigoAsegurado.length != 8 || !/^([0-9])*$/.test(this.acreditaRequest.acredita.codigoAsegurado)) {
  //     this.flVisionTamanoCampoNumero = true;
  //   }
  //   if (this.acreditaRequest.acredita.codigoAsegurado == "" || this.acreditaRequest.acredita.codigoAsegurado == null || this.acreditaRequest.acredita.codigoAsegurado == undefined) {
  //     this.flVisionTamanoCampoNumero = false;
  //   }
  // }

  // private validarCampoText() {

  // }

  // // private validarVigencia(estado:string,numeroDoc:number,tipoDoc:number,idIafas:number, idContratante:number) {
  // //   // this.link = "false";
  // //   if(estado == "NO VIGENTE"){
  // //     // this.router.navigate(["'cobertura',"+numeroDoc+","+tipoDoc+","+idIafas+","+idContratante]);

  // //     this.numeroDocRouter;
  // //     this.tipoDocRouter;
  // //     this.idIafasRouter;
  // //     this.idContratanteRouter;
  // //     return;
  // //     // this.link = "true";
  // //   }
  // //   this.link = "cobertura,"+numeroDoc+","+tipoDoc+","+idIafas+","+idContratante;
  // //   console.log(this.link);
  // // }

  // redirige(numeroDocumento, tipoDocumento?, idIAFAS?, idContratante?) {
  //   this.paramJson.numeroDocumento = numeroDocumento;
  //   this.paramJson.tipoDocumento = tipoDocumento;
  //   this.paramJson.idIAFAS = idIAFAS;
  //   this.paramJson.idContratante = idContratante;
  //   this.coberturaDisabled = false;
  // }
  // aljsdnkasbdh(asdasda) {
  //   console.log("aasdsaddasdsdasdass");
  //   console.log(asdasda);

  //   this.coberturaDisabled = asdasda;
  // }
  // changeInput(_value) {
  //   console.error("me crearon por las webas", _value)
  // }

  ngOnInit() {
    this.getAllTipoDocumento();
    this.getConvenioIafas();
    // this.acreditaRequest.acredita.tipoDocumento = 0;
    // this.coberturaDisabled = true;
  }
  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
      this.params.numeroDocumento = null;
    }
    if (tipoDoc == 1) {
      this.longitudDocumento = '8';
    }
    if (tipoDoc == 2) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 3) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 4) {
      this.longitudDocumento = '15';
    }
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private verificarFiliacion(_ngForm: any): boolean {
    if (isInvalid(_ngForm) || !this.params.tipoDocumentoIdentidad || this.params.nombres || this.params.apellidoPaterno || this.params.apellidoMaterno) {
      return true;
    }
    else return false;
  }
  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

}
