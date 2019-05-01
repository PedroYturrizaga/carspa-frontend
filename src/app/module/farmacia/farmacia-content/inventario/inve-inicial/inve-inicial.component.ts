import { element } from 'protractor';
import { MedicamentoMaterialService } from './../../../../mantenimiento/mantenimiento-content/medicamento-material/services/medicamento-material.service';
import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { ConfirmacionNotaEntradaComponent } from './../../movimiento/nota-entrada/confirmacion-nota-entrada/confirmacion-nota-entrada.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { InventarioService } from '../../../services/inventario.service';
import { MovimientoService } from '../../../services/movimiento.service';
import { RecetaService } from '../../../../consulta-ambulatoria/services/receta.service';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../..//shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-inve-inicial',
  templateUrl: './inve-inicial.component.html',
  styleUrls: ['./inve-inicial.component.scss']
})
export class InveInicialComponent implements OnInit {
  @Input() grupoMedicamento;
  displayedColumnsMedicDisp = ['Codigo', 'productFarma', 'registroSan', 'Lote', 'fechaVen', 'Unidad', 'Cantidad',
    'Precio', 'SubTotal', 'Editar', 'Accion'];
  dataSource = new MatTableDataSource();


  private idAlmacen = null;
  private tipoAlmacen = null;
  private descripAlmacen = null;
  private position = 'above';

  private filteredDispMedi = [];

  private medicDispMedicProdSanit: any[] = [];
  private arrayMedicDisp: any[] = [];
  // unidMed: null 
  private medicDispProd = { idMedicDisp: null, codigoMedicDisp: null, descMedicDisp: null, fiTipo: null, cantidad: null, regiSani: null, fechVenci: null, precUni: null, lote: null, fechaAuxiliar: Date, unidMed: null, nomUni: null };
  private inventarioInicialRequest = { comprobanteFarmacia: { feIngreso: new Date(), almacenOrigen: { idAlmacen: null }, comprobanteFarmaciaDetalleList: [] } };
  private descripMedicDispMedicProducSanit: string = "";
  private totalM: number = 0;
  private fechaActual: Date = new Date();
  private confirmacion: string;
  private showGuardar = 1;
  private disableMedic = false;
  private cantidadAux = 0;
  private indiceAuxiliar;
  private fechaHoy = new Date();
  private dateMin = new Date();
  private pdf: String;
  //Agregando parametro para Unidad
  private unidadMedida = [];

  constructor(
    private _inventarioService: InventarioService,
    private _recetaService: RecetaService,
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    private _route: ActivatedRoute,
    private dialog: MatDialog

  ) {
    this.fechaHoy.setDate(this.fechaHoy.getDate() - 1)
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
  }
  filterMeds(val: string) {
    this.medicDispMedicProdSanit = val ? this._filter(val) : this.medicDispMedicProdSanit;
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }
  ngOnInit() {
    this.inventarioInicialRequest.comprobanteFarmacia.almacenOrigen.idAlmacen = this.idAlmacen;
  }

  private getMedicDispMedProdSanit(descripMedicDispProd) {
    let param = { descripMedicDispProd: descripMedicDispProd };
    this._recetaService.getMedicDispMedProdSanit(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDispMedicProdSanit = data.medicamentoDispMedicoProdSanitarioList;
          if (this.medicDispMedicProdSanit.length === 0) {
            this.toastr.warning("Producto Farmacútico/Dispositivo Médico no encontrado");
          }
          else {
            this.filterMeds(descripMedicDispProd);
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
      () => this.toastr.success('Request Complete');
  }

  private buscarMedicDispProdDescripcion(descripMedicDispProd) {
    this.medicDispProd.idMedicDisp = null
    this.medicDispMedicProdSanit = [];
    if (descripMedicDispProd.length > 1) {
      this.getMedicDispMedProdSanit(descripMedicDispProd);
    }
    else {
      this.filteredDispMedi = [];
    }
  }

  private seleccionaMedicamentoMaterial(medicamentoMaterial) {
    this.medicDispProd.idMedicDisp = medicamentoMaterial.idMedicamento;
    this.medicDispProd.codigoMedicDisp = medicamentoMaterial.codigo;
    this.medicDispProd.descMedicDisp = medicamentoMaterial.dispositivoMedicamento;
    this.medicDispProd.fiTipo = medicamentoMaterial.fiTipo;
    this.medicDispMedicProdSanit = [];

    if (medicamentoMaterial.fiTipo == "M") {
      this.getUnidadMedicamentoDispositivo(this.medicDispProd.idMedicDisp, null);
    } else if (medicamentoMaterial.fiTipo == "D") {
      this.getUnidadMedicamentoDispositivo(null, this.medicDispProd.idMedicDisp);
    }
  }

  private cambio() {
    for (let x of this.unidadMedida) {
      if (x['idUnidad'] == this.medicDispProd.unidMed)
        this.medicDispProd.nomUni = x['nombreUnidad'];
    }
  }

  private agregarMedicDisp(addInventario: FormGroupDirective) {
    if (isInvalid(addInventario)) {
      return;
    }
    this.unidadMedida.forEach(element => {
      let aux = {
        idUnidad: element.idUnidad,
        nombreUnidad: element.nombreUnidad
      }

      // this.medicDispProd.unidadMedid.push(aux);
      // if (element.idUnidad == this.medicDispProd.unidMed) {
      //   this.medicDispProd.unidadMedid = aux;
      // }
    })

    if (this.arrayMedicDisp.length > 0) {
      for (let i of this.arrayMedicDisp) {
        if ((i.idMedicDisp != undefined || i.idMedicDisp != null) && (this.medicDispProd.idMedicDisp != undefined || this.medicDispProd.idMedicDisp != null)) {
          if (i.idMedicDisp == this.medicDispProd.idMedicDisp && i.lote.trim() == this.medicDispProd.lote.trim()) {
            this.toastr.error("Ya agrego este  producto farmaceútico y/o dispositivo médico");
            addInventario.resetForm();
            return;
          }
          if (i.lote.trim() == this.medicDispProd.lote.trim()) {
            this.toastr.error("Lote ya Registrado");
            addInventario.resetForm();
            return;
          }
        }
      }
      this.totalM = this.totalM + (this.medicDispProd.cantidad * this.medicDispProd.precUni);
    } else {
      if (this.medicDispProd.cantidad != null && this.medicDispProd.precUni != null) {
        this.totalM = this.medicDispProd.cantidad * this.medicDispProd.precUni;
      } else {
        this.totalM = 0;
      }
    }

    this.medicDispProd.fechaAuxiliar = this.medicDispProd.fechVenci;
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.medicDispProd.fechVenci = ((this.medicDispProd.fechVenci).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.medicDispProd;

    this.arrayMedicDisp.push(this.medicDispProd);

    this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
    this.borrarJsonMedicDisp();
    this.medicDispMedicProdSanit = [];
    this.indiceAuxiliar = undefined;
    addInventario.resetForm();
  }

  private borrarJsonMedicDisp() {
    let params = { idMedicDisp: null, codigoMedicDisp: null, descMedicDisp: null, fiTipo: null, cantidad: null, regiSani: null, fechVenci: null, precUni: null, lote: null, fechaAuxiliar: Date, unidMed: null, nomUni: null };
    this.medicDispProd = null;
    this.medicDispProd = params;
    this.descripMedicDispMedicProducSanit = "";
  }

  private insertarInventarioInicial() {
    if (this.arrayMedicDisp.length === 0) {
      return;
    }
    let params: any;
    for (let i of this.arrayMedicDisp) {
      params = { registroSanitario: null, precioVenta: null, cantidad: null, feVencimiento: null, descripcionLote: null, idUnidad: null };
      if (i.fiTipo == 'M') {
        params.medicamento = { idMedicamento: i.idMedicDisp };
      } else if (i.fiTipo == 'D') {
        params.dispMedicoProdSanitario = { idDispMedicoProdSanitario: i.idMedicDisp };
      }
      params.registroSanitario = i.regiSani;
      params.descripcionLote = i.lote;
      params.feVencimiento = i.fechVenci;
      params.precioVenta = i.precUni;
      params.cantidad = i.cantidad;
      params.idUnidad = i.unidMed;
      this.inventarioInicialRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.push(params);
    }
    if (this.inventarioInicialRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.length > 0) {
      let idComprobante: any = null;

      this._inventarioService.insertInventarioInicial(this.inventarioInicialRequest)
        .subscribe(data => {

          if (data.estado == 1) {
            idComprobante = data.confirmacion.id;
            this.toastr.success(data.mensaje);
            this.arrayMedicDisp = [];
            this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
          } else {
            this.toastr.error(data.mensaje);
          }
        },

          err => { this.toastr.error(err) },
          () => {
            this.inventarioInicialRequest.comprobanteFarmacia.feIngreso = new Date();
            this.inventarioInicialRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList = [];
            this.arrayMedicDisp = [];
            this.totalM = 0;
            if (idComprobante != null && idComprobante != undefined) {
              this.imprimirInventarioInicial(idComprobante, 2);
            }
          });
    }
  }

  private imprimirInventarioInicial(idComprobante, tipoFile) {
    let params = { idComprobante: idComprobante, tipoFile: 2 };
    this._movimientoService.imprimirNotaEntradaIventarioInicial(params)
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
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  edicionMedicDisp(addNotaEntrada: FormGroupDirective) {
    if (isInvalid(addNotaEntrada)) {
      return;
    }
    this.confirmacion = ('¿Está seguro que quiere editar el Producto Farmacútico/Dispositivo Médico seleccionado?');
    const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
      // autoFocus: false,
      // maxWidth: '35%',
      // maxHeight: '40%',
      // disableClose: true
    });
    dialogRef.componentInstance.confirmacion = this.confirmacion;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.medicDispProd.fechaAuxiliar = this.medicDispProd.fechVenci
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        this.medicDispProd.fechVenci = (this.medicDispProd.fechVenci.toLocaleDateString('es-PE', options)).split('/').join('-');
        if (this.arrayMedicDisp.length > 0) {
          if (this.arrayMedicDisp[this.indiceAuxiliar].lote == this.medicDispProd.lote) {

          }
          else {
            for (let i of this.arrayMedicDisp) {
              if ((i.idMedicDisp != undefined || i.idMedicDisp != null) && (this.medicDispProd.idMedicDisp != undefined || this.medicDispProd.idMedicDisp != null)) {
                if (i.lote == this.medicDispProd.lote) {
                  this.toastr.error("Lote ya Presente en la lista");
                  this.medicDispProd.fechVenci = this.medicDispProd.fechaAuxiliar
                  return;
                }
              }
            }
          }
          this.totalM = this.totalM + (this.medicDispProd.cantidad * this.medicDispProd.precUni);
        }
        else {
          if (this.medicDispProd.cantidad != null && this.medicDispProd.precUni != null) {
            this.totalM = this.medicDispProd.cantidad * this.medicDispProd.precUni;
          } else {
            this.totalM = 0;
          }
        }
        this.arrayMedicDisp[this.indiceAuxiliar] = this.medicDispProd;
        this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
        this.toastr.success("Producto Farmacútico/Dispositivo Médico Editado Correctamente");
        this.borrarJsonMedicDisp();
        this.medicDispMedicProdSanit = [];
        this.indiceAuxiliar = undefined;
        this.cantidadAux = 0;
        this.disableMedic = false;
        this.showGuardar = 1;
        addNotaEntrada.resetForm();
      }
    });
  }

  private deleteMedicDisp(idMedicDisp, cantidad, precioUni, medicamento) {
    // let index = 0;
    // this.totalM = this.totalM - (cantidad * precioUni);
    // for (let i of this.arrayMedicDisp) {
    //   if (i.idMedicDisp == idMedicDisp) {
    //     this.arrayMedicDisp.splice(index, 1);
    //     this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
    //     return;
    //   }
    //   index++;
    // }


    if (this.showGuardar == 2) {
      this.toastr.warning("Usted se encuentra en modo edición, finalice edición o CANCELE");
      return;
    }
    this.confirmacion = ('¿Está seguro que quiere eliminar el Producto Farmacútico/Dispositivo Médico  "' + medicamento + '" ?');
    const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
      autoFocus: false,
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
    });
    dialogRef.componentInstance.confirmacion = this.confirmacion;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        let index = 0;
        this.totalM = this.totalM - (cantidad * precioUni);
        for (let i of this.arrayMedicDisp) {
          if (i.idMedicDisp == idMedicDisp) {
            this.arrayMedicDisp.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
            this.toastr.success("Producto Farmacútico/Dispositivo Médico Eliminado Correctamente");
          }
          else {
            index++;
          }
        }
      }
    });
  }
  cancelarEdicion(addNotaEntrada: FormGroupDirective) {
    this.totalM = this.totalM + this.cantidadAux;
    this.borrarJsonMedicDisp();
    this.medicDispMedicProdSanit = [];
    addNotaEntrada.resetForm();
    this.indiceAuxiliar = undefined;
    this.disableMedic = false;
    this.showGuardar = 1;
  }
  private editarMedicDisp(element, index) {
    this.cantidadAux = 0;
    this.disableMedic = true;
    this.showGuardar = 2;
    this.cantidadAux = (element.cantidad * element.precUni);
    this.totalM = this.totalM - (element.cantidad * element.precUni);

    let params = { idMedicDisp: null, codigoMedicDisp: null, descMedicDisp: null, fiTipo: null, cantidad: null, regiSani: null, fechVenci: null, precUni: null, lote: null, fechaAuxiliar: Date, unidMed: null, nomUni: null };

    this.medicDispProd = null;
    this.medicDispProd = params;
    this.descripMedicDispMedicProducSanit = "";
    this.indiceAuxiliar = index;
    this.descripMedicDispMedicProducSanit = element.descMedicDisp;

    this.medicDispProd = {
      idMedicDisp: element.idMedicDisp,
      codigoMedicDisp: element.codigoMedicDisp,
      descMedicDisp: element.descMedicDisp,
      fiTipo: element.fiTipo,
      cantidad: element.cantidad,
      regiSani: element.regiSani,
      fechVenci: (element.fechaAuxiliar),
      precUni: element.precUni,
      lote: element.lote,
      fechaAuxiliar: element.fechaAuxiliar,
      unidMed: element.unidMed,
      nomUni: element.nomUni
    };
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
  private getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
    let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
    this._movimientoService.getUnidadMedicamentoDispositivo(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.unidadMedida = data.listUnidad;
        } else {
          // this.toastr.error(data.mensaje);
          this.unidadMedida = []
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
