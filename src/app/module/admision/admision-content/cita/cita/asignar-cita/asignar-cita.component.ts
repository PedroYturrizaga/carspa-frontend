import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CitaService } from '../../../../services/cita.service';
import { ListadoProgramacionComponent } from './listado-programacion/listado-programacion.component';

import { MatDialog, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective } from '@angular/forms';
import { getSubAct } from "../../../../../../shared/auth/storage/cabecera.storage";

@Component({
  selector: 'app-asignar-cita',
  templateUrl: './asignar-cita.component.html',
  styleUrls: ['./asignar-cita.component.scss']
})
export class AsignarCitaComponent implements OnInit {
  //tabla1
  displayedColumns = ['feProgramacion', 'nombreMedico', 'turno', 'cupos'];
  dataSource = new MatTableDataSource();
  //tabla2
  displayedColumns2 = ['descripIafas', 'descripCobertura', 'copagoFijo', 'copagoVariable', 'descuentoFarm'];
  dataSource2 = new MatTableDataSource();
  //tabla3
  displayedColumns3 = ['fechaProgramacion', 'horaI', 'horaF', 'descpEspecialida', 'nombreMedico'];
  dataSource3 = new MatTableDataSource();

  @Input() paramJson: any = { numeroDocumento: null, CombotipoDocumento: null, flgOperacion: null, idCita: null, flVigencia: null };
  @Output() sendcita = new EventEmitter<boolean>();

  private id: any;
  private numeroDoc: number;
  private tipoDoc: number;
  private idPersona: string;

  private flgOperacion: number;
  private idCita: number;
  private flgRepro: number;

  private area: any = [];
  private especialidad: any = [];
  private actividad: any = [];
  private subactividad: any = [];
  private Comboarea: number = null;
  private Comboespecialidad: number = null;
  private Comboactividad: number = null;
  private combosubactividad: number = null;
  //47547400
  private fechaSearch: any = null;
  private paciente: any = [{ apellidoPaterno: null, apellidoMaterno: null, nombres: null }];
  private turnosMedicos: any = [];
  // private detalleCita = [ {area: [{id:null}] , especialidad: [{id:null}], actividad: [{id:null}], subActividad: [{id:null}]}];
  private detalleCita: any = [];

  private flgvigencia: boolean = false;
  private acreditacion: number;

  private checkConsulta: boolean = false;
  private checkRecita: boolean = false;
  private checkTipo: number;
  private checkIntercosulta: boolean = false;

  private vitionOperation: boolean = false;
  private vitionEdition: boolean = false;
  private flgCambioCita: any = [];

  private descpEspecialida: String = null;
  private coberturaVigente: any = [];
  private flgMedicosTurnos: boolean = false;
  private flgCitaReady: boolean = false;
  private listadoFirmeDetalle: any = [];
  private citaReservada: any = [];
  private arregloFinal: any = [];
  private arregloFinalSegundo: any = [];

  private visionSubActivdad: boolean = false;
  private datosListDays: any = [];
  private visionFechaSearchTurnos = false;
  private sanpercy: any = "";
  private editCheckM = 0;

  constructor(private _citaService: CitaService,
    private toastr: ToastsManager,
    // private modalService: NgbModal,
    private router: ActivatedRoute,
    private routerv: Router,
    public dialog: MatDialog
  ) { }

  sendcitaEvent() {
    let param: any;
    param = true;
    this.sendcita.emit(param);
  }

