import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ExamenFisicoService } from '../../../../../services/examen-fisico.service';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatTableDataSource, MatIconRegistry } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';



@Component({
  selector: 'app-examen-fisico',
  templateUrl: './examen-fisico.component.html',
  styleUrls: ['./examen-fisico.component.scss']
})
export class ExamenFisicoComponent implements OnInit {
  displayedColumns = ['vacuna', 'pa', 'FC', 'FR', 'PC', 'Peso', 'Talla', 'IMC', 'EstadoNutricional', 'PE', 'TE', 'PT'];
  dataSource = new MatTableDataSource();

  //Aun no tiene un valor ya que no existe la variable en el padre
  @Input() param;
  @Output() outputExFisico = new EventEmitter<any>();

  //actoMedico objeto momentaneo, hasta que se traiga el objeto verdadero del padre.
  private actoMedico: any = {};
  private idActoMedico = "lIO%2B%2BWZuhVw%3D";

  constructor(private _examenFisicoService: ExamenFisicoService,
    private toastr: ToastsManager,
    private router: Router) { }

  private getActoMedico() {
    this._examenFisicoService.getActoMedico(this.param.idActoMedicoEncriptado)
      .subscribe(
        data => {
          console.log(data);
          if (data.estado == 1) {
            for(let x in data.actoMedico){
              this.actoMedico[x]= data.actoMedico[x];
            }
            // this.actoMedico.pa = data.actoMedico.pa,
            // this.actoMedico.fc = data.actoMedico.fc,
            // this.actoMedico.fr = data.actoMedico.fr,
            // this.actoMedico.pC = data.actoMedico.pC,
            // this.actoMedico.pE = data.actoMedico.pE,
            // this.actoMedico.tE = data.actoMedico.tE,
            // this.actoMedico.pT = data.actoMedico.pT,
            // this.actoMedico.imc = data.actoMedico.imc,
            // this.actoMedico.exfCabeza = data.actoMedico.exfCabeza;
            // this.actoMedico.examenFisico = data.actoMedico.examenFisico;
            // this.actoMedico.estadoNutricional = data.actoMedico.estadoNutricional;

            this.param.peso = data.actoMedico.peso
            this.param.talla = data.actoMedico.talla;
            
            // console.log(this.actoMedico);
            if (data.actoMedico.peso != null && data.actoMedico.talla != null) {
              this.getExamenNutricional();
            }
          }
        },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getExamenNutricional() {
    // if (!/[\d]+.[\d]+$/.test(this.param.peso) && this.param.peso != null) {//^\d*\.?\d+$
    //   //this.toastr.error("No se permite ingresar letras");
    //   this.param.peso = 0;
    //   return;
    // }

    // if (!/^\d*\.?\d+$/.test(this.param.talla) && this.param.talla != null) {
    //   //this.toastr.error("No se permite ingresar letras");
    //   this.param.talla = 0;
    //   return;
    // }

    if ((this.param.peso != null && this.param.talla != null) && (this.param.peso != 0 && this.param.talla != 0)) {
      
      this.calcularExamen();
      this._examenFisicoService.getExamenNutricional(this.param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.actoMedico.examenNutricional = data.examenFisico.estadoNutricional;
          } else {
            this.actoMedico.imc = 0;
            this.actoMedico.examenNutricional = null;
            this.toastr.error("Debe ingresar talla y peso1");
          }
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    } else {
      // this.toastr.error("ingresar talla y peso");
      this.actoMedico.imc = 0;
      this.actoMedico.examenNutricional = null;
    }
  }

  private calcularExamen() {
    // debugger
    this.param.talla = parseInt(this.param.talla);
    this.actoMedico.imc = parseFloat((this.param.peso / Math.pow((this.param.talla)/100, 2)).toFixed(2));
    this.param.peso = parseInt(this.param.peso);
    this.param.edad = this.param.edad != 0 ?  this.param.edad : (parseInt(this.param.edadLetra.substr(4, 2))/12).toFixed(2);
    this.actoMedico.pE = parseFloat((this.param.peso / this.param.edad).toFixed(2));
    this.actoMedico.tE = parseFloat((this.param.talla / this.param.edad).toFixed(2));
    this.actoMedico.pT = parseFloat((this.param.peso / this.param.talla).toFixed(2));

    let _params: any = { examenFisico: null };
    this.actoMedico.peso = this.param.peso;
    this.actoMedico.talla = this.param.talla;
    this.send();
  }
  
  send(){
    let _params: any = { examenFisico: null };
    this.actoMedico.peso = this.param.peso;
    this.actoMedico.talla = this.param.talla;
    _params.examenFisico = this.actoMedico;
    this.outputExFisico.emit(_params);
  }

  private isInvalid(_ngForm: any): boolean {
    console.log(_ngForm);
    return isInvalid(_ngForm);
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

  ngOnInit() {
    if ((this.param.idActoMedicoEncriptado != null || this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
      this.getActoMedico();
    }
    let param = [{ pa: "4", vacuna: "vacuna", FC: "", FR: 'FR', PC: 'PC', Peso: 'Peso', Talla: 'Talla', IMC: 'IMC', EstadoNutricional: 'EstadoNutricional', PE: 'PE', TE: 'TE', PT: 'PT' }];
    // console.log(param);
    this.dataSource = new MatTableDataSource(param);
    // console.log(this.dataSource);
  }


}
