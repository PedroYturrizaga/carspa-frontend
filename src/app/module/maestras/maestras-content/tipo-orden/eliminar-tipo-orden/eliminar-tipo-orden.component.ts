import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { TipoOrdenService } from '../../../services/tipo-orden.service';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';



@Component({
  selector: 'app-eliminar-tipo-orden',
  templateUrl: './eliminar-tipo-orden.component.html',
  styleUrls: ['./eliminar-tipo-orden.component.scss']
})
export class EliminarTipoOrdenComponent implements OnInit {

  @Input() idTipoOrden;
  @Input() descripcionTipoOrden;

  private descripcion: any;
  constructor(
    private _tipoOrdenService: TipoOrdenService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<EliminarTipoOrdenComponent>
  ) { }

  ngOnInit() {
    this.descripcion = "¿Está seguro que desea eliminar " + this.descripcionTipoOrden + "?";
  }

  private deleteTipoOrden() {
    this._tipoOrdenService.deleteTipoOrden(this.idTipoOrden)
      .subscribe(data => {
        if (data.estado == 1) {
          this.close(true);
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        this.toastr.error('Error al Eliminar', 'Tipo de Orden');
        return Observable.throw(error);
      }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  close(param) {
    this.dialogRef.close(param);
  }
}
