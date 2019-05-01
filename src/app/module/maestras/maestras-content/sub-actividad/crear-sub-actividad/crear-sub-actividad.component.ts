import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { SubActividadService } from './../../../services/sub-actividad.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActividadService } from '../../../services/actividad.service';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-crear-sub-actividad',
  templateUrl: './crear-sub-actividad.component.html',
  styleUrls: ['./crear-sub-actividad.component.scss']
})
export class CrearSubActividadComponent implements OnInit {
  private lsActividad = [{ idActividad: null, descripcionActividad: null }];
  private lsSubActividad: any = { descripcionSubActividad: null, abreviatura: null, actividad: { idActividad: null } };
  private paramsActividad = { descripcionActividad: null, nuPagina: null, nuRegisMostrar: null };

  constructor(public _SubActividadService: SubActividadService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearSubActividadComponent>,
    public _ActividadService: ActividadService) { }

  ngOnInit() {
    this.obtenerActividad();
  }
  insertarSubActividad() {
    console.log(this.lsSubActividad);
    this.lsSubActividad.descripcionSubActividad=this.lsSubActividad.descripcionSubActividad.toUpperCase();
    this._SubActividadService.postSubActividad(this.lsSubActividad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se registro la SubActividad  " + this.lsSubActividad.descripcionSubActividad + " Exitosamente");
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

  private obtenerActividad() {
    this.paramsActividad.descripcionActividad = null;
    this.paramsActividad.nuPagina = null;
    this.paramsActividad.nuRegisMostrar = null;

    this._ActividadService.getActividad(this.paramsActividad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsActividad = data.actividadList;
          console.log(this.lsActividad);
          //this.dataSource.sort = this.matSort;
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
}
