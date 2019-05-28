import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdministrarMaterialService } from "../../../administrar-material.service";
import { ToastsManager } from "ng2-toastr/src/toast-manager";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.scss']
})
export class OrdenPedidoComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material', 'marca', 'cantidad', 'sm', 'smi', 'pp', 'alerta','pedir','orden'];
  dataSource = new MatTableDataSource();
  private show = 0;
  private lsMateriales = [];
  private requestListar= { nombre: null, idAlerta1: 1, idAlerta2: 2 };
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OrdenPedidoComponent>) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }
    private request = {
    material: {
      idMaterial: null,
      stock: null
    }
  };

  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getMateriales(1);
    }
  }
  private pageEvent($event) {
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMateriales();
  }
  
  private getMateriales(nuPagina?: number) {
    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.requestListar).forEach(key => {
      this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
    });
    this.requestListar = {
      ...this.requestListar,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._materialService.getMaterialesAlerta(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsMateriales = data.materiales;
        this.dataSource = new MatTableDataSource(this.lsMateriales);
        if (this.matPag) {
          this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
        }
        if (this.lsMateriales.length > 0) {
          this.pagination.nuRegisMostrar = this.lsMateriales[0].nuTotalReg;
        }

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
  private generarOrden(element){
    this.request.material.idMaterial=element.idMaterial;
    this.request.material.stock=+element.stockMaximo-element.stock;
     console.log(this.request);
    this._materialService.ordenPedido(this.request).subscribe(data => {
      if (data.confirmacion.id == 1) {
        this.toastr.success("Se generó la Orden de Pedido del material '"+element.nombre+"'");
         this.getMateriales();
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
    close(add) {
    this.dialogRef.close(add);
  }
  ngOnInit() {
    this.getMateriales();
  }

}
