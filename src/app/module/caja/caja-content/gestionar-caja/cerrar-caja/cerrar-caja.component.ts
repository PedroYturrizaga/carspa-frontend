import { ModalConfirmacionComponent } from './../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { GestionarCajaService } from './../../../services/gestionar-caja.service';
import { AperturaCierreCajaService } from './../../../services/apertura-cierre-caja.service';
import { ReporteCierreCajaComponent } from './../../apertur-cierre-caja/reporte-cierre-caja/reporte-cierre-caja.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { DataService } from '../../../../../shared/services/data.service';
import { element } from 'protractor';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cerrar-caja',
  templateUrl: './cerrar-caja.component.html',
  styleUrls: ['./cerrar-caja.component.scss']
})
export class CerrarCajaComponent implements OnInit {
  @Input() element;
  @ViewChild(MatPaginator) matPag: MatPaginator;
  dataSource = new MatTableDataSource();
  private pagination: any;
  private lsCabecera = { estado: null, descripcionApertura: null, abreviatura: null, fhApertura: null, fhCierre: null, turno: null, horario: null }

  // private cierreCajasList: any[] = [];
  private aperturaCajasList: any[] = [];
  // private request = {  idUsuario: null, descripcionCaja: null };
  private request = { fechaInicio: null, fechaFin: null, estado: null, idArea: null }
  private aperturaCaja: any = {
    idAperturaCaja: null, saldoFaltante: null, montoCierre: null, montoEfectivo: null, montoTarjeta: null, faltanteTarjeta: null, faltanteEfectivo: null,
    saldoEfectivo: null, saldoTarjeta: null, observacion: null,saldoCaja:null
  }

  //Para paginacion
  private displayedSize: number[];
  private pageSize: number;

  constructor(private toastr: ToastsManager,
    private _gestionarCajaService: GestionarCajaService,
    private _modalDialog: MatDialog,
    private _aperturaCierreCajaService: AperturaCierreCajaService,
    public dialogRef: MatDialogRef<CerrarCajaComponent>,
    public dialog: MatDialog,
  ) {
  this.pagination = { nuPagina: 1, nuRegisMostrar: 10 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }


  ngOnInit() {
    this.obtenerCabecera();
  }

  private obtenerCabecera() {

    this.lsCabecera.descripcionApertura = this.element.descripcionApertura;
    this.lsCabecera.turno = this.element.descripcionTurno;
    this.aperturaCaja.idAperturaCaja = this.element.idAperturaCaja;
    this.lsCabecera.estado = this.element.estado;
    this._aperturaCierreCajaService.obtenerAperturaCajaPorId(this.aperturaCaja.idAperturaCaja)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data)
          // this.toastr.success(data.mensaje);
          this.lsCabecera.fhApertura = data.aperturaCaja.fhApertura;
          this.lsCabecera.fhCierre = data.aperturaCaja.fhCierre;
          this.lsCabecera.horario = this.element.horario;

          if (data.aperturaCaja.estadoCaja == "2") {
            this.aperturaCaja.montoCierre = data.aperturaCaja.montoCierre;
            this.aperturaCaja.montoEfectivo = data.aperturaCaja.montoEfectivo;
            this.aperturaCaja.montoTarjeta = data.aperturaCaja.montoTarjeta;
            this.aperturaCaja.saldoEfectivo = data.aperturaCaja.saldoEfectivo;
            this.aperturaCaja.saldoTarjeta = data.aperturaCaja.saldoTarjeta;
            this.aperturaCaja.faltanteEfectivo = data.aperturaCaja.faltanteEfectivo;
            this.aperturaCaja.faltanteTarjeta = data.aperturaCaja.faltanteTarjeta;
            this.aperturaCaja.saldoCaja=data.aperturaCaja.saldoCaja;
            this.aperturaCaja.saldoFaltante=data.aperturaCaja.saldoFaltante;
          } else {
            this.obtenerMontoFinal();
          }
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');



  }

