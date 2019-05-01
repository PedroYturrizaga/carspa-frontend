import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../../../../shared/services/area.service';
import { EspecialidadService } from '../../../../../../shared/services/especialidad.service';
import { ActividadService } from '../../../../../../shared/services/actividad.service';
import { PersonalService } from '../../../../../../shared/services/personal.service';
import { TurnoService } from '../../../../../../shared/services/turno.service';
import { AmbienteService } from '../../../../../../shared/services/ambiente.service';
import { ProgramacionService } from '../../../../../admision/services/programacion.service';
import { FechaService } from '../../../../../../shared/services/fecha.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { AddTurnoComponent } from './add-turno/add-turno.component';
import { ModalRestriccionesComponent } from '../registro/modal-restricciones/modal-restricciones.component';
import { ModalDeleteComponent } from '../registro/modal-delete/modal-delete.component';
import { SesionService } from "../../../../../../shared/services/sesion.service";
import { MatDialog, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective } from '@angular/forms';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  displayedColumns = ['feProgramacion', 'horario', 'estado', 'estado', 'eliminar'];
  dataSource = new MatTableDataSource();

  hoveredDate: NgbDateStruct;
  maxdate: Date;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  hoyValidara: NgbDateStruct;

  viewDate: Date = new Date();
  nuevaDate: Date;
  events = [];

  private IPRESS: any;

  private areaSelected: any;
  private especialidadSelected: any;
  private actividadSelected: any;
  private subActividadSelected: any;
  private personalSelected: any;
  private turnoSelected: any;
  private ambienteSelected: any;
  private programacionSelected: any;
  private mesSelected: any;
  private anioSelected: any;
  private feProgramacion: any;
  private tortuga: boolean = false;

  private fechaMin: NgbDateStruct;
  private fechaMax: NgbDateStruct;

  private areas: any[];
  private especialidades: any[];
  private actividades: any[];
  private subActividades: any[];
  private personales: any[];
  private turnos: any[];
  private ambientes: any[];
  private programaciones: any[];
  private meses: any[];
  private anios: any[];
  private addTurnoA: any[];
  private personalAsistencial = {
    apePaterno: "",
    apeMaterno: "",
    nombre: "",
    especialidad: "",
    maxHorasNormales: "",
    maxHorasExtras: ""
  };

  private flgDetalleProgra: boolean = false;
  private ngModal: any;
  private fechProg: any = { fecIni: null, fecFin: null }

  constructor(private _areaService: AreaService,
    private _especialidadService: EspecialidadService,
    private _actividadService: ActividadService,
    private _personalService: PersonalService,
    private _turnoService: TurnoService,
    private _ambienteService: AmbienteService,
    private _programacionService: ProgramacionService,
    private _fechaService: FechaService,
    // private _modalService: NgbModal,
    private toastr: ToastsManager,
    private _ngbDateParserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar,
    public dialog: MatDialog) {
    this.areaSelected = null;
    this.especialidadSelected = null;
    this.actividadSelected = null;
    this.subActividadSelected = null;
    this.personalSelected = null;
    this.turnoSelected = null;
    this.ambienteSelected = null;
    this.programacionSelected = null;

    this.areas = [];
    this.especialidades = [];
    this.actividades = [];
    this.subActividades = [];
    this.personales = [];
    this.turnos = [];
    this.ambientes = [];
    this.programaciones = [];
    this.meses = [];
    this.anios = [];

    this.IPRESS = SesionService.obtenerElementos().IPRESS;

    // this.mesSelected = { id: now.getMonth() + 1 };
    // this.anioSelected = { valor: now.getFullYear() };
    this.hoyValidara = calendar.getToday();
  }

  public obtenerMeses() {
    this._fechaService.obtenerMeses()
      .subscribe(data => {
        this.meses = data;
        this.mesSelected = null;
      },
        error => {
          console.error(error);
        });
  }

  public obtenerAnios() {
    this._fechaService.obtenerAnios()
      .subscribe(data => {
        this.anios = data;
        this.anioSelected = null;
      },
        error => {
          console.error(error);
        });
  }

  public obtenerAreas() {
    this._areaService.obtenerAreas()
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
  }

  public obtenerEspecialidades() {
    // console.log(this.areaSelected.id);
    if (this.areaSelected != null) {
      this._especialidadService.obtenerEspecialidades(this.areaSelected.id)
        .subscribe(data => {
          if (data.estado == 1) {
            this.especialidades = data.especialidadList;
            this.actividades = [];
            this.subActividades = [];
            this.personales = [];
            this.especialidadSelected = null;
            this.actividadSelected = null;
            this.subActividadSelected = null;
            this.personalSelected = null;
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          }
          else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.error(error);
          });
    } else {
      this.especialidades = [];
      this.actividades = [];
      this.subActividades = [];
      this.personales = [];
      this.especialidadSelected = null;
      this.actividadSelected = null;
      this.subActividadSelected = null;
      this.personalSelected = null;
    }
  }

  public obtenerActividades() {
    if (this.especialidadSelected != null) {
      let params = { idArea: this.areaSelected.id, idEspecialidad: this.especialidadSelected.id };
      this._actividadService.obtenerActividades(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.actividades = data.actividadList;
            this.subActividades = [];
            this.personales = [];
            this.actividadSelected = null;
            this.subActividadSelected = null;
            this.personalSelected = null;
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          }
          else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.error(error)
          });
    } else {
      this.actividades = [];
      this.subActividades = [];
      this.personales = [];
      this.actividadSelected = null;
      this.subActividadSelected = null;
      this.personalSelected = null;
    }
  }

  public obtenerSubActividades() {
    if (this.actividadSelected != null) {
      let params = { idArea: this.areaSelected.id, idEspecialidad: this.especialidadSelected.id, idActividad: this.actividadSelected.id };
      this._actividadService.obtenerSubActividades(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.subActividades = data.subActividadList;
            this.personales = [];
            this.subActividadSelected = null;
            this.personalSelected = null;
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          }
          else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.error(error);
          });
    } else {
      this.subActividades = [];
      this.personales = [];
      this.subActividadSelected = null;
      this.personalSelected = null;
    }
  }

  public obtenerPersonales() {
    if (this.subActividadSelected != null) {
      let params = {
        idArea: this.areaSelected.id,
        idEspecialidad: this.especialidadSelected.id,
        idActividad: this.actividadSelected.id,
        idSubActividad: this.subActividadSelected.id
      };

      this._personalService.obtenerPersonales(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.personales = data.personalList;
            this.personalSelected = null;
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          }
          else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.log(error);
          });
    } else {
      this.personales = [];
      this.personalSelected = null;
    }
  }

  public obtenerTurnos() {
    this._turnoService.obtenerTurnos(this.actividadSelected.id)
      .subscribe(data => {
        if (data.estado == 1) {
          this.turnos = data.turno;
          this.tortuga = true;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  public obtenerAmbientes() {
    this._ambienteService.obtenerAmbientes(this.areaSelected.id, this.especialidadSelected.id, this.actividadSelected.id)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ambientes = data.ambienteList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  public obtenerProgramaciones(_controlVar: any) {
    if (isInvalid(_controlVar)) {
      this.toastr.error("Llenar todos los datos requeridos", "Gestionar cita");
      this.personalSelected = null;
      return;
    }
    // if (this.mesSelected == null) {
    //   this.toastr.error("Debe seleccionar un mes", "Gestionar cita");
    //   return;
    // }

    // if (this.anioSelected == null) {
    //   this.toastr.error("Debe seleccionar un año", "Gestionar cita");
    //   this.personalSelected = null;
    //   return;
    // }
    console.log(this.personalSelected)
    if (this.personalSelected != null) {
      let params = {
        idPersonal: this.personalSelected.idPersonal,
        idArea: this.areaSelected.id,
        idEspecialidad: this.especialidadSelected.id,
        idActividad: this.actividadSelected.id,
        idSubActividad: this.subActividadSelected.id,
        mes: this.mesSelected.id,
        anio: this.anioSelected.valor
      };
      this.flgDetalleProgra = false;
      this._programacionService.obtenerProgramaciones(params)
        .subscribe(data => {
          if (data.estado == 1) {
            this.programaciones = data.programacionList;
            this.dataSource = new MatTableDataSource(this.programaciones);

            this.personalAsistencial.apePaterno = this.personalSelected.apePaterno;
            this.personalAsistencial.apeMaterno = this.personalSelected.apeMaterno;
            this.personalAsistencial.nombre = this.personalSelected.nombre;
            this.personalAsistencial.especialidad = this.especialidadSelected.valor;
            this.personalAsistencial.maxHorasNormales = this.personalSelected.maxHorasNormales + " H. normales";
            this.personalAsistencial.maxHorasExtras = this.personalSelected.maxHorasExtras + " H. extras";
            this.obtenerTurnos();
            this.obtenerAmbientes();
            if (this.programaciones.length != 0) {
              this.flgDetalleProgra = true;
            } else {
              this.toastr.warning("El personal " + this.personalSelected.apePaterno + " " + this.personalSelected.apeMaterno + ", " +
                this.personalSelected.nombre + " no tiene programaciones asignadas.", "Gestionar Programacion");
            }
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          }
          else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.log(error);
          });
    }
  }

  public insertarProgramacion() {
    if (this.fromDate == undefined || this.fromDate == null) {
      this.toastr.error("debe seleccionar una fecha inicio y fin", "Gestionar Programación");
      return;
    }

    if (this.toDate == undefined || this.toDate == null) {
      this.toDate = this.fromDate;
    }

    let flg: number;

    if (this.fromDate.year > this.hoyValidara.year) {
      flg = 1;
    } else {
      if (this.fromDate.month > this.hoyValidara.month && this.fromDate.year >= this.hoyValidara.year) {
        flg = 1;
      } else {
        if (this.fromDate.day >= this.hoyValidara.day && this.fromDate.month >= this.hoyValidara.month && this.fromDate.year >= this.hoyValidara.year) {
          flg = 1;
        }
      }
    }
    if (flg != 1) {
      this.toastr.error("la fecha inicio tiene que ser mayor o igual a la fecha actual", "Gestionar Programación");
      return;
    }
    let fechaMin = this.fromDate.year + "-";
    let fechaMax = this.toDate.year + "-";

    if (this.fromDate.month.toString().length == 1) {
      fechaMin = fechaMin + "0" + this.fromDate.month.toString() + "-";
    } else {
      fechaMin = fechaMin + this.fromDate.month.toString() + "-";
    }
    if (this.fromDate.day.toString().length == 1) {
      fechaMin = fechaMin + "0" + this.fromDate.day.toString();
    } else {
      fechaMin = fechaMin + this.fromDate.day.toString();
    }

    if (this.toDate.month.toString().length == 1) {
      fechaMax = fechaMax + "0" + this.toDate.month.toString() + "-";
    } else {
      fechaMax = fechaMax + this.toDate.month.toString() + "-";
    }
    if (this.toDate.day.toString().length == 1) {
      fechaMax = fechaMax + "0" + this.toDate.day.toString();
    } else {
      fechaMax = fechaMax + this.toDate.day.toString();
    }
    let requestBody = {
      programacion: {
        actividad: {
          id: this.actividadSelected.id
        },
        ambiente: {
          id: this.ambienteSelected.id
        },
        area: {
          id: this.areaSelected.id
        },
        especialidad: {
          id: this.especialidadSelected.id
        },
        // estado : this.IPRESS.esPrivada ? "Aprobado" : "Pendiente",
        estado: "Pendiente",
        feProgramacionFin: fechaMax,
        feProgramacionInicio: fechaMin,
        idPersonal: this.personalSelected.idPersonal,
        subActividad: {
          id: this.subActividadSelected.id
        },
        tipoProgramacion: "N",
        turno: {
          idTurno: this.turnoSelected.id
        }
      }
    };
    this._programacionService.insertarProgramacion(requestBody)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Mensaje del sistema");
          this.obtenerProgramaciones(false);
        }
        else if (data.estado == 0) {
          // this.abrirModalRestricciones(data.confirmacionList);
          this.abrirRestriccionesModal(data.confirmacionList)
        }
        else if (data.estado == -1) {
          this.toastr.error(data.mensaje, "Error");
        }
      },
        error => {
          this.toastr.error("Error de servidor.", "Mensaje del sistema");
        });
  }
  eliminarProgramacionModal(programacion) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '50%',
      height: '30%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        let params = { idProgramacion: programacion.idProgramacion, esIPRESSPrivada: this.IPRESS.esPrivada }

        this._programacionService.eliminarProgramacion(params)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje, 'Mensaje del sistema');
              this.obtenerProgramaciones(false);
            }
            else if (data.estado == 0) {
              // this.abrirModalRestricciones(data);
              this.abrirRestriccionesModal(data);

            }
            else if (data.estado == -1) {
              this.toastr.error(data.mensaje, 'Error');
            }
          },
            error => {
              this.toastr.error('Error de servidor', 'Error');
            });
      }

    });
  }

  // public eliminarProgramacion(programacion) {

  //   const modalDelete = this._modalService.open(ModalDeleteComponent);

  //   modalDelete.result.then((result) => {
  //     let params = { idProgramacion: programacion.idProgramacion, esIPRESSPrivada: this.IPRESS.esPrivada }

  //     this._programacionService.eliminarProgramacion(params)
  //       .subscribe(data => {
  //         if (data.estado == 1) {
  //           this.toastr.success(data.mensaje, 'Mensaje del sistema');
  //           this.obtenerProgramaciones();
  //         }
  //         else if (data.estado == 0) {
  //           this.abrirModalRestricciones(data);
  //         }
  //         else if (data.estado == -1) {
  //           this.toastr.error(data.mensaje, 'Error');
  //         }
  //       },
  //         error => {
  //           this.toastr.error('Error de servidor', 'Error');
  //         });
  //   });
  // }
  abrirRestriccionesModal(dataModal) {
    const dialogRef = this.dialog.open(ModalRestriccionesComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '50%',
      height: '30%',
      disableClose: true
    });

    dialogRef.componentInstance.dataModal = dataModal;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // private abrirModalRestricciones(dataModal) {
  //   let modalRestricciones = this._modalService.open(ModalRestriccionesComponent);
  //   modalRestricciones.componentInstance.dataModal = dataModal;

  //   modalRestricciones.result.then((result) => {
  //   });
  // }

  public cargarFechaProgramacion() {
    this.feProgramacion = {
      year: this.anioSelected.valor,
      month: this.mesSelected.id,
      day: this.anioSelected.valor == now.getFullYear() && this.mesSelected.id == now.getMonth() + 1 ? now.getDate() : 1
    };

    this.fechaMin = {
      year: this.anioSelected.valor,
      month: this.mesSelected.id,
      day: 1
    };

    let lastDate = new Date(this.anioSelected.valor,
      this.mesSelected.id,
      0);

    this.fechaMax = {
      year: this.anioSelected.valor,
      month: this.mesSelected.id,
      day: lastDate.getDate()
    };

    // console.log( `Fecha de programación: ${JSON.stringify(this.feProgramacion)}` );
    // console.log( `Fecha mínima: ${JSON.stringify(this.fechaMin)}` );
    // console.log( `Fecha máxima: ${JSON.stringify(this.fechaMax)}` );
  }
  onDateChangee(date, opt) {
    //cambiar el formato de la fecha
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    date = ((date).toLocaleDateString('es-PE', options)).split('/').join('-');

    //convertir la fecha en json
    let fecha: any = { year: parseInt(date.substr(6, 4)), month: parseInt(date.substr(3, 2)), day: parseInt(date.substr(0, 2)) };

    console.log(fecha);
    if (opt == 1) {
      this.fromDate = fecha;
      //registrar la fecha inicial o minima
      console.log(this.fromDate);
      console.log(this.fechProg.fecFin);

    } else if (opt == 2) {
      this.toDate = fecha;
      //registrar la fecha final o maxima
      console.log(this.toDate);
      console.log(this.fechProg.fecIni);

    }
  }

  public onDateChange(date, opt) {
    console.log(date);

    // if (!this.fromDate && !this.toDate) {
    //   this.fromDate = date;
    // } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
    //   this.toDate = date;
    // } else {
    //   this.toDate = null;
    //   this.fromDate = date;
    // }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  addTurn() {
    this.addTurnoA = [];
    console.log(this.addTurnoA);
    console.log(this.actividadSelected);
    console.log(this.turnos);

    const dialogRef = this.dialog.open(AddTurnoComponent, {
      autoFocus: false,
      hasBackdrop: true,
      // maxWidth: '50%',
      // width: '1000px',
      // minHeight: '40%',
      // height: '600px',
      disableClose: true
    });

    dialogRef.componentInstance.turnos = this.turnos;
    dialogRef.componentInstance.idActividad = this.actividadSelected.id;
    dialogRef.componentInstance.addTurnoA = this.addTurnoA;
    dialogRef.afterClosed().subscribe(result => {
      if (this.addTurnoA.length == 1) {
        this.obtenerTurnos();
      }
    });
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
  cleanRegistro(_controlVar: FormGroupDirective) {
    _controlVar.resetForm();
  }

  ngOnInit() { 
    this.obtenerAreas();
    this.obtenerMeses();
    this.obtenerAnios();
  }
}
