import { ModalPdfComponent } from './../../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MovimientoService } from '../../../../services/movimiento.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import { ReporteService } from '../../../../../../shared/services/reporte.service';

@Component({
  selector: 'app-visualizar-solicitud',
  templateUrl: './visualizar-solicitud.component.html',
  styleUrls: ['./visualizar-solicitud.component.scss']
})
export class VisualizarSolicitudComponent implements OnInit {
  displayedColumnsDispositivosMeds = ['codigo', 'medicamento', 'formaFarmaceutica', 'presentacion', 'marca', 'nombreUnidad', 'cantidad'];
  dataSource = new MatTableDataSource();

  @Input() idComprobante;
  private medicDispMedProducSani: any = {};
  // private medicDispMedProducSani = { comprobanteFarmaciaDetalleList: { medicamento: {}} };
  private nuevoArreglo: any = [];
  private pdf: String;
  private cabezeraComprobante = { numeroComprobante: null, feComprobante: null, descripcionAlmacenOrigen: null, descripcionAlmacenDestino: null };

  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    public dialogRef: MatDialogRef<VisualizarSolicitudComponent>,
    public dialog: MatDialog
  ) { }

  close() {
    this.dialogRef.close();
  }
  dismiss() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.getDetalleComprobanteFarmacia();
  }

  private getDetalleComprobanteFarmacia() {
    //console.log(this.idComprobante);
    this._movimientoService.getDetalleComprobanteFarmacia(this.idComprobante)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.medicDispMedProducSani = data.comprobanteFarmaciaList[0];
          console.log(this.medicDispMedProducSani);
          if (this.medicDispMedProducSani != null) {
            this.cabezeraComprobante.numeroComprobante = this.medicDispMedProducSani['numeroComprobante'];
            this.cabezeraComprobante.feComprobante = this.medicDispMedProducSani['feComprobante'];
            this.cabezeraComprobante.descripcionAlmacenOrigen = this.medicDispMedProducSani['almacenOrigen']['descripcionAlmacen'];
            this.cabezeraComprobante.descripcionAlmacenDestino = this.medicDispMedProducSani['almacenDestino']['descripcionAlmacen'];
            for (let a of this.medicDispMedProducSani.comprobanteFarmaciaDetalleList) {
              let b = a.cantidadSolicitud.split(" / ");

              if (b[1] == "") {
                b[1] = 0;
                a.cantidadSolicitud = b[0] + " / " + b[1];
              }
            }
            this.dataSource = new MatTableDataSource(this.medicDispMedProducSani.comprobanteFarmaciaDetalleList);
            // console.log(this.dataSource)
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

  private imprimirSolicitud(tipoFile) {
    this._movimientoService.imprimirSolicitudRequerimiento(this.idComprobante, 1)
      .subscribe(data => {
        if (data.estado == 1) {
          // console.log(data);
          // this._reporteService.generar(null, data.imprimeFile, 2);
          if (tipoFile == 2) {
            this.pdf = "data:application/pdf;base64," + data.imprimeFile;
            this.pruebitaModal(this.pdf);
          }
          else {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          }
        }
      },
        err => { this.toastr.error(err) },
        () => {
          this.close();
        });
  }

  pruebitaModal(mystring): void {
    const dialogRef = this.dialog.open(ModalPdfComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.mystring = mystring;
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
