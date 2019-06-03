import { Component, OnInit, Input } from '@angular/core';
import { AdministrarMaterialService } from '../../../administrar-material.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-registrar-actualizar',
  templateUrl: './registrar-actualizar.component.html',
  styleUrls: ['./registrar-actualizar.component.scss']
})
export class RegistrarActualizarComponent implements OnInit {

  @Input() e;
  @Input() op;
  private show = 0;
  private showIf = 0;
  private disabled: boolean = true;
  private disabledEdit: boolean = true;
  private lsProveedor = [];
  private request = {
    material: {
      idMaterial: null,
      stockMaximo: null,
      stockMinimo: null,
      puntoPedido: null,
      codigo: null,
      stock: null,
      nombre: null,
      marca: null,
      descripcion: null,
      proveedor: null,
      idAlerta:null
    }

  };
  private inicial() {
    console.log(this.op);

    if (this.op == 1) {
      this.show = 3;
      this.request.material.idMaterial = this.e.idMaterial;
      this.request.material.stockMaximo = this.e.stockMaximo;
      this.request.material.stockMinimo = this.e.stockMinimo;
      this.request.material.puntoPedido = this.e.puntoPedido;
      this.request.material.codigo = this.e.codigo;
      this.request.material.stock = this.e.stock;
      this.request.material.nombre = this.e.nombre;
      this.request.material.marca = this.e.marca;
      this.request.material.descripcion = this.e.descripcion;
      this.disabled = false;
      this.showIf = 0;


    }

    if (this.op == 2) {
      this.request.material.idMaterial = this.e.idMaterial;
      this.request.material.stockMaximo = this.e.stockMaximo;
      this.request.material.stockMinimo = this.e.stockMinimo;
      this.request.material.puntoPedido = this.e.puntoPedido;
      this.request.material.codigo = this.e.codigo;
      this.request.material.stock = this.e.stock;
      this.request.material.nombre = this.e.nombre;
      this.request.material.marca = this.e.marca;
      this.request.material.descripcion = this.e.descripcion;
      if (this.e.nombreProveedor == null) {
        this.request.material.proveedor = "";
      } else {
        this.request.material.proveedor = this.e.nombreProveedor;
      }
      this.showIf = 1;
      this.disabled = true;
    }
    if (this.op == 0) {
      this.show = 1;
      this.showIf = 0;
      this.disabled = false;
    }


  }

  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<RegistrarActualizarComponent>) { }

  close(add) {
    this.dialogRef.close(add);
  }
  private insertMaterial() {
    if(this.request.material.stock>this.request.material.stockMaximo ){
      this.toastr.warning("La cantidad actual no puede ser mayor que el stock máximo.");
      return;
    }
    if (this.request.material.stockMaximo < this.request.material.stockMinimo || this.request.material.stockMaximo < this.request.material.puntoPedido) {
      this.toastr.warning("El stock máximo no puede ser menor al punto de pedido o stock mínimo.");
      return;
    }
    if (this.request.material.stockMinimo > this.request.material.puntoPedido) {
      this.toastr.warning("El stock mínimo no puede ser mayor al punto de pedido.");
      return;
    }
    if (this.request.material.stockMinimo==this.request.material.puntoPedido || this.request.material.stockMaximo==this.request.material.stockMinimo || this.request.material.stockMaximo== this.request.material.puntoPedido ) {
      this.toastr.warning("Las cantidades no pueden ser iguales.");
      return;
    }
    else{
      if(this.request.material.stock>this.request.material.puntoPedido){this.request.material.idAlerta=3;}
      if(this.request.material.stock<=this.request.material.puntoPedido && this.request.material.stock>this.request.material.stockMinimo ){this.request.material.idAlerta=2;}
      if(this.request.material.stock<=this.request.material.stockMinimo ){this.request.material.idAlerta=1;}
    console.log(this.request);
    this._materialService.insertMaterial(this.request).subscribe(data => {
      if (data.confirmacion.id == 1) {
        this.toastr.success("Se insertó el material");
        this.close(1);

      } else {
        this.toastr.info(data.confirmacion.mensaje);
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
  }
  private updateMaterial() {
    if(this.request.material.stock>this.request.material.stockMaximo ){
      this.toastr.warning("La cantidad actual no puede ser mayor que el stock máximo.");
      return;
    }
     if (this.request.material.stockMaximo < this.request.material.stockMinimo || this.request.material.stockMaximo < this.request.material.puntoPedido) {
      this.toastr.warning("El stock máximo no puede ser menor al punto de pedido o stock mínimo.");
      return;
    }
    if (this.request.material.stockMinimo > this.request.material.puntoPedido) {
      this.toastr.warning("El stock mínimo no puede ser mayor al punto de pedido.");
      return;
    }
    if (this.request.material.stockMinimo==this.request.material.puntoPedido || this.request.material.stockMaximo==this.request.material.stockMinimo || this.request.material.stockMaximo== this.request.material.puntoPedido ) {
      this.toastr.warning("Las cantidades no pueden ser iguales.");
      return;
    }
    else{
      if(this.request.material.stock>this.request.material.puntoPedido){this.request.material.idAlerta=3;}
      if(this.request.material.stock<=this.request.material.puntoPedido && this.request.material.stock>this.request.material.stockMinimo ){this.request.material.idAlerta=2;}
      if(this.request.material.stock<=this.request.material.stockMinimo ){this.request.material.idAlerta=1;}
    this._materialService.updateMaterial(this.request).subscribe(data => {
      if (data.confirmacion.id == 1) {
        this.toastr.success("Se actualizó el material");
        this.close(1);

      } else {
        this.toastr.info(data.confirmacion.mensaje);
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
  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private getProveedor() {
    this._materialService.getProveedores().subscribe(data => {
      if (data.estado == 1) {
        this.lsProveedor = data.proveedor;

      } else {
        this.toastr.error(data.mensaje);
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

  ngOnInit() {
    this.getProveedor();
    this.inicial();
  }

}
