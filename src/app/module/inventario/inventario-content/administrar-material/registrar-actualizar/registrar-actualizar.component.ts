import { Component, OnInit, Input } from '@angular/core';
import { AdministrarMaterialService } from '../../../administrar-material.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrar-actualizar',
  templateUrl: './registrar-actualizar.component.html',
  styleUrls: ['./registrar-actualizar.component.scss']
})
export class RegistrarActualizarComponent implements OnInit {
  
  @Input() e;
  @Input() op;
  private lsProveedor = [];
  private request={
    material:{
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
    }

  };
  private inicial(){

    if(this.op==1){
      this.request.material.idMaterial=this.e.idMaterial;
      this.request.material.stockMaximo=this.e.stockMaximo;
      this.request.material.precioVenta=this.e.precioVenta;
      this.request.material.stockMinimo=this.e.stockMinimo;
      this.request.material.puntoPedido=this.e.puntoPedido;
      this.request.material.codigo=this.e.codigo;
      this.request.material.stock=this.e.stock;
      this.request.material.nombre=this.e.nombre;
      this.request.material.marca=this.e.marca;
      this.request.material.precioCompra=this.e.precioCompra;
      this.request.material.descripcion=this.e.descripcion;
      this.request.material.descripcion=this.e.descripcion;
      this.request.material.idProveedor=this.e.idProveedor;
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
    private insertMaterial(){
      this.request.material.stockMaximo=+this.request.material.stockMaximo;
      this.request.material.precioVenta=+this.request.material.precioVenta;
      this.request.material.stockMinimo=+this.request.material.stockMinimo;
      this.request.material.puntoPedido=+this.request.material.puntoPedido;
      this.request.material.precioCompra=+this.request.material.precioCompra;
      this.request.material.stock=+this.request.material.stock;
      console.log(this.request);

          this._materialService.insertMaterial(this.request).subscribe(data => {
            console.log(data);
            
              if (data.estado == 1) {
                this.toastr.success("Se insertó el material");
                this.close(1);
      
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
          this.close

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
