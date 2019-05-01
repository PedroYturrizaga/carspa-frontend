import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { ProcedimientosService } from '../../../../consulta-ambulatoria/services/procedimientos.service';
import { Observable } from 'rxjs';
import { CptEspecialidadService } from '../../../services/cpt-especialidad.service';

@Component({
  selector: 'app-crear-editar-cpt-espec',
  templateUrl: './crear-editar-cpt-espec.component.html',
  styleUrls: ['./crear-editar-cpt-espec.component.scss']
})
export class CrearEditarCptEspecComponent implements OnInit {
  @Input() opcion;
  @Input() cptEspecialidad;
  @ViewChild(MatPaginator) paginatorCpt: MatPaginator;
  private nombreOpcion = "";
  private pagination: any;
  private displayedSize: number[];
  private pageSize: number;
  private descripcionProcedimiento = "";
  private descProcAutomplete = "";
  private codigoProcedimiento = "";
  private isValid: boolean = false;
  private showCpt=0;
  private lsNombreProcedimiento: any = [];
  private isEspecialidad: boolean = false;
  private epecialidadRequest = {
    descripcionEspecialidad: null,
    numPagina: 1,
    numMostrarPagina: 1000
  };
  private request = {
    idEspecialidad: null,
    cptList: [],
  };
  private requestE = { idEspecialidad: 0, idCptNuevo:0,idCptActual:0};
  private dcCpt = ['codigo', 'cptDetalle', 'eliminar'];
  dsCpt = new MatTableDataSource();
  private especialidades: any[];
  private datoObtenerProcxNum: any = { nuProcedimiento: "", noProcedimiento: "" };
  constructor(
    private _especialidad: EspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _ProcedimientosService: ProcedimientosService,
    private _cptEspecialidad: CptEspecialidadService,
    public dialogRef: MatDialogRef<CrearEditarCptEspecComponent>
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  private isValidModify() {
    return this.isValid;
  }
  private InsertaActualiza() {
    if (this.opcion == 1) {
      this.nombreOpcion = "Registrar CPT-Especialidad";
      this.isEspecialidad=false;
      this.showCpt=1;
      
    }
    else {
      this.nombreOpcion = "Editar CPT-Especialidad";
      this.isEspecialidad=true;
      this.showCpt=0;
      this.request.idEspecialidad=this.cptEspecialidad.idEspecialidad;
      this.codigoProcedimiento= this.cptEspecialidad.codigoCpt;
      this.descripcionProcedimiento=this.cptEspecialidad.descripcionCpt;
      this.requestE.idEspecialidad=this.cptEspecialidad.idEspecialidad;
      this.requestE.idCptActual=this.cptEspecialidad.idCpt; 
      this.requestE.idCptNuevo=this.cptEspecialidad.idCpt;    
    }
  }
  _setDataSource(tipoServicio) {
    setTimeout(() => {
      switch (tipoServicio) {
        case 'cpt':
          !this.dsCpt.paginator ? this.dsCpt.paginator = this.paginatorCpt : null;
          break;
      }
    });
  }

  private agregarCpt() {
    let existe = this.existElementInList(this.request.cptList, "codigo", this.codigoProcedimiento);
    if (existe) {
      this.toastr.warning("Ya se ha agregado este CPT a la lista.");
    }
    else{
      let cpt = {
        codigo: this.codigoProcedimiento,
        id: this.requestE.idCptNuevo,
        valor:this.codigoProcedimiento,
        descProcedimiento: this.descripcionProcedimiento
      }
      this.request.cptList.push(cpt);

      this.dsCpt = new MatTableDataSource(this.request.cptList);
      this._setDataSource('cpt');
    }
    this.codigoProcedimiento= null;
    this.descripcionProcedimiento = null; 
  }
  private deleteCpt(indice) {
    this.requestE.idCptNuevo = null;
    this.codigoProcedimiento = null;
    this.descripcionProcedimiento = null;
    // this.selects.cpt.codProcedimiento = null;
    this.descripcionProcedimiento = null;
    this.request.cptList.splice(indice, 1);
    this.dsCpt = new MatTableDataSource(this.request.cptList);
    this._setDataSource('cpt');
  }
  private insertar() {    
    console.log(this.request);
    this._cptEspecialidad.insertCptEspecialidades(this.request)
    .subscribe(data => {
      console.log(data);
      if (data.estado == 1) {
        if (data.confirmacion.id == 1) {
          this.toastr.success("Insertado Correctamente");
          this.close(true);
          }
          else{
            this.toastr.warning(data.confirmacion.mensaje);
          }
        }
      else {
        this.toastr.warning(data.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
      });

  }
  private actualizar() {    
    console.log(this.requestE);
    this._cptEspecialidad.updateCptEspecialidades(this.requestE)
    .subscribe(data => {   
      if (data.estado == 1) {
        if (data.confirmacion.id == 1) {
          this.toastr.success("Editado Correctamente");
          this.close(true);
          }
          else{
            this.toastr.warning(data.confirmacion.mensaje);
          }
        }
      else {
        this.toastr.warning(data.mensaje);
      }
      return true;
    },
      error => {
        console.error(error);
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
              this.requestE.idCptNuevo = data.lsProcedimiento[0].idCpt;
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
    this.requestE.idCptNuevo = detallesProc.idCpt;
    this.descripcionProcedimiento = detallesProc.descProcedimiento;
    // this.is_edit = true;
    this.lsNombreProcedimiento = [];
  }
  close(add) {
    this.dialogRef.close(add);
  }
  private existElementInList(list, prop, element): boolean {
    for (let _item of list) {
      if (_item[prop] == element) {
        return true;
        // break;
      }
    }
    return false;
  }
  ngOnInit() {
    this.obtenerEspecialidades();
    this.InsertaActualiza();
  }

}
