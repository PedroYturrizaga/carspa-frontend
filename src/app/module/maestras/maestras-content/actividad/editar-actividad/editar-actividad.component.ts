import { ModalConfirmacionComponent } from './../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ActividadService } from './../../../services/actividad.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent implements OnInit {
  @Input() element;

  private lsActividad : any = { idActividad:null,descripcionActividad: null, abreviatura: null, tipoProgramacion: null, tipoActividad: null, ambiente:null};
  

  private listTipoProgramacion: any = [{ idTipoProgramacion: 1, nombreTipoProgramacion: "Por cupos" }, 
  { idTipoProgramacion: 2, nombreTipoProgramacion: "Por Horas" }];

  private listTipoActividad: any = [{ idTipoActividad: 1, nombreTipoActividad: "Medico" }, 
  { idTipoActividad: 2, nombreTipoActividad: "No Medico" },
  { idTipoActividad: 3, nombreTipoActividad: "Administrativo"},
  { idTipoActividad: 4, nombreTipoActividad: "Otros" }];

  private listAmbiente: any= [{ idAmbiente: 1, nombreAmbiente: "Si" }, 
  { idAmbiente: 0, nombreAmbiente: "No" }];
  constructor(public _ActividadService: ActividadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<EditarActividadComponent>,

  ) { }

  ngOnInit() {
    this.obtenerCabecera();
  }
private obtenerCabecera(){
  this.lsActividad.descripcionActividad=this.element.descripcionActividad.toUpperCase();
  this.lsActividad.abreviatura=this.element.abreviatura;
  this.lsActividad.idActividad=this.element.idActividad;
  this.lsActividad.tipoActividad=this.element.tipoActividad;
  this.lsActividad.ambiente=this.element.ambiente;
  this.lsActividad.tipoProgramacion=this.element.tipoProgramacion;
  console.log(this.lsActividad);
}
private confirmarEditar(){
  const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
    autoFocus: false,
    maxWidth: '40%',
    width: '50%',
    maxHeight: '80%',
    height: '30%',
    disableClose: true,
    hasBackdrop: true
  });
  dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea editar esta actividad "+this.lsActividad.descripcionActividad+"?";
  dialogRef.afterClosed().subscribe(result => {
    if (result == 1) {

      this._ActividadService.actualizarActividad(this.lsActividad)
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
}

