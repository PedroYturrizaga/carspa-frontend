import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValoracionGeriatricaService } from '../../../../../services/valoracion-geriatrica.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-valoracion-geriatrica',
  templateUrl: './valoracion-geriatrica.component.html',
  styleUrls: ['./valoracion-geriatrica.component.scss']
})
export class ValoracionGeriatricaComponent implements OnInit {

  @Input() param;
  @Output() sendValoracionGeriatrica = new EventEmitter<any>();

  private valoracionGeriatrica: any = {
    valoracionFuncional: { funContinencia: null, funcAlimentarse: null, funcLavarse: null, funcMovilizarse: null, funcServHigienico: null, funcVestirse: null, resultadoFuncional: null },
    estadoCognitivo: {
      cognAnteriorPresidente: null, cognDiaSemana: null, cognEdad: null, cognFechaHoy: null, cognLugar: null, cognLugarNacimiento: null,
      cognPresidente: null, cognPrimerApellidoMadre: null, cognRestar: null, cognTelefono: null, cognDireccion: 0, resultadoCognitivo: null
    },
    estadoAfectivo: { afecDesgano: null, afecImpotenteIndefenso: null, afecProblemaMemoria: null, afecSatisfaccion: null, resultadoAfectivo: null },
    estadoSocioFamiliar: { famiEconomica: null, famiRedSocial: null, famiSituacion: null, famiSocial: null, famiVivienda: null, resultadoSocioFamiliar: null },
    idActoMedico: null
  };
  private resultadosAnterior = { resultadoFuncional: null, resultadoCognitivo: null, resultadoAfectivo: null, resultadoSocioFamiliar: null, idActoMedico: null }

  constructor(private _valoracionGeriatricaService: ValoracionGeriatricaService,
    private toastr: ToastsManager
  ) { }

  private getDiagnosticosAnteriores() {
    let promise = new Promise((resolve, reject) => {
      this._valoracionGeriatricaService.getDiagnosticosAnteriores(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            console.log(data);
            if (data.valoracionGeriatricaList[0]) {
              this.valoracionGeriatrica.idActoMedico = data.valoracionGeriatricaList[0].idActoMedico;
              for (let x in this.valoracionGeriatrica.valoracionFuncional) {
                this.valoracionGeriatrica.valoracionFuncional[x] = data.valoracionGeriatricaList[0][x];
              }
              for (let x in this.valoracionGeriatrica.estadoCognitivo) {
                this.valoracionGeriatrica.estadoCognitivo[x] = data.valoracionGeriatricaList[0][x];
              }
              for (let x in this.valoracionGeriatrica.estadoAfectivo) {
                this.valoracionGeriatrica.estadoAfectivo[x] = data.valoracionGeriatricaList[0][x];
              }
              for (let x in this.valoracionGeriatrica.estadoSocioFamiliar) {
                this.valoracionGeriatrica.estadoSocioFamiliar[x] = data.valoracionGeriatricaList[0][x];
              }
            }

          } else {
            this.toastr.error("Error al Obtener Diagnostico Anterior" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private onVoted(_param) {
    console.log(_param);

    let params = { valoracionGeriatrica: null };
    params.valoracionGeriatrica = { ..._param };
    this.sendValoracionGeriatrica.emit(params);
  }


  ngOnInit() {
    this.getDiagnosticosAnteriores().then(() => {
      this.resultadosAnterior.idActoMedico = this.valoracionGeriatrica.idActoMedico;
      this.resultadosAnterior.resultadoAfectivo = this.valoracionGeriatrica.estadoAfectivo.resultadoAfectivo;
      this.resultadosAnterior.resultadoCognitivo = this.valoracionGeriatrica.estadoCognitivo.resultadoCognitivo;
      this.resultadosAnterior.resultadoSocioFamiliar = this.valoracionGeriatrica.estadoSocioFamiliar.resultadoSocioFamiliar;
      this.resultadosAnterior.resultadoFuncional = this.valoracionGeriatrica.valoracionFuncional.resultadoFuncional;
    });

  }
}
