import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RolService } from '../../services/rol.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolDeleteComponent } from './rol-delete/rol-delete.component';
import { NuevoRolComponent } from './nuevo-rol/nuevo-rol.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})

export class RolComponent implements OnInit {

  private json: any = [{
    padredescripcion: "Farmacia",
    hijos: [{ hijodescripcion: "Movimientos", hijodescripcion2: "Inventario" }]
  },
  {
    padredescripcion: "Admision"
  }]

  private idRol;
  private flgMostrar: boolean = false;
  private roles: any[] = [];
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private RequestRoles = { idRol: null, descripRol: null, nuPagina: 1, nuRegisMostrar: 10 };
  constructor(private _rolService: RolService,
    private router: Router,
    private toastr: ToastsManager,
    private modalService: NgbModal) { }

  private getAllRoles() {
    this._rolService.getAllRoles(this.RequestRoles)
      .subscribe(data => {
        if (data.estado == 1) {
          this.roles = data.rolList;
          if (this.roles.length != 0) {
            this.paginationParameter.total_rows = data.rolList[0].numTotalReg
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  changePage(pagina) {
    this.RequestRoles.nuPagina = pagina;
    this.getAllRoles();
    this.RequestRoles.nuPagina = 1;
  }

  private modalMantenimiento() {
    const modalRef = this.modalService.open(MantenimientoComponent, { size: "lg", windowClass: 'modal-xlg' });
    // modalRef.componentInstance.idUsuario = idUsuario;
    modalRef.result.then((result) => {

    }, (reason) => {

    });
  }

  /**
	 * [modalRolDelete description]
	 * @param {[type]} idRol [description]
	 */

  private modalRolDelete(idRol) {
    const modalRef = this.modalService.open(RolDeleteComponent, { size: 'sm' });
    modalRef.componentInstance.idRol = idRol;
    modalRef.result.then((result) => {
      this.getAllRoles();
    }, (reason) => {
      this.getAllRoles();
    });
  }

  private pageRolUpdate() {
    this.flgMostrar = true;
  }

  private nuevoRolCrud() {
    this.router.navigate(['/rol/nuevoRol']);
  }

  ngOnInit() {
    this.getAllRoles();
  }

}
