import { MatDialogRef } from '@angular/material';
import { ProductoServiceService } from './../../../services/producto-service.service';
import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.scss']
})
export class EliminarProductoComponent implements OnInit {

  @Input() producto;
  private params = { coProdCode: null };
  private noProdName: String;

  constructor(private _productoService: ProductoServiceService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<EliminarProductoComponent>) { }

  ngOnInit() {
    this.params.coProdCode = this.producto.coProdCode;
    this.noProdName = this.producto.noProdName;
  }

  private eliminarProducto() {
    this._productoService.eliminarProducto(this.params.coProdCode)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
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

  private close(add) {
    this.dialogRef.close(add);
  }

}
