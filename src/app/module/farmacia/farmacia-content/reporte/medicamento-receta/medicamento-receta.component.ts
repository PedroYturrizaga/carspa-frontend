import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log } from 'util';
import { element } from 'protractor';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { MantenimientoAnaquelService } from '../../../services/mantenimiento-anaquel.service';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatDatepicker, MatPaginatorIntl } from '@angular/material';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-medicamento-receta',
  templateUrl: './medicamento-receta.component.html',
  styleUrls: ['./medicamento-receta.component.scss']
})
export class MedicamentoRecetaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  private pdf: String;
  private idAlmacen;
  private descripAlmacen;
  private gruposMedicamentos: any[];
  private productoDescripcion: String;
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null };
  private medicDisp: any[] = [];
  private paramsBusqueda = { idAlmacen: null, feIni: null, feFin: null, fiTipo: null, idMedicamento: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private filteredDispMedi: any[] = [];
  private receCab: any = [];
  private feIni: Date = null;
  private feFin: Date = null;
  private recetaDetalle;
  private parametros = { idAlmacen: null, feIni: null, feFin: null, fiTipo: null, idMedicamento: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionMedicamento: null };
  private descripAutoComplete: any = "";
  private flgMedicDisp: any;

  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _router: Router,
    private _route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
    { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.parametrosMD.idAlmacen = this.idAlmacen;
    this.parametros.idAlmacen = this.idAlmacen;
    this.parametros.descripcionAlmacen = this.descripAlmacen;
    this.flgMedicDisp = 'M';
    this.descripAutoComplete = this.gruposMedicamentos[0].valor;

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  private _filter(medicDispMedicProdSanit: any, val: string) {
    const filterValue = val.toLowerCase();
    return medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }

  ngOnInit() {
  }

  private placeDesc(opcion, _ngForm: any) {
    this.productoDescripcion = "";
    this.receCab = [];
    this.medicDisp = [];
    this.filteredDispMedi = [];
    this.descripAutoComplete = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, feIni: null, feFin: null, fiTipo: null, idMedicamento: null };
  }

  private getMedicamentoDispositivos(descripMedicDispProd) {
    this.parametrosMD.descripcionMedicDispProdSanid = descripMedicDispProd;
    this._mantenimientoAnaquelService.getMedicamentoDispositivo(this.parametrosMD)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDisp = data.medicamentoDispMedicoProdSanitarioList;
          this.filteredDispMedi = this.medicDisp.filter(obj => obj.fiTipo === this.flgMedicDisp);
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

  private buscarMedicDispProdDescripcion(descripMedicDispProd) {
    this.paramsBusqueda.idMedicamento = null;
    this.paramsBusqueda.fiTipo = null;
    this.parametros.descripcionMedicamento = null;
    if (descripMedicDispProd.length > 1) {
      this.getMedicamentoDispositivos(descripMedicDispProd);
    }
    else {
      this.filteredDispMedi = [];
    }
  }

  private seleccionaMedicamento(medicamentoDisp) {
    this.paramsBusqueda.idMedicamento = medicamentoDisp.idMedicamento;
    this.paramsBusqueda.fiTipo = medicamentoDisp.fiTipo;
    this.parametros.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento;
  }

  private pageEvent($event: any, _ngForm: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarRecetaxMedicamento(_ngForm);
  }

  private buscarRecetaxMedicamento(_ngForm: any, numPagina?: number) {
    if (isInvalid(_ngForm)) {
      return;
    }

    if (this.paramsBusqueda.idMedicamento == null || this.paramsBusqueda.idMedicamento == undefined || this.productoDescripcion == "") {
      if (this.flgMedicDisp == 'M') {
        this.toastr.warning('Debe ingresar Medicamento');
      } else if (this.flgMedicDisp == 'D') {
        this.toastr.warning('Debe ingresar Dispositivo médico');
      }
      this.paramsBusqueda.idMedicamento = null;
      this.productoDescripcion = "";
      this.receCab = [];
      return;
    }

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.feIni = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusqueda.feFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    let promise = new Promise((resolve, reject) => {

      this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

      Object.keys(this.paramsBusqueda).forEach(key => {
        this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
      });
      this.paramsBusqueda = {
        ...this.paramsBusqueda,
        ...this.pagination,
        nuRegisMostrar: this.pageSize
      };

      this._reporteFarmaciaService.getMedicamentosxReceta(this.paramsBusqueda)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.receCab = data.recetaCabeceraList;
            console.log(this.receCab)
            this.recetaDetalle = data.recetaCabecera;
            this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
          }
          else {
            this.toastr.error(data.mensaje, "No se encontraron las recetas en dichas fechas");
            this.receCab = [];
          }
          resolve(data.imprimeFile);
          if (this.receCab.length > 0) {
            this.pagination.nuRegisMostrar = this.receCab[0].recetaDetalleList[0].medicamento.nuTotalReg;
            if (this.matPag) {
              this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
            }
          }
          console.log(this.matPag)
          this.medicDisp = [];
        },
          err => { console.log(err) }
        );
    });
    return promise;
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.feIni = this.paramsBusqueda.feIni;
      this.parametros.feFin = this.paramsBusqueda.feFin;
      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
      if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
        this.parametros.noTipo = "Producto Farmacéutico";
      }
      else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
        this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.imprimirReporteMedicamentos_Receta(this.parametros).toPromise().then(data => {
        if (data.estado == 1) {
          if (tipoFile == 2) {
            this.pdf = "data:application/pdf;base64," + data.imprimeFile;
            this.pruebitaModal(this.pdf);
          }
          else {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos en dicha fecha");
        }
        resolve(data.imprimeFile);
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    });
    return promise;
  }

  private imprimePDF_EXCEL(tipoFile) {
    if (this.receCab[0] != null && this.receCab[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.warning("Ingrese todos los campos");
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
