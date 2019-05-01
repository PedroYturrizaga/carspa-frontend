import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExamenesAuxiliaresService } from './../../../services/examenes-auxiliares.service';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { SesionService } from "../../../../../shared/services/sesion.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ListadoProgramacionImagenologiaComponent } from './listado-programacion-imagenologia/listado-programacion-imagenologia.component';

@Component({
  selector: 'app-cita-imagenologia',
  templateUrl: './cita-imagenologia.component.html',
  styleUrls: ['./cita-imagenologia.component.scss']
})
export class CitaImagenologiaComponent implements OnInit {
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
  private programacionImagenologia: any[] = [];
  private ambientes: any[] = [];
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private requestProgramacionImagenologia = { idArea: null, feDesde: null, feHasta: null };
  private dni: String = null;
  private cobertura: String = null;
  private idTurno: number = null;
  private fecha: string = null;
  private idProgracion: number = null;
  private lista2 = { cita: { idPlan: null, fechaCita: null, horaCita: null, numeroCupo: null, programacion: { idProgramacion: null }, ordenExamenDetalleList: [] } }

  private nameLeonel: any = "";
  constructor(private _examenesAuxiliares: ExamenesAuxiliaresService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
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
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }


  private obtenerProgramacionImagenologia() {
    this.requestProgramacionImagenologia.idArea = this.idArea;
    this._examenesAuxiliares.obtenerProgramacion(this.requestProgramacionImagenologia)
      .subscribe(data => {
        if (data.estado == 1) {
          this.programacionImagenologia = data.programacionList;
          if (this.programacionImagenologia.length > 0) {
            this.paginationParameter.total_rows = this.programacionImagenologia[0].nuTotalReg;
          } else {
            this.toastr.error("No se Encontran Datos");
          }
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        },
        () => {

        });

  }

  private ObtenerListadoProgramacion(idProgramacion: number, feProgramacion: string, i: number) {//nameLeonel
    for (let a of this.programacionImagenologia) {
      a.color = "";
      if (a.idProgramacion == idProgramacion) {
        a.color = "bg-primary";
      }
    }
    const modalRef = this.modalService.open(ListadoProgramacionImagenologiaComponent, { size: "lg", backdrop: "static", keyboard: false });
    modalRef.componentInstance.idProgramacion = idProgramacion;
    modalRef.componentInstance.feProgramacion = feProgramacion;
    modalRef.componentInstance.lista2 = this.lista2;
    modalRef.result.then((result) => {
      let i = 0;
      this.nameLeonel = this.programacionImagenologia[i].personal.nombrePersonal + " " + this.programacionImagenologia[i].personal.apellidoPaternoPersonal + " " + this.programacionImagenologia[i].personal.apellidoMaternoPersonal;
      for (let progra of this.filtro) {
        let param: any = { idOrdenExamenDetalle: null };
        param.idOrdenExamenDetalle = progra.idOrdenExamenDetalle;
        this.lista2.cita.idPlan = this.idCobertura;
        this.lista2.cita.ordenExamenDetalleList.push(param);
        this.lista2.cita.programacion.idProgramacion = idProgramacion;
        this.lista2.cita.fechaCita = feProgramacion;
        i++;
      }
      console.log(this.lista2);
    }, (reason) => {
      console.log(this.lista2);
    });
  }

  private postCitaImagenologia() {
    this._examenesAuxiliares.insertarCitasImagenologia(this.lista2)
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

  private guardarProgramacionImagenologia() {
    if (this.lista2.cita.programacion.idProgramacion == null && this.lista2.cita.programacion.idProgramacion == null && this.lista2.cita.numeroCupo == null && this.lista2.cita.horaCita == null) {
      this.toastr.error('Debe seleccionar Horario Programación');
    } else {
      this.postCitaImagenologia();
    }
  }

  private buscarPorFiltro() {
    if (this.requestProgramacionImagenologia.feDesde == null || this.requestProgramacionImagenologia.feHasta == null) {
      this.toastr.error('Debe ingresar datos de busqueda');
    } else {
      this.obtenerProgramacionImagenologia();
      this.requestProgramacionImagenologia.feDesde = null;
      this.requestProgramacionImagenologia.feHasta = null;
    }
  }

  private regresarCita() {
    this.flgMostrar = false;
    this.cambioFlag.emit(this.flgMostrar);
  }

  ngOnInit() {
    this.getObtenerPersonaDatos();
    console.log(this.filtro);
  }
}
