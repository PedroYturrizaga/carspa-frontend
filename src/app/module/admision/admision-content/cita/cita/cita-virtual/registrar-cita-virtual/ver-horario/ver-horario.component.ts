import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';

import { CitaService } from '../../../../../../services/cita.service';
import { log } from 'util';

@Component({
  selector: 'app-ver-horario',
  templateUrl: './ver-horario.component.html',
  styleUrls: ['./ver-horario.component.scss']
})

export class VerHorarioComponent implements OnInit {

  @Input() idProgramacion;
  @Input() fecha;
  @Input() variablesEnviar;

  private horarioCitaVirtual: any[];
  private params: any = { idProgramacion: "" };
  private cont = 0;

  constructor(private activeModal: NgbActiveModal, private toastr: ToastsManager, private _citaService: CitaService) {
    this.horarioCitaVirtual = [];
  }

  private listarHorario() {
    // console.log(this.params);
    this.params.idProgramacion = this.idProgramacion;

    this._citaService.obtenerHorarioCitaVirtual(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.horarioCitaVirtual = data.horarioCitaVirtualList;

          for (let cv of this.horarioCitaVirtual) {
            this.cont = this.cont + 1;
            cv.numeroCupo = this.cont;

            if (cv.consultorio == null) {
              cv.activo = true;
            } else {
              cv.activo = false;
            }
          }
          console.log(this.horarioCitaVirtual);
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

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

  private horarioSelect(horaCita, numeroCupo) {
    this.variablesEnviar.horaCita = horaCita;
    this.variablesEnviar.numeroCupo = numeroCupo;
    console.log(this.variablesEnviar);
    this.close();
  }

  ngOnInit() {
    this.listarHorario();
  }
}