import { ToastsManager } from 'ng2-toastr';
import { ProductoServiceService } from './../../services/producto-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ConvenioService } from '../../services/convenio.service';
import { CoberturaServiceService } from '../../services/cobertura-service.service';
import { InsertarEditarCoberturaComponent } from './insertar-editar-cobertura/insertar-editar-cobertura.component';
import { EliminarCoberturaComponent } from './eliminar-cobertura/eliminar-cobertura.component';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.scss']
})
export class CoberturaComponent implements OnInit {

  private convenio: any = [];
  private cobertura: any = [];
  private producto: any = [];
  private paramsBusqueda = { idConvenio: null, coProdCode: null };
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['convenio', 'producto', 'codigocobertura', 'cobertura', 'tipocobertura', 'copagofijo', 'copagovariable', 'nocalifservname', 'editar', 'eliminar'];

  constructor(
    private _productoService: ProductoServiceService,
    private _convenioService: ConvenioService,
    private _coberturaService: CoberturaServiceService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog) {

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
            this.getCobertura();
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
    console.log(idConvenio);
    this.paramsBusqueda.idConvenio = +idConvenio;
    this.getListProductos();
  }

  private getListProductos() {
    let param = { idConvenio: null };
    param.idConvenio = this.paramsBusqueda.idConvenio;
    this._productoService.getProductoConvenio(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.producto = data.producto;
          this.paramsBusqueda.coProdCode = this.producto[0].coProdCode;
          console.log(this.producto);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "No existen productos para este convenio");
          this.producto = [];
        }
        else {
          this.toastr.error(data.mensaje);
          this.producto = [];
        }
      },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private seleccionarProductos(coProdCode) {
    console.log(coProdCode);
    this.paramsBusqueda.coProdCode = coProdCode;
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private getCobertura() {
    console.log(this.paramsBusqueda);
    this._coberturaService.getCoberturaConvenio(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.cobertura = data.subTipoCoberturaList;
          this.dataSource = new MatTableDataSource(this.cobertura);
          console.log(this.cobertura);
          console.log(data)
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

  private modalInsertarCobertura() {
    const dialogRef = this._modalDialog.open(InsertarEditarCoberturaComponent, {
      autoFocus: false,
      width: '50%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCobertura();
      }
    });
  }

  private modalEditarCobertura(subTipoCoberturasList: any) {
    const dialogRef = this._modalDialog.open(InsertarEditarCoberturaComponent, {
      autoFocus: false,
      width: '50%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.coberturaCo = subTipoCoberturasList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCobertura();
      }
    });
  }

  private modalEliminarCobertura(subTipoCoberturasList: any) {
    const dialogRef = this._modalDialog.open(EliminarCoberturaComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.cobertura = subTipoCoberturasList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCobertura();
      }
    });
  }
}
