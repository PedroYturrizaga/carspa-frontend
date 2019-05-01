import { AtencionMedicaAmbulatoriaService } from './../../../services/atencion-medica-ambulatoria.service';
import { DataService } from './../../../../../shared/services/data.service';
import { date } from './../../../../../shared/helpers/custom-validators/ng4-validators/date/validator';
import { Component, OnInit } from '@angular/core';
import { ConfirmarAusenciaComponent } from './confirmar-ausencia/confirmar-ausencia.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { AtencionProcedimientosService } from '../../../services/atencion-procedimientos.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { getIdUsuario } from '../../../../../shared/auth/storage/cabecera.storage';
import { Util } from '../../../../../shared/helpers/util/util';

@Component({
  selector: 'app-atencion-de-procedimientos',
  templateUrl: './atencion-de-procedimientos.component.html',
  styleUrls: ['./atencion-de-procedimientos.component.scss']
})
export class AtencionDeProcedimientosComponent implements OnInit {

  //tabla1
  displayedColumns = ['especialidad', 'descActividad', 'hoInicio', 'hoFinal', 'descAmbiente', 'estado'];
  dataSource = new MatTableDataSource();
  //tabla1
  displayedColumns1 = ['ordenAtencion', 'nombreCompleto', 'edad', 'historiaClinica', 'grupoEtareo', 'estado', 'atender'];
  dataSource1 = new MatTableDataSource();


  // private FechaCompleta; //HOY STRING SIEMPRE
  // private primeraFecha; // HOY ngModel DATE VARIABLE
  // private idCitaProcedimientoAnular = 0;
  // private fechaFiltro = ""; //DATE PARSEADA PARA BUSQUEDA
  // private idPersonal = "14618264600";

  // private getPacientes: any = [];
  // private pacientesCitados: any = [];
  // private atendido: any = [];
  // private noSePresento: any = [];
  // private atender: any = 1;
  // private noPresento: any = 1;

  // private getCitasDoc: any = { fecha: "", idArea: 1 };

  // private getPersonal: any = {
  //   numeroDocumento: null,
  //   apellidoPaternoPersonal: null,
  //   apellidoMaternoPersonal: null,
  //   nombrePersonal: null,
  //   idPersonal: null,
  //   idPersonalEncript: null,
  //   numPagina: 1,
  //   numRegistroMostrar: 1,
  //   numeroCmp: null,
  // };
  private showformProcedimiento: boolean = false;
  private citaParam: any;

  private datosPersonal: any = {
    apellidoPaternoPersonal: "",
    apellidoMaternoPersonal: "",
    nombrePersonal: "",
    descripcionTipoDocumentoIdentidad: "",
    numeroDocuentoIdentidad: "",
  };

  // private options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // private router;
  private idCitaProc = "";
  // private cambiarEstado = false;

  private _params = {
    idPersonalEncript: null, //"QzN0inAQvDG4DP21w8LnfA==",
    feProgramacion: null
  };

  private lsProgramacionCitaPorPersonal: any[];
  private lsProgramacionCitaPorProgramacion: any[];

  constructor(private _router: Router,
    private toastr: ToastsManager,
    private _atenderProcedimientoService: AtencionProcedimientosService,
    public dialog: MatDialog,
    private ds: DataService,
    private _route: ActivatedRoute,
    private _atencionMedicaAmbulatoriaService: AtencionMedicaAmbulatoriaService,
    private _util: Util
  ) {
    this._params.idPersonalEncript = getIdUsuario();
    // this.getPersonal.idPersonalEncript = getIdUsuario();
    // this._route.queryParams.subscribe(params => {
    //   this.cambiarEstado = params["cambiarEstado"];
    // });
    // if (this.cambiarEstado) {
    //   this.ds.sendData('goToAtencionProcedimiento');
    // }
    // this.router = _router;
    // this.primeraFecha = new Date();
  }

