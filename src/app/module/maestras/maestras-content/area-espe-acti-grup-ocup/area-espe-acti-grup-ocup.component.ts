import { AreaEspeActiGrupOcupService } from './../../services/area-espe-acti-grup-ocup.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatSelectionList, MatSelect } from '@angular/material';
import { truncate } from 'fs';
import { NgForm } from '@angular/forms';
import { Request } from '@angular/http';
import { EliminarAeagpComponent } from './eliminar-aeagp/eliminar-aeagp.component';

@Component({
    selector: 'app-area-espe-acti-grup-ocup',
    templateUrl: './area-espe-acti-grup-ocup.component.html',
    styleUrls: ['./area-espe-acti-grup-ocup.component.scss']
})
export class AreaEspeActiGrupOcupComponent implements OnInit {

    @ViewChild(MatPaginator) matPag: MatPaginator;
    displayedColumns = ['area', 'especialidad', 'actividad', 'grupoOcupacional', 'eliminar'];


    private requestParam = { idActividad: null, idArea: null, idEspecialidad: null, idGrupoOcupacional: null };

    private lsArea = [{ idArea: 1, valor: "CONSULTA-EXTERNA" }, { idArea: 2, valor: "EMERGENCIA" }, { idArea: 3, valor: "HOSPITALIZACION" }, { idArea: 4, valor: "AYUDA AL DIAGNOSTICO" }];
    private lsEspecialidad = [{ idEspecialidad: 1, valor: "ALERGIA" }, { idEspecialidad: 2, valor: "CARDIOLOGIA" }, { idEspecialidad: 3, valor: "CARDIOLOGIA INVASIVA" }, { idEspecialidad: 4, valor: "CARDIOLOGIA NO INVASIVA" }, { idEspecialidad: 22, valor: "NEUMOLOGIA" }, { idEspecialidad: 96, valor: "FARMACIA" }];
    private lsActividad = [{ idActividad: 1, valor: "ACTIVIDADES ADMINISTRATIVAS" }, { idActividad: 2, valor: "ACTIVIDADES ASIST. DE PROFES. DE SALUD NO MEDICOS" }, { idActividad: 3, valor: "ACTIVIDADES ASISTENCIALES DE TECNICOS" }, { idActividad: 4, valor: "ACTIVIDADES ESPECIFICAS DE LOS PROFES. NO MEDICOS" }, { idActividad: 17, valor: "CONSULTA  MEDICA AMBULATORIA" }, { idActividad: 23, valor: "SOLICITAR MEDICAMENTO MATERIAL" }, { idActividad: 25, valor: "INVENTARIO" }];
    private lsGrupoOcupacional = [{ idGrupoOcupacional: 1, valor: "MEDICO" }];
    private parabusArea = { nuPagina: 1, nuRegisMostrar: 1000 };
    private parabusEspecialidad = { idArea: null, nuPagina: 1, nuRegisMostrar: 1000 };
    private parabusActividad = { idArea: null, idEspecialidad: null, nuPagina: 1, nuRegisMostrar: 1000 };
    private areas: any[];
    private especialidades: any[];
    private areaSelected: any;
    dataSource = new MatTableDataSource();

    //Para paginacion
    private displayedSize: number[];
    private pageSize: number;
    private pagination: any;
    private variableArea = false;
    private variableEspecialidad = true;
    private variableActividad = true;
    private variableGrupoOcupacional = true;


    private addAreaA: any[];
    private actividadSelected: any;
    private ls_Actividades: any = [];
    private ls_GruposOcupacionales: any = [];
    private ls_Especialidades: any = [];
    private especialidadSeleccionadaActualizar = false;
    private areaEspActGruList: any[];
    constructor(
        private _areaEspecActGrpOcupService: AreaEspeActiGrupOcupService,
        private toastr: ToastsManager,
        public dialog: MatDialog
    ) {
        this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
        this.displayedSize = [5,10, 20, 50, 100];
        this.pageSize = this.displayedSize[0];
        this.areas = [];

    }

    ngOnInit() {
        // this.insertar();
        this.obtenerAreaXEspecialidadXActividadXGrupoOcupacional(1);
        this.obtenerAreas();
        this.getAllGruposOcupacionales();
        // this.ngAfterViewInit();
    }

    private isInvalid(_ngForm: any): boolean {
        return isInvalid(_ngForm);
    }
    private limpiarform() {
        this.requestParam.idArea = null;
        this.requestParam.idEspecialidad = null;
        this.requestParam.idActividad = null;
        this.requestParam.idGrupoOcupacional = null;


    }

    public insertar(insertActuAreaxEspecialidadxActividadxGrupoOcupacional) {
        console.log(this.requestParam);
        this.requestParam = {
            ...this.requestParam
        }
        this._areaEspecActGrpOcupService.insertAreaEspActGrpOcp(this.requestParam)
            .subscribe(data => {
                // console.log(data.estado);
                if (data.estado == 1) {
                    this.toastr.success("Se inserto Correctamente");
                    insertActuAreaxEspecialidadxActividadxGrupoOcupacional.resetForm();
                    this.limpiarform();
                    this.obtenerAreaXEspecialidadXActividadXGrupoOcupacional(1);
                    this.requestParam.idArea = null;
                    this.requestParam.idEspecialidad = null;
                    this.requestParam.idActividad = null;
                    this.ls_Especialidades = [];
                    this.ls_Actividades = [];
                }
                else {
                    this.toastr.error(data.mensaje);
                }
            },
                err => { console.error(err) });
    }

    eliminarAreaEspecialidadActividadGrupoOcupacionalModal(areaEspActGr) {
        const dialogRef = this.dialog.open(EliminarAeagpComponent, {
            autoFocus: false,
            hasBackdrop: true,
            // maxWidth: '50%',
            // height: '30%',
            disableClose: true
        });
        dialogRef.componentInstance.idArea = areaEspActGr.idArea;
        dialogRef.componentInstance.idEspecialidad = areaEspActGr.idEspecialidad;
        dialogRef.componentInstance.idActividad = areaEspActGr.idActividad;
        dialogRef.componentInstance.idGrupoOcupacional = areaEspActGr.idGrupoOcupacional;

        dialogRef.afterClosed().subscribe(result => {
            if (result == 1) {
                this.obtenerAreaXEspecialidadXActividadXGrupoOcupacional(1);
            }

        });
    }


    //Funciones
    private pageEvent($event: any) {
        this.pagination.nuPagina = $event.pageIndex + 1;
        this.pageSize = $event.pageSize;
        this.obtenerAreaXEspecialidadXActividadXGrupoOcupacional();
        // this.limpiarform();
    }
    //Funciones Para el obtener

    private obtenerAreaXEspecialidadXActividadXGrupoOcupacional(numPagina?: number, formulario?: NgForm) {

        this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
        // this.paramBusqueda.nuPagina = this.pagination.nuPagina;
        // this.paramBusqueda.nuRegiMostrar = this.pageSize;
        Object.keys(this.requestParam).forEach(key => {
            this.requestParam[key] = (this.requestParam[key] === '') ? null : this.requestParam[key];
        });
        this.requestParam = {
            ...this.requestParam,
            ...this.pagination,
            nuRegisMostrar: this.pageSize
        };
        console.log(this.requestParam)
        this._areaEspecActGrpOcupService.obtenerAreaXEspecialidadXActividadXGrupoOcupacional(this.requestParam)
            .subscribe(data => {
                console.log(data);
                if (data.estado == 1) {

                    this.areaEspActGruList = data.areaEspecialidadActividadGrupoOcupacional;

                    console.log(this.areaEspActGruList);

                    this.dataSource = new MatTableDataSource(this.areaEspActGruList);


                    if (this.matPag) {
                        this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
                    }
                    if (this.areaEspActGruList.length > 0) {
                        this.pagination.nuRegisMostrar = this.areaEspActGruList[0].nuTotalReg;
                    }

                    //    formulario.resetForm();
                }
                else if (data.estado == 0) {
                    this.toastr.error("No se encontro ningun dato relacionado");
                    this.areaEspActGruList = [];
                    this.requestParam.idArea = null;
                    this.requestParam.idEspecialidad = null;
                    this.requestParam.idActividad = null;
                    this.ls_Especialidades = [];
                    this.ls_Actividades = [];
                }
                else {
                    this.toastr.error("No se encontro ningun dato relacionado");
                    this.areaEspActGruList = [];
                }
                return true;

            },
                err => { console.error(err) },
                () => {
                });
        //this.limpiarform();
    }

    public obtenerAreas() {

        //this.variableGrupoOcupacional = true;
        this._areaEspecActGrpOcupService.obtenerAreas().subscribe(data => {
            if (data.estado == 1) {
                this.areas = data.areaList;
                console.log(this.areas);
            } else {
                this.toastr.error(data.mensaje);
                this.variableGrupoOcupacional = true;
            }
            return true;
        },
            error => {
                console.error(error);
                return Observable.throw(error);
                //this.limpiarform();
            }
        ),
            err => console.error(err),
            () => console.log('Request Complete');
    }

    private getAllEspecialidades() {
        // this.parabusEspecialidad.idArea = this.requestParam.idArea;
        // console.log(this.parabusEspecialidad);
        this.requestParam.idEspecialidad = null;
        this.requestParam.idActividad = null;
        //this.requestParam.idGrupoOcupacional = null;
        if (this.requestParam.idArea == null) {
            this.variableEspecialidad = true;
            this.variableActividad = true;
            this.variableGrupoOcupacional = true;
            return;
        } else {
            // this.ls_Actividades=[];
            // this.ls_GruposOcupacionales=[];
            // this.requestParam.idActividad = null;
            // this.requestParam.idGrupoOcupacional = null;
            // this.requestParam.idEspecialidad = null;
            let param = { idArea: this.requestParam.idArea };
            this._areaEspecActGrpOcupService.getEspecialidadesxArea(param)
                .subscribe(data => {
                    if (data.estado == 1) {
                        this.ls_Especialidades = data.areaEspecialidadList;
                        console.log(this.ls_Especialidades);
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
            this.variableEspecialidad = false;
        }
        // this.limpiarform();
        //  this.variableArea = false;

        this.variableArea = false;
    }

    private getAllActividades() {
        // this.parabusActividad.idEspecialidad = this.paramBusqueda.idEspecialidad;
        // this.ls_GruposOcupacionales = [];
        this.requestParam.idActividad = null;

        //this.requestParam.idEspecialidad = null;
        if (this.requestParam.idEspecialidad == null) {
            //this.variableGrupoOcupacional = true;
            this.variableActividad = true;
            return;
        } else {
            let parametros = { idArea: this.requestParam.idArea, idEspecialidad: this.requestParam.idEspecialidad };
            console.log(parametros);
            this._areaEspecActGrpOcupService.getAreaEspAct(parametros)
                .subscribe(data => {
                    if (data.estado == 1) {
                        this.ls_Actividades = data.areaEspecialidadActividadList;
                        console.log(this.ls_Actividades);
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
            this.variableActividad = false;
        }
        // this.limpiarform();
        // this.variableGrupoOcupacional = true;

        this.variableArea = false;
    }


    private getAllGruposOcupacionales() {
        this._areaEspecActGrpOcupService.getAreaEspActGrup(this.requestParam)
            .subscribe(data => {
                if (data.estado == 1) {
                    this.ls_GruposOcupacionales = data.grupoOcupacionalList;
                    console.log(this.ls_GruposOcupacionales);
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
        this.variableGrupoOcupacional = false;

        this.variableArea = false;
    }


}
