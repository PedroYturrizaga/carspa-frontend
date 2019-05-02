import { Component, OnInit } from '@angular/core';
import { AdministrarMaterialService } from '../../../administrar-material.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrar-actualizar',
  templateUrl: './registrar-actualizar.component.html',
  styleUrls: ['./registrar-actualizar.component.scss']
})
export class RegistrarActualizarComponent implements OnInit {
  private lsProveedor = [];
  private request={
    idMaterial:null,
    stockMaximo:null,
    precioVenta:null,
    stockMinimo:null,
    puntoPedido:null,
    codigo:null,
    stock:null,
    nombre:null,
    marca:null,
    precioCompra:null,
    descripcion:null,
    idProveedor:null
  };

  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router) { }
    private insertMaterial(){
          this._materialService.insertMaterial(this.request).subscribe(data => {
              if (data.estado == 1) {
                this.toastr.success("Se insertó el material");
      
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
  private updateMaterial(){
    this._materialService.updateMaterial(this.request).subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se actualizó el material");

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
  ngOnInit() {
    this.getProveedor();
  }

}
