import { VerActoMedicoComponent } from './../../../../../../shared/others/ver-acto-medico/ver-acto-medico.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UltimasAtencionesService } from '../../../../services/ultimas-atenciones.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { CambiarValoresEncriptados } from '../../../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { HistoriaClinicaComponent } from '../ultimas-atenciones/historia-clinica/historia-clinica.component';

@Component({
  selector: 'app-ultimas-atenciones',
  templateUrl: './ultimas-atenciones.component.html',
  styleUrls: ['./ultimas-atenciones.component.scss']
})
export class UltimasAtencionesComponent implements OnInit {
  private actoMedico: any = [];
  private _params = { idPersona: "", idIPRESS: "", numActoMedico: "", idCita: "" }
  constructor(
    private _ultimasAtencionesService: UltimasAtencionesService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cambiarValores: CambiarValoresEncriptados,
    public dialog: MatDialog
  ) {
    this._route.queryParams.subscribe(params => {
      console.log(params);
      this._params.numActoMedico = params["idActoMedico"];
      this._params.idPersona = params["idPersona"];
      this._params.idCita = params["idCita"];
    });
  }

  private getUltimnasAtenciones() {
    console.log(this._params)
    this._ultimasAtencionesService.getActosMedicosAtenciones(this._params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.actoMedico = data.actoMedicoList;
          console.log(this.actoMedico);
        }
        else {
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

  private abrirModalHistoriaClinica(actoMedico:any, index:any) {
    const _dialogRef = this.dialog.open(VerActoMedicoComponent,{
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    _dialogRef.componentInstance.idActoMedico = actoMedico.idActoMedicoEncriptado ? actoMedico.idActoMedicoEncriptado : null;
    _dialogRef.componentInstance.idAtencion = actoMedico.idAtencionEncriptado ? actoMedico.idAtencionEncriptado : null;
    _dialogRef.componentInstance.idPersona = actoMedico.idPersonaEncriptado ? actoMedico.idPersonaEncriptado : null;
    _dialogRef.componentInstance.idCita = actoMedico.idCitaEncriptado ? actoMedico.idCitaEncriptado : null;

    // const dialogRef = this.dialog.open(HistoriaClinicaComponent, {
    //   autoFocus: false,
    //   hasBackdrop: true,
    //   minWidth: '80%',
    //   width: '1500px',
    //   maxHeight: '85%',
    //   height: '750px',
    //   disableClose: false
    // });
    // dialogRef.componentInstance.actoMedico = this.actoMedico;
    // dialogRef.componentInstance.idActoMedico = idActoMedico;
    // dialogRef.componentInstance.idActoMedicoEncriptado = idActoMedicoEncriptado;
    // dialogRef.componentInstance.posicion = i;
    // dialogRef.componentInstance.idAtencionEncriptado = idAtencionEncriptado;
    // dialogRef.componentInstance.idPersona = idPersona;
    // dialogRef.afterClosed().subscribe(result => {
    // });

    // let modalHistoriaClinica = this._modalService.open(HistoriaClinicaComponent,
    //   { size: 'lg', backdrop: 'static', keyboard: true, windowClass: 'modal-xlg' });
    // modalHistoriaClinica.componentInstance.actoMedico = this.actoMedico;
    // modalHistoriaClinica.componentInstance.idActoMedico = idActoMedico;
    // modalHistoriaClinica.componentInstance.idActoMedicoEncriptado = idActoMedicoEncriptado;
    // modalHistoriaClinica.componentInstance.posicion = i;
    // modalHistoriaClinica.componentInstance.idAtencionEncriptado = idAtencionEncriptado;
    // modalHistoriaClinica.componentInstance.idPersona = idPersona;
    // // console.log("Holi")
    // modalHistoriaClinica.result.then((result) => {

    // });
  }

  ngOnInit() {
    console.log(this._params);
    this.getUltimnasAtenciones();
  }
}
