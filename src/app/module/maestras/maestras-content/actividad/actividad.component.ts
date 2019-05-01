import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActividadService } from './../../services/actividad.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
// import para usar tablas
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  displayedColumns = ['numero', 'descripcionActividad', 'abreviatura', 'tipoProgramacion', 'tipoActividad', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource();

  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private lsActividad = [];
  //nuRegisMostrar: 10, nuPagina: 1,
  private Param = { descripcionActividad: "" };
  private nombreTipoActividad: String = "";
  private nombreTipoProgramacion: String = "";

  constructor(public _ActividadService: ActividadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog, ) {
    // Paginacion
    this.paginator = { nuPagina: 1, nuRegisMostrar: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.obtenerActividad(1);
  }
  busqueda(target) {
    if (target.length % 3 == 0) {
      this.paginator = { nuPagina: 1, nuRegisMostrar: null };
      this.pageSize = this.displayedSizes[0];
      this.matPaginator.pageIndex = 0;
      this.obtenerActividad();
    }
  }
  private pageEvent($event: any) {
    this.paginator.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerActividad();
  }
  private obtenerActividad(numPagina?: any) {
    //console.log(this.Param);
    this.paginator.nuPagina = (numPagina) ? numPagina : this.paginator.nuPagina;

    Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    });

    this.Param = {
      ...this.Param,
      ...this.paginator,
      nuRegisMostrar: this.pageSize
    };

    this._ActividadService.getActividad(this.Param)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          this.lsActividad = data.actividadList;

          let count = ((this.paginator.nuPagina - 1) * this.pageSize) + 1
          this.lsActividad.forEach(element => {
            element["index"] = count
            count++
          });
          console.log(this.lsActividad);
          this.dataSource = new MatTableDataSource(this.lsActividad);

          for (let i of this.lsActividad) {
            console.log(i);
            console.log(i.tipoActividad);
            i.tipoActividadDesc = this.verificarTipoActividad(i.tipoActividad);
          }
          console.log(this.nombreTipoActividad);

          for (let i of this.lsActividad) {
            console.log(i);
            console.log(i.tipoProgramacion);
            i.tipoProgramacionDesc = this.verificarTipoProgramacion(i.tipoProgramacion);
          }
          console.log(this.nombreTipoProgramacion);


          // console.log(this.dataSource);
          if (this.matPaginator) {
            this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
          }

          if (this.lsActividad.length > 0) {
            this.paginator.nuRegisMostrar = this.lsActividad[0].nuTotalReg;
          }
          //this.dataSource.sort = this.matSort;
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

  crearActividad() {
    const dialogRef = this._modalDialog.open(CrearActividadComponent, {
      autoFocus: false,
      // maxWidth: '80%',
     // width: '30vw',
      // height: '30vw',
      // height: '200%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerActividad();
      }
    });
  }
  editar(element) {

    const dialogRef = this._modalDialog.open(EditarActividadComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      //width: '30vw',
      // maxHeight: '80%',
      // height: '200%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.id == 1) {
          this.toastr.success(result.mensaje);
          this.obtenerActividad(1);
        } else {
          this.toastr.error(result.mensaje);
        }
      }
    });
  }
  eliminar(idActividad) {
    console.log(idActividad);
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._ActividadService.deleteActividad(idActividad)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.obtenerActividad(1);
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
        this.Param.descripcionActividad = null;
        this.obtenerActividad(1);

      }
    });
  }

  private verificarTipoActividad(item1) {
    console.log(item1);
    let x;
    if (item1 == 1) {
      x = "Médico";
    }
    if (item1 == 2) {
      x = "No Médico";
    }
    if (item1 == 3) {
      x = "Administrativo";
    }
    if (item1 == 4) {
      x = "Otros";
    }
    console.log(this.nombreTipoActividad);
    return x;
  }
  private verificarTipoProgramacion(item2) {
    console.log(item2);
    let y;
    if (item2 == 1) {
      y = "Por Cupos";
    }
    if (item2 == 2) {
      y = "Por Horas";
    }
    console.log(this.nombreTipoProgramacion);
    return y;
  }
}
