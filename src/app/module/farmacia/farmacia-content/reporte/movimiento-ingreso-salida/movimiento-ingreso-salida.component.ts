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
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-movimiento-ingreso-salida',
  templateUrl: './movimiento-ingreso-salida.component.html',
  styleUrls: ['./movimiento-ingreso-salida.component.scss']
})
export class MovimientoIngresoSalidaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatPaginator) matPag2: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatSort) matSort2: MatSort;

  private idAlmacen;
  private descripAlmacen;
  private productoDescripcion: String = '';
  private gruposMedicamentos: any[];
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null };
  private medicDisp: any[] = [];
  private position = 'above';
  private paramsBusqueda = { idAlmacen: null, fiTipo: null, idMedicamento: null, nuSalida: null, feIni: null, feFin: null };
  private pageSize: number;
  private pagination: any;
  private paramsBusquedaNC = { idAlmacen: null, fiTipo: null, idMedicamento: null, nuSalida: null, feIni: null, feFin: null };
  private pageSizeNC: number;
  private paginationNC: any;
  private flgMedicDisp: any;
  private descripAutoComplete: any = "";
  private filteredDispMedi: any[] = [];
  private parametrosNC_Impresion = { idAlmacen: null, nuSalida: null, descripcionAlmacen: null, descripcionNuSalida: null, noTipo: null, descripcionMedicamento: null, tipoFile: null, feIni: null, feFin: null, nuPagina: null, nuRegisMostrar: null };
  private comprFarmNCList: any = [];
  private movIngMedList: any = [];
  private parametros = { idAlmacen: null, fiTipo: null, idMedicamento: null, nuSalida: null, feIni: null, feFin: null, tipoFile: null, descripcionAlmacen: null, descripcionNuSalida: null, noTipo: null, descripcionMedicamento: null, descripcionIni: null, descripcionFin: null };
  private feIni: Date = null;
  private feFin: Date = null;
  private date: Date = new Date();
  private movIngMedDataSource: MatTableDataSource<any>;
  private displayedSizes: number[];
  private displayedSizesNC: number[];
  dataSource2 = new MatTableDataSource();
  private displayedColumnsMI = ['pecosa', 'fecha', 'dci', 'marca', 'nombreUnidad', 'lote', 'cantidad', 'fechaVencimiento', 'precioUnitario'];
  //private displayedColumnsMI = ['codigo', 'pecosa', 'fecha', 'dci', 'marca', 'nombreUnidad', 'lote', 'cantidad', 'fechaVencimiento', 'precioUnitario'];
  private pdf: String;

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

    this.parametros.idAlmacen = this.idAlmacen;
    this.paramsBusquedaNC.idAlmacen = this.idAlmacen;
    this.parametrosMD.idAlmacen = this.idAlmacen;
    this.parametrosNC_Impresion.idAlmacen = this.idAlmacen;
    this.flgMedicDisp = 'M';
    this.descripAutoComplete = this.gruposMedicamentos[0].valor;

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];

    this.paginationNC = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizesNC = [5, 10, 25, 100];
    this.pageSizeNC = this.displayedSizesNC[0];
  }

  ngOnInit() {
  }

  private _filter(medicDispMedicProdSanit: any, val: string) {
    const filterValue = val.toLowerCase();
    return medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }

  private placeDesc(opcion, _ngForm: any) {
    this.productoDescripcion = "";
    this.paramsBusquedaNC.nuSalida = null;
    this.filteredDispMedi = [];
    this.movIngMedList = [];
    this.comprFarmNCList = [];
    this.descripAutoComplete = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fiTipo: null, idMedicamento: null, nuSalida: null, feIni: null, feFin: null };
    this.paramsBusquedaNC = { idAlmacen: this.idAlmacen, idMedicamento: null, nuSalida: null, fiTipo: null, feIni: null, feFin: null };
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
    if (descripMedicDispProd.length > 1) {
      this.getMedicamentoDispositivos(descripMedicDispProd);
    }
    else {
      this.filteredDispMedi = [];
      this.paramsBusqueda.idMedicamento = null;
    }
  }

  private seleccionaMedicamento(medicamentoDisp) {
    this.paramsBusqueda.idMedicamento = medicamentoDisp.idMedicamento;
    this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
    this.paramsBusqueda.fiTipo = medicamentoDisp.fiTipo;
    this.parametros.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento;
  }

  private pageEvent(event: any) {
    this.pagination.nuPagina = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.buscarIngMedicamentoxSalida();
  }

  private buscarIngMedicamentoxSalidaAux() {
    return this.buscarIngMedicamentoxSalida(1);
  }

  private buscarIngMedicamentoxSalida(numPagina?: number) {

    if (this.productoDescripcion == '' || this.productoDescripcion == null) {
      this.paramsBusqueda.idMedicamento = null;
    }

    if ((this.productoDescripcion != null || this.productoDescripcion != '' || this.productoDescripcion != undefined) && this.paramsBusqueda.idMedicamento == null) {
      if (!(this.productoDescripcion == '')) {
        this.toastr.warning("Ingresar un medicamento válido");
        this.productoDescripcion = '';
        this.movIngMedList = [];
        return;
      }
    }

    if (this.paramsBusqueda.nuSalida == '') {
      this.paramsBusqueda.nuSalida = null;
    }

    if (this.feIni != null && this.feFin != null) {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.paramsBusqueda.feIni = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
      this.paramsBusqueda.feFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    }

    if (this.paramsBusqueda.feIni == null || this.paramsBusqueda.feIni == "" || this.paramsBusqueda.feIni == undefined) {
      this.paramsBusqueda.feIni = null;
    }
    if (this.paramsBusqueda.feFin == null || this.paramsBusqueda.feFin == "" || this.paramsBusqueda.feFin == undefined) {
      this.paramsBusqueda.feFin = null;
    }

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
    this.paramsBusqueda.fiTipo = this.flgMedicDisp;
    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._reporteFarmaciaService.getMovimientoIngresoMedicamento_salida(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.movIngMedList = data.movimientoIngresoMedicamentoporSalidaList;

        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos");
          this.movIngMedList = [];
          this.paramsBusqueda.feIni = "";
          this.paramsBusqueda.feFin = "";
        }
      },
      err => { console.error(err) },
      () => {
        if (this.movIngMedList !== null && this.movIngMedList.length > 0) {
          this.pagination.nuRegisMostrar = this.movIngMedList[0].nuTotalReg;
          this.movIngMedDataSource = new MatTableDataSource(this.movIngMedList);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.movIngMedDataSource.sort = this.matSort;
        }
      });
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.descripcionAlmacen = this.descripAlmacen;

      this.parametros.feIni = this.paramsBusqueda.feIni;
      if (this.parametros.feIni == "" || this.parametros.feIni == null || this.parametros.feIni == undefined) {
        this.parametros.descripcionIni = "--";
      } else {
        this.parametros.descripcionIni = this.paramsBusqueda.feIni;
      }

      this.parametros.feFin = this.paramsBusqueda.feFin;
      if (this.parametros.feFin == "" || this.parametros.feFin == null || this.parametros.feFin == undefined) {
        this.parametros.descripcionFin = "--";
      } else {
        this.parametros.descripcionFin = this.paramsBusqueda.feFin;
      }

      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
      this.parametros.nuSalida = this.paramsBusqueda.nuSalida;
      if (this.parametros.nuSalida == null || this.parametros.nuSalida == undefined || this.parametros.nuSalida == "") {
        this.parametros.descripcionNuSalida = "--";
      } else {
        this.parametros.descripcionNuSalida = this.parametros.nuSalida;
      }
      this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
      if (this.parametros.idMedicamento == null || this.parametros.idMedicamento == undefined) {
        this.parametros.descripcionMedicamento = "--";
      }
      if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
        this.parametros.noTipo = "Producto Farmacéutico";
      }
      else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
        this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      this.parametros.tipoFile = tipoFile;

      console.log(this.parametros);
      this._reporteFarmaciaService.imprimirReporteMovimientoIngresomedicamento_salida(this.parametros).toPromise().then(data => {
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
    if (this.movIngMedList[0] != null && this.movIngMedList[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.warning("Busque algún nuevo movimiento");
    }
  }

  private pageEventNC(event: any) {
    this.paginationNC.nuPagina = event.pageIndex + 1;
    this.pageSizeNC = event.pageSize;
    this.listarMovimientoporNumeroComprobante();
  }

  private listarMovimientoporNumeroComprobante(numPaginaNC?: number) {
    this.paramsBusquedaNC.fiTipo = null;
    this.paramsBusquedaNC.idMedicamento = null;

    if (this.paramsBusquedaNC.nuSalida == '') {
      this.paramsBusquedaNC.nuSalida = null;
    }

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusquedaNC.feIni = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusquedaNC.feFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.paginationNC.nuPagina = (numPaginaNC) ? numPaginaNC : this.paginationNC.nuPagina;

    Object.keys(this.paramsBusquedaNC).forEach(key => {
      this.paramsBusquedaNC[key] = (this.paramsBusquedaNC[key] === '') ? null : this.paramsBusquedaNC[key];
    });

    this.paramsBusquedaNC = {
      ...this.paramsBusquedaNC,
      ...this.paginationNC,
      nuRegisMostrar: this.pageSizeNC
    };
    this._reporteFarmaciaService.getMovimientoIngresoMedicamento_salida(this.paramsBusquedaNC)
      .subscribe(data => {
        if (data.estado == 1) {
          this.comprFarmNCList = data.movimientoIngresoMedicamentoList;
          if (this.comprFarmNCList.length > 0) {
            this.paginationNC.nuRegisMostrar = this.comprFarmNCList[0].nuTotalReg;
            this.dataSource2 = new MatTableDataSource(this.comprFarmNCList);
            if (this.matPag2) {
              this.matPag2._pageIndex = (numPaginaNC) ? numPaginaNC - 1 : this.matPag2._pageIndex;
            }
            this.dataSource2.sort = this.matSort2;
          }
        }
        else {
          this.comprFarmNCList = [];
          this.toastr.warning("Lista vacía");
          this.paramsBusquedaNC.nuSalida = "";
        }
        return true;
      },
      err => { console.error(err) },
      () => {
      });
  }

  // private imprimirPromiseNC(tipoFile) {
  //   let promise = new Promise((resolve, reject) => {
  //     this.listarMovimientoporNumeroComprobante(1);
  //     this.parametrosNC_Impresion.descripcionAlmacen = this.descripAlmacen;
  //     this.parametrosNC_Impresion.feIni = this.paramsBusquedaNC.feIni;
  //     this.parametrosNC_Impresion.feFin = this.paramsBusquedaNC.feFin;
  //     this.parametrosNC_Impresion.nuSalida = this.paramsBusquedaNC.nuSalida;
  //     this.parametrosNC_Impresion.noTipo = "Todos los grupos";
  //     this.parametrosNC_Impresion.descripcionMedicamento = "Todos los medicamento";
  //     if (this.parametrosNC_Impresion.nuSalida == null || this.parametrosNC_Impresion.nuSalida == '') {
  //       this.parametrosNC_Impresion.descripcionDocumento = "--";
  //     } else {
  //       this.parametrosNC_Impresion.descripcionDocumento = this.parametrosNC_Impresion.numeroDocumento;
  //     }
  //     this.parametrosNC_Impresion.tipoFile = tipoFile;
  //     this._reporteFarmaciaService.imprimirReporteMovimientoIngresomedicamento_salida(this.parametrosNC_Impresion).toPromise().then(data => {
  //       if (data.estado == 1) {
  //         if (this.comprFarmNCList.length > 0) {
  //           if (tipoFile == 2) {
  //             this.pdf = "data:application/pdf;base64," + data.imprimeFile;
  //             this.pruebitaModal(this.pdf);
  //           }
  //           else {
  //             this._reporteService.generar(null, data.imprimeFile, tipoFile);
  //           }
  //         }
  //       }
  //       else {
  //         this.toastr.error(data.mensaje, "No se encontraron movimientos en dicha fecha");
  //       }
  //       resolve(data.imprimeFile);
  //     },
  //       error => {
  //         this.toastr.error(error);
  //         return Observable.throw(error);
  //       }),
  //       err => this.toastr.error(err),
  //       () => this.toastr.success('Request Complete');
  //   });
  //   return promise;
  // }

  // private imprimeNC_PDF_EXCEL(tipoFile) {
  //   if (this.comprFarmNCList[0] != null && this.comprFarmNCList[0] != undefined) {
  //     this.imprimirPromiseNC(tipoFile);
  //   }
  //   else {
  //     this.toastr.warning("Busque alguna nueva pecosa");
  //   }
  // }

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