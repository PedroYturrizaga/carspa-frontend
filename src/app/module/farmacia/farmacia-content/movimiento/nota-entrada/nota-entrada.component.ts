import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { MovimientoService } from '../../../services/movimiento.service';
import { RecetaService } from '../../../../consulta-ambulatoria/services/receta.service';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmacionNotaEntradaComponent } from './confirmacion-nota-entrada/confirmacion-nota-entrada.component';
// import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ModalPdfComponent } from '../../../../../shared/helpers/modal-pdf/modal-pdf.component';


@Component({
  selector: 'app-nota-entrada',
  templateUrl: './nota-entrada.component.html',
  styleUrls: ['./nota-entrada.component.scss']
})
export class NotaEntradaComponent implements OnInit {
  displayedColumnsMedicDisp = ['Codigo', 'productFarma', 'registroSan', 'Lote', 'fechaVen', 'Cantidad', 'Unidad', 'Precio', 'SubTotal', 'Editar', 'Accion'];
  dataSource = new MatTableDataSource();

  @ViewChild('addNotaEntrada') private _addNotaEntrada: NgForm;
  @ViewChild('proveed') private _proveed: NgForm;

  private idAlmacen: any;
  private tipoAlmacen: any;
  private filteredDispMedi = [];
  private validators: any;
  private notaEntradaRequest: any;
  private medicDispMedicProdSanit: any[] = [];
  private arrayMedicDisp: any[] = [];
  private medicDispProd = { idMedicDisp: null, codigoMedicDisp: null, descMedicDisp: null, concentracion: null, marca: null, fiTipo: null, cantidad: null, regiSani: null, idUnidad: null, unidMed: null, fechVenci: null, lote: null, fechaAuxiliar: Date, precioUnidad: [] };
  private descripMedicDispMedicProducSanit: String = "";
  private position = 'above';
  private totalM: number;
  private indiceAuxiliar;
  private minimaFecha;
  private showGuardar = 1;
  private disableMedic = false;
  private cantidadAux = 0;
  private fechaHoy = new Date();
  private dateMin = new Date();
  private confirmacion: string;

  private unidadesMedidas = [];

  constructor(
    private _movimientoService: MovimientoService,
    private _recetaService: RecetaService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    private _route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.fechaHoy.setDate(this.fechaHoy.getDate() - 1)
    this.notaEntradaRequest = { precioUnidadesJson: null, comprobanteFarmacia: { proveedor: null, feIngreso: new Date(), numeroDocumentoIngreso: null, almacenOrigen: { idAlmacen: null }, comprobanteFarmaciaDetalleList: [] } };
    this.totalM = 0;
    this.minimaFecha = this.notaEntradaRequest.comprobanteFarmacia.feIngreso;
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
    });
  }

  filterMeds(val: any) {
    this.medicDispMedicProdSanit = val ? this._filter(val) : [];
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }

  ngOnInit() {
    this.notaEntradaRequest.comprobanteFarmacia.almacenOrigen.idAlmacen = this.idAlmacen;
  }

  private getMedicDispMedProdSanit(descripMedicDispProd) {
    let param = { descripMedicDispProd: descripMedicDispProd }
    this._recetaService.getMedicDispMedProdSanit(param)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          this.medicDispMedicProdSanit = data.medicamentoDispMedicoProdSanitarioList;
          if (this.medicDispMedicProdSanit.length === 0) {
            // this.toastr.warning("Producto Farmacútico/Dispositivo Médico no encontrado");
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
    this.medicDispMedicProdSanit = [];
    this.medicDispProd.idMedicDisp = null;
    if (descripMedicDispProd.length > 1) {
      this.getMedicDispMedProdSanit(descripMedicDispProd);
    } else {
      this.filteredDispMedi = [];
    }
  }

  private seleccionaMedicamentoMaterial(medicamentoMaterial) {
    this.medicDispProd.idMedicDisp = medicamentoMaterial.idMedicamento;
    this.medicDispProd.codigoMedicDisp = medicamentoMaterial.codigo;
    this.medicDispProd.descMedicDisp = medicamentoMaterial.dispositivoMedicamento;
    this.medicDispProd.concentracion = medicamentoMaterial.concentracion;
    this.medicDispProd.marca = medicamentoMaterial.marca;
    this.medicDispProd.fiTipo = medicamentoMaterial.fiTipo;

    console.log(medicamentoMaterial)

    if (medicamentoMaterial.fiTipo == "M") {
      this.getUnidadMedicamentoDispositivo(this.medicDispProd.idMedicDisp, null);
    } else if (medicamentoMaterial.fiTipo == "D") {
      this.getUnidadMedicamentoDispositivo(null, this.medicDispProd.idMedicDisp);
    }

  }

  private agregarMedicDisp(addNotaEntrada: NgForm) {

    let variableException = 0;
    try {

      this.medicDispProd.precioUnidad = []
      this.unidadesMedidas.forEach(element => {
        let aux = {
          idUnidad: element.idUnidad,
          nombreUnidad: element.nombreUnidad,
          precio: element.precio
        }
        console.log(aux);

        this.medicDispProd.precioUnidad.push(aux)

        if (element.idUnidad == this.medicDispProd.idUnidad) {
          this.medicDispProd.unidMed = aux;
        }
      });

      this.medicDispProd.fechaAuxiliar = this.medicDispProd.fechVenci
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.medicDispProd.fechVenci = (this.medicDispProd.fechVenci).toLocaleDateString('es-PE', options).split('/').join('-');
      if (this.arrayMedicDisp.length > 0) {
        for (let i of this.arrayMedicDisp) {
          if ((i.idMedicDisp != undefined || i.idMedicDisp != null) && (this.medicDispProd.idMedicDisp != undefined || this.medicDispProd.idMedicDisp != null)) {
            if (i.idMedicDisp == this.medicDispProd.idMedicDisp) {
              this.toastr.error("Ya agrego este producto farmaceútico y/o dispositivo médico");
              // addNotaEntrada.resetForm();
              variableException = 1
              return;
            }
            // if (i.lote.trim() == this.medicDispProd.lote.trim()) {
            //   this.toastr.error("Lote ya Presente en la lista");
            //   this.medicDispProd.lote = '';
            //   this.medicDispProd.fechVenci = this.medicDispProd.fechaAuxiliar;
            //   // addNotaEntrada.resetForm();
            //   variableException = 1
            //   return;
            // }
          }
        }
        this.totalM = this.totalM + (this.medicDispProd.cantidad * this.medicDispProd.unidMed.precio);
      }
      else {
        if (this.medicDispProd.cantidad != null && this.medicDispProd.unidMed.precio != null) {
          this.totalM = this.medicDispProd.cantidad * this.medicDispProd.unidMed.precio;
        } else {
          this.totalM = 0;
        }
      }

      this.arrayMedicDisp.push(this.medicDispProd);
      this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
      console.log(this.arrayMedicDisp)
    } catch (error) {
      console.log(error);

    } finally {

      if (variableException == 1) {

      } else {
        this.medicDispMedicProdSanit = [];
        this.borrarJsonMedicDisp()
        this.unidadesMedidas = []
        addNotaEntrada.resetForm();
        this.descripMedicDispMedicProducSanit = null
        console.log(this.descripMedicDispMedicProducSanit);
        this.indiceAuxiliar = undefined;
        this.minimaFecha = this.notaEntradaRequest.comprobanteFarmacia.feIngreso;
      }
    }
  }

  private insertarNotaEntrada(addNotaEntrada: NgForm) {
    let params: any;
    console.log(this.arrayMedicDisp)
    let unidadesParam = [];
    for (let i of this.arrayMedicDisp) {
      params = { registroSanitario: null, cantidad: null, feVencimiento: null, descripcionLote: null, idUnidad: null, precioVenta: null };
      if (i.fiTipo == 'M') {
        params.medicamento = { idMedicamento: i.idMedicDisp };

        i.precioUnidad.forEach(element => {
          let unpre = {
            idMedicamento: i.idMedicDisp,
            idDispMedicoProdSanitario: null,
            idUnidad: element.idUnidad,
            precioVenta: element.precio
          }
          unidadesParam.push(unpre);
        });
      }

      if (i.fiTipo == 'D') {
        params.dispMedicoProdSanitario = { idDispMedicoProdSanitario: i.idMedicDisp };

        i.precioUnidad.forEach(element => {
          let unpre = {
            idMedicamento: null,
            idDispMedicoProdSanitario: i.idMedicDisp,
            idUnidad: element.idUnidad,
            precioVenta: element.precio
          }
          unidadesParam.push(unpre);
        });
      }
      params.registroSanitario = i.regiSani;
      params.descripcionLote = i.lote;
      params.feVencimiento = i.fechVenci;
      params.cantidad = i.cantidad;
      params.idUnidad = i.unidMed.idUnidad;
      params.precioVenta = i.unidMed.precio;
      this.notaEntradaRequest.precioUnidadesJson = JSON.stringify(unidadesParam);
      this.notaEntradaRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.push(params);
    }
    let idComprobante: any = null;
    console.log(this.notaEntradaRequest)
    this._movimientoService.insertNotaEntrada(this.notaEntradaRequest)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          idComprobante = data.idComprobante;
          this.toastr.success(data.mensaje);
          this.arrayMedicDisp = [];
          this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
          this.notaEntradaRequest.comprobanteFarmacia.numeroDocumentoIngreso = null;
          this.notaEntradaRequest.comprobanteFarmacia.feIngreso = new Date();
          this.notaEntradaRequest.comprobanteFarmacia.proveedor = null;
          this.notaEntradaRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList = [];
          this.notaEntradaRequest.precioUnidadesJson = null;
          this.arrayMedicDisp = [];
          this.totalM = 0;
          console.log(idComprobante);
          if (idComprobante != null && idComprobante != undefined) {
            this.imprimirNotaEntrada(idComprobante, 2);
          }

          this._addNotaEntrada.resetForm();
          this._proveed.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
        });
  }

  private pdf: String;

  private imprimirNotaEntrada(idComprobante, tipoFile) {
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

  private borrarJsonMedicDisp() {
    let params = {
      idMedicDisp: null,
      codigoMedicDisp: null,
      descMedicDisp: null,
      concentracion: null,
      marca: null,
      fiTipo: null,
      cantidad: null,
      regiSani: null,
      idUnidad: null,
      unidMed: null,
      fechVenci: null,
      lote: null,
      fechaAuxiliar: Date,
      precioUnidad: []
    };
    this.medicDispProd = null;
    this.medicDispProd = params;
    this.descripMedicDispMedicProducSanit = "";
    this.unidadesMedidas = []
  }

  private deleteMedicDisp(idMedicDisp, cantidad, precioUni, medicamento, fiTipo) {
    if (this.showGuardar == 2) {
      this.toastr.warning("Usted se encuentra en modo edición, finalice edición o CANCELE");
      return;
    }
    if (fiTipo == "M") {
      this.confirmacion = ('¿Está seguro que quiere eliminar el Producto Farmacútico "' + medicamento + '" ?');
    }
    else {
      this.confirmacion = ('¿Está seguro que quiere eliminar el Dispositivo Médico "' + medicamento + '" ?');
    }
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
  edicionMedicDisp(addNotaEntrada: NgForm) {
    if (isInvalid(addNotaEntrada)) {
      return;
    }
    if (this.medicDispProd.fiTipo == "M") {
      this.confirmacion = ('¿Está seguro que quiere editar el Producto Farmacútico ' + this.medicDispProd.descMedicDisp + '?');
    }
    else {
      this.confirmacion = ('¿Está seguro que quiere editar el Dispositivo Médico ' + this.medicDispProd.descMedicDisp + '?');
    }

    const dialogRef = this.dialog.open(ConfirmacionNotaEntradaComponent, {
      autoFocus: false,
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
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
                // if (i.lote == this.medicDispProd.lote) {
                //   this.toastr.error("Lote ya Presente en la lista");
                //   this.medicDispProd.fechVenci = this.medicDispProd.fechaAuxiliar
                //   return;
                // }
              }
            }
          }
          this.medicDispProd.precioUnidad = []
          this.unidadesMedidas.forEach(element => {
            let aux = {
              idUnidad: element.idUnidad,
              nombreUnidad: element.nombreUnidad,
              precio: element.precio
            }
            console.log(aux);

            this.medicDispProd.precioUnidad.push(aux)

            if (element.idUnidad == this.medicDispProd.idUnidad) {
              this.medicDispProd.unidMed = aux;
            }
          });

          this.totalM = this.totalM + (this.medicDispProd.cantidad * this.medicDispProd.unidMed.precio);
        }
        else {
          if (this.medicDispProd.cantidad != null && this.medicDispProd.unidMed.precio != null) {
            this.totalM = this.medicDispProd.cantidad * this.medicDispProd.unidMed.precio;
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
        this.unidadesMedidas = [];
        this.minimaFecha = this.notaEntradaRequest.comprobanteFarmacia.feIngreso;
        this.cantidadAux = 0;
        this.disableMedic = false;
        this.showGuardar = 1;
        addNotaEntrada.resetForm();

      }
    });
  }

  cancelarEdicion(addNotaEntrada: NgForm) {

    this.totalM = this.totalM + this.cantidadAux;
    this.borrarJsonMedicDisp();
    this.medicDispMedicProdSanit = [];
    this.unidadesMedidas = []
    addNotaEntrada.resetForm();
    this.indiceAuxiliar = undefined;
    this.minimaFecha = this.notaEntradaRequest.comprobanteFarmacia.feIngreso;
    this.disableMedic = false;
    this.showGuardar = 1;
  }

  private editarMedicDisp(element, index) {

    let auxPrecio;
    try {

      this.cantidadAux = 0;
      this.disableMedic = true;
      this.showGuardar = 2;
      this.cantidadAux = (element.cantidad * element.unidMed.precio);
      this.totalM = this.totalM - (element.cantidad * element.unidMed.precio);

      this.medicDispProd = null;
      this.descripMedicDispMedicProducSanit = "";
      this.indiceAuxiliar = index;
      this.descripMedicDispMedicProducSanit = element.descMedicDisp;

      this.unidadesMedidas = [];
      console.log(element.precioUnidad);

      element.precioUnidad.forEach(element => {
        let aux = {
          idUnidad: element.idUnidad,
          nombreUnidad: element.nombreUnidad,
          precio: element.precio
        }
        this.unidadesMedidas.push(aux);
      });

      console.log(this.unidadesMedidas);
      auxPrecio = []
      element.precioUnidad.forEach(element => {
        let aux = {
          idUnidad: element.idUnidad,
          nombreUnidad: element.nombreUnidad,
          precio: element.precio
        }
        auxPrecio.push(aux)
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.medicDispProd = {
        idMedicDisp: element.idMedicDisp,
        codigoMedicDisp: element.codigoMedicDisp,
        descMedicDisp: element.descMedicDisp,
        concentracion: null,
        marca: null,
        fiTipo: element.fiTipo,
        cantidad: element.cantidad,
        regiSani: element.regiSani,
        fechVenci: (element.fechaAuxiliar),
        idUnidad: element.idUnidad,
        lote: element.lote,
        unidMed: element.unidMed,
        fechaAuxiliar: element.fechaAuxiliar,
        precioUnidad: auxPrecio
      };

    }
    console.log(this.arrayMedicDisp);

  }

  private getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
    let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
    console.log(param);
    this._movimientoService.getUnidadMedicamentoDispositivo(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.unidadesMedidas = data.listUnidad;
          console.log(data);
          
        } else {
          // this.toastr.error(data.mensaje);
          this.unidadesMedidas = []
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private isInvalid(_ngForm: any): boolean {
    return _ngForm['invalid'] || _ngForm['pending'] || this.notaEntradaRequest.comprobanteFarmacia.numeroDocumentoIngreso == "" || this.notaEntradaRequest.comprobanteFarmacia.numeroDocumentoIngreso == null || this.notaEntradaRequest.comprobanteFarmacia.numeroDocumentoIngreso == undefined ||
     this.medicDispProd.fechVenci == null || this.medicDispProd.fechVenci == undefined || this.medicDispProd.fechVenci == "" ||
      this.notaEntradaRequest.comprobanteFarmacia.proveedor == null || this.notaEntradaRequest.comprobanteFarmacia.proveedor == undefined || this.notaEntradaRequest.comprobanteFarmacia.proveedor == "" || this.medicDispProd.idMedicDisp == null || this.medicDispProd.idMedicDisp == undefined;
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