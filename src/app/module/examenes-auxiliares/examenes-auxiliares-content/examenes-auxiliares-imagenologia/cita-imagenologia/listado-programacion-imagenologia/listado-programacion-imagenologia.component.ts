import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamenesAuxiliaresService } from './../../../../services/examenes-auxiliares.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SesionService } from "../../../../../../shared/services/sesion.service";

@Component({
  selector: 'app-listado-programacion-imagenologia',
  templateUrl: './listado-programacion-imagenologia.component.html',
  styleUrls: ['./listado-programacion-imagenologia.component.scss']
})
export class ListadoProgramacionImagenologiaComponent implements OnInit {

  @Input() idProgramacion;
  @Input() feProgramacion;
  @Input() lista2
  private fech: string = null;
  private IPRESS: any;
  private listadoProgramacion = [];
  private RequestProgramacion = { idProgramacion: null };
  constructor(public activeModal: NgbActiveModal,
    private _examenesAuxiliares: ExamenesAuxiliaresService,
    private toastr: ToastsManager
  ) {
    this.IPRESS = SesionService.obtenerElementos().IPRESS;
  }

  private ObtenerProgramacion() {
    this.RequestProgramacion.idProgramacion = this.idProgramacion;
    this._examenesAuxiliares.obtenerListadoProgramacion(this.RequestProgramacion)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listadoProgramacion = data.cita;
          console.log(this.listadoProgramacion);
          this.listadoProgramacion.forEach(programacion => {
            if (programacion.persona == undefined) {
              programacion.persona = {};
            }
            if (programacion.persona.numeroDocumentoIdentidad != null && programacion.persona.nombres != null) {
              programacion.flag = false;
            } else {
              programacion.flag = true;
            }
          }
          )
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
  }

  private obtenerDetalleProgramacion(horaAtencion: string, cupos: string) {
    this.lista2.cita.horaCita = horaAtencion;
    this.lista2.cita.numeroCupo = cupos;
    this.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

  ngOnInit() {
    this.ObtenerProgramacion();
    console.log("entro a listado");
  }
}
