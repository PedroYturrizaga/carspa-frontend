import { InsertarAmbienteComponent } from './insertar-ambiente/insertar-ambiente.component';
import { EliminarAmbienteComponent } from './eliminar-ambiente/eliminar-ambiente.component';
import { AmbienteService } from './../../services/ambiente.service';
import { AreaService } from './../../services/area.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AreaEspeActiGrupOcupService } from './../../services/area-espe-acti-grup-ocup.service';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  private paramArea = { descripcionArea: null, numPagina: 1, numRegisMostrar: 1000 };
  private requestParam = { idArea: null, descripcionAmbiente: null, idEspecialidad: null, idActividad: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  displayedColumnsA = ['descAmbiente', 'area', 'especialidadActividad', 'editar', 'eliminar'];
  private areas: any = [];
  private ambiente: any = [];
  private requestEsp = { idArea: null };
  private especialidad: any = [];
  private requestAct = { idArea: null, idEspecialidad: null };
  private actividad: any = [];

  dataSource = new MatTableDataSource();

  constructor(
    private _areaService: AreaService,
    private _ambienteService: AmbienteService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _aeagService: AreaEspeActiGrupOcupService
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.getAreas();
    // this.obtenerEspecialidadxArea();
    // this.obtenerActividadxAreaEsp();
    this.getListAmbiente();
  }

  private getAreas() {
    this._areaService.getAreas(this.paramArea).subscribe(data => {
      if (data.estado == 1) {
        this.areas = data.areaList;
      } else {
        this.toastr.error(data.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getListAmbiente();
  }

  private getListAmbiente(numPagina?) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.requestParam).forEach(key => {
      this.requestParam[key] = (this.requestParam[key] === '') ? null : this.requestParam[key];
    });

    this.requestParam = {
      ...this.requestParam,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._ambienteService.getAmbientes(this.requestParam).subscribe(data => {
      if (data.estado == 1) {
        this.ambiente = data.ambienteList;
        console.log(this.requestParam);
        this.dataSource = new MatTableDataSource(this.ambiente);
        if (this.matPag) {
          this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
        }
        this.dataSource.sort = this.matSort;
        if (this.ambiente.length > 0) {
          this.pagination.nuRegisMostrar = this.ambiente[0].nuTotalReg;
        }

      } else {
        this.toastr.error(data.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
        return Observable.throw(error);
      }
    ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  busqueda(target) {
    if (target.length % 1 == 0) {
      this.requestParam.descripcionAmbiente = target;
      this.getListAmbiente(1);
    }
  }

  modalInsertarAmbiente() {
    const dialogRef = this._modalDialog.open(InsertarAmbienteComponent, {
      autoFocus: false,
      width: '50%',
      height: '80%',
      maxHeight:'90%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getListAmbiente(1);
      }
    });
  }

  modalEliminarAmbiente(ambienteList: any) {
    const dialogRef = this._modalDialog.open(EliminarAmbienteComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.ambiente = ambienteList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getListAmbiente(1);
      }
    });
  }

  private obtenerEspecialidadxArea() {
    this.requestEsp.idArea = this.requestParam.idArea;
    if (this.requestEsp.idArea == null) {
      this.especialidad = [];
      this.actividad = [];
      return;
    }
    this._aeagService.getEspecialidadesxArea(this.requestEsp)
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidad = data.areaEspecialidadList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private obtenerActividadxAreaEsp() {
    this.requestAct.idArea = this.requestParam.idArea;
    this.requestAct.idEspecialidad = this.requestParam.idEspecialidad;
    if (this.requestEsp.idArea == null || this.requestAct.idEspecialidad == null) {
      this.actividad = [];
      return;
    }
    this._ambienteService.getAmbientexAreaEsp(this.requestAct)
      .subscribe(data => {
        if (data.estado == 1) {
          this.actividad = data.ambienteList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  modalEditarAmbiente(ambienteList: any) {
    const dialogRef = this._modalDialog.open(InsertarAmbienteComponent, {
      autoFocus: false,
      width: '50%',
      height: '80%',
      maxHeight:'90%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.ambienteList = ambienteList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getListAmbiente(1);
      }
    });
  }

}