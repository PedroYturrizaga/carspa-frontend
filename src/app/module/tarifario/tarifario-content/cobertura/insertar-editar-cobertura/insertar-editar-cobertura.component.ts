import { Component, OnInit, Input } from '@angular/core';
import { ConvenioService } from '../../../services/convenio.service';
import { ProductoServiceService } from '../../../services/producto-service.service';
import { CoberturaServiceService } from '../../../services/cobertura-service.service';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-insertar-editar-cobertura',
  templateUrl: './insertar-editar-cobertura.component.html',
  styleUrls: ['./insertar-editar-cobertura.component.scss']
})
export class InsertarEditarCoberturaComponent implements OnInit {

  @Input() flag;
  @Input() coberturaCo;

  private convenio: any[];
  private producto: any[];
  private cobertura: any[];
  private lsCalif: any = [];
  private paramsBusqueda = { idConvenio: null, coProdCode: null, coCoberCode: null, noSubTipoCoberName: null, copagoFijo: null, copagoVariable: null, coCalifServCode: null };
  private params = { coSubTipoCober: null, coCoberCode: null, noSubTipoCoberName: null, copagoFijo: null, copagoVariable: null, coCalifServCode: null };

  constructor(
    private _convenioService: ConvenioService,
    private _productoService: ProductoServiceService,
    private _coberturaService: CoberturaServiceService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<InsertarEditarCoberturaComponent>
  ) { }

  ngOnInit() {
    console.log(this.flag);
    console.log(this.coberturaCo);
    if (this.flag == 2) {
      this.paramsBusqueda.idConvenio = this.coberturaCo.idConvenio;
      this.paramsBusqueda.coProdCode = this.coberturaCo.coProdCode;
      this.paramsBusqueda.coCoberCode = this.coberturaCo.coCoberCode;
      this.paramsBusqueda.noSubTipoCoberName = this.coberturaCo.noSubTipoCoberName;
      this.paramsBusqueda.copagoFijo = this.coberturaCo.copagoFijo;
      this.paramsBusqueda.copagoVariable = this.coberturaCo.copagoVariable;
      this.paramsBusqueda.coCalifServCode = this.coberturaCo.coCalifServCode;
      this.getConvenios();
      this.getListProductos();
      this.getComboTipoCobertura();
      this.getCalifServicio();
    } else if (this.flag == 1) {
      this.getConvenios();
      this.getComboTipoCobertura();
      this.getCalifServicio();
    }
  }

  private getConvenios() {
    this._convenioService.getComboConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.convenio = data.convenioList;
          console.log(this.convenio);
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

  private seleccionarConvenio(idConvenio) {
    console.log(idConvenio);
    this.paramsBusqueda.idConvenio = +idConvenio;
    this.getListProductos();
  }

  private getListProductos() {
    let param = { idConvenio: null };
    param.idConvenio = this.paramsBusqueda.idConvenio;
    this._productoService.getProductoConvenio(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.producto = data.producto;
          console.log(this.producto);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "No existen productos para este convenio");
          this.producto = [];
        }
        else {
          this.toastr.error(data.mensaje);
          this.producto = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private seleccionarProductos(coProdCode) {
    console.log(coProdCode);
    this.paramsBusqueda.coProdCode = coProdCode;
  }

  private getComboTipoCobertura() {
    this._coberturaService.getComboTipoCobertura()
      .subscribe(data => {
        if (data.estado == 1) {
          this.cobertura = data.subTipoCoberturaList;
          console.log(this.cobertura);
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

  private seleccionarTipoCobertura(coCoberCode) {
    console.log(coCoberCode);
    this.paramsBusqueda.coCoberCode = +coCoberCode;

  }

  private getCalifServicio() {
    this._coberturaService.getComboCalifServicio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsCalif = data.califServicioList;
          console.log(this.lsCalif);
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

  private seleccionarCalifServicio(coCalifServCode) {
    console.log(coCalifServCode);
    this.paramsBusqueda.coCalifServCode = coCalifServCode;

  }

  private insertarNuevaCobertura() {
    console.log(this.paramsBusqueda);
    this._coberturaService.insertarCobertura(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
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

  private actualizarNuevaCobertura() {
    this.params.coCoberCode = this.paramsBusqueda.coCoberCode;
    this.params.coSubTipoCober = this.coberturaCo.coSubTipoCober;
    this.params.noSubTipoCoberName = this.paramsBusqueda.noSubTipoCoberName;
    this.params.copagoFijo = this.paramsBusqueda.copagoFijo;
    this.params.copagoVariable = this.paramsBusqueda.copagoVariable;
    this.params.coCalifServCode = this.paramsBusqueda.coCalifServCode;
    console.log(this.params)
    this._coberturaService.editarCobertura(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
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

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
}
