import { MatDialogRef } from '@angular/material';
import { ConvenioService } from './../../../services/convenio.service';
import { ContratanteService } from './../../../services/contratante.service';
import { IafasService } from './../../../services/iafas.service';
import { Component, OnInit, Input, Optional } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-insertar-editar-convenio',
  templateUrl: './insertar-editar-convenio.component.html',
  styleUrls: ['./insertar-editar-convenio.component.scss']
})
export class InsertarEditarConvenioComponent implements OnInit {

  @Input() flag;
  @Input() convenioCoList;
  private iafaEmpresa: any = [];
  private iafa: any = [];
  private empresaExternaList: any = [];
  private descripAutoComplete: any = "";
  private param = {
    coIAFASCode: null,
    fiTipo: null,
    idEmpresaExterna: null,
    nombreConvenio: null,
    valorUnidadFHA: null,
    valorUnidadFSA: null,
    idConvenio: null
  }
  private flgIafaEmpresa: any;

  constructor(private _iafaService: IafasService,
    private toastr: ToastsManager,
    private _empresaExternaService: ContratanteService,
    private _convenioService: ConvenioService,
    private dialogRef: MatDialogRef<InsertarEditarConvenioComponent>) {
    this.iafaEmpresa = [{ id: 'I', valor: "IAFA" },
    { id: 'E', valor: "Empresa Externa" }];

    // this.descripAutoComplete = this.iafaEmpresa[0].valor;
  }

  ngOnInit() {
    this.getComboIAFA();
    this.getComboEmpresaExterna();
    if (this.flag == 2) {
      this.param.fiTipo = this.convenioCoList.fiTipo;
      this.param.nombreConvenio = this.convenioCoList.nombreConvenio;
      this.param.idConvenio = this.convenioCoList.idConvenio;
      this.iafaEmpresa.id = this.param.fiTipo;
      this.flgIafaEmpresa = this.param.fiTipo;
      this.iafaEmpresa.valor = this.convenioCoList.iafaEmpresa;
      this.descripAutoComplete = (this.iafaEmpresa.find(obj => obj['id'] === this.param.fiTipo))['valor'];
      this.param.valorUnidadFHA = this.convenioCoList.valorUnidadFHA; //? parseFloat(this.convenioCoList.valorUnidadFHA) : null;
      this.param.valorUnidadFSA = this.convenioCoList.valorUnidadFSA; // ? parseFloat(this.convenioCoList.valorUnidadFSA) : null;
      this.param.coIAFASCode = this.convenioCoList.coIAFASCode;
      this.param.idEmpresaExterna = this.convenioCoList.idEmpresaExterna;
    }
  }

  private placeDesc(opcion) {
    this.descripAutoComplete = (this.iafaEmpresa.find(obj => obj['id'] === opcion))['valor'];
    this.param.fiTipo = opcion;
  }

  private getComboIAFA() {
    let parametros = { coEntilden: null, nuPagina: null, nuRegisMostrar: null }
    this._iafaService.comboIafa(parametros)
      .subscribe(data => {
        if (data.estado == 1) {
          this.iafa = data.listaIafas;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  seleccionarIAFA(idIafa) {
    this.param.coIAFASCode = +idIafa;
  }

  private getComboEmpresaExterna() {
    this._empresaExternaService.getListContratante()
      .subscribe(data => {
        if (data.estado == 1) {
          this.empresaExternaList = data.empresaExternaList;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  seleccionarEmpresaExterna(idEmpresaExterna) {
    this.param.idEmpresaExterna = +idEmpresaExterna;
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  _isValidUnid(): boolean {
    return true;
  }

  private insertarNuevoConvenio() {
    this._convenioService.insertarConvenio(this.param)
      .subscribe(data => {
        if (data.confirmacion.id == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        }
        else if (data.confirmacion.id == 0) {
          this.toastr.warning(data.mensaje);
        }
        else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private actualizarConvenio() {

    this.convenioCoList.valorUnidadFHA = +this.convenioCoList.valorUnidadFHA;
    this.convenioCoList.valorUnidadFSA = +this.convenioCoList.valorUnidadFSA;

    if (this.param.idEmpresaExterna == undefined || this.param.idEmpresaExterna == '') {
      this.param.idEmpresaExterna = null;
    }
    if (this.param.coIAFASCode == undefined || this.param.coIAFASCode == '') {
      this.param.coIAFASCode = null;
    }
    if (this.param.valorUnidadFHA == undefined || this.param.valorUnidadFHA == '') {
      this.param.valorUnidadFHA = null;
    }
    if (this.param.valorUnidadFSA == undefined || this.param.valorUnidadFSA == '') {
      this.param.valorUnidadFSA = null;
    }
    this._convenioService.actualizarConvenio(this.param)
      .subscribe(data => {
        if (data.confirmacion.id == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        }
        else if (data.confirmacion.id == 0) {
          this.toastr.warning(data.mensaje);
        }
        else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

}
