import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { ActividadService } from './../../../services/actividad.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.scss']
})
export class CrearActividadComponent implements OnInit {

  private lsActividad: any = { descripcionActividad: null, abreviatura: null, tipoProgramacion: null, tipoActividad: null, ambiente:null};
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
    public dialogRef: MatDialogRef<CrearActividadComponent>) { }

  ngOnInit() {
  }
  insertarActividad(){
     console.log(this.lsActividad);
    this.lsActividad.descripcionActividad= this.lsActividad.descripcionActividad.toUpperCase();
    this._ActividadService.postActividad(this.lsActividad)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        }else{
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }), 
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
    console.log(this.lsActividad);
  }
  close(add) {
    this.dialogRef.close(add);
  }
  // private obtenerActividad(numPagina?: any) {
  //   //console.log(this.Param);
  //   this._ActividadService.getActividad(this.Param)
  //   .subscribe(data => {
  //     if (data.estado == 1) {
  //       this.lsActividad = data.actividadList;
  //       console.log(this.lsActividad);


  //       this.dataSource = new MatTableDataSource(this.lsActividad);

  //       for (let i of this.lsActividad) {
  //         console.log(i);
  //         console.log(i.tipoActividad);
  //         i.tipoActividadDesc = this.verificarTipoActividad(i.tipoActividad);
  //       }
  //       console.log(this.nombreTipoActividad);

  //       // console.log(this.dataSource);
  //       if (this.matPaginator) {
  //         this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
  //       }

  //       if (this.lsActividad.length > 0) {
  //         this.paginator.nuRegisMostrar = this.lsActividad[0].nuTotalReg;
  //       }
  //       //this.dataSource.sort = this.matSort;
  //     } else {
  //       this.toastr.error(data.mensaje);
  //     }
  //   },
  //   error => {
  //     this.toastr.error(error);
  //     return Observable.throw(error);
  //   }),
  //   err => this.toastr.error(err),
  //   () => this.toastr.success('Request Complete');
  //   };

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
