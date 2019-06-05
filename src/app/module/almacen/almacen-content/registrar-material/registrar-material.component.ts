import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AlmacenService } from './../../services/almacen.service';
import { VisualizarMaterialesComponent } from './visualizar-materiales/visualizar-materiales.component';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { RegistrarAnaquelComponent } from './registrar-anaquel/registrar-anaquel.component';

@Component({
  selector: 'app-registrar-material',
  templateUrl: './registrar-material.component.html',
  styleUrls: ['./registrar-material.component.scss']
})
export class RegistrarMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private paramsBusqueda = { idAlmacenOrdenCompra: null, estado: null };
  private lsEstado: any = [];
  displayedColumns = ['codMov', 'descAlm', 'fecha', 'estado', 'nomProv', 'anaquel'];
  private almacenOrdenesCompraAUX: any = [];
  dataSource = new MatTableDataSource();
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private _almacenService: AlmacenService,
    private toastr: ToastsManager) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.llenarLista();
    this.buscarListaOrdenCompraAlmacen(1);
  }

  private llenarLista() {
    this.lsEstado = [
      { idEstado: 'P', descripcionEstado: "Pendiente" },
      { idEstado: 'E', descripcionEstado: "Entregado" }
    ];
  }


  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarListaOrdenCompraAlmacen();
  }

  private buscarListaOrdenCompraAlmacen(numPagina?: number) {

    if (this.paramsBusqueda.idAlmacenOrdenCompra == "" || this.paramsBusqueda.idAlmacenOrdenCompra == undefined || this.paramsBusqueda.idAlmacenOrdenCompra == null) {
      this.paramsBusqueda.idAlmacenOrdenCompra = null;
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
    this._almacenService.getAlmacenOrdenCompra(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.almacenOrdenesCompraAUX = data.almacenOrdenCompraList;
          console.log(this.almacenOrdenesCompraAUX);
          this.dataSource = new MatTableDataSource(this.almacenOrdenesCompraAUX);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.almacenOrdenesCompraAUX.length > 0) {
            this.pagination.nuRegisMostrar = this.almacenOrdenesCompraAUX[0].nuTotalReg;
          }
        } else if (this.almacenOrdenesCompraAUX == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.almacenOrdenesCompraAUX = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }




  
  abrirModalVerificarMateriales(row) {
    if (row.estado == "E") {
      return;
    }
    console.log(row);
    const dialogRef = this._modalDialog.open(VisualizarMaterialesComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.buscarListaOrdenCompraAlmacen();
      }
    });
  }

  verificarIdEstado(idestado) {
    console.log(idestado);
  }

  modalRegistrarAnaquel(lista) {
    console.log(lista);
    if (lista.estado == "P") {
      return;
    }
    const dialogRef = this._modalDialog.open(RegistrarAnaquelComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.materialList = lista;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.buscarListaOrdenCompraAlmacen();
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
