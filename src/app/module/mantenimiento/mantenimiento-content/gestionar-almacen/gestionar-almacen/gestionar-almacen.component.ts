import { Component, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { GestionarAlmacenService } from '../services/gestionar-almacen.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-gestionar-almacen',
  templateUrl: './gestionar-almacen.component.html',
  styleUrls: ['./gestionar-almacen.component.scss']
})

export class GestionarAlmacenComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  private matDataSource: MatTableDataSource<any>;
  private areas: any = [];
  private almacenes: any = [];
  private insertAlmacen: any = { almacen: { area: { id: 0 }, flActivo: 0 } };
  private isValid: Number = 0;
  private checkActivar: boolean = true;
  dataSource = new MatTableDataSource();
  displayedColumns = ['almacenes', 'flActivo'];

  constructor(
    private _gestionarAlmacenService: GestionarAlmacenService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.getAllAreaSinAlmacen();
    this.ObtenerAlmacen();
  }

  private getAllAreaSinAlmacen() {
    this._gestionarAlmacenService.getAllAreaSinAlmacen()
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaList;
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

  private ObtenerAlmacen() {
    this._gestionarAlmacenService.obtenerAlmacen()
      .subscribe(data => {
        if (data.estado == 1) {
          this.almacenes = data.almacenList;
          this.dataSource = new MatTableDataSource(this.almacenes);
        }
        else {
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

  private insertarAlmacen(valor) {
    this.insertAlmacen.almacen.flActivo = this.checkActivar ? 1 : 0;
    this.insertAlmacen.almacen.area.id = Number(valor);
    this._gestionarAlmacenService.insertarAlmacen(this.insertAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ObtenerAlmacen();
          this.getAllAreaSinAlmacen();
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

  private changeEstado(valor) {
    let parametrosE = { almacen: { flActivo: 0, idAlmacen: 0 } };
    parametrosE.almacen.idAlmacen = valor.idAlmacen;
    parametrosE.almacen.flActivo = (valor.flActivo) ? 1 : 0;
    this._gestionarAlmacenService.changeEstado(parametrosE)
      .subscribe(data => {
        if (data.estado == 1) {
          if (parametrosE.almacen.flActivo == 1) {
            this.toastr.success('Correctamente', 'Almacén Activado');
          } else if (parametrosE.almacen.flActivo == 0) {
            this.toastr.info('Correctamente', 'Almacén Desactivado');
          }
        }
        else
          if (data.estado == 0) {
            this.toastr.error('Esta siendo utilizado actualmente', 'No se puede desactivar este Almacén');
            parametrosE.almacen.flActivo = 1;
          }
        this.ObtenerAlmacen();
        return true;
      },
        error => {
          this.toastr.error('Error al Actualizar', 'Error');
          return Observable.throw(error);

        }),

      err => console.error(err),
      () => console.log('Request Complete');
  }
}
