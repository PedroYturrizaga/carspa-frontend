import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { Observable } from 'rxjs';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-visualizar-oc',
  templateUrl: './visualizar-oc.component.html',
  styleUrls: ['./visualizar-oc.component.scss']
})
export class VisualizarOcComponent implements OnInit, OnChanges {
  @Input() ordenCompra;

  displayedColumnsMaterialOC = ['codigo', 'nombreMaterial', 'cantidad', 'precio', 'precioTotal'];
  dataSourceMaterialOC = new MatTableDataSource();

  private paramsBusqueda = { ordenCompra: null, nombre: null }

  private total: number = 0;

  private ordenCompraDetalleList = [];

  constructor(private toastr: ToastsManager,
    private _ordenCompra: OrdenCompraService,
    private _dialogRef: MatDialogRef<VisualizarOcComponent>) { }

  ngOnInit() {
    console.log("ngOnInit")
    console.log(this.ordenCompra)

    this.getOrdenCompraDetalle();

  }

  ngOnChanges() {
    console.log("ngOnChanges")
  }

  busquedaDescripcion(descrip: string) {
    // if (descrip.length % 2 == 0) {
    this.ordenCompra = {
      ...this.ordenCompra,
      nombre: descrip
    }
    this.getOrdenCompraDetalle();
    // }
  }

  getOrdenCompraDetalle() {
    console.log(this.ordenCompra)

    this._ordenCompra.getOrdenCompraDetalle(this.ordenCompra)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.ordenCompraDetalleList = data.detalleordencompraList;
          this.dataSourceMaterialOC = new MatTableDataSource(this.ordenCompraDetalleList);
          this.total = 0;
          this.ordenCompraDetalleList.map(_ite => { this.total = this.total + _ite.precioUnit * _ite.cantidadCompra })

        } else if (data.estado == 0) {
          this.toastr.error("No se encontraron datos");
          this.ordenCompraDetalleList = [];
          this.dataSourceMaterialOC = new MatTableDataSource(this.ordenCompraDetalleList);
        } else {
          this.toastr.error(data.mensaje, 'Error');
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');

  }



  dismiss() {
    this._dialogRef.close();
  }

  confirmacionCorrecta() {
    this._dialogRef.close(1);
  }

  /*----------------------------------
  ----------- Validaciones -----------
  -----------------------------------*/

  private cleanForm(_controlVar: any) {
    _controlVar.resetForm();
  }

  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
