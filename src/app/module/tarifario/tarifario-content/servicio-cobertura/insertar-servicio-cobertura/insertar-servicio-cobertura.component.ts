import { Params } from '@angular/router';
import { TarifarioService } from './../../../services/tarifario.service';
import { log } from 'util';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatSelectionList, MatSelect } from '@angular/material';
import { ViewChild } from '@angular/core';
import { getIpress } from '../../../../../shared/auth/storage/cabecera.storage';
import { element, $ } from 'protractor';
import { DataSource } from '@angular/cdk/collections';
import { ServicioCoberturaService } from '../../../services/servicio-cobertura.service';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';


@Component({
  selector: 'app-insertar-servicio-cobertura',
  templateUrl: './insertar-servicio-cobertura.component.html',
  styleUrls: ['./insertar-servicio-cobertura.component.scss']
})
export class InsertarServicioCoberturaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  
  displayedColumns = ['Codigo de Servicio', 'Nombre de Servicio', 'Eliminar'];
  private LssubTipoCobertura = [];
  private Lsservicio = [];
  private Lstarifario = [];
  private idServicio;
  private paramsBusq = { idServicio: null };
  private paramConvenio = { idConvenio: null };
  dataSource = new MatTableDataSource();
  @Input() element;
  @Input() paramsBusqueda;
  private request = { idServicio: null, coCoberCode: null, coSubTipoCober: null };
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;


  constructor(
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<InsertarServicioCoberturaComponent>,
    public _modalDialog: MatDialog,
    public _ServicioCoberturaService: ServicioCoberturaService,
    private _servicio: TarifarioService
  ) { 

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];

  }

  ngOnInit() {
    this.obtenerServicioCoberturaModal();
    this.getServicioporConvenio();
    console.log(this.element);
    console.log(this.paramsBusqueda);
  }
  close(add) {
    this.dialogRef.close(add);
  }
  dismiss() {
    this.dialogRef.close(0);
  }

  private getServicioporConvenio() {
    let parametro = {};
    this.paramConvenio.idConvenio = this.element.idConvenio;
    this._ServicioCoberturaService.getServicioporConvenio(this.paramConvenio)
      .subscribe(data => {
        if (data.estado == 1) {
          this.Lsservicio = data.listServioConvenio;
          console.log(this.Lsservicio);
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

  private obtenerServicioCoberturaModal(numPagina?) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });
    this.request.coCoberCode = this.element.coCoberCode;
    this.request.coSubTipoCober = this.element.coSubTipoCober;

    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.request);
    this._ServicioCoberturaService.getServicioCoberturaModal(this.request)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {

          this.Lstarifario = data.tarifarioList;
       
          // this.LssubTipoCobertura.forEach(element => {
          //   element.jsonServicioCobertura=JSON.parse( element.jsonServicioCobertura);
          //   element["desccccc"] = "";
          //   element.jsonServicioCobertura.forEach(ele => {
          //     element["desccccc"] += ele.descripcion_servicio + ",";
          //   });
          // });
          // for (let x of this.subTipoCobertura) {
          //   x['color'] = x['tipoestado'] == 1 ? 'primary' : 'warn';
          // }
          this.dataSource = new MatTableDataSource(this.Lstarifario);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.Lstarifario.length > 0) {
            this.pagination.nuRegisMostrar = this.Lstarifario[0].nuTotalReg;
          }
          // this.request = {
          //   coCoberCode: null, coSubTipoCober: null
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

  private insertarServicioCobertura() {

    let param = { id_servicio: this.request.idServicio, CO_COBERCODE: this.request.coCoberCode, CO_SUBTIPOCOBER: this.request.coSubTipoCober }
    console.log(param)
    // let newLs = [];

    // for (let item of this.LsTipoOrdenPago) {
    //   if (item.seleccionado == true) {
    //     let ls = { tipoOrden: item.tipoOrden }
    //     newLs.push(ls);
    //   }
    // }
    // this.requestParam.tipoOrdenSeleccionado = JSON.stringify(newLs);
    let paramString = { jsonServicio: JSON.stringify(param) }
    console.log(paramString)
    this._ServicioCoberturaService.putServicioCobertura(paramString)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.obtenerServicioCoberturaModal();
          
          console.log(data.mensaje);
          // this.close();
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

private eliminarServicioCobertura(i){
  let param = { idServicio	: i, coCoberCode: this.request.coCoberCode, coSubTipoCober: this.request.coSubTipoCober }
  console.log(param);

  this._ServicioCoberturaService.deleteServicioCobertura(param)
  .subscribe(data => {
    if (data.estado == 1) {
      this.toastr.success(data.mensaje);
      this.obtenerServicioCoberturaModal();

      console.log(data.mensaje);
      // this.close(1);
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
  modalEliminarServicioCobertura(element){
    this.idServicio=element.idServicio;
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '32%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea eliminar el servicio?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
this.eliminarServicioCobertura(this.idServicio);

// this.modalEliminarServicioCober
      }
    });




  }


  // close(add) {
  //   this.dialogRef.close(add);

  // }

  private seleccionarServicio() {
    // this.getServicios();
   this.getServicioporConvenio();
  }


}
