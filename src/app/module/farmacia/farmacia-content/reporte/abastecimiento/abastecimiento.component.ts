import { json } from './../../../../../shared/helpers/custom-validators/ng4-validators/json/validator';
import { map } from 'rxjs/operators/map';
import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { MantenimientoAnaquelService } from '../../../services/mantenimiento-anaquel.service';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log } from 'util';
import { element } from 'protractor';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { cpus } from 'os';

@Component({
  selector: 'app-abastecimiento',
  templateUrl: './abastecimiento.component.html',
  styleUrls: ['./abastecimiento.component.scss']
})
export class AbastecimientoComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  private idAlmacen;
  private descripAlmacen;
  private gruposMedicamentos: any[];
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null };
  private medicDisp: any[] = [];
  private productoDescripcion: String = '';
  private paramsBusqueda = { idAlmacen: null, fiTipo: null, idMedicamento: null, feIni: null, feFin: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private flgMedicDisp: any;
  private filteredDispMedi: any[] = [];
  private descripAutoComplete: any = "";
  private almMedicList: any = [];
  private parametros = { idAlmacen: null, fiTipo: null, idMedicamento: null, tipoFile: null, feIni: null, feFin: null, descripcionAlmacen: null, noTipo: null, descripcionMedicamento: null };
  private position = 'above';
  private feIni: Date = null;
  private feFin: Date = null;

  dataSource = new MatTableDataSource();
  displayedColumnsA = ['codigo', 'dci', 'stock', 'valor'];
  private pdf: String;

  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
    { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });

    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.parametrosMD.idAlmacen = null;
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
    this.descripAutoComplete = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fiTipo: null, idMedicamento: null, feIni: null, feFin: null };
    this.almMedicList = [];
  }

  private getMedicamentoDispositivos(descripMedicDispProd) {
    this.parametrosMD.descripcionMedicDispProdSanid = descripMedicDispProd;
    this._mantenimientoAnaquelService.getMedicamentoDispositivo(this.parametrosMD)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDisp = data.medicamentoDispMedicoProdSanitarioList;
          // console.log(this.medicDisp);
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
    console.log(medicamentoDisp);
    this.paramsBusqueda.idMedicamento = medicamentoDisp.idMedicamento;
    this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
    this.paramsBusqueda.fiTipo = medicamentoDisp.fiTipo;
    this.parametros.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento;
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarAbastecimientoMedicamentos();
  }

  private JsonPrecio: any[] = [];

  private buscarAbastecimientoMedicamentos(numPagina?: number) {

    if (this.productoDescripcion == '' || this.productoDescripcion == null) {
      this.paramsBusqueda.idMedicamento = null;
    }

    if ((this.productoDescripcion != null || this.productoDescripcion != '' || this.productoDescripcion != undefined) && this.paramsBusqueda.idMedicamento == null) {
      if (!(this.productoDescripcion == '')) {
        this.toastr.warning("Ingresar un medicamento válido");
        this.productoDescripcion = '';
        this.almMedicList = [];
        return;
      }
    }

    this.paramsBusqueda.fiTipo = this.flgMedicDisp;

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    if (this.feIni != null && this.feFin != null) {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.paramsBusqueda.feIni = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
      this.paramsBusqueda.feFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    }

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.paramsBusqueda);
    this._reporteFarmaciaService.getAbastecimiento(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.almMedicList = data.almacenMedicamentoList;
          for (let x of this.almMedicList) {
            x['unidadPList'] = JSON.parse(x['jsonString']);
            x['stockUnidad'] = x['unidadPList'].reduce((_ant, _act) => { return _ant + _act['cantidad'] + ' ' + _act['nombreUnidad'] + ' / ' }, '');
            x['stockUnidad'] = x['stockUnidad'].substring(0, x['stockUnidad'].length - 2);
            x['sumaTotal'] = x['unidadPList'].reduce((_ant, _act) => { return _ant + (_act['cantidad'] * _act['precio']) }, 0);
          }
          this.dataSource = new MatTableDataSource(this.almMedicList);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.almMedicList.length > 0) {
            this.pagination.nuRegisMostrar = this.almMedicList[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos");
          this.almMedicList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {

          this.almMedicList.map(i => {
            this.JsonPrecio = JSON.parse(i.jsonString);
            this.JsonPrecio.map(j => {
              let x = j["cantidad"] * j["precio"];
            })
          });

        });
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
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
      this.parametros.feIni = this.paramsBusqueda.feIni;
      this.parametros.feFin = this.paramsBusqueda.feFin;
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.getAbastecimiento_Reporte(this.parametros).toPromise().then(data => {
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

  private imprimePDF_Excel(tipoFile) {
    if (this.almMedicList[0] != null && this.almMedicList[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.warning("Busque nuevos abastecimientos");
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