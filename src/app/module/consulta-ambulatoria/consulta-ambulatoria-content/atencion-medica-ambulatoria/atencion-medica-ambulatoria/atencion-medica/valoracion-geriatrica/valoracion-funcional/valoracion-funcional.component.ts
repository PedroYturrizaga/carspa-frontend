import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValoracionGeriatricaService } from '../../../../../../services/valoracion-geriatrica.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-valoracion-funcional',
  templateUrl: './valoracion-funcional.component.html',
  styleUrls: ['./valoracion-funcional.component.scss']
})
export class ValoracionFuncionalComponent implements OnInit {
  @Input() param;
  @Input() valoracionGeriatrica;
  @Output() onVoted = new EventEmitter<{}>();

  private _params = {
    idGrupoValoracion: 1,
    puntaje: null
  }

  constructor(
    private _valoracionGeriatricaService: ValoracionGeriatricaService,
    private toastr: ToastsManager
  ) { }

  public radioButom() {
    let suma = this.calcularSuma();
    if (suma != null) {
      this.getResultadoPuntaje(suma).then(() => {
        this.vote();
      });
    }else{
      this.valoracionGeriatrica.valoracionFuncional.resultadoFuncional = null;
      this.vote();
    }
  }

  private calcularSuma() {
    let suma = null;
    for (let x in this.valoracionGeriatrica.valoracionFuncional) {
      if (x != "resultadoFuncional") {

        if (this.valoracionGeriatrica.valoracionFuncional[x] == null) {
          return null;
        } else {
          suma += this.valoracionGeriatrica.valoracionFuncional[x];
        }
      }
    }
    return suma;
  }

  private getResultadoPuntaje(suma) {
    this._params.puntaje = suma;
    let promise = new Promise((resolve, reject) => {
      this._valoracionGeriatricaService.getResultadoPuntajePorValoracion(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.valoracionGeriatrica.valoracionFuncional.resultadoFuncional = data.valoracionGeriatricaList[0].resultado;
          } else {
            this.toastr.error("Error al Obtener Puntaje" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
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
