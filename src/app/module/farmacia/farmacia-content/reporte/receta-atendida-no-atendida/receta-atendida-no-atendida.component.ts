import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log, isUndefined } from 'util';
import { element } from 'protractor';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { resolve } from 'dns';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-receta-atendida-no-atendida',
  templateUrl: './receta-atendida-no-atendida.component.html',
  styleUrls: ['./receta-atendida-no-atendida.component.scss']
})
export class RecetaAtendidaNoAtendidaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  dataSource = new MatTableDataSource();
  
  displayedRecetaAtendidaNoAtendida=['fecha','numRecetaT','numItemT','numUnidadT','numTitularT','numFamiliarT','numRecetaN','numItemN','numUnidadN','numTitularN','numFamiliarN'];
  private idAlmacen;
  private tipoAlmacen;
  private descripAlmacen;
  private recetaCabecera: any = [];
  private paramsBusqueda = { idAlmacen: null, fhinicio: null, fhfin: null };
  private tvalid: Number = 0;
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private recetaDetalle;
  private fhinicio: Date = null;
  private fhfin: Date = null;
  private parametros = { idAlmacen: null, fhinicio: null, fhfin: null, tipoFile: null, descripcionAlmacen: null };
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private longitud = 0;
  private globalVariable;

  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _router: Router,
    private _route: ActivatedRoute) {

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 20, 30, 40, 50];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
  }

  private placeDesc(opcion) {
    this.recetaCabecera = [];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fhinicio: null, fhfin: null };
  }

  private pageEvent($event) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarRecetaAtendidaNoAtendida();
  }

  private valor = false;
  private buscarRecetaAtendidaNoAtendida(numPagina?: number) {

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
    this._reporteFarmaciaService.getRecetasAtendidasNoAtendidas(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.recetaCabecera = data.recetaAtendidaNoAtendidaNewList;
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.recetaCabecera.length > 0) {
            this.valor = true;
            this.pagination.nuRegisMostrar = this.recetaCabecera[0].nuTotalReg;
          } 
        } else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos");
          this.recetaCabecera = [];
        }
        return true;
      },
      err => { console.error(err) },
      () => {
      });
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.idAlmacen = this.idAlmacen;
      this.parametros.descripcionAlmacen = this.descripAlmacen;
      this.parametros.fhinicio = this.paramsBusqueda.fhinicio;
      this.parametros.fhfin = this.paramsBusqueda.fhfin;
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.getRecetasAtendidasNoAtendidasSP(this.parametros)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          } else {
            this.toastr.error(data.mensaje, "No se encontraron recetas atendidas y no atendidas en las fechas seleccionadas");
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
    if (this.recetaCabecera[0] != null && this.recetaCabecera[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.info("No se encontraron recetas atendidas y no atendidas para dichas fechas");
    }
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
}