import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { GenerarCotizacionComponent } from './generar-cotizacion/generar-cotizacion.component';
import { VerCotizacionComponent } from './ver-cotizacion/ver-cotizacion.component';
import { CotizacionService } from './../services/cotizacion.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;

  displayedColumnsCotizaciones = ['codigo', 'fecha', 'proveedor', 'estado', 'cotizar'];
  dataSourceCotizaciones = new MatTableDataSource();

  private cotizacionesList = [];

  today: Date = new Date();

  private paramsBusqueda = { codCotizacion: null, feCotizacion: null, esCotizacion: null };

  private estadoCotizacionList = [];

  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _cotizacionService: CotizacionService) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.obtenerProveedores();
    this.buscarCotizacion(1);
  }

  obtenerProveedores() {
    this.estadoCotizacionList = [{ id: 1, valor: 'Cotizado Parcial' }, { id: 2, valor: 'Cotizado Total' }]
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarCotizacion();

  }

  buscarCotizacion(numPagina?: number) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.feCotizacion = this.paramsBusqueda.feCotizacion ? ((this.paramsBusqueda.feCotizacion).toLocaleDateString('es-PE', options)).split('/').join('-') : null;

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
    // this._cotizacionService.getCotizaciones(this.paramsBusqueda)
    //   .subscribe(data => {
    //     console.log(data);
    //     if (data.estado == 1) {
    //       this.cotizacionesList = data.cotizacionProveedorList;
    //       if (this.matPag) {
    //         this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
    //       }
    //       if (this.cotizacionesList.length > 0) {
    //         this.pagination.nuRegisMostrar = this.cotizacionesList[0].nuTotalReg;
    //       }
    //       this.dataSourceCotizaciones = new MatTableDataSource(this.cotizacionesList);
    //     } else if (data.estado == 0) {
    //       this.toastr.error("No se encontraron datos");
    //       this.cotizacionesList = [];
    //       this.dataSourceCotizaciones = new MatTableDataSource(this.cotizacionesList);
    //     } else {
    //       this.toastr.error(data.mensaje, 'Error');
    //     }
    //   },
    //     error => {
    //       this.toastr.error(error);
    //       return Observable.throw(error);
    //     }),
    //   err => this.toastr.error(err),
    //   () => this.toastr.success('Request Complete');
  }



  openModalGenerarCotizacion() {
    const dialogRef = this._modalDialog.open(GenerarCotizacionComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      height: '600px',

    });
    // dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // this.BuscarOrdenCompra();
      }
    });
  }

  visualizarOC(_element) {
    const dialogRef = this._modalDialog.open(VerCotizacionComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      maxHeight: '35vw',

    });
    dialogRef.componentInstance.jsonPadre = _element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // this.BuscarOrdenCompra();
      }
    });
  }
}
