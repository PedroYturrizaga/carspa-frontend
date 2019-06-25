import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AlmacenService } from './../../services/almacen.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { VisualizarSalidaMaterialComponent } from './visualizar-salida-material/visualizar-salida-material.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-salida-material',
  templateUrl: './salida-material.component.html',
  styleUrls: ['./salida-material.component.scss']
})
export class SalidaMaterialComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private paramsBusqueda = { idAlmacenOrdenTrabajo: null, estado: null };
  private lsEstado: any = [];
  displayedColumns = ['codMov', 'descAlm', 'fecha', 'estado', 'nomCliente'];
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
    //this.buscarOrdenTrabajos(1);
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
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
    this.buscarOrdenTrabajos();
  }

  private buscarOrdenTrabajos(numPagina?: number) {

    if (this.paramsBusqueda.idAlmacenOrdenTrabajo == "" || this.paramsBusqueda.idAlmacenOrdenTrabajo == undefined || this.paramsBusqueda.idAlmacenOrdenTrabajo == null) {
      this.paramsBusqueda.idAlmacenOrdenTrabajo = null;
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
    this._almacenService.listarOT(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.almacenOrdenesCompraAUX = data.almacenOrdenTrabajoList;
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

  abrirModalVerificarUsuario(row) {
    if (row.estado == 'T') {
      return;
    }
    console.log(row);
    const dialogRef = this._modalDialog.open(ModalUsuarioComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.buscarOrdenTrabajos();
      }
    });
  }

  verificarIdEstado(idestado) {
    console.log(idestado);
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
