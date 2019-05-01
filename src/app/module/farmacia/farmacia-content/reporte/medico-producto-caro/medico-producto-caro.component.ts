import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ReporteFarmaciaService } from '../../../services/reporte-farmacia.service';
import { MantenimientoAnaquelService } from '../../../services/mantenimiento-anaquel.service';
import { InventarioService } from '../../../services/inventario.service';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log } from 'util';
import { element } from 'protractor';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { VisualizarMedicoProductoCaroComponent } from './visualizar-medico-producto-caro/visualizar-medico-producto-caro.component';

@Component({
  selector: 'app-medico-producto-caro',
  templateUrl: './medico-producto-caro.component.html',
  styleUrls: ['./medico-producto-caro.component.scss']
})
export class MedicoProductoCaroComponent implements OnInit {

  private idAlmacen;
  private tipoAlmacen;
  private descripAlmacen;
  private _params = { idAlmacen: null, descripcionPersonal: null };
  private personalDescripcion: String = "";
  private gruposMedicamentos: any[];
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null };
  private medicDisp: any[] = [];
  private paramsBusqueda = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private receCab: any = [];
  private recetaDetalle;
  private parametros = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionMedicamento: null, descripcionPersonal: null };
  private medicos: any = [];
  private _parametros = { idAlmacen: null };
  private descripAutoCompleteMedicamento: any = "";
  private flgMedicDisp: any;
  private filteredDispMedi: any[] = [];
  private fhinicio: Date = null;
  private fhfin: Date = null;
  private productoDescripcion: String = "";
  private pdf: String;
  displayedColumnsComrobantes = ['productoFarma', 'medico', 'freceta', 'unidadMedida', 'cantidad', 'precio', 'Accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private _inventarioService: InventarioService,
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
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    this._params.idAlmacen = this.idAlmacen;
    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.parametrosMD.idAlmacen = this.idAlmacen;
    this._parametros.idAlmacen = this.idAlmacen;
    this.flgMedicDisp = 'M';
    this.descripAutoCompleteMedicamento = this.gruposMedicamentos[0].valor;
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
  }

  private placeDesc(opcion) {
    this.productoDescripcion = "";
    this.personalDescripcion = "";
    this.filteredDispMedi = [];
    this.receCab = [];
    this.descripAutoCompleteMedicamento = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null };
  }

  private _filter(medicDispMedicProdSanit: any, val: string) {
    const filterValue = val.toLowerCase();
    return medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }

  private getMedicamentoDispositivos(descripMedicDisp) {
    this.parametrosMD.descripcionMedicDispProdSanid = descripMedicDisp;
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
    }
  }

  private seleccionaMedicamento(medicamentoDisp) {
    this.paramsBusqueda.idMedicamento = medicamentoDisp.idMedicamento;
    this.paramsBusqueda.fiTipo = medicamentoDisp.fiTipo;
    this.parametros.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento;
  }

  // private getMedicos(descripPersonal) {
  //   this._params.descripcionPersonal = descripPersonal;
  //   this._inventarioService.getPersonalByAlmacen(this._params)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.medicos = data.personalList;
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       error => {
  //         this.toastr.error(error);
  //         return Observable.throw(error);
  //       }),
  //     err => this.toastr.error(err),
  //     () => this.toastr.success('Request Complete');
  // }

  private getDoctorbyAlmacen(descripPersonal) {
    this._params.descripcionPersonal = descripPersonal;
    this._inventarioService.getDoctorByAlmacen(this._params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicos = data.personalList;
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
  // private buscarMedicoDescripcion(descripMedicos) {
  //   if (descripMedicos.length > 1) {
  //     this.getMedicos(descripMedicos);
  //   }
  //   else {
  //     this.parametros.idPersonal = null;
  //     this.medicos = [];
  //   } 

  // }
  private buscarDoctorDescripciondescripMedicos(descripPersonal) {

    if (descripPersonal.length > 1) {
      this.getDoctorbyAlmacen(descripPersonal);
    }
    else {
      this.parametros.idPersonal = null;
      this.medicos = [];
    }

  }

  private seleccionaMedico(medico) {
    console.log(medico);
    this.paramsBusqueda.idPersonal = medico.idPersonal;
    this.parametros.descripcionPersonal = medico.nombrePersonal + " " + medico.apellidoPaternoPersonal + " " + medico.apellidoMaternoPersonal;
  }

  private pageEvent($event: any, _ngForm: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarMedicoxProductoCaro(_ngForm);
  }

  private buscarMedicoxProductoCaro(_ngForm: any) {
    if (isInvalid(_ngForm)) {
      return;
    }

    if (this.productoDescripcion == "" || this.productoDescripcion == null) {
      this.paramsBusqueda.idMedicamento = null;
    }

    if (this.personalDescripcion == "" || this.personalDescripcion == null) {
      this.paramsBusqueda.idPersonal = null;
    }

    // if (this.paramsBusqueda.idMedicamento == null || this.paramsBusqueda.idMedicamento == undefined || this.productoDescripcion == "") {
    //   if (this.flgMedicDisp == 'M') {
    //     this.toastr.warning('Debe seleccionar medicamento');
    //   } else if (this.flgMedicDisp == 'D') {
    //     this.toastr.warning('Debe seleccionar dispositivo médico');
    //   }
    //   this.paramsBusqueda.idMedicamento = null;
    //   this.personalDescripcion = "";
    //   this.productoDescripcion = "";
    //   this.receCab = [];
    //   return;
    // }

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.paramsBusqueda.fhinicio = ((this.fhinicio).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusqueda.fhfin = ((this.fhfin).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.paramsBusqueda.fiTipo=this.flgMedicDisp;

    let promise = new Promise((resolve, reject) => {
      this.paramsBusqueda.idAlmacen = this.idAlmacen;

      Object.keys(this.paramsBusqueda).forEach(key => {
        this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
      });
      this.paramsBusqueda = {
        ...this.paramsBusqueda,
        ...this.pagination,
        nuRegisMostrar: this.pageSize
      };
      console.log(this.paramsBusqueda)

      this._reporteFarmaciaService.getMedicoxProductoCaro(this.paramsBusqueda)
        .toPromise().then(data => {
          console.log(data)
          if (data.estado == 1) {
            this.receCab = data.recetaDetalleList;
           // this.recetaDetalle = data.recetaCabecera;
            console.log(this.receCab)
           // console.log(this.recetaDetalle)
            if (this.receCab.length > 0) {
              this.pagination.nuRegisMostrar = this.receCab[0].nuTotalReg;
            }
            // this.dataSource = new MatTableDataSource(this.recetaDetalle);
            // this.dataSource.paginator = this.paginator;
          }
          else {
            this.toastr.error(data.mensaje, "No se encontraron las recetas en dichas fechas");
            this.productoDescripcion = "";
            this.personalDescripcion = "";
            this.receCab = [];
          }
          console.log(this.receCab)
          resolve(data.imprimeFile);
        },
        err => { console.log(err) });
    });

    return promise;
  }

  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.parametros.idAlmacen = this.idAlmacen;
      this.parametros.descripcionAlmacen = this.descripAlmacen;
      this.parametros.fhinicio = this.paramsBusqueda.fhinicio;
      this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
      this.parametros.fhfin = this.paramsBusqueda.fhfin;
      this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
      this.parametros.idPersonal = this.paramsBusqueda.idPersonal;
      if (this.personalDescripcion == "" || this.paramsBusqueda.idPersonal == null || this.parametros.idPersonal == undefined || this.parametros.idPersonal == null || this.paramsBusqueda.idPersonal == null) {
        this.parametros.descripcionPersonal = "-";
      }
      if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
        this.parametros.noTipo = "Producto Farmacéutico";
      } else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
        this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      this.parametros.tipoFile = tipoFile;
      this._reporteFarmaciaService.getMedicoxProductoCaroSP(this.parametros)
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
            this.toastr.error(data.mensaje, "No se econtaron productos en las fechas");
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
    if (this.receCab[0] != null && this.receCab[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.info("La tabla está vacía");
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
      maxHeight: '80%',
      height: '80%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.mystring = mystring;
    dialogRef.afterClosed().subscribe(result => {
    }); 
  }

  mostrarModalVisualizarMedicoProductoCaro(item) {
    console.log(item);
    console.log(this.paramsBusqueda);
    const dialogRef = this.dialog.open(VisualizarMedicoProductoCaroComponent, {
      autoFocus: false,
      width: '97%',
      maxWidth: '97%',
      maxHeight: '80%',
      height: '80%',
      disableClose: false
    });
    dialogRef.componentInstance.item = item;
    dialogRef.componentInstance.paramsBusqueda = this.paramsBusqueda;
    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
          this.buscarMedicoxProductoCaro(this.paramsBusqueda);
        

      }
    });
  }
}