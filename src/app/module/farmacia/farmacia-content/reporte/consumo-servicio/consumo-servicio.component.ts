import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log, isUndefined } from 'util';
import { element } from 'protractor';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { EspecialidadService } from '../../../../../shared/services/especialidad.service';
import { resolve } from 'dns';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-consumo-servicio',
  templateUrl: './consumo-servicio.component.html',
  styleUrls: ['./consumo-servicio.component.scss']
})
export class ConsumoServicioComponent implements OnInit {

  private idAlmacen;
  private idArea;
  private tipoAlmacen;
  private descripAlmacen;
  private gruposMedicamentos: any[];
  private medicamentos: any = [];
  private paramsBusqueda = { idAlmacen: null, idEspecialidad: null, fhinicio: null, fhfin: null, fiTipo: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private especialidades: any = [];
  private parametros = { idAlmacen: null, idEspecialidad: null, fhinicio: null, fhfin: null, fiTipo: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionEspecialidad: null };
  private fhinicio: Date = null;
  private fhfin: Date = null;
  private flgMedicDisp: any;
  private _parametros = { idAlmacen: null, idArea: null };
  private pdf: String;
  displayedColumns = ['codigo', 'dciMedicDisp', 'descripcion', 'cantidad'];
  dataSource = new MatTableDataSource();

  constructor(private _reporteFarmaciaService: ReporteFarmaciaService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _especialidadService: EspecialidadService,
    private _router: Router,
    private _route: ActivatedRoute,
    private dialog: MatDialog) {
    this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
    { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.idArea = params["idArea"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this._parametros.idAlmacen = this.idAlmacen;
    this._parametros.idArea = this.idArea;
    this.flgMedicDisp = 'M';
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

   ngOnInit() {
     this.getEspecialidades();
   }

  private placeDesc(opcion) {
    this.medicamentos = [];
    this.parametros = { idAlmacen: this.idAlmacen, idEspecialidad: null, fhinicio: null, fhfin: null, fiTipo: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionEspecialidad: null };
  }

  private getEspecialidades() {
    this._reporteFarmaciaService.obtenerEspecialidadesxalm(this._parametros)
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidades = data.especialidadList;
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

  private seleccionarEspecialidad(descripEspecialidad) {
    this.paramsBusqueda.idEspecialidad = descripEspecialidad.idEspecialidad;
    this.parametros.idEspecialidad = this.paramsBusqueda.idEspecialidad;
    this.parametros.descripcionEspecialidad = descripEspecialidad.descripcionEspecialidad;
  }

  private pageEvent($event: any, _ngForm: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarConsumoServicio(_ngForm);
  }

  private buscarConsumoServicio(_ngForm: any) {
    this.paramsBusqueda.fiTipo = this.flgMedicDisp;
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.fhinicio = ((this.fhinicio).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusqueda.fhfin = ((this.fhfin).toLocaleDateString('es-PE', options)).split('/').join('-');
    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._reporteFarmaciaService.getMedicamentoxServicio(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicamentos = data.medicamentoList;
          this.dataSource = new MatTableDataSource(this.medicamentos);
          if (this.medicamentos.length > 0) {
            this.pagination.nuRegisMostrar = this.medicamentos[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron los consumos de esa especialidad");
          this.medicamentos = [];
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
      this.parametros.idEspecialidad = this.paramsBusqueda.idEspecialidad;
      this.parametros.fhinicio = this.paramsBusqueda.fhinicio;
      this.parametros.fhfin = this.paramsBusqueda.fhfin;
      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
      if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
        this.parametros.noTipo = "Producto Farmacéutico";
      } else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
        this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.imprimirMedicamentoxServicioSP(this.parametros)
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
            this.toastr.error(data.mensaje, "No se econtaron consumos en las fechas");
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
    if (this.medicamentos[0] != null && this.medicamentos[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.info("No se encontraron consumos en dichas fechas");
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