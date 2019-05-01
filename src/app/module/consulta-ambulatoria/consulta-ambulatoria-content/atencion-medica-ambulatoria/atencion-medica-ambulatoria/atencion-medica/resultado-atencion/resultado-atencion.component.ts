import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ResultadoAtencionService } from '../../../../../services/resultado-atencion.service';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-resultado-atencion',
  templateUrl: './resultado-atencion.component.html',
  styleUrls: ['./resultado-atencion.component.scss']
})
export class ResultadoAtencionComponent implements OnInit {

  @Output() sendResultadoAtencion = new EventEmitter<string>();
  @Input() param;

  private destinoAtencionR: any = { idDestino: null, destinoAtencion: {} };
  private destinosAtencion: any[];
  // private comboDestinosAtencion: any;
  private comboServicioHopsInternamiento: any;
  private fechaInternamiento: any;

  private numeroDiasProximaRecita: any;

  private especialidad: any[];
  private comboEspecialidad: any;
  private actividad: any[];
  private comboActividad: any;
  private subActividad: any[];
  private comboSubActividad: any;
  private motivoHospi: any;

  private diasProximaInterconsulta: any;

  // private resultadAtencion



  constructor(private _resultadoAtencionService: ResultadoAtencionService,
    private toastr: ToastsManager,
    private router: Router
  ) { }

  private resultadoAtencion() {
    this.destinoAtencionR = { idDestino: null, destinoAtencion: {} };

    this.destinoAtencionR.idDestino = this.param.idDestino;
    if (this.param.idDestino == 7) {
      this.destinoAtencionR.destinoAtencion.codigoOperacion = this.comboServicioHopsInternamiento;
      this.destinoAtencionR.destinoAtencion.fechaOperacion = this.fechaInternamiento;
      this.destinoAtencionR.destinoAtencion.descripcionOperacion = this.motivoHospi;
    } else if (this.param.idDestino == 8) {
      this.destinoAtencionR.destinoAtencion.idEspecialidad = this.comboEspecialidad;
      this.destinoAtencionR.destinoAtencion.idActividad = this.comboActividad;
      this.destinoAtencionR.destinoAtencion.idSubActividad = this.comboSubActividad;
      this.destinoAtencionR.destinoAtencion.nroDiasInterconsulta = this.diasProximaInterconsulta;
    } else if (this.param.idDestino == 11) {
      this.destinoAtencionR.destinoAtencion.nroDiasRecita = this.numeroDiasProximaRecita;
    } else if (this.param.idDestino == 12) {
      this.destinoAtencionR.destinoAtencion.idEspecialidad = this.comboEspecialidad;
      this.destinoAtencionR.destinoAtencion.idActividad = this.comboActividad;
      this.destinoAtencionR.destinoAtencion.idSubActividad = this.comboSubActividad;
      this.destinoAtencionR.destinoAtencion.nroDiasInterconsulta = this.diasProximaInterconsulta;
      this.destinoAtencionR.destinoAtencion.nroDiasRecita = this.numeroDiasProximaRecita;
    } else {
      this.destinoAtencionR.destinoAtencion = {};
    }
    let params: any = { resultadoAtencion: null };

    params.resultadoAtencion = this.destinoAtencionR;
    console.log(params);
    this.sendResultadoAtencion.emit(params);
  }

  private getServicio(idActoMedico) {
    console.log(idActoMedico);
    this._resultadoAtencionService.obtenerResultadoAtencion(idActoMedico)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          // console.log(data.destinoAtencion);
          // console.log(this.param.idDestino);
          if (data.destinoAtencion != null) {
            // if (this.param.idDestino == 7) {
            this.comboServicioHopsInternamiento = data.destinoAtencion.codigoOperacion;
            this.fechaInternamiento = data.destinoAtencion.fechaOperacion;
            this.motivoHospi = data.destinoAtencion.descripcionOperacion;
            // }else if(this.param.idDestino == 8){
            this.comboEspecialidad = data.destinoAtencion.idEspecialidad;
            this.comboActividad = data.destinoAtencion.idActividad;
            this.diasProximaInterconsulta = data.destinoAtencion.nroDiasInterconsulta;
            this.comboSubActividad = data.destinoAtencion.idSubActividad;
            // }else if(this.param.idDestino == 11){
            this.numeroDiasProximaRecita = data.destinoAtencion.nroDiasRecita;
            // }else if(this.param.idDestino == 12){
            this.comboEspecialidad = data.destinoAtencion.idEspecialidad;
            this.comboActividad = data.destinoAtencion.idActividad;
            this.diasProximaInterconsulta = data.destinoAtencion.nroDiasInterconsulta;
            this.comboSubActividad = data.destinoAtencion.idSubActividad;
            this.numeroDiasProximaRecita = data.destinoAtencion.nroDiasRecita;
          }
          // }
        } else {
          this.toastr.error("Error al obtener getServicio " + data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getComboDestinosAtencion() {
    this._resultadoAtencionService.ObtenerDestinos()
      .subscribe(data => {
        if (data.estado == 1) {
          this.destinosAtencion = data.listDestinos;
        } else {
          this.toastr.error("Error en getComboDestinosAtencion" + data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getEspecialidad() {
    let area: any;
    // debugger
    area = (this.param.idDestino == 7) ? 3 : 1;
    // console.log(area);
    this._resultadoAtencionService.obtenerEspecialida(area)
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidad = data.especialidadList;
          this.actividad = [];
          this.subActividad = [];
          this.comboActividad = 0;
          this.comboSubActividad = 0;
          if (this.especialidad.length == 0) {
            this.comboEspecialidad = 0;
          }
        } else {
          this.toastr.error("Error servicio getEspecialidad " + data.mensaje);
          console.log(data);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getActividad() {
    if (this.comboEspecialidad == 0) {
      this.actividad = [];
      this.subActividad = [];
      this.comboActividad = 0;
      this.comboSubActividad = 0;
      return;
    }
    this._resultadoAtencionService.obtenerActividad(1, this.comboEspecialidad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.actividad = data.actividadList;
          this.subActividad = [];
          this.comboSubActividad = 0;
          if (this.actividad.length == 0) {
            this.comboActividad = 0;
          }
        } else {
          this.toastr.error("Error servicio obtenerActividad " + data.mensaje);
          console.log(data);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
    // this.resultadoAtencion();
  }

  private getSubActividad() {
    if (this.comboActividad == 0) {
      this.subActividad = [];
      this.comboSubActividad = 0;
      return;
    }
    this._resultadoAtencionService.obtenerSubActividad(1, this.comboEspecialidad, this.comboActividad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.subActividad = data.subActividadList;
          if (this.subActividad.length == 0) {
            this.comboSubActividad = 0;
          }
        } else {
          this.toastr.error("Error servicio obtenerSubActividad " + data.mensaje);
          console.log(data);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
    this.resultadoAtencion();

  }

  ngOnInit() {
    // debugger
    this.getComboDestinosAtencion();
    if ((this.param.idActoMedicoEncriptado != undefined || this.param.idActoMedicoEncriptado != null) && this.param.idActoMedicoEncriptado != "") {
      this.param.idDestino = this.param.idDestino;
      this.getServicio(this.param.idActoMedicoEncriptado);
      this.resultadoAtencion();
    }
    this.getEspecialidad();


    this.param.idDestino = 0;
    this.comboServicioHopsInternamiento = 0;
    this.comboEspecialidad = 0;
    this.comboActividad = 0;
    this.comboSubActividad = 0;
  }

}
