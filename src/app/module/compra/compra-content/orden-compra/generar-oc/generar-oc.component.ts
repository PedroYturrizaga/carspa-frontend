import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm } from '@angular/forms';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { Observable } from 'rxjs';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-generar-oc',
  templateUrl: './generar-oc.component.html',
  styleUrls: ['./generar-oc.component.scss']
})
export class GenerarOcComponent implements OnInit {

  @ViewChild('OrdenCompraForm') private _ordenCompraForm: NgForm;
  @ViewChild(MatPaginator) matPag: MatPaginator;

  displayedColumnsMaterialOrdenCompra = ['codigo', 'nombreMaterial', 'cantidad', 'estado', 'fecha', 'add'];
  dataSourceMaterialOrdenCompra = new MatTableDataSource();

  displayedColumnsMaterialOCTemp = ['codigo', 'nombreMaterial', 'cantidad', 'fecha', 'eliminar'];
  dataSourceMaterialOCTemp = new MatTableDataSource();

  today: Date = new Date();
  private paramsBusqueda = { idMaterialOrdenCompra: null, nombre: null, estado: 'PENDIENTE' }
  private jsonOrdenCompra: any = { feOrdenCompra: null, idProveedor: null, codigo: null };

  private proveedorList = [];
  private materialOCList = [];
  private ocTempList = [];


  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _ordenCompra: OrdenCompraService,
    private _compraService: CompraService,
    private _dialogRef: MatDialogRef<GenerarOcComponent>) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.jsonOrdenCompra.feOrdenCompra = ((this.today).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.getProveedor();
    this.getMaterialOC(1);

  }
  insert() {

  }
  aleatorio(minimo: number, maximo: number): String {
    let as: any = Math.floor(Math.random() * ((maximo + 1) - minimo) + minimo);
    return as.toString();
  }

  getProveedor() {
    // this.proveedorList = [{ id: 21, descripcionProveedor: 'GoodGears SAC' }, { id: 41, descripcionProveedor: 'COSAPI SA' }, { id: 25, descripcionProveedor: 'Graña & Montero' }]
    this._compraService.getProveedor(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.proveedorList = data.proveedorList;
        } else if (data.estado == 0) {
          this.proveedorList = [];
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMaterialOC();
  }

  getMaterialOC(numPagina?: number) {

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._ordenCompra.getMaterialesOC(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.materialOCList = data.materialordencompraList;
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.materialOCList.length > 0) {
            this.pagination.nuRegisMostrar = this.materialOCList[0].nuTotalReg;
          }
          this.dataSourceMaterialOrdenCompra = new MatTableDataSource(this.materialOCList);
          // this.proveedorList = this.materialOCList.filter(function (item, index, array) {
          //   return { value: array.indexOf(item) === index };
          // })
        } else if (data.estado == 0) {
          this.toastr.error("No se encontraron datos");
          this.materialOCList = [];
          this.dataSourceMaterialOrdenCompra = new MatTableDataSource(this.materialOCList);
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
  busquedaCod(codigo) {
    this.getMaterialOC();
  }

  busquedaDescripcion(descrip: string) {
    if (descrip.length % 2 == 0) {

      this.getMaterialOC();
    }
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

  generarOrden() {
    // this.confirmacionCorrecta()
    // this.toastr.success("generado correctamente", "Exitoso")
    let idMaterialOrdenCompra = ''
    this.ocTempList.map((_it, _id) => {
      if (this.ocTempList.length == 1) {
        idMaterialOrdenCompra = '{' + _it.idMaterialOrdenCompra + '}';
      } else if (_id == 0) {
        idMaterialOrdenCompra = '{' + _it.idMaterialOrdenCompra;
      } else if (_id == this.ocTempList.length - 1 && this.ocTempList.length <= 2) {
        idMaterialOrdenCompra = idMaterialOrdenCompra + ',' + _it.idMaterialOrdenCompra + '}';
      } else if (_id == this.ocTempList.length - 1) {
        idMaterialOrdenCompra = idMaterialOrdenCompra + _it.idMaterialOrdenCompra + '}';
      } else {
        idMaterialOrdenCompra = idMaterialOrdenCompra + ',' + _it.idMaterialOrdenCompra;
      }
    })
    this.jsonOrdenCompra.idMaterialOrdenCompra = idMaterialOrdenCompra
    this.jsonOrdenCompra.codigo = 'OC-' + this.aleatorio(10, 90) + this.aleatorio(100, 999);
    console.log(this.jsonOrdenCompra)

    this._ordenCompra.postOrdenCompra(this.jsonOrdenCompra)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Insertado Correctamente", "Exitoso");
          this.confirmacionCorrecta();
        } else if (data.estado == 0) {
          this.proveedorList = [];
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
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
