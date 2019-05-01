import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { MovimientoService } from '../../../services/movimiento.service';
import { AtenderSolicitudComponent } from './atender-solicitud/atender-solicitud.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';

import { VisualizarSolicitudAtendidasComponent } from './visualizar-solicitud-atendidas/visualizar-solicitud-atendidas.component';

@Component({
  selector: 'app-transferir-medicamento-material',
  templateUrl: './transferir-medicamento-material.component.html',
  styleUrls: ['./transferir-medicamento-material.component.scss']
})
export class TransferirMedicamentoMaterialComponent implements OnInit {

  displayedColumnsComrobantes = ['Item', 'numeroSolicitud', 'Fecha', 'Almacen', 'Estado', 'Accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private position = 'above';

  public idAlmacen: any;
  public tipoAlmacen: any;
  private newJason = null;
  private feDesde: Date = null;
  private feHasta: Date = null;
  private cabeceraAlmacen: any[] = [];
  private comprobantes: any[] = [];
  //private listObtenerDetalleComprobanteFarmaciaAtendidos = [];
  private params = { idAlmacen: null, numeroComprobante: null, feDesde: null, feHasta: null, flEstadoComprobante: null, idAlmacenDestino: null };

  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    private _route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
    });
  }

  ngOnInit() {
    this.getAlmacenPadre();
    this.getComprobanteFarmacia();
  }

  private getAlmacenPadre() {
    this._movimientoService.getAlmacenPadre(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraAlmacen = data.almacen;
          if (data.almacen.almacenHijoList[0] != null && data.almacen.almacenPadreList == null) {
            this.params.idAlmacen = data.almacen.almacenHijoList[0].idAlmacen;
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

  private getComprobanteFarmacia() {
    this.params.idAlmacenDestino = this.idAlmacen;
    if (this.params.idAlmacenDestino == null || this.params.idAlmacenDestino == undefined) {
      this.toastr.error("Debe seleccionar un almacén");
      return;
    }
    if (this.params.flEstadoComprobante == "") {
      this.params.flEstadoComprobante = null;
    }
    if (this.params.numeroComprobante == "") {
      this.params.numeroComprobante = null;
    }
    // if (this.feDesde != null && this.feHasta != null) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.params.feDesde = this.feDesde == null ? null : ((this.feDesde).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.params.feHasta = this.feHasta == null ? null : ((this.feHasta).toLocaleDateString('es-PE', options)).split('/').join('-');
    // }
    // if (this.validaFechaInicioFechaFin() != 0) {
    console.log(this.params);
    this._movimientoService.getComprobanteFarmacia(this.params)
      .subscribe(data => {
        console.log();
        
        if (data.estado == 1) {
          this.comprobantes = data.comprobanteFarmaciaList;
          let count = 1;
          for (let item of this.comprobantes) {
            item.i = count;
            count++;
          }
          this.dataSource = new MatTableDataSource(this.comprobantes);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
    // }
  }

  private modalTransferencia(idComprobante, fechComprobante, descripAlmaSoli, nroComprobante, flEstadoComprobante) {
    if (flEstadoComprobante == "P") {
      this.modalAtenderSolicitud(idComprobante, fechComprobante, descripAlmaSoli, nroComprobante, flEstadoComprobante);
    }
    if (flEstadoComprobante == "E" || flEstadoComprobante == "C") {
      this.modalSolicitudesAtendidas(idComprobante, fechComprobante, descripAlmaSoli, nroComprobante, flEstadoComprobante);
    }
  }
  
  private _idComprobante: any;

  private modalAtenderSolicitud(idComprobante, fechComprobante, descripAlmaSoli, nroComprobante, flEstadoComprobante): void {
    let cabeceraSolicitud = { idComprobante: null, fechComprobante: null, descripAlmaSoli: null, nroComprobante: null, flEstadoComprobante };
    cabeceraSolicitud.idComprobante = idComprobante;
    cabeceraSolicitud.fechComprobante = fechComprobante;
    cabeceraSolicitud.descripAlmaSoli = descripAlmaSoli;
    cabeceraSolicitud.nroComprobante = nroComprobante;
    cabeceraSolicitud.flEstadoComprobante = flEstadoComprobante;

    const dialogRef = this.dialog.open(AtenderSolicitudComponent, {
      autoFocus: false,
      width: '97%',
      maxWidth: '97%',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.cabeceraSolicitud = cabeceraSolicitud;
    dialogRef.componentInstance.idAlmacen = this.idAlmacen;
    dialogRef.componentInstance.tipoAlmacen = this.tipoAlmacen;
    dialogRef.afterClosed().subscribe(result => {
      console.log("result:", result);
      if (result.id > 0) {
        this._idComprobante = result.idComprobante;
        console.log(this._idComprobante);
        
        this.getComprobanteFarmacia();
      }
    });
  }

  // private validaFechaInicioFechaFin() {
  //   if (this.params.feDesde != null && this.params.feDesde != "" && this.params.feDesde != undefined) {
  //     if (this.feDesde > this.feHasta) {
  //       this.toastr.error("La fecha de inicio no puede exceder a la de fin");
  //       return 0;
  //     }
  //   }
  //   return 1;
  // }

  private limpiarCampos(_ngForm: any) {
    this.params.feDesde = null;
    this.params.feHasta = null;
    _ngForm.reset();
  }

  // AGREGADO ...
  private modalSolicitudesAtendidas(idComprobante, fechComprobante, descripAlmaSoli, nroComprobante, flEstadoComprobante): void {
    let cabeceraSolicitud2 = { idComprobante: null, fechComprobante: null, descripAlmaSoli: null, nroComprobante: null, flEstadoComprobante };
    cabeceraSolicitud2.idComprobante = idComprobante;
    cabeceraSolicitud2.fechComprobante = fechComprobante;
    cabeceraSolicitud2.descripAlmaSoli = descripAlmaSoli;
    cabeceraSolicitud2.nroComprobante = nroComprobante;
    cabeceraSolicitud2.flEstadoComprobante = flEstadoComprobante;

    const dialogRef = this.dialog.open(VisualizarSolicitudAtendidasComponent, {
      autoFocus: false,
      width: '97%',
      maxWidth: '97%',
      maxHeight: '80%',
      height:'80%',
      disableClose: true
    });
    console.log(cabeceraSolicitud2)
    console.log(this._idComprobante)
    //dialogRef.componentInstance.idComprobanteNew = this._idComprobante;
    dialogRef.componentInstance.cabeceraSolicitud2 = cabeceraSolicitud2;
    dialogRef.componentInstance.idAlmacen = this.idAlmacen;
    dialogRef.componentInstance.tipoAlmacen = this.tipoAlmacen;
    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.getComprobanteFarmacia();
      }
    });
  }
}