import { style } from '@angular/animations';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { ConfirmacionNotaEntradaComponent } from './../../movimiento/nota-entrada/confirmacion-nota-entrada/confirmacion-nota-entrada.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { MovimientoService } from '../../../services/movimiento.service';
import { NuevoRequerimientoComponent } from './nuevo-requerimiento/nuevo-requerimiento.component';
import { VisualizarSolicitudComponent } from './visualizar-solicitud/visualizar-solicitud.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CorrelativoService } from '../../../services/correlativo.service';

@Component({
  selector: 'app-solicitar-medicamento-material',
  templateUrl: './solicitar-medicamento-material.component.html',
  styleUrls: ['./solicitar-medicamento-material.component.scss']
})
export class SolicitarMedicamentoMaterialComponent implements OnInit {
  displayedColumnsSolicitudes = ['numOrder', 'numeroSolicitud', 'Fecha', 'Estado', 'Accion', 'confirmacion', 'eliminar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private position = 'above';
  private idAlmacen: any;
  private tipoAlmacen: any;
  private params = { idAlmacen: null, feDesde: null, feHasta: null, flEstadoComprobante: null };
  private parametros = { idAlmacen:null, idTipoDocumentoFarmacia:null}
  private feDesde: Date = null;
  private feHasta: Date = null;
  private comprobantes: any[] = [];
  private disableConfirmar: boolean[] = [];
  private disableEliminar: boolean[] = [];
  private descripAlmacen = null;
  private almacenSolicitante = "";
  private confirmacion = "";
  // Agregado para paginación
  // private displayedColumns: string[];
  // private displayedSizes: number[];
  // private pageSize: number;
  // private matDataSource: MatTableDataSource<any>;
  // private paramsBusqueda: any;
  // private pagination: any;

  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _correlativoService: CorrelativoService
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
  }
  ngOnInit() {
    this.getAlmacenPadre();
    this.params.idAlmacen = this.idAlmacen;
    this.getComprobanteFarmacia();
  }

  private almacenNu: any = [];
  private almacenPadre = "";
  
  private getAlmacenPadre() {
    this._movimientoService.getAlmacenPadre(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.almacenNu = data.almacen;
          this.almacenPadre = this.almacenNu.almacenPadreList[0].descripcionAlmacen;
          this.almacenSolicitante = this.tipoAlmacen == 'F' ? this.almacenPadre : "Almacén General";
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  private hayCorrelativo(){
    this.parametros.idAlmacen = this.idAlmacen;
    this.parametros.idTipoDocumentoFarmacia = 2;
    console.log(this.parametros)
    this._correlativoService.confirmTipoComprobante(this.parametros)
      .subscribe(data => {
        if (data.estado == 1) {
           this.modalNuevoRequerimiento();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  modalNuevoRequerimiento(): void {
    const dialogRef = this.dialog.open(NuevoRequerimientoComponent, {
      autoFocus: false,
      // maxWidth: '90%',
      width: '80%',
      // maxHeight: '95%',
      // height: '95%',
      disableClose: true,
      panelClass: 'solicitarRequerimiento'
    });
    dialogRef.componentInstance.idAlmacen = this.idAlmacen;
    dialogRef.afterClosed().subscribe(result => {
      this.getComprobanteFarmacia();
    });
  }
  modalVisualizarSolicitud(idComprobante): void {
    const dialogRef = this.dialog.open(VisualizarSolicitudComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '80%',
      width: '70',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.idComprobante = idComprobante;
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  private getComprobanteFarmacia() {
    if (this.params.idAlmacen == null || this.params.idAlmacen == undefined) {
      this.toastr.error("Debe seleccionar un almacén");
      return;
    }

    // if (this.feDesde != null && this.feHasta != null) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.params.feDesde = this.feDesde == null ? null : ((this.feDesde).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.params.feHasta = this.feHasta == null ? null : ((this.feHasta).toLocaleDateString('es-PE', options)).split('/').join('-');
    // }


    // if (this.validaFechaInicioFechaFin() != 0) {
    console.log(this.params)
    this._movimientoService.getComprobanteFarmacia(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          Object.keys(data.comprobanteFarmaciaList).forEach(key => {
            data.comprobanteFarmaciaList[key]["numOrder"] = Number(key) + 1;
            if (data.comprobanteFarmaciaList[key]["flEstadoComprobante"] === null || data.comprobanteFarmaciaList[key]["flEstadoComprobante"] === undefined) {
              data.comprobanteFarmaciaList[key]["flEstadoComprobante"] = "-";
              data.comprobanteFarmaciaList[key]["disableEliminar"] = true;
              data.comprobanteFarmaciaList[key]["disableConfirmar"] = true;
            }
            if (data.comprobanteFarmaciaList[key]["flEstadoComprobante"] == "P") {
              data.comprobanteFarmaciaList[key]["flEstadoComprobante"] = "Pendiente";
              data.comprobanteFarmaciaList[key]["disableEliminar"] = false;
              data.comprobanteFarmaciaList[key]["disableConfirmar"] = true;
            }
            if (data.comprobanteFarmaciaList[key]["flEstadoComprobante"] == "E") {
              data.comprobanteFarmaciaList[key]["flEstadoComprobante"] = "Atendido";
              data.comprobanteFarmaciaList[key]["disableEliminar"] = true;
              data.comprobanteFarmaciaList[key]["disableConfirmar"] = false;
            }
            if (data.comprobanteFarmaciaList[key]["flEstadoComprobante"] == "C") {
              data.comprobanteFarmaciaList[key]["flEstadoComprobante"] = "Confirmado";
              data.comprobanteFarmaciaList[key]["disableEliminar"] = true;
              data.comprobanteFarmaciaList[key]["disableConfirmar"] = true;
            }
          });

          this.comprobantes = data.comprobanteFarmaciaList;
          console.log(this.comprobantes);
          this.dataSource = new MatTableDataSource(this.comprobantes);
          this.dataSource.paginator = this.paginator;
          this.limpiarCampos();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
    // }
  }
  confirmarSolicitud(idComprobante) {
    Object.keys(this.comprobantes).forEach(key => {
      if (this.comprobantes[key]["idComprobante"] == idComprobante) {
        if (this.comprobantes[key]["flEstadoComprobante"] != "Atendido") {
          this.toastr.warning("La solicitud no está atendida");
          return;
        }
        else {
          //SERVICIO CONFIRMAR SOLICITUD  getComprobanteFarmacia()
          this.confirmacion = ('¿Está seguro que desea confirmar la solicitud?');
          const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
            autoFocus: false,
            maxWidth: '35%',
            maxHeight: '40%',
            disableClose: true
          });
          dialogRef.componentInstance.confirmacion = this.confirmacion;
          dialogRef.afterClosed().subscribe(result => {
            if (result == 1) {
              this._movimientoService.confirmarSolicitud(idComprobante)
                .subscribe(data => {
                  if (data.estado == 1) {
                    this.toastr.success('Solicitud confirmada');
                    this.getComprobanteFarmacia();
                  }
                  else {
                    this.toastr.info('No se pudo confirmar su solicitud');
                  }
                  return true;
                },
                  err => { console.error(err) },
                  () => {
                  });
            }
          });
        }
      }
    });
  }

  eliminarSolicitud(idComprobante) {
    console.log("algo");
    Object.keys(this.comprobantes).forEach(key => {
      if (this.comprobantes[key]["idComprobante"] == idComprobante) {
        if (this.comprobantes[key]["flEstadoComprobante"] != "Pendiente") {
          this.toastr.warning("El estado no esta pendiente");
          return;
        }
        else {
          this.confirmacion = ('¿Está seguro que desea eliminar la solicitud?');
          const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
            autoFocus: false,
            maxWidth: '35%',
            maxHeight: '40%',
            disableClose: true
          });
          dialogRef.componentInstance.confirmacion = this.confirmacion;
          dialogRef.afterClosed().subscribe(result => {
            if (result == 1) {
              this._movimientoService.eliminarSolicitud(idComprobante)
                .subscribe(data => {
                  if (data.estado == 1) {
                    this.toastr.info('Solicitud eliminada');
                    this.getComprobanteFarmacia();
                  }
                  else {
                    this.toastr.info('No se pudo eliminar su solicitud');
                  }
                  return true;
                },
                  err => { console.error(err) },
                  () => {
                  });
            }
          });
        }
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

  private limpiarCampos() {
    this.feDesde = null;
    this.feHasta = null;
    this.params.feDesde = null;
    this.params.feHasta = null;
    this.params.flEstadoComprobante = null;
  }
}