import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { SesionService } from '../../../../../../../shared/services/sesion.service';
import { ReporteService } from '../../../../../../../shared/services/reporte.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ModalPdfComponent } from '../../../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatDatepicker, MatPaginatorIntl } from '@angular/material';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatInputModule } from '@angular/material/input';

import { CitaExamenesAuxiliaresService } from '../../../../../services/cita-examenes-auxiliares.service';
import { ExamenTipoAcatualizaComponent } from './examen-tipo-acatualiza/examen-tipo-acatualiza.component';
import { ExamenTipoEliminaComponent } from './examen-tipo-elimina/examen-tipo-elimina.component'

@Component({
    selector: 'app-examenes-tipo',
    templateUrl: './examenes-tipo.component.html',
    styleUrls: ['./examenes-tipo.component.scss']
})
export class ExamenesTipoComponent implements OnInit {

    @Input() idPersona;
    @Input() idActoMedico;
    @Input() idAtencionEncriptado;

    displayedColumns = ['tipoExamen', 'descripcionExamenArea', 'codigoCpt', 'descripcionCpt', 'observacionExamenDetalle', 'motivoExamenDetalle', 'eliminar', 'editar'];
    dataSource = new MatTableDataSource();

    cptExamenesCtrl: FormControl = new FormControl();

    private idExamenTipo: number = 2;
    private cptExamenes: any[] = [];
    private cptExam = { cptExamenList: { idExamenTipo: null, idExamenArea: null, codigoCpt: null, descripcionCpt: null, idCpt: null, descripcionExamenArea: null } }
    private RequestExamenes = { ordenExamen: [{ idCpt: null, descripcionCpt: "", observacionExamenDetalle: null, idActoMedico: null, descripcionExamenArea: null, codigoCpt: null }] }
    private ordenExamen = { idActoMedico: null, idExamenTipo: null, idAtencion: null };
    private impresionExamenes = { idActoMedico: null, idExamenTipo: null, tipoFile: null }
    // private areaExamen = "";
    private descripcion = "";
    private descripcionCpts: any[] = [];
    private cptSeleccionado;
    private cptAutoCompletado: any[] = [];
    private insertarExamenes = { ordenExamen: { idAtencionEncriptado: null, idActoMedicoEncriptado: null, ordenExamenDetalleList: [{ idCpt: null, observacionExamenDetalle: null }] } }
    private idOrdenExamenDet: number = null;

    private ordenExamenDetalleIngresados: any[] = null;
    private RequestcptExamenes: any = { ordenExamen: { ordenExamenDetalleList: [] } };
    private lscptExamenes: any[] = [];
    private examenesTipos: any[] = [];
    private exTipoSelect = { id: null, valor: null };
    private _params = { idActoMedico: this.idActoMedico, idAtencion: this.idAtencionEncriptado, idExamenTipo: null, codigoCpt: null, descripcionCpt: null, idCpt: null, descripcionExamenArea: null, motivoExamenDetalle: null, observacionExamenDetalle: null, tipoFile: null };

    private pdf: String = "";

    constructor(private _examenesApoyoService: CitaExamenesAuxiliaresService,
        private toastr: ToastsManager,
        private _reporteService: ReporteService,
        public dialog: MatDialog) {

    }

    ngOnInit() {
        this._params.idActoMedico = this.idActoMedico;
        this._params.idAtencion = this.idAtencionEncriptado;
        console.log(this._params)
        this.getObtenerExamenTipos();
        //valida que no sea nulos
        if (this.idActoMedico != null && this.idAtencionEncriptado != null) {
            this.getobtenerOrdenExamenes();
        }
    }

    private getObtenerExamenTipos() {
        this._examenesApoyoService.obtenerExamenTipos(this.examenesTipos)
            .subscribe(data => {
                // console.log(data);
                if (data.estado == 1) {
                    this.examenesTipos = data.examenTipoList;
                } else {
                    this.toastr.error(data.mensaje);
                }
                return true;
            },
                error => {
                    console.error(error);
                });
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .map(term => term === '' ? []
                : this.lscptExamenes.filter(v => v.descripcionCpt.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    formatter = (x: { descripcionCpt: string }) => x.descripcionCpt;

    buscarDescripcion(desc) {
        if (desc.length % 2 == 0) {
            this._params.descripcionCpt = desc;
            this._params.idExamenTipo = this.exTipoSelect.id;
            this.buscarCptExamenes();
        }
    }

    seleccionarDescripcion(cpt) {
        for (let x in cpt) {
            this._params[x] = cpt[x]
        }
        console.log(this._params);
    }

    //busqueda por codigo
    private buscarPorFiltro() {
        // debugger
        if (this._params.codigoCpt == null) {
            this.toastr.warning('Debe Ingresar Codigo de Examen', 'Codigo');
        } else {
            this.buscarCptExamenes().then(() => {
                if (this.lscptExamenes != null) {
                    this._params.descripcionExamenArea = this.lscptExamenes[0].descripcionExamenArea;
                    this._params.descripcionCpt = this.lscptExamenes[0].descripcionCpt;
                }
            });
        }
        console.log(this._params);
    }

    //Busqueda de los cpt
    private buscarCptExamenes() {
        this._params.idExamenTipo = this.exTipoSelect.id;
        console.log(this._params);
        let promise = new Promise((resolve, reject) => {
            this._examenesApoyoService.obtenerCPTExamenes(this._params)
                .toPromise().then(data => {
                    console.log(data);
                    if (data.estado == 1) {
                        this.lscptExamenes = data.cptExamenList;
                    } else if (data.estado == 0) {
                        this.toastr.warning(data.mensaje);
                        this.lscptExamenes = null;
                        // this._params.descripcionCpt = null;
                        this._params.descripcionExamenArea = null;
                        this._params.codigoCpt = null;
                    } else {
                        this.toastr.error("Error en buscar Examenes" + data.mensaje);
                        this.lscptExamenes == null;
                    } resolve();
                },
                    err => {
                        console.error(err);
                    });
        })
        return promise;
    }

    //insertar
    private postOrdenExamenes() {
        // debugger
        if (this._params.codigoCpt == null && this._params.descripcionCpt) {
            this.toastr.warning('Debe Ingresar Datos de Búsqueda');
            return;
        }
        if (this.ordenExamenDetalleIngresados != null) {
            //valida que no seleccione 2 veces el mismo cpt
            for (let x of this.ordenExamenDetalleIngresados) {
                for (let y of x['ordenExamenDetalleList']) {
                    if (y['codigoCpt'] == this._params.codigoCpt && y['descripcionCpt'] == this._params.descripcionCpt) {
                        this.toastr.warning("Examen ya seleccionado");
                        return;
                    }
                }
                // if (x['ordenExamenDetalleList'].cptExamen.codigoCpt == this._params.codigoCpt && x['ordenExamenDetalleList'].cptExamen.descripcionCpt == this._params.descripcionCpt) {
                //     this.toastr.warning("Examen ya seleccionado");
                //     return;
                // }
            }
        }
        console.log(this._params);
        let _param = { observacionExamenDetalle: this._params.observacionExamenDetalle, motivoExamenDetalle: this._params.motivoExamenDetalle, idCpt: this._params.idCpt };
        this.RequestcptExamenes.ordenExamen.ordenExamenDetalleList.push(_param);
        this.RequestcptExamenes.ordenExamen.idActoMedicoEncriptado = this.idActoMedico;
        this.RequestcptExamenes.ordenExamen.idAtencionEncriptado = this.idAtencionEncriptado;

        if (this.RequestcptExamenes.ordenExamen.idAtencionEncriptado == null && this.RequestcptExamenes.ordenExamen.idActoMedicoEncriptado == undefined) {
            this.toastr.warning("No ha Registrado Acto Medico")
        } else {
            console.log(this.RequestcptExamenes);
            this._examenesApoyoService.insertarOrdenExamenes(this.RequestcptExamenes)
                .subscribe(data => {
                    if (data.estado == 1) {
                        this.toastr.success(data.mensaje);
                        this.limpiar();
                        this.getobtenerOrdenExamenes();
                    } else if (data.estado == 0) {
                        this.toastr.warning(data.mensaje);
                    } else {
                        this.toastr.error(data.mensaje);
                    }
                },
                    error => {
                        console.error(error);
                    });
            this.RequestcptExamenes = { ordenExamen: { ordenExamenDetalleList: [] } };
        }
    }
    //obtener cpts insertados
    private getobtenerOrdenExamenes() {
        this._params.idActoMedico = this.idActoMedico;
        // this._params.idExamenTipo = this.exTipoSelect.id;
        this._params.idAtencion = this.idAtencionEncriptado;
        this._examenesApoyoService.obtenerOrdenExamenes(this._params)
            .subscribe(data => {
                console.log(data);
                if (data.estado == 1) {
                    if (data.ordenExamenList == null) {
                        this.toastr.warning('No Existen Examenes Asignados');
                    } else {
                        // this.ordenExamenDetalleIngresados = data.ordenExamen;
                        this.ordenExamenDetalleIngresados = data.ordenExamenList;
                        // let aux = data.ordenExamenList;
                        // for (let x of aux) {
                        //     console.log(aux[x]);
                        //     for (let y in x) {
                        //         console.log(aux[x][y]);
                        //         let ordenExamenDetalleIngresados_aux = {};
                        //         if (y != 'ordenExamenDetalleList')
                        //             ordenExamenDetalleIngresados_aux = aux[x][y];
                        //         for (let z of aux[x][y]) {
                        //             console.log(aux[x][y][z]);
                        //             ordenExamenDetalleIngresados_aux = aux[x][y][z];
                        //             // this.ordenExamenDetalleIngresados.push(ordenExamenDetalleIngresados_aux)
                        //             console.log(ordenExamenDetalleIngresados_aux);

                        //         }
                        //     }
                        // }

                        this.dataSource = new MatTableDataSource(this.ordenExamenDetalleIngresados["ordenExamenDetalleList"]);
                        console.log(this.ordenExamenDetalleIngresados);
                    }
                } else if (data.estado == 0) {
                    this.toastr.info(data.mensaje,"No tiene Solicitudes de Examenes");
                }
                else {
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

    private getObtenerImpresionExamenes() {
        if (this.ordenExamenDetalleIngresados == null) {
            this.toastr.warning('No se Encontraron Examenes Asignados');
            return
        }

        this._params.tipoFile = 2;
        this._examenesApoyoService.obtenerImpresionExamenes(this._params)
            .subscribe(data => {
                if (data.estado == 1) {
                    // this._reporteService.generar(null, data.imprimeFile, 2);
                    this.pdf = "data:application/pdf;base64," + data.imprimeFile;
                    this.openModal(this.pdf);
                } else if (data.estado == -1) {
                    this.toastr.warning('No se ingresaron examenes asignados');
                }
            },
                err => {
                    this.toastr.error(err)
                });

    }


    modalEliminarOrdExamDetalle(idOrdenExamenDetalle) {
        const dialogRef = this.dialog.open(ExamenTipoEliminaComponent, {
            autoFocus: false,
            hasBackdrop: true,
            minWidth: '70%',
            width: '1400px',
            maxHeight: '80%',
            height: '700px',
            disableClose: true
        });
        dialogRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;
        dialogRef.componentInstance.exTipoSelect = this.exTipoSelect;
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    modalActualizarOrdExaDetalle(idOrdenExamenDetalle) {
        const dialogRef = this.dialog.open(ExamenTipoAcatualizaComponent, {
            autoFocus: false,
            hasBackdrop: true,
            minWidth: '70%',
            width: '1400px',
            maxHeight: '80%',
            height: '700px',
            disableClose: true
        });
        dialogRef.componentInstance.idOrdenExamenDetalle = idOrdenExamenDetalle;
        dialogRef.componentInstance.exTipoSelect = this.exTipoSelect;
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    openModal(mystring): void {
        const dialogRef = this.dialog.open(ModalPdfComponent, {
          autoFocus: false,
          maxWidth: '90%',
          width: '80%',
          maxHeight: '95%',
          height: '95%',
          disableClose: false,
          panelClass: 'pdfs'
        });
        dialogRef.componentInstance.mystring = mystring;
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    
    limpiar() {
        this._params = { idExamenTipo: null, codigoCpt: null, descripcionCpt: null, idCpt: null, descripcionExamenArea: null, motivoExamenDetalle: null, observacionExamenDetalle: null, idActoMedico: null, idAtencion: null, tipoFile: null };
    }

}
