import { IafasService } from './../../../services/iafas.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalConfirmacionComponent } from './../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
@Component({
  selector: 'app-editar-iafa',
  templateUrl: './editar-iafa.component.html',
  styleUrls: ['./editar-iafa.component.scss']
})
export class EditarIafaComponent implements OnInit {
  @Input() element;
  @Input() flagPropio;
  private lsIafa: any = { coEntilden: null, codIafa: null, nombre: null, flagPropio: null, flagEnUso: null }

  constructor(public _IafaService: IafasService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<EditarIafaComponent>,
  ) { }

  ngOnInit() {
    this.obtenerCabecera();
  }
  private obtenerCabecera() {
    this.lsIafa.coEntilden = this.element.coEntilden
    this.lsIafa.codIafa = this.element.codIafa
    this.lsIafa.nombre = this.element.nombre
    this.lsIafa.flagPropio = this.element.flagPropio
    this.lsIafa.flagEnUso = this.element.flagEnUso
    console.log(this.lsIafa);
  }
  private confirmarEditar() {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '50%',
      maxHeight: '80%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea editar esta Iafa " + this.element.nombre + "?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.lsIafa.flagPropio = this.lsIafa.flagPropio ? 1 : 0
        this.lsIafa.flagEnUso = this.lsIafa.flagEnUso ? 1 : 0
        this._IafaService.actualizarIafa(this.lsIafa)
          .subscribe(dato => {
            if (dato.estado == 1) {
              this.toastr.success(dato.mensaje);
              this.close({ id: 1, mensaje: dato.mensaje });


            } else {
              this.toastr.error(dato.mensaje);
              this.close({ id: 2, mensaje: dato.mensaje });
            }
          },
          error => {
            console.log(error);
          });
      }
    });
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
  dismiss() {
    this.dialogRef.close(0);
  }
}