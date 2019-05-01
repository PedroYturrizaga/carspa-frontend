import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';

@Component({
  selector: 'app-antecedentes-fisiologicos',
  templateUrl: './antecedentes-fisiologicos.component.html',
  styleUrls: ['./antecedentes-fisiologicos.component.scss']
})
export class AntecedentesFisiologicosComponent implements OnInit {

  @Input() listaDisabled;
  @Input() listaComboBox: any = { lsOpcionValorCombo: [{}] };
  @Input() param;
  @Output() sendFisiologico = new EventEmitter<string>();

  private flg_disabled: boolean;
  private tipoNacimiento: any = [{ idOpcion: null, valorOpcion: null }];
  private tipoLactancia: any = [{ idOpcion: null, valorOpcion: null }];
  private listaAntecedenteFisiologicoPersona: any = { tipoNacimiento: 24, lactancia: 26 };

  private lsprueba: any = [];

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) {
  }

  ngOnInit() {
    // console.log(this.param);
    // if ((this.param.idActoMedicoEncriptado != null || this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
      this.fisiologico();
    // }
    this.tipoNacimiento = this.listaComboBox[6].lsOpcionValorCombo;
    this.tipoLactancia = this.listaComboBox[7].lsOpcionValorCombo;
  }

  private fisiologico() {
    this.servicio().then(() => {
      this.send();
    });

  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerAntecedenteFisiologicoPersona(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedenteFisiologicoPersona = data.antecedenteFisiologico;
          } else {
            this.toastr.error("Error en obtenerAntecedenteFisiologicoPersona" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private send() {
    let _params: any = {};
    _params.fisiologico = this.listaAntecedenteFisiologicoPersona;
    this.sendFisiologico.emit(_params);
  }

}
