import { GrupoOcupacionalComponent } from './../grupo-ocupacional.component';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GrupoOcupacionalService } from './../../../services/grupo-ocupacional.service';
import { ToastsManager } from 'ng2-toastr';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-crear-grupo-ocupacional',
  templateUrl: './crear-grupo-ocupacional.component.html',
  styleUrls: ['./crear-grupo-ocupacional.component.scss']
})
export class CrearGrupoOcupacionalComponent implements OnInit {
  private tipoProfesionalList: any[];
  private lsGrupoOcupacional: any = {
    abreviatura: null
    , descripcionGrupoOcupacional: null, emitirCitt: null, emitirReceta: null,
    emitirReferencia: null, idTipoProfesional: null, otorgarMateriales: null,
    otorgarSolicitarExamen: null, regularAntecedente: null
  }

  constructor(public _GrupoOcupacional: GrupoOcupacionalService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<GrupoOcupacionalComponent>) {
  }

  ngOnInit() {
    this.obtenerTipoProfesional()
  }
  insertarGrupoOcupacional() {
    try {
      // this.lsGrupoOcupacional.descripcionGrupoOcupacional = (this.lsGrupoOcupacional.descripcionGrupoOcupacional.replace(/\s{2,}/g, " ")).trim();
      // this.lsGrupoOcupacional.abreviatura = (this.lsGrupoOcupacional.abreviatura.replace(/\s{2,}/g, " ")).trim();
      // this.lsGrupoOcupacional.emitirCitt = this.lsGrupoOcupacional.emitirCitt ? 1 : 0
      // this.lsGrupoOcupacional.emitirReceta = this.lsGrupoOcupacional.emitirReceta ? 1 : 0
      // this.lsGrupoOcupacional.emitirReferencia = this.lsGrupoOcupacional.emitirReferncia ? 1 : 0
      // this.lsGrupoOcupacional.otorgarMateriales = this.lsGrupoOcupacional.otorgarMateriales ? 1 : 0
      // this.lsGrupoOcupacional.otorgarSolicitarExamen = this.lsGrupoOcupacional.otorgarSolicitarExamen ? 1 : 0
      // this.lsGrupoOcupacional.regularAntecedente = this.lsGrupoOcupacional.regularAntecedente ? 1 : 0
    } catch (error) {

    } finally {
      // if (this.lsGrupoOcupacional.descripcionGrupoOcupacional! = " " || this.lsGrupoOcupacional.descripcionGrupoOcupacional != "") {
      this._GrupoOcupacional.insertarGrupoOcupacional(this.lsGrupoOcupacional)
        .subscribe(data => {
          if (data.estado == 1) {
            console.log(data);

            this.toastr.success(data.mensaje);
            this.close(1);
          }
          else {
            this.toastr.warning(data.mensaje);
          }
        }, error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
      console.log(this.lsGrupoOcupacional);
      // } else { console.log(this.lsGrupoOcupacional.descripcionGrupoOcupacional) }
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
  public obtenerTipoProfesional() {

    this._GrupoOcupacional.obtenerTipoProfesional()  //.obtenerTipoProfesional()
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


