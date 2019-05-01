import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { Component, Input, OnInit, NgModule } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TreeTableModule } from "ng-treetable";
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
    setQuantifier, setValidatorPattern,
    setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrls: ['./nuevo-usuario.component.scss'],
    providers: [UsuarioService]
})

export class NuevoUsuarioComponent implements OnInit {
    @Input() idUsuario;
    @Input() flgHizoAlgo;

    private tipoDoc: any[] = [];
    private roles: any[] = [];
    private personales: any[] = [];
    private usuarioConRoles: any[] = [];
    private stringIdRol: string[] = [];
    private RolPorUsuarioRequest: any[] = [];
    private UsuarioActualizado: any[] = [];
    private id: number = null;
    private flagidusuario: boolean = true;
    private flgOtrosDatos: number = 0;
    private listPersonal: any[];
    private listPersonalDatos: any[];
    private listArea: any[];
    private listEspecialidad: any[];
    private listAmbiente: any[];
    private paginationParameter = { nuPagina: 1, total_rows: 0 };
    private paginationParemeterAcargo = {

    };

    private PersonalRequest = {
        personal: {
            idPersonal: null,
            tipoDocumentoIdentidad: null,
            numeroDocumentoIdentidad: null,
            nombre: null,
            apellidoPaternoPersonal: null,
            apellidoMaternoPersonal: null,
            // nuPagina: 1,
            // nuRegisMostrar: 5,
            flOperacion: 0
        }
    }

    private UsuarioConRolesRequest = {
        usuario: {
            idUsuario: null,
            idPersonal: null,
            usuarioIns: null,
            idRol: null,
        }
    }

    private UsuarioSeleccionado = {
        usuarioSeleccionadoList: {
            tipoDocumentoIdentidad: 0,
            numeroDocumentoIdentidad: null,
            apellidoPaternoPersonal: null,
            apellidoMaternoPersonal: null,
            nombre: null,
            descripcionEspecialidad: null,
            areas: null,
            actividades: null,
            idUsuario: null
        }
    }

    private UsuarioRequest = {
        usuario: {
            idTipoDocumento: null,
            numeroDocumentoIdentidad: null,
            apellidoPaternoPersonal: null,
            apellidoMaternoPersonal: null,
            nombrePersonal: null,
            nuPagina: 1,
            nuRegisMostrar: 10
        }
    }

    private UsuarioActualizadoRequest = {
        usuario: {
            idUsuario: null,
            usuarioMod: null,
            idRol: null
        }
    }

    private tablitaDeMierda: any[] = [{
        descripcionArea: null,
        cantEspecialidad: null,
        listEspecialidad: [{
            cantActividad: null,
            descripcionEspecialidad: null,
            listActividad: [{ descripcionActividad: null }]
        }]
    }];
    private requestUsuario: any = {
        flgOperacion: null,
        flgOperacionIpress: null,
        usuario: {
            idPersonal: null,
            idUsuario: null,
            contrasena: null
        }
    };

    private flgBotonGenerar: boolean = false;
    private flgBotonAsignar: boolean = false;
    private visitionRol: boolean = false;
    private comboRol: String = null;
    private combinacion: Number = null;

    private comboArea: String = null;
    private comboEspecialidad: String = null;
    private comboAmbiente: String = null;

    private visibleListArea: boolean = false;
    private visibleListEspecialidad: boolean = false;
    private visibleListAmbiente: boolean = false;
    private listAcargo: any[];
    private flgVisitionRol: boolean = false;
    private flgVisitionTablaAcargo: boolean = false;
    private flgRolesBloque: boolean = true;
    private flgAgregarButton: boolean = true;

    private AcargoUsuarioRequest: any = {
        idUsuario: null,
        idRol: null,
        idArea: null,
        idEspecialidad: null,
        idAmbiente: null
    };

    private eliminarAcargoRequest: any = {
        idUsuario: null,
        idRol: null,
        idArea: null,
        idEspecialidad: null,
        idAmbiente: null
    }
    private longitudDocumento = "?";
    dataSource = new MatTableDataSource();
    private displayedColumnsUsuarios = ['num', 'tipoDoc', 'numDoc', 'apePaterno', 'apeMaterno', 'nombres', 'sexo'];
    private displayedSizes: number[];
    private pageSize;
    private longitud = 0;
    private pagination: any;
    private highlightedRows = [];

    dataSource2 = new MatTableDataSource();
    private displayedCargos = ['num', 'rol', 'area', 'especialidad', 'ambiente', 'eliminar'];
    private displayedSizes2: number[];
    private pageSize2;
    private longitud2 = 0;
    private pagination2: any;

    constructor(
        // public activeModal: NgbActiveModal,
        private _usuarioService: UsuarioService,
        private toastr: ToastsManager,
        public dialogRef: MatDialogRef<NuevoUsuarioComponent>
    ) {
        this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
        this.displayedSizes = [5, 10, 25, 100];
        this.pageSize = this.displayedSizes[0];

        this.pagination2 = { nuPagina: 1, nuRegisMostrar: 0 };
        this.displayedSizes2 = [5, 10, 25, 100];
        this.pageSize2 = this.displayedSizes2[0];
    }

    private changeInput(tipoDoc) {
        if (tipoDoc == null || tipoDoc == undefined) {
            this.longitudDocumento = "?";
            this.PersonalRequest.personal.tipoDocumentoIdentidad = null;
        }
        if (tipoDoc == 1) {
            this.longitudDocumento = '8';
        }
        if (tipoDoc == 2) {
            this.longitudDocumento = '12';
        }
        if (tipoDoc == 3) {
            this.longitudDocumento = '12';
        }
        if (tipoDoc == 4) {
            this.longitudDocumento = '15';
        }
    }
    private getAllTipoDocumento() {
        this._usuarioService.getTipoDocumento()
            .subscribe(data => {
                if (data.estado == 1) {
                    this.tipoDoc = data.tipoDocumentoList;

                } else if (data.estado == 0) {
                    this.toastr.error(data.mensaje);
                }
                else if (data.estado == -1) {
                    this.toastr.error(data.mensaje);
                }
                return true;
            },
                error => {
                    console.error(error);
                });
    }

    private pageEvent($event) {
        this.pagination.nuPagina = $event.pageIndex + 1;
        this.pageSize = $event.pageSize;
        this.PersonalRequest.personal.idPersonal = null;
        this.getAllPersonal(0);
    }
    private getAllPersonal(indicador: number, numPagina?: number) {
        this.flagidusuario = true;
        this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
        Object.keys(this.PersonalRequest.personal).forEach(key => {
            this.PersonalRequest.personal[key] = (this.PersonalRequest.personal[key] === '') ? null : this.PersonalRequest.personal[key];
        });
        this.PersonalRequest.personal = {
            ...this.PersonalRequest.personal,
            ...this.pagination,
            nuRegisMostrar: this.pageSize
        };
        if (indicador == 1) {
            this.PersonalRequest.personal["nuPagina"] = 1;
        }
        console.log(this.PersonalRequest.personal)
        this._usuarioService.getPersonalesByUsuario(this.PersonalRequest.personal)
            .subscribe(data => {
                if (data.estado == 1) {
                    if (indicador == 0) {
                        this.listPersonal = data.personalList;
                        this.dataSource = new MatTableDataSource(this.listPersonal);

                        if (this.listPersonal != null || this.listPersonal != undefined) {
                            if (this.listPersonal.length > 0) {
                                this.paginationParameter.total_rows = this.listPersonal[0].nuTotalReg;
                            }
                            this.longitud = this.listPersonal[0].nuTotalReg;
                        }
                    } else {
                        this.flgVisitionRol = false;
                        this.listPersonalDatos = [];
                        this.flgRolesBloque = true;
                        this.listPersonalDatos = data.personalList;
                        console.log(this.listPersonalDatos)
                        this.tablitaDeMierda = [{
                            descripcionArea: null,
                            cantEspecialidad: null,
                            listEspecialidad: [{
                                cantActividad: null,
                                descripcionEspecialidad: null,
                                listActividad: [{ descripcionActividad: null }]
                            }]
                        }];
                        if (this.listPersonalDatos[0].listArea != undefined) {
                            this.tablitaDeMierda = this.listPersonalDatos[0].listArea;
                        }

                        if (this.listPersonalDatos[0].idUsuario != undefined) {
                            this.flgBotonGenerar = false;
                            if (this.id != undefined) {
                                this.flgBotonAsignar = false;
                            } else {
                                this.flgBotonAsignar = true;
                            }
                            this.requestUsuario.usuario.idUsuario = this.listPersonalDatos[0].idUsuario;
                            this.getAllRoles();
                            this.getListAcargoUsuario(1);
                            if (this.id != undefined) {
                                this.flgRolesBloque = false;
                            }
                        } else {
                            this.flgBotonGenerar = true;
                            this.requestUsuario.usuario.idUsuario = "Usuario";
                        }
                        this.requestUsuario.usuario.contrasena = "Contraseña";
                    }
                    this.PersonalRequest.personal.idPersonal = null;
                    this.flgVisitionTablaAcargo = false;
                }
                else if (data.estado == 0) {
                    this.toastr.error(data.mensaje);
                }
                return true;
            },
                error => {
                    console.error("Error");
                    return Observable.throw(error);
                }),
            err => console.error(err),
            () => console.log('Request Complete');
    }

    // changePage(pagina) {
    //     this.PersonalRequest.personal.nuPagina = pagina;
    //     this.getAllPersonal(0);
    //     this.PersonalRequest.personal.nuPagina = 1;
    // }

    choosePersonal(index) {
        this.highlightedRows = [];
        this.highlightedRows.push(index)

        this.flgOtrosDatos = 1;
        this.visitionRol = false;
        this.flgRolesBloque == true;
        for (let a of this.listPersonal) {
            // a.color = "";
            if (a.rowIndex == index) {
                this.PersonalRequest.personal.idPersonal = a.idPersonal;
                // a.color = "btn-primary";
                this.getAllPersonal(1);
            }
        }
    }

    buildUsuario(nom1: String, ape1: String, ape2: String) {
        var part1 = nom1.substring(0, 3);
        var part2 = "";
        var part3 = "";

        for (var x = 0; x < 2; x++) {
            part2 += ape1.substr(Math.floor(Math.random() * ape1.length), 1);
            part3 += ape2.substr(Math.floor(Math.random() * ape2.length), 1);
        }
        this.requestUsuario.usuario.idUsuario = part1 + part2 + part3 + "@t-integro.com";
        this.requestUsuario.flgOperacion = 0;
        this.requestUsuario.flgOperacionIpress = 0;
        this.requestUsuario.usuario.idPersonal = this.listPersonalDatos[0].idPersonal;
        // se manda la clave hardcodeada por motivos que es un nuevo ususario para el oauth
        // this.requestUsuario.usuario.passwordUsuario = '123';
        this.requestUsuario.usuario.nombre = this.listPersonalDatos[0].nombre;
        this.requestUsuario.usuario.apellidoPaternoPersonal = this.listPersonalDatos[0].apellidoPaternoPersonal + " " + this.listPersonalDatos[0].apellidoMaternoPersonal;
        this.requestUsuario.usuario.email = this.listPersonalDatos[0].email;

        let promise = new Promise((resolve, reject) => {
            this._usuarioService.getValidacionPutContraseña(this.requestUsuario)
                .subscribe(data => {
                    if (data.confirmaracion.id == 1) {
                        this.flgHizoAlgo[0] = 1;
                        this.toastr.success(data.confirmaracion.mensaje, "Gestionar Usuario");
                        this.flgBotonGenerar = false;
                        this.flgBotonAsignar = false;
                        this.requestUsuario.usuario.contrasena = '123';
                        this.PersonalRequest.personal.idPersonal = null;
                        this.PersonalRequest.personal.tipoDocumentoIdentidad = null;
                        this.PersonalRequest.personal.numeroDocumentoIdentidad = null;
                        this.PersonalRequest.personal.nombre = null;
                        this.PersonalRequest.personal.apellidoPaternoPersonal = null;
                        this.PersonalRequest.personal.apellidoMaternoPersonal = null;
                        // this.PersonalRequest.personal.nuPagina = 1;
                        // this.PersonalRequest.personal.nuRegisMostrar = 5;
                        this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
                        this.pageSize = this.displayedSizes[0];
                        this.PersonalRequest.personal.flOperacion = 0;
                        this.flgRolesBloque = false;
                        this.getAllPersonal(0);
                        this.getAllRoles();
                        console.log(this.requestUsuario);
                    } else if (data.confirmaracion.id == 0) {
                        this.toastr.warning(data.confirmaracion.mensaje, "Gestionar Usuario");
                        this.requestUsuario.usuario.idUsuario = "Usuario";
                        this.requestUsuario.usuario.contrasena = 'Contraseña';
                    }
                    return true;
                },
                    error => {
                        console.error(error);
                    });
        })

        return promise;
    }
    private asignarUsuarioIpress() {

        this.requestUsuario.flgOperacion = 0;
        this.requestUsuario.flgOperacionIpress = 1;
        this.requestUsuario.usuario.nombre = this.listPersonalDatos[0].nombre;
        this.requestUsuario.usuario.apellidoPaternoPersonal = this.listPersonalDatos[0].apellidoPaternoPersonal + " " + this.listPersonalDatos[0].apellidoMaternoPersonal;
        this.requestUsuario.usuario.email = this.listPersonalDatos[0].email;
        let promise = new Promise((resolve, reject) => {

            this._usuarioService.getValidacionPutContraseña(this.requestUsuario)
                .toPromise().then(data => {

                    if (data.confirmaracion.id == 1) {
                        this.flgHizoAlgo[0] = 1;
                        this.toastr.success(data.confirmaracion.mensaje, "Gestionar Usuario");
                        this.flgBotonGenerar = false;
                        this.flgBotonAsignar = false;
                        this.PersonalRequest.personal.idPersonal = null;
                        this.PersonalRequest.personal.tipoDocumentoIdentidad = null;
                        this.PersonalRequest.personal.numeroDocumentoIdentidad = null;
                        this.PersonalRequest.personal.nombre = null;
                        this.PersonalRequest.personal.apellidoPaternoPersonal = null;
                        this.PersonalRequest.personal.apellidoMaternoPersonal = null;
                        // this.PersonalRequest.personal.nuPagina = 1;
                        // this.PersonalRequest.personal.nuRegisMostrar = 5;
                        this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
                        this.pageSize = this.displayedSizes[0];
                        this.PersonalRequest.personal.flOperacion = 0;
                        this.flgRolesBloque = false;
                        this.getAllPersonal(0);
                        this.getAllRoles();
                    } else if (data.confirmaracion.id == 0) {
                        this.toastr.warning(data.confirmaracion.mensaje, "Gestionar Usuario");
                    }
                    return true;
                },
                    error => {
                        console.error(error);
                    });
        })

        return promise;
    }

    // private resetearClave(){
    //     this.requestUsuario.flgOperacion = 1;
    //     this.requestUsuario.flgOperacionIpress = 0;
    //     this.requestUsuario.usuario.idPersonal = this.listPersonalDatos[0].idPersonal;

    //     this._usuarioService.getValidacionPutContraseña(this.requestUsuario)
    //     .subscribe(data =>{
    //         if (data.confirmaracion.id == 1) {
    //             this.toastr.success(data.confirmaracion.mensaje, "Gestionar Usuario");
    //             this.requestUsuario.usuario.contrasena = '123';
    //         } else if (data.confirmaracion.id == 0) {
    //             this.toastr.warning(data.confirmaracion.mensaje, "Gestionar Usuario");
    //         }
    //         return true;
    //     },
    //     error => {
    //         console.error(error);
    //     });
    // }

    private getAllRoles() {
        console.log(this.flgRolesBloque);
        this._usuarioService.getRolGrupoOcupacional(this.listPersonalDatos[0].idPersonal)
            .subscribe(data => {

                if (data.estado == 1) {
                    this.roles = data.listRol;
                    console.log(this.roles);
                    if (this.roles.length != 0) {
                        if (this.flgRolesBloque == false) {
                            this.flgVisitionRol = true;
                        } else if (this.flgRolesBloque == true) {
                            this.flgVisitionRol = false;
                        }
                    }
                } else {
                    this.comboRol = null;
                }
                return true;

            },
                error => {
                    console.error(error);
                });
    }

    private buildComboOcupacion() {
        if (this.comboRol == "null") {
            this.listArea = null;
            this.listEspecialidad = null;
            this.listAmbiente = null;
            this.visibleListArea = false;
            this.visibleListEspecialidad = false;
            this.visibleListAmbiente = false;
            this.combinacion = null;
            this.flgAgregarButton = true;
        } else {
            this.flgAgregarButton = false;
            for (let a of this.roles) {
                if (a.idRol == this.comboRol) {
                    this.combinacion = a.combinacion;
                    if (a.combinacion == undefined) {
                        this.combinacion = 0;
                    }
                    console.log(this.roles)
                    if (this.combinacion == 1 || this.combinacion == 4 || this.combinacion == 5 || this.combinacion == 7) {
                        if (a.listArea != undefined) {
                            this.listArea = a.listArea;
                            this.listEspecialidad = null;
                            this.listAmbiente = null;

                            this.visibleListArea = true;
                            this.visibleListEspecialidad = false;
                            this.visibleListAmbiente = false;
                            if (this.combinacion == 4) {
                                this.visibleListArea = true;
                                this.visibleListEspecialidad = true;
                                this.visibleListAmbiente = false;
                            } else if (this.combinacion == 5) {
                                this.visibleListArea = true;
                                this.visibleListEspecialidad = false;
                                this.visibleListAmbiente = true;
                            } else if (this.combinacion == 7) {
                                this.visibleListArea = true;
                                this.visibleListEspecialidad = true;
                                this.visibleListAmbiente = true;
                            }

                        } else {
                            this.listArea = null;
                            this.listEspecialidad = null;
                            this.listAmbiente = null;
                            this.visibleListArea = false;
                            this.visibleListEspecialidad = false;
                            this.visibleListAmbiente = false;
                        }

                    } else if (this.combinacion == 2 || this.combinacion == 6) {
                        if (a.listEspecialidad != undefined) {
                            this.listEspecialidad = a.listEspecialidad;
                            this.listArea = null;
                            this.listAmbiente = null;

                            this.visibleListEspecialidad = true;
                            this.visibleListArea = false;
                            this.visibleListAmbiente = false;
                            if (this.combinacion == 6) {
                                this.visibleListEspecialidad = true;
                                this.visibleListArea = false;
                                this.visibleListAmbiente = true;
                            }
                        } else {
                            this.listArea = null;
                            this.listEspecialidad = null;
                            this.listAmbiente = null;
                            this.visibleListArea = false;
                            this.visibleListEspecialidad = false;
                            this.visibleListAmbiente = false;
                        }
                    } else if (this.combinacion == 3) {
                        if (a.listAmbiente != undefined) {
                            this.listAmbiente = a.listAmbiente;
                            this.listArea = null;
                            this.listEspecialidad = null;

                            this.visibleListAmbiente = true;
                            this.visibleListArea = false;
                            this.visibleListEspecialidad = false;
                        } else {
                            this.listArea = null;
                            this.listEspecialidad = null;
                            this.listAmbiente = null;
                            this.visibleListArea = false;
                            this.visibleListEspecialidad = false;
                            this.visibleListAmbiente = false;
                        }
                    }
                    this.comboArea = null;
                    this.comboEspecialidad = null;
                    this.comboAmbiente = null;
                }
            }
        }
    }

    private buildforArea() {
        if (this.comboArea == "null") {
            this.listEspecialidad = null;
            this.listAmbiente = null;
        } else {
            for (let a of this.listArea) {
                if (a.idArea == this.comboArea) {
                    if (this.combinacion == 4 || this.combinacion == 7) {
                        this.listEspecialidad = a.listEspecialidad;
                        this.listAmbiente = null;

                        this.visibleListEspecialidad = true;
                        this.visibleListAmbiente = false;
                        if (this.combinacion == 7) {
                            this.visibleListEspecialidad = true;
                            this.visibleListAmbiente = true;
                        }
                    } else if (this.combinacion == 5) {
                        this.listEspecialidad = null;
                        this.listAmbiente = a.listAmbiente;

                        this.visibleListEspecialidad = false;
                        this.visibleListAmbiente = true;
                    }
                    this.comboEspecialidad = null;
                    this.comboAmbiente = null;
                }
            }
        }
    }

    private buildforEspecialidad() {
        if (this.comboEspecialidad == "null") {
            this.listAmbiente = null;
        } else {
            for (let a of this.listEspecialidad) {
                if (a.idEspecialidad == this.comboEspecialidad) {
                    if (this.combinacion == 6 || this.combinacion == 7) {
                        this.listAmbiente = a.listAmbiente;
                        this.visibleListAmbiente = true;
                    }
                    this.comboAmbiente = null;
                }
            }
        }
    }

    private agregarThreeOfActividades() {

        // console.log(this.comboArea);
        // console.log(this.comboEspecialidad);
        // console.log(this.comboAmbiente);

        // console.log(this.listAcargo);

        let promise = new Promise((resolve, reject) => {
            if (this.combinacion == 1) {
                if (this.comboArea == null || this.comboArea == "null") {
                    this.toastr.warning("debe seleccionar un area", "Usuario");
                    return;
                }
            } else if (this.combinacion == 2) {
                if (this.comboEspecialidad == null || this.comboEspecialidad == "null") {
                    this.toastr.warning("debe seleccionar un especialidad", "Usuario");
                    return;
                }
            } else if (this.combinacion == 3) {
                if (this.comboAmbiente == null || this.comboAmbiente == "null") {
                    this.toastr.warning("debe seleccionar un ambiente", "Usuario");
                    return;
                }
            } else if (this.combinacion == 4) {
                if (this.comboArea == null || this.comboEspecialidad == null || this.comboArea == "null" || this.comboEspecialidad == "null") {
                    this.toastr.warning("debe seleccionar un area y especialidad", "Usuario");
                    return;
                }
            } else if (this.combinacion == 5) {
                if (this.comboArea == null || this.comboAmbiente == null || this.comboArea == "null" || this.comboAmbiente == "null") {
                    this.toastr.warning("debe seleccionar un area y ambiente", "Usuario");
                    return;
                }
            } else if (this.combinacion == 6) {
                if (this.comboEspecialidad == null || this.comboAmbiente == null || this.comboEspecialidad == "null" || this.comboAmbiente == "null") {
                    this.toastr.warning("debe seleccionar un especialidad y ambiente", "Usuario");
                    return;
                }
            } else if (this.combinacion == 7) {
                if (this.comboArea == null || this.comboEspecialidad == null || this.comboAmbiente == null || this.comboArea == "null" || this.comboEspecialidad == "null" || this.comboAmbiente == "null") {
                    this.toastr.warning("debe seleccionar un area, especialidad y ambiente", "Usuario");
                    return;
                }
            }

            console.log(this.listAcargo);
            if (this.listAcargo == undefined) {
                this.listAcargo = [];
            }
            if (this.listAcargo.length != 0) {
                for (let a of this.listAcargo) {
                    if (a.rol.id == this.comboRol) {
                        if (this.combinacion == 0) {
                            if (a.area.id == 0 && a.especialidad.id == 0 && a.ambiente.id == 0) {
                                this.toastr.error("No se puede registrar un rol ya existente", "Usuario");
                                return;
                            }
                        }
                        if (this.combinacion == 1) {
                            if (a.area.id == this.comboArea && a.especialidad.id == 0 && a.ambiente.id == 0) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 2) {
                            if (a.area.id == 0 && a.especialidad.id == this.comboEspecialidad && a.ambiente.id == 0) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 3) {
                            if (a.area.id == 0 && a.especialidad.id == 0 && a.ambiente.id == this.comboAmbiente) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 4) {
                            if (a.area.id == this.comboArea && a.especialidad.id == this.comboEspecialidad && a.ambiente.id == 0) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 5) {
                            if (a.area.id == this.comboArea && a.especialidad.id == 0 && a.ambiente.id == this.comboAmbiente) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 6) {
                            if (a.area.id == 0 && a.especialidad.id == this.comboEspecialidad && a.ambiente.id == this.comboAmbiente) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        } else if (this.combinacion == 7) {
                            if (a.area.id == this.comboArea && a.especialidad.id == this.comboEspecialidad && a.ambiente.id == this.comboAmbiente) {
                                this.toastr.error("No se puede registrar un combinacion de rol ya existente", "Usuario");
                                return;
                            }
                        }
                    }
                }
            }
            console.log(this.requestUsuario.usuario.idUsuario);
            console.log(this.listPersonalDatos[0].idUsuario);
            if (this.requestUsuario.usuario.idUsuario) {
                this.AcargoUsuarioRequest.idUsuario = this.requestUsuario.usuario.idUsuario;
            } else {
                this.AcargoUsuarioRequest.idUsuario = this.listPersonalDatos[0].idUsuario;
            }
            this.AcargoUsuarioRequest.idRol = this.comboRol;
            this.AcargoUsuarioRequest.idArea = this.comboArea;
            this.AcargoUsuarioRequest.idEspecialidad = this.comboEspecialidad;
            this.AcargoUsuarioRequest.idAmbiente = this.comboAmbiente;

            console.log(this.AcargoUsuarioRequest);
            this._usuarioService.insertarAcargoUsuario(this.AcargoUsuarioRequest)
                .toPromise().then(data => {
                    if (data.estado == 1) {
                        this.flgHizoAlgo[0] = 1;
                        this.toastr.success(data.mensaje, "Usuario");
                        this.AcargoUsuarioRequest.idUsuario = null;
                        this.AcargoUsuarioRequest.idRol = null;
                        this.AcargoUsuarioRequest.idArea = null;
                        this.AcargoUsuarioRequest.idEspecialidad = null;
                        this.AcargoUsuarioRequest.idAmbiente = null;

                        if (this.combinacion == 1) {
                            let index = 0;
                            for (let a of this.listArea) {
                                if (a.idArea == this.comboArea) {
                                    this.listArea.splice(index, 1);
                                    this.comboArea = null;
                                }
                                index++;
                            }
                        } else if (this.combinacion == 2) {
                            let index = 0;
                            for (let a of this.listEspecialidad) {
                                if (a.idEspecialidad == this.comboEspecialidad) {
                                    this.listEspecialidad.splice(index, 1);
                                    this.comboEspecialidad = null;
                                }
                                index++;
                            }
                        } else if (this.combinacion == 3) {
                            let index = 0;
                            for (let a of this.listAmbiente) {
                                if (a.idAmbiente == this.comboAmbiente) {
                                    this.listAmbiente.splice(index, 1);
                                    this.comboAmbiente = null;
                                }
                                index++;
                            }
                        } else if (this.combinacion == 4) {
                            let index = 0;
                            for (let a of this.listEspecialidad) {
                                if (a.idEspecialidad == this.comboEspecialidad) {
                                    this.listEspecialidad.splice(index, 1);
                                    this.comboEspecialidad = null;
                                    if (this.listEspecialidad.length == 0) {
                                        let index2 = 0;
                                        for (let b of this.listArea) {
                                            if (b.idArea == this.comboArea) {
                                                this.listArea.splice(index2, 1);
                                                this.comboArea = null;
                                                this.listEspecialidad = null;
                                            }
                                            index2++;
                                        }
                                    }
                                }
                                index++;
                            }
                        } else if (this.combinacion == 5) {
                            let index = 0;
                            for (let a of this.listAmbiente) {
                                if (a.idAmbiente == this.comboAmbiente) {
                                    this.listAmbiente.splice(index, 1);
                                    this.comboAmbiente = null;
                                    if (this.listAmbiente.length == 0) {
                                        let index2 = 0;
                                        for (let b of this.listArea) {
                                            if (b.idArea == this.comboArea) {
                                                this.listArea.splice(index2, 1);
                                                this.comboArea = null;
                                                this.listAmbiente = null;
                                            }
                                            index2++;
                                        }
                                    }
                                }
                                index++;
                            }
                        } else if (this.combinacion == 6) {
                            let index = 0;
                            for (let a of this.listAmbiente) {
                                if (a.idAmbiente == this.comboAmbiente) {
                                    this.listAmbiente.splice(index, 1);
                                    this.comboAmbiente = null;
                                    if (this.listAmbiente.length == 0) {
                                        let index2 = 0;
                                        for (let b of this.listEspecialidad) {
                                            if (b.idEspecialidad == this.comboEspecialidad) {
                                                this.listEspecialidad.splice(index2, 1);
                                                this.comboEspecialidad = null;
                                                this.listAmbiente = null;
                                            }
                                            index2++;
                                        }
                                    }
                                }
                                index++;
                            }
                        } else if (this.combinacion == 7) {
                            let index = 0;
                            for (let a of this.listAmbiente) {
                                if (a.idAmbiente == this.comboAmbiente) {
                                    this.listAmbiente.splice(index, 1);
                                    this.comboAmbiente = null;
                                    if (this.listAmbiente.length == 0) {
                                        let index2 = 0;
                                        for (let b of this.listEspecialidad) {
                                            if (b.idEspecialidad == this.comboEspecialidad) {
                                                this.listEspecialidad.splice(index2, 1);
                                                this.comboEspecialidad = null;
                                                this.listAmbiente = null;
                                                if (this.listEspecialidad.length == 0) {
                                                    let index3 = 0;
                                                    for (let c of this.listArea) {
                                                        if (c.idArea == this.comboArea) {
                                                            this.listArea.splice(index3, 1);
                                                            this.comboArea = null;
                                                            this.listEspecialidad = null;
                                                        }
                                                        index3++;
                                                    }
                                                }
                                            }
                                            index2++;
                                        }
                                    }
                                }
                                index++;
                            }
                        }
                        this.getListAcargoUsuario(1);
                    } else {

                    }
                    return true;
                },
                    error => {
                        console.error(error);
                    });
        })
        return promise;
    }

    private pageEvent2($event) {
        this.pagination2.nuPagina = $event.pageIndex + 1;
        this.pageSize2 = $event.pageSize;
        this.getListAcargoUsuario();
    }
    private getListAcargoUsuario(numPagina?: number) {
        let idUsuarioRequest: string;
        if (this.id != undefined) {
            idUsuarioRequest = this.listPersonalDatos[0].idUsuario;
        } else {
            if (this.listPersonalDatos[0].idUsuario != undefined) {
                idUsuarioRequest = this.listPersonalDatos[0].idUsuario;
            } else {
                idUsuarioRequest = this.requestUsuario.usuario.idUsuario;
            }
        }
        this.pagination2.nuPagina = (numPagina) ? numPagina : this.pagination2.nuPagina;
        Object.keys(this.paginationParemeterAcargo).forEach(key => {
            this.paginationParemeterAcargo[key] = (this.paginationParemeterAcargo[key] === '') ? null : this.paginationParemeterAcargo[key];
        });
        this.paginationParemeterAcargo = {
            ...this.paginationParemeterAcargo,
            ...this.pagination2,
            nuRegisMostrar: this.pageSize2
        };

        this._usuarioService.getAcargoUsuario(idUsuarioRequest, this.paginationParemeterAcargo)
            .subscribe(data => {

                if (data.estado == 1) {
                    this.listAcargo = data.listAcargos;
                    this.dataSource2 = new MatTableDataSource(this.listAcargo);
                    if (this.listAcargo.length != 0) {
                        this.flgVisitionTablaAcargo = true;
                        // this.paginationParemeterAcargo.total_rows = this.listAcargo[0].numTotalReg;
                        this.longitud2 = this.listAcargo[0].numTotalReg;
                    } else {
                        this.flgVisitionTablaAcargo = false;
                    }
                } else {

                }
                return true;
            },
                error => {
                    this.toastr.error('Error al Guardar', 'Usuario');
                    return Observable.throw(error);

                })
    }

    // private changePageAcargo(pagina) {
    //     this.paginationParemeterAcargo.nuPagina = pagina;
    //     this.getListAcargoUsuario();
    //     this.paginationParemeterAcargo.nuPagina = 1;
    // }

    private deleteAcargoUsuario(request) {

        this.eliminarAcargoRequest.idUsuario = this.requestUsuario.usuario.idUsuario;
        this.eliminarAcargoRequest.idRol = request.rol.id;
        this.eliminarAcargoRequest.idArea = request.area.id;
        this.eliminarAcargoRequest.idEspecialidad = request.especialidad.id;
        this.eliminarAcargoRequest.idAmbiente = request.ambiente.id;

        let requestArea: any = {
            "descripcionArea": null,
            "idArea": null
            // ,
            // "listAmbiente":[],
            // "listEspecialidad":[],
        }
        let requestEspecialidad: any = {
            "descripcionEspecialidad": null,
            "idEspecialidad": null
            // ,
            // "listAmbiente":[]
        }
        let requestAmbiente: any = {
            "descripcionAmbiente": null,
            "idAmbiente": null
        }


        let promise = new Promise((resolve, reject) => {
            this._usuarioService.eliminarAcargoUsuario(this.eliminarAcargoRequest)
                .toPromise().then(data => {
                    if (data.estado == 1) {
                        this.flgHizoAlgo[0] = 1;
                        // -----------------------------------------------------------------------------------
                        for (let a of this.roles) {
                            if (a.idRol == request.rol.id) {
                                if (request.area.id != 0 && request.especialidad.id == 0 && request.ambiente.id == 0) {
                                    if (a.listArea == undefined || a.listArea == null) {
                                        a.listArea = [];
                                    }
                                    requestArea.descripcionArea = request.area.valor;
                                    requestArea.idArea = request.area.id;

                                    a.listArea.splice(a.listArea.length, 0, requestArea);

                                    this.listEspecialidad = null;
                                    this.listAmbiente = null;
                                } else if (request.area.id == 0 && request.especialidad.id != 0 && request.ambiente.id == 0) {
                                    if (a.listEspecialidad == undefined || a.listEspecialidad == null) {
                                        a.listEspecialidad = [];
                                    }
                                    requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                    requestEspecialidad.idEspecialidad = request.especialidad.id;

                                    a.listEspecialidad.splice(a.listEspecialidad.length, 0, requestEspecialidad);

                                    this.listArea = null;
                                    this.listAmbiente = null;
                                } else if (request.area.id == 0 && request.especialidad.id == 0 && request.ambiente.id != 0) {
                                    if (a.listAmbiente == undefined || a.listAmbiente == null) {
                                        a.listAmbiente = [];
                                    }
                                    requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                    requestAmbiente.idAmbiente = request.ambiente.id;

                                    a.listAmbiente.splice(a.listAmbiente.length, 0, requestAmbiente);

                                    this.listArea = null;
                                    this.listEspecialidad = null;
                                } else if (request.area.id != 0 && request.especialidad.id != 0 && request.ambiente.id == 0) {
                                    let exist4 = 0;
                                    if (a.listArea != undefined || a.listArea != null) {
                                        for (let a5 of a.listArea) {
                                            if (a5.idArea == request.area.id) {
                                                exist4 = 1;
                                            }
                                        }
                                    }

                                    if (exist4 == 1) {
                                        for (let b4 of a.listArea) {
                                            if (b4.idArea == request.area.id) {
                                                requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                                requestEspecialidad.idEspecialidad = request.especialidad.id;

                                                if (b4.listEspecialidad == undefined || b4.listEspecialidad == null) {
                                                    b4.listEspecialidad = [];
                                                }

                                                b4.listEspecialidad.splice(b4.listEspecialidad.length, 0, requestEspecialidad);
                                            }
                                        }
                                    } else {
                                        requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                        requestEspecialidad.idEspecialidad = request.especialidad.id;

                                        requestArea.descripcionArea = request.area.valor;
                                        requestArea.idArea = request.area.id;
                                        requestArea.listEspecialidad = [];
                                        requestArea.listEspecialidad.splice(requestArea.listEspecialidad.length, 0, requestEspecialidad);

                                        if (a.listArea == undefined || a.listArea == null) {
                                            a.listArea = [];
                                        }

                                        a.listArea.splice(a.listArea.length, 0, requestArea);
                                    }

                                    this.listAmbiente = null;
                                } else if (request.area.id != 0 && request.especialidad.id == 0 && request.ambiente.id != 0) {
                                    let exist5 = 0;
                                    if (a.listArea != undefined || a.listArea != null) {
                                        for (let a5 of a.listArea) {
                                            if (a5.idArea == request.area.id) {
                                                exist5 = 1;
                                            }
                                        }
                                    }

                                    if (exist5 == 1) {
                                        for (let b5 of a.listArea) {
                                            if (b5.idArea == request.area.id) {
                                                requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                                requestAmbiente.idAmbiente = request.ambiente.id;

                                                if (b5.listAmbiente == undefined || b5.listAmbiente == null) {
                                                    b5.listAmbiente = [];
                                                }

                                                b5.listAmbiente.splice(b5.listAmbiente.length, 0, requestAmbiente);
                                            }
                                        }
                                    } else {
                                        requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                        requestAmbiente.idAmbiente = request.ambiente.id;

                                        requestArea.descripcionArea = request.area.valor;
                                        requestArea.idArea = request.area.id;
                                        requestArea.listAmbiente = [];
                                        requestArea.listAmbiente.splice(requestArea.listAmbiente.length, 0, requestAmbiente);

                                        if (a.listArea == undefined || a.listArea == null) {
                                            a.listArea = [];
                                        }

                                        a.listArea.splice(a.listArea.length, 0, requestArea);
                                    }

                                    this.listEspecialidad = null;
                                } else if (request.area.id == 0 && request.especialidad.id != 0 && request.ambiente.id != 0) {
                                    let exist6 = 0;
                                    if (a.listEspecialidad != undefined || a.listEspecialidad != null) {
                                        for (let a6 of a.listEspecialidad) {
                                            if (a6.idEspecialidad == request.especialidad.id) {
                                                exist6 = 1;
                                            }
                                        }
                                    }

                                    if (exist6 == 1) {
                                        for (let b6 of a.listEspecialidad) {
                                            if (b6.idEspecialidad == request.especialidad.id) {
                                                requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                                requestAmbiente.idAmbiente = request.ambiente.id;

                                                if (b6.listAmbiente == undefined || b6.listAmbiente == null) {
                                                    b6.listAmbiente = [];
                                                }

                                                b6.listAmbiente.splice(b6.listAmbiente.length, 0, requestAmbiente);
                                            }
                                        }
                                    } else {
                                        requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                        requestAmbiente.idAmbiente = request.ambiente.id;

                                        requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                        requestEspecialidad.idEspecialidad = request.especialidad.id;
                                        requestEspecialidad.listAmbiente = [];
                                        requestEspecialidad.listAmbiente.splice(requestEspecialidad.listAmbiente.length, 0, requestAmbiente);

                                        if (a.listEspecialidad == undefined || a.listEspecialidad == null) {
                                            a.listEspecialidad = [];
                                        }

                                        a.listEspecialidad.splice(a.listEspecialidad.length, 0, requestEspecialidad);
                                    }

                                    this.listArea = null;
                                } else if (request.area.id != 0 && request.especialidad.id != 0 && request.ambiente.id != 0) {
                                    let exist7A = 0;
                                    let exist7E = 0;
                                    if (a.listArea != undefined || a.listArea != null) {
                                        for (let a7 of a.listArea) {
                                            if (a7.idArea == request.area.id) {
                                                exist7A = 1;
                                                if (a7.listEspecialidad != undefined || a7.listEspecialidad != null) {
                                                    for (let e7 of a7.listEspecialidad) {
                                                        if (e7.idEspecialidad == request.especialidad.id) {
                                                            exist7E = 1;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (exist7A == 1) {
                                        for (let b7a of a.listArea) {
                                            if (b7a.idArea == request.area.id) {
                                                if (exist7E == 1) {
                                                    for (let b7e of b7a.listEspecialidad) {
                                                        if (b7e.idEspecialidad == request.especialidad.id) {
                                                            requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                                            requestAmbiente.idAmbiente = request.ambiente.id;

                                                            if (b7e.listAmbiente == undefined || b7e.listAmbiente == null) {
                                                                b7e.listAmbiente = [];
                                                            }

                                                            b7e.listAmbiente.splice(b7e.listAmbiente.length, 0, requestAmbiente);
                                                        }
                                                    }
                                                } else {
                                                    requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                                    requestAmbiente.idAmbiente = request.ambiente.id;

                                                    requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                                    requestEspecialidad.idEspecialidad = request.especialidad.id;
                                                    requestEspecialidad.listAmbiente = [];
                                                    requestEspecialidad.listAmbiente.splice(requestEspecialidad.listAmbiente.length, 0, requestAmbiente);

                                                    if (b7a.listEspecialidad == undefined || b7a.listEspecialidad == null) {
                                                        b7a.listEspecialidad = [];
                                                    }

                                                    b7a.listEspecialidad.splice(b7a.listEspecialidad.length, 0, requestEspecialidad);
                                                }
                                            }
                                        }

                                    } else {
                                        requestAmbiente.descripcionAmbiente = request.ambiente.valor;
                                        requestAmbiente.idAmbiente = request.ambiente.id;

                                        requestEspecialidad.descripcionEspecialidad = request.especialidad.valor;
                                        requestEspecialidad.idEspecialidad = request.especialidad.id;
                                        requestEspecialidad.listAmbiente = [];
                                        requestEspecialidad.listAmbiente.splice(requestEspecialidad.listAmbiente.length, 0, requestAmbiente);

                                        requestArea.descripcionArea = request.area.valor;
                                        requestArea.idArea = request.area.id;
                                        requestArea.listEspecialidad = [];
                                        requestArea.listEspecialidad.splice(requestArea.listEspecialidad.length, 0, requestEspecialidad);

                                        if (a.listArea == undefined || a.listArea == null) {
                                            a.listArea = [];
                                        }

                                        a.listArea.splice(a.listArea.length, 0, requestArea);

                                    }
                                }
                            }
                        }

                        // -----------------------------------------------------------------------------------
                        this.toastr.success(data.confirmacion.mensaje, 'Usuario');
                        this.getListAcargoUsuario();
                    } else {

                    }
                    return true;
                },
                    error => {
                        this.toastr.error('Error al Guardar', 'Usuario');
                        return Observable.throw(error);

                    })
        })
        return promise;
    }

    private addUsuarioConRoles() {
        if (this.UsuarioConRolesRequest.usuario.idUsuario == null) {
            this.toastr.error('El Personal no existe, no podrá registrar el usuario.', 'Usuario');
            return;
        }
        this.armarRol();
        this.UsuarioActualizadoRequest.usuario.idUsuario = this.UsuarioConRolesRequest.usuario.idUsuario;
        this._usuarioService.addUsuarioConRoles(this.UsuarioConRolesRequest)


            .subscribe(data => {
                if (data.estado == 1) {
                    this.toastr.success('Usuario Registrado', 'Usuario');
                    this.close();

                } else if (data.estado == -1) {
                    this.toastr.warning('El Usuario no esta disponible', 'Usuario');
                    this.close();

                }
                return true;

            },
                error => {
                    this.toastr.error('Error al Guardar', 'Usuario');
                    return Observable.throw(error);

                }),

            err => console.error(err),
            () => console.log('Request Complete');

    }

    public armarRol() {
        this.roles.forEach(rol => {

            if (rol.seleccionado == true) {
                this.stringIdRol.push(rol.idRol);
            }
        });
        if (this.id == undefined || this.id == null) {
            this.UsuarioConRolesRequest.usuario.idRol = this.stringIdRol.toString();
        } else {
            this.UsuarioActualizadoRequest.usuario.idRol = this.stringIdRol.toString();
        }

    }

    dismiss() {
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }
    ngOnInit() {
        this.id = this.idUsuario;

        if (this.id == undefined) {
            this.getAllTipoDocumento();
            this.getAllPersonal(0, 1);
        } else {
            this.PersonalRequest.personal.idPersonal = this.id;
            this.PersonalRequest.personal.flOperacion = 1;
            this.flgOtrosDatos = 1;
            this.getAllPersonal(1, 1);
            this.getAllTipoDocumento();
            // this.visitionRol = true;
        }
        // 
    }
    private cleanRegistro(busquedaUsuario: NgForm) {
        busquedaUsuario.reset();
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
    private endSeason() {
        this.close();
    }

}
