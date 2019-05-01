import { log } from 'util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ServicioCoberturaService } from '../../../services/servicio-cobertura.service';
import { ConvenioService } from '../../../services/convenio.service';
import { ProductoServiceService } from '../../../services/producto-service.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { AgregarMedicamentoComponent } from './agregar-medicamento/agregar-medicamento.component';

@Component({
  selector: 'app-medicamento-cobertura',
  templateUrl: './medicamento-cobertura.component.html',
  styleUrls: ['./medicamento-cobertura.component.scss']
})
export class MedicamentoCoberturaComponent implements OnInit {


  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = [ 'Codigo Cobertura','Tipo', 'Nombre', 'Asignar Servicio'];
  dataSource = new MatTableDataSource();
  private requestParam = { idConvenio: null, coProdCode: null };
  private LssubTipoCobertura = [];
  private Lsconvenio: any = [];
  private producto: any = [];
  private paramsBusqueda = { idConvenio: null };
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;
  private showCoberturas = 0;
  
  constructor(
    public _ServicioCoberturaService: ServicioCoberturaService,
    public _convenio: ConvenioService,
    private _productoService: ProductoServiceService,
    public _modalDialog: MatDialog,
    private toastr: ToastsManager
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [5,10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }
  private getConvenios() {
    this._convenio.getComboConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.Lsconvenio = data.convenioList;
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
  private getListProductos() {
    this.requestParam.coProdCode=null;
    this._productoService.getProductoConvenio(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.producto = data.producto;
        } else {
          this.toastr.info("No se encontraron Productos");
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }
  private obtenerServicioCobertura(numPagina?) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.requestParam).forEach(key => {
      this.requestParam[key] = (this.requestParam[key] === '') ? null : this.requestParam[key];
    });

    this.requestParam.idConvenio = this.paramsBusqueda.idConvenio;

    this.requestParam = {
      ...this.requestParam,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._ServicioCoberturaService.getServicioCobertura(this.requestParam)
      .subscribe(data => {
        if (data.estado == 1) {

          this.LssubTipoCobertura = data.subTipoCoberturaList;
          this.dataSource = new MatTableDataSource(this.LssubTipoCobertura);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.LssubTipoCobertura.length > 0) {
            this.pagination.nuRegisMostrar = this.LssubTipoCobertura[0].nuTotalReg;
            this.showCoberturas = 1;
          }
          if (this.LssubTipoCobertura.length == 0) {
            this.toastr.info("No hay Coberturas");
            this.showCoberturas = 0;
          }
        } else {
          this.toastr.info(data.error);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  public ingresarMedicamentoCobertura(element,idConvenio) {

    const dialogRef = this._modalDialog.open(AgregarMedicamentoComponent, {
      autoFocus: false,
      width: '80%',
      height: '60%',
      maxHeight: '80%',
      disableClose: false
    });
    dialogRef.componentInstance.element = element;
    dialogRef.componentInstance.idConvenio = idConvenio;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerServicioCobertura();
      }
    }
    );
  }


  ngOnInit() {
    this.getConvenios();
  }

}
