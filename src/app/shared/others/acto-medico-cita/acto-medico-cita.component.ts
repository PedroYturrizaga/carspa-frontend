import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { PersonaService } from '../../../shared/services/persona.service';
import { ActoMedicoCitaService } from '../../../shared/services/acto-medico-cita.service';

@Component({
  selector: 'app-acto-medico-cita',
  templateUrl: './acto-medico-cita.component.html',
  styleUrls: ['./acto-medico-cita.component.scss']
})
export class ActoMedicoCitaComponent implements OnInit {

  @Input() idCita: string;
  @Output() enviarFechaHijoPadre = new EventEmitter<string>();
  private cabeceraActoMedico = { lsActoMedicoAtencion: {} };

  constructor(
    private toastr: ToastsManager,
    private _actoMedicoCitaService: ActoMedicoCitaService
  ) { }

  ngOnInit() {
    this.getActoMedicoByCita();
  }
  sendMessage() {
    this.enviarFechaHijoPadre.emit(this.cabeceraActoMedico.lsActoMedicoAtencion["feCita"]);
  }
  ngOnChanges(){
    this.getActoMedicoByCita();
  }
  private getActoMedicoByCita() {
    this._actoMedicoCitaService.getActoMedicoByCita(this.idCita)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraActoMedico.lsActoMedicoAtencion = data.lsActoMedicoAtencion;
          // console.log(data);
          this.sendMessage();
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

}
