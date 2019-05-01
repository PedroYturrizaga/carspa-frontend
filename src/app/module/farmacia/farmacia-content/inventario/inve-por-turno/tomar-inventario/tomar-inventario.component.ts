import { ModalPdfComponent } from './../../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { ReporteService } from './../../../../../../shared/services/reporte.service';
import { ConfirmacionNotaEntradaComponent } from './../../../movimiento/nota-entrada/confirmacion-nota-entrada/confirmacion-nota-entrada.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { ToastsManager, Toast } from 'ng2-toastr';
import { InventarioService } from '../../../../services/inventario.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-tomar-inventario',
  templateUrl: './tomar-inventario.component.html',
  styleUrls: ['./tomar-inventario.component.scss']
})
export class TomarInventarioComponent implements OnInit {

  @Output() regresar = new EventEmitter<any>();
  @Input() idAlmacen;
  @Input() idInventario;
  @Input() varAnaquelFiltrar;
  displayedColumnsMedicsIventario = ['Codigo', 'ProducFarmaDisp', 'FormaFarmaTipoDisp',
    'Marca', 'Presentacion', 'UnidadDeMedida', 'Stock', 'ConteoFisico'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private cabecera = { nombreComercial: null, usuarioIns: null, descripcionTurno: null, feCierre: null, fhMod: null, numeroInventario: null }
  private params = { idInventario: null, anaqueL: null, feInicio: null, feFin: null/*, nuPagina: null, nuRegisMostrar: null*/ };
  private inventarioJSON: any[] = [];
  private paginator: any;
  private pageSize: number;
  private cabeceraJSON: any[] = [];
  private inventarioJSONFiltrado: any[] = [];
  private inventarioJSONDiferencia: any[] = [];
  private almacenMedicamentoList: any[] = [];
  private totalG: number = 0;
  private flgTotal: number = 0;
  private anaquel;
  private confirmacion = "";
  private showReporte = 1;
  private verificarClosed = true;
  private verificarRegularizarr = true;
  private titulo = "";
  private almacenMedicamentoList2: any[] = [];
  private filtro;
  private showCloseInve = 1;
  private showVerificar = 1;
  private pdf: String;
  private verBotonImprimirDiferencias = 0;
  private verBotonReporteInventario = 0;
  private _contCero: any = 0;
  private varCabeceraInv = 0;
  private varFiltrarAnaquel = 0;
  private requestImpresion = { idInventario: null, tipoFile: null };
  private request = { idInventario: null, tipoFile: null };
  private myControlador: boolean
  private tmr: any;
  private paramsValidar = { idMedicamento: null, idDispMedicoProdSanitario: null, cantidadContada: null, idUnidad: null }


  private displayedSizes: number[];

  _viewPag: boolean = true;
  constructor(
    private _inventarioService: InventarioService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private _reporteService: ReporteService
  ) {
    this.paginator = { nuPagina: 1, nuRegisMostrar: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
    // this.matPaginator.pageIndex = 0;
  }

  ngOnInit() {
    this.myControlador = this.varAnaquelFiltrar;
    this.titulo = "Tomar Inventario por Turno";
    this.getAnaquelesByAlmacen();
    this.obtenerCabecera();
    //this.getDetalleInventarioByIdIventario();
    this.getListarInventarioPorIdIventario(1);

  }

  private pageEvent($event: any) {
    this.paginator.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getListarInventarioPorIdIventario();
  }
  pageEventDif($event: any) {

  }
  private obtenerCabecera() {
    //debugger;
    this.varFiltrarAnaquel = 1
    this.myControlador = this.varAnaquelFiltrar
    this.params.idInventario = this.idInventario;
    this.cabecera.nombreComercial = this.idInventario.nombreComercial;
    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      this._inventarioService.getCabeceraInventario(this.params)
        .subscribe(data => {
          console.log(data.listarCabeceraInventario)
          if (data.estado == 1) {
            this.cabeceraJSON = data.listarCabeceraInventario;
            console.log(this.cabeceraJSON);
            this.cabecera.nombreComercial = this.cabeceraJSON[0].nombreComercial;
            this.cabecera.descripcionTurno = this.cabeceraJSON[0].descripcionTurno;
            this.cabecera.feCierre = this.cabeceraJSON[0].feCierre;
            this.cabecera.fhMod = this.cabeceraJSON[0].fhMod;
            this.cabecera.usuarioIns = this.cabeceraJSON[0].usuarioIns;
            this.cabecera.numeroInventario = this.cabeceraJSON[0].numeroInventario;

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
  private regresaTomarInventario() {
    this.regresar.emit(false);
    this._viewPag = true;
  }
  // private getDetalleInventarioByIdIventario() {
  //   this.showCloseInve = 1;
  //   this.showVerificar = 1;
  //   this.params.idInventario = this.idInventario;
  //   if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
  //     console.log(this.params)
  //     this._inventarioService.getDetalleInventarioByIdIventario(this.params)
  //       .subscribe(data => {
  //         if (data.estado == 1) {
  //           this.inventarioJSON = data.inventario;
  //           console.log(this.inventarioJSON);
  //           if (this.inventarioJSON['inventarioDetalleList'] != null) {
  //             // console.log(this.inventarioJSON['inventarioDetalleList']);
  //             let total: number = 0;
  //             let count = 0;
  //             this.totalG = 0;
  //             for (let item of this.inventarioJSON['inventarioDetalleList']) {
  //               item.i = count;
  //               total = (item.medicamentoLote.medicamento ? item.medicamentoLote.medicamento.precioVenta : (item.medicamentoLote.dispMedicoProdSanitario ? item.medicamentoLote.dispMedicoProdSanitario.precioVenta : 0)) * item.cantidadSistema;
  //               this.totalG = this.totalG + total;
  //               count++;
  //             }
  //             // console.log('olisss1');

  //             this.verificarClosed = this.verificarClose();
  //             if (this.inventarioJSON['estadoInventario'] == 'C') {
  //               this.titulo = "Reporte Inventario";
  //               this.verificarClosed = true;
  //               this.verificarRegularizarr = this.verificarRegularizar();
  //               this.displayedColumnsMedicsIventario = ['Item', 'Codigo', 'ProducFarmaDisp', 'Lote', 'FechaVenci', 'UnidadDeMedida', 'Stock', 'Conteo'];
  //               this.dataSource = new MatTableDataSource(this.inventarioJSON['inventarioDetalleList']);
  //               this.dataSource.paginator = this.paginator;
  //               this.showReporte = 2;
  //               this.dataSource.paginator.firstPage();
  //             }
  //             else {
  //               this.dataSource = new MatTableDataSource(this.inventarioJSON['inventarioDetalleList']);
  //               this.dataSource.paginator = this.paginator;
  //             }
  //           }
  //           else {
  //             this.toastr.error("No hay Inventario para mostrar");
  //             this.dataSource = new MatTableDataSource([]);
  //             this.dataSource.paginator = this.paginator;
  //           }
  //         } else {
  //           this.toastr.error(data.mensaje);
  //         }
  //       },
  //         error => {
  //           this.toastr.error(error);
  //           return Observable.throw(error);
  //         }),
  //       err => this.toastr.error(err),
  //       () => this.toastr.success('Request Complete');
  //   }
  // }
  getAnaquel(val: string) {
    this.almacenMedicamentoList2 = val ? this._filter(val) : [];
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.almacenMedicamentoList2.filter(value => value.anaquel.toLowerCase().startsWith(filterValue));
  }
  private buscarAnaquel(anaquel) {
    if (anaquel == "") {
      this.FiltroByAnaquel(anaquel);
    } else {

      this.regresarNormal();
      this.inventarioJSONFiltrado = [];
      this.filtro = undefined;
      this.almacenMedicamentoList2 = this.almacenMedicamentoList;
      this.getAnaquel(anaquel);
    }
  }
  private seleccionaAnaquel(anaqueles: any) {
    this.filtro = anaqueles.anaquel;
    // if (this.filtro != undefined || this.filtro != null) {
    this.FiltroByAnaquel(this.filtro);
    // }
  }
  private regresarNormal() {
    this.dataSource = new MatTableDataSource(this.inventarioJSON['inventarioDetalleUnit']);
    //  this.dataSource.paginator = this.paginator;
  }

  private FiltroByAnaquel(anaquel) {

    // this.inventarioJSONFiltrado = this.inventarioJSON.filter(_item => _item.inventarioDetalleUnit.almacenMedicamento.anaquel === anaquel)
    // this.dataSource = new MatTableDataSource(this.inventarioJSONFiltrado);
    // this.dataSource.paginator = this.paginator;
    // this.paginator.firstPage();
    // this.toastr.success("Filtro del anaquel '" + anaquel + "' Exitoso", " ");
    // this.almacenMedicamentoList2 = [];
    // this.anaquel = "";
    this.params.anaqueL = (anaquel != "") ? anaquel : null;

    this.getListarInventarioPorIdIventario()
  }

  private getAnaquelesByAlmacen() {
    this.tmr = true;
    this._inventarioService.getAnaquelesByAlmacen(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.almacenMedicamentoList = data.almacenMedicamentoList;
          console.log(this.almacenMedicamentoList);

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

  // private updateInventario(idInventarioDetalle, cantidadSistema, conteoFisico, posicion) {
  //   console.log(conteoFisico)
  //   if (conteoFisico != null && conteoFisico != "" && conteoFisico != undefined) {
  //     if (!/^\d*\.?\d+$/.test(conteoFisico)) {
  //       this.inventarioJSON['inventarioDetalleList'][posicion].conteoFisico = null;
  //       this.toastr.error("Sólo puede ingresar números positivos");
  //       return;
  //     }
  //     let params = { inventarioDetalleList: [{ idInventarioDetalle: idInventarioDetalle, cantidadContada: conteoFisico, cantidadSistema: cantidadSistema }] };
  //     this._inventarioService.updateInventario(params)
  //       .subscribe(data => {
  //         if (data.estado == 1) {
  //           this.toastr.success(data.mensaje);
  //           this.getDetalleInventarioByIdIventario();
  //         } else {
  //           this.toastr.error(data.mensaje);
  //         }
  //       },
  //         error => {
  //           this.toastr.error(error);
  //           return Observable.throw(error);
  //         }),
  //       err => this.toastr.error(err),
  //       () => this.toastr.success('Request Complete');
  //   } else {
  //     this.toastr.warning("Debe ingresar la cantidad contada");
  //     return;
  //   }
  // }

  ///AYUDAAAAAAaaaaaaaaaa

  private actualizarInventario(element, posicion) {

    this.paramsValidar.idUnidad = element.idUnidad
    this.paramsValidar.cantidadContada = element.inventarioDetalleUnit.cantidadContada
    this.paramsValidar.idMedicamento = element.inventarioDetalleUnit.almacenMedicamento.medicamento.idMedicamento
    this.paramsValidar.idDispMedicoProdSanitario = element.inventarioDetalleUnit.almacenMedicamento.dispMedicoProdSanitario.idDispMedicoProdSanitario
   
    this._inventarioService.validarCantidadEquivalencia(this.paramsValidar)
      .subscribe(data => {
        if (data.estado == 1) {   

          let params = { inventarioArray: null };
          let milagros = '(' + element.inventarioDetalleUnit.idInventarioDetalle + ',' + element.inventarioDetalleUnit.cantidadContada + ',' + element.inventarioDetalleUnit.cantidadSistema + ')';
          params.inventarioArray = milagros;
          this._inventarioService.updateInventario(params)
            .subscribe(data => {
              if (data.estado == 1) {
                this.toastr.success(data.mensaje);
                this.getListarInventarioPorIdIventario();
              } else {
                this.toastr.error(data.mensaje);
              }
            },
              error => {
                this.toastr.error(error);
                return Observable.throw(error);
              }),
            err => this.toastr.error(err),
            () => {
              // this.getListarInventarioPorIdIventario();
              this.toastr.success('Request Complete')
            };

          this.toastr.success(data.mensaje);

        } else {
          this.toastr.warning(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => {
        // this.getListarInventarioPorIdIventario();
        this.toastr.success('Request Complete')
      };

  }


  private cerrarInventario() {
    if (this.idInventario != null && this.idInventario != "" && this.idInventario != undefined) {
      for (let item of this.inventarioJSON) {
        if (item.inventarioDetalleUnit.cantidadContada == null || item.inventarioDetalleUnit.cantidadContada === "" || item.inventarioDetalleUnit.cantidadContada == undefined) {
          this.toastr.error("Debe ingresar la cantidad contada en: " + (item.medicamentoLote.medicamento ? item.medicamentoLote.medicamento.dciProductoFarmaceutico : (item.medicamentoLote.dispMedicoProdSanitario ? item.medicamentoLote.dispMedicoProdSanitario.dciDispMedicoProdSanitario : '-')));
          return;
        }
      }
      let _mas = 'con ' + this._contCero
      this.confirmacion = this._contCero == 0 ? ('¿Está seguro que desea cerrar el inventario?') :
        ('¿Está seguro que desea cerrar el inventario con la cantidad de ' + this._contCero + ' medicamentos vacios en el conteo fisico?');
      const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
        autoFocus: false,
        maxWidth: '35%',
        maxHeight: '40%',
        disableClose: true
      });
      dialogRef.componentInstance.confirmacion = this.confirmacion;
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          let inventarioRequest = { inventario: { idInventario: this.idInventario } };
          this._inventarioService.updateCerrarInventario(inventarioRequest)
            .subscribe(data => {
              console.log(data)
              if (data.confirmacion.id != 0) {
                this.toastr.success(data.mensaje);

                // this.getListarInventarioPorIdIventario();
                this.showCloseInve = 0;
                if (data.confirmacion.id == 2) {
                  this.verificarRegularizarr = false;
                } else {
                  this.verificarRegularizarr = true;
                }

              } else {
                this.toastr.error(data.mensaje);
              }
            },
              err => { this.toastr.error(err) },
              () => {
                // this.regresaTomarInventario();
              });
        }
      });
    }
  }
  private imprimirInventarioCerrado(tipoFile) {
    this._inventarioService.imprimirInventarioCerrado(this.idInventario, 1)
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
        });
  }
  close(): any {
    throw new Error("Method not implemented.");
  }


  // verificarClose() {
  //   console.log(this.inventarioJSON);

  //   if (this.inventarioJSON['inventarioDetalleList'] != null) {
  //     let disable: number = 0
  //     for (let item of this.inventarioJSON['inventarioDetalleList']) {
  //       if (item.cantidadContada == undefined || item.cantidadContada == null || item.cantidadContada === "") {
  //         disable++;
  //       }
  //     }
  //     if (disable === 0) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  //   else {
  //     return true;
  //   }
  // }
  // verificarClose2() {
  //   console.log(this.inventarioJSON);

  //   if (this.inventarioJSON != null) {
  //     let disable: number = 0
  //     for (let item of this.inventarioJSON) {
  //       if (item.inventarioDetalleUnit.cantidadContada == undefined || item.inventarioDetalleUnit.cantidadContada == null || item.inventarioDetalleUnit.cantidadContada == "") {
  //         disable++;
  //       }
  //     }
  //     if (disable === 0) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  //   else {
  //     return true;
  //   }
  // }



  verificarRegularizar() {
    if (this.inventarioJSON['inventarioDetalleList'] != null) {
      for (let item of this.inventarioJSON['inventarioDetalleList']) {
        if (item.cantidadContada != item.cantidadSistema) {
          return false;
        }
      }
    }
    return true;
  }

  verificoRegularizador() {
    if (this.inventarioJSON['listInventario'] != null) {
      for (let item of this.inventarioJSON['listInventario']) {
        if (item.cantidadContada != item.cantidadSistema) {
          return false;
        }
      }
    }
    return true;
  }

  private imprimirDiferenias() {
    // this.tmr = true;
    this._viewPag = false
    debugger;
    this.pageSize = 100000;
    this.getListarInventarioPorIdIventario(1)

    this.verBotonReporteInventario = 1;
    this.verBotonImprimirDiferencias = 1;
    this.titulo = "Reporte de Diferencias";
    this.verificarClosed = true;
    this.verificarRegularizarr = true;
    this.displayedColumnsMedicsIventario = ['Codigo', 'ProducFarmaDisp', 'Marca', 'Presentacion', 'UnidadDeMedida', 'Diferencia'];

    console.log(this.inventarioJSON);

    console.log(this.inventarioJSON);


    this.inventarioJSON.map((_it, _ix) => {
      if (_it['inventarioDetalleUnit'].cantidadContada != _it['inventarioDetalleUnit'].cantidadSistema) {
        this.inventarioJSONDiferencia.push(this.inventarioJSON[_ix])['inventarioDetalleUnit'];
      }
    });

    this.showCloseInve = 2;
    this.showVerificar = 2;
    this.dataSource = new MatTableDataSource(this.inventarioJSONDiferencia);
    console.log(this.dataSource);
    console.log(this._viewPag);

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator.firstPage();
  }
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

  private getListarInventarioPorIdIventario(numPagina?: number) {

    this.tmr = true;
    this.showCloseInve = 1;
    this.showVerificar = 1;
    this.params.idInventario = this.idInventario;

    this.paginator.nuPagina = (numPagina) ? numPagina : this.paginator.nuPagina;

    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      console.log(this.params);

      this.params = {
        ...this.params,
        ...this.paginator,
        nuRegisMostrar: this.pageSize
      };

      this._inventarioService.getListarInventarioPorIdIventario(this.params)
        .subscribe(data => {
          console.log("mi list inventario es", data.listInventario)
          if (data.estado == 1) {
            this.inventarioJSON = [];
            this.inventarioJSON = data.listInventario;
            this._contCero = this.inventarioJSON[0].cantidadCero;
            console.log(this.inventarioJSON);
            let count = ((this.paginator.nuPagina - 1) * this.pageSize) + 1
            this.inventarioJSON.forEach(element => {
              element["index"] = count
              count++
            });
            console.log(this.inventarioJSON);

            // //contamos la cantidad de Ceros
            // this.inventarioJSON.map(item => {
            //   if (item.inventarioDetalleUnit.cantidadContada == 0) {
            //     this._contCero++;
            //   } 
            // });
            // console.log("cantidad de Ceros: ", this._contCero)
            if (this.inventarioJSON != null) {
              this.verificarRegularizarr = this.verificoRegularizador();
              this.displayedColumnsMedicsIventario = ['Item', 'Codigo', 'ProducFarmaDisp', 'FormaFarmaTipoDisp', 'Marca', 'Presentacion', 'UnidadDeMedida', 'Stock', 'ConteoFisico'];
              this.dataSource = new MatTableDataSource(this.inventarioJSON);
              // this.dataSource.paginator = this.paginator;
              this.showReporte = 2;
              // this.dataSource.paginator.firstPage();
              if (this.matPaginator) {
                this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
              }
              if (this.inventarioJSON.length > 0) {
                this.paginator.nuRegisMostrar = this.inventarioJSON[0].nuTotalReg;
                console.log("mi num regis mostrar es" + this.paginator.nuRegisMostrar);
              }
              if (!this._viewPag) {
                this.inventarioJSONDiferencia = []
                console.log(this.inventarioJSON);

                this.verBotonReporteInventario = 1;
                this.verBotonImprimirDiferencias = 1;
                this.titulo = "Reporte de Diferencias";
                this.verificarClosed = true;
                this.verificarRegularizarr = true;
                this.displayedColumnsMedicsIventario = ['Item', 'Codigo', 'ProducFarmaDisp', 'Marca', 'Presentacion', 'UnidadDeMedida', 'Diferencia'];

                data.listInventario.map((_it, _ix) => {
                  if (_it['inventarioDetalleUnit'].cantidadContada != _it['inventarioDetalleUnit'].cantidadSistema) {
                    this.inventarioJSONDiferencia.push(this.inventarioJSON[_ix])['inventarioDetalleUnit'];
                  }
                });
                console.log("asdasda: ", this.inventarioJSONDiferencia)
                this.showCloseInve = 2;
                this.showVerificar = 2;
                this.dataSource = new MatTableDataSource(this.inventarioJSONDiferencia);
              }
            }
            else {
              this.toastr.error("No hay Inventario para mostrar");
              this.dataSource = new MatTableDataSource([]);
              // this.dataSource.paginator = this.paginator;
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
        () => {

          this.toastr.success('Request Complete');
        }
    }
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
  ///Acaba  reporte de diferencias
  private imprimirReporteDiferenciasInventario() {
    this.request.idInventario = this.idInventario;

    this.request.tipoFile = 2;
    this._inventarioService.imprimirReporteDiferencias(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data.listarCabeceraInventario);
          console.log(data.listInventario)
          this.toastr.success(data.mensaje);
        }
      })
  }

  private imprimirReporteDiferenciasInventarioImpresion(tipoFile) {
    console.log(this.requestImpresion);
    
    let promise = new Promise((resolve, reject) => {

      this.requestImpresion.idInventario = this.idInventario;
      this.requestImpresion.tipoFile = tipoFile;
      this._inventarioService.imprimirReporteDiferencias(this.requestImpresion)
        .subscribe(data => {
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
  ///Acaba reporte de diferencias
  private imprimirReporteInventario() {
    this.request.idInventario = this.idInventario;

    this.request.tipoFile = 2;
    this._inventarioService.imprimirReporteInventario(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data.listarCabeceraInventario);
          console.log(data.listInventario)
          this.toastr.success(data.mensaje);
        }
      })
  }
  private imprimirReporteInventarioImpresion(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      // this.requestImpresion.idAperturaCaja=103;
      this.requestImpresion.idInventario = this.idInventario;
      this.requestImpresion.tipoFile = tipoFile;
      this._inventarioService.imprimirReporteInventario(this.requestImpresion)
        .subscribe(data => {
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
  private imprimePDF(tipoFile) {
    this.imprimirReporteInventarioImpresion(tipoFile);
  }
  //PARA reporte Diferencias
  private imprimePDFDiferencias(tipoFile) {
    this.imprimirReporteDiferenciasInventarioImpresion(tipoFile);
  }
  //Fin reporte diferencias

  ///Para hacer reporte de diferencias
  private getListarInventarioPorIdIventarioD(tipoFile) {
    this.tmr = true;
    this.showCloseInve = 1;
    this.showVerificar = 1;
    this.params.idInventario = this.idInventario;

    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      console.log(this.params);

      this.params = {
        ...this.params,
        ...this.paginator,
        nuRegisMostrar: this.pageSize
      };

      this._inventarioService.getListarInventarioPorIdIventario(this.params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.inventarioJSON = [];
            this.inventarioJSON = data.listInventario;
            this._contCero = this.inventarioJSON[0].cantidadCero;
            console.log(this.inventarioJSON);
            let count = ((this.paginator.nuPagina - 1) * this.pageSize) + 1
            this.inventarioJSON.forEach(element => {
              element["index"] = count
              count++
            });
            console.log(this.inventarioJSON);

            // //contamos la cantidad de Ceros
            // this.inventarioJSON.map(item => {
            //   if (item.inventarioDetalleUnit.cantidadContada == 0) {
            //     this._contCero++;
            //   } 
            // });
            // console.log("cantidad de Ceros: ", this._contCero)
            if (this.inventarioJSON != null) {
              this.verificarRegularizarr = this.verificoRegularizador();
              this.displayedColumnsMedicsIventario = ['Item', 'Codigo', 'ProducFarmaDisp', 'FormaFarmaTipoDisp', 'Marca', 'Presentacion', 'UnidadDeMedida', 'PrecioUnidad', 'Subtotal', 'Stock', 'ConteoFisico'];
              this.dataSource = new MatTableDataSource(this.inventarioJSON);
              // this.dataSource.paginator = this.paginator;
              this.showReporte = 2;
              // this.dataSource.paginator.firstPage();

              if (this.inventarioJSON.length > 0) {
                this.paginator.nuRegisMostrar = this.inventarioJSON[0].nuTotalReg;
                console.log("mi num regis mostrar es" + this.paginator.nuRegisMostrar);
              }
              if (!this._viewPag) {
                this.verBotonReporteInventario = 1;
                this.verBotonImprimirDiferencias = 1;
                this.titulo = "Reporte de Diferencias";
                this.verificarClosed = true;
                this.verificarRegularizarr = true;
                this.displayedColumnsMedicsIventario = ['Codigo', 'ProducFarmaDisp', 'UnidadDeMedida', 'Diferencia'];

                this.inventarioJSON.map((_it, _ix) => {
                  if (_it['inventarioDetalleUnit'].cantidadContada != _it['inventarioDetalleUnit'].cantidadSistema) {
                    this.inventarioJSONDiferencia.push(this.inventarioJSON[_ix])['inventarioDetalleUnit'];
                  }
                });
                console.log("asdasda: ", this.inventarioJSONDiferencia)
                this.showCloseInve = 2;
                this.showVerificar = 2;
                this.dataSource = new MatTableDataSource(this.inventarioJSONDiferencia);
              }
            }
            else {
              this.toastr.error("No hay Inventario para mostrar");
              this.dataSource = new MatTableDataSource([]);
              // this.dataSource.paginator = this.paginator;
            }

          } if (tipoFile == 2) {
            this.pdf = "data:application/pdf;base64," + data.imprimeFile;
            this.pruebitaModal(this.pdf);
          }
          else {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          }


        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => {

          this.toastr.success('Request Complete');
        }
    }
  }

}
