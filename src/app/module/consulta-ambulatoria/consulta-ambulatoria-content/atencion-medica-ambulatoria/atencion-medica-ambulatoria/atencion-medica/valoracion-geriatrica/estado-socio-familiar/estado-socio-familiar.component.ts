import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValoracionGeriatricaService } from '../../../../../../services/valoracion-geriatrica.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-estado-socio-familiar',
  templateUrl: './estado-socio-familiar.component.html',
  styleUrls: ['./estado-socio-familiar.component.scss']
})
export class EstadoSocioFamiliarComponent implements OnInit {
  @Input() param;
  @Input() valoracionGeriatrica;
  @Output() onVoted = new EventEmitter<{}>();

  private _params = {
    idGrupoValoracion: 4,
    puntaje: null
  }
  constructor(
    private _valoracionGeriatricaService: ValoracionGeriatricaService,
    private toastr: ToastsManager
  ) { }

  private getResultadoPuntaje(suma) {
    let promise = new Promise((resolve, reject) => {
      this._params.puntaje = suma;
      this._valoracionGeriatricaService.getResultadoPuntajePorValoracion(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.valoracionGeriatrica.estadoSocioFamiliar.resultadoSocioFamiliar = data.valoracionGeriatricaList[0].resultado;
          } else {
            this.toastr.error("Error" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private calcularSuma() {
    let suma = null;
    for (let x in this.valoracionGeriatrica.estadoSocioFamiliar) {
      if (x != "resultadoSocioFamiliar") {

        if (this.valoracionGeriatrica.estadoSocioFamiliar[x] == null) {
          return null;
        } else {
          suma += this.valoracionGeriatrica.estadoSocioFamiliar[x];
        }
      }
    }
    return suma;
  }

  public capturar() {
    let suma = this.calcularSuma();
    if (suma != null) {
      this.getResultadoPuntaje(suma).then(() => {
        this.vote();
      });
    } else {
      this.valoracionGeriatrica.estadoSocioFamiliar.resultadoSocioFamiliar = null;
      this.vote();
    }
  }

  private vote() {
    let params = {
      ...this.valoracionGeriatrica.valoracionFuncional,
      ...this.valoracionGeriatrica.estadoCognitivo,
      ...this.valoracionGeriatrica.estadoAfectivo,
      ...this.valoracionGeriatrica.estadoSocioFamiliar
    }
    this.onVoted.emit(params);
  }

  ngOnInit() {

  }
}
