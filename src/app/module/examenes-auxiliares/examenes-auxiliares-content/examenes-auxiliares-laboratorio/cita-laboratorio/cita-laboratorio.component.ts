import { log } from 'util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExamenesAuxiliaresService } from './../../../services/examenes-auxiliares.service';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { SesionService } from "../../../../../shared/services/sesion.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita-laboratorio',
  templateUrl: './cita-laboratorio.component.html',
  styleUrls: ['./cita-laboratorio.component.scss']
})
export class CitaLaboratorioComponent implements OnInit {
  @Input() flgMostrar;
  @Input() filtro;
  @Input() actoMedico;
  @Input() idArea;
  @Input() id;
  @Input() idCobertura;
  @Output() cambioFlag = new EventEmitter<boolean>();

  private IPRESS: any;
  private personaDatos = { idActoMedico: null, sexo: {}, tipoDocumentoIdentidad: {}, filiadoList: [{}], historiaList: [{}], planList: [{ iafas: {}, cobertura: {} }] }
  private RequestPersonaDatos = { idActoMedico: null };
  private ambientes: any[] = [];
  private requestAmbientes = { idArea: null, feDesde: null, feHasta: null };
  private dni: String = null;
  private cobertura: String = null;
  private idTurno: number = null;
  private fecha: String = null;
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private ambientes2 = { idOrdenExamenDetalle: null, cita: { fechaCita: null, ambienteTurno: { idAmbienteTurno: null } } };
  private RequestHorarioLaboratorio: any = { ordenExamenDetalleList: [], idPlan: null };
  constructor(
    private _examenesAuxiliares: ExamenesAuxiliaresService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.IPRESS = SesionService.obtenerElementos().IPRESS;
  }

  private getObtenerPersonaDatos() {
    this.RequestPersonaDatos.idActoMedico = this.actoMedico;
    this._examenesAuxiliares.obtenerPersonaDatos(this.RequestPersonaDatos)
      .subscribe(data => {
        if (data.estado == 1) {
          this.personaDatos = data.persona;
          console.log(this.personaDatos);
          this.dni = data.persona.idPersona;
          this.dni = this.dni.substr(1, 8);
          this.cobertura = data.persona.planList[0].cobertura.descripcionCobertura;
          if (this.cobertura == null) {
            this.toastr.error('No tiene Asignado una Cobertura');
          }
          // this.personaDatos.push(data.persona)
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }

  private getObtenerAmbientes() {
    this.requestAmbientes.idArea = this.idArea;
    // console.log(this.requestAmbientes);
    this._examenesAuxiliares.obtenerAmbientes(this.requestAmbientes)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ambientes = data.ambienteList;
          if (this.ambientes.length > 0) {
            this.paginationParameter.total_rows = this.ambientes[0].nuTotalReg;
          } else {
            this.toastr.warning("No se Encontraron Progrmaciones");
          }
          for (let a of this.ambientes) {
            a.color = "";
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }

  private buscarPorAmbiente() {
    if (this.requestAmbientes.feDesde == null || this.requestAmbientes.feHasta == null) {
      this.toastr.warning('Debe ingresar Datos de Búsqueda');
    } else {
      this.getObtenerAmbientes();
      this.requestAmbientes.feDesde = null;
      this.requestAmbientes.feHasta = null;
      this.ambientes = null;
    }
  }

  private postHorarioLaboratorio() {
    this.RequestHorarioLaboratorio.idPlan = this.idCobertura;
    console.log(this.RequestHorarioLaboratorio);
    this._examenesAuxiliares.insertarCitasLaboratorio(this.RequestHorarioLaboratorio)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        },
        () => {
          this.regresarCita();
        });
  }

  private obtenerHorarios(idAmbienteTurno: number, fecha: string) {
    this.RequestHorarioLaboratorio.ordenExamenDetalleList = [];
    this.idTurno = idAmbienteTurno;
    this.fecha = fecha;

    for (let ambi of this.filtro) {
      this.ambientes2.idOrdenExamenDetalle = ambi.idOrdenExamenDetalle;
      this.ambientes2.cita.fechaCita = fecha;
      this.ambientes2.cita.ambienteTurno.idAmbienteTurno = idAmbienteTurno;
      this.RequestHorarioLaboratorio.ordenExamenDetalleList.push(this.ambientes2);
      this.ambientes2 = { idOrdenExamenDetalle: null, cita: { fechaCita: null, ambienteTurno: { idAmbienteTurno: null } } };
    }
    for (let b of this.ambientes) {
      b.color = "";
      if (b.ambienteTurnoList[0].idAmbienteTurno == idAmbienteTurno && b.ambienteTurnoList[0].fecha == fecha) {
        b.color = "bg-primary";
      }
    }
  }


  private guardarHorarios() {
    if (this.idTurno == null && this.fecha == null) {
      this.toastr.error('Debe seleccionar Horario Programación')
    } else {
      this.postHorarioLaboratorio();
    }


  }
  private regresarCita() {
    this.flgMostrar = false;
    this.cambioFlag.emit(this.flgMostrar);
  }

  ngOnInit() {
    this.getObtenerPersonaDatos();
  }
}
