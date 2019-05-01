import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { RealizarPagoService } from '../../../services/realizar-pago.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';
import { FormControl, NgForm } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { VisComprobanteComponent } from './vis-comprobante/vis-comprobante.component';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-realizar-pago',
  templateUrl: './realizar-pago.component.html',
  styleUrls: ['./realizar-pago.component.scss']
})
export class RealizarPagoComponent implements OnInit {
  // @ViewChild('') private _formMedioPago: NgForm;

  @ViewChild('formMedioPago') private _ngFormPadreDirectiva: NgForm;

  displayedColumns = ['MedioPago', 'Monto', 'eliminar'];
  dataSource = new MatTableDataSource();

  private mediosPago: any[] = [{ idTipoMedioPago: null, descripcionTipoPago: null }];
  private flgsearchSuccessful: boolean = false;
  private listaIndex = [
    // {
    //   "indice":null,
    //   "id_tipo_medio_pago": null,
    // }
  ];
  private jsonPago = [
    {
      "placeholder": "Monto 1",
      "id_tipo_medio_pago": null,
      "monto": null
    },
  ];

  private _param = { mp: null, monto: null };
  private lsmedioPago = [];

  private tOrden = { orden: null, fecha: null, area: null, descripción: null, cantidad: null, precioUnitario: null, precioSubTotal: null };
  private requestEliminar = { idComprobantePago: null }
  private requestInsert = {
    pago: {
      dataPago: [],
      idComprobantePago: null,
      idTipoComprobantePago: null,
      ruc: null,
      razonSocial: null,
      nombreCliente: null,
      direccionCliente: null,
      usuarioIns: null
    }
  };
  private total = 0;
  private igv = null;
  private subtotal = null;
  private montoTotal = null;
  private montoIn = null;
  private montoTotalDecimal: any;
  private idTipoMedio = null;

  @Input() idComprobante;
  @Output() sendIdComprobante = new EventEmitter<string>();

