import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValoracionGeriatricaService } from '../../../../../../services/valoracion-geriatrica.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-estado-cognitivo',
  templateUrl: './estado-cognitivo.component.html',
  styleUrls: ['./estado-cognitivo.component.scss']
})
export class EstadoCognitivoComponent implements OnInit {
  @Input() param;
  @Input() valoracionGeriatrica;
  @Output() onVoted = new EventEmitter<{}>();

  private _params = {
    idGrupoValoracion: 2,
    puntaje: null
  }

  constructor(
    private _valoracionGeriatricaService: ValoracionGeriatricaService,
    private toastr: ToastsManager
  ) { }

  private getResultadoPuntaje(suma) {
    this._params.puntaje = suma;
    let promise = new Promise((resolve, reject) => {
      this._valoracionGeriatricaService.getResultadoPuntajePorValoracion(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.valoracionGeriatrica.estadoCognitivo.resultadoCognitivo = data.valoracionGeriatricaList[0].resultado;
          } else {
            this.toastr.error("Error" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private newFunction() {
    let suma = this.calcularSuma();

    if (suma != null) {
      this.getResultadoPuntaje(suma).then(() => {
        this.vote();
      });
    }

  }

  private calcularSuma() {
    let suma = null;
    for (let x in this.valoracionGeriatrica.estadoCognitivo) {
      if (x != "resultadoCognitivo") {
        this.valoracionGeriatrica.estadoCognitivo[x] = (this.valoracionGeriatrica.estadoCognitivo[x] ? 1 : 0);
        suma += this.valoracionGeriatrica.estadoCognitivo[x];
      }
    }
    return suma;
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
