import { Component, OnInit } from '@angular/core';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { CompraService } from '../../services/compra.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-insertar-proveedor',
  templateUrl: './insertar-proveedor.component.html',
  styleUrls: ['./insertar-proveedor.component.scss']
})
export class InsertarProveedorComponent implements OnInit {

  private param = {
    contacto: null,
    direccion: null,
    email: null,
    idTipoPago: null,
    nombreProveedor: null,
    ruc: null,
    telefono: null
  };

  private lsTipoPago: any = [{
    idTipoPago: 1, descripcionTipoPago: "PAGO 1"
  },
  {
    idTipoPago: 2, descripcionTipoPago: "PAGO 2"
  }];

  constructor(
    private _compraService: CompraService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<InsertarProveedorComponent>
  ) { }

  ngOnInit() {
  }

  private registrarProveedor() {
    console.log(this.param);
    this._compraService.registrarProveedor(this.param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se registro correctamente el proveedor");
          this.close(1);
        } else {
          this.toastr.warning("ERROR");
        }
      },
        error => {
          this.toastr.error('Error al Insertar', 'Error');
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private close(add) {
    this.dialogRef.close(add);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

}
