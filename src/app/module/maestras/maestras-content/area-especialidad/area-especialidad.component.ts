import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AreaEspecialidadService } from './../../services/area-especialidad.service';
import { EspecialidadService } from './../../services/especialidad.service';
import { AreaService } from './../../services/area.service';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { ToastsManager } from 'ng2-toastr';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-area-especialidad',
  templateUrl: './area-especialidad.component.html',
  styleUrls: ['./area-especialidad.component.scss']
})
export class AreaEspecialidadComponent implements OnInit {
  
  @ViewChild(MatPaginator) matPag: MatPaginator;
  //Selector
  private sexos: any[];
  private areas: any[];
  private areaRequest = {
    descripcionArea: null,
    numPagina: 1,
    numRegisMostrar: 1000
  };
  private especialidades: any[];
  private epecialidadRequest = {
    descripcionEspecialidad: null,
    numPagina: 1,
    numMostrarPagina: 1000
  };
  //private areaSelected: any;
  //-------------------------------------------------------------
  //private paramBusqueda = { idArea: null, idEspecialidad: null };
  private pagination: any;
  private areaEspList: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['area', 'especialidad', 'rpct', 'interconsulta', 'sexo', 'emin', 'emax', 'editar', 'eliminar'];

  //Para paginacion
  private displayedSize: number[];
  private pageSize: number;

  //llamando del html (ngModel)
  private request = {
    idArea: null,
    idEspecialidad: null,
    flag_interconsulta: null,
    rpct: null,
    idSexo: null,
    edadMaxima: null,
    edadMinima: null
  };
//Llamando del nuevo Html (ngModel)
  // private requestNew = {
  //   id_area: null,
  //   descripcion_area:null,
  //   id_especialidad:null,
  //   descripcion_especialidad:null,
  //   rpct:null,
  //   flg_interconsulta:null,
  //   id_sexo:null,
  //   descripcion_sexo:null,
  //   edad_max:null,
  //   edad_min:null 
  // };

  private funcionActualizar = 0;
  private areaSeleccionadaActualizar = false;
  private especialidadSeleccionadaActualizar = false;
  //---------------------------------------

  constructor(
    private _area_x_especialidad: AreaEspecialidadService,
    private _area: AreaService,
    private _especialidad: EspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  public insertarAreaxEspecialidad(insertActuAreaxEspecialidad) {
    // this.jsonEnviarData["nuevo"] = 0;
    this._area_x_especialidad.insertarArea_x_especialidad(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.request.idArea = null;
          this.request.idEspecialidad = null;
          this.obtenerAreaXEspecialidad(1);
          insertActuAreaxEspecialidad.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  public actualizarAreaxEspecialidad(insertActuAreaxEspecialidad) {
    this._area_x_especialidad.actualizarAreaxEspecialidad(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.request.idArea = null;
          this.request.idEspecialidad = null;
          this.obtenerAreaXEspecialidad(1);
          this.funcionActualizar = 0;
          this.areaSeleccionadaActualizar = false;
          this.especialidadSeleccionadaActualizar = false;
          insertActuAreaxEspecialidad.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  public obtenerAreas() {
    this._area.getAreas(this.areaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
  }

  public obtenerSexos() {
    this._area_x_especialidad.obtenerSexos()
      .subscribe(data => {
        if (data.estado == 1) {
          this.sexos = this.obtenerSoloAlgunosSexos(data.sexoList);
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
  }

  public obtenerEspecialidades() {
    // console.log(this.areaSelected.id);
    //if (this.areaSelected != null) {
    this._especialidad.getEspecialidad(this.epecialidadRequest) //.obtenerEspecialidades()
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidades = data.especialidadList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
    //}
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerAreaXEspecialidad();
  }

  private obtenerAreaXEspecialidad(numPagina?: number) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });

    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._area_x_especialidad.obtenerAreaXEspecialidad(this.request)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.areaEspList = data.areaEspecialidadList;
          console.log(this.areaEspList);

          this.dataSource = new MatTableDataSource(this.areaEspList);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.areaEspList.length > 0) {
            this.pagination.nuRegisMostrar = this.areaEspList[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron areas x especialidades");
          this.areaEspList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

  private eliminarAreaEspecialidad(idArea, idEspecialidad, insertActuAreaxEspecialidad) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.request.idArea = idArea;
        this.request.idEspecialidad = idEspecialidad;
        this._area_x_especialidad.eliminarArea_x_especialidad(this.request)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.request.idArea = null;
              this.request.idEspecialidad = null;
              insertActuAreaxEspecialidad.resetForm();
              this.funcionActualizar = 0;
              this.obtenerAreaXEspecialidad(1);
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
    });
  }

  private editarAreaEspecialidad(element) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea actualizar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        console.log("Comienza a editar");
        this.funcionActualizar = 1;
        this.areaSeleccionadaActualizar = true;
        this.especialidadSeleccionadaActualizar = true;
        this.request.edadMaxima = element.edadMaxima;
        this.request.edadMinima = element.edadMinima;
        this.request.rpct = this.convertStringToBit(element.rpct);
        this.request.flag_interconsulta = this.convertStringToBit(element.flag_interconsulta);
        this.request.idSexo = element.sexo.id;
        this.request.idArea = element.area.id;
        this.request.idEspecialidad = element.especialidad.id;


        // this.request.edadMaxima=element.edad_max;
        // this.request.edadMinima=element.edad_min;
        // this.request.rpct = this.convertStringToBit(element.rpct);
        // this.request.flag_interconsulta = this.convertStringToBit(element.flg_interconsulta);
        // this.request.idSexo = element.id_sexo;
        // this.request.idArea = element.id_area;
        // this.request.idEspecialidad = element.id_especialidad;
      }
    });
  }

  private cancelarActualizarAreaxEspecialidad(insertActuAreaxEspecialidad) {
    insertActuAreaxEspecialidad.resetForm();
    this.request.idArea = null;
    this.request.idEspecialidad = null;
    this.obtenerAreaXEspecialidad(1);
    this.funcionActualizar = 0;
    this.areaSeleccionadaActualizar = false;
    this.especialidadSeleccionadaActualizar = false;
  }

  ngOnInit() {
    this.obtenerAreaXEspecialidad(1);
    this.obtenerSexos();
    this.obtenerAreas();
    this.obtenerEspecialidades();
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private convertStringToBit(descripcion) {
    if (descripcion == 'SI') {
      return '1';
    } else if (descripcion == 'NO') {
      return '0';
    }
  }

  private obtenerSoloAlgunosSexos(dataList) {
    var nuevaLista = [];
    console.log(dataList);
    dataList.forEach(element => {
      if (element.valor.match(/\b(MASCULINO|HOMBRE)\b/ig)) {
        nuevaLista.push(element);
      } else if (element.valor.match(/\b(FEMENINO|MUJER)\b/ig)) {
        nuevaLista.push(element);
      } else if (element.valor.match(/\b(TODOS|TODO)\b/ig)) {
        nuevaLista.push(element);
      } else {
      }
    });
    return nuevaLista;
  }
}
