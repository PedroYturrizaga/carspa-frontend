import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm, FormControl } from '@angular/forms';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { Observable } from 'rxjs';
import { CompraService } from '../../services/compra.service';
import { SolicitudCotizacionService } from '../../services/solicitud-cotizacion.service';

@Component({
  selector: 'app-generar-solicitud',
  templateUrl: './generar-solicitud.component.html',
  styleUrls: ['./generar-solicitud.component.scss']
})
export class GenerarSolicitudComponent implements OnInit {

  @ViewChild('OrdenCompraForm') private _ordenCompraForm: NgForm;

  @ViewChild(MatPaginator) matPag: MatPaginator;

  displayedColumnsMaterialOrdenCompra = ['codigo', 'nombreMaterial', 'cantidad', 'fecha', 'add'];
  dataSourceMaterialOrdenCompra = new MatTableDataSource();

  displayedColumnsMaterialOCTemp = ['codigo', 'nombreMaterial', 'cantidad', 'fecha', 'eliminar'];
  dataSourceMaterialOCTemp = new MatTableDataSource();

  today: Date = new Date();
  toppingsSC = new FormControl();


  private proveedorList = [];
  private materialOCList = [];

  private ocTempList = [];

  private jsonOrdenCompra = {
    feOrdenCompra: null,
    descripcionProveedor: null
  }
  private paramsBusqueda = { idMaterialOrdenCompra: null, nombre: null, estado: 'PENDIENTE' }

  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _dialogRef: MatDialogRef<GenerarSolicitudComponent>,
    private _compraService: CompraService,
    private _ordenCompra: OrdenCompraService,
    private _solicitudCotizacionService: SolicitudCotizacionService) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.jsonOrdenCompra.feOrdenCompra = ((this.today).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.getProveedor();
    this.getMaterialOC(1);
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
  }

  getProveedor() {

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


  busquedaDescripcion(descrip: string) {
    if (descrip.length % 2 == 0) {

      this.getMaterialOC();
    }
  }

  // getMaterialOC() {
  //   this.materialOCList = [
  //     { codigo: '12', nombreMaterial: 'silicona Liquida', cantidad: 12, fecha: '2019-04-15' },
  //     { codigo: '18', nombreMaterial: 'pulidor liquido', cantidad: 25, fecha: '2019-04-15' },
  //     { codigo: '22', nombreMaterial: 'cera barra', cantidad: 5, fecha: '2019-04-16' },
  //     { codigo: '23', nombreMaterial: 'abrillantador super', cantidad: 82, fecha: '2019-04-16' }
  //   ];
  //   this.dataSourceMaterialOrdenCompra = new MatTableDataSource(this.materialOCList)
  // }

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

  aleatorio(minimo: number, maximo: number): String {
    let as: any = Math.floor(Math.random() * ((maximo + 1) - minimo) + minimo);
    return as.toString();
  }

  /**Servcisio de insertar */

  generarOrden() {
    console.log(this.ocTempList);
    console.log(this.jsonOrdenCompra)
    let idProv = []
    debugger
    this.jsonOrdenCompra.descripcionProveedor.map((_item) => {
      let index = this.proveedorList.findIndex(_it => { return _it['nombreProveedor'] == _item });
      if (index != -1) {
        idProv.push({ valor: this.proveedorList[index]['idProveedor'] })
      }
    })
    console.log(idProv);

    let datos = {
      "codigo": 'SOC-0' + this.aleatorio(1000, 99999),
      "idMaterialOrdenCompra": this.obtenerConcat(this.ocTempList, 'idMaterialOrdenCompra'),
      "idproveedor": this.obtenerConcat(idProv, 'valor')
    }
    console.log(datos);
    this._solicitudCotizacionService.postgenerarSolicitud(datos)
    .subscribe(data => {
      console.log(data)
      if (data.estado == 1) {
        this.toastr.success("Cotizacion Generada", "Exitoso");
        this.confirmacionCorrecta()
      } else if (data.estado == 0) {
      } else {
        this.toastr.error(data.mensaje, "Error");
      }
      return true;
    },
      err => console.error(err),
      () => {
        // this.temp = null;
      });

    
    // this.confirmacionCorrecta()
    // this.toastr.success("generado correctamente", "Exitoso")
  }


  obtenerConcat(_array: any, _item: any) {
    let concatenado = ''
    _array.map((_it, _id) => {
      if (_id == 0) {
        concatenado = '{' + _it[_item];
      } else if (_id == _array.length - 1 && _array.length === 2) {
        concatenado = concatenado + ',' + _it[_item] + '}';
      } else if (_id == _array.length - 1) {
        concatenado = concatenado + ','+ _it[_item] + '}';
      } else {
        concatenado = concatenado + ',' + _it[_item];
      }
    })
    return concatenado;
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