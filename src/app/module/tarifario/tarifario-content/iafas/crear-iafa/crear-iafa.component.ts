import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { IafasService } from '../../../services/iafas.service';
import { ToastsManager } from 'ng2-toastr';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-crear-iafa',
  templateUrl: './crear-iafa.component.html',
  styleUrls: ['./crear-iafa.component.scss']
})
export class CrearIafaComponent implements OnInit {
  private lsIafa: any = { codIafa: null, nombre: null, flagPropio: null, flagEnUso: null }

  constructor(public _IafaService: IafasService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<CrearIafaComponent>) { }

  ngOnInit() {
  }
  insertarIafa() {

    try {
      this.lsIafa.codIafa = parseInt(this.lsIafa.codIafa);
      this.lsIafa.flagPropio = this.lsIafa.flagPropio ? 1 : 0
      this.lsIafa.flagEnUso = this.lsIafa.flagEnUso ? 1 : 0
      this.lsIafa.nombre = (this.lsIafa.nombre.replace(/\s{2,}/g, " ")).trim();
      console.log(+this.lsIafa.codIafa)
    } catch (error) {
    } finally {
      if (this.lsIafa.nombre != " " || this.lsIafa.nombre != "") {

        this._IafaService.insertarIafa(this.lsIafa)

          .subscribe(data => {
            if (data.estado == 1) {
              console.log(data);

              this.toastr.success(data.mensaje);
              this.close(1);
            } else {
              this.toastr.warning(data.mensaje);
            }
          },
            error => {
              this.toastr.error(error);
              return Observable.throw(error);
            }),
          err => this.toastr.error(err),
          () => this.toastr.success('Request Complete');
        console.log(this.lsIafa);
      } else { console.log(this.lsIafa.nombre) }
    }
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
