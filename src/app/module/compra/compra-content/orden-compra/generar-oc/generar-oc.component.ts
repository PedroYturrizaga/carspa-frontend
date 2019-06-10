import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-generar-oc',
  templateUrl: './generar-oc.component.html',
  styleUrls: ['./generar-oc.component.scss']
})
export class GenerarOcComponent implements OnInit {

  @ViewChild('OrdenCompraForm') private _ordenCompraForm: NgForm;
  
  displayedColumnsMaterialOrdenCompra = ['codigo', 'nombreMaterial', 'cantidad', 'fecha', 'add'];
  dataSourceMaterialOrdenCompra = new MatTableDataSource();

  displayedColumnsMaterialOCTemp = ['codigo', 'nombreMaterial', 'cantidad', 'fecha', 'eliminar'];
  dataSourceMaterialOCTemp = new MatTableDataSource();

  today: Date = new Date();

  private proveedorList = [];
  private materialOCList = [];

  private ocTempList = [];

  private jsonOrdenCompra = {
    feOrdenCompra: null
  }

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _dialogRef: MatDialogRef<GenerarOcComponent>) { }

  ngOnInit() {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.jsonOrdenCompra.feOrdenCompra = ((this.today).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.getProveedor();
    this.getMaterialOC();

  }

  getProveedor() {
    this.proveedorList = [{ id: 21, descripcionProveedor: 'GoodGears SAC' }, { id: 41, descripcionProveedor: 'COSAPI SA' }, { id: 25, descripcionProveedor: 'Graña & Montero' }]
  }

  getMaterialOC() {
    this.materialOCList = [
      { codigo: '12', nombreMaterial: 'silicona Liquida', cantidad: 12, fecha: '2019-04-15' },
      { codigo: '18', nombreMaterial: 'pulidor liquido', cantidad: 25, fecha: '2019-04-15' },
      { codigo: '22', nombreMaterial: 'cera barra', cantidad: 5, fecha: '2019-04-16' },
      { codigo: '23', nombreMaterial: 'abrillantador super', cantidad: 82, fecha: '2019-04-16' }
    ];
    this.dataSourceMaterialOrdenCompra = new MatTableDataSource(this.materialOCList)
  }

  addMaterialOCTemp(item: any) {
    if (this.ocTempList.find(_it => { return _it === item; })) {
      this.toastr.warning("Ya se ha agregado el Material", "Advertencia");
      return;
    }

    this.ocTempList.push(item);
    this.dataSourceMaterialOCTemp = new MatTableDataSource(this.ocTempList);

  }

  deleteMaterialOCTemp(index: number) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      // width: '75vw'
    });
    dialogRef.componentInstance.mensajeConfirmacion = '¿Desea Eliminar el siguiente Registro?';
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.ocTempList.splice(index, 1);
        this.dataSourceMaterialOCTemp = new MatTableDataSource(this.ocTempList);
        this.toastr.success("Eliminado correctamente", 'Exitoso');
      }
    });

  }
/**Servcisio de insertar */

  generarOrden (){
    this.confirmacionCorrecta()
    this.toastr.success("generado correctamente", "Exitoso")
  }


  dismiss() {
    this._dialogRef.close();
  }

  confirmacionCorrecta(){
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
