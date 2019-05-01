import { AreaEspeActiGrupOcupService } from './../../../services/area-espe-acti-grup-ocup.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AmbienteService } from './../../../services/ambiente.service';
import { Component, OnInit, Input } from '@angular/core';
import { AreaService } from './../../../services/area.service';
import { Observable } from 'rxjs/Rx';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from
  '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-insertar-ambiente',
  templateUrl: './insertar-ambiente.component.html',
  styleUrls: ['./insertar-ambiente.component.scss']
})
export class InsertarAmbienteComponent implements OnInit {

  @Input() flag;
  @Input() ambienteList;

  private requestInsert = { idAmbiente: null, descripcionAmbiente: null, abreviaturaAmbiente: null, idArea: null, ambienteList: [] };
  private newRequest = { idEspecialidad: null, idActividad: null, nombreEspecialidad: null, nombreActividad: null };
  private tablaAux: any = [];
  private paramArea = { descripcionArea: null, numPagina: 1, numRegisMostrar: 1000 };
  private areas: any = [];
  private especialidad: any = [];
  private requestEsp = { idArea: null };
  private requestAct = { idArea: null, idEspecialidad: null };
  private actividad: any = [];
  private aux = {
    idEspecialidad: null,
    idActividad: null,
    nombreEspecialidad: null,
    nombreActividad: null
  };
  displayedColumns = ['especialidad', 'actividad', 'eliminar'];
  dataSource = new MatTableDataSource();

  constructor(
    private _areaService: AreaService,
    private _ambienteService: AmbienteService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private dialogRef: MatDialogRef<InsertarAmbienteComponent>,
    private _areaEspecActGrpOcupService: AreaEspeActiGrupOcupService) { }

  private jsonEspAct: any = [];

  ngOnInit() {
    this.getAreas();
    console.log(this.ambienteList);
    console.log(this.flag)
    if (this.flag == 2) {
      this.jsonEspAct = JSON.parse(this.ambienteList.jsonDetalleEspecialidadActividad);
      console.log(this.jsonEspAct);
      this.requestEsp.idArea = this.ambienteList.idArea;
      this.obtenerEspecialidadxArea();
      this.jsonEspAct.forEach(element => {
        this.aux = element;
        if (this.aux.idEspecialidad == null || this.aux.idEspecialidad == undefined) {
          delete this.aux;
        }
        else {
          this.tablaAux.push(this.aux);
          this.dataSource = new MatTableDataSource(this.tablaAux);
        }
      });
      console.log(this.tablaAux);
      this.requestInsert.idAmbiente = this.ambienteList.idAmbiente;
      this.requestInsert.descripcionAmbiente = this.ambienteList.descripcionAmbiente;
      this.requestInsert.abreviaturaAmbiente = this.ambienteList.abreviaturaAmbiente;
      this.requestInsert.idArea = this.ambienteList.idArea;
    }
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

  private obtenerEspecialidadxArea() {
    this.requestEsp.idArea = this.requestInsert.idArea;
    this._areaEspecActGrpOcupService.getEspecialidadesxArea(this.requestEsp)
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

    this.requestAct.idArea = this.requestInsert.idArea;
    this.requestAct.idEspecialidad = this.newRequest.idEspecialidad;

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

  private insertarAmbiente() {

    this.requestInsert.ambienteList = this.tablaAux.slice();

    if (this.requestInsert.ambienteList.length == 0) {
      delete this.requestInsert.ambienteList;
    }

    console.log(this.requestInsert);
    this._ambienteService.insertarProducto(this.requestInsert)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private actualizarAmbiente() {
    this.requestInsert.ambienteList = this.tablaAux.slice();

    if (this.requestInsert.ambienteList == []) {
      delete this.requestInsert.ambienteList;
    }

    console.log(this.requestInsert);
    this._ambienteService.actualizarProducto(this.requestInsert)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private agregarEspecialidadActividad() {

    for (let item of this.tablaAux) {
      if (item.idEspecialidad == this.newRequest.idEspecialidad && item.idActividad == this.newRequest.idActividad) {
        this.toastr.warning("Ya ingreso la especialidad y actividad")
        return;
      }
    }

    this.aux = {
      idEspecialidad: this.newRequest.idEspecialidad,
      idActividad: this.newRequest.idActividad,
      nombreEspecialidad: this.newRequest.nombreEspecialidad,
      nombreActividad: this.newRequest.nombreActividad
    }
    this.tablaAux.push(this.aux);
    this.dataSource = new MatTableDataSource(this.tablaAux);
    console.log(this.tablaAux);
    this.newRequest.idEspecialidad = null;
    this.newRequest.idActividad = null;
  }

  deleteEspAct(i) {
    this.tablaAux.splice(i, 1);
    this.dataSource = new MatTableDataSource(this.tablaAux);
    console.log(this.tablaAux);
  }

  imprime(ac) {
    this.newRequest.nombreActividad = ac.descripcionActividad;
  }

  imprimeEsp(esp) {
    this.newRequest.nombreEspecialidad = esp.especialidad.valor;
    this.obtenerActividadxAreaEsp();
  }

  private close(add) {
    this.dialogRef.close(add);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }
}
