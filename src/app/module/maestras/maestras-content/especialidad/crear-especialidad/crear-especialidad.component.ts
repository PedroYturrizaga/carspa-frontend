import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { EspecialidadService } from './../../../services/especialidad.service';
import { log } from 'util';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-crear-especialidad',
  templateUrl: './crear-especialidad.component.html',
  styleUrls: ['./crear-especialidad.component.scss']
})
export class CrearEspecialidadComponent implements OnInit {

  private lsEspecialidad: any = { descripcion_especialidad: null, abreviatura_espec: null };


  constructor(public _EspecialidadService: EspecialidadService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearEspecialidadComponent>) { }


  ngOnInit() {
  }

  insertarEspecialidad() {
    this._EspecialidadService.postEspecialidad(this.lsEspecialidad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          //this.toastr.success(data);
          console.log(data);
          
          this.close(1);
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
  close(add) {
    this.dialogRef.close(add);
  }
  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
}