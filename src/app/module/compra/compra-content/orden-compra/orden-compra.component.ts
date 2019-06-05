import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { GenerarOcComponent } from './generar-oc/generar-oc.component'

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ToastsManager } from 'ng2-toastr';
import { VisualizarOcComponent } from './visualizar-oc/visualizar-oc.component';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';


@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss']
})
export class OrdenCompraComponent implements OnInit {

  displayedColumnsOrdenCompra = ['codigo', 'fecha', 'proveedor', 'estado', 'ver', 'eliminar'];
  dataSourceOrdenCompra = new MatTableDataSource();

  private paramsBusqueda = { fInicial: null, fFinal: null, nombreProveedor: null, feInicial: null, feFinal: null }

  private ordenesCompraList = [];
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.getObtenerOrdenesCompra();
  }


  getObtenerOrdenesCompra() {
    this.ordenesCompraList = [{ codigo: '25488800', fecha: '2019-06-05', proveedor: 'GoodGears SAC', estado: 1 }, { codigo: '29588890', fecha: '2019-06-05', proveedor: 'Cosapi SAC', estado: 0 }]
    this.dataSourceOrdenCompra = new MatTableDataSource(this.ordenesCompraList);
  }

  BuscarOrdenCompra() {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.feInicial = this.paramsBusqueda.fInicial ? ((this.paramsBusqueda.fFinal).toLocaleDateString('es-PE', options)).split('/').join('-') : null;
    this.paramsBusqueda.feFinal = this.paramsBusqueda.fInicial ? ((this.paramsBusqueda.fInicial).toLocaleDateString('es-PE', options)).split('/').join('-') : null;

    this.getObtenerOrdenesCompra();
  }

  deleteOC(index) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      // width: '75vw'
    });
    dialogRef.componentInstance.mensajeConfirmacion = '¿Desea Eliminar el siguiente Registro?';
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.ordenesCompraList.splice(index, 1);
        this.dataSourceOrdenCompra = new MatTableDataSource(this.ordenesCompraList);
        this.toastr.success("Eliminado correctamente", 'Exitoso');
      }
    });
  }

  openModalGenerarOC() {
    const dialogRef = this._modalDialog.open(GenerarOcComponent, {
      autoFocus: false,
      disableClose: true,
      width: '80vw',
      height: '600px',

    });
    // dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.BuscarOrdenCompra();
      }
    });
  }
  visualizarOC() {
    const dialogRef = this._modalDialog.open(VisualizarOcComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      height: '600px',

    });
    // dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.BuscarOrdenCompra();
      }
    });
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
