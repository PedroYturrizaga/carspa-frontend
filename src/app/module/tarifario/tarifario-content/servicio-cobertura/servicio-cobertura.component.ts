import { element } from 'protractor';
import { ConvenioService } from './../../services/convenio.service';
import { GestionComponent } from './../../../caja/caja-content/gestion/gestion.component';
import { ServicioCoberturaService } from './../../services/servicio-cobertura.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatSelectionList, MatSelect, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ProductoServiceService } from '../../services/producto-service.service';
import { InsertarServicioCoberturaComponent } from './insertar-servicio-cobertura/insertar-servicio-cobertura.component';

@Component({
  selector: 'app-servicio-cobertura',
  templateUrl: './servicio-cobertura.component.html',
  styleUrls: ['./servicio-cobertura.component.scss']
})
export class ServicioCoberturaComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['Id Cobertura', 'Codigo Cobertura', 'Nombre', 'Servicios', 'Asignar Servicio'];
  dataSource = new MatTableDataSource();
  private requestParam = { idConvenio: null, coProdCode: null };
  private LssubTipoCobertura = [];
  private Lsconvenio: any = [];
  private producto: any = [];
  private paramsBusqueda = { idConvenio: null };
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;


  constructor(public _ServicioCoberturaService: ServicioCoberturaService,
    public _convenio: ConvenioService,
    private _productoService: ProductoServiceService,
    public _modalDialog: MatDialog,
    private toastr: ToastsManager
  ) {

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
   }

  ngOnInit() {
    this.getConvenios();
  }
  private seleccionarConvenio() {
    this.getListProductos();
  }
  public ingresarNuevoServicioCobertura(element) {
    console.log(element);

    const dialogRef = this._modalDialog.open(InsertarServicioCoberturaComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      height: '70%',
      maxHeight: '85%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerServicioCobertura();
      if (result == 1) {
        
      }
    }
    );
  }

  ;;
  private getConvenios() {
    this._convenio.getComboConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.Lsconvenio = data.convenioList;
          console.log(this.Lsconvenio);
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
    this._productoService.getProductoConvenio(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.producto = data.producto;
          console.log(this.paramsBusqueda)
          //this.dataSource = new MatTableDataSource(this.producto);
          console.log(this.producto);
        } else if(data.estado == 0){
          this.toastr.info(data.mensaje);
          this.producto=[];
        }else {
          this.toastr.error(data.mensaje);
          this.producto=[];
        }
      },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }
  // numPagina?: any
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
    console.log(this.requestParam);
    this._ServicioCoberturaService.getServicioCobertura(this.requestParam)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {

          this.LssubTipoCobertura = data.subTipoCoberturaList;
          this.LssubTipoCobertura.forEach(element => {
            element.jsonServicioCobertura = JSON.parse(element.jsonServicioCobertura);
            element["desccccc"] = "";
            element.jsonServicioCobertura.forEach(ele => {
              element["desccccc"] += ele.descripcion_servicio + ",";
            });
          });
          console.log(this.LssubTipoCobertura);
          // for (let x of this.subTipoCobertura) {
          //   x['color'] = x['tipoestado'] == 1 ? 'primary' : 'warn';
          // }
          this.dataSource = new MatTableDataSource(this.LssubTipoCobertura);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.LssubTipoCobertura.length > 0) {
            this.pagination.nuRegisMostrar = this.LssubTipoCobertura[0].nuTotalReg;
          }
          // this.requestParam = {
          //   idConvenio: null, coProdCode: null
          // };
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
}
