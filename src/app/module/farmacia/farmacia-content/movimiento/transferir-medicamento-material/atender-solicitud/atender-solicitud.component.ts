import { Component, OnInit, Input, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MovimientoService } from '../../../../services/movimiento.service';
import { ReporteService } from '../../../../../../shared/services/reporte.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ModalPdfComponent } from '../../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { element } from 'protractor';

@Component({
  selector: 'app-atender-solicitud',
  templateUrl: './atender-solicitud.component.html',
  styleUrls: ['./atender-solicitud.component.scss']
})
export class AtenderSolicitudComponent implements OnInit {
  displayedColumnsComrobantes = ['Codigo', 'productFarma', 'formaFarma', 'Presentacion', 'Lote',
    'fechaVen', 'Marca', 'unidadMedida', 'cantidadSolicitada', 'cantidadAtendida', 'Stock'];
  matDataSource = new MatTableDataSource();

  private index: any = null;

  @Input() cabeceraSolicitud;
  @Input() idAlmacen;
  @Input() tipoAlmacen;

  private medicDispMedProducSani: any = [];
  private medicamentoLote: any[] = [];
  private descripLote: any[] = [];
  private tipoDocumentoFarmacia: null;
  private date = new Date();
  private position = 'above';
  private nuevoArrayDetallesComprobanteFarmacia = [];
  private pdf: String;

  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    public dialogRef: MatDialogRef<AtenderSolicitudComponent>,
    public dialog: MatDialog
  ) { }

  filterMeds(val: any) {
    this.medicamentoLote = val ? this._filter(val) : this.medicamentoLote = [];
  }

  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.medicamentoLote.filter(value => value.descripcionMedicamentoLote.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnInit() {
    //console.log(this.cabeceraSolicitud)
    this.getDetalleComprobanteFarmacia();
  }
  private getDetalleComprobanteFarmacia() {
    console.log(this.cabeceraSolicitud.idComprobante);

    this._movimientoService.getDetalleComprobanteFarmacia(this.cabeceraSolicitud.idComprobante)

      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.medicDispMedProducSani = data.comprobanteFarmaciaList[0];

          Object.keys(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']).forEach(key => {
            this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][key]["cantidadAtendida"] = "";
            this.descripLote.push({ descripcion: null })
          });

          for (let a of this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']) {
            let b = a.cantidadSolicitud.split(" / ");
            a.cantidadSolicitud = b[0];
          }
          /* if (this.cabeceraSolicitud.flEstadoComprobante == "E" || this.cabeceraSolicitud.flEstadoComprobante == "C") {
            this.concatenerListas();
          } */
          //console.log(this.medicDispMedProducSani.flEstadoComprobante);
          this.matDataSource = new MatTableDataSource(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
          // this.getMedicamentoLote();
        });
  }

  private limpiarMedicamentoLote(){
      this.medicamentoLote = [];
   
  }

  private getLotePromise(valor: any, params: any, index: any) {
    this.medicamentoLote = []
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].feVencimiento = null;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].stockLote = null;
    // this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].idMedicamentoLote = null;  
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].descripcionMedicamentoLote = null;
    // this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].idUnidad = null;
    let busquedaLote = { idAlmacen: null, idMedicamento: null, idDispMedicoProdSanitario: null, idUnidad: null };
    busquedaLote.idAlmacen = this.idAlmacen;
    console.log("params: ", params);
    busquedaLote.idUnidad = params.medicamento ? params.medicamento.idUnidad : params.dispMedicoProdSanitario.idUnidad;

    // if(params.idUnidad != null){
    //   busquedaLote.idUnidad = params.idUnidad;
    // }
    if (params.medicamento != null) {
      busquedaLote.idMedicamento = params.medicamento.idMedicamento;
    } else if (params.dispMedicoProdSanitario != null) {
      busquedaLote.idDispMedicoProdSanitario = params.dispMedicoProdSanitario.idDispMedicoProdSanitario;
    }

    console.log(busquedaLote);

    this._movimientoService.getMedicamentoLote(busquedaLote)
      .subscribe(data => {


        if (data.estado == 1) {
          console.log(data);
           this.medicamentoLote = []
          this.medicamentoLote = data.medicamentoLoteList;
          if (this.medicamentoLote.length === 0) {
            this.medicamentoLote = []

            this.toastr.warning("No hay lotes para este Producto Farmacútico/Dispositivo Médico");
          }
          else {
            this.filterMeds(valor);
            if (this.medicamentoLote.length === 0) {
              this.medicamentoLote = []
              this.toastr.warning("Lote que inicie con letra/palabra ingresada no encontrada, vuelva a intentar");
            }
          }
        } else {
          this.toastr.error(data.mensaje);
          this.medicamentoLote = [];
        }
      },
        err => {
          console.log(err);
        })
  }

  private selectMedicamentoLote(medicLote, i) {+
    console.log(medicLote);

    this.medicamentoLote = [];
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].feVencimiento = medicLote.feVencimiento;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].stockLote = medicLote.stockLote;
    //this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].idMedicamentoLote = medicLote.idMedicamentoLote;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].descripcionMedicamentoLote = medicLote.descripcionMedicamentoLote;
  }

  private insertarSolicitudAtendida(_ngForm: any) {
    console.log("Cabecera Solicitud", this.cabeceraSolicitud);
    console.log("id comprobante", this.cabeceraSolicitud.idComprobante);
    console.log("id Almacen", this.idAlmacen);
    console.log("tipo documento farmacia", this.tipoDocumentoFarmacia);

    if (isInvalid(_ngForm)) {
      this.toastr.info("Llene todos los campos correctamente");
      return;
    }

    let params = { tipoComprobante: null, notaSalidaRequest: null, transferenciaRequest: null };
    if (this.tipoAlmacen == 'G') {//Almacen General
      params.transferenciaRequest = { comprobanteFarmacia: { almacenOrigen: { idAlmacen: this.idAlmacen }, comprobanteFarmaciaOrigen: { idComprobante: this.cabeceraSolicitud.idComprobante }, tipoDocumentoFarmacia: { id: 3 }, comprobanteFarmaciaDetalleList: [] } };
      params.tipoComprobante = 1;
      delete params.notaSalidaRequest;
    } else if (this.tipoAlmacen == 'A') {//Almacen de la farmacia
      params.notaSalidaRequest = { comprobanteFarmacia: { almacenOrigen: { idAlmacen: this.idAlmacen }, comprobanteFarmaciaOrigen: { idComprobante: this.cabeceraSolicitud.idComprobante }, tipoDocumentoFarmacia: { id: 4 }, comprobanteFarmaciaDetalleList: [] } };
      params.tipoComprobante = 2;
      delete params.transferenciaRequest;
    }
    let comproFarmDetalle: any;
    for (let i of this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']) {
      if(i.flLote == 1){
          if (i.descripcionMedicamentoLote == null || i.descripcionMedicamentoLote == "" || i.descripcionMedicamentoLote == undefined) {
            this.toastr.error("Debe seleccionar todos los lotes respectivos y/o ingresar uno(s) válido(s)");
           return;
         }
        }
    //  }else{
    //    i.cantidadAtendida == 0;
    //  }

      comproFarmDetalle = {
        cantidad: null, feVencimiento: null, descripcionLote: null, //medicamentoLote: { idMedicamentoLote:  null  }
        idUnidad: null
      };
      if (i.medicamento != null || i.medicamento != undefined) {
        comproFarmDetalle.medicamento = { idMedicamento: i.medicamento.idMedicamento };
        comproFarmDetalle.idUnidad = i.medicamento.idUnidad;
      }
      if (i.dispMedicoProdSanitario != null || i.dispMedicoProdSanitario != undefined) {
        comproFarmDetalle.dispMedicoProdSanitario = { idDispMedicoProdSanitario: i.dispMedicoProdSanitario.idDispMedicoProdSanitario };
        comproFarmDetalle.idUnidad = i.dispMedicoProdSanitario.idUnidad;
      }
      comproFarmDetalle.cantidad = Number(i.cantidadAtendida);
      comproFarmDetalle.feVencimiento = i.feVencimiento;
      comproFarmDetalle.descripcionLote = i.descripcionMedicamentoLote;
      // comproFarmDetalle.medicamentoLote.idMedicamentoLote = i.idMedicamentoLote;
      // comproFarmDetalle.medicamento.idUnidad = i.idUnidad;

      if (params.tipoComprobante == 1) {
        params.transferenciaRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.push(comproFarmDetalle);
      } else if (params.tipoComprobante == 2) {
        params.notaSalidaRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.push(comproFarmDetalle);
      }
    }
    console.log(params);
    console.log(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']);

    //console.log(params)
    this._movimientoService.insertarComprobanteFarmaciaTransferencia(params)
      .subscribe(data => {
        console.log(data);

        if (data.estado == 1) {
          this.cabeceraSolicitud.idComprobante = data.idComprobante;
          this.toastr.success(data.mensaje);
          // _ngForm.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
          this.imprimirSolicitudPromise(2).then(() => {
            this.close();
          });
        });


  }

  private imprimirSolicitudPromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      console.log("idComprobante = ", this.cabeceraSolicitud.idComprobante);
      this._movimientoService.imprimirTransferenciaNotaSalida(this.cabeceraSolicitud.idComprobante).toPromise().then(data => {
        console.log(data);
        if (data.estado == 1) {
          if (tipoFile == 2) {
            this.pdf = "data:application/pdf;base64," + data.imprimeFile;
            this.pruebitaModal(this.pdf);
          }
          else {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        resolve();
      },
        err => {
          console.log(err);
        })
    })
    return promise
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

  private validarCantAtendida(_cantidadSolicitada: number, _stockLote: number): number {
    return (
      ((_stockLote === 0 || _stockLote === null) || (_cantidadSolicitada === 0 || _cantidadSolicitada === null)) ? 0 :
        (
          (_cantidadSolicitada === 0 || _cantidadSolicitada === null) ? _stockLote :
            (
              (_stockLote === 0 || _stockLote === null) ? _cantidadSolicitada :
                (
                  (_stockLote < _cantidadSolicitada) ? _stockLote : _cantidadSolicitada
                )
            )
        )
    );
  }

  close() {
    let _result = { id: 1, idComprobante: this.cabeceraSolicitud.idComprobante };
    this.dialogRef.close(_result);
  }

  dismiss() {
    let _result = { id: 0, idComprobante: this.cabeceraSolicitud.idComprobante };
    this.dialogRef.close(_result);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private verificarCantidades() {
    let verificar = 0;
    if (this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'] != null && this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'] != undefined) {
      Object.keys(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']).forEach(key => {
        if(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][key]["flLote"] == 1){
         if (this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][key]["cantidadAtendida"] == "") {
            verificar++;
         }
        }else{
          this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][key]["cantidadAtendida"] == 0
        }

      });
    }
    if (verificar != 0) {
      return true;
    }
    else return false;
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
}


// jason


// Comprobante Cabecera (JSON primer parametro)

//  {"almacenOrigen":{"idAlmacen":11},
//   "comprobanteFarmaciaOrigen":{"idComprobante":38},
//   "tipoDocumentoFarmacia":{"id":3}
//  }

// Detalle Comprobante (JSON segundo parametro)

// [ {

//   "cantidad":20,
//   "idUnidad":4,
//   "descripcionLote":"LotAbreboca",
//   "feVencimiento":"2019-04-25",
//   "dispMedicoProdSanitario":{"idDispMedicoProdSanitario":43},
//   "medicamentoLote":{"idMedicamentoLote":463}
//  },
//  {
//   "cantidad":10,
//   "idUnidad":1,
//   "descripcionLote":"LotAspirina",
//   "medicamento":{"idMedicamento":67,
//                  "feVencimiento":"2019-02-28",
//                  "codigo":"12345"},
//   "medicamentoLote":{"idMedicamentoLote":457}
//  }
// ]