  public getAreas(areaOfCitas: number = null) {
    let promise = new Promise((resolve, reject) => {
      if (this.flgOperacion != 1) {
        this._citaService.obtenerAreas()
          .toPromise().then(data => {
            console.log(data);

            if (data.estado == 1) {
              this.area = data.areaList;
              this.Comboarea = areaOfCitas;
            } else {
              console.log(data.mensaje);
            } resolve();
          },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      } else {
        this._citaService.obtenerAreas()
          .toPromise().then(data => {
            if (data.estado == 1) {
              this.area = data.areaList;
            } else {
              console.log(data.mensaje);
            } resolve();
          },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      }
    })
    return promise;
  }

  public getEspecialidad(areaOfCitas: number = null, especialidadOfCitas: number = null) {
    let promise = new Promise((resolve, reject) => {
      if (this.flgOperacion != 1) {
        this._citaService.obtenerEspecialida(areaOfCitas)
          .subscribe(data => {
            console.log(data)
            if (data.estado == 1) {
              this.especialidad = data.especialidadList;
              if (this.especialidad.length == 0) {
                this.especialidad = [];
              }
              this.Comboespecialidad = especialidadOfCitas;
            } else {
              console.log(data.mensaje);
            } resolve();
          },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      } else {
        if (this.Comboarea == null || this.Comboarea == undefined) {
          this.Comboespecialidad = null;
          this.Comboactividad = null;
          this.combosubactividad = null;
          this.especialidad = [];
          this.actividad = [];
          this.subactividad = [];
        } else {
          this._citaService.obtenerEspecialida(this.Comboarea)
            .subscribe(data => {
              if (data.estado == 1) {
                this.especialidad = data.especialidadList;
                if (this.especialidad.length == 0) {
                  this.especialidad = [];
                }
                this.Comboespecialidad = null;
                this.Comboactividad = null;
                this.combosubactividad = null;
                this.actividad = [];
                this.subactividad = [];
              } else {
                console.log(data.mensaje);
              } resolve();
            },
            error => {
              console.error("Error al Listar");
              return Observable.throw(error);
            }),
            err => console.error(err),
            () => console.log('Request Complete');
        }
      }
    })
    return promise;
  }

  public getActividad(areaOfCitas: number = null, especialidadOfCitas: number = null, actividadOfCitas: number = null) {
    let promise = new Promise((resolve, reject) => {
      if (this.flgOperacion != 1) {
        this._citaService.obtenerActividad(areaOfCitas, especialidadOfCitas)
          .toPromise().then(data => {
            console.log(data)
            if (data.estado == 1) {
              this.actividad = data.actividadList;
              if (this.actividad.length == 0) {
                this.actividad = [];
              }
              this.Comboactividad = actividadOfCitas;
              this.combosubactividad = null;
              this.subactividad = [];
              if (getSubAct() == '0') {
                this.visionFechaSearchTurnos = true;
              } else {
                this.visionFechaSearchTurnos = false;
              }
            } else {
              console.log(data.mensaje);
            } resolve();
          },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      } else {
        if (this.Comboespecialidad == null) {
          this.Comboactividad = null;
          this.combosubactividad = null;
          this.actividad = [];
          this.subactividad = [];
          this.visionFechaSearchTurnos = false;
          $("#fecha_medico").val("");
          ;
        } else {
          this._citaService.obtenerActividad(this.Comboarea, this.Comboespecialidad)
            .toPromise().then(data => {
              if (data.estado == 1) {
                this.actividad = data.actividadList;
                if (this.actividad.length == 0) {
                  this.actividad = [];
                }
                this.Comboactividad = null;
                this.combosubactividad = null;
                this.subactividad = [];
                this.visionFechaSearchTurnos = false;
                $("#fecha_medico").val("");
              } else {
                console.log(data.mensaje);
              } resolve();
            },
            error => {
              console.error("Error al Listar");
              return Observable.throw(error);
            }),
            err => console.error(err),
            () => console.log('Request Complete');
        }
      }
    })
    return promise;
  }

  public getSubActividad(areaOfCitas: number = null, especialidadOfCitas: number = null, actividadOfCitas: number = null, subActividadOfCitas: number = null) {
    let promise = new Promise((resolve, reject) => {
      if (getSubAct() == '0') {
        if (this.editCheckM == 0) {
          console.log("no debe entrar aca cuando se edita")
          this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, null).then(() => {
            this.arregloFinal = this.orejitas;
          });
        } resolve();
      } else {
        if (this.flgOperacion != 1) {
          this._citaService.obtenerSubActividad(areaOfCitas, especialidadOfCitas, actividadOfCitas)
            .toPromise().then(data => {
              console.log(data)
              if (data.estado == 1) {
                this.subactividad = data.subActividadList;
                if (this.subactividad.length == 0) {
                  this.subactividad = [];
                }
                this.combosubactividad = subActividadOfCitas;
              } else {
                console.log(data.mensaje);
              } resolve();
            },
            error => {
              console.error("Error al Listar");
              return Observable.throw(error);
            }),
            err => console.error(err),
            () => console.log('Request Complete');
        } else {
          if (this.Comboactividad == null) {
            this.combosubactividad = null;
            this.subactividad = [];
            this.visionFechaSearchTurnos = false;
            $("#fecha_medico").val("");
          } else {
            this._citaService.obtenerSubActividad(this.Comboarea, this.Comboespecialidad, this.Comboactividad)
              .toPromise().then(data => {
                if (data.estado == 1) {
                  this.subactividad = data.subActividadList;
                  if (this.subactividad.length == 0) {
                    this.subactividad = [];
                  }
                  this.combosubactividad = null;
                  this.visionFechaSearchTurnos = false;
                  $("#fecha_medico").val("");
                } else {
                  console.log(data.mensaje);
                } resolve();
              },
              error => {
                console.error("Error al Listar");
                return Observable.throw(error);
              }),
              err => console.error(err),
              () => console.log('Request Complete');
          }
        }
      }
    })
    return promise;
  }

  private fv = 0;
  public searchTurnosMedicos() {
    // if (isInvalid(_controlVar)) {
    //   return;
    // }
    let promise = new Promise((resolve, reject) => {
      var jsonnada: any = document.getElementsByName("fecha_medico")[0];
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      let fechaParcial = ((jsonnada.value)).split('/').join('-');

      let l: any = [];
      l = fechaParcial.split('-');

      for (let a of this.arregloFinal) {
        this.fv = 0
        console.log(a.dia, parseInt(l[0]));
        console.log(a.mes, parseInt(l[1]) - 1);
        console.log(a.ano, parseInt(l[2]));

        if (a.dia == parseInt(l[0]) && a.mes == (parseInt(l[1]) - 1) && a.ano == parseInt(l[2])) {
          this.fv = 1
          break;
        }
      }

      if (this.fv == 0) {
        alert("La fecha insertada no es valida");
        return;
      }


      // console.log(this.paciente[0]["idPersona"]);
      // console.log(this.Comboarea);
      // console.log(this.Comboespecialidad);
      console.log(this.paramJson.idPersonal);
      console.log(this.combosubactividad);
      // console.log(fechaParcial);

      this._citaService.obtenerListaTurnoMedico(this.paciente[0]["idPersona"], this.Comboarea, this.Comboespecialidad,
        this.Comboactividad, this.combosubactividad, fechaParcial, this.paramJson.idDestino == 11 ? this.paramJson.idPersonal : null)
        .toPromise().then(data => {
          if (data.estado == 1) {
            console.log(data.listProgramacion);

            this.turnosMedicos = data.listProgramacion;

            if (this.turnosMedicos.length != 0) {
              if (this.turnosMedicos[0].flSexo == 1) {
                alert("El sexo del paciente no entra en la atención de esta especialidad");
                return;
              } else if (this.turnosMedicos[0].flEdad == 1) {
                alert("La edad del paciente no entra en la atención de esta especialidad");
                return;
              } else {
                for (let turm of this.turnosMedicos) {
                  turm.flAdicional = false;
                  if (turm.cupos == 0) {
                    turm.flAdicional = true;
                  }
                }
                this.dataSource = new MatTableDataSource(this.turnosMedicos);
                this.flgMedicosTurnos = true;
                for (let e of this.especialidad) {
                  if (e.id == this.Comboespecialidad) {
                    this.descpEspecialida = e.valor;
                  }
                }
              }

            } else {
              this.flgMedicosTurnos = false;
              alert("No se a encontrado medicos disponibles");
              this.toastr.error("No se a encontrado medicos disponibles", "Asignar cita");
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
    })
    return promise;

  }

  private getPaciente() {
    let promise = new Promise((resolve, reject) => {
      this._citaService.getPaciente(this.tipoDoc.toString(), this.numeroDoc.toString(), "", "", "")
        .toPromise().then(data => {
          if (data.estado == 1) {
            for (let a of data.pacienteList) {
              if (a.idPersona == this.idPersona) {
                this.paciente[0] = a;
                break;
              }
            }

            // this.paciente = data.pacienteList;


            // this.getCobertura(this.paciente[0]["idPersona"]);
            // this.acreditacion = this.paciente[0]["flVigencia"];
            // if (this.paciente[0]["flVigencia"] == 1) {
            //   this.flgvigencia = true;
            // }

          } else {
            this.toastr.error("Error en getPaciente" + data.mensaje);
          } resolve();
        },
        err => {
          console.error(err);
        });
    })
    return promise;

    // this._citaService.getPaciente(this.tipoDoc.toString(), this.numeroDoc.toString(), "", "", "")
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       console.log(data);
    //       this.paciente = data.pacienteList;
    //       this.getCobertura(this.paciente[0]["idPersona"]);
    //       this.acreditacion = this.paciente[0]["flVigencia"];
    //       if (this.paciente[0]["flVigencia"] == 1) {
    //         this.flgvigencia = true;
    //       }
    //       if (this.flgOperacion != 1) {
    //         this.setearCombosSearch();
    //       }
    //     } else {
    //       console.log(data.mensaje);
    //     }
    //     return true;
    //   },
    //     error => {
    //       console.error("Error al Listar");
    //       return Observable.throw(error);
    //     }),
    //   err => console.error(err),
    //   () => console.log('Request Complete');
  }

  // private setearCombosSearch() {
  // let promise = new Promise((resolve, reject) => {
  //   this._citaService.obtenerAreEspecActSubAct(this.paciente[0]['idPersona'], this.idCita)
  //     .toPromise().then(data => {
  //       if (data.estado == 1) {
  //         this.editCheckM = 1;
  //         this.detalleCita = data.programacion;
  //         console.log(data);

  // this.arregloFinal=this.arregloFinalSegundo;

  // else{
  // this.getListDaysProg();
  // }
  // this.fechaSearch = this.detalleCita['feProgramacion'];


  // console.log(data.feSolicitudCita);


  // $("#fecha_medico").val(data.feSolicitudCita);

  // if (this.flgRepro == 1) {
  //   let plan = { idPlan: null, descripIafas: null, descripCobertura: null, copagoFijo: null, copagoVariable: null, descuentoFarm: null };
  //   plan.idPlan = data.idPlan;
  //   plan.descripIafas = data.descripcionIafas;
  //   plan.descripCobertura = data.descripcionCobertura;
  //   plan.copagoFijo = data.copagoFijo;
  //   plan.copagoVariable = data.copagoVariable;
  //   plan.descuentoFarm = data.descuentoFarmacia1;
  //   this.coberturaVigente.push(plan);
  //   this.dataSource2 = new MatTableDataSource(this.coberturaVigente);
  // }
  //       } else {
  //         console.log(data.mensaje);
  //       }resolve();
  //     },
  //       error => {
  //         console.error("Error al Listar");
  //         return Observable.throw(error);
  //       }),
  //     err => console.error(err),
  //     () => console.log('Request Complete');
  //   })
  // return promise;
  // }

  private openModalListaDetalleProgramacion(row) {
    console.log(row)
    if (row.flgPendientes != 0) {
      alert("El paciente ya tiene cita para esta programacion");
      return;
    } else if (row.cupos == 0) {
      alert("Solo se permitira realizar adicionales");
      return;
    } else if (this.checkTipo == 0) {
      if (row.cantVolu == 0) {
        alert("No hay cupo para Citas del Tipo Voluntaria");
        return;
      } else if ((row.cantVolu - 1) < 0) {
        alert("No hay cupo para Citas del Tipo Voluntaria");
        return;
      }
    } else if (this.checkTipo == 1) {
      if (row.cantRecita == 0) {
        alert("No hay cupo para Citas del Tipo Recita");
        return;
      } else if ((row.cantRecita - 1) < 0) {
        alert("No hay cupo para Citas del Tipo Recita");
        return;
      }
    } else if (this.checkTipo == 2) {
      if (row.cantInter == 0) {
        alert("No hay cupo para Citas del Tipo Interconsulta");
        return;
      } else if ((row.cantInter - 1) < 0) {
        alert("No hay cupo para Citas del Tipo Interconsulta");
        return;
      }
    } else if (this.checkTipo == 3) {
      if (row.cantReferi == 0) {
        alert("No hay cupo para Citas del Tipo Referencia");
        return;
      } else if ((row.cantReferi - 1) < 0) {
        alert("No hay cupo para Citas del Tipo Referencia");
        return;
      }
    }

    const dialogRef = this.dialog.open(ListadoProgramacionComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.componentInstance.fechaProgramacion = row.feProgramacion;
    dialogRef.componentInstance.flgCambioCita = this.flgCambioCita;
    dialogRef.componentInstance.idProgramacion = row.idProgramacion;
    dialogRef.componentInstance.nombreMedico = row.nombreMedico;
    dialogRef.componentInstance.descpEspecialida = this.descpEspecialida;
    dialogRef.componentInstance.turnoIni = row.turno.horaInicio;
    dialogRef.componentInstance.turnoFin = row.turno.horaFin;

    dialogRef.afterClosed().subscribe(result => {
      if (this.flgCambioCita[0] == 1) {
        console.log(this.flgCambioCita[1]);
        // this.citaReservada = this.flgCambioCita[1];
        this.citaReservada = [];
        this.citaReservada.push(this.flgCambioCita[1]);
        this.dataSource3 = new MatTableDataSource(this.citaReservada);
        this.flgCitaReady = true;
      }
      this.flgCambioCita[0] = 0;
    });

  }

  private getCobertura(idPersona) {
    let plan = { idPlan: null, descripIafas: null, descripCobertura: null, copagoFijo: null, copagoVariable: null, descuentoFarm: null };
    let datosPlan: any = [];
    if (this.flgRepro == 0) {
      this._citaService.getCoberturaVigente(idPersona)
        .subscribe(data => {
          console.log(data);

          if (data.estado == 1) {
            datosPlan = data.plan;

            for (let a of datosPlan) {
              plan.idPlan = a.idPlan;
              plan.descripIafas = a.descripcionIafas;
              plan.descripCobertura = a.cobertura.descripcionCobertura;
              plan.copagoFijo = a.cobertura.copagoFijo;
              plan.copagoVariable = a.cobertura.copagoVariable;
              plan.descuentoFarm = a.cobertura.descuentoFarmacia1;
            }
            this.coberturaVigente.push(plan);
            this.dataSource2 = new MatTableDataSource(this.coberturaVigente);
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
  }

  private returnGestionarCita() {
    this.routerv.navigate(['/cita']);
  }

  private darAdicional(e) {
    console.log(e);

    if (e.flgPendientes != 0) {
      alert("El paciente ya tiene cita para esta programacion");
      return;
    }

    this._citaService.getAdicionalCupo(e.idProgramacion)
      .subscribe(data => {
        if (data.estado == 1) {
          let jsonAdicional = { fechaProgramacion: null, horaI: null, horaF: null, cupos: null, idProgramacion: null, descpEspecialida: null, nombreMedico: null };
          jsonAdicional.fechaProgramacion = data.adicional.feProgramacion;
          jsonAdicional.horaI = data.adicional.turno.horaInicio;
          jsonAdicional.horaF = data.adicional.turno.horaFin;
          jsonAdicional.cupos = data.adicional.cupos;
          jsonAdicional.idProgramacion = e.idProgramacion;
          jsonAdicional.descpEspecialida = data.adicional.especialidad.valor;
          jsonAdicional.nombreMedico = e.nombreMedico;
          this.citaReservada = [];
          this.citaReservada.push(jsonAdicional)
          this.dataSource3 = new MatTableDataSource(this.citaReservada);
          this.flgCitaReady = true;
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      })
  }

  private insertaActualizaCita() {
    let tipoCita: String = "V";
    if (this.checkTipo == 1) {
      tipoCita = "R";
    } else if (this.checkTipo == 2) {
      tipoCita = "I";
    } else if (this.checkTipo == 3) {
      tipoCita = "F";
    }

    let detalleInsertacion = {
      cita: {
        fechaCita: null, horaCita: null, numeroCupo: null, estadoCita: null,
        confirmacionCita: null, tipoCita: null, tipoPrestacion: null, programacion: {
          idProgramacion: null, area: { id: null },
          actividad: { id: null }, especialidad: { id: null }
        },
        idPlan: null, persona: { idPersona: null }, historiaClinica: { idHistoriaClinica: null }, numeroOrden: null,
        idCita: null, idPaciente: null
      },
      idActoMedico: null
    };

    detalleInsertacion.cita.fechaCita = this.citaReservada[0].fechaProgramacion;
    detalleInsertacion.cita.horaCita = this.citaReservada[0].horaI;
    detalleInsertacion.cita.numeroCupo = this.citaReservada[0].cupos;
    detalleInsertacion.cita.estadoCita = "R";
    detalleInsertacion.cita.confirmacionCita = 0;
    detalleInsertacion.cita.tipoCita = tipoCita;
    detalleInsertacion.cita.tipoPrestacion = 1;
    detalleInsertacion.cita.programacion.idProgramacion = this.citaReservada[0].idProgramacion;
    detalleInsertacion.cita.programacion.area.id = this.Comboarea;
    detalleInsertacion.cita.programacion.especialidad.id = this.Comboespecialidad;
    detalleInsertacion.cita.programacion.actividad.id = this.Comboactividad;
    // detalleInsertacion.cita.idPlan = this.coberturaVigente[0].idPlan;
    detalleInsertacion.cita.persona.idPersona = this.paciente[0].idPersona;
    detalleInsertacion.cita.historiaClinica.idHistoriaClinica = this.paciente[0].idHistoria;
    detalleInsertacion.cita.numeroOrden = this.citaReservada[0].cupos;
    detalleInsertacion.cita.idPaciente = this.idPersona;
    detalleInsertacion.idActoMedico = this.paramJson.idActoMedico;

    if (this.flgOperacion == 1) {
      detalleInsertacion.cita.idCita = 0;
    } else {
      detalleInsertacion.cita.idCita = this.idCita;
    }

    console.log(detalleInsertacion);

    this._citaService.postPullCitas(detalleInsertacion)
      .subscribe(data => {
        console.log(data);

        if (data.estado == 1) {
          // this.returnGestionarCita();
          this.sendcitaEvent();
          this.toastr.success(data.mensaje, "Asignar cita");
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Asignar cita");
        } else {
          this.toastr.error(data.mensaje, "Asignar cita");
        }
        return true;
      },
      error => {
        console.error("Error al Listar");
        return Observable.throw(error);
      });
  }

  private orejitas: any = [];
  private getListDaysProg(area, especialidad, actividad, subactividad, idPersonal: string = null) {
    let promise = new Promise((resolve, reject) => {
      let requestList = {};

      if (idPersonal) {
        if (subactividad != null && this.editCheckM == 0) {
          requestList = { idArea: this.Comboarea, idEspecialidad: this.Comboespecialidad, idActividad: this.Comboactividad, idSubactividad: this.combosubactividad, idPersonal: idPersonal };
        } else {
          requestList = { idArea: area, idEspecialidad: especialidad, idActividad: actividad, idSubactividad: subactividad, idPersonal: idPersonal };
        }
      } else {
        if (subactividad != null && this.editCheckM == 0) {
          requestList = { idArea: this.Comboarea, idEspecialidad: this.Comboespecialidad, idActividad: this.Comboactividad, idSubactividad: this.combosubactividad };
        } else {
          requestList = { idArea: area, idEspecialidad: especialidad, idActividad: actividad, idSubactividad: subactividad };
        }
      }

      this._citaService.getListDaysProg(requestList)
        .toPromise().then(data => {
          console.log(data)
          if (data.estado == 1) {
            if (data.listProgra.length != 0) {
              this.visionFechaSearchTurnos = true;
              // console.log(data.listProgra);

              // if(this.editCheckM == 0){
              //   this.arregloFinal = data.listProgra;
              // }else{
              this.orejitas = data.listProgra;
              // }

              // if(this.arregloFinalSegundo.length != 0){
              //   this.arregloFinal = this.arregloFinalSegundo;

              // }
              // console.log(this.arregloFinalSegundo)  
            } else {
              alert("No se encontrado programaciones");
              this.visionFechaSearchTurnos = false;
              // if( getSubAct() == '0' && ){
              //   this.Comboactividad = null;
              // }else if(getSubAct() == '1' && ){
              //   this.combosubactividad = null;
              // }
            }
          } else {
            console.log(data.mensaje);
          } resolve();
        },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
        err => console.error(err),
        () => console.log('Request Complete');
    })
    return promise;
  }

  ngOnInit() {
    this.numeroDoc = this.paramJson.pacienteRequest.numeroDocumentoIdentidad;
    this.tipoDoc = this.paramJson.pacienteRequest.tipoDocumento;
    this.idPersona = this.paramJson.pacienteRequest.idPersona;
    this.flgOperacion = this.paramJson.flgOperacion;
    this.idCita = this.paramJson.idCita;
    // this.flgRepro = this.paramJson.flVigencia;

    console.log(this.idCita)
    console.log(this.idPersona);

    if (this.flgOperacion == 1) {
      this.vitionOperation = false;
      this.vitionEdition = false;
      this.checkTipo = 0;
    } else if (this.flgOperacion == 2) {
      this.vitionOperation = true;
      this.vitionEdition = true;
      this.checkTipo = 1;
    } else if (this.flgOperacion == 3) {
      this.vitionOperation = true;
      this.vitionEdition = true;
      this.checkTipo = 2;
    } else if (this.flgOperacion == 4) {
      this.vitionOperation = true;
      this.vitionEdition = true;
      this.checkTipo = 0;
    } else if (this.flgOperacion == 5) {
      this.vitionOperation = true;
      this.vitionEdition = true;
      this.checkTipo = 3;
    } else if (this.flgOperacion == 6) {
      this.vitionOperation = true;
      this.vitionEdition = true;
      this.checkTipo = 4;
    }

    this.getPaciente().then(() => {

      if (this.flgOperacion == 2) {

        this.getAreas().then(() => {
          this.Comboarea = this.paramJson.idArea;
          this.getEspecialidad(this.Comboarea).then(() => {
            this.Comboespecialidad = this.paramJson.idEspecialidad;
            this.getActividad(this.Comboarea, this.Comboespecialidad).then(() => {
              this.Comboactividad = this.paramJson.idActividad;
              this.getSubActividad(this.Comboarea, this.Comboespecialidad, this.Comboactividad).then(() => {
                this.combosubactividad = this.paramJson.idSubActividad;
                if (getSubAct() == '1') {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, this.combosubactividad, this.paramJson.idPersonal).then(() => {
                    this.percyshi(this.orejitas);
                  });
                } else {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, null, this.paramJson.idPersonal).then(() => {
                    this.percyshi(this.orejitas);
                  });
                }
              });
            });
          });
        });

        // this.getAreas(this.detalleCita['area']['id']).then(()=>{
        //   this.getEspecialidad(this.detalleCita['area']['id'], this.detalleCita['especialidad']['id']).then(()=>{
        //     this.getActividad(this.detalleCita['area']['id'], this.detalleCita['especialidad']['id'], this.detalleCita['actividad']['id']).then(()=>{
        //       this.getSubActividad(this.detalleCita['area']['id'], this.detalleCita['especialidad']['id'], this.detalleCita['actividad']['id'], this.detalleCita['subActividad']['id']).then(()=>{
        //         if(getSubAct()=='1'){
        //           this.getListDaysProg(this.detalleCita['area']['id'],this.detalleCita['especialidad']['id'],this.detalleCita['actividad']['id'],this.detalleCita['subActividad']['id']).then(()=>{
        //             this.percyshi(this.orejitas);
        //           });
        //         }else{
        //           this.getListDaysProg(this.detalleCita['area']['id'],this.detalleCita['especialidad']['id'],this.detalleCita['actividad']['id'],null).then(()=>{
        //             this.percyshi(this.orejitas);
        //           });
        //         }
        //       });
        //     });
        //   });
        // });
      } else if (this.flgOperacion == 3) {

        this.getAreas().then(() => {
          this.Comboarea = this.paramJson.idArea;
          this.getEspecialidad(this.Comboarea).then(() => {
            this.Comboespecialidad = this.paramJson.idEspecialidad;
            this.getActividad(this.Comboarea, this.Comboespecialidad).then(() => {
              this.Comboactividad = this.paramJson.idActividad;
              this.getSubActividad(this.Comboarea, this.Comboespecialidad, this.Comboactividad).then(() => {
                this.combosubactividad = this.paramJson.idSubActividad;
                if (getSubAct() == '1') {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, this.combosubactividad).then(() => {
                    this.percyshi(this.orejitas);
                  });
                } else {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, null).then(() => {
                    this.percyshi(this.orejitas);
                  });
                }
              });
            });
          });
        });

      } else if (this.flgOperacion == 6) {
        this.getAreas().then(() => {
          this.Comboarea = this.paramJson.idArea;
          this.getEspecialidad(this.Comboarea).then(() => {
            this.Comboespecialidad = this.paramJson.idEspecialidad;
            this.getActividad(this.Comboarea, this.Comboespecialidad).then(() => {
              this.Comboactividad = this.paramJson.idActividad;
              this.getSubActividad(this.Comboarea, this.Comboespecialidad, this.Comboactividad).then(() => {
                this.combosubactividad = this.paramJson.idSubActividad;
                if (getSubAct() == '1') {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, this.combosubactividad).then(() => {
                    this.percyshi(this.orejitas);
                  });
                } else {
                  this.getListDaysProg(this.Comboarea, this.Comboespecialidad, this.Comboactividad, null).then(() => {
                    this.percyshi(this.orejitas);
                  });
                }
              });
            });

          });
        });
      } else {
        this.getAreas().then();
      }
    });

    if (getSubAct() == '1') {
      this.visionSubActivdad = true;
    } else {
      this.visionSubActivdad = false;
    }
  }

  public percyshi(arre) {
    this.arregloFinal = arre;
  }


  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
}
