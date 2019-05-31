import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { CompraService } from './../services/compra.service';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { InsertarProveedorComponent } from './insertar-proveedor/insertar-proveedor.component';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.scss']
})
export class ListarProveedorComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private paramsBusqueda = { idProveedor: null, nombreProveedor: null };
  private lsEstado: any = [];
  displayedColumns = [ 'nombProv', 'direcc', 'telef','email'];
  private proveedoresAUX: any = [];
  dataSource = new MatTableDataSource();
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private _compraService: CompraService,
    private toastr: ToastsManager) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  private llenar = { id: null, nom: null };

  ngOnInit() {

    this.buscarListaProveedor(1);
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarListaProveedor();

  }

  private buscarListaProveedor(numPagina?: number) {

    if (this.paramsBusqueda.nombreProveedor== "" || this.paramsBusqueda.nombreProveedor == undefined || this.paramsBusqueda.nombreProveedor == null) {
      this.paramsBusqueda.nombreProveedor = null;
    }

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.paramsBusqueda);
    this._compraService.getProveedor(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.proveedoresAUX = data.proveedorList;
          console.log(this.proveedoresAUX);
          this.dataSource = new MatTableDataSource(this.proveedoresAUX);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.proveedoresAUX.length > 0) {
            this.pagination.nuRegisMostrar = this.proveedoresAUX[0].nuTotalReg;
          }
        } else if (this.proveedoresAUX == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.proveedoresAUX = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  insertarProveedor() {
    const dialogRef = this._modalDialog.open(InsertarProveedorComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.buscarListaProveedor(1);
      }
    });
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
}
