import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsquemaDeVacunacionService } from '../../../../../services/esquema-de-vacunacion.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';

import { MatPaginator, MatTableDataSource, MatIconRegistry } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { isNull } from 'util';
@Component({
  selector: 'app-esquema-de-vacunacion',
  templateUrl: './esquema-de-vacunacion.component.html',
  styleUrls: ['./esquema-de-vacunacion.component.scss']
})
export class EsquemaDeVacunacionComponent implements OnInit {
  displayedColumns = ['vacuna', 'primera', 'segunda', 'tercera', 'fechaProxima'];
  dataSource = new MatTableDataSource();
  private jsonGlobal: any = {};
  private inputTuberculosis = false;
  private jsEsquemaVacunacion: any = {
    antipolio: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Tercera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      ProxDosis: { value: null }
    },
    pentavalente: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Tercera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      ProxDosis: { value: null }
    },
    neumomoco: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Tercera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      ProxDosis: { value: null }
    },
    rotavirus: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      ProxDosis: { value: null }
    },
    influenza: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      ProxDosis: { value: null }
    },
    vph: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Tercera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
    },
    dt: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Tercera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
    },
    refuerzoDPT: {
      Primera: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
      Segunda: { fechMin: null, value: null, fechMax: null, flgDisabled: false },
    },
    sarampionRubeolaPapera: {
      valor: { fechMin: null, value: null, fechMax: null, flgDisabled: false }
    },
    antiamarillica: {
      valor: { fechMin: null, value: null, fechMax: null, flgDisabled: false }
    },
    tuberculosis: {
      valor: { fechMin: null, value: null, fechMax: null, flgDisabled: false }
    },
    antihepatitis: {
      valor: { fechMin: null, value: null, fechMax: null, flgDisabled: false }
    }

  }

  private jsEsquVacunacion: any = {
    tuberculosis: {},
    antihepatitis: {},
    antipolioPrimera: {
      value: null,
      flgDisabled: null
    },
    antipolioSegunda: {
      value: null,
      flgDisabled: null
    },
    antipolioTercera: {
      value: null,
      flgDisabled: null
    },
    antipolioProxDosis: {
      value: null,
      flgDisabled: null
    },
    pentavalentePrimera: {
      value: null,
      flgDisabled: null,
      minfech: null
    },
    pentavalenteSegunda: {
      value: null,
      flgDisabled: null,
      minfech: null
    },
    pentavalenteTercera: {
      value: null,
      flgDisabled: null
    },
    pentavalenteProxDosis: {
      value: null,
      flgDisabled: null
    },
    neumococoPrimera: {
      value: null,
      flgDisabled: null
    },
    neumococoSegunda: {
      value: null,
      flgDisabled: null
    },
    neumococoTercera: {
      value: null,
      flgDisabled: null
    },
    neumococoProxDosis: {
      value: null,
      flgDisabled: null
    },
    rotavirusPrimera: {
      value: null,
      flgDisabled: null
    },
    rotavirusSegunda: {
      value: null,
      flgDisabled: null
    },
    rotavirusProxDosis: {
      value: null,
      flgDisabled: null
    },
    influenzaPrimera: {
      value: null,
      flgDisabled: null
    },
    influenzaSegunda: {
      value: null,
      flgDisabled: null
    },
    influenzaProxDosis: {
      value: null,
      flgDisabled: null
    },
    sarampionRubeolaPapera: {
      value: null,
      flgDisabled: null
    },
    antiamarillica: {
      value: null,
      flgDisabled: null
    },
    refuerzoDPTPrimera: {
      value: null,
      flgDisabled: null
    },
    refuerzoDPTSegunda: {
      value: null,
      flgDisabled: null
    },
    vphPrimera: {
      value: null,
      flgDisabled: null
    },
    vphSegunda: {
      value: null,
      flgDisabled: null
    },
    vphTercera: {
      value: null,
      flgDisabled: null
    },
    dtPrimera: {
      value: null,
      flgDisabled: null
    },
    dtSegunda: {
      value: null,
      flgDisabled: null
    },
    dtTercera: {
      value: null,
      flgDisabled: null
    },
  };

  private today;
  @Input() param;
  @Input() listaDisabled;
  @Output() onVoted = new EventEmitter<any>();

  constructor(
    private _esquemaVacunacionService: EsquemaDeVacunacionService,
    private toastr: ToastsManager) {

  }

  private getEsquemaVacunacion() {
    // console.clear();
    this._esquemaVacunacionService.getFechasEsqVac(this.param.idPersona)
      .subscribe(data => {
        // console.log(data);
        if (data.estado == 1) {
          // debugger

          for(let x in this.jsEsquVacunacion){
            this.jsEsquVacunacion[x].value = data.esquemaVacunacion[x];
            this.jsEsquVacunacion[x].flgDisabled = (this.jsEsquVacunacion[x].value != null) ? true : false;
          }
          // for (let a in data.esquemaVacunacion) {
          //   for (let x in this.jsEsquemaVacunacion) {
          //     for (let y in this.jsEsquemaVacunacion[x]) {
          //       for (let z in this.jsEsquemaVacunacion[x][y]) {
                  
          //         if (z == 'fechMax') this.jsEsquemaVacunacion[x][y][z] = new Date();

          //         this.jsEsquemaVacunacion[x][y].fechMax = new Date();
          //         //para registrar el valor
          //         if (x + y == a) {
          //           this.jsEsquemaVacunacion[x][y].value = data.esquemaVacunacion[a];
          //         } else if (x == a) {
          //           this.jsEsquemaVacunacion[x][y].value = data.esquemaVacunacion[a];
          //         }
          //         this.jsEsquemaVacunacion[x][y].flgDisabled = (data.esquemaVacunacion[a] != null) ? true : false;
          //         this.jsEsquemaVacunacion[x][y].fechMin = (y == 'Primera') ? this.fechCambio(new Date(this.param.feNacimiento), 2, 1) : ((y == 'Segunda') ? this.fechCambio(new Date(this.param.feNacimiento), 4, 1) : ((y == 'Tercera') ? this.jsEsquVacunacion.pentavalenteTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 6, 1) : ''));

          //         if (x == 'tuberculosis' || x == 'antihepatitis') this.jsEsquemaVacunacion[x][y].fechMin = this.param.feNacimiento;
          //       }
          //     }
          //   }
          // }
          // console.log(this.jsEsquVacunacion)
          // console.log(this.jsEsquemaVacunacion)

        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private cssTabla() {
    if (this.listaDisabled.esquemaVacunacion == 2) {
      document.getElementById("idTable1").style.display = "none";
      document.getElementById("idTableClass2").classList.add("container");
      document.getElementById("fechas").style.display = "none";
      this.listaDisabled.b = true;
    } if (this.listaDisabled.esquemaVacunacion == 1) {
      document.getElementById("idTable1").style.display = "block";
      document.getElementById("idTableClass2").classList.add("col-6");
    } else {
      $('.esquemaV').css('display', 'none');
    }
  }

  private selecFecha(key, value, flg) {

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // debugger
    let values: String;
    values = value;

    if (key == 'antipolioPrimera' || key == 'antipolioSegunda' || key == 'antipolioTercera') {

      // this.jsEsquVacunacion.pentavalenteSegunda.value = this.fechCambio(value, 2);

      values = this.fechCambio(value, 2, 0);
      if (key == 'antipolioPrimera') {
        this.jsEsquVacunacion.antipolioSegunda.value = values;
      } else if (key == 'antipolioSegunda') {
        this.jsEsquVacunacion.antipolioTercera.value = values;
      } else if (key == 'antipolioTercera') {
        this.jsEsquVacunacion.antipolioProxDosis.value = values;
      }
      // this.selecFecha('antipolioProxDosis',((values).toLocaleDateString('es-PE', options)).split('/').join('-'), 1);
      value = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')
    } else if (key == 'pentavalentePrimera' || key == 'pentavalenteSegunda' || key == 'pentavalenteTercera') {

      // value = this.fechCambio(value, 2, 0);
      if (key == 'pentavalentePrimera') {
        this.jsEsquVacunacion.pentavalenteSegunda.value = this.fechCambio(value, 2, 0);
      } else if (key == 'pentavalenteSegunda') {
        this.jsEsquVacunacion.pentavalenteTercera.value = this.fechCambio(value, 2, 0);
      } else if (key == 'pentavalenteTercera') {
        this.jsEsquVacunacion.pentavalenteProxDosis.value = this.fechCambio(value, 2, 0);
      }
      this.selecFecha('pentavalenteProxDosis', ((value).toLocaleDateString('es-PE', options)).split('/').join('-'), 1);
      value = ((this.jsEsquVacunacion[key].value).toLocaleDateString('es-PE', options)).split('/').join('-')

    } else if (key == 'neumococoPrimera' || key == 'neumococoSegunda' || key == 'neumococoTercera') {

      value = this.fechCambio(value, 2, 0);
      if (key == 'neumococoPrimera') {
        this.jsEsquVacunacion.neumococoSegunda.value = value;
      } else if (key == 'neumococoSegunda') {
        this.jsEsquVacunacion.neumococoTercera.value = value;
      } else if (key == 'neumococoTercera') {
        this.jsEsquVacunacion.neumococoProxDosis.value = value;
      }
      this.selecFecha('neumococoProxDosis', ((value).toLocaleDateString('es-PE', options)).split('/').join('-'), 1);
      value = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')

    } else if (key == 'rotavirusPrimera' || key == 'rotavirusSegunda') {

      value = this.fechCambio(value, 2, 0);
      if (key == 'rotavirusPrimera') {
        this.jsEsquVacunacion.rotavirusSegunda.value = value;
      } else if (key == 'rotavirusSegunda') {
        this.jsEsquVacunacion.rotavirusProxDosis.value = value;
      }
      this.selecFecha('rotavirusProxDosis', ((value).toLocaleDateString('es-PE', options)).split('/').join('-'), 1);
      value = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')

    } else if (key == 'influenzaPrimera' || key == 'influenzaSegunda') {

      value = this.fechCambio(value, 2, 0);
      if (key == 'influenzaPrimera') {
        this.jsEsquVacunacion.influenzaSegunda.value = value;
      } else if (key == 'influenzaSegunda') {
        this.jsEsquVacunacion.influenzaProxDosis.value = value;
      } else
        this.selecFecha('influenzaProxDosis', ((value).toLocaleDateString('es-PE', options)).split('/').join('-'), 1);
      value = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')
    } //else {
    //   value  = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')
    // }
    // console.log(this.jsEsquVacunacion)
    // let antipolioSegunda = new Date(this.jsEsquVacunacion.antipolioSegunda.value).getTime();
    // let antipolioPrimera = new Date(this.jsEsquVacunacion.antipolioPrimera.value).getTime();
    // let antipolioTercera = new Date(this.jsEsquVacunacion.antipolioTercera.value).getTime();

    //validacion de fechas
    // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // value = ((value).toLocaleDateString('es-PE', options)).split('/').join('-');    

    // if (key == 'antipolioPrimera' || key == 'antipolioSegunda' || key == 'antipolioTercera') {
    //   if (antipolioPrimera >= antipolioSegunda || antipolioPrimera == null || isNaN(antipolioPrimera) == true) {
    //     this.jsEsquVacunacion.antipolioSegunda.value = null;
    //     return;
    //   }

    //   if (antipolioPrimera >= antipolioTercera || antipolioSegunda >= antipolioTercera || antipolioPrimera == null || isNaN(antipolioPrimera) == true || isNaN(antipolioSegunda) == true) {
    //     this.jsEsquVacunacion.antipolioTercera.value = null;
    //     return;
    //   }
    // }
    // console.log(value)
    // let value2 = ((value).toLocaleDateString('es-PE', options)).split('/').join('-')

    let newJson = '{"' + key + '": "' + value + '"}';
    let jsonObj: any = JSON.parse(newJson);

    let array: any[] = Object.keys(this.jsEsquVacunacion);

    // array.forEach(element => {
    //   if (element == key) {
    //     this.jsEsquVacunacion[key].flgDisabled = flg;
    //   }
    // });

    let arrayKeys: any[] = Object.keys(this.jsonGlobal);

    if (arrayKeys.length > 0) {
      arrayKeys.forEach(element => {
        if (element == key) {
          if (value == null || value == "") {
            // console.log("SHIII_ " + key);
            delete this.jsonGlobal[key];
          } else {
            this.jsonGlobal[key] = value;
          }
        } else {
          this.jsonGlobal = Object.assign(this.jsonGlobal, jsonObj);
        }
      }); (arrayKeys)
    } else {
      this.jsonGlobal = Object.assign(this.jsonGlobal, jsonObj);
    }
    let param: any = {};
    param.esquemaVacunacion = this.jsonGlobal;
    // console.log(this.jsonGlobal);
    this.onVoted.emit(param);
    // console.log(param);
  }

  fechCambio(now2, meses, fl) {
    let now: null;
    now2.setMonth(now2.getMonth() + meses);

    if (fl == 0) {
      // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      // now = ((now2).toLocaleDateString('es-PE', options)).split('/').join('-');
      now = now2
    } else if (fl == 1) {
      now = now2;
    }

    return now;
  }

  ngOnInit() {

    this.today = new Date();
    this.getEsquemaVacunacion();
    this.cssTabla();
    let param = [{ vacuna: "vacuna", era: "1era", da: "2da", ra: "3era" }];
    this.dataSource = new MatTableDataSource(param);
    // console.log(this.param);
    /* */
    // let iter = new Date(this.param.feNacimiento)
    // console.log(iter);
    this.jsEsquVacunacion.antipolioPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 2, 1);
    this.jsEsquVacunacion.antipolioSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 4, 1);
    this.jsEsquVacunacion.antipolioTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 6, 1);

    this.jsEsquVacunacion.pentavalentePrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 2, 1);
    this.jsEsquVacunacion.pentavalenteSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 4, 1);
    this.jsEsquVacunacion.pentavalenteTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 6, 1);

    this.jsEsquVacunacion.neumococoPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 2, 1);
    this.jsEsquVacunacion.neumococoSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 4, 1);
    this.jsEsquVacunacion.neumococoTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 6, 1);

    this.jsEsquVacunacion.rotavirusPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 2, 1);
    this.jsEsquVacunacion.rotavirusSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 4, 1);

    this.jsEsquVacunacion.influenzaPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 7, 1);
    this.jsEsquVacunacion.influenzaSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 8, 1);

    this.jsEsquVacunacion.antiamarillica.minfech = this.fechCambio(new Date(this.param.feNacimiento), 15, 1);

    this.jsEsquVacunacion.refuerzoDPTSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 48, 1);

    this.jsEsquVacunacion.vphPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    this.jsEsquVacunacion.vphSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    this.jsEsquVacunacion.vphTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    this.jsEsquVacunacion.dtPrimera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    this.jsEsquVacunacion.dtSegunda.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    this.jsEsquVacunacion.dtTercera.minfech = this.fechCambio(new Date(this.param.feNacimiento), 120, 1);
    console.log(this.jsEsquVacunacion);
  }
}
