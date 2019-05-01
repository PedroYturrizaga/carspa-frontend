import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { TarifarioService } from '../../../services/tarifario.service';
import { CrearEditarServicioComponent } from './crear-editar-servicio/crear-editar-servicio.component';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-administrar-servicio',
  templateUrl: './administrar-servicio.component.html',
  styleUrls: ['./administrar-servicio.component.scss']
})
export class AdministrarServicioComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;

  constructor(private toastr: ToastsManager,
    private _tarifarioService: TarifarioService,
    public _modalDialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [5, 10, 20, 50, 100];
    this.pageSize = this.displayedSize[1];
  }

  private request = { descripcionTarifario: null, flgCpt: null, flgActividad: null };
  private serviciosList: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['descripcionTarifario', 'unidad', 'precio', 'detalle', 'editar', 'eliminar'];
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;

  ngOnInit() {
    this.obtenerServicios(1);
  }

  private modalNuevoServicio() {
    const dialogRef = this._modalDialog.open(CrearEditarServicioComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '95%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerServicios(1);
      }
    });
  }

  private editarServicio(element) {
    const dialogRef = this._modalDialog.open(CrearEditarServicioComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.servicioEdit = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerServicios(1);
      }
    });
  }

  private eliminarServicio(element) {
    let mensaje = '¿Está seguro que desea eliminar el Servicio "' + element.descripcionTarifario + '"?';

    if (element.flgCpt == 1) {
      if ((JSON.parse(element.jsonIdsCpt)).length > 0) {
        mensaje += ' Este Servicio tiene un listado de Procedimientos que se eliminarán junto al servicio.';
      }
    } else {
      if ((JSON.parse(element.jsonIdsAreaEspecAct)).length > 0) {
        mensaje += ' Este Servicio tiene un listado de Actividades que se eliminarán junto al servicio.';
      }
    }

    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = mensaje;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._tarifarioService.deleteServicio(element.idServicio)
          .subscribe(data => {
            console.log(data);
            
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.obtenerServicios(1);
            }else if(data.estado == 0){
              this.toastr.warning(data.mensaje);
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
    });
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerServicios();
  }

  private obtenerServicios(nuPagina?: number) {
    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });

    this.request.flgActividad = (this.request.flgActividad) ? 1 : null;
    this.request.flgCpt = (this.request.flgCpt) ? 1 : null;

    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    console.log(this.request);

    this._tarifarioService.getServicios(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.serviciosList = data.serviciosList;
          this.dataSource = new MatTableDataSource(this.serviciosList);

          if (this.matPag) {
            this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
          }
          if (this.serviciosList.length > 0) {
            this.pagination.nuRegisMostrar = this.serviciosList[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje);
          this.serviciosList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

}