  constructor(private _realizarPagoService: RealizarPagoService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: "success-dialog"
    });
  }

  private detalleOrden: any = [];
  private medioPagoDecimales: any = [];
  dsOrden = new MatTableDataSource();
  dispOrden = ['idOrdenPago', 'fhIns', 'area', 'nombreItem', 'cantidad', 'precioUnitario', 'precioSubTotal']

  private send(_value) {
    let _params: any = { save: _value };
    //_params.generales = this.listaAntecedenteGeneral;
    this.sendIdComprobante.emit(_params);
  }
  private mostrarDatos() {
    // this.listarOrdenes();
    this.igv = this.detalleOrden[0].vIgv;
    this.subtotal = this.detalleOrden[0].subTotal;
  }
  private ocultarDatos() {
    this.igv = null;
    this.subtotal = null;
  }

  private GuardarComprobante(FormPago) {
    this.requestInsert.pago.idComprobantePago = this.idComprobante;
    this.requestInsert.pago.usuarioIns = getCodUsuario();
    this.requestInsert.pago.dataPago = this.lsmedioPago;
    if (this.montoTotal != this.total) {
      this.toastr.warning("El monto ingresado no es igual al total")
    } else {
      this._realizarPagoService.postInsertPago(this.requestInsert)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se registró correctamente el pago");
            this.requestInsert.pago.nombreCliente = null;
            this.requestInsert.pago.direccionCliente = null;
            this.requestInsert.pago.ruc = null;
            this.requestInsert.pago.razonSocial = null;
            this.montoTotal = null;
            this.jsonPago = [
              {
                "placeholder": "Monto 1",
                "id_tipo_medio_pago": null,
                "monto": null
              },
            ];
            this.requestInsert.pago.idTipoComprobantePago = null;
            this.openDialog(this.requestInsert.pago.idComprobantePago);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
          error => {
            console.log(error);
          });
    }
  }
  private getMedioPago() {
    this._realizarPagoService.getAllMedioPago()
      .subscribe(data => {
        if (data.estado == 1) {
          this.mediosPago = data.listaMedioPago;

        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private listarOrdenes() {
    this.requestInsert.pago.idComprobantePago = this.idComprobante;
    this._realizarPagoService.getAllOrdenes(this.idComprobante).subscribe(data => {
      if (data.estado == 1) {
        // this.toastr.success(data.mensaje);
        this.detalleOrden = data.detalleOrden;
        this.detalleOrden.forEach(element => {
          element["precioSubTotalVista"] = parseFloat(element.precioSubTotal).toFixed(2);
          element["precioUnitarioVista"] = parseFloat(element.precioUnitario).toFixed(2);
        });

        this.total = this.detalleOrden[0].total;

        this.dsOrden = new MatTableDataSource(this.detalleOrden);
        console.log(data)
        // this.detalleOrden.forEach(element => {
        //   this.suma += element.precioSubTotal;
        // });
      }
      else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err);
    () => this.toastr.success('Request Complete')

  }
  private eliminarComprobante() {
    this.requestEliminar.idComprobantePago = this.idComprobante;
    this._realizarPagoService.deleteComprobante(this.idComprobante).subscribe(data => {
      if (data.estado == 1) {
      }
      else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }, () => { this.send(false); }
    ),
      err => this.toastr.error(err);
    () => this.toastr.success('Request Complete')

  }
  ngOnInit() {
    this.getMedioPago();
    this.listarOrdenes();

  }
  private listMedioPago = [];
  agregarprueba() {

    if (this._param.monto == null || this._param.mp.idTipoMedioPago == null || this._param.monto <= 0) {
      this.toastr.warning("El monto debe ser mayor a 0");
      return;
    }

    this.montoTotal = +this._param.monto + this.montoTotal;
    this.calcularMonto();

    if (this.montoTotal > this.total) {
      // this.toastr.warning("El Monto excede al Total del Pago");
      return;
    }

    for (const { item, index } of this.mediosPago.map((item, index) => ({ item, index }))) {
      if (item.idTipoMedioPago == this._param.mp.idTipoMedioPago) {
        this.listMedioPago.push(this._param.mp);
        this.mediosPago.splice(index, 1);
        break;
      }
    }


    let param = { id_tipo_medio_pago: this._param.mp.idTipoMedioPago, descripcionTipoPago: this._param.mp.descripcionTipoPago, monto: this._param.monto };
    this.lsmedioPago.push(param);
    this._param.monto = null;

    this.dataSource = new MatTableDataSource(this.lsmedioPago);
    console.log(this.lsmedioPago);
    this.lsmedioPago.forEach(element => {
      element['montoDecimal'] = parseFloat(element.monto).toFixed(2)
    })
    // // this._ngFormDirectiva.resetForm();
    // // this._ngFormPadreDirectiva.form.controls.id_tipo_medio_pago.reset();
    // // this._ngFormPadreDirectiva.form.controls.monto;
    // this._param.monto = '';
    // this._param.mp = '';
    // console.log("despues", this._ngFormPadreDirectiva);

    // this.calcularMonto();
  }
  verify() {
    if (this._param.monto != null && this._param.mp != null) {
      return false;
    }
    return true;
  }

  eliminarprueba(item1) {

    for (const { item, index } of this.listMedioPago.map((item, index) => ({ item, index }))) {

      if (item.idTipoMedioPago == item1.id_tipo_medio_pago) {
        let jsonList = {
          "idTipoMedioPago": item1.id_tipo_medio_pago,
          "descripcionTipoPago": item1.descripcionTipoPago
        };
        this.mediosPago.push(jsonList);
        this.listMedioPago.splice(index, 1);
        break;
      }
    }

    let pos = 0;
    for (let v of this.lsmedioPago) {
      if (v.id_tipo_medio_pago == item1.id_tipo_medio_pago) {
        break;
      }
      pos++;
    }
    this.lsmedioPago.splice(pos, 1);
    this.dataSource = new MatTableDataSource(this.lsmedioPago);
    this.calcularMonto();
  }

  // agregar(num) {
  //   this.jsonPago.forEach(element => {
  //     this.montoIn = element.monto;
  //     this.idTipoMedio = element.id_tipo_medio_pago;
  //   });

  //   switch (num) {
  //     case 1:
  //       if (this.montoIn == null || this.idTipoMedio == null) {
  //         this.toastr.warning("No puede dejar ningún campo vacío")
  //       }
  //       else {
  //         let longitud = this.jsonPago.length;

  //         let json = {
  //           "placeholder": "Monto " + (longitud + 1),
  //           "id_tipo_medio_pago": null,
  //           "monto": null,
  //         };
  //         this.jsonPago.push(json);
  //         this.dataSource = new MatTableDataSource(this.jsonPago);
  //         break;
  //       }
  //   }
  // }

  // remover(num) {
  //   switch (num) {
  //     case 1:
  //       if (this.jsonPago.length === 1) {
  //         this.toastr.warning("No se puede eliminar todos lo campos")
  //       } else {
  //         this.jsonPago.pop();
  //       }
  //       this.calcularMonto();
  //       break;
  //   }

  // }
  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }
  calcularMonto() {
    this.montoTotal = 0;
    for (let x of this.lsmedioPago) {
      this.montoTotal = (+x['monto'] + this.montoTotal);
    }
    
    this.montoTotal = +this._param.monto + this.montoTotal;
    console.log(this.montoTotal, this._param.monto);
    this.montoTotalDecimal=parseFloat(""+this.montoTotal).toFixed(2);
    if (this.montoTotal > this.total) {
      this.toastr.warning("El monto ingresado es mayor que el total");
      this.montoTotal = this.montoTotal - this._param.monto;
      return this.montoTotalDecimal=parseFloat(""+this.montoTotal).toFixed(2);
    }

  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private regresaOrden(idComprobante?) {
    this.eliminarComprobante();

  }

  openDialog(idComprobante) {
    const dialogRef = this.dialog.open(VisComprobanteComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.idComprobante = idComprobante;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.send(true);
      }
      else {
        this.send(true);
      }
    });
  }
}