  private getDatosPersonal() {
    console.log(this._params);
    
    this._atenderProcedimientoService.getDatosPersonal(this._params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.datosPersonal = data.personalList[0];
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos Del Doctor: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getListaCitaxProgramacion() {
    // this.idProgramacion = null;

    // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let param: any = { feProgramacion: this._util.parseFetch(this._params.feProgramacion), idPersonal: this._params.idPersonalEncript };

    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaAmbulatoriaService.getListaCitaxPersonalProcedimiento(param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.lsProgramacionCitaPorPersonal = data.lsProgramacionCitaPorPersonal;
            console.log(this.lsProgramacionCitaPorPersonal);
            if (this.lsProgramacionCitaPorPersonal.length > 0) {
              // for (let key in this.lsProgramacionCitaPorPersonal) {
              //   this.estado = (this.lsProgramacionCitaPorPersonal[key].flEstado == 1) ? 'ACTIVO' : 'INACTIVO';
              // }
            } else {
              // this.idProgramacion = null;
              this.toastr.warning("No hay citas Reservadas", "Advertencia")
            }
            this.dataSource = new MatTableDataSource(this.lsProgramacionCitaPorPersonal);
            this.lsProgramacionCitaPorProgramacion = null;
            this.dataSource1 = new MatTableDataSource();
          } else {
            this.toastr.error("No se obtuvieron los horarios programados" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;

  }

  private tablePacientesCitados(idProgramacion) {
    // this.idProgramacion = idProgramacion;
    console.log("idProgramacion");
    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaAmbulatoriaService.getListaCitaxProgramacionProcedimiento(idProgramacion)
        .toPromise().then(data => {
          if (data.estado == 1) {
            // debugger
            this.lsProgramacionCitaPorProgramacion = data.lsCitadoPorProgramacion;
            if (this.lsProgramacionCitaPorProgramacion.length != 0) {
              this.dataSource1 = new MatTableDataSource(this.lsProgramacionCitaPorProgramacion);
              if (this.lsProgramacionCitaPorProgramacion[0].idEstadoCita == "S") {
                // this.cambiarColorRow(this.lsProgramacionCitaPorProgramacion[0].idCitaEncrip, "");
              }
            } else {
              this.toastr.warning("No tiene Citas Asginadas");
              this.dataSource1 = new MatTableDataSource();
            }
            console.log(this.lsProgramacionCitaPorProgramacion);
          } else {
            this.toastr.error("No se obtuvieron la lista des Citas" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  ingresar(elements: any) {
    this.showformProcedimiento = true;
    this.citaParam = elements;
    console.log("CitaParams ", this.citaParam);
    // localStorage.setItem('idActoMedicoEncriptado',this.citaParam.idActoMedicoEncrip);
    // localStorage.setItem('idAtencionEncriptado',this.citaParam.idAtencionEncrip);
    this.atenderPaciente(elements);
  }

  requestProcedimiento(_evnt: any) {
    this.showformProcedimiento = false;
  }
  // private nosePresento(cancelarCita) {
  //   this.idCitaProcedimientoAnular = cancelarCita.idCitaProcedimiento;
  //   const dialogRef = this.dialog.open(ConfirmarAusenciaComponent, {
  //     autoFocus: false,
  //     width: '25%',
  //     height: '63%',
  //     disableClose: true
  //   });
  //   dialogRef.componentInstance.idCitaProcedimientoAnular = this.idCitaProcedimientoAnular;
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result > 0) {
  //       this.primeraFecha = new Date();
  //       this.fechaFiltro = ((this.primeraFecha).toLocaleDateString('es-PE', this.options));
  //       this.getPacientesCitados(this.fechaFiltro);
  //     }
  //   });
  // }
  // private getFecha(event) {
  //   this.fechaFiltro = ((event.value).toLocaleDateString('es-PE', this.options));
  //   this.getPacientesCitados(this.fechaFiltro);
  // }
  // private getPacientesCitados(fechaBuscar) {
  //   this.pacientesCitados = [];
  //   this.getCitasDoc = {
  //     fecha: fechaBuscar,
  //     idArea: 1
  //   };
  //   this._atenderProcedimientoService.getCitasAtencion(this.getCitasDoc)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         if (data.lsCitaProcedimiento.length == 0) {
  //           this.showCitados = 1;
  //           if (fechaBuscar == this.FechaCompleta) {
  //             this.toastr.info("No Tiene Procedimientos Programados para Hoy.");
  //           }
  //           else {
  //             this.toastr.info("No Tiene Procedimientos Programados para tal Fecha");
  //           }
  //         }
  //         else {
  //           this.pacientesCitados = data.lsCitaProcedimiento;
  //           this.showCitados = 2;
  //           if (fechaBuscar == this.FechaCompleta) {
  //             this.displayedColumnsPacientesCitados = ['numeroCita', 'nombreCompleto', 'historiaClinica', 'actoMedico',
  //               'Estado', 'Atender', 'noPresento'];
  //             this.atender = 2;
  //             this.noPresento = 2;
  //             for (var i = 0; i < this.pacientesCitados.length; i++) {
  //               if (this.pacientesCitados[i].estadoCita == "Atendida" || this.pacientesCitados[i].estadoCita == "Suspendida") {
  //                 this.atendido[i] = 2
  //                 this.noSePresento[i] = 2;
  //               }
  //               if (this.pacientesCitados[i].estadoCita == "Pendiente") {
  //                 this.atendido[i] = 1
  //                 this.noSePresento[i] = 1;
  //               }
  //               if (this.pacientesCitados[i].estadoPendientes == 1) {
  //                 this.noSePresento[i] = 2;
  //               }
  //             }

  //           }
  //           else {
  //             // this.displayedColumnsPacientesCitados = ['numeroCita', 'nombreCompleto', 'historiaClinica', 'actoMedico',
  //             //                        'Estado'];
  //             // this.atender = 1;
  //             // this.noPresento = 1;

  //             this.displayedColumnsPacientesCitados = ['numeroCita', 'nombreCompleto', 'historiaClinica', 'actoMedico',
  //               'Estado', 'Atender', 'noPresento'];
  //             this.atender = 2;
  //             this.noPresento = 2;
  //             for (var i = 0; i < this.pacientesCitados.length; i++) {
  //               this.dataSource = new MatTableDataSource(this.pacientesCitados);


  //               if (this.pacientesCitados[i].estadoCita == "Atendida" || this.pacientesCitados[i].estadoCita == "Suspendida") {
  //                 this.atendido[i] = 2
  //                 this.noSePresento[i] = 2;
  //               }
  //               if (this.pacientesCitados[i].estadoCita == "Pendiente") {
  //                 this.atendido[i] = 1
  //                 this.noSePresento[i] = 1;
  //               }
  //               if (this.pacientesCitados[i].estadoPendientes == 1) {
  //                 this.noSePresento[i] = 2;
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         console.log(data.mensaje);
  //       }
  //       return true;
  //     },
  //       error => {
  //         console.error("Error al Obtener Citas Del Doctor: ");
  //         return Observable.throw(error);
  //       }),
  //     err => console.error(err),
  //     () => console.log('Request Complete');
  // }

  private atenderPaciente(idCita?: string) {
    // this.idCitaProc = idCita;
    this.ds.sendData('verificarCitaProc'); //CAMBIA ESTILO ATENCION PROCEDIMIENTO
    // let _queryparams = {
    //   "idCitaProc": this.idCitaProc,
    // }
    localStorage.setItem("citaParamProcedimiento", JSON.stringify(this.citaParam));
    this.ds.sendData('goToAtencionProcedimiento');
    this._router.navigate(['principal/consulta-ambulatoria/atencion-medica-ambulatoria'], { queryParams: { "idCitaProc": this.idCitaProc , "idPersona": this.citaParam.idPersona} });
  }

  ngOnInit() {
    this._params.feProgramacion = new Date();
    this.getDatosPersonal();
    this.getListaCitaxProgramacion().then(() => {
      if (this.lsProgramacionCitaPorPersonal.length > 0)
        this.tablePacientesCitados(this.lsProgramacionCitaPorPersonal[0].idProgramacion).then();
    });
    // this.toastr.info('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    // this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
    // this.fechaFiltro = ((this.primeraFecha).toLocaleDateString('es-PE', this.options));
    // this.FechaCompleta = this.fechaFiltro;
    // this.getPacientesCitados(this.fechaFiltro);
  }
}
