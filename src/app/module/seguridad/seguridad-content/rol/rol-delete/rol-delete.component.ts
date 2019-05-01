import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RolService } from '../../../services/rol.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-rol-delete',
	templateUrl: './rol-delete.component.html',
	styleUrls: ['./rol-delete.component.scss']
})
export class RolDeleteComponent implements OnInit {
	@Input() idRol;
	private idRoll: number = null;
	constructor(public activeModal: NgbActiveModal,
		private _rolService: RolService,
		private toastr: ToastsManager) { }

    /**
   * [deleteRol description]
   * @param {[type]} item [description]
   */
	private deleteRol() {

		this._rolService.deleteRol(this.idRoll)
			.subscribe(data => {
				if (data.estado == 1) {
					this.close();
					if (data.confirmacion.id == 0) {
						this.toastr.error(data.confirmacion.mensaje);
					} else {
						this.toastr.success('Rol Eliminado', 'Rol');
					}
				} else {
					this.toastr.error(data.mensaje);
				}

				return true;
			},
				error => {
					this.toastr.error('Error al Eliminar', 'Rol');
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
		this.idRoll = this.idRol;
	}

}
