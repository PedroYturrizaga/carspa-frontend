import { ReporteCierreCajaComponent } from './../apertur-cierre-caja/reporte-cierre-caja/reporte-cierre-caja.component';
import { CerrarCajaComponent } from './cerrar-caja/cerrar-caja.component';
import { AperturarCajaComponent } from './aperturar-caja/aperturar-caja.component';
import { MatTableDataSource, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { GestionarCajaService } from './../../services/gestionar-caja.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from '../../../../shared/services/reporte.service';
import { getCodUsuario } from '../../../../shared/auth/storage/cabecera.storage';

@Component({
  selector: 'app-gestionar-caja',
  templateUrl: './gestionar-caja.component.html',
  styleUrls: ['./gestionar-caja.component.scss']
})
export class GestionarCajaComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  //Selector
  private lsAreas = [];
  private request = { fechaInicio: null, fechaFin: null, estado: null, idArea: null }
  private pagination: any;
  private aperturaCajasList: any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['areaFisica', 'nombre', 'fecha', 'turno', 'cajero', 'montoApertura', 'estado', 'apertura', 'cierre', 'verDetalle', 'aprobacion'];
  private aperturaCaja: any = {
    idAperturaCaja: null, saldoFaltant: null, saldoCaja: null, idUsuario: null
  };

  //Para paginacion
  private displayedSize: number[];
  private pageSize: number;
  private codUsuario = getCodUsuario();


  constructor(private _gestionarCajaService: GestionarCajaService
    , private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _reporteService: ReporteService) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 10 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];

  }

  ngOnInit() {
    this.TraerAreaFisica();
    this.validaFecha();
    this.obtenerAperturaCajas(1);
  }

  public TraerAreaFisica() {

    this._gestionarCajaService.obtenerAreaFisica()
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data.areaList);
          this.toastr.success(data.mensaje);
          this.lsAreas = data.areaList;
          console.log(this.lsAreas);
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

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
  this.obtenerAperturaCajas();
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
          let count = ((this.pagination.nuPagina - 1) * this.pageSize) + 1
          this.aperturaCajasList.forEach(element => {
            element['montoAperturaDecimal'] = parseFloat(element.montoApertura).toFixed(2)
            if (element.montoAperturaDecimal == "NaN")
              element.montoAperturaDecimal = "-"
          })

          this.dataSource = new MatTableDataSource(this.aperturaCajasList);

          // this.request.fechaInicio = null;
          // this.request.fechaFin = null;
          // this.request.estado = null;
          // this.request.idArea = null;

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
  // 
  private aperturarCajaModal(element) {
    const dialogRef = this._modalDialog.open(AperturarCajaComponent, {
      autoFocus: false,
      maxWidth: '60%',
      width: '60%',
      //  maxHeight: '100%',
      // height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.id == 1) {
          this.toastr.success(result.mensaje);
          this.obtenerAperturaCajas(1);
        } else {
          this.toastr.error(result.mensaje);
        }
      }
    }
    );
  }
  private cerrarCajaModal(element) {
    const dialogRef = this._modalDialog.open(CerrarCajaComponent, {
      autoFocus: false,
      maxWidth: '60%',
      width: '60%',
      //  maxHeight: '100%',
      // height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.id == 1) {
          this.toastr.success(result.mensaje);
          this.obtenerAperturaCajas(1);
        } else {
          this.toastr.error(result.mensaje);
        }
      }
    });
  }
  public validaFecha() {
    if (this.request.fechaInicio > this.request.fechaFin || this.request.fechaInicio == null) {
      this.request.fechaInicio = this.request.fechaFin
    }
  }


  private imprimir(personal) {
    const dialogRef = this._modalDialog.open(ReporteCierreCajaComponent, {
      autoFocus: false,
      maxWidth: '80%',
      width: '80%',
      maxHeight: '100%',
      height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.componentInstance.idAperturaCaja = personal.idAperturaCaja;
    dialogRef.componentInstance.saldoFaltante = personal.saldoFaltante;
    dialogRef.componentInstance.saldoCaja = personal.saldoCaja;
    // dialogRef.componentInstance.idAperturaCaja=68;
    //  dialogRef.componentInstance.saldoFaltante=68;
    // dialogRef.componentInstance.saldoCaja=68;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // this.obtenerSubActividad();
      }
    });
  }
}
