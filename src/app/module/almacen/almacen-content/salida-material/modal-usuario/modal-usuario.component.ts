import { Observable } from 'rxjs';
import { VisualizarSalidaMaterialComponent } from './../visualizar-salida-material/visualizar-salida-material.component';
import { AlmacenService } from './../../../services/almacen.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {

  @Input() row;
  private paramsInsert = { usuario: null, contrasena: null, idAlmacenOrdenTrabajo: null };

  constructor(private _modalDialog: MatDialog,
    private _almacenService: AlmacenService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<ModalUsuarioComponent>) { }

  ngOnInit() {
    console.log(this.row);
  }


  private actualizarEstado() {
    this.paramsInsert.idAlmacenOrdenTrabajo = this.row.idAlmacenOrdenTrabajo;
    this._almacenService.actualizarEstadoOT(this.paramsInsert)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Usuario ingresado");

          //  ABRIR EL MODAL
          const dialogRef = this._modalDialog.open(VisualizarSalidaMaterialComponent, {
            autoFocus: false,
            disableClose: true
          });
          dialogRef.componentInstance.idAlmacenOrdenTrabajo = this.row.idAlmacenOrdenTrabajo;
          dialogRef.afterClosed().subscribe(result => {
            if (result == 1) {
              this.close(1);
            }
          });

        } else if (data.estado == 0) {
          this.toastr.warning("Usted no es el usuario registrado para este trabajo");

        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
}
