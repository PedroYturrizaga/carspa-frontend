import { ReporteService } from './../../../../../shared/services/reporte.service';
import { ModalPdfComponent } from '../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { InventarioService } from '../../../services/inventario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-regularizar-diario',
  templateUrl: './regularizar-diario.component.html',
  styleUrls: ['./regularizar-diario.component.scss']
})
export class RegularizarDiarioComponent implements OnInit {
  // @Input() idInventario;
  private idInventario = null;


  @Input() varAnaquelFiltrar;
  private idAlmacen = null;
  private tipoAlmacen = null;
  private descripAlmacen = null;
  private cabecera = { nombreComercial: null, usuarioIns: null, descripcionTurno: null, feCierre: null, fhMod: null, numeroInventario: null }
  private params = { idInventario: null, anaqueL: null, feInicio: null, feFin: null/*, nuPagina: null, nuRegisMostrar: null*/ };
  private inventarioList: any[] = [];
  private inventarioDetalleList: any[] = [];
  private arrayFecha: any;
  private date = new Date();
  private DocCompra = null;
  private myControlador: boolean
  private varFiltrarAnaquel = 0;
  private cabeceraJSON: any[] = [];
  private request = { idInventario: null, tipoFile: null };
  private requestImpresion = { idInventario: null, tipoFile: null };
  displayedColumnsIventarioDiferencia = ['Item', 'Codigo', 'ProducFarmaDisp', 'Marca', 'Presentacion', 'Unidad de Medida', 'Diferencia'];
  dataSource = new MatTableDataSource();

  constructor(
    private _inventarioService: InventarioService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    private _reporteService: ReporteService,
    private dialog: MatDialog
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
  }

  ngOnInit() {
    this.obtenerCabecera();
    this.getIventarioDiferenciaByAlmacenPromise().then((idInventario) => {
      if (idInventario == null || idInventario == undefined || idInventario == "") {
        this.toastr.error("No hay inventario para Regularizar");
      }
      this.idInventario = idInventario;
      this.getDetalleIventarioDiferenciaByInventario(idInventario);

    });
  }

