import { Observable } from 'rxjs/Observable';
import { AlmacenService } from './../../../services/almacen.service';
import { ToastsManager } from 'ng2-toastr';
import { MatPaginator, MatSort, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registrar-anaquel',
  templateUrl: './registrar-anaquel.component.html',
  styleUrls: ['./registrar-anaquel.component.scss']
})
export class RegistrarAnaquelComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @Input() materialList;


  private param = { idAlmacenOrdenCompra: null };
  private almacenOrdenCompraMateriales: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['codigo', 'producto', 'marca', 'cantidad', 'anaquel', 'editar'];
  private showInput: any = [];
  private paramM = { idAlmacenOrdenCompraMaterial: null, idAnaquel: null };

  constructor(private dialogRef: MatDialogRef<RegistrarAnaquelComponent>,
    private toastr: ToastsManager,
    private _almacenService: AlmacenService) { }

  ngOnInit() {
    console.log(this.materialList)
    this.listarMaterialesxOrdenCompra();
    this.listarAnaqueles();
  }

  private listarMaterialesxOrdenCompra() {
    this.param.idAlmacenOrdenCompra = this.materialList.idAlmacenOrdenCompra;
    this._almacenService.getAlmacenOrdenCompraMaterial(this.param)
      .subscribe(data => {
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

  private close(add) {
    this.dialogRef.close(add);
  }


  private asignarAnaquel(indice1) {
    if (this.showInput[indice1] == 1) {
      this.showInput[indice1] = 2;
    }
    else {
      this.showInput[indice1] = 1;
    }
  }

  private anaquelList: any = [];

  private listarAnaqueles() {
    this._almacenService.listarAnaquel()
      .subscribe(data => {
        if (data.estado == 1) {
          this.anaquelList = data.anaquelList;
          console.log(this.anaquelList);
        } else if (this.anaquelList == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.anaquelList = [];
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  seleccionarAnaquel(idAlmacenOrdenCompraMaterial, idAnaquel) {
    this.upAnaquel(idAlmacenOrdenCompraMaterial, idAnaquel);
  }

  private upAnaquel(idAlmacenOrdenCompraMaterial, idAnaquel) {
    this.paramM.idAlmacenOrdenCompraMaterial = idAlmacenOrdenCompraMaterial;
    this.paramM.idAnaquel = idAnaquel;
    console.log(this.paramM);
    this._almacenService.actualizarAnaquel(this.paramM)
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

  insertar() {
    this.close(1);
  }
}
