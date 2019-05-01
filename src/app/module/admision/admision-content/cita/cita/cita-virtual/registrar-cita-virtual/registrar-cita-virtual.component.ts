import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';

import { VerHorarioComponent } from './ver-horario/ver-horario.component';

import { AreaService } from '../../../../../../../shared/services/area.service';
import { EspecialidadService } from '../../../../../../../shared/services/especialidad.service';
import { FechaService } from '../../../../../../../shared/services/fecha.service';
import { CitaService } from '../../../../../services/cita.service';
import { log } from 'util';

const now = new Date();

@Component({
  selector: 'app-registrar-cita-virtual',
  templateUrl: './registrar-cita-virtual.component.html',
  styleUrls: ['./registrar-cita-virtual.component.scss']
})

export class RegistrarCitaVirtualComponent implements OnInit {

  private areaSelected: any;
  private especialidadSelected: any;
  private programacionCitaVirtualSelected: any;
  private mesSelected: any;
  private anioSelected: any;

  private areas: any[];
  private especialidades: any[];
  private programacionesCitaVirtual: any[] = [];
  private meses: any[];
  private anios: any[];
  private params: any = { idPersonal: "10000007700", idArea: null, idEspecialidad: null, idActividad: 17, idSubActividad: 4, mes: "", ano: "", idProgrmacion: "" };
  //parametros para insertar la citaVirtual
  private params2: any = { codUsuario: "acastillo", horaCita: "", idIPRESS: "0000007733", idIPRESSR: "", idPersona: "14800343900", idPersonalE: "10000007700", idPersonalR: "", idProgramacion: "", nombreSala: "", numeroCupo: 0, tipoPrestacion: 1 };
  private citaReservada: any = { establecimiento: "-", medico: "-", especialidad: "-", fecha: "-", horario: "-" };
  private variablesEnviar: any = {};

  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private _areaService: AreaService,
    private _especialidadService: EspecialidadService,
    private _fechaService: FechaService,
    private toastr: ToastsManager,
    private _citaService: CitaService) {

    this.areaSelected = null;
    this.especialidadSelected = null;
    this.programacionCitaVirtualSelected = null;
    this.mesSelected = { id: now.getMonth() };
    this.anioSelected = { valor: now.getFullYear() };

    this.areas = [];
    this.especialidades = [];
    this.programacionesCitaVirtual = [];
    this.meses = [];
    this.anios = [];
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

  private modalVerHorario(item) {

    console.log(item);
    this.params2.idProgramacion = item.idProgramacion;
    this.params2.idIPRESSR = item.idIPRESS;
    this.params2.idPersonalR = item.idPersonal;

    const modalRef = this.modalService.open(VerHorarioComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.idProgramacion = item.idProgramacion;
    modalRef.componentInstance.fecha = item.fecha;
    modalRef.componentInstance.variablesEnviar = this.variablesEnviar;

    modalRef.result.then((result) => {
      //cuando se ejecuta el metodo close
      this.params2.numeroCupo = this.variablesEnviar.numeroCupo;
      this.params2.horaCita = this.variablesEnviar.horaCita;
      //guarda cita reservada
      this.citaReservada.establecimiento = item.nombreComercialIPRESS;
      this.citaReservada.medico = item.nombreMedico;
      this.citaReservada.especialidad = this.especialidadSelected["valor"];
      this.citaReservada.fecha = item.fecha;
      this.citaReservada.horario = this.variablesEnviar.horaCita;

    }, (reason) => {

    });
  }

  private getAllMeses() {
    this._fechaService.obtenerMeses()
      .subscribe(data => {
        this.meses = data;
      },
        error => {
          console.error(error);
        });
  }

  private getAllAnios() {
    this._fechaService.obtenerAnios()
      .subscribe(data => {
        this.anios = data;
      },
        error => {
          console.error(error);
        });
  }

  private getAllAreas() {
    this._areaService.obtenerAreas()
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllEspecialidades() {
    if (this.areaSelected == null) {
      return;
    }
    this._especialidadService.obtenerEspecialidades(this.areaSelected.id)
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidades = data.especialidadList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private busquedaProgramacionCitaVirtual() {
    this.params.ano = this.anioSelected.valor;
    this.params.idEspecialidad = this.especialidadSelected["id"];
    this.params.idArea = this.areaSelected["id"];

    this._citaService.obtenerProgramacionCitaVirtual(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.programacionesCitaVirtual = data.programacionCitaVirtualList;
          console.log(this.programacionesCitaVirtual);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private insertatCitaVirtual() {

    this._citaService.insertarCitaVirtualProgramada(this.params2)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se inserto Correctamente" + data.mensaje);
        } else {
          this.toastr.error("Error al insertar" + data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
    this.close();
  }

  ngOnInit() {
    this.getAllAreas();
    this.getAllMeses();
    this.getAllAnios();
  }
}