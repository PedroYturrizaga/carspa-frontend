import { GrupoOcupacionalService } from './../../../services/grupo-ocupacional.service';
import { ModalConfirmacionComponent } from './../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-editar-grupo-ocupacional',
  templateUrl: './editar-grupo-ocupacional.component.html',
  styleUrls: ['./editar-grupo-ocupacional.component.scss']
})
export class EditarGrupoOcupacionalComponent implements OnInit {
  @Input() element;
  private tipoProfesionalList: any[];
private lsGrupoOcupacional: any ={abreviatura:null,descripcionGrupoOcupacional:null,emitirCitt:null,emitirReceta:null,
  emitirReferencia:null,idGrupoOcupacional:null,idTipoProfesional:null,otorgarMateriales:null,otorgarSolicitarExamen:null,
  regularAntecedente:null}
  constructor(
    public _GrupoOcupacionalService:GrupoOcupacionalService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<EditarGrupoOcupacionalComponent>,
  ) { }

  ngOnInit() {
    this.obtenerCabecera()
    this.obtenerTipoProfesional()
  //    console.log(this.element);
    
    // this.lsGrupoOcupacional = this.element
  }
private obtenerCabecera(){
  this.lsGrupoOcupacional.abreviatura= this.element.abreviatura,
  this.lsGrupoOcupacional.descripcionGrupoOcupacional=this.element.descripcionGrupoOcupacional,
  this.lsGrupoOcupacional.emitirCitt=this.element.emitirCitt,
  this.lsGrupoOcupacional.emitirReceta=this.element.emitirReceta,
  this.lsGrupoOcupacional.emitirReferencia=this.element.emitirReferencia,
  this.lsGrupoOcupacional.idGrupoOcupacional = this.element.idGrupoOcupacional,
  this.lsGrupoOcupacional.idTipoProfesional = this.element.idTipoProfesional,
  this.lsGrupoOcupacional.otorgarMateriales= this.element.otorgarMateriales,
  this.lsGrupoOcupacional.otorgarSolicitarExamen = this.element.otorgarSolicitarExamen
  this.lsGrupoOcupacional.regularAntecedente= this.element.regularAntecedente

  this.lsGrupoOcupacional.emitirCitt = this.lsGrupoOcupacional.emitirCitt=="SI" ? 1 : 0
  this.lsGrupoOcupacional.emitirReceta = this.lsGrupoOcupacional.emitirReceta=="SI" ? 1 : 0
  this.lsGrupoOcupacional.emitirReferencia = this.lsGrupoOcupacional.emitirReferencia=="SI" ? 1 : 0
  this.lsGrupoOcupacional.otorgarMateriales = this.lsGrupoOcupacional.otorgarMateriales=="SI" ? 1 : 0
  this.lsGrupoOcupacional.otorgarSolicitarExamen = this.lsGrupoOcupacional.otorgarSolicitarExamen=="SI" ? 1 : 0
  this.lsGrupoOcupacional.regularAntecedente = this.lsGrupoOcupacional.regularAntecedente=="SI" ? 1 : 0
  console.log(this.lsGrupoOcupacional);
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
  dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea editar Grupo Ocupacional " + this.element.descripcionGrupoOcupacional + "?";
dialogRef.afterClosed().subscribe(result =>{
  if(result == 1){
    // this.lsGrupoOcupacional.emitirCitt = this.lsGrupoOcupacional.emitirCitt=="SI" ? 1:0
    // this.lsGrupoOcupacional.emitirReceta = this.lsGrupoOcupacional.emitirReceta=="SI" ? 1:0
    // this.lsGrupoOcupacional.emitirReferencia = this.lsGrupoOcupacional.emitirReferencia=="SI" ? 1:0
    // this.lsGrupoOcupacional.otorgarMateriales = this.lsGrupoOcupacional.otorgarMateriales=="SI" ? 1:0
    // this.lsGrupoOcupacional.otorgarSolicitarExamen =this.lsGrupoOcupacional.otorgarSolicitarExamen=="SI" ? 1:0
    this._GrupoOcupacionalService.actualizaGrupoOcupacional(this.lsGrupoOcupacional)
    .subscribe(dato =>{
      if(dato.estado==1){
        console.log(this.lsGrupoOcupacional)
        this.toastr.success(dato.mensaje);
        this.close({ id: 1, mensaje: dato.mensaje });

      }else{
        console.log("mal",this.lsGrupoOcupacional)
        this.toastr.error(dato.mensaje);
        this.close({ id: 2, mensaje: dato.mensaje });
      }
    },   error => {
      console.log(error);
    })
  }
})
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
public obtenerTipoProfesional() {

  this._GrupoOcupacionalService.obtenerTipoProfesional()  //.obtenerTipoProfesional()
    .subscribe(data => {
      if (data.estado == 1) {
        this.tipoProfesionalList = data.tipoProfesionalList;
        console.log(this.tipoProfesionalList);
      }
      else if (data.estado == 0) {
        console.log(data.mensaje);
      }
      else if (data.estado = -1) {
        console.error(data.mensaje);
      }
    },
      error => {
        console.error(error);
      });
}

}
