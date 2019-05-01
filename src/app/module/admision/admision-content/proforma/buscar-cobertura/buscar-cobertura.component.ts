import { AcreditaService } from './../../../services/acredita.service';
import { Component, OnInit, Input, ContentChild, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective, NgForm } from '@angular/forms';  
import { CoberturaService } from '../../../services/cobertura.service';
import { ConveniosService } from '../../../services/convenios.service';

@Component({
  selector: 'app-buscar-cobertura',
  templateUrl: './buscar-cobertura.component.html',
  styleUrls: ['./buscar-cobertura.component.scss']
})
export class BuscarCoberturaComponent implements OnInit {
  
  //Datasource Producto
  displayedColumnProducto = ['nomProducto', 'apellidoPaterno', 'apellidoMaterno', 'nombres','estado'];
  dataSourceProducto = new MatTableDataSource();
  //datasource Cobertura
  displayedColumnCobertura = ['codigo', 'coberturas', 'copagoFijo', 'CopagoVariable'];
  dataSourceCobertura = new MatTableDataSource();

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
  private flgView: boolean = false;
  private flgviewB: boolean = false;



  constructor(
    private _acreditaService: AcreditaService,
    private _coberturaService: CoberturaService,
    private _conveniosService: ConveniosService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<BuscarCoberturaComponent>
  ) { }
  close(add) {
    this.dialogRef.close(add);

  }
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
        
        //else {
          //this.toastr.error("Error de Servicios")
          console.error(data.mensaje);
      //  }
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

          this.lsCoberturas = data.coberturaList.detalles;
          console.log(this.lsCoberturas);
          //this.requestCoberturas.conAse270 = this.lsProductos;
          // this.lsProductos.inConNom271Detalles.map(ls => { if (ls.coEsPaciente)})
          // this.dataSourceProducto = new MatTableDataSource(this.lsProductos.inConNom271Detalles);
           this.dataSourceCobertura = new MatTableDataSource(this.lsCoberturas);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Datos No Encontrados")
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
  ngOnInit() {
    this.getAllTipoDocumento();
    this.getConvenioIafas();
    // this.dataSourceCobertura = new MatTableDataSource(this.lsCoberturas.inConCod271Detalles);
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
