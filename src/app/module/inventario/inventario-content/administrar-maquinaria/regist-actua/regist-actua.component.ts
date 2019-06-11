import { Component, OnInit, Input } from '@angular/core';
import { AdministrarMaquinariaService } from '../../../administrar-maquinaria.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { log } from 'util';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-regist-actua',
  templateUrl: './regist-actua.component.html',
  styleUrls: ['./regist-actua.component.scss']
})
export class RegistActuaComponent implements OnInit {
  @Input() e;
  @Input() op;
  private lsUbicacion = [];
  private request = {
    maquinaria: {
      idMaquinaria: null,
      nombre: null,
      marca: null,
      codigo: null,
      fechaMantenimiento: null,
      detalle: null,
      idUbicacion: 1,
      fechaCompra: null,
      precioCompra: null
    }
  }
  private today: Date = new Date();
  private fecha;
  private disabled: boolean = true;
  private disabledEdit: boolean = true;

  private show = 0;
  constructor(private _maquinariaService: AdministrarMaquinariaService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<RegistActuaComponent>) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.fecha = ((this.today).toLocaleDateString('zh-Hans-CN', options)).split('/').join('-');
  }

  close(add) {
    this.dialogRef.close(add);
  }
  public getDatos() {
    if (this.op == 1) {
      console.log(this.e.fechaMantenimiento);

      this.request.maquinaria.nombre = this.e.nombre;
      this.request.maquinaria.marca = this.e.marca;
      this.request.maquinaria.codigo = this.e.codigo;
      this.request.maquinaria.fechaMantenimiento = this.e.fechaMantenimiento;
      this.fecha = this.e.fechaMantenimiento;
      this.request.maquinaria.detalle = this.e.detalle;
      this.request.maquinaria.fechaCompra = this.e.fechaCompra;
      this.request.maquinaria.precioCompra = this.e.precioCompra;
      this.disabled = true;
      this.disabledEdit = false;
    }
    if (this.op == 0) {
      this.show = 1;
      this.disabled = false;
    }
    if (this.op == 2) {
      this.request.maquinaria.nombre = this.e.nombre;
      this.request.maquinaria.marca = this.e.marca;
      this.request.maquinaria.codigo = this.e.codigo;
      this.request.maquinaria.detalle = this.e.detalle;
      this.request.maquinaria.fechaMantenimiento = this.e.fechaMantenimiento;
      this.request.maquinaria.fechaCompra = this.e.fechaCompra;
      this.request.maquinaria.precioCompra = this.e.precioCompra;
      this.disabled = false;
      this.show = 3;
      this.disabledEdit = true;
    }
  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
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

  // onDateChangee(date) {
  // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // date = ((date).toLocaleDateString('es-PE', options)).split('/').join('-');  
  // this.request.maquinaria.fechaMantenimiento=date;
  // }
  private getUbicacion() {
    this._maquinariaService.getUbicacion().subscribe(data => {
      if (data.estado == 1) {
        this.lsUbicacion = data.listmaquinarias;
      } else {
        this.toastr.info(data.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private update() {
    this.request.maquinaria.idMaquinaria = this.e.idMaquinaria;
    this._maquinariaService.updateMaquinaria(this.request).subscribe(data => {
      if (data.confirmacion.id == 1) {
        console.log(data);
        this.toastr.success("Se actualizó la maquinaria");
        this.close(1);
      } else {
        this.toastr.warning(data.confirmacion.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    ),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private insert() {
    console.log(this.request);
    this._maquinariaService.insertMaquinaria(this.request).subscribe(data => {
      console.log(data);
      if (data.confirmacion.id == 1) {
        this.toastr.success("Se insertó la maquinaria");
        this.close(1);
      } else {
        this.toastr.warning(data.confirmacion.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    ),
      err => console.error(err),
      () => console.log('Request Complete');

  }
  ngOnInit() {
    console.log(this.fecha);
    this.getDatos();
    this.getUbicacion();
  }

}
