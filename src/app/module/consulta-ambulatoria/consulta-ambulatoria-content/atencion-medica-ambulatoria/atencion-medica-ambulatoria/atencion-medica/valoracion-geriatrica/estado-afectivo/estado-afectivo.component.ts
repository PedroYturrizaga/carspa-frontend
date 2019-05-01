import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ValoracionGeriatricaService } from '../../../../../../services/valoracion-geriatrica.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-estado-afectivo',
  templateUrl: './estado-afectivo.component.html',
  styleUrls: ['./estado-afectivo.component.scss']
})
export class EstadoAfectivoComponent implements OnInit {
  @Input() param;
  @Input() valoracionGeriatrica;
  @Output() onVoted = new EventEmitter<{}>();

  private _params = {
    idGrupoValoracion: 3,
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
      this.valoracionGeriatrica.estadoAfectivo.resultadoAfectivo = null;
      this.vote();
    }

  }

  private calcularSuma() {
    let suma = null;
    for (let x in this.valoracionGeriatrica.estadoAfectivo) {
      if (x != "resultadoAfectivo") {

        if (this.valoracionGeriatrica.estadoAfectivo[x] == null) {
          return null;
        } else {
          suma += this.valoracionGeriatrica.estadoAfectivo[x];
        }
      }
    }
    return suma;
  }

  private getResultadoPuntaje(suma) {

    let promise = new Promise((resolve, reject) => {

      this._params.puntaje = suma;
      this._valoracionGeriatricaService.getResultadoPuntajePorValoracion(this._params)
        .subscribe(data => {
          if (data.estado == 1) {

            this.valoracionGeriatrica.estadoAfectivo.resultadoAfectivo = data.valoracionGeriatricaList[0].resultado;
          } else {
            this.toastr.error("Error al Obtener Puntaje" + data.mensaje);
          }
          resolve();
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
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