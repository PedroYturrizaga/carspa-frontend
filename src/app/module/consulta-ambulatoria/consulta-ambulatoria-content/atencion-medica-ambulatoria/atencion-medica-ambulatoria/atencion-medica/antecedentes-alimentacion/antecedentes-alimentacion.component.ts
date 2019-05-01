import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';

@Component({
  selector: 'app-antecedentes-alimentacion',
  templateUrl: './antecedentes-alimentacion.component.html',
  styleUrls: ['./antecedentes-alimentacion.component.scss']
})
export class AntecedentesAlimentacionComponent implements OnInit {

  @Input() listaComboBox: any = { lsOpcionValorCombo: [{}] };
  @Input() param;
  @Output() sendAlimentacion = new EventEmitter<string>();

  private primerosMeses: any = [{ idOpcion: null, valorOpcion: null }];
  private listaAntecedenteAlimentacion: any = {};
  private flg_disabled: boolean = false;
  private checked_suplementoFe: boolean = false;

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) { }

  ngOnInit() {
    this.alimentacion();
  }

  private alimentacion() {
    this.servicio().then(() => {
      this.primerosMeses = this.listaComboBox[4].lsOpcionValorCombo;
      this.send();
    });
  }

  private send() {
    let _params: any = {};
    _params.alimentacion = this.listaAntecedenteAlimentacion;
    _params.alimentacion.suplementoFe = (this.listaAntecedenteAlimentacion.suplementoFe) ? 1 : 0;
    this.sendAlimentacion.emit(_params);
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerAntecedenteAlimentacion(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedenteAlimentacion = data.antecedenteAlimentacion;
          } else {
            this.toastr.error("Error en obtenerAntecedenteAlimentacion" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }
}
