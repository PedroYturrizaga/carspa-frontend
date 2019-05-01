import { SuspensionCitaComponent } from './suspension-cita/suspension-cita.component';
import { equal } from './../../../../shared/helpers/custom-validators/ng4-validators/equal/validator';
import { log } from 'util';
import { date } from './../../../../shared/helpers/custom-validators/ng4-validators/date/validator';
import { element } from 'protractor';
import { Component, OnInit, Input, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager, Toast } from 'ng2-toastr';
import { PacientesCitadosComponent } from './pacientes-citados/pacientes-citados.component';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { CitaProcedimientoService } from '../../services/cita-procedimiento.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef  } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgbDatepickerConfig, NgbCalendar ,NgbDateStruct,NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { getCodUsuario } from "../../../../shared/auth/storage/cabecera.storage";
import { ReporteService } from '../../../../shared/services/reporte.service';
import { ModalPdfComponent } from '../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { VerProcedimientosComponent } from './ver-procedimientos/ver-procedimientos.component';

const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
};
@Injectable()
export class I18n {
  language = 'es';
}
@Component({
  selector: 'app-cita-procedimiento',
  templateUrl: './cita-procedimiento.component.html',
  styleUrls: ['./cita-procedimiento.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CitaProcedimientoComponent}]

})
export class CitaProcedimientoComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  displayedCitasProc = ['codigoCPT', 'Fecha', 'subseccion', 'descProcedimiento', 'tiempo', 'cantidadR', 'PrecioU', 'SubT', 'numeroActoM', 'Accion'];
  dataSource = new MatTableDataSource();

  displayedHistorialProc = ['Fecha', 'HIniTur', 'HFinTur', 'Subseccion', 'Medico', 'histProcedimiento','Consultorio'];
  dataSource2 = new MatTableDataSource();
  displayedReservaProc = ['Fecha', 'HIniTur', 'HFinTur', 'Medico','Consultorio','Estado','Pagado', 'Total','Cancelar','Ver', 'pdf'];
  dataSource3 = new MatTableDataSource();

  displayedDOCS = ['Fecha', 'Horario', 'nombreCompleto', 'pacientesCitados', 'TiempoR', 'Generar'];
  dataSourceDocs = new MatTableDataSource();

  displayedCitaProc = ['Fecha', 'HIniTur', 'HFinTur', 'Servicio', 'Acticidad', 'Medico', 'Precio', 'Accion'];
  dataSourceTablaCita = new MatTableDataSource();

  private pagination: any;
  private displayedSizes: number[];
  private pageSize;
  private showAutocomplete = 1;
  private filteredNumDocs = [];
  private idProc = [];
  private total = 0;
  private totalPrecios = null;
  private longitud = 0;

  private totalPrecioDecimal:any;

  //Show tablas
  private hideButton = 1;
  private showMedicos = 1;
  private showReservas = 1;
  private showProcedimientos = 1;
  private showTablaCitas = 1;
  private isValid = 0;
  private longitudDocumento = "?";
  private showFecha=1;
  static aux=0;
  static fechaFiltro=0;
  
  //Variables
  private tipoDoc = "";
  private idPersona: string = "";
  private nuDocumento: string = "";
  private numeroDocumentoIdentidad: string = "";
  private fecha: string = "";
  private longitudDoc: number = 0;
  private variable: number = 0;
  private aidiEspecialidad: string = "";
  private indiceTablaTemporal: 0;
  private send: string = "";
  private send1: string = "";
  private indiceArray: number = 0;
  private indiceArray2: number = 0;
  private contProcedimientos: number = 0;
  private pdf: String;

  //Listas
  private DocsIdentidad: any = [];
  private historial: any[] = [];
  private pacientesCitados: any = [];
  private valores: String[] = [];
  private idprocs: String[] = [];
  private tablaCita: any = [];
  private tipoDocs: any[];
  private listArea: any[];
  private listEspec: any[];
  private docsAtencion: any[];
  private procedimientoParaCita: any = [];
  private historialProcedimientos: any = [];
  private reservasProcedimientos: any = [];


  //boleanos
  private is_edit: boolean = false;
  private disableGenerar: boolean[] = [];
  private disableCheckBox: boolean[] = [];
  private verificacion: boolean[] = [];

  //Json
  private precioTurno: any = {};
  private datPaciente = {
    sexo: {}, tipoSangre: {}, gradoInstruccion: {}, estadoCivil: {}, ocupacion: {},
    tipoDocumentoIdentidad: {}, filiadoList: [{ ubigeo: {} }], historiaList: [{}], planList: []
  };
  private nombreCompleto = ""
  private anadirTabla: any = {
    fecha: "",
    hinitur: "",
    hifitur: "",
    servicio: "",
    actividad: "",
    idMedico: "",
    medico: "",
    precio: 0,
    idProcedimiento: "",
    idPersona: "",
    idProgramacion: 0,
    usuarioIns: getCodUsuario()
  };
  private obtenerDatosPaciente: any = { idPersona: "" };
  private getDoctor: any = { idEspecialidad: "" };
  private getidProcs: any = { idProcedimiento: "" };
  private obtenerNumeroDocumentos: any = { idTipoDocumento: 0, nuDocumento: "" };
  private getPacientesCitados: any = { fecha: "", turno: { horainicio: "", horaFin: "" }, idPersonal: "", idProgramacion: 0 };
  private buscarHoraxTurno: any = { idProcedimiento: "", idProgramacion: 0 };
  private obtenerEspecialidad = { idArea: 0, idPersona: "" };
  private obtenerSolicitudes = { idEspecialidad: 0, idArea: 0, idPersona: "" };
  private obtenerMedicos = { tiempo: 0, fecha: null, idEspecialidad: 0, idArea: 0, opcion: null };
  private today;
  private request = { idCitaProcedimiento: null, tipoFile: null };

  fecha1: NgbDateStruct;
  date: {year: number, month: number};
  @Input() idComprobante;
  constructor
    (
    private _otorgarCitaService: CitaProcedimientoService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private _reporteService: ReporteService,
    private router: Router,
    private calendar: NgbCalendar,
    ) {
      this.pagination = { numPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [5, 10, 15, 20];
      this.pageSize = this.displayedSizes[0];
  }

  private pageEvent($event) {
    // this.paginationParameter.numPagina = event.pageIndex;
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMedicos();
  }
  private getEspecialidades(i) {
    this.obtenerEspecialidad.idArea = i;
    this.obtenerEspecialidad.idPersona = this.idPersona;
    this._otorgarCitaService.ObtenerEspecialidades(this.obtenerEspecialidad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listEspec = data.especialidadList;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Especialidades: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }

  private getAreas() {
    this._otorgarCitaService.ObtenerAreas()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listArea = data.areaXPersonal;

        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Areas: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }
  private getTipoDocs() {
    this._otorgarCitaService.getTipoDocumentos()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDocs = data.lsComboTipoDoc;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Tipo de Documento: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  filterDocs(val: string) {
    this.DocsIdentidad = val ? this._filter(val) : this.DocsIdentidad;
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.DocsIdentidad.filter(value => value.numeroDocumentoIdentidad.toLowerCase().startsWith(filterValue));
  }
  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
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
  private getNumeroABuscar(numbusq) {
    this.DocsIdentidad = [];
    if (numbusq.length == 8) {
      this.obtenerNumeroDocumentos.idTipoDocumento = this.tipoDoc;
      this.obtenerNumeroDocumentos.nuDocumento = numbusq;
      this._otorgarCitaService.ObtenerNumeroDocs(this.obtenerNumeroDocumentos)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.personaList == [] || data.personaList.length == 0) {
              this.toastr.info("No hay Resultados");
              this.numeroDocumentoIdentidad = "";
            }
            else {
              this.DocsIdentidad = data.personaList;
              this.idPersona=this.DocsIdentidad[0].idPersona;
              this.showAutocomplete = 2;
              this.buscarPaciente();

            }
          }
          else {
            this.toastr.error(data.mensaje);
          }
          return true;
        },
          error => {
            this.toastr.error("Error al Obtener Numeros de Documento");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  private getIdPersona(jason) {
    this.numeroDocumentoIdentidad = jason.numeroDocumentoIdentidad;
    this.idPersona = jason.idPersona;
    this.DocsIdentidad = [];
    
  }
  private buscarPaciente() {
    this.showProcedimientos = 1;
    // if (isInvalid(_controlVar)) {
    //   return;
    // }
    this.obtenerDatosPaciente = { idPersona:this.idPersona };
    this._otorgarCitaService.getDatosPaciente(this.obtenerDatosPaciente)
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDoc = "";
          this.nuDocumento = "";
          this.numeroDocumentoIdentidad = "";
          this.datPaciente = data.personaList[0];
          this.nombreCompleto = this.datPaciente['apellidoPaterno'] + " " + this.datPaciente['apellidoMaterno'] + " " + this.datPaciente['nombres'];
          this.isValid = 1;
          this.showFecha=1;
          this.hideButton = 2;
          // this.obtenerProcedimientosParaCita(x,y);
          this.getAreas();
          this.getCitasReservadas();
          this.obtenerSolicitudes.idEspecialidad = null;
          this.obtenerEspecialidad.idPersona = null;
          this.getEspecialidades(0);
          this.obtenerMedicos.fecha = null;
          this.fecha = null;
          this.obtenerMedicos.opcion = null;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private obtenerProcedimientosParaCita() {
    this.obtenerSolicitudes.idArea = this.obtenerEspecialidad.idArea;
    this.obtenerSolicitudes.idPersona = this.idPersona;
    this._otorgarCitaService.ObtenerSolicitudes(this.obtenerSolicitudes)
      .subscribe(data => {
        console.log("obtener solicitudes"+this.obtenerSolicitudes)
        console.log(data);
        //hacer un foreach aqui
       
        if (data.estado == 1) {
          this.procedimientoParaCita = data.lsSolicitudProcedimiento;
          this.procedimientoParaCita.forEach(element => {
            element["precioUnitarioDecimal"]=parseFloat(element.precioUnitario).toFixed(2)
            element["subTotalDecimal"]=parseFloat(element.subTotal).toFixed(2)
          });
          this.dataSource = new MatTableDataSource(this.procedimientoParaCita);
          //LIMPIAR TABLAS-------------------------------------- 
          this.valores = [];
          this.idprocs = [];
          this.send = "";
          this.send1 = "";
          this.docsAtencion = [];
          this.showTablaCitas = 1;
          this.showMedicos = 1;
          this.sumaTiempos=0;
       
          //-----------------------------------------
          if (this.procedimientoParaCita.length == 0) {
            this.toastr.info("NO HAY ORDENES DE PROCEDIMIENTOS PARA ESTE PACIENTE");
            this.showProcedimientos=1;
          }
          else {
            this.total=0;
            // this.toastr.success("Procedimientos obtenidos exitosamente");
            this.showProcedimientos = 2;
            
            for (var i = 0; i < this.procedimientoParaCita.length; i++) {
              this.verificacion[i] = false;
              this.disableCheckBox[i] = false;
            }
            this.contProcedimientos = 0;
          }
        }
        else {
          this.toastr.warning("Seleccione especialidad ");
        }
        return true;
      },
        error => {
          console.warn("Seleccione especialidad ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private agregarIdProcedimiento(evnt) {
    this.idProc = [];
    for (let ls of this.procedimientoParaCita) {
      if (ls['checked']) {
        let json =
          {
            "idProcedimiento": ls.idProcedimiento,
          }
        this.idProc.push(json);
      }
    }
  }
  public getMedicos(numPagina?: number) {
   
    this.pagination.numPagina = (numPagina) ? numPagina : this.pagination.numPagina;
    Object.keys(this.obtenerMedicos).forEach(key => {
      this.obtenerMedicos[key] = (this.obtenerMedicos[key] === '') ? null : this.obtenerMedicos[key];
    });

    this.obtenerMedicos.idEspecialidad = this.obtenerSolicitudes.idEspecialidad;
    this.obtenerMedicos.idArea = this.obtenerSolicitudes.idArea;
    this.obtenerMedicos.tiempo = this.total;
    this.obtenerMedicos = {
      ...this.obtenerMedicos,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.obtenerMedicos);
    
    this._otorgarCitaService.ObtenerMedicos(this.obtenerMedicos)
      .subscribe(data => {
        if (data.estado == 1) {
          this.docsAtencion = data.lsMedicos;
          this.dataSourceDocs = new MatTableDataSource(this.docsAtencion);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.docsAtencion.length > 0) {
            this.pagination.nuRegisMostrar = this.docsAtencion[0].numTotalReg;
          }     
          
          if (this.docsAtencion.length == 0) {
            this.toastr.info("NO HAY MÉDICOS DISPONIBLES");
            this.isValid = 1;
            this.showMedicos =1;
          }
          else {
            this.showFecha=2;
            this.showMedicos = 2;
          }
      
        }
        else {
          // this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Médicos ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
 
  static selecFecha(f){
   this.aux=1;
   this.fechaFiltro=f;
  }
  static mes(f){
     this.aux=2;
     this.fechaFiltro=f;
    }
  private selectFecha() {
  if(CitaProcedimientoComponent.aux==1){
    this.obtenerMedicos.fecha =CitaProcedimientoComponent.fechaFiltro;
    this.obtenerMedicos.opcion = "D";
    this.pagination.numPagina = 1;
    this.pagination.nuRegisMostrar=5;
    this.getMedicos();
    }
    if(CitaProcedimientoComponent.aux==2){
      this.fechaSearch=null;
      this.obtenerMedicos.fecha =CitaProcedimientoComponent.fechaFiltro;
      this.obtenerMedicos.opcion = "M";
      this.pagination.numPagina = 1;
      this.getMedicos();
      this.fechaSearch=null;

      }
  }
  private sumaTiempos = 0;
  private lsprocedSoli: any[];
  // reciveMonth(evn){
  //   console.log("Cita procedimiento"+evn);
  // }

  private getTiempo(element, evnt) {
    this.sumaTiempos = 1;
    this.total = 0;
    this.totalPrecios = 0;
    for (let ls of this.procedimientoParaCita) {
      if (ls['checked']) {
        this.total += ls['tiempo'];
        this.totalPrecios = (+ls['subTotal'] + this.totalPrecios);
      //  element["descuento"] = parseFloat(element.descuento).toFixed(2);
  this.totalPrecioDecimal =parseFloat(this.totalPrecios).toFixed(2);
  console.log("precio decimal"+this.totalPrecioDecimal)
    }
      if(this.total==0){
        this.showFecha=1;
        this.obtenerMedicos.opcion="";
        this.obtenerMedicos.fecha="";
        this.pagination.numPagina = 1;
        this.pagination.nuRegisMostrar=5;
      }

    }
    this.agregarIdProcedimiento(evnt);
  }
  private showHistorial() {
    this.isValid = 2;
    this.hideButton = 1;
    this.showProcedimientos = 1;
    this._otorgarCitaService.getHistorialProcedimientos(this.idPersona)
      .subscribe(data => {
        if (data.estado == 1) {
          this.historialProcedimientos = data.lsCitaProcedimiento;
          this.dataSource2 = new MatTableDataSource(this.historialProcedimientos);
          if (this.historialProcedimientos.length == 0) {
            this.toastr.info("EL PACIENTE NO TIENE PROCEDIMIENTOS ATENDIDOS");
            this.closeHistorial();
          }else{
            this.showReservas=1;
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Procedimientos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private closeHistorial() {
    this.isValid = 1;
    this.hideButton = 2;
    if(this.obtenerSolicitudes.idEspecialidad!=null){
      this.showProcedimientos = 2;
    }
    else{
      this.showProcedimientos = 1;
    }
    if (this.reservasProcedimientos.length == 0) {
      this.showReservas = 1;
    }
    if (this.reservasProcedimientos.length != 0) {
      this.showReservas = 2;
    }
  }
  private getCitasReservadas() {
    this._otorgarCitaService.getCitasReservadas(this.idPersona)
      .subscribe(data => {
        if (data.estado == 1) {
          this.reservasProcedimientos = data.lsCitaReserva;
          this.dataSource3 = new MatTableDataSource(this.reservasProcedimientos);
          if (this.reservasProcedimientos.length == 0) {
            this.toastr.info("EL PACIENTE NO TIENE CITAS RESERVADAS");
            this.showReservas = 1;
          }
          else {
            this.showReservas = 2;
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Procedimientos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private obtenerComprobante(id,tipoFile) {
   
      this.request.idCitaProcedimiento = id;
      this.request.tipoFile = 2;
        this._otorgarCitaService.getObtenerComprobante(this.request).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
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
      maxWidth: '65%',
      width: '60%',
      maxHeight: '98%',
      height: '95%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.mystring = mystring;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private imprimePDF(id,tipoFile) {
    this.obtenerComprobante(id,tipoFile);
  }
  private openModalListarPacientes(medicojs, opcion, idProc, obtenerSolicitudes) {
        const dialogRef = this.dialog.open(PacientesCitadosComponent, {
      autoFocus: false,
      // maxWidth: '85%',
      // width: '85%',
      //  maxHeight: '100%',
      height: '80%',
      disableClose: true
    });
    dialogRef.componentInstance.medicojs = medicojs;
    dialogRef.componentInstance.opcion = opcion;
    dialogRef.componentInstance.idProc = idProc;
    dialogRef.componentInstance.obtenerSolicitudes = this.obtenerSolicitudes;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //si se confirmo la reserva de la cita
        this.obtenerProcedimientosParaCita();
        this.getCitasReservadas();
        this.showMedicos = 1;
        this.showFecha=1;
        this.total = 0;
        this.totalPrecios=0;
        this.fecha = "";
        this.sumaTiempos=0;
        this.obtenerMedicos.fecha = null;
        this.obtenerMedicos.opcion = null;

      }
      else {
        //modal cancelado o cerrado

      }
    });
  }
  private openModalProced(CitaProc) {
    const dialogRef = this.dialog.open(VerProcedimientosComponent, {
      autoFocus: false,
      // width: '60%',
      // height: '68%',
      disableClose: true
    });
    dialogRef.componentInstance.CitaProc = CitaProc;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //si se confirmo la suspencion de la cita
      }
      else {
        //modal cancelado o cerrado
        this.getCitasReservadas();
        if(this.obtenerSolicitudes.idEspecialidad!=null && this.procedimientoParaCita.length != 0){
          this.obtenerProcedimientosParaCita();
         }
        this.showFecha=1;
      }
    });
  }
  private openModalCancelar(CitaProc,op) {
    const dialogRef = this.dialog.open(SuspensionCitaComponent, {
      autoFocus: false,
      width: '30%',
      height: '38%',
      disableClose: true
    });
    dialogRef.componentInstance.CitaProc = CitaProc;
    dialogRef.componentInstance.op = op;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCitasReservadas();
        if(this.obtenerSolicitudes.idEspecialidad!=null){
         this.obtenerProcedimientosParaCita();
        }

      }
      else {

      }
    });
  }

  isDisabled(): boolean {
    return this.is_edit;
  }
  disabledGenerar(i): boolean {
    return this.disableGenerar[i];
  }
  private isInvalid(tipoDoc: any, numDoc: any): boolean {
    return tipoDoc == null || tipoDoc == undefined || numDoc == null ||
      numDoc == "" || numDoc == undefined || numDoc == undefined || this.numeroDocumentoIdentidad == "";
  }
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


  private orejitas : any = [];
  private arregloFinal : any = [];
  private fechaSearch:String;
  private visionFechaSearchTurnos:boolean = false;
  private daysColors(){
    this.visionFechaSearchTurnos = false;
    // let d = new Date();
    let days = {tiempo:this.total,
                idEspecialidad:this.obtenerSolicitudes.idEspecialidad,
                idArea:this.obtenerSolicitudes.idArea};
                
    this._otorgarCitaService.getDayColor(days).subscribe(data => {
          if (data.estado == 1) {
            this.arregloFinal = data.lsColores;
            this.visionFechaSearchTurnos = true;

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

  ngOnInit() {
    this.today =this.calendar.getToday();
    this.getTipoDocs();
    this.getAreas();
  }

}