  private obtenerCabecera() {
  

    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      this._inventarioService.getCabeceraInventario(this.params)
        .subscribe(data => {
          console.log("mi listas al ", data.listarCabeceraInventario)
          if (data.estado == 1) {
            this.cabeceraJSON = data.listarCabeceraInventario;
            console.log(this.cabeceraJSON);
            this.cabecera.nombreComercial = data.listarCabeceraInventario[0].nombreComercial;
            this.cabecera.descripcionTurno = data.listarCabeceraInventario[0].descripcionTurno;
            this.cabecera.feCierre = data.listarCabeceraInventario[0].feCierre;
            this.cabecera.fhMod = data.listarCabeceraInventario[0].fhMod;
            this.cabecera.usuarioIns = data.listarCabeceraInventario[0].usuarioIns;
            this.cabecera.numeroInventario = data.listarCabeceraInventario[0].numeroInventario;

            console.log("turno de cabecera:" + this.cabeceraJSON[0].descripcionTurno)
            console.log("nombre Comercial de cabecera:" + this.cabeceraJSON[0].nombreComercial)
            console.log("feCierre Turno:" + this.cabeceraJSON[0].feCierre)
            console.log("fhMod Turno:" + this.cabeceraJSON[0].fhMod)
            console.log("Usuario Turno:" + this.cabeceraJSON[0].usuarioIns)
            console.log("Numero Inventario:" + this.cabeceraJSON[0].numeroInventario)
          }
        })
    }
  }



  private getIventarioDiferenciaByAlmacenPromise() {
    let promise = new Promise((resolve, reject) => {
      this._inventarioService.getInventarioDiferenciaByAlmacen(this.idAlmacen)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.inventarioList = data.inventarioList;
            console.log("mi this inventarioList es", this.inventarioList)
            console.log("mi data inventarioList es", data.inventarioList)
            console.log("posicion cero", this.inventarioList[0])
            this.arrayFecha = (data.inventarioList[0] ? data.inventarioList[0].feCierre : '-');
            this.arrayFecha = this.arrayFecha.split(" ");
          } else {
            this.toastr.error(data.mensaje);
          }
          resolve(data.inventarioList[0] ? data.inventarioList[0].idInventario : null);
        },
          err => {
            console.log(err);
          })
    })
    return promise
  }
  private getDetalleIventarioDiferenciaByInventario(idInventario) {
    if (idInventario != null && idInventario != undefined) {
      this._inventarioService.getDetalleInventarioDiferenciaByInventario(idInventario)
        .subscribe(data => {
          console.log(data)
          if (data.estado == 1) {
            this.inventarioDetalleList = data.inventarioList.inventarioDetalleList;
            this.dataSource = new MatTableDataSource(this.inventarioDetalleList);
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
  }

  private regularizarInventario() {
    // debugger;
    // let params = { inventario: { almacen: { idAlmacen: null }, comprobanteFarmacia: { numeroDocumentoIngreso: null, feIngreso: null }, inventarioDetalleList: [] } };
    // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // let dateActual: any = ((this.date).toLocaleDateString('es-PE', options)).split('/').join('-');
    // params.inventario.almacen.idAlmacen = this.idAlmacen;
    // params.inventario.comprobanteFarmacia.numeroDocumentoIngreso = this.DocCompra;
    // params.inventario.comprobanteFarmacia.feIngreso = dateActual;
    // if (params.inventario.comprobanteFarmacia.numeroDocumentoIngreso == null || params.inventario.comprobanteFarmacia.numeroDocumentoIngreso == "" || params.inventario.comprobanteFarmacia.numeroDocumentoIngreso == undefined) {
    //   this.toastr.warning("Debe ingresar un número de documento");
    //   return;
    // }
    // console.log(this.inventarioDetalleList)
    // for (let item of this.inventarioDetalleList) {
    //   let detalleList = { idInventarioDetalle: null, diferenciaCantidad: null, medicamentoLote: { idMedicamentoLote: null } };
    //   detalleList.diferenciaCantidad = item.diferenciaCantidad;
    //   detalleList.idInventarioDetalle = item.idInventarioDetalle;
    //  detalleList.medicamentoLote.idMedicamentoLote = item.medicLote.id;
    //   params.inventario.inventarioDetalleList.push(detalleList);
    // }
    // this._inventarioService.updateRegularizarInventario(params)
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       this.toastr.success(data.mensaje);
    //       this.imprimirInventarioCerrado(2);
    //     } else {
    //       this.toastr.error(data.mensaje);
    //     }
    //   },
    //     error => {
    //       this.toastr.error(error);
    //       return Observable.throw(error);
    //     }),
    //   err => this.toastr.error(err),
    //   () => this.toastr.success('Request Complete');

    let params = {
      idInventario: this.idInventario,
      numDocIngreso: this.DocCompra
    }
    console.log(params);

    this._inventarioService.regularizarInventario(params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          // this.imprimirInventarioCerrado(2);
          this.imprimirReporteRegularizarInventarioImpresion(2);
          //this.imprimirReporteRegularizarInventarioImpresion
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


  private pdf: String;
  private paramsImpresion = {
    idInventario: null,
    anaquel: null,
    nuPagina: null,
    nuRegisMostrar: null
  };

  private imprimirInventarioCerrado(tipoFile) {
    this.paramsImpresion = {
      idInventario: this.inventarioList[0].idInventario,
      anaquel: null,
      nuPagina: null,
      nuRegisMostrar: null
    }
    this._inventarioService.imprimirRegularizarDiario(this.paramsImpresion)
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
          // this.close();
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
  private imprimirReporteRegularizarInventario() {
    this.request.idInventario = this.idInventario;

    this.request.tipoFile = 2;
    this._inventarioService.imprimirReporteRegularizar(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data.listarCabeceraInventario);
          console.log(data.listInventario)
          this.toastr.success(data.mensaje);
        }
      })
  }

  private imprimirReporteRegularizarInventarioImpresion(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      // this.requestImpresion.idAperturaCaja=103;
      this.requestImpresion.idInventario = this.idInventario;
      this.requestImpresion.tipoFile = tipoFile;
      console.log(this.requestImpresion);
      this._inventarioService.imprimirReporteRegularizar(this.requestImpresion)
        .subscribe(data => {
          console.log(data);
          if (data.estado == 1) {
            if (tipoFile == 2) {
              this.pdf = "data:application/pdf;base64," + data.imprimeFile;
              this.pruebitaModal(this.pdf);
            }
            else {
              this._reporteService.generar(null, data.imprimeFile, tipoFile);
            }
            ///////////////
          } else {
            this.toastr.error(data.mensaje);
          }
        }, error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');

    });
  }
  // private imprimePDF(tipoFile) {
  //   this.imprimirReporteRegularizarInventarioImpresion(tipoFile);
  // }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
}