  private obtenerMontoFinal() {
    this._aperturaCierreCajaService.obtenerMontoFinalAperturaCaja(this.aperturaCaja.idAperturaCaja)
      // this._aperturaCierreCajaService.obtenerMontoFinalAperturaCaja(110)
      .subscribe(dato => {
        if (dato.estado == 1) {
          // this.toastr.success(dato.mensaje);
          this.aperturaCaja.montoCierre = dato.montoFinal;
          this.aperturaCaja.montoEfectivo = dato.totalEfectivo;
          this.aperturaCaja.montoTarjeta = dato.totalTarjeta;
        
  
        } else {
          // this.toastr.error(dato.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  private actualizarCerrarCaja() {
    this._aperturaCierreCajaService.actualizarCerrarAperturaCaja(this.aperturaCaja)
      .subscribe(data => {
        if (data.estado == 1) {
          // this.toastr.success(data.mensaje);
          // this.close(data.mensaje);
          this.close({ id: 1, mensaje: data.mensaje });
        } else {
          // this.toastr.error(data.mensaje);
          this.close({ id: 2, mensaje: data.mensaje });
        }
      },
        error => {
          console.log(error);
        });
  }

  calcularFaltanteEfectivo() {
    let cal = this.aperturaCaja.montoEfectivo - this.aperturaCaja.saldoEfectivo;
    this.aperturaCaja.faltanteEfectivo = cal.toFixed(2);

    let sum = parseFloat(this.aperturaCaja.faltanteEfectivo) + parseFloat(this.aperturaCaja.faltanteTarjeta);
    if (this.aperturaCaja.faltanteTarjeta != null) {
      this.aperturaCaja.saldoFaltante = sum.toFixed(2);
    }
  }

  calcularFaltanteTarjeta() {
    let cal = this.aperturaCaja.montoTarjeta - this.aperturaCaja.saldoTarjeta;
    this.aperturaCaja.faltanteTarjeta = cal.toFixed(2);

    let sum = parseFloat(this.aperturaCaja.faltanteEfectivo) + parseFloat(this.aperturaCaja.faltanteTarjeta);
    if (this.aperturaCaja.faltanteEfectivo != null) {
      this.aperturaCaja.saldoFaltante = sum.toFixed(2);
    }
  }
  private confirmarCierreCaja() {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '70%',
      width: '70%',
      maxHeight: '80%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea confirmar el cierre de la Caja "+this.lsCabecera.descripcionApertura+"?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

        this._aperturaCierreCajaService.confirmarCierreCaja(this.aperturaCaja)
          .subscribe(dato => {
            if (dato.estado == 1) {
              this.toastr.success(dato.mensaje);
              this.close({ id: 1, mensaje: dato.mensaje });

            } else {
              this.toastr.error(dato.mensaje);
              this.close({ id: 2, mensaje: dato.mensaje });
            }
          },
            error => {
              console.log(error);
            });

      }
    });
  }


  close(add) {
    this.dialogRef.close(add);
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



  private obtenerAperturaCajas(numPagina?: number) {

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if (this.request.fechaInicio != null) { this.request.fechaInicio = ((this.request.fechaInicio).toLocaleDateString('es-PE', options)).split('/').join('-') }
    if (this.request.fechaFin != null) { this.request.fechaFin = ((this.request.fechaFin).toLocaleDateString('es-PE', options)).split('/').join('-') }



    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._gestionarCajaService.obtenerAperturaCierreCajas(this.request)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.aperturaCajasList = data.aperturaCajaList;
          console.log(this.aperturaCajasList);

          this.dataSource = new MatTableDataSource(this.aperturaCajasList);

          this.request.fechaInicio = null;
          this.request.fechaFin = null;
          this.request.estado = null;
          this.request.idArea = null;

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.aperturaCajasList.length > 0) {
            this.pagination.nuRegisMostrar = this.aperturaCajasList[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron aperturas cajas list");
          this.aperturaCajasList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        }); console.log(this.request)
  }
}

