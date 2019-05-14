import { AlmacenService } from './../../../services/almacen.service';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { S_IFIFO } from 'constants';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-visualizar-materiales',
  templateUrl: './visualizar-materiales.component.html',
  styleUrls: ['./visualizar-materiales.component.scss']
})
export class VisualizarMaterialesComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  private almacenOrdenCompraMateriales: any = [];

  @Input() row;
  private cantidadFisica: String;
  private showInput: any = [];
  private cont: any = 0;
  dataSource = new MatTableDataSource();
  constructor(
    private dialogRef: MatDialogRef<VisualizarMaterialesComponent>,
    private toastr: ToastsManager,
    private _almacenService: AlmacenService
  ) { }
  displayedColumns = ['codigo', 'producto', 'marca', 'cantidad', 'cantidadFisica', 'editar'];

  ngOnInit() {
    console.log(this.row);
    this.listarMaterialesxOrdenCompra();
    this.asignarCantidadFisica(1);
  }

  private pressEnter(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra) {



    if (cantidadFisica == "") {
      cantidadFisica = null;
      return;
    } else {
      if (this.almacenOrdenCompraMateriales[i].cantidad < cantidadFisica || cantidadFisica < 0) {
        this.cont = 1;
        this.toastr.warning("Ingrese una cantidad válida");
        return;
      } else {
        this.cont = 0;
        this.almacenOrdenCompraMateriales[i].cantidadFisica = +cantidadFisica;
      }
    }
    console.log(idAlmacenOrdenCompraMaterial);
    console.log(cantidadFisica);
    console.log(idMaterial);
    console.log(idAlmacenOrdenCompra);
    this.upCantidadFisica(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra);
  }

  private asignarCantidadFisica(indice1) {
    console.log(indice1);
    if (this.showInput[indice1] == 1) {
      this.cantidadFisica = "";
      this.showInput[indice1] = 2;
      this.cont = 1;
    }
    else {
      this.showInput[indice1] = 1;
      this.cont = 0;
    }
  }

  private upCantidadFisica(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra) {

    let par = { idAlmacenOrdenCompraMaterial: null, idAlmacenOrdenCompra: null, idMaterial: null, cantidadFisica: null };

    par.idAlmacenOrdenCompraMaterial = idAlmacenOrdenCompraMaterial;
    par.idAlmacenOrdenCompra = idAlmacenOrdenCompra;
    par.idMaterial = idMaterial;
    par.cantidadFisica = +cantidadFisica;
    console.log(par);
    this._almacenService.actualizarCantidadFisica(par)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
        }
        this.listarMaterialesxOrdenCompra();
        return true;
      },
        error => {
          this.toastr.error('Error al Actualizar', 'Error');
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

  }

  private actualizarEstado() {
    let paramAct = { idAlmacenOrdenCompra: null };
    paramAct.idAlmacenOrdenCompra = this.row.idAlmacenOrdenCompra;
    console.log(paramAct);
    this._almacenService.actualizarEstado(paramAct)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.toastr.success("Materiales ingresados correctamente al Almacén");
          this.close(1);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
          this.close(1);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

  private param = { idAlmacenOrdenCompra: null };

  private listarMaterialesxOrdenCompra() {
    this.param.idAlmacenOrdenCompra = this.row.idAlmacenOrdenCompra;
    this._almacenService.getAlmacenOrdenCompraMaterial(this.param)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.almacenOrdenCompraMateriales = data.almacenOrdenCompraMaterialList;
          console.log(this.almacenOrdenCompraMateriales);
          this.dataSource = new MatTableDataSource(this.almacenOrdenCompraMateriales);

          this.dataSource.sort = this.matSort;

          for (var i = 0; i < this.almacenOrdenCompraMateriales.length; i++) {
            this.showInput[i] = 1;
          }

        } else if (this.almacenOrdenCompraMateriales == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.almacenOrdenCompraMateriales = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }
}
