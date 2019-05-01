import { Observable } from 'rxjs/Rx';
import { MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { AreaService } from './../../../services/area.service';
import { Component, OnInit } from '@angular/core';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls: ['./crear-area.component.scss']
})
export class CrearAreaComponent implements OnInit {

  private lsArea: any = { descripcionArea: null, abreviaturaArea: null };

  constructor(public _AreaService: AreaService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearAreaComponent>) { }

  ngOnInit() {
  }

  insertarArea() {
    this._AreaService.postArea(this.lsArea)
    .subscribe(data => {
    if (data.estado == 1) {
    this.toastr.success(data.mensaje);
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

  close(ad) {
    this.dialogRef.close(ad);
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
