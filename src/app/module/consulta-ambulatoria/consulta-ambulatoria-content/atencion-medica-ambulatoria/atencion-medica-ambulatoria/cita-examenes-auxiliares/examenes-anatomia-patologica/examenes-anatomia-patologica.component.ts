import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CitaExamenesAuxiliaresService } from '../../../../../services/cita-examenes-auxiliares.service';
import { ExamenesAnatomiaPatologicaDeleteComponent } from './examenes-anatomia-patologica-delete/examenes-anatomia-patologica-delete.component';
import { ExamenesAnatomiaPatologicaActualizaComponent } from './examenes-anatomia-patologica-actualiza/examenes-anatomia-patologica-actualiza.component';
import { ToastsManager } from 'ng2-toastr';
import { SesionService } from "../../../../../../../shared/services/sesion.service";
import { ReporteService } from '../../../../../../../shared/services/reporte.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatDatepicker, MatPaginatorIntl } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-examenes-anatomia-patologica',
  templateUrl: './examenes-anatomia-patologica.component.html',
  styleUrls: ['./examenes-anatomia-patologica.component.scss']
})
export class ExamenesAnatomiaPatologicaComponent implements OnInit {
    
  displayedColumns = ['descripcionExamenArea', 'codigoCpt', 'descripcionCpt', 'observacionExamenDetalle', 'eliminar', 'editar'];
  dataSource = new MatTableDataSource();
  
  @Input() idPersonaAP;
  @Input() idActoMedicoAP;
  @Input() idAtencionEncriptado;

  private IPRESS: any;
  private ordenExamenDetalle: any[] = [];
  private idExamenTipo: number = 3;
  private cptExamenes: any[] = [];
  private cptExam = { cptExamenList: { idExamenTipo: null, idExamenArea: null, codigoCpt: null, descripcionCpt: null, idCpt: null, descripcionExamenArea: null } }
  private RequestExamenes = { idCpt: null, descripcionCpt: "", observacionExamenDetalle: null, idActoMedico: null, descripcionExamenArea: null, codigoCpt: null }
  private ordenExamen = { idExamenTipo: null, idActoMedico: null, idAtencion: null };
  private impresionExamenes = { idActoMedico: null, idExamenTipo: null, tipoFile: null }
  private areaExamen = "";
  private descripcion = "";
  private descripcionCpts: any[] = [];
  private cptSeleccionado;
  private cptAutoCompletado: any[] = [];
  private insertarExamenes = { ordenExamen: { idAtencionEncriptado: null, idActoMedicoEncriptado: null, ordenExamenDetalleList: [{ idCpt: null, observacionExamenDetalle: null }] } }


  constructor(private _examenesApoyoService: CitaExamenesAuxiliaresService,
              private toastr: ToastsManager,
              private _reporteService: ReporteService,
              public dialog: MatDialog ) {
                                          this.IPRESS = SesionService.obtenerElementos().IPRESS;
                                          }

