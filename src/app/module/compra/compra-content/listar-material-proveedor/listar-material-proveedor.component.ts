import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { CompraService } from './../services/compra.service';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { InsertarMaterialProveedorComponent } from './insertar-material-proveedor/insertar-material-proveedor.component';

@Component({
  selector: 'app-listar-material-proveedor',
  templateUrl: './listar-material-proveedor.component.html',
  styleUrls: ['./listar-material-proveedor.component.scss']
})
export class ListarMaterialProveedorComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private paramsBusqueda = { idMaterialProveedor: null, codMatProv: null };
  private lsEstado: any = [];
  displayedColumns = [ 'idMp', 'uniM', 'fac','prec'];
  private materialesproveedoresAUX: any = [];
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

    this.buscarListaMaterialProveedor(1);
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarListaMaterialProveedor();

  }

  private buscarListaMaterialProveedor(numPagina?: number) {

    if (this.paramsBusqueda.codMatProv== "" || this.paramsBusqueda.codMatProv == undefined || this.paramsBusqueda.codMatProv == null) {
      this.paramsBusqueda.codMatProv = null;
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
    this._compraService.getMaterialProveedor(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.materialesproveedoresAUX = data.materialproveedorList;
          console.log(this.materialesproveedoresAUX);
          this.dataSource = new MatTableDataSource(this.materialesproveedoresAUX);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.materialesproveedoresAUX.length > 0) {
            this.pagination.nuRegisMostrar = this.materialesproveedoresAUX[0].nuTotalReg;
          }
        } else if (this.materialesproveedoresAUX == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.materialesproveedoresAUX = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

 
  insertarMaterialProveedor() {
    const dialogRef = this._modalDialog.open(InsertarMaterialProveedorComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.buscarListaMaterialProveedor(1);
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
