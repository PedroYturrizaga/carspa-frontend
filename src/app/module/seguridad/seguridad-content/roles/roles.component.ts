import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { CrearEditarRolComponent } from './crear-editar-rol/crear-editar-rol.component';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { PaginasComponent } from './paginas/paginas.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _rolService: RolService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog) {}

  private rolList = [];
  private displayedColumns = ['nro', 'nombreRol', 'alcance', 'grupOcup', 'editar', 'eliminar', 'darPagina'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.getRolesGrupOcup();
  }

  private getRolesGrupOcup() {
    this._rolService.getRolesGrupOcup()
      .subscribe(data => {
        if (data.estado == 1) {
          this.rolList = data.listRolGrupoOcupacional;
          let count = 1;
          this.rolList.forEach(element => {
            element["nro"] = count;
            count++;
          });
          this.dataSource = new MatTableDataSource(this.rolList);
          this.dataSource.sort = this.sort;
        } else {
          this.toastr.warning(data.mensaje, "No se encontraron Roles");
          this.rolList = [];
        }
      },
        error => {
          this.toastr.error("Error al listar los Roles");
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private modalNuevoRol() {
    const dialogRef = this._modalDialog.open(CrearEditarRolComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '95%',
      disableClose: true
    });
    // dialogRef.componentInstance.idUsuario = idUsuario;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getRolesGrupOcup();
      }
    });
  }

  private editarRolGrupOcup(element) {
    const dialogRef = this._modalDialog.open(CrearEditarRolComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false
    });
    dialogRef.componentInstance.rolGrupOcupEdit = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getRolesGrupOcup();
      }
    });
  }

  private eliminarRolGrupOcup(idRol, nombreRol) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      hasBackdrop: true,
      // maxWidth: '90%',
      // width: '90%',
      // maxHeight: '95%',
      // height: '95%',
      disableClose: false
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea eliminar el rol " + nombreRol + "?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._rolService.deleteRolGrupOcup(idRol)
          .subscribe(data => {
            
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.getRolesGrupOcup();
            //} else if(data.estado == 0){
              //this.toastr.warning(data.mensaje);
            } else {
              this.toastr.error(data.mensaje);
            }
          },
            error => {
              console.log(error);
            });
      }
    });
  }

  private darPagina(idRol, nombreRol){
    const dialogRef = this._modalDialog.open(PaginasComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false
    });

    let rol = {idRol: idRol, nombreRol: nombreRol}

    dialogRef.componentInstance.rol = rol;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getRolesGrupOcup();
      }
    });
  }
}
