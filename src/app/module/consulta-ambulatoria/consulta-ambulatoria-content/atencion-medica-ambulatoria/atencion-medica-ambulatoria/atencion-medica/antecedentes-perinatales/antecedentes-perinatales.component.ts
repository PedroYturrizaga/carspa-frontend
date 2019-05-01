import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-antecedentes-perinatales',
  templateUrl: './antecedentes-perinatales.component.html',
  styleUrls: ['./antecedentes-perinatales.component.scss']
})
export class AntecedentesPerinatalesComponent implements OnInit {

  @Input() param;
  @Input() prueba;
  @Output() sendPerinatales = new EventEmitter<string>();

  private listaAntecedentePerinatal: any = {};
  private Hosp_check: number = 0;
  private flg_disabled: boolean = false;
  private hospit

  private ls: any = {};
  private bb: any = "";

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) { }

  ngOnInit() {
    this.perinatales();
  }

  private perinatales() {
    this.servicio().then(() => {
      this.send();
    });
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerAntecedentePerinatal(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedentePerinatal = data.antecedentePerinatal;
            // console.log(this.listaAntecedentePerinatal);
          } else {
            this.toastr.error("Error en obtenerAntecedentePerinatal" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private send() {
    if (this.listaAntecedentePerinatal.paotologiaNeonatal == 0) {
      this.listaAntecedentePerinatal.descripcionPaotologiaNeonatal = null;
    }
    if (this.listaAntecedentePerinatal.hospitalizacion == 0) {
      this.listaAntecedentePerinatal.tiempoHospitalizacion = null;
    }
    let _params: any = {};
    _params.perinatales = this.listaAntecedentePerinatal;
    this.sendPerinatales.emit(_params);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

}
