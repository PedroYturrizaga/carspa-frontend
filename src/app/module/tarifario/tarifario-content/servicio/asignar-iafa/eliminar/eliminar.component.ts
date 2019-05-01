import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material';
import { TarifarioService } from '../../../../services/tarifario.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {
  @Input() id;
  @Input() nombre;
  constructor(   
    public dialogRef: MatDialogRef<EliminarComponent>,
    private toastr: ToastsManager,
    private _tarifarioService: TarifarioService,) {}

    private request= {idServicioConvenio: 0}

    close(_param?: any) {
      this.dialogRef.close(_param);
    }
    dismiss() {
      this.dialogRef.close(false);
    }
  private eliminar(){
    this.request.idServicioConvenio=this.id;
    this._tarifarioService.deleteServicioConvenio(this.request.idServicioConvenio)
    .subscribe(data => {    
      if (data.estado == 1) {
        if (data.confirmacion.id==1) {
          this.toastr.success("", "Se eliminó el Servicio");
          this.close(true);
        }
      }
      else {
        this.toastr.warning("Este Servicio-Convenio tiene Coberturas asignadas");
        this.close(true);
      }
      return true;
    },
      error => {
        console.error("Error al eliminar: ");
        return Observable.throw(error);
      }),
    err => console.error(err),
    () => console.log('Request Complete');
  }

  ngOnInit() {
  }

}
