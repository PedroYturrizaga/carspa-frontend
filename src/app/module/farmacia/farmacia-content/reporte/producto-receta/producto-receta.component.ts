import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-producto-receta',
  templateUrl: './producto-receta.component.html',
  styleUrls: ['./producto-receta.component.scss']
})

export class ProductoRecetaComponent implements OnInit {

  displayedProductosReceta = ['codigo', 'productoFarma', 'formaFarma','unidad', 'totalUni'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private idAlmacen;
  private tipoAlmacen;
  private descripAlmacen;
  private gruposMedicamentos: any[];
  private recetaCabecera: any = [];
  private paramsBusqueda = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null };
  private flgMedicDisp: any;
  private descripAutoComplete: any = "";
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private recetaDetalle = [];
  private parametros = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, tipoFile: null, descripcionAlmacen: null, noTipo: null };
  private fhinicio: Date = null;
  private fhfin: Date = null;
  private longitud = 0;
  private pdf: String;

  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
    { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });

    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.parametros.idAlmacen = this.idAlmacen;
    this.flgMedicDisp = 'M';
    this.descripAutoComplete = this.gruposMedicamentos[0].valor;

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
  }

  private placeDesc(opcion) {
    this.recetaCabecera = [];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fhinicio: null, fhfin: null, fiTipo: null };
  }

  private pageEvent($event, _ngForm: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarProductoMasRecetado(_ngForm);
  }

  private buscarProductoMasRecetado(_ngForm: any, numPagina?: number) {
    if (isInvalid(_ngForm)) {
      return;
    }

    this.recetaCabecera = [];
    this.recetaDetalle = [];
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.fhinicio = ((this.fhinicio).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusqueda.fhfin = ((this.fhfin).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });
    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this.paramsBusqueda.fiTipo = this.flgMedicDisp;
    this._reporteFarmaciaService.getProductosMasRecetados(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.recetaDetalle = data.recetaDetalleList;
          this.dataSource = new MatTableDataSource(this.recetaDetalle);
          this.longitud = this.recetaDetalle[0].nuTotalReg;
          if (this.paginator) {
            this.paginator._pageIndex = (numPagina) ? numPagina - 1 : this.paginator._pageIndex;
          }
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => {
          console.log(err);
        });
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.idAlmacen = this.idAlmacen;
      this.parametros.descripcionAlmacen = this.descripAlmacen;
      this.parametros.fhinicio = this.paramsBusqueda.fhinicio;
      this.parametros.fhfin = this.paramsBusqueda.fhfin;
      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
      if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
        this.parametros.noTipo = "Producto Farmacéutico";
      } else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
        this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.imprimirReporteProductosMasRecetadosSP(this.parametros)
        .toPromise().then(data => {
          if (data.estado == 1) {
            if (tipoFile == 2) {
              this.pdf = "data:application/pdf;base64," + data.imprimeFile;
              this.pruebitaModal(this.pdf);
            }
            else {
              this._reporteService.generar(null, data.imprimeFile, tipoFile);
            }
          } else {
            this.toastr.error(data.mensaje, "No se econtaron medicamentos en las fechas");
          }
          resolve(data.imprimeFile);
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
        err => this.toastr.error(err);
      () => this.toastr.success('Request Complete');
    });
    return promise;
  }

  public imprimePDF_EXCEL(tipoFile) {
    if (this.recetaDetalle[0] != null && this.recetaDetalle[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.info("No se encontraron recetas en dichas fechas");
    }
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
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
