import { ReporteService } from './../../../../../shared/services/reporte.service';
import { AtenderRecetaService } from './../../../services/atender-receta.service';
import { ModalPdfComponent } from '../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { AtenderRecetaComponent } from './../atender-receta.component';
import { MatDialogRef, MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-previsualizar-orden',
  templateUrl: './previsualizar-orden.component.html',
  styleUrls: ['./previsualizar-orden.component.scss']
})
export class PrevisualizarOrdenComponent implements OnInit {

  @Input() listaOrden;
  @Input() total;
  @Input() request;

  private pdf: String;

  dataSource = new MatTableDataSource();
  displayedColumns = ['dciProductoFarmaceutico', 'formaFarmaceutica', 'cantidadAtendida', 'unidad', 'precioDescuento', 'total'];

  constructor(public dialogRef: MatDialogRef<AtenderRecetaComponent>,
    public dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastsManager,
    private _atenderRecetaService: AtenderRecetaService,
    private _reporteService: ReporteService, ) { }

  ngOnInit() {
    if (this.request == null) {
      console.log(this.listaOrden);
      this.getListaOrden(this.listaOrden);
    } else {
      console.log(this.request.ordenPagoFarmaciaDetalleList);
      this.getListaOrden(this.request.ordenPagoFarmaciaDetalleList);
    }
  }

  close(add) {
    this.dialogRef.close(add);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getListaOrden(lista) {
    this.dataSource = new MatTableDataSource(lista);
  }

  private confirmar() {
    this._atenderRecetaService.insertOrdenPagoFarmacia(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          console.log(data.idOrdenPagoFarmacia)
          this.imprimePDF(data.idOrdenPagoFarmacia, 2);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
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

  private imprimePDF(idOrdenPagoFarmacia, tipoFile) {
    let param = {idOrdenPagoFarmacia: null, tipoFile: null};
    param.idOrdenPagoFarmacia = idOrdenPagoFarmacia
    param.tipoFile = tipoFile;

    this._atenderRecetaService.reporteOrdenPagoFarmacia(param)
      .subscribe(data => {
        if (data.estado == 1) {

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
          this.close(1);
        });

  }

}
