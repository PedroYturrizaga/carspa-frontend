import { Component, OnInit } from '@angular/core';
import { TerapiaService } from '../../../../services/terapia.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { isInvalid } from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-terapia',
  templateUrl: './terapia.component.html',
  styleUrls: ['./terapia.component.scss']
})
export class TerapiaComponent implements OnInit {
  private _params: any = { idActoMedicoEncriptado: null, idAtencionEncriptado: null, idPersona: null };
  private terapia: any = [];
  private paramsBusqueda = { idActoMedicoEncriptado: null, idAtencionEncriptado: null, numeroSesiones: null, idTerapia: null };
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['idTerapia', 'descripcionTerapia', 'numeroSesiones', 'eliminar'];
  private terapiaSoli: any = [];

  constructor(
    private _terapiaService: TerapiaService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog,
    private _route: ActivatedRoute) {
    this._route.queryParams.subscribe(params => {
      this._params.idActoMedicoEncriptado = localStorage.getItem("idActoMedicoEncriptado");//params["idActoMedico"]; //"ZK4+zy/e7XE="; // PMvVRZhPHg=
      this._params.idAtencionEncriptado = localStorage.getItem('idAtencionEncriptado'); // params["idCita"]; 
      this._params.idPersona = params["idPersona"];
    });

  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  ngOnInit() {
    this.getTerapias();
    this.getTerapiasSolicitud();
  }


  private getTerapias() {
    this._terapiaService.getTerapias()
      .subscribe(data => {
        if (data.estado == 1) {
          this.terapia = data.terapiaList;
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

  private seleccionarTerapia(idTerapia) {
    this.paramsBusqueda.idTerapia = +idTerapia;
  }


  private get = { idActoMedicoEncriptado: this._params.idActoMedicoEncriptado, idAtencionEncriptado: this._params.idAtencionEncriptado };
  public getTerapiasSolicitud() {
    this.get.idActoMedicoEncriptado = this._params.idActoMedicoEncriptado;
    this.get.idAtencionEncriptado = this._params.idAtencionEncriptado;
    this._terapiaService.getTerapiasEncrip(this.get)
      .subscribe(data => {
        if (data.estado == 1) {
          this.terapiaSoli = data.terapiaList;
          this.dataSource = new MatTableDataSource(this.terapiaSoli);
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

  public insertarTerapia(terapiaForm) {

    this.paramsBusqueda.idActoMedicoEncriptado = this._params.idActoMedicoEncriptado;
    this.paramsBusqueda.idAtencionEncriptado = this._params.idAtencionEncriptado;
    this._terapiaService.insertarTerapia(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.getTerapiasSolicitud();
          this.paramsBusqueda.idTerapia = null;
          this.paramsBusqueda.numeroSesiones = "";
          terapiaForm.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }


  private elem = {
    idActoMedicoEncriptado: null,
    idAtencionEncriptado: null,
    idSolicitudTerapia: null
  }

  eliminar(cobertura) {
    this._terapiaService.eliminarProducto(this._params.idActoMedicoEncriptado, this._params.idAtencionEncriptado, cobertura.idSolicitudTerapia)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.getTerapiasSolicitud();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');

  }

}
