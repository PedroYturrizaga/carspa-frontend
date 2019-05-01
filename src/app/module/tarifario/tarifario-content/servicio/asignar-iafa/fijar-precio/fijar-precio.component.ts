import { Component, OnInit, Input } from '@angular/core';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ToastsManager } from 'ng2-toastr';
import { TarifarioService } from '../../../../services/tarifario.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fijar-precio',
  templateUrl: './fijar-precio.component.html',
  styleUrls: ['./fijar-precio.component.scss']
})
export class FijarPrecioComponent implements OnInit {
  @Input() convenioServicio;
  @Input() idConvenio;
  private grupoCopago: any[];
  private op = false;
  private descripcionServicio;
  private titulo = "";
  private listConvenios: any[];
  private listMoneda: any[];
  private listServ: any[];
  private listVerServ = [];
  private obtenerDes = { busServicio: "" };
  private request = { idServicioConvenio: 0 }
  private insertServicios = {
    servicioConvenio:
      { idServicioConvenio: null,idConvenio: null, idServicio: null, precio: null, coMonecode: null,tipoCopago:null }
  }
  constructor(private toastr: ToastsManager,
    public dialogRef: MatDialogRef<FijarPrecioComponent>,
    private _tarifarioService: TarifarioService,
    public _modalDialog: MatDialog) {
      this.grupoCopago = [{ id: 1, valor: "Fijo" },
      { id: 2, valor: "Variable" }];
     }
 
  diagnosticoCtrl: FormControl = new FormControl();

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  private seleccionarId(i) {
    this.insertServicios.servicioConvenio.idServicio = i.idTarifario;
    this.insertServicios.servicioConvenio.precio = null;
    if (i.flgFha == 1) {
      this.op = true;
    }
    else {
      this.op = false;
    }
  }

  close(_param?: any) {
    this.dialogRef.close(_param);
  }
  dismiss() {
    this.dialogRef.close(false);
  }


  private getConvenios() {
    this._tarifarioService.getAllConvenios()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listConvenios = data.convenioList;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Convenios: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }
  private opcion() {
    if (this.convenioServicio != null) {
      this.titulo = "Editar Servicio de un Convenio";
      this.getDatos();
    }
    if (this.convenioServicio == null) {
      this.titulo = "Añadir Servicio a un Convenio";
    }
  }
  private getDatos() {
    this.request.idServicioConvenio = this.convenioServicio.idServicioConvenio;
    this.insertServicios.servicioConvenio.idConvenio = this.idConvenio;
    this.insertServicios.servicioConvenio.idServicio = this.convenioServicio.idServicio;
    if (this.convenioServicio.flgFha == 1) {
      this.op = true;
    }
    else {
      this.op = false;
    }

    this.insertServicios.servicioConvenio.precio = this.convenioServicio.precio;
    this.insertServicios.servicioConvenio.coMonecode = this.convenioServicio.coMonecode;
    this.insertServicios.servicioConvenio.tipoCopago = this.convenioServicio.tipoCopago;
    this.descripcionServicio = this.convenioServicio.descripcionServicio;
  }

  private getMoneda() {
    this._tarifarioService.getAllMoneda()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listMoneda = data.listMonedas;
          this.insertServicios.servicioConvenio.coMonecode=this.listMoneda[0].idMoneda;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Convenios: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }

  private busquedaServicioDescripcion(value) {
    if (value.length % 2 == 0) {
      this.obtenerDes.busServicio = value;
      this.getServicioDescripcionPromise().then();
    }
  }

  private getServicioDescripcionPromise() {
    let promise = new Promise((resolve, reject) => {
      this._tarifarioService.getObtenerServicios(this.obtenerDes)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listServ = data.listServicios;
          } else {

          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private insert() {
    this._tarifarioService.insertServiciosConvenio(this.insertServicios)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.toastr.success("Se añadió correctamente");
            this.close(true);
          }
          if (data.confirmacion.id == 0) {
            this.toastr.warning("Este Servicio-Convenio ya existe");
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Insertar Servicio Convenio: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }
  private editar() {
    this.insertServicios.servicioConvenio.idServicioConvenio = this.convenioServicio.idServicioConvenio;
    this.insertServicios.servicioConvenio.idConvenio = this.insertServicios.servicioConvenio.idConvenio;
    this.insertServicios.servicioConvenio.idServicio = this.insertServicios.servicioConvenio.idServicio;
    this.insertServicios.servicioConvenio.precio = this.insertServicios.servicioConvenio.precio;
    this.insertServicios.servicioConvenio.coMonecode = this.insertServicios.servicioConvenio.coMonecode;
    this.insertServicios.servicioConvenio.tipoCopago = this.insertServicios.servicioConvenio.tipoCopago;
    this._tarifarioService.updateServiciosConvenio(this.insertServicios)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.toastr.success("Se actualizó correctamente");
            this.close(true);
          }
          if (data.confirmacion.id == 0) {
            this.toastr.warning("Este Servicio-Convenio ya existe");
          }
          if (data.confirmacion.id == 2) {
            this.toastr.warning("Este Servicio-Convenio tiene Coberturas asignadas");
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Actualizar Servicio Convenio: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }


  ngOnInit() {
    this.getConvenios();
    this.getMoneda();
    this.opcion();
  }

}
