import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { UsuarioDeleteComponent } from './usuario-delete/usuario-delete.component';
import { ToastsManager, Toast } from 'ng2-toastr';
import {
    setQuantifier, setValidatorPattern,
    setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    private usuarios: any[] = [];
    private tipoDoc: any[] = [];
    private flgMostrar: boolean = false;
    private UsuarioRequest = {
        usuario: {
            idTipoDocumento: null,
            numeroDocumentoIdentidad: null,
            apellidoPaternoPersonal: null,
            apellidoMaternoPersonal: null,
            nombrePersonal: null
            // nuPagina: 1,
            // nuRegisMostrar: 10
        }
    }

    private paginationParameter = { nuPagina: 1, total_rows: 0 };
    private pagination: any;
    private longitud = 0;
    private usuarioList: any[] = [];
    private flgHizoAlgo: any[] = [];
    longitudDocumento: string = "?";
    dataSource = new MatTableDataSource();
    private displayedColumnsUsuarios = [ 'tipoDoc', 'usuario', 'correo', 'nombres', 'estado', 'editar', 'eliminar'];
    private displayedSizes: number[];
    private pageSize;

    constructor(private _usuarioService: UsuarioService,
        private router: Router,
        private modalService: NgbModal,
        private toastr: ToastsManager,
        public dialog: MatDialog,
        private _modalDialog: MatDialog
    ) {
        this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
        this.displayedSizes = [5, 10, 25, 100];
        this.pageSize = this.displayedSizes[0];
    }


    private changeInput(tipoDoc) {
        if (tipoDoc == null || tipoDoc == undefined) {
            this.longitudDocumento = "?";
            this.UsuarioRequest.usuario.idTipoDocumento = null;
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
    private cleanRegistro(busquedaUsuario: NgForm) {
        busquedaUsuario.reset();
    }
    private modalNuevoUsuario(idUsuario) {
        this.flgHizoAlgo.splice(this.flgHizoAlgo.length, 0, 0);
        const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
            autoFocus: false,
            hasBackdrop: true,
            maxWidth: '90%',
            width: '90%',
            maxHeight: '90%',
            height: '80%',
            disableClose: true
        });
        dialogRef.componentInstance.idUsuario = idUsuario;
        dialogRef.componentInstance.flgHizoAlgo = this.flgHizoAlgo;
        dialogRef.afterClosed().subscribe(result => {
            if (this.flgHizoAlgo[0] == 1) {
                // this.UsuarioRequest.usuario.nuPagina = 1;
                this.getAllUsuarios(false, 1);
            }
            this.flgHizoAlgo = [];
        });
        // this.flgHizoAlgo.splice(this.flgHizoAlgo.length, 0, 0);
        // const modalRef = this.modalService.open(NuevoUsuarioComponent, { size: "lg", backdrop: 'static', keyboard: false, windowClass: 'modal-xlg' });
        // modalRef.componentInstance.idUsuario = idUsuario;
        // modalRef.componentInstance.flgHizoAlgo = this.flgHizoAlgo;
        // console.log(this.flgHizoAlgo)
        // modalRef.result.then(
        //     (result) => {
        //         console.log('result')
        //     }, 
        //     (reason) => {
        //         if (this.flgHizoAlgo[0] == 1) {
        //             this.getAllUsuarios(false, 1);
        //         }
        //         this.flgHizoAlgo = [];
        //         console.log('reason')
        //     });
    }

    private modalUsuarioDelete(idUsuario) {
        const modalRef = this.modalService.open(UsuarioDeleteComponent, { size: 'sm' });
        modalRef.componentInstance.idUsuario = idUsuario;
        modalRef.result.then((result) => {
            this.getAllUsuarios(false);
        }, (reason) => {
            this.getAllUsuarios(false);
        });
    }



    private getAllUsuarios(_ngForm: any, numPagina?: number) {
        if (isInvalid(_ngForm)) {
            this.toastr.warning("Completar Datos");
            return;
        }
        this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;
        Object.keys(this.UsuarioRequest.usuario).forEach(key => {
            this.UsuarioRequest.usuario[key] = (this.UsuarioRequest.usuario[key] === '') ? null : this.UsuarioRequest.usuario[key];
        });
        this.UsuarioRequest.usuario = {
            ...this.UsuarioRequest.usuario,
            ...this.pagination,
            nuRegisMostrar: this.pageSize
        };
        this._usuarioService.getAllUsuarios(this.UsuarioRequest.usuario)
            .subscribe(data => {
                if (data.estado == 1) {
                    this.usuarioList = data.usuarioList;
                    this.dataSource = new MatTableDataSource(this.usuarioList);
                    this.paginationParameter.total_rows = 0;
                    if (this.usuarioList.length != 0) {
                        this.paginationParameter.total_rows = this.usuarioList[0].nuTotalReg;
                        this.longitud = this.usuarioList[0].nuTotalReg;
                        for (let a of this.usuarioList) {
                            a.eliminarButton = "danger";
                            if (a.flgEliminar == 1) {
                                a.eliminarButton = "";
                            }
                        }
                    }
                    else {
                        this.paginator.pageIndex = 0;
                        this.longitud = 0;
                    }
                }
                else {
                    this.toastr.error(data.mensaje);
                }
                return true;
            },
                error => {
                    this.toastr.error("Error al Listar");
                    return Observable.throw(error);
                }),
            err => this.toastr.error(err),
            () => this.toastr.success('Request Complete');

    }

    private buscaPorFiltro() {

        if (this.UsuarioRequest.usuario.apellidoPaternoPersonal == null && this.UsuarioRequest.usuario.apellidoMaternoPersonal == null && this.UsuarioRequest.usuario.nombrePersonal == null && this.UsuarioRequest.usuario.idTipoDocumento == 0) {
            return this.toastr.warning('Debe ingresar datos de búsqueda', 'Usuario');
        }
        this.getAllUsuarios(false)

    }

    private getAllTipoDocumento() {
        this._usuarioService.getTipoDocumento()
            .subscribe(data => {
                if (data.estado == 1) {
                    this.tipoDoc = data.tipoDocumentoList;
                } else {
                    this.toastr.error("Error en tipo de Docu" + data.mensaje);
                }
                return true;
            },
                error => {
                    console.error(error);
                });
    }

    private pageUsuarioUpdate() {
        this.flgMostrar = true;
    }

    private eliminarUsuarioIpress(idUsuario) {
        const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
            autoFocus: false,
            // maxWidth: '40%',
            // width: '50%',
            // maxHeight: '80%',
            // height: '30%',
            disableClose: true,
            hasBackdrop: true,
          });
          dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el usuario ?";
          dialogRef.afterClosed().subscribe(result => {
            if (result == 1) {
                this._usuarioService.deleteUsuario(idUsuario)
                .subscribe(data => {
                    if (data.estado == 1) {
                        this.toastr.success(data.confirmacion.mensaje);
                        // this.UsuarioRequest.usuario.nuPagina = 1;
                        this.getAllUsuarios(false, 1);
                    } else {
                        this.toastr.error("Error al eliminar");
                    }
                    return true;
                },
                    error => {
                        console.error(error);
                    });
            }
          });

     
    }
    private pageEvent($event) {
        this.pagination.nuPagina = $event.pageIndex + 1;
        this.pageSize = $event.pageSize;
        this.getAllUsuarios(false);
    }

    // changePage(pagina) {
    //     this.UsuarioRequest.usuario.nuPagina = pagina;
    //     this.getAllUsuarios(false);
    //     this.UsuarioRequest.usuario.nuPagina = 1;
    // }

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

    ngOnInit() {
        this.getAllUsuarios(false, 1);
        this.getAllTipoDocumento();
        this.UsuarioRequest.usuario.idTipoDocumento = 0;
    }

}