  private getObtenerCPTExamenes() {
    this.cptExam.cptExamenList.idExamenTipo = this.idExamenTipo;
    console.log(this.cptExam);
    this._examenesApoyoService.obtenerCPTExamenes(this.cptExam.cptExamenList)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cptAutoCompletado = data.cptExamenList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        },
        () => {
          this.cptAutoCompletado.forEach(cptExamen => {
            this.descripcionCpts[this.descripcionCpts.length] = cptExamen.descripcionCpt;
          })
        });
  }

  private buscarCptExamenes() {
    // this.cptExam.cptExamenList.idExamenTipo = this.idExamenTipo; 
    this.RequestExamenes.idCpt = null;
    this._examenesApoyoService.obtenerCPTExamenes(this.cptExam.cptExamenList)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.RequestExamenes = data.cptExamenList[0];
          this.areaExamen = this.RequestExamenes.descripcionExamenArea;
          this.descripcion = this.RequestExamenes.descripcionCpt;
          console.log(this.RequestExamenes);
        } else {
          this.toastr.error(data.mensaje);
          this.areaExamen = null;
          this.descripcion = null;
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }

  private buscarPorFiltro() {
    if (this.cptExam.cptExamenList.codigoCpt == null) {
      this.toastr.warning('Debe Ingresar Codigo de Examen', 'Codigo');

    } else {
      this.buscarCptExamenes();
    }
  }

  private postOrdenExamenes() {
    if (this.RequestExamenes.idCpt == null) {
      this.toastr.warning('Debe Ingresar Datos de Búsqueda');
      return
    }
    if (this.RequestExamenes.idCpt == null) {
      this.cptSeleccionado = this.cptExamenes.filter(v => v.descripcionCpt === this.descripcion)[0];
      this.RequestExamenes.idCpt = this.cptSeleccionado.idCpt;
    }
    this.insertarExamenes.ordenExamen.ordenExamenDetalleList[0].observacionExamenDetalle = this.RequestExamenes.observacionExamenDetalle;
    this.insertarExamenes.ordenExamen.ordenExamenDetalleList[0].idCpt = this.RequestExamenes.idCpt;
    this.insertarExamenes.ordenExamen.idActoMedicoEncriptado = this.idActoMedicoAP;
    this.insertarExamenes.ordenExamen.idAtencionEncriptado = this.idAtencionEncriptado;
    console.log(this.insertarExamenes);
    this._examenesApoyoService.insertarOrdenExamenes(this.insertarExamenes)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        },
        () => {
          this.descripcion = null;
          this.areaExamen = null;
          this.cptExam.cptExamenList.codigoCpt = null;
          this.RequestExamenes.observacionExamenDetalle = null;
          this.getobtenerOrdenExamenes();
        });
  }

  private getobtenerOrdenExamenes() {
    this.ordenExamen.idActoMedico = this.idActoMedicoAP;
    this.ordenExamen.idExamenTipo = this.idExamenTipo;
    this.ordenExamen.idAtencion = this.idAtencionEncriptado;
    console.log(this.ordenExamen);
    this._examenesApoyoService.obtenerOrdenExamenes(this.ordenExamen)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.ordenExamen == null) {
            this.toastr.warning('No Existen Examenes Asignados');
          } else {
            this.ordenExamenDetalle = data.ordenExamen;
            this.dataSource = new MatTableDataSource(this.ordenExamenDetalle["ordenExamenDetalleList"]);
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        },
        () => {
        });
  }

  // private modalEliminarOrdenExamenDetalle(idOrdenExamenDetalle) {
  //   const modalRef = this.modalService.open(ExamenesAnatomiaPatologicaDeleteComponent, { size: 'sm', backdrop: 'static' });
  //   modalRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;
  //   modalRef.result.then((result) => {
  //     this.getobtenerOrdenExamenes();
  //     this.borrarRegistro(idOrdenExamenDetalle);
  //   }, (reason) => {
  //     this.getobtenerOrdenExamenes();
  //     this.borrarRegistro(idOrdenExamenDetalle);
  //   });
  // }

  modalEliminarOrdExamDetalle(idOrdenExamenDetalle){
    const dialogRef = this.dialog.open(ExamenesAnatomiaPatologicaDeleteComponent, {
      autoFocus: false,
      hasBackdrop: true,
      minWidth: '70%',
      width: '1400px',
      maxHeight: '80%',
      height: '700px',
      disableClose: true 
    });
    dialogRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private borrarRegistro(idOrdenExamenDetalle) {
    let index = 0;
    for (let i of this.ordenExamenDetalle["ordenExamenDetalleList"]) {
      if (i.idOrdenExamenDetalle == idOrdenExamenDetalle) {
        this.ordenExamenDetalle["ordenExamenDetalleList"].splice(index, 1);
        this.dataSource = new MatTableDataSource(this.ordenExamenDetalle["ordenExamenDetalleList"]);
        return;
      }
      index++;
    }
  }

  // private modalActualizarOrdenExamenDetalle(idOrdenExamenDetalle) {
  //   const modalRef = this.modalService.open(ExamenesAnatomiaPatologicaActualizaComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;

  //   modalRef.result.then((result) => {
  //     this.getobtenerOrdenExamenes();
  //   }, (reason) => {
  //     this.getobtenerOrdenExamenes();
  //   });
  // }

  modalActualizarOrdExaDetalle(idOrdenExamenDetalle){
    const dialogRef = this.dialog.open(ExamenesAnatomiaPatologicaActualizaComponent, {
      autoFocus: false,
      hasBackdrop: true,
      minWidth: '70%',
      width: '1400px',
      maxHeight: '80%',
      height: '700px',
      disableClose: true 
    });
    dialogRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  private getObtenerImpresionExamenes() {
    if (this.ordenExamenDetalle == null) {
      this.toastr.warning('No se Encontraron Examenes Asignados');
      return
    }

    this.impresionExamenes.idActoMedico = this.idActoMedicoAP;
    this.impresionExamenes.idExamenTipo = this.idExamenTipo;
    this.impresionExamenes.tipoFile = 2;
    this._examenesApoyoService.obtenerImpresionExamenes(this.impresionExamenes)
      .subscribe(data => {
        if (data.estado == 1) {
          this._reporteService.generar(null, data.imprimeFile, 2);

        } else if (data.estado == -1) {
          this.toastr.warning('No se ingresaron examenes asignados');
        }
      },
        err => {
          this.toastr.error(err)
        });

  }

  search = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.descripcionCpts.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  }
  formatter = (x: { descripcionCpt: string }) => x;

  private seleccionadoCpt(seleccionCpt) {
    this.RequestExamenes = null;
    this.RequestExamenes = this.cptAutoCompletado.filter(x => x.descripcionCpt == seleccionCpt.item)[0];
    this.areaExamen = this.RequestExamenes.descripcionExamenArea;
    this.cptExam.cptExamenList.codigoCpt = this.RequestExamenes.codigoCpt;
  }

  ngOnInit() {
    this.getobtenerOrdenExamenes();
    this.getObtenerCPTExamenes();
  }

}
