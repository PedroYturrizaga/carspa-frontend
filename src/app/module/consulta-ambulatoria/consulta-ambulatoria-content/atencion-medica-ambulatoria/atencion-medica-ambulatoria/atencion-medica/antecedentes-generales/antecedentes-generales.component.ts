import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';

@Component({
  selector: 'app-antecedentes-generales',
  templateUrl: './antecedentes-generales.component.html',
  styleUrls: ['./antecedentes-generales.component.scss']
})
export class AntecedentesGeneralesComponent implements OnInit {

  @Input() listaDisabled: any;
  @Input() listaComboBox: any = { lsOpcionValorCombo: [{}] };
  @Input() param;
  @Output() sendGenerales = new EventEmitter<string>();

  private listaAntecedenteGeneral: any = { tipoVivienda: 11, idGradoInstruccion: 19 };
  private tipoVivienda: any = [{ idOpcion: null, valorOpcion: null }];
  private GradoInstruccion: any = [{ idOpcion: null, valorOpcion: null }];
  private flg_disabled: boolean = false;

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) { }

  ngOnInit() {
    // if ((this.param.idActoMedicoEncriptado != null || this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
      this.generales();
    // }

    this.tipoVivienda = this.listaComboBox[3].lsOpcionValorCombo;
    this.GradoInstruccion = this.listaComboBox[5].lsOpcionValorCombo;
  }

  private generales() {
    this.servicio().then(() => {
      this.send();
    });
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      // console.log(this.param);
      this._atencionService.obtenerAntecedenteGeneral(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedenteGeneral = data.antecedenteGeneral;
            // console.log(this.listaAntecedenteGeneral);
          } else {
            this.toastr.error("Error en obtenerAntecedenteGeneral " + data.mensaje);
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
    _params.generales = this.listaAntecedenteGeneral;
    this.sendGenerales.emit(_params);
  }

}
