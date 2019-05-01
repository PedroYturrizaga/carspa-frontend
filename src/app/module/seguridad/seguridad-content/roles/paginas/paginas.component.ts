import { Component, OnInit, Input } from '@angular/core';
import { PaginaService } from '../../../services/pagina.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.scss']
})
export class PaginasComponent implements OnInit {

  @Input() rol;

  constructor(private _paginaService: PaginaService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<PaginasComponent>) { }

  private paginaRolList = [];

  ngOnInit() {
    this.getPaginasRol();
  }

  private getPaginasRol() {
    this._paginaService.getPaginasRol(this.rol.idRol)
      .subscribe(data => {
        if (data.estado == 1) {
          this.paginaRolList = data.listPaginasRol;
          console.log(this.paginaRolList);

        } else {
          this.toastr.warning(data.mensaje, "No se encontraron las Paginas seleccionadas");
          this.paginaRolList = [];
        }
      },
        error => {
          this.toastr.error("Error al listar las Paginas seleccionadas");
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private agregarPagina(idPagina, nombrePagina, $event) {

    let param = {
      flag: null,
      idPagina: idPagina,
      idRol: this.rol.idRol
    }

    let mensajeConfirmacion = null;

    if ($event.checked) {
      param.flag = 1;
      mensajeConfirmacion = "Se agregó la página " + nombrePagina + " al rol " + this.rol.nombreRol + " correctamente";
    } else {
      param.flag = 0;
      mensajeConfirmacion = "Se eliminó la página " + nombrePagina + " del rol " + this.rol.nombreRol + " correctamente";
    }

    this._paginaService.insertDesactivarPaginaRol(param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(mensajeConfirmacion);
          } else {
            this.toastr.error(data.mensaje);
          }
        },
          error => {
            this.toastr.error("Ocurrio un error");
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');

  }

  //---------------------------------------------------------------------------------------------------
  private close(add) {
    this.dialogRef.close(add);
  }

}
