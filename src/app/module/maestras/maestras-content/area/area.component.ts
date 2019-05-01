import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { CrearAreaComponent } from './crear-area/crear-area.component';
import { Observable } from 'rxjs/Rx';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { AreaService } from './../../services/area.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  displayedColumns = ['id', 'area', 'abreviatura', 'eliminar'];
  dataSource = new MatTableDataSource();

  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private lsArea = [];
  private Param = { descripcionArea: "" };

  constructor(public _AreaService: AreaService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
    this.paginator = { numPagina: 1, numRegisMostrar: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.obtenerArea(1);
  }

  busqueda(target) {
    if (target.length % 2 == 0) {
      this.obtenerArea();
    }
  }

  private pageEvent($event: any) {
    this.paginator.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerArea();
  }

  private obtenerArea(numPagina?: any) {
    console.log(this.Param);

    this.paginator.numPagina = (numPagina) ? numPagina : this.paginator.numPagina;

    Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    });

    this.Param = {
      ...this.Param,
      ...this.paginator,
      numRegisMostrar: this.pageSize
    };
    console.log(this.Param);
    this._AreaService.getAreas(this.Param).subscribe(data => {
      if (data.estado == 1) {
        console.log(data);
        this.lsArea = data.areaList;
        console.log(this.lsArea);
        this.dataSource = new MatTableDataSource(this.lsArea);
        if (this.matPaginator) {
          this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
        }

        if (this.lsArea.length > 0) {
          this.paginator.numRegisMostrar = this.lsArea[0].nuTotalReg;
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

  crearArea() {
    const dialogRef = this._modalDialog.open(CrearAreaComponent,
      {
        autoFocus: false,
        // maxWidth: '80%',
        // width: '30%',
        // maxHeight: '60%',
        // height: '160%',
        disableClose: true,
        hasBackdrop: true,

      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerArea(1);
      }
    });

  }

  eliminarArea(idArea) {
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
        this._AreaService.deleteArea(idArea).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
            this.obtenerArea(1);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
          err => this.toastr.error(err),
          () => this.toastr.success('Request Complete')
      }
    });
  }

}
