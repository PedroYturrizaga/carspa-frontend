import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { TarifarioService } from '../../../services/tarifario.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { FijarPrecioComponent } from './fijar-precio/fijar-precio.component';
import { EliminarComponent } from './eliminar/eliminar.component';

@Component({
  selector: 'app-asignar-iafa',
  templateUrl: './asignar-iafa.component.html',
  styleUrls: ['./asignar-iafa.component.scss']
})
export class AsignarIafaComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  constructor(private toastr: ToastsManager,
    private _tarifarioService: TarifarioService,
    public _modalDialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }
  diagnosticoCtrl: FormControl = new FormControl();
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;
  private listConvenios: any[];
  private listServ: any[];
  private serviciosList: any = [];
  private showServicios = 0;
  private descripcionServicio;
  dataSource = new MatTableDataSource();
  displayedColumns = ['descripcionTarifario', 'precio','unidad','valorunidad','tipo' ,'moneda', 'editar', 'eliminar'];
  private obtenerDes = { busServicio: "" };
  private obtenerServicios = { idConvenio: 0, idServicio: null, flgCpt: null, flgActividad: null };

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getServicios();
  }
  private seleccionarId(i) {
    this.obtenerServicios.idServicio = i;
  }

  private getConvenios() {
    this._tarifarioService.getAllConvenios()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listConvenios = data.convenioList;
          this.obtenerServicios.idConvenio = this.listConvenios[0].idConvenio;
          this.getServicios();
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Convenios: ");
          return Observable.throw(error);
        }),
      err => console.error(err)

  }
  private busquedaServicioDescripcion(value) {

    if (value.length % 2 == 0) {
      this.obtenerDes.busServicio = value;
      this.getServicioDescripcionPromise().then();

    }
    else{
      this.obtenerServicios.idServicio = null;
    }
  }

  private getServicioDescripcionPromise() {
    let promise = new Promise((resolve, reject) => {
      this._tarifarioService.getObtenerServicios(this.obtenerDes)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listServ = data.listServicios;
          } else {

          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private getServicios(nuPagina?: number) {

    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    this.obtenerServicios.idConvenio = this.obtenerServicios.idConvenio;
    this.obtenerServicios.idServicio = this.obtenerServicios.idServicio;
    this.obtenerServicios.flgCpt = this.obtenerServicios.flgCpt ? 1 : null;
    this.obtenerServicios.flgActividad = this.obtenerServicios.flgActividad ? 1 : null;
    this.obtenerServicios = {
      ...this.obtenerServicios,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };


    this._tarifarioService.getListarServicioConvenio(this.obtenerServicios)
      .subscribe(data => {
        if (data.estado == 1) {
          this.serviciosList = data.listServioConvenio;
          this.dataSource = new MatTableDataSource(this.serviciosList);
          if (this.matPag) {
            this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
          }
          if (this.serviciosList.length > 0) {
            this.pagination.nuRegisMostrar = this.serviciosList[0].nuTotalReg;
            this.showServicios = 1;
            this.obtenerServicios.idServicio = null;
          }

          if (this.serviciosList.length == 0) {
            this.toastr.info("NO HAY SERVICIOS");
            this.showServicios = 0;
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

  private crerEditarServicio(e?, id?) {
    const dialogRef = this._modalDialog.open(FijarPrecioComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '60%',
      width: '60%',
      disableClose: false
    });
    dialogRef.componentInstance.convenioServicio = e;
    dialogRef.componentInstance.idConvenio = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerServicios.idServicio = null;
        this.obtenerServicios.flgCpt = null;
        this.obtenerServicios.flgActividad = null;
        this.getServicios();
      }
    });
  }
  private eliminar(id, nombre) {
    const dialogRef = this._modalDialog.open(EliminarComponent, {
      autoFocus: false,
      hasBackdrop: true,
      disableClose: false
    });
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.nombre = nombre;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getServicios();
      }
    });
  }

  ngOnInit() {
    this.getConvenios();
  }



}
