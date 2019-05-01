import { EditarGrupoOcupacionalComponent } from './editar-grupo-ocupacional/editar-grupo-ocupacional.component';
import { CrearGrupoOcupacionalComponent } from './crear-grupo-ocupacional/crear-grupo-ocupacional.component';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { isInvalid, setInputPattern, setValidatorPattern, setQuantifier } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { GrupoOcupacionalService } from './../../services/grupo-ocupacional.service';

@Component({
  selector: 'app-grupo-ocupacional',
  templateUrl: './grupo-ocupacional.component.html',
  styleUrls: ['./grupo-ocupacional.component.scss']
})
export class GrupoOcupacionalComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild('insertActuGrupoOcupacional') private _insertarActuGrupoOcupacional: NgForm;
  //Selector

  //private grupoOcupacional: any[];
  private descripcionGrupoOcupacional: any[];
  private tipoProfesionalList: any[];
  private tipoProfesionalRequest = {
    descripcionTipoProfesional: null
  };

  private pagination: any;

  private grupoOcupacionalList: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns = ['descripcionGrupoOcupacional', 'abreviatura', 'descripcionTipoProfesional', 'emiteReceta', 'otorgaSolicitudExamen', 'emiteCitt', 'otorgaMaterial', 'emiteReferencia', 'regulaAntecedente', 'editar','eliminar'];
  //editar

  //Para paginacion
  private displayedSize: number[];
  private pageSize: number;

  private request = {

    idGrupoOcupacional: null,
    descripcionGrupoOcupacional: null,
    abreviatura: null,
    idTipoProfesional: null,
    emitirReceta: null,
    otorgarSolicitarExamen: null,
    emitirCitt: null,
    otorgarMateriales: null,
    emitirReferencia: null,
    regularAntecedente: null

  };

  private funcionActualizar = 0;
  private tipoProfesionalSeleccionadaActualizar = false;


  constructor(
    private _grupoOcupacional: GrupoOcupacionalService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [5, 10, 20, 50];
    this.pageSize = this.displayedSize[0];
  }

  public insertarGrupoOcupacional(insertActuGrupoOcupacional) {
    // this.jsonEnviarData["nuevo"] = 0;
    this._grupoOcupacional.insertarGrupoOcupacional(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.request.idGrupoOcupacional = null;
          this.request.descripcionGrupoOcupacional = null;
          console.log("SE INSERTO ", this.request);
        } else {
          this.toastr.error(data.confirmacion.mensaje);
        }
      },
        error => {
          console.log(error)
        },
        () => {
          this.obtenerGrupoOcupacional(1);
          insertActuGrupoOcupacional.resetForm();
        });
    //this.obtenerGrupoOcupacional();
    //his.obtenerGrupoOcupacional(1);
  }

  public actualizarGrupoOcupacional(insertActuGrupoOcupacional) {
    this._grupoOcupacional.actualizaGrupoOcupacional(this.request).subscribe(data => {
      if (data.estado == 1) {
        this.toastr.success(data.mensaje);
        this.request.idGrupoOcupacional = null;
        this.request.idTipoProfesional = null;
        this.request.descripcionGrupoOcupacional = null;

        this.obtenerGrupoOcupacional(1);
        this.funcionActualizar = 0;
        this.tipoProfesionalSeleccionadaActualizar = false;
        insertActuGrupoOcupacional.resetForm();
      } else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        console.log(error);
      });

  }

  public obtenerTipoProfesional() {

    this._grupoOcupacional.obtenerTipoProfesional()  //.obtenerTipoProfesional()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoProfesionalList = data.tipoProfesionalList;
          console.log(this.tipoProfesionalList);
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

  private pageEvent($event: any) {
    // if (this.request.abreviatura || this.request.emitirReceta || this.request.emitirCitt || this.request.emitirReferencia || this.request.otorgarMateriales || this.request.otorgarSolicitarExamen || this.request.regularAntecedente) {
    //   this.toastr.warning("Esta insertando un grupo ocupacional");
    //   return;
    // }
    // else {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerGrupoOcupacional();
    // }
  }

  isInvalid2(_form: NgForm) {
    // console.log(this._insertarActuGrupoOcupacional);
    // console.log(_form.form.controls.descripcionGrupoOcupacional.status);
    // console.log("primero: ", this.request.descripcionGrupoOcupacional);
    // console.log("segundo: ", this.request.idTipoProfesional);
    if (this._insertarActuGrupoOcupacional.form.controls.descripcionGrupoOcupacional['status'] === "VALID" && this._insertarActuGrupoOcupacional.form.controls.idTipoProfesional['status'] === "VALID") {
      // console.clear();
      return false;
    } else {
      // console.clear();
      return true;
    }
  }

  private obtenerGrupoOcupacional(numPagina?: number) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });



    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log("SE LISTO ", this.request);
    this._grupoOcupacional.obtenerGrupoOcupacional(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.grupoOcupacionalList = this.convertirBinario(data.grupoOcupacionalList);
          console.log(this.grupoOcupacionalList);
          this.dataSource = new MatTableDataSource(this.grupoOcupacionalList);
          //  if(data.descripcionGrupoOcupacional.match()
          let count = ((this.pagination.nuPagina - 1) * this.pageSize) + 1
          this.grupoOcupacionalList.forEach(element => {
            element["index"] = count
            count++
          });

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.grupoOcupacionalList.length > 0) {
            this.pagination.nuRegisMostrar = this.grupoOcupacionalList[0].nuTotalReg;
          }

        }
        else {
          this.toastr.error(data.mensaje, "No se encontro Grupo Ocupacional");
          this.grupoOcupacionalList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
    //this.obtenerGrupoOcupacional(1);
  }

  private eliminarGrupoOcupacional(idGrupoOcupacional, insertActuGrupoOcupacional) {
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
        this.request.idGrupoOcupacional = idGrupoOcupacional;

        this._grupoOcupacional.eliminarGrupoOcupacional(this.request).subscribe(data => {
          console.log(data.estado);
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
            this.request.idGrupoOcupacional = null;
            insertActuGrupoOcupacional.resetForm();
            this.funcionActualizar = 0;
            this.obtenerGrupoOcupacional(1);
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

  private editarGrupoOcupacional(element) {
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
        this.request.idGrupoOcupacional = element.idGrupoOcupacional;
        this.tipoProfesionalSeleccionadaActualizar = true;
        this.request.descripcionGrupoOcupacional = element.descripcionGrupoOcupacional;
        this.request.idTipoProfesional = element.idTipoProfesional;
        this.request.abreviatura = element.abreviatura;
        this.request.emitirReceta = this.convertStringToBit(element.emitirReceta);
        this.request.otorgarSolicitarExamen = this.convertStringToBit(element.otorgarSolicitarExamen);
        this.request.emitirCitt = this.convertStringToBit(element.emitirCitt);
        this.request.otorgarMateriales = this.convertStringToBit(element.otorgarMateriales);
        this.request.emitirReferencia = this.convertStringToBit(element.emitirReferencia);
        this.request.regularAntecedente = this.convertStringToBit(element.regularAntecedente);
        window.scroll(0, 0);
      }
    });
  }

  private cancelarActualizarGrupoOcupacional(insertActuGrupoOcupacional) {
    insertActuGrupoOcupacional.resetForm();
    this.request.idGrupoOcupacional = null;
    this.obtenerGrupoOcupacional(1);
    this.funcionActualizar = 0;
    this.tipoProfesionalSeleccionadaActualizar = false;

  }



  ngOnInit() {
    this.obtenerGrupoOcupacional(1);
    this.obtenerTipoProfesional();

  }


  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private convertStringToBit(descripcion) {
    if (descripcion == "SI") {
      return '1';
    } else if (descripcion == "NO") {
      return '0';
    }
  }

  private convertirBinario(dataList) {
    var nuevaLista = [];
    dataList.forEach(element => {
      if (element.emitirReceta == 1) {
        element.emitirReceta = 'SI';
      } else if (element.emitirReceta == 0) {
        element.emitirReceta = 'NO';
      } else {
      }

      if (element.otorgarSolicitarExamen == 1) {
        element.otorgarSolicitarExamen = 'SI';
      } else if (element.otorgarSolicitarExamen == 0) {
        element.otorgarSolicitarExamen = 'NO';
      } else {
      }
      if (element.emitirCitt == 1) {
        element.emitirCitt = 'SI';
      } else if (element.emitirCitt == 0) {
        element.emitirCitt = 'NO';
      } else {
      }
      if (element.otorgarMateriales == 1) {
        element.otorgarMateriales = 'SI';
      } else if (element.otorgarMateriales == 0) {
        element.otorgarMateriales = 'NO';
      } else {
      }
      if (element.emitirReferencia == 1) {
        element.emitirReferencia = 'SI';
      } else if (element.emitirReferencia == 0) {
        element.emitirReferencia = 'NO';
      } else {
      }
      if (element.regularAntecedente == 1) {
        element.regularAntecedente = 'SI';
      } else if (element.regularAntecedente == 0) {
        element.regularAntecedente = 'NO';
      } else {
      }

      nuevaLista.push(element);
    });
    return nuevaLista;
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
  crearGrupoOcupacional() {
    const dialogRef = this._modalDialog.open(CrearGrupoOcupacionalComponent, {
      autoFocus: false,
      // maxWidth: '80%',
    //  width: '30vw',
      // height: '30vw',
      // height: '200%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerGrupoOcupacional();
      }
    });
  }
  editar(element){
    const dialogRef = this._modalDialog.open(EditarGrupoOcupacionalComponent, {
      autoFocus: false,
      // maxWidth: '80%',
     // width: '30vw',
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
          this.obtenerGrupoOcupacional(1);
        } else {
          this.toastr.error(result.mensaje);
        }
      }
    });
  }
  
}
