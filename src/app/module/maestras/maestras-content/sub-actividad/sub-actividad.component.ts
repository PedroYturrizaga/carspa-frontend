import { Component, OnInit, ViewChild } from '@angular/core';
import { SubActividadService } from './../../services/sub-actividad.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { CrearSubActividadComponent } from './crear-sub-actividad/crear-sub-actividad.component';
//import para usar tablas
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-sub-actividad',
  templateUrl: './sub-actividad.component.html',
  styleUrls: ['./sub-actividad.component.scss']
})
export class SubActividadComponent implements OnInit {

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  displayedColumns = ['numero', 'descripcionSubActividad', 'abreviatura', 'descripcionActividad', 'eliminar'];
  dataSource = new MatTableDataSource();

  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private lsSubActividad = [];
  private Param = { descripcionSubActividad: "" };

  constructor(
    public _SubActividadService: SubActividadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
    // Paginacion
    this.paginator = { numPagina: 1, numRegisMostrar: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.obtenerSubActividad(1);
  }

  busqueda(target) {
    if (target.length % 3 == 0) {
      this.paginator = { numPagina: 1, numRegisMostrar: null };
      this.pageSize = this.displayedSizes[0];
      this.matPaginator.pageIndex = 0;
      this.obtenerSubActividad();

    }
  }

  private pageEvent($event: any) {
    this.paginator.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerSubActividad();
  }

  private obtenerSubActividad(nuPagina?: any) {
    this.paginator.numPagina = (nuPagina) ? nuPagina : this.paginator.numPagina;

    Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    });

    this.Param = {
      ...this.Param,
      ...this.paginator,
      numRegisMostrar: this.pageSize
    };
    console.log(this.Param);
    this._SubActividadService.getSubActividad(this.Param)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);                                                                                                                                                
          this.lsSubActividad = data.subActividadList;

          let count = ((this.paginator.numPagina-1)*this.pageSize)+1
          this.lsSubActividad.forEach(element => {
            element["index"]=count
            count++
          });
          console.log(this.lsSubActividad);
          this.dataSource = new MatTableDataSource(this.lsSubActividad);

          if (this.matPaginator) {
            this.matPaginator._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPaginator._pageIndex;
          }

          if (this.lsSubActividad.length > 0) {
            this.paginator.numRegisMostrar = this.lsSubActividad[0].nuTotalReg;
          }
          // this.dataSource.sort = this.matSort;
          // this.dataSource = new MatTableDataSource(this.lsProgramacionCitaPorPersonal);
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

  crearSubActividad() {
    const dialogRef = this._modalDialog.open(CrearSubActividadComponent, {
      autoFocus: false,
      // maxWidth: '80%',
       width: '30%',
      // maxHeight: '60%',
      // height: '160%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerSubActividad();
      }
    });
  }

  eliminar(element) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea eliminar la SubActividad "+element.descripcionSubActividad+" ?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._SubActividadService.deleteSubActividad(element.idSubActividad)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.obtenerSubActividad(1);
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
        this.Param.descripcionSubActividad = null;
        this.obtenerSubActividad(1);

      }
    });
  }
}
