import { Component, OnInit, ViewChild } from '@angular/core';
import { EspecialidadService } from './../../services/especialidad.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { ProcedimientosService } from '../../../consulta-ambulatoria/services/procedimientos.service';
import { CptEspecialidadService } from '../../services/cpt-especialidad.service';
import { getCodUsuario } from '../../../../shared/auth/storage/cabecera.storage';
import { setQuantifier, isInvalid, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ActualizarMaproComponent } from './actualizar-mapro/actualizar-mapro.component';

@Component({
  selector: 'app-mapro',
  templateUrl: './mapro.component.html',
  styleUrls: ['./mapro.component.scss']
})
export class MaproComponent implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  private displayedSize: number[];
  private pageSize: number;
  private pagination: any;
  private descripcionProcedimiento = ""; 
  private descProcAutomplete = "";
  private codigoProcedimiento = "";
  private isValid: boolean = false;
  private lsNombreProcedimiento: any = [];
  private showTabla=0;
  private requestEspecialidad = {
    codUsuario: getCodUsuario()
  };
  private request = {
    idEspecialidad: null,
    idCpt:null,
  };
  dataSource = new MatTableDataSource();
  displayedColumns = ['especialidad', 'codigo', 'cpt', 'tiempo', 'asignar'];
  private listcpt: any = [];
  private especialidades: any[];
  private datoObtenerProcxNum: any ={idEspecialidad:0, descripcion: "",codigoCpt: null};
  constructor(
    private _cptEspecialidad: CptEspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }
  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerCptEspecialidad();
  }

  public obtenerEspecialidades() {
    this._cptEspecialidad.getEspecialidades()
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidades = data.listaEspecialidad;           
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
  public obtenerCptEspecialidad(numPagina?: any) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });


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
          if (this.matPaginator) {
            this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
          }
          
          if (this.listcpt.length > 0) {
            this.showTabla=1;
            this.pagination.nuRegisMostrar=this.listcpt[0].nuTotalReg;
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
    return this.lsNombreProcedimiento.filter(value => value.descripcionCpt.toLowerCase().indexOf(filterValue));
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
      this.datoObtenerProcxNum.idEspecialidad=this.request.idEspecialidad;
      this.datoObtenerProcxNum.descripcion = descBusq;
      this._cptEspecialidad.getCptPorEspecialidad(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            this.datoObtenerProcxNum = { idEspecialidad:0, descripcion: "",codigoCpt:null};
            this.lsNombreProcedimiento = data.listaCpt;  
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
    this.datoObtenerProcxNum.codigoCpt =event;
    this.datoObtenerProcxNum.idEspecialidad=this.request.idEspecialidad;
    if (event.length < 5) {
      this.descripcionProcedimiento = "";
      this.descProcAutomplete = "";
    }
    else {
      this._cptEspecialidad.getCptPorEspecialidad(this.datoObtenerProcxNum)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.listaCpt.length == 0) {
              this.descripcionProcedimiento = "";
              this.descProcAutomplete = "";
              this.toastr.warning("No se encontraron Resultados");
              if (event.length == 8) {
                this.toastr.warning("No se encontraron Resultados");
              }
            }
            else {              
              this.datoObtenerProcxNum = { idEspecialidad:0, descripcion: "",codigoCpt:null };
              this.request.idCpt = data.listaCpt[0].idCpt;
              this.descripcionProcedimiento = data.listaCpt[0].descripcionCpt;
              this.descProcAutomplete = data.listaCpt[0].descripcionCpt;
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
    this.codigoProcedimiento = detallesProc.codigoCpt.trim();
    this.request.idCpt = detallesProc.idCpt;
    this.descripcionProcedimiento= detallesProc.descripcionCpt;
    this.lsNombreProcedimiento = [];
  }
  private isValidModify(){
    return this.isValid;
  }
  private actualizarCpt(element){
    if(element.tiempo>0){
      let request={
        idEspecialidad:element.idEspecialidad,
        idCpt:element.idCpt,
        tiempo:+element.tiempo,
        detalle:null
      }
      this._cptEspecialidad.actualizarCptEspecialidades(request)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.obtenerCptEspecialidad();
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
    else {
      this.toastr.warning("El tiempo es solo minutos");
      element.tiempo=null;
    }
    
  }
  private actualizar(element){
    if(element.tiempo>0){
      let request={
        idEspecialidad:element.idEspecialidad,
        idCpt:element.idCpt,
        tiempo:+element.tiempo,
        detalle:null
      }
      this._cptEspecialidad.actualizarCptEspecialidades(request)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.obtenerCptEspecialidad();
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
    else {
      element.tiempo=null;
    }
    
  }
  private openModal(element){
    if(element.tiempo>0){
      this.actualizar(element);
    const dialogRef = this._modalDialog.open(ActualizarMaproComponent, {
      autoFocus: false,
      hasBackdrop: true,
      // maxWidth: '90%',
      // maxHeight: '95%',
      // height: '95%',
      disableClose: false
    });
    dialogRef.componentInstance.mapro= element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerCptEspecialidad();
      }
    });
  }
  else {
    this.toastr.warning("El tiempo es solo minutos");
    element.tiempo=null;
  }

  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  ngOnInit() {
    this.obtenerEspecialidades();
  }

}
