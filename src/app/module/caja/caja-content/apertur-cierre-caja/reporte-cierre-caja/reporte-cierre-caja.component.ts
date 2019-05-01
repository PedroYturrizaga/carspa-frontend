import { ModalPdfComponent } from './../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { Observable } from 'rxjs/Observable';
import { ReportCierreCajaService } from './../../../services/report-cierre-caja.service';
import { MatDialogRef, MatTableDataSource, MatDialog } from '@angular/material';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-reporte-cierre-caja',
  templateUrl: './reporte-cierre-caja.component.html',
  styleUrls: ['./reporte-cierre-caja.component.scss']
})
export class ReporteCierreCajaComponent implements OnInit {

  @Input() idAperturaCaja;

  @Input() saldoFaltante;
  @Input() saldoCaja;
  private pdf: String;
  private cabecera = { cajero: null, areaFisica: null, nombreCaja: null, horaCierre: null, turno: null, abreviaturaAmbiente: null, fechaCierre: null, horario: null, totalEfec: null, totalSinEfec: null, totalGeneral: null, saldoCaja: null, saldoFaltante: null, montoEfectivo: null, montoTarjeta: null, saldoEfectivo: null, saldoTarjeta: null, faltanteEfectivo: null, faltanteTarjeta: null }
  private cabeceraDecimal = { totalEfecDecimal: null, totalSinEfecDecimal: null, totalGeneralDecimal: null, saldoCajaDecimal: null, saldoFaltanteDecimal: null, montoEfectivoDecimal: null, montoTarjetaDecimal: null, saldoEfectivoDecimal: null, saldoTarjetaDecimal: null, faltanteEfectivoDecimal: null, faltanteTarjetaDecimal: null }
  private totalMontoPago = { efectivo: null, tarjetaCredito: null, tarjetaDebito: null, cheque: null, notaCredito: null, letra: null, facturaPorPagar: null }
  private request = { idAperturaCaja: null, tipoFile: null };
  private requestImpresion = { idAperturaCaja: null, tipoFile: null };
  private parametros = { idAperturaCaja: null, fiTipo: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionMedicamento: null };
  //Lista Tipo Pago Efectivo
  private pagoEfectivoList: any = [];
  dsPagoEfectivo = new MatTableDataSource();
  dispColPagoEfectivo = ['descripcionTipoComprobantePago', 'numeroComprobante', 'idCliente', 'paciente', 'montoPago'];

  //Lista Tipo Pago Tarjeta de Crédito
  private pagoTarjetaCreditoList: any = [];
  dsPagoTarjetaCredito = new MatTableDataSource();

  //Lista Tipo Pago Tarjeta de Débito
  private pagoTarjetaDebitoList: any = [];
  dsPagoTarjetaDebito = new MatTableDataSource();

  //Lista Tipo Pago Cheque
  private pagoChequeList: any = [];
  dsPagoCheque = new MatTableDataSource();

  //Lista Tipo Nota De Credito
  private pagoNotaCreditoList: any = [];
  dsPagoNotaDeCredito = new MatTableDataSource();

  //Lista Tipo Letra
  private pagoLetraList: any = [];
  dsPagoLetra = new MatTableDataSource();

  //Lista Factura por Pagar
  private pagoFacturaPorPagarList: any = [];
  dsPagoFacturaPorPagar = new MatTableDataSource();

  constructor(public dialogRef: MatDialogRef<ReporteCierreCajaComponent>,
    private toastr: ToastsManager,
    private _reporteCierreCajaService: ReportCierreCajaService,
    private _reporteService: ReporteService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.obtenerReporteCierreCaja();
    console.log(this.idAperturaCaja)
  }

