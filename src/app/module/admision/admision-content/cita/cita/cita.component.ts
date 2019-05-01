import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CitaService } from '../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Router } from '@angular/router';
// import { WindowsInjetor } from '';
import { SearchPacienteComponent } from './search-paciente/search-paciente.component';
import { HistorialComponent } from './historial/historial.component';
import { ConfirmarCitaComponent } from './confirmar-cita/confirmar-cita.component';
import { SuspenderCitaComponent } from './suspender-cita/suspender-cita.component';
import { ReporteService } from '../../../../../shared/services/reporte.service';
import { SelectCitaComponent } from './select-cita/select-cita.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ModalMadresComponent } from "../../../../../shared/helpers/modal-madres/modal-madres.component";
import { ModalPdfComponent } from '../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {
  //tabla
  displayedColumns = ['idCita', 'fechaCita', 'horaAtencion', 'servicio', 'actividad', 'medicoTratante', 'consultorio', 'tipoCita', 'confirmado', 'pagado', 'confirmar', 'reprogramar', 'cancelar', 'imprimir'];
  dataSource = new MatTableDataSource();
  //tabla1
  displayedColumns2 = ['idCita', 'fechaCita', 'horaAtencion', 'servicio', 'actividad', 'medicoTratante', 'consultorio', 'tipoCita', 'estado'];
  dataSource2 = new MatTableDataSource();
  //tabla1
  displayedColumns3 = ['fchSolicitud', 'actoMedico', 'servicio', 'actividad', 'medicoTratante', 'destino', 'diasRecita', 'generar'];
  dataSource3 = new MatTableDataSource();

  private tipoDocumento: any[] = [];
  private numeroDocumento = null;
  private CombotipoDocumento = null;
  private confirmarNumeroDocumento = null;
  private confirmarCombotipoDocumento = null;

  private flgsearchSuccessful: boolean = false;
  private paciente: any[] = [];
  private flgDatosModal: any[] = [];
  private citas: any[] = [];
  private citaConfirmadas: any[] = [];
  private citaReservadas: any[] = [];
  private flgcitaReserv: boolean = false;
  private flgUltiCita: boolean = false;
  private tipoConfirmacion: number = 0;
  private flgActualizacionTableInterModal: any[] = [];
  private fielPDFCita: String = "";
  private flgCloseWindow: number = 0;
  private flgModalConfirmarSelectPlan: any[] = [];
  private longitudDocumento = "?";
  private solicitudCita: any[] = [];

  private paramJson: any = { numeroDocumento: null, CombotipoDocumento: null, flgOperacion: null, idCita: null, idArea: null, idEspecialidad: null, idActividad: null, idSubActividad: null, idPersonal: null, idDestino: null, idActoMedico: null };
  private asignarCitaDisabled: boolean = true;

  //Envio de dias de Atencion
  private diasAtencion: number[] = [];
  private arregloFinal: any[] = [];

  constructor(
    private _citaService: CitaService,
    private _reporteService: ReporteService,
    private toastr: ToastsManager,
    private router: Router,
    public dialog: MatDialog
  ) { }




  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
      this.numeroDocumento = null;
    }
    if (tipoDoc == 1) {
      this.longitudDocumento = '8';
    }
    if (tipoDoc == 2) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 3) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 4) {
      this.longitudDocumento = '15';
    }
  }
  private getTipoDocumento() {
    this._citaService.getAllTipoDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDocumento = data.tipoDocumentoList;
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private openModalBuscar() {
    // this.CombotipoDocumento = "0";
    // this.numeroDocumento = "";
    this.flgDatosModal = [];

    const dialogRef = this.dialog.open(SearchPacienteComponent, {
      autoFocus: false,
      maxWidth: '80%',
      maxHeight: '95%',
      disableClose: true,
    });

    dialogRef.componentInstance.tipoDocumento = this.tipoDocumento;
    dialogRef.componentInstance.paciente = this.paciente;
    dialogRef.componentInstance.flgDatosModal = this.flgDatosModal;
    dialogRef.afterClosed().subscribe(result => {
      if (this.flgDatosModal.length != 0) {
        this.flgsearchSuccessful = true;
        this.CombotipoDocumento = this.paciente[0]["tipoDocumento"];
        this.numeroDocumento = this.paciente[0]["numeroDocumentoIdentidad"];
        this.confirmarCombotipoDocumento = this.CombotipoDocumento;
        this.confirmarNumeroDocumento = this.numeroDocumento;
        this.getcitas();
      }
    });
  }

  private openModalHistorial() {
    const dialogRef = this.dialog.open(HistorialComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      disableClose: true,
    });
    dialogRef.componentInstance.paciente = this.paciente;
    dialogRef.afterClosed().subscribe(result => { }, reason => { });
  }

  // private supervalidacion(cita) {
  //   if (cita.condicionRouter == false) {
  //     const dialogRef = this.dialog.open(SelectCitaComponent, {
  //       autoFocus: false,
  //       hasBackdrop: true,
  //       maxWidth: '50%',
  //       height: '30%',
  //       disableClose: true
  //     });
  //     dialogRef.componentInstance.pacienteConf = cita;
  //     dialogRef.componentInstance.flgModalConfirmarSelectPlan = this.flgModalConfirmarSelectPlan;
  //     dialogRef.componentInstance.flgReprogra = true;
  //     dialogRef.componentInstance.CombotipoDocumento = this.confirmarCombotipoDocumento;
  //     dialogRef.componentInstance.numeroDocumento = this.confirmarNumeroDocumento;
  //     dialogRef.afterClosed().subscribe(result => { }, reason => {
  //       if (this.flgModalConfirmarSelectPlan[0] == 1) {
  //         this.getcitas();
  //       }
  //       this.flgModalConfirmarSelectPlan = [];
  //     });
  //   }
  // }

  private openModalConfirmacion(pacienteConf: any) {
    const dialogRef = this.dialog.open(ConfirmarCitaComponent, {
      autoFocus: false,
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
    });
    dialogRef.componentInstance.pacienteConf = pacienteConf;
    dialogRef.componentInstance.tipoConfirmacion = this.tipoConfirmacion;
    dialogRef.componentInstance.flgActualizacionTableInterModal = this.flgActualizacionTableInterModal;
    dialogRef.afterClosed().subscribe(result => {
      if (this.flgActualizacionTableInterModal[0] == 1) {
        // this.numeroDocumento = this.confirmarNumeroDocumento
        // this.CombotipoDocumento = this.confirmarCombotipoDocumento
        this.getcitas();
        this.flgActualizacionTableInterModal[0] = 0;
      }
    });
    // if (pacienteConf.supermodal == "ambos") {

    // } else {
    //   if (pacienteConf.supermodal == "planvig") {
    //     // pacienteConf.idPlan = this.coberturaVigente[0]["idPlan"];
    //   } else if (pacienteConf.supermodal == "suplan") {
    //     // pacienteConf.idPlan = pacienteConf.idPlan;
    //   }
    // }
  }

  private openModalSuspender(flgReserva: any, pacienteConf: any) {
    const dialogRef = this.dialog.open(SuspenderCitaComponent, {
      autoFocus: false,
      width: "25%",
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
    });
    dialogRef.componentInstance.pacienteConf = pacienteConf;
    dialogRef.componentInstance.flgReserva = flgReserva;
    dialogRef.componentInstance.flgActualizacionTableInterModal = this.flgActualizacionTableInterModal;
    dialogRef.afterClosed().subscribe(result => {
      if (this.flgActualizacionTableInterModal[0] == 1) {
        this.getcitas();
        this.flgActualizacionTableInterModal[0] = 0;
      }
    });
  }

  private getPaciente(_controlVar: any) {
    if (isInvalid(_controlVar)) {
      this.toastr.error("Debe completar todos los campos", "Buscar Paciente");
      this.flgsearchSuccessful = false;
      return;
    }
    this.confirmarCombotipoDocumento = this.CombotipoDocumento;
    this.confirmarNumeroDocumento = this.numeroDocumento;
    this._citaService.getPaciente(this.CombotipoDocumento, this.numeroDocumento, "", "", "")
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.pacienteList.length > 1) {
            this.openModalChoosePaciente(data.pacienteList)
          } else {
            this.paciente = data.pacienteList;
            if (this.paciente.length != 0) {
              this.flgsearchSuccessful = true;
              this.getcitas();
            } else {
              this.toastr.error("No se ha encontrado al paciente", "Gestionar cita");
              this.flgsearchSuccessful = false;
            }
          }
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      }),
      err => console.error(err),
      () => console.log('Request Complete');
    if (this.CombotipoDocumento == "") {
      this.CombotipoDocumento = "0";
    }

  }

  private getcitas() {
    this._citaService.getCitasPorPaciente(this.paciente[0].idPersona, 0)
      .subscribe(data => {
        if (data.estado == 1) {
          this.citaReservadas = [];
          this.citaConfirmadas = [];
          this.citas = data.citaList;
          console.log(this.paciente[0])

          console.log(data.citaList);


          for (let ct of this.citas) {

            if (ct.estadoCita == "R") {
              ct.flgOperacion = 4;
              if (ct.tipoCita == "Recita") {
                ct.flgOperacion = 2;
              } else if (ct.tipoCita == "Interconsulta") {
                ct.flgOperacion = 3;
              }

              if (ct.confirmacionCita == 1) {
                ct.descConfirmar = "Si";
              } else {
                ct.descConfirmar = "No";
              }

              if (ct.pagado == 1) {
                ct.descPagado = "Si";
              } else {
                ct.descPagado = "No";
              }

              this.citaReservadas.push(ct);
              this.dataSource = new MatTableDataSource(this.citaReservadas);

            } else {
              // CUANDO SE PAGA DEBE PASAR AL ESTADO PENDIENTE PERO PAGADO 
              this.citaConfirmadas.push(ct);
              this.dataSource2 = new MatTableDataSource(this.citaConfirmadas);
              // }
            }
          }
          this.flgcitaReserv = false;
          this.flgUltiCita = false;
          if (this.citaReservadas.length > 0) {
            this.flgcitaReserv = true;
          }
          if (this.citaConfirmadas.length > 0) {
            this.flgUltiCita = true;
          }
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  public imprimirReporte(idCita: number) {
    this._citaService.imprimirReporte(this.paciente[0]["idPersona"], idCita, 2, "NOMBRE DE IPRESS FATAL", "NOMBRE DE ADMISIONISTA")
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          // this._reporteService.generar(null, data.fileBase64, null);

          const dialogRef1 = this.dialog.open(ModalPdfComponent, {
            autoFocus: false,
            maxWidth: '90%',
            width: '80%',
            maxHeight: '95%',
            height: '95%',
            disableClose: false,
            panelClass: 'pdfs'
          });
          dialogRef1.componentInstance.mystring = "data:application/pdf;base64," + data.fileBase64;
          dialogRef1.afterClosed().subscribe(result => {
          });

        }
        else {
          console.log(data.mensaje);
        }
      },
      function (error) {
        console.error("Error al Listar");
      });
  }

  pruebademierda() {

    console.log(document.getElementsByClassName('carajo'))
    console.log(document.getElementsByTagName("mat-calendar"))
    // $( "#event" ).({
    //         beforeShowDay: function(date) {
    //             var current = $.datepicker.formatDate('yy-mm-dd', date);
    //             return $.inArray(current, ev) == -1 ? [true, ''] : [true, 'oc_days', 'ui-state-highlight'];
    //         },
    //         onSelect: function(dateText,inst){
    //              f=dateText;
    //              alert(f);
    //       },
    // });

  }


  redirige(flgOperacion, idCita, element) {
    // this.paramJson.numeroDocumento = this.confirmarNumeroDocumento;
    // this.paramJson.CombotipoDocumento = this.confirmarCombotipoDocumento;

    if (flgOperacion == 6) {
      this.paramJson.flgOperacion = flgOperacion;
      var fechaActual = new Date();
      var fechaOriginal = new Date(element.fechaCita + ' ' + element.horaAtencion);
      console.log(fechaOriginal, fechaActual);

      if (fechaOriginal >= fechaActual) {
        this.paramJson.pacienteRequest = this.paciente[0];
        this.paramJson.idCita = idCita;
        // this.paramJson.flVigencia = flVigencia;
        this.asignarCitaDisabled = false;
        console.log(element)
        // if (element) {
          this.paramJson.idArea = element.idArea;
          this.paramJson.idEspecialidad = element.idEspecialidad;
          this.paramJson.idActividad = element.idActividad;
          this.paramJson.idSubActividad = element.idSubActividad;
          this.paramJson.idDestino = element.idDestino;
          this.paramJson.idActoMedico = element.idActoMedico;
        // }
      } else {
        console.log("es mayor el actual");
        this.toastr.warning("La fecha actual es mayor a la fecha de la Cita");
      }

    } else {

      this.paramJson.pacienteRequest = this.paciente[0];
      this.paramJson.flgOperacion = flgOperacion;
      this.paramJson.idCita = idCita;
      // this.paramJson.flVigencia = flVigencia;
      this.asignarCitaDisabled = false;
      console.log(element)
      if (element) {
        this.paramJson.idArea = element.idArea;
        this.paramJson.idEspecialidad = element.idEspecialidad;
        this.paramJson.idActividad = element.idActividad;
        this.paramJson.idSubActividad = element.idSubActividad;
        this.paramJson.idPersonal = element.idPersonal;
        this.paramJson.idDestino = element.idDestino;
        this.paramJson.idActoMedico = element.idActoMedico;
      }

    }
  }

  sendcita(param: any) {
    this.asignarCitaDisabled = param;
    this.getcitas();
  }

  ngOnInit() {
    //
    //this.date ;
    this.diasAtencion = [1, 4, 10, 31];
    // this.arregloFinal = [{
    //   ano: 2018,
    //   mes: 9,
    //   dia: 1,
    //   color: "rojo"
    // }, {
    //   ano: 2018,
    //   mes: 9,
    //   dia: 2,
    //   color: "azul"
    // }, {

    //   ano: 2018,
    //   mes: 9,
    //   dia: 3,
    //   color: "amarillo"
    // },
    // {
    //   ano: 2018,
    //   mes: 10,
    //   dia: 2,
    //   color: "verde"
    // }];
    this.getTipoDocumento();
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

  private pacienteModal = [];
  private openModalChoosePaciente(thisArray: any) {
    this.pacienteModal = [];
    const dialogRef = this.dialog.open(ModalMadresComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      disableClose: true,
    });
    dialogRef.componentInstance.listFamiliares = thisArray;
    dialogRef.componentInstance.paciente = this.pacienteModal;
    dialogRef.afterClosed().subscribe(result => {

      if (this.pacienteModal.length == 1) {
        this.paciente = this.pacienteModal;

        this.flgsearchSuccessful = true;
        this.getcitas();
      }

    });
  }

  private getSolicitudCita(_controlVar: any) {
    this.solicitudCita = [];
    // if (isInvalid(_controlVar)) {
    //   this.toastr.error("Debe completar todos los campos", "Buscar Paciente");
    //   this.flgsearchSuccessful = false;
    //   return;
    // }

    let param = {
      tipoDocumentoIdentidad: null,
      numeroDocumentoIdentidad: null,
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: ""
    };

    param.tipoDocumentoIdentidad = this.CombotipoDocumento;
    param.numeroDocumentoIdentidad = this.numeroDocumento;
    this.confirmarCombotipoDocumento = this.CombotipoDocumento;
    this.confirmarNumeroDocumento = this.numeroDocumento;

    console.log(param);
    this._citaService.getSolicitudCita(param)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          console.log(data);
          this.solicitudCita = data.destinoActoMedicoList;
          console.log(this.solicitudCita);
          if (this.solicitudCita.length != 0) {
            this.flgsearchSuccessful = true;
            //this.getcitas();
            this.dataSource3 = new MatTableDataSource(this.solicitudCita);
          }
          if (this.solicitudCita.length == 0) {
            this.toastr.warning("No se encontraron Solicitudes");
            this.flgsearchSuccessful = false;
          }
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      }),
      err => console.error(err),
      () => console.log('Request Complete');
    if (this.CombotipoDocumento == "") {
      this.CombotipoDocumento = "0";
    }

  }
}
