
import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { AperturaCierreCajaService } from '../../services/apertura-cierre-caja.service';
import { ReporteService } from '../../../../shared/services/reporte.service';
import { getIdUsuario, getCodUsuario } from '../../../../shared/auth/storage/cabecera.storage';
import { ReporteCierreCajaComponent } from './reporte-cierre-caja/reporte-cierre-caja.component';

@Component({
  selector: 'app-apertur-cierre-caja',
  templateUrl: './apertur-cierre-caja.component.html',
  styleUrls: ['./apertur-cierre-caja.component.scss'],
})
export class AperturCierreCajaComponent implements OnInit {

  private programacionPersonal = { idProgramacion: null, idTurno: null, descripcionTurno: null, periodoTurno: null, horaInicio: null, horaFinal: null, mensaje: null };

  private caja = { idCaja: null, descripcionCaja: null, abreviaturaAmbiente: null };

  private aperturaCaja: any = {
    idAperturaCaja: null, descripcionApertura: null, estadoCaja: null, fechaApertura: null, fechaCierre: null, montoApertura: null, montoCierre: null, saldoCaja: null,
    idCaja: null, idProgramacion: null, idUsuario: null, saldoFaltante: null, montoEfectivo: null, montoTarjeta: null, saldoEfectivo: null, saldoTarjeta: null,
    faltanteEfectivo: null, faltanteTarjeta: null, descripcionTurno: null, cajaChica: false
  };

  private request = {
    apertura: { descripcionAperturaCaja: null, idCaja: null, idProgramacion: null, idUsuario: null, montoApertura: null, turnoCaja: null },
    cierre: {
      idAperturaCaja: null, montoCierre: null, saldoCaja: null, saldoFaltante: null, montoEfectivo: null, montoTarjeta: null, saldoEfectivo: null, saldoTarjeta: null,
      faltanteEfectivo: null, faltanteTarjeta: null, observacion: null
    }
  };

  // private aperturarCajaRequest = { aperturaCaja: { montoApertura: 0, idProgramacion: 0, descripcionCaja: "", idCaja: null } };
  // private cierreCajaRequest = { idAperturaCaja: 0, idIPRESS: 0, montoCierre: 0, saldoCaja: 0 };
  // private aperturaCajaList: any[] = [];
  // private montoFinalRequest: 0;
  // private saldoFinalRequest: 0;

  // private chek: boolean = false;
  // private flghidden: boolean = false;
  // private flgbuttonAperturar: boolean = true;
  // private flgbuttoncerrar: boolean = false;
  // private flgButtonImprimir: boolean = false;
  // private flgButtonCalcular: boolean = true;

  // private isDisabledApertura: boolean = true;
  // private isDisabledOrigen: boolean = true;
  // private isDisabledTurno: boolean = true;
  // private isDisabledChekSinCaja: boolean = true;
  // private isDisabledCaja: boolean = true;
  // private isDisabledMontoFinal: boolean = true;
  // private isDisabledsaldoFinal: boolean = true;

  // private variable: boolean = false;

  constructor(
    private _aperturaCajaService: AperturaCierreCajaService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    private _modalDialog: MatDialog
  ) {
  }
  ngOnInit() {
    this.obtenerProgramacion();
    this.getAperturaCaja();
  }

  // private getaperturaCaja() {
  //   this._aperturaCajaService.obtenerAperturaCaja()
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.estado == 1) {
  //         this.aperturaCajaList = data.aperturaCaja;
  //         this.cierreCajaRequest.saldoCaja = this.aperturaCajaList["saldoCaja"];

  //         this.flginicial();
  //         this.isDisabledsaldoFinal = false;
  //       }

  //       else if (data.estado == -1) {
  //         this.toastr.error("No se pudo obtener la apertura de Caja");
  //         this.aperturaCajaList["descripcionOrigen"] = "No se puede obtener valor";
  //         this.aperturaCajaList["descripcionTurno"] = "No se puede obtener valor";
  //         this.aperturaCajaList["descripcionCaja"] = "No se puede obtener valor";

  //         this.flghidden = false;
  //         this.flgbuttonAperturar = false;
  //         this.flgbuttoncerrar = true;
  //         this.isDisabledApertura = true;
  //         // this.flgButtonImprimir = false;


  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //     err => { console.error(err) },
  //     () => {
  //       if (this.variable == false) {
  //         if (this.aperturaCajaList["idProgramacion"] != 0) {
  //           console.log("esta programado");
  //         } else {
  //           console.log("No esta programado");
  //           this.flgNoProgramado();
  //         }
  //         if (this.aperturaCajaList["estadoCaja"] == "1") {
  //           console.log("estado aperturado");
  //           this.flgAperturado();
  //         }
  //         if (this.aperturaCajaList["estadoCaja"] == "0") {
  //           console.log("Estado cerrado");
  //           this.flgCerrado();
  //           this.montoFinalRequest = this.aperturaCajaList["montoCierre"];
  //         }
  //       } else {
  //         this.flgAperturado();
  //         this.flgCerrado();
  //       }
  //     });
  // }

  // private aperturarCaja() {
  //   //comprueba que no este vacio el campo    
  //   if (this.chek == true) {
  //     this.aperturarCajaRequest.aperturaCaja.montoApertura = this.aperturarCajaRequest.aperturaCaja.montoApertura;
  //   }
  //   else if ((this.aperturarCajaRequest.aperturaCaja.montoApertura == null || this.aperturarCajaRequest.aperturaCaja.montoApertura == 0) && (this.aperturaCajaList["montoApertura"] == null || this.aperturaCajaList["montoApertura"] == 0)) {
  //     this.toastr.error('Debe ingresar un monto mayor a cero para aperturar Caja', 'AperturaCierreCaja');
  //     return;
  //   }
  //   this.aperturarCajaRequest.aperturaCaja.idProgramacion = this.aperturaCajaList["idProgramacion"];
  //   this.aperturarCajaRequest.aperturaCaja.descripcionCaja = this.aperturaCajaList["descripcionCaja"];
  //   this.aperturarCajaRequest.aperturaCaja.idCaja = this.aperturaCajaList["idCaja"];

  //   this._aperturaCajaService.insertarAperturaCaja(this.aperturarCajaRequest)
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.estado == 1) {
  //         this.toastr.success("Se insertó" + data.mensaje);
  //         this.getaperturaCaja();
  //         this.flgAperturado();
  //       } else {
  //         this.toastr.error("Error al aperturar caja " + data.mensaje)
  //       }
  //       return true
  //     },
  //     error => {
  //       console.error("Error al aperturar");
  //       return Observable.throw(error);
  //     }),
  //     err => console.error(err),
  //     () => { console.log('Request Complete') };

  //   this.apertura();
  //   this.getaperturaCaja();
  // }

  // private obtenerMontoFinal() {
  //   console.log(this.aperturaCajaList["idAperturaCaja"]);
  //   this._aperturaCajaService.obtieneMontoFinalCaja(this.aperturaCajaList["idAperturaCaja"])
  //     .subscribe(data => {
  //       console.log(data.montoFinal);
  //       if (data.estado == 1) {
  //         if (data.montoFinal == 0) {
  //           this.montoFinalRequest = 0;
  //           this.toastr.error("Problemas al obtener apertura");
  //         }
  //         this.montoFinalRequest = data.montoFinal;
  //         this.toastr.success("mensaje: " + data.mensaje);
  //       }
  //       else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //     err => { console.error(err) });
  // }

  // private cerrarCaja() {
  //   this.cierreCajaRequest.idAperturaCaja = this.aperturaCajaList["idAperturaCaja"];
  //   this.cierreCajaRequest.montoCierre = this.montoFinalRequest;

  //   this._aperturaCajaService.cierreCaja(this.cierreCajaRequest)
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.estado == 1) {
  //         this.toastr.success("Succes " + data.mensaje);
  //         this.getaperturaCaja();
  //         this.flgAperturado();
  //         this.flgCerrado();
  //       }
  //       else {
  //         this.toastr.error("Mensaje de Error " + data.mensaje);
  //         console.log("entra en 0");
  //       }
  //     },
  //     err => { console.error(err) });
  // }

  // private imprimirReporte() {
  //   console.log(this.aperturaCajaList["idAperturaCaja"]);

  //   this._aperturaCajaService.imprimirReporte(this.aperturaCajaList["idAperturaCaja"], 2)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         console.log(data.imprimeFile);
  //         this._reporteService.generar(null, data.imprimeFile, null);
  //       }
  //     },
  //     function (error) {
  //       console.error("Error");
  //     });
  // }

  // public apertura() {
  //   //muestra el form de Cierre de Caja
  //   if (this.flghidden != true) {
  //     this.flghidden = true;
  //   } else {
  //     this.flghidden = false;
  //   }
  // }

  // private habilita() {
  //   if (this.chek == true) {
  //     this.isDisabledApertura = false;
  //     console.log("con caja");
  //   } else {
  //     this.isDisabledApertura = true;
  //     console.log("sin caja");
  //     this.aperturarCajaRequest.aperturaCaja.montoApertura = 0;
  //   }
  // }

  // private flgAperturado() {
  //   this.flgButtonCalcular = true;
  //   this.isDisabledChekSinCaja = true;
  //   this.flghidden = true;
  //   this.isDisabledApertura = true;
  //   this.flgbuttonAperturar = false;
  //   this.flgbuttoncerrar = true;

  // }

  // private flgCerrado() {
  //   this.flgAperturado();
  //   this.isDisabledsaldoFinal = true;
  //   this.flgButtonCalcular = false;
  //   this.flgbuttoncerrar = false;
  //   this.flgButtonImprimir = true;
  // }

  // private flgNoProgramado() {
  //   this.isDisabledChekSinCaja = true;
  //   this.chek = false;
  //   this.isDisabledApertura = true;

  //   this.aperturaCajaList["descripcionOrigen"] = "-";
  //   this.aperturaCajaList["descripcionTurno"] = "-";
  //   this.aperturaCajaList["descripcionCaja"] = "-";
  //   this.aperturaCajaList["fhApertura"] = "-";
  //   this.aperturaCajaList["montoCierre"] = "-";

  //   this.flgbuttonAperturar = false;
  // }

  // private flginicial() {
  //   this.isDisabledApertura = false;
  //   this.isDisabledChekSinCaja = false;
  // }

  private obtenerProgramacion() {
    this._aperturaCajaService.obtenerProgramacionPorPersonal(getIdUsuario())
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          this.toastr.success(data.mensaje);
          this.programacionPersonal.idProgramacion = data.programacionPersonal.idProgramacion;
          this.programacionPersonal.idTurno = data.programacionPersonal.idTurno;
          this.programacionPersonal.descripcionTurno = data.programacionPersonal.descripcionTurno;
          this.programacionPersonal.periodoTurno = data.programacionPersonal.periodoTurno;
          this.programacionPersonal.horaInicio = data.programacionPersonal.hoInicio;
          this.programacionPersonal.horaFinal = data.programacionPersonal.hoFinal;
          this.caja.idCaja = data.programacionPersonal.idCaja;
          this.caja.descripcionCaja = data.programacionPersonal.descripcionCaja;
          this.caja.abreviaturaAmbiente = data.programacionPersonal.abreviaturaAmbiente;

          var ahorita = new Date();
          var horaIni = new Date('1111-11-11 ' + this.programacionPersonal.horaInicio);
          var horafina = new Date('1111-11-11 ' + this.programacionPersonal.horaFinal);

          if (horaIni.getHours() <= ahorita.getHours() && ahorita.getHours() <= horafina.getHours()) {
            if (horaIni.getHours() == ahorita.getHours()) {
              if (horaIni.getMinutes() < ahorita.getMinutes()) {
                this.programacionPersonal.mensaje = null;
              } else if (horaIni.getMinutes() == ahorita.getMinutes()) {
                if (horaIni.getSeconds() <= ahorita.getSeconds()) {
                  this.programacionPersonal.mensaje = null;
                } else {
                  this.programacionPersonal.mensaje = "Su programación para el día de hoy empieza a las " + this.programacionPersonal.horaInicio + ".";
                }
              } else {
                this.programacionPersonal.mensaje = "Su programación para el día de hoy empieza a las " + this.programacionPersonal.horaInicio + ".";
              }
            } else if (ahorita.getHours() == horafina.getHours()) {
              if (ahorita.getMinutes() < horafina.getMinutes()) {
                this.programacionPersonal.mensaje = null;
              } else if (ahorita.getMinutes() == horafina.getMinutes()) {
                if (ahorita.getSeconds() <= horafina.getSeconds()) {
                  this.programacionPersonal.mensaje = null;
                } else {
                  this.programacionPersonal.mensaje = "Su programación para el día de hoy terminó a las " + this.programacionPersonal.horaFinal + ".";
                }
              } else {
                this.programacionPersonal.mensaje = "Su programación para el día de hoy terminó a las " + this.programacionPersonal.horaFinal + ".";
              }
            }
          } else {
            this.programacionPersonal.mensaje = "Su programación para el día de hoy es de " + this.programacionPersonal.horaInicio + " a " + this.programacionPersonal.horaFinal + ".";
          }
        } else {
          // this.toastr.error(data.mensaje);
          this.programacionPersonal.mensaje = "Usted no tiene programación para el día de hoy.";
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getAperturaCaja() {
    this._aperturaCajaService.obtenerAperturaCajaPorPersonal(getIdUsuario())
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          // this.toastr.success(data.mensaje);
          this.aperturaCaja.idAperturaCaja = data.aperturaCaja.idAperturaCaja;
          this.aperturaCaja.descripcionApertura = data.aperturaCaja.descripcionApertura;


           this.aperturaCaja.estadoCaja = data.aperturaCaja.estadoCaja;
        //  this.aperturaCaja.estadoCaja = 2;


          this.aperturaCaja.fechaApertura = data.aperturaCaja.fhApertura;
          this.aperturaCaja.fechaCierre = data.aperturaCaja.fhCierre;
          this.aperturaCaja.montoApertura = data.aperturaCaja.montoApertura;
          if (data.aperturaCaja.montoApertura == 0) {
            this.aperturaCaja.cajaChica = true;
          }
          this.aperturaCaja.idCaja = data.aperturaCaja.idCaja;
          this.aperturaCaja.idProgramacion = data.aperturaCaja.idProgramacion;
          this.aperturaCaja.idUsuario = data.aperturaCaja.idUsuario;
          this.aperturaCaja.saldoFaltante = data.aperturaCaja.saldoFaltante;
          this.aperturaCaja.saldoEfectivo = data.aperturaCaja.saldoEfectivo;
          this.aperturaCaja.saldoTarjeta = data.aperturaCaja.saldoTarjeta;
          this.aperturaCaja.montoEfectivo = data.aperturaCaja.montoEfectivo;
          this.aperturaCaja.montoTarjeta = data.aperturaCaja.montoTarjeta;
          this.aperturaCaja.faltanteEfectivo = data.aperturaCaja.faltanteEfectivo;
          this.aperturaCaja.faltanteTarjeta = data.aperturaCaja.faltanteTarjeta;
          this.aperturaCaja.descripcionTurno = data.aperturaCaja.descripcionTurno;

          // this.aperturaCaja.montoCierre = this.obtenerMontoFinal(data.aperturaCaja.idAperturaCaja);
           this._aperturaCajaService.obtenerMontoFinalAperturaCaja(data.aperturaCaja.idAperturaCaja)
          // this._aperturaCajaService.obtenerMontoFinalAperturaCaja(103)
            .subscribe(dato => {
              if (dato.estado == 1) {
                // this.toastr.success(dato.mensaje);
                this.aperturaCaja.montoCierre = dato.montoFinal;
                this.aperturaCaja.montoEfectivo = dato.totalEfectivo;
                this.aperturaCaja.montoTarjeta = dato.totalTarjeta;
              } else {
                // this.toastr.error(dato.mensaje);
              }
            },
              error => {
                console.log(error);
              });

          if (data.aperturaCaja.estadoCaja == 0) {
            this.aperturaCaja.saldoCaja = data.aperturaCaja.saldoCaja;
          }
        } else {
          // this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  public insertarAperturarCaja(FormAperturarCierreCaja) {
    this.request.apertura.idCaja = this.caja.idCaja;
    this.request.apertura.idProgramacion = this.programacionPersonal.idProgramacion;
    this.request.apertura.descripcionAperturaCaja = this.caja.descripcionCaja + " - " + this.caja.abreviaturaAmbiente;
    this.request.apertura.montoApertura = this.aperturaCaja.montoApertura;
    this.request.apertura.idUsuario = getIdUsuario();
    this.request.apertura.turnoCaja = this.programacionPersonal.periodoTurno;

    this._aperturaCajaService.insertarAperturaCaja(this.request.apertura)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.request.apertura.idCaja = null;
          this.request.apertura.idProgramacion = null;
          this.request.apertura.descripcionAperturaCaja = null;
          this.request.apertura.montoApertura = null;
          this.request.apertura.idUsuario = null;
          this.request.apertura.turnoCaja = null;
          FormAperturarCierreCaja.resetForm();
          this.getAperturaCaja();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  public actualizarCerrarCaja(FormAperturarCierreCaja) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '50%',
      maxHeight: '80%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea cerrar la Caja " + this.caja.descripcionCaja + "?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.request.cierre.idAperturaCaja = this.aperturaCaja.idAperturaCaja;
        this.request.cierre.montoCierre = this.aperturaCaja.montoCierre;
        this.request.cierre.saldoCaja = this.aperturaCaja.saldoEfectivo + this.aperturaCaja.saldoTarjeta;
        this.request.cierre.saldoFaltante = this.aperturaCaja.saldoFaltante;
        this.request.cierre.montoEfectivo = this.aperturaCaja.montoEfectivo;
        this.request.cierre.montoTarjeta = this.aperturaCaja.montoTarjeta;
        this.request.cierre.saldoEfectivo = this.aperturaCaja.saldoEfectivo;
        this.request.cierre.saldoTarjeta = this.aperturaCaja.saldoTarjeta;
        this.request.cierre.faltanteEfectivo = this.aperturaCaja.faltanteEfectivo;
        this.request.cierre.faltanteTarjeta = this.aperturaCaja.faltanteTarjeta;

        this._aperturaCajaService.actualizarCerrarAperturaCaja(this.request.cierre)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.request.cierre.idAperturaCaja = null;
              this.request.cierre.montoCierre = null;
              this.request.cierre.saldoCaja = null;
              this.request.cierre.saldoFaltante = null;
              this.request.cierre.montoEfectivo = null;
              this.request.cierre.montoTarjeta = null;
              this.request.cierre.saldoEfectivo = null;
              this.request.cierre.saldoTarjeta = null;
              this.request.cierre.faltanteEfectivo = null;
              this.request.cierre.faltanteTarjeta = null;
              FormAperturarCierreCaja.resetForm();
              this.getAperturaCaja();
            } else {
              this.toastr.error(data.mensaje);
            }
          },
            error => {
              console.log(error);
            });
      }
    });
  }

  calcularFaltanteEfectivo() {
    let cal = this.aperturaCaja.montoEfectivo - this.aperturaCaja.saldoEfectivo;
    this.aperturaCaja.faltanteEfectivo = cal.toFixed(2);

    let sum = parseFloat(this.aperturaCaja.faltanteEfectivo) + parseFloat(this.aperturaCaja.faltanteTarjeta);
    if (this.aperturaCaja.faltanteTarjeta != null) {
      this.aperturaCaja.saldoFaltante = sum.toFixed(2);
    }
  }

  calcularFaltanteTarjeta() {
    let cal = this.aperturaCaja.montoTarjeta - this.aperturaCaja.saldoTarjeta;
    this.aperturaCaja.faltanteTarjeta = cal.toFixed(2);

    let sum = parseFloat(this.aperturaCaja.faltanteEfectivo) + parseFloat(this.aperturaCaja.faltanteTarjeta);
    if (this.aperturaCaja.faltanteEfectivo != null) {
      this.aperturaCaja.saldoFaltante = sum.toFixed(2);
    }
  }

  private imprimir() {
    const dialogRef = this._modalDialog.open(ReporteCierreCajaComponent, {
      autoFocus: false,
      maxWidth: '80%',
      width: '80%',
      maxHeight: '70%',
      height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.idAperturaCaja = this.aperturaCaja.idAperturaCaja
    dialogRef.componentInstance.saldoFaltante = this.aperturaCaja.saldoFaltante
    dialogRef.componentInstance.saldoCaja = this.aperturaCaja.saldoCaja

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        // this.obtenerSubActividad();
      }
    });
  }

  sinCajaChica() {
    if (this.aperturaCaja.montoApertura == null) {
      if (this.aperturaCaja.cajaChica == true) {
        this.aperturaCaja.montoApertura = null
      } else {
        this.aperturaCaja.montoApertura = 0
      }
    } else if (this.aperturaCaja.montoApertura == 0) {
      if (this.aperturaCaja.cajaChica == true) {
        this.aperturaCaja.montoApertura = null
      }
    }else if(this.aperturaCaja.montoApertura < 0){
      if (this.aperturaCaja.cajaChica == true) {
        this.aperturaCaja.montoApertura = null
      } else {
        this.aperturaCaja.montoApertura = 0
      }
    }

    console.log(this.aperturaCaja.montoApertura);
  }

  inputCajaChica() {

    if(this.aperturaCaja.montoApertura == null){

    }else{
      if (this.aperturaCaja.montoApertura <= 0) {
        this.aperturaCaja.montoApertura = 0;
        this.aperturaCaja.cajaChica = true;
      }//else{
      //   this.aperturaCaja.montoApertura = 0;
      // }
    }

    console.log(this.aperturaCaja.montoApertura);

    // if(this.aperturaCaja.montoApertura == 0){
    //   this.aperturaCaja.cajaChica = true;
    // }
  }

}
