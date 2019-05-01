import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../services/usuario.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.scss']
})
export class UsuarioDeleteComponent implements OnInit {
  @Input() idUsuario;
  private idUsuarioo: number = null;

  constructor(public activeModal: NgbActiveModal,
    private _usuarioService: UsuarioService,
    private toastr: ToastsManager) { }

  private deleteUsuario() {
    this._usuarioService.deleteUsuario(this.idUsuarioo)
      .subscribe(data => {
        if (data.estado == 1) {
          this.close();
          if (data.confirmacion.id == 0) {
            this.toastr.error(data.confirmacion.mensaje);
          } else {
            this.toastr.success('Usuario Eliminado', 'Usuario');
          }
        } else {
          this.toastr.error(data.mensaje);
        }

        return true;
      },
        error => {
          this.toastr.error('Error al Eliminar', 'Usuario');
          return Observable.throw(error);

        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }





  dismiss() {
    this.activeModal.dismiss();
  }
  close() {
    this.activeModal.close();
  }
  ngOnInit() {

    this.idUsuarioo = this.idUsuario;
  }

}
