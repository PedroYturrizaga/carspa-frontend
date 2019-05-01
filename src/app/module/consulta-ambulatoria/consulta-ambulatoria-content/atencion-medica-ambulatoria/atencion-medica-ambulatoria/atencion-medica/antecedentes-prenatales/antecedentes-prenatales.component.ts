import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import { AtencionMedicaService } from './../../../../../services/atencion-medica.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-antecedentes-prenatales',
  templateUrl: './antecedentes-prenatales.component.html',
  styleUrls: ['./antecedentes-prenatales.component.scss']
})
export class AntecedentesPrenatalesComponent implements OnInit {


  @Input() InsertLstAntPrenatales = { idEmbarazo: null, patologiaGestacion: null };
  @Input() listaComboBox;
  @Input() param;

  @Output() sendPrenatales = new EventEmitter<string>();

  private listaAntecedentePrenatales: any = {};

  // private lugarAPN: any;
  private flg_espec: number = 4;
  private flg_disabled: boolean = false;
  private aten_prenat: number = 9;

  private atencionPrenatal: any = [{ idOpcion: null, valorOpcion: null }];
  private lugarParto: any = [{ idOpcion: null, valorOpcion: null }];
  private atendidoPor: any = [{ idOpcion: null, valorOpcion: null }];

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) { }


  ngOnInit() {
    this.prenatales();
  }

  private prenatales() {
    this.servicio().then(() => {
      this.atencionPrenatal = this.listaComboBox[2].lsOpcionValorCombo;
      this.lugarParto = this.listaComboBox[0].lsOpcionValorCombo;
      this.atendidoPor = this.listaComboBox[1].lsOpcionValorCombo;
      this.send();
    });
  }

  private send() {
    //valida si tiene ATENCION PRENATAL
    if (this.listaAntecedentePrenatales.atencionPrenatal == 10) {
      this.listaAntecedentePrenatales.lugarApn = null;
      this.listaAntecedentePrenatales.nroApn = null;
    }
    //valida 
    if (this.listaAntecedentePrenatales.atendidoPor != 8) {
      this.listaAntecedentePrenatales.descripcionAtendidoPor = null;
    }
    let _params: any = { prenatales: null };
    _params.prenatales = this.listaAntecedentePrenatales;
    this.sendPrenatales.emit(_params);
    // console.log(_params);
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerPrenatales(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedentePrenatales = data.antecedentePrenatal;
            // console.log(this.listaAntecedentePrenatales);
          } else {
            this.toastr.error("Error en obtenerPrenatales" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
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