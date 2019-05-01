import { ConvenioService } from './../../../services/convenio.service';
import { ToastsManager } from 'ng2-toastr';
import { ProductoServiceService } from './../../../services/producto-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-insertar-producto',
  templateUrl: './insertar-producto.component.html',
  styleUrls: ['./insertar-producto.component.scss']
})
export class InsertarProductoComponent implements OnInit {

  @Input() producto;
  @Input() flag;

  private param = { coProdCode: null, idConvenio: null, noProdName: null };
  private convenio: any = [];

  constructor(
    private _productoService: ProductoServiceService,
    private _convenioService: ConvenioService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<InsertarProductoComponent>
  ) { }

  ngOnInit() {
    if (this.flag == 2) {
      this.param.coProdCode = this.producto.coProdCode;
      this.param.noProdName = this.producto.noProdName;
      this.param.idConvenio = this.producto.idConvenio;
    }
    this.getConvenios();
  }

  private insertarNuevoProducto() {
    this._productoService.insertarProducto(this.param)
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

  private actualizarNuevoProducto() {
    this._productoService.actualizarProducto(this.param)
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

  private getConvenios() {
    this._convenioService.getComboConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.convenio = data.convenioList;
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
    this.param.idConvenio = +idConvenio;
  }

  private close(add) {
    this.dialogRef.close(add);
  }

}
