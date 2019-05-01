import { ConvenioService } from './../../services/convenio.service';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { ToastsManager } from 'ng2-toastr';
import { ProductoServiceService } from './../../services/producto-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { InsertarProductoComponent } from './insertar-producto/insertar-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  private convenio: any = [];
  private producto: any = [];
  private paramsBusqueda = { idConvenio: null };
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['coprodcode', 'convenioD', 'producto', 'editar', 'eliminar'];
  private convenioID: any;

  constructor(
    private _productoService: ProductoServiceService,
    private _convenioService: ConvenioService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getConvenios();
  }

  private cont = 0;

  private getConvenios() {
    this._convenioService.getComboConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.convenio = data.convenioList;
          if (this.cont == 0) {
            this.paramsBusqueda.idConvenio = this.convenio[0].idConvenio;
            this.getListProductos();
            this.cont++;
          }
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private seleccionarConvenio(idConvenio) {
    this.paramsBusqueda.idConvenio = +idConvenio;
    //this.getListProductos();
    // this.paramsBusqueda.idEspecialidad = descripEspecialidad.idEspecialidad;
    // this.parametros.idEspecialidad = this.paramsBusqueda.idEspecialidad;
    // this.parametros.descripcionEspecialidad = descripEspecialidad.descripcionEspecialidad;
  }

  private getListProductos() {
    this.convenioID = this.paramsBusqueda.idConvenio
    this._productoService.getProductoConvenio(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.producto = data.producto;
          this.dataSource = new MatTableDataSource(this.producto);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "No se encontraron datos")
          this.producto = [];
          this.dataSource = new MatTableDataSource(this.producto);
        } else {
          this.toastr.error(data.mensaje);
          this.producto = [];
          this.dataSource = new MatTableDataSource(this.producto);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }



  private modalInsertarProducto() {
    const dialogRef = this._modalDialog.open(InsertarProductoComponent, {
      autoFocus: false,
      // width: '45%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.paramsBusqueda.idConvenio = this.convenioID;
        this.getListProductos();
      }
    });
  }

  private modalActualizarProducto(productoList: any) {
    const dialogRef = this._modalDialog.open(InsertarProductoComponent, {
      autoFocus: false,
      // width: '45%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.producto = productoList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getListProductos();
      }
    });
  }

  private modalEliminarProducto(productoList: any) {
    const dialogRef = this._modalDialog.open(EliminarProductoComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.producto = productoList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getListProductos();
      }
    });
  }

}
