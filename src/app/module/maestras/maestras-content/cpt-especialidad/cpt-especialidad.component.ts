import { Component, OnInit, ViewChild } from '@angular/core';
import { EspecialidadService } from './../../services/especialidad.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { ProcedimientosService } from '../../../consulta-ambulatoria/services/procedimientos.service';
import { CrearEditarCptEspecComponent } from './crear-editar-cpt-espec/crear-editar-cpt-espec.component';
import { CptEspecialidadService } from '../../services/cpt-especialidad.service';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-cpt-especialidad',
  templateUrl: './cpt-especialidad.component.html',
  styleUrls: ['./cpt-especialidad.component.scss']
})
export class CptEspecialidadComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;
  private descripcionProcedimiento = ""; 
  private descProcAutomplete = "";
  private codigoProcedimiento = "";
  private isValid: boolean = false;
  private lsNombreProcedimiento: any = [];
  private epecialidadRequest = {
    descripcionEspecialidad: null,
    numPagina: 1,
    numMostrarPagina: 1000
  };
  private request = {
    idEspecialidad: null,
    idCpt:null,
    nuPagina: null,
    nuRegisMostrar: null
  };
  dataSource = new MatTableDataSource();
  displayedColumns = ['especialidad', 'codigo', 'cpt', 'editar', 'eliminar'];
  private listcpt: any = [];
  private especialidades: any[];
  private datoObtenerProcxNum: any = { nuProcedimiento: "", noProcedimiento: "" };
  constructor(
    private _especialidad: EspecialidadService,
    private _cptEspecialidad: CptEspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _ProcedimientosService: ProcedimientosService
  ) { 
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  private isValidModify(){
    return this.isValid;
  }
  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerCptEspecialidad();
  }
  private eliminar(e) {
    let requestE={idEspecialidad:e.idEspecialidad, idCpt:e.idCpt };
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el registro?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._cptEspecialidad.deleteCptEspecialidades(requestE)
          .subscribe(data => {
            if (data.estado == 1) {
              if (data.confirmacion.id == 1) {
                this.toastr.success("Eliminado Correctamente");
                this.obtenerCptEspecialidad(1);
                }
                else{
                  this.toastr.warning(data.confirmacion.mensaje);
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
    });
  }
  public obtenerEspecialidades() {
    this._especialidad.getEspecialidad(this.epecialidadRequest)
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
  }
  public obtenerCptEspecialidad(nuPagina?: number) {
    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;
    this.request.idEspecialidad = this.request.idEspecialidad;
    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._cptEspecialidad.getCptEspecialidades(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listcpt = data.listaCptEspecialidad;
          this.dataSource = new MatTableDataSource(this.listcpt);
          if (this.matPag) {
            this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
          }
          if (this.listcpt.length > 0) {
            this.pagination.nuRegisMostrar = this.listcpt[0].nuTotalReg;
            this.request.idEspecialidad = null;
            this.request.idCpt=null;
            this.codigoProcedimiento=null;
            this.descripcionProcedimiento=null;
          }
          if (this.listcpt.length == 0) {
            this.toastr.info("No se encontró resultados");
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.lsNombreProcedimiento.filter(value => value.descProcedimiento.toLowerCase().indexOf(filterValue));
  }
  filterDescProcs(val: string) {
    this.lsNombreProcedimiento = val ? this._filter(val) : this.lsNombreProcedimiento;
  }
  private getProcedimientos(descBusq) {
    this.codigoProcedimiento = "";
    this.descProcAutomplete = "";
    if (descBusq.length == 0) {
      this.lsNombreProcedimiento = [];
      return;
    }
    if (descBusq.length % 2 == 0) {
      this.datoObtenerProcxNum.noProcedimiento = descBusq;
      // this.datoObtenerProcxNum.idCitaEncript = this.idCita;
      this._ProcedimientosService.ObtenerNombreProcedimientos(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            this.datoObtenerProcxNum = { nuProcedimiento: "", noProcedimiento: "" };
            this.lsNombreProcedimiento = data.lsProcedimiento;
            console.log( this.lsNombreProcedimiento);
            this.filterDescProcs(descBusq);
          }
          else {
            console.log(data.mensaje);
          }
          return true;
        },
          error => {
            console.error("Error al Listar");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  private onSearchChange(event) {
    if (event.length < 5) {
      this.descripcionProcedimiento = "";
      this.descProcAutomplete = "";
    }
    else {
      this.datoObtenerProcxNum.nuProcedimiento = event;
      this._ProcedimientosService.ObtenerNombreProcedimientos(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.lsProcedimiento.length == 0) {
              this.descripcionProcedimiento = "";
              this.descProcAutomplete = "";
              // this.is_edit = false;
              if (event.length == 8) {
                this.toastr.warning("No se encontraron Resultados");
              }
            }
            else {
              this.datoObtenerProcxNum = { nuProcedimiento: "", noProcedimiento: "" };
              this.request.idCpt = data.lsProcedimiento[0].idCpt;
              this.descripcionProcedimiento = data.lsProcedimiento[0].descProcedimiento;
              this.descProcAutomplete = data.lsProcedimiento[0].descProcedimiento;
            }
          }
          else {
            console.log(data.mensaje);
          }
          return true;
        },
          error => {
            console.error("Error al Obtener Procedimiento");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  private placeNumDesc(detallesProc) {
    this.codigoProcedimiento = detallesProc.codProcedimiento.trim();
    this.request.idCpt = detallesProc.idCpt;
    this.descripcionProcedimiento= detallesProc.descProcedimiento;
    // this.is_edit = true;
    this.lsNombreProcedimiento = [];
  }

  private modalNuevo(opcion,e?) {
    const dialogRef = this._modalDialog.open(CrearEditarCptEspecComponent, {
      autoFocus: false,
      hasBackdrop: true,
      // maxWidth: '90%',
       width: '76%',
      // maxHeight: '95%',
      // height: '95%',
      disableClose: false
    });
    dialogRef.componentInstance.opcion = opcion;
    dialogRef.componentInstance.cptEspecialidad = e;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerCptEspecialidad(1);
       
      }
    });
  }


  ngOnInit() {
    this.obtenerEspecialidades();
    this.obtenerCptEspecialidad();
  }

}
