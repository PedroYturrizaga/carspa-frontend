import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RolService } from '../../../../seguridad/services/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.scss']
})
export class NuevoRolComponent implements OnInit {

  @Input() idRol;

  private id: string = "";
  private rol: any[] = [];
  private sub: any;
  private paginas: any[] = [];
  private stringIdPaginas: String[] = [];
  private rolRequest = { rol: { nombreRol: "", descripcionRol: "", paginaList: null } }
  private paginasRolRequest = {};

  constructor(private _rolService: RolService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastsManager) {
  }


  /**
	 * [getRol description]
	 * @param {[type]} idRol [description]
	 */

  private getRol(idRol) {
    this._rolService.getRol(idRol)
      .subscribe(data => {
        /*evaluacion del resultado de la peticion al servidor*/
        if (data.estado == 1) {
          this.rolRequest.rol = data.rol;
          this.getPaginasPorRol(idRol)
        } else if (data.estado == 0) {
          this.toastr.error(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          this.toastr.error("Error al traer el rol");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => {
        this.toastr.success('Request Complete');

      };
  }

  private getPaginasPorRol(idRol) {

    this._rolService.getPaginasPorRol(idRol)
      .subscribe(data => {
        /*evaluacion del resultado de la peticion al servidor*/
        if (data.estado == 1) {
          this.paginas = data.paginaList;
        } else if (data.estado == 0) {
          this.toastr.error(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          this.toastr.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllPaginasPadreHijo() {

    this._rolService.getAllPaginasPadreHijo()
      .subscribe(data => {
        /*evaluacion del resultado de la peticion al servidor*/
        if (data.estado == 1) {
          this.paginas = data.paginaList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => this.toastr.success('Request Complete');
  }

  private addRol() {
    if (this.rolRequest.rol.nombreRol.trim() == '') {
      this.toastr.error('Debe ingresar un nombre de rol', 'Rol');
      return;
    }
    if (this.rolRequest.rol.descripcionRol.trim() == '') {
      this.toastr.error('Debe ingresar una descripción de rol', 'Rol');
      return;
    }
    this.armarRol();
    this._rolService.addRol(this.rolRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          this.toastr.error('error');
          return Observable.throw(error);
        }

      ),
      err => console.error(err),
      () => console.log('Request Complete');
    this.router.navigate(['/rol']);
  }

  private updateRol() {
    this.armarRol();
    this._rolService.updateRol(this.rolRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success('Rol actualizado', 'Rol');
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }

      ),
      err => console.error(err),
      () => console.log('Request Complete');
    this.router.navigate(['/rol']);
  }

  public armarRol() {
    this.paginas.forEach(pagPadre => {
      if (pagPadre.hijosList != null) {
        pagPadre.hijosList.forEach(pagHijo => {
          if (pagHijo.seleccionado == true) {
            this.stringIdPaginas.push(pagHijo.idPagina);
          }
        });
      }
    });
    this.rolRequest.rol.paginaList = this.stringIdPaginas.toString();
  }

  private regresaPagina() {
    this.router.navigate(['/rol']);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['idRol'];

      if (this.id == undefined) {
        this.getAllPaginasPadreHijo();
      } else {
        this.getRol(this.id);
      }
    });
  }

}
