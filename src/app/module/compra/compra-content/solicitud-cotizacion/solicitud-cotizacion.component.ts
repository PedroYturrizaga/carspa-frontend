import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef } from '@angular/material';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { GenerarSolicitudComponent } from './generar-solicitud/generar-solicitud.component';
import { SolicitudCotizacionService } from '../services/solicitud-cotizacion.service';
import { Observable } from 'rxjs';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { RegistrarCotizacionComponent } from './registrar-cotizacion/registrar-cotizacion.component';

@Component({
  selector: 'app-solicitud-cotizacion',
  templateUrl: './solicitud-cotizacion.component.html',
  styleUrls: ['./solicitud-cotizacion.component.scss']
})
export class SolicitudCotizacionComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;

  displayedColumnsSolicitudes = ['codigo', 'fecha', 'estado', 'ver'];
  dataSourceSolicitudes = new MatTableDataSource();

  private paramsBusqueda = { codigo: null, feSolicitud: null }
  private solicitudesCabeceraList = [];

  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _solicitudCotizacionService: SolicitudCotizacionService) {

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.getSolicitudesCabecera(1);

  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getSolicitudesCabecera();
  }

  getSolicitudesCabecera(numPagina?: number) {

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._solicitudCotizacionService.getSolicitudesCabecera(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.solicitudesCabeceraList = data.solicitudcotizacionlist;
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.solicitudesCabeceraList.length > 0) {
            this.pagination.nuRegisMostrar = this.solicitudesCabeceraList[0].nuTotalReg;
          }
          this.dataSourceSolicitudes = new MatTableDataSource(this.solicitudesCabeceraList);
        } else if (data.estado == 0) {
          this.toastr.warning("No se encontraron datos");
          this.solicitudesCabeceraList = [];
          this.dataSourceSolicitudes = new MatTableDataSource(this.solicitudesCabeceraList);
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

  deleteSolicitar(index) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      // width: '75vw'
    });
    dialogRef.componentInstance.mensajeConfirmacion = '¿Desea Eliminar el siguiente Registro?';
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.solicitudesCabeceraList.splice(index, 1);
        this.dataSourceSolicitudes = new MatTableDataSource(this.solicitudesCabeceraList);
        this.toastr.success("Eliminado correctamente", 'Exitoso');
      }
    });

  }

  openModalSolicitudCotizacion() {
    const dialogRef = this._modalDialog.open(GenerarSolicitudComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      height: '600px',

    });
    // dialogRef.componentInstance.row = row;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getSolicitudesCabecera(1);
      }
    });
  }
  visualizarOC(_Data) {
    const dialogRef = this._modalDialog.open(VerSolicitudComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      height: '600px',

    });
    dialogRef.componentInstance.SolicitudCotizacion = _Data;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getSolicitudesCabecera(1);
      }
    });
  }

  verComparativo(element){
    
    const dialogRef = this._modalDialog.open(RegistrarCotizacionComponent, {
      autoFocus: false,
      disableClose: false,
      width: '80vw',
      height: '600px',

    });
    dialogRef.componentInstance.solicitud = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getSolicitudesCabecera(1);
      }
    });
  }


  // 
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