  private obtenerReporteCierreCaja() {

    this.request.idAperturaCaja = this.idAperturaCaja;
    // this.request.idAperturaCaja=68;
    this.request.tipoFile = 2;

    this._reporteCierreCajaService.obtenerReporteCierreCaja(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data.listarDatosPersonalCierreCaja);
          this.toastr.success(data.mensaje);
          // this.aperturaCaja.idAperturaCaja = data.aperturaCaja.idAperturaCaja;
          this.cabecera.cajero = data.listarDatosPersonalCierreCaja[0].nombrePersonal;
          this.cabecera.areaFisica = data.listarDatosPersonalCierreCaja[0].areaFisica;
          this.cabecera.nombreCaja = data.listarDatosPersonalCierreCaja[0].nombreCaja;
          this.cabecera.horaCierre = data.listarDatosPersonalCierreCaja[0].horaCierre;
          this.cabecera.turno = data.listarDatosPersonalCierreCaja[0].turno;
          this.cabecera.fechaCierre = data.listarDatosPersonalCierreCaja[0].fechaCierre;
          this.cabecera.horario = data.listarDatosPersonalCierreCaja[0].horario;
          this.cabecera.abreviaturaAmbiente = data.listarDatosPersonalCierreCaja[0].abreviaturaAmbiente;

          this.cabecera.montoEfectivo = data.listarDatosPersonalCierreCaja[0].montoEfectivo;

          this.cabecera.montoTarjeta = data.listarDatosPersonalCierreCaja[0].montoTarjeta;

          this.cabeceraDecimal.montoEfectivoDecimal = parseFloat(this.cabecera.montoEfectivo).toFixed(2)
          console.log("mi cabecera decimal es" + this.cabeceraDecimal.montoEfectivoDecimal);

        
          this.cabeceraDecimal.montoTarjetaDecimal = parseFloat(this.cabecera.montoTarjeta).toFixed(2)
          console.log("mi monto Tarjeta decimal es" + this.cabeceraDecimal.montoTarjetaDecimal);

          this.cabecera.saldoEfectivo = data.listarDatosPersonalCierreCaja[0].saldoEfectivo;

          this.cabeceraDecimal.saldoEfectivoDecimal = parseFloat(this.cabecera.saldoEfectivo).toFixed(2)
          console.log("mi saldo efectivo es" + this.cabeceraDecimal.saldoEfectivoDecimal);

          this.cabecera.saldoTarjeta = data.listarDatosPersonalCierreCaja[0].saldoTarjeta;

          
          this.cabeceraDecimal.saldoTarjetaDecimal = parseFloat(this.cabecera.saldoTarjeta).toFixed(2)
          console.log("mi saldo efectivo es" + this.cabeceraDecimal.saldoTarjetaDecimal);
          
          this.cabecera.faltanteEfectivo = data.listarDatosPersonalCierreCaja[0].faltanteEfectivo;

          
          this.cabeceraDecimal.faltanteEfectivoDecimal = parseFloat(this.cabecera.faltanteEfectivo).toFixed(2)
          console.log("mi saldo efectivo es" + this.cabeceraDecimal.faltanteEfectivoDecimal);
          
          this.cabecera.faltanteTarjeta = data.listarDatosPersonalCierreCaja[0].faltanteTarjeta;

          
          this.cabeceraDecimal.faltanteTarjetaDecimal = parseFloat(this.cabecera.faltanteTarjeta).toFixed(2)
          console.log("mi saldo efectivo es" + this.cabeceraDecimal.faltanteTarjetaDecimal);
          

          console.log(this.cabecera.faltanteEfectivo);


          this.cabecera.totalEfec = data.totalEfec;
          this.cabecera.totalSinEfec = data.totalSinEfec;
          this.totalMontoPago.tarjetaDebito = data.totalDebito;
          this.totalMontoPago.tarjetaCredito = data.totalCredito;
          this.totalMontoPago.cheque = data.totalCheque;
          this.totalMontoPago.notaCredito = data.totalNotaCredito;
          this.totalMontoPago.letra = data.totalLetra;
          this.totalMontoPago.facturaPorPagar = data.totalFacturaPorPagar;
          this.cabecera.totalSinEfec = data.totalSinEfec;
          this.cabecera.totalGeneral = data.totalGeneral;
          this.cabecera.saldoFaltante = data.listarDatosPersonalCierreCaja[0].saldoFaltante;
          this.cabecera.saldoCaja = data.listarDatosPersonalCierreCaja[0].saldoCaja;

          console.log(data.listaReportePagosCaja)
          data.listaReportePagosCaja.forEach(element => {
            element["montoPagoDecimal"] = parseFloat(element.montoPago).toFixed(2);
          });
          data.listaReportePagosCaja.forEach(element => {
            if (element.idTipoMedioPago == 1) {
              this.totalMontoPago.efectivo = element.totalEfec;
              this.pagoEfectivoList.push(element);
            } else if (element.idTipoMedioPago == 2) {
              this.pagoTarjetaCreditoList.push(element);
            } else if (element.idTipoMedioPago == 3) {
              this.pagoTarjetaDebitoList.push(element);

            } else if (element.idTipoMedioPago == 4) {
              this.pagoChequeList.push(element);


            } else if (element.idTipoMedioPago == 5) {

              this.pagoNotaCreditoList.push(element);
            } else if (element.idTipoMedioPago == 6) {

              this.pagoLetraList.push(element);
            } else if (element.idTipoMedioPago == 7) {

              this.pagoFacturaPorPagarList.push(element);
            }
            else {
            }
          });

          console.log(this.pagoChequeList);

          if (this.pagoTarjetaCreditoList.length == 0) {
            console.log("Pago cheque vacio.");
          } else {
            console.log("Pago cheque tiene datos.");
          }

          this.dsPagoEfectivo = new MatTableDataSource(this.pagoEfectivoList);
          this.dsPagoTarjetaCredito = new MatTableDataSource(this.pagoTarjetaCreditoList);
          this.dsPagoTarjetaDebito = new MatTableDataSource(this.pagoTarjetaDebitoList);
          this.dsPagoCheque = new MatTableDataSource(this.pagoChequeList);
          this.dsPagoNotaDeCredito = new MatTableDataSource(this.pagoNotaCreditoList);
          this.dsPagoLetra = new MatTableDataSource(this.pagoLetraList);
          this.dsPagoFacturaPorPagar = new MatTableDataSource(this.pagoFacturaPorPagarList);
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


  private obtenerReporteCierreCajaImpresion(tipoFile) {

    let promise = new Promise((resolve, reject) => {
      // this.requestImpresion.idAperturaCaja=103;
      this.requestImpresion.idAperturaCaja = this.idAperturaCaja;
      this.requestImpresion.tipoFile = tipoFile;

      this._reporteCierreCajaService.obtenerReporteCierreCaja(this.requestImpresion)
        .subscribe(data => {
          if (data.estado == 1) {
            console.log(data.listarDatosPersonalCierreCaja);
            this.toastr.success(data.mensaje);
            // this.aperturaCaja.idAperturaCaja = data.aperturaCaja.idAperturaCaja;
            this.cabecera.cajero = data.listarDatosPersonalCierreCaja[0].nombrePersonal;
            this.cabecera.areaFisica = data.listarDatosPersonalCierreCaja[0].areaFisica;
            this.cabecera.nombreCaja = data.listarDatosPersonalCierreCaja[0].nombreCaja;
            this.cabecera.horaCierre = data.listarDatosPersonalCierreCaja[0].horaCierre;
            this.cabecera.turno = data.listarDatosPersonalCierreCaja[0].turno;
            this.cabecera.fechaCierre = data.listarDatosPersonalCierreCaja[0].fechaCierre;
            this.cabecera.horario = data.listarDatosPersonalCierreCaja[0].horario;
            this.cabecera.abreviaturaAmbiente = data.listarDatosPersonalCierreCaja[0].abreviaturaAmbiente;
            this.cabecera.montoEfectivo = data.listarDatosPersonalCierreCaja[0].montoEfectivo;
            this.cabecera.montoTarjeta = data.listarDatosPersonalCierreCaja[0].montoTarjeta;
            this.cabecera.saldoEfectivo = data.listarDatosPersonalCierreCaja[0].saldoEfectivo;
            this.cabecera.saldoTarjeta = data.listarDatosPersonalCierreCaja[0].saldoTarjeta;
            this.cabecera.faltanteEfectivo = data.listarDatosPersonalCierreCaja[0].faltanteEfectivo;
            this.cabecera.faltanteTarjeta = data.listarDatosPersonalCierreCaja[0].faltanteTarjeta;


            this.cabecera.totalEfec = data.totalEfec;
            this.cabecera.totalSinEfec = data.totalSinEfec;
            this.totalMontoPago.tarjetaDebito = data.totalDebito;
            this.totalMontoPago.tarjetaCredito = data.totalCredito;
            this.totalMontoPago.cheque = data.totalCheque;
            this.totalMontoPago.notaCredito = data.totalNotaCredito;
            this.totalMontoPago.letra = data.totalLetra;
            this.totalMontoPago.facturaPorPagar = data.totalFacturaPorPagar;
            this.cabecera.totalSinEfec = data.totalSinEfec;
            this.cabecera.totalGeneral = data.totalGeneral;
            this.cabecera.saldoFaltante = data.listarDatosPersonalCierreCaja[0].saldoFaltante;
            this.cabecera.saldoCaja = data.listarDatosPersonalCierreCaja[0].saldoCaja;
            data.listaReportePagosCaja.forEach(element => {
              if (element.idTipoMedioPago == 1) {
                this.totalMontoPago.efectivo = element.totalEfec;
                //   this.pagoEfectivoList.push(element);
              } else if (element.idTipoMedioPago == 2) {
                this.pagoTarjetaCreditoList.push(element);
              } else if (element.idTipoMedioPago == 3) {
                // this.pagoTarjetaDebitoList.push(element);

              } else if (element.idTipoMedioPago == 4) {
                //this.pagoChequeList.push(element);


              } else if (element.idTipoMedioPago == 5) {

                //this.pagoNotaCreditoList.push(element);
              } else if (element.idTipoMedioPago == 6) {

                this.pagoLetraList.push(element);
              } else if (element.idTipoMedioPago == 7) {

                //this.pagoFacturaPorPagarList.push(element);
              }
              else {
              }
            });

            console.log(this.pagoChequeList);

            if (this.pagoTarjetaCreditoList.length == 0) {
              console.log("Pago cheque vacio.");
            } else {
              console.log("Pago cheque tiene datos.");
            }

            this.dsPagoEfectivo = new MatTableDataSource(this.pagoEfectivoList);
            this.dsPagoTarjetaCredito = new MatTableDataSource(this.pagoTarjetaCreditoList);
            this.dsPagoTarjetaDebito = new MatTableDataSource(this.pagoTarjetaDebitoList);
            this.dsPagoCheque = new MatTableDataSource(this.pagoChequeList);
            this.dsPagoNotaDeCredito = new MatTableDataSource(this.pagoNotaCreditoList);
            this.dsPagoLetra = new MatTableDataSource(this.pagoLetraList);
            this.dsPagoFacturaPorPagar = new MatTableDataSource(this.pagoFacturaPorPagarList);
            ///////////////
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

  private imprimePDF(tipoFile) {
    this.obtenerReporteCierreCajaImpresion(tipoFile);
  }

  /* private imprimirReportePromise(tipoFile) {
     let promise = new Promise((resolve, reject) => {
       this.parametros.fiTipo = this.paramsBusqueda.fiTipo;
       this.parametros.idMedicamento = this.paramsBusqueda.idMedicamento;
       if (this.parametros.idMedicamento == null || this.parametros.idMedicamento == undefined) {
         this.parametros.descripcionMedicamento = "Todos los productos/dispositivos médicos";
       }
       if (this.paramsBusqueda.fiTipo == "M" || this.parametros.fiTipo == "M") {
         this.parametros.noTipo = "Producto Farmacéutico";
       }
       else if (this.paramsBusqueda.fiTipo == "D" || this.parametros.fiTipo == "D") {
         this.parametros.noTipo = "Dispositivo Médico Producto Sanitario";
       }
       this.parametros.tipoFile = tipoFile;
       this._reporteFarmaciaService.getAbastecimiento_Reporte(this.parametros).toPromise().then(data => {
         if (data.estado == 1) {
           if (tipoFile == 2) {
             this.pdf = "data:application/pdf;base64,"+data.imprimeFile;
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
   }*/


  close(add) {
    this.dialogRef.close(add);
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
}