import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { PersonaService } from '../../../shared/services/persona.service';


@Component({
  selector: 'app-persona-datos',
  templateUrl: './persona-datos.component.html',
  styleUrls: ['./persona-datos.component.scss']
})
export class PersonaDatosComponent implements OnInit {

  @Input() idCita: string;

  @Output() sendDatosPersonales = new EventEmitter<any>();

  private cabeceraDatosPersona = { persona: { planList: [{ iafas: {}, cobertura: { descripcionCobertura: null } }], estadoCivil: {}, tipoDocumentoIdentidad: {}, tipoSangre: {}, ocupacion: {}, sexo: {}, historiaList: [{}], gradoInstruccion: {}, filiadoList: [{ ubigeo: {}, parentescoAcompanante: {} }] } };
  private documentoIdentidad: String = "";
  constructor(
    private toastr: ToastsManager,
    private _personaService: PersonaService
  ) { }

  ngOnInit() {
    this.getDatosPersona();
  }
  ngOnChanges(){
    this.getDatosPersona();
  }
  private getDatosPersona() {
    console.log(this.idCita);
    this._personaService.getDatosPersona(this.idCita)
      .subscribe(data => {
        // console.log(data);
        if (data.estado == 1) {
          this.cabeceraDatosPersona.persona = data.persona;
          this.sendDatosPersonales.emit(this.cabeceraDatosPersona);
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
