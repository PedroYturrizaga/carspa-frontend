import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { EspecialidadService } from '../../../services/especialidad.service';


@Component({
  selector: 'app-eliminar-especialidad',
  templateUrl: './eliminar-especialidad.component.html',
  styleUrls: ['./eliminar-especialidad.component.scss']
})
export class EliminarEspecialidadComponent implements OnInit {

  @Input() idEspecialidad;

  constructor(public _Especialidad: EspecialidadService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<EliminarEspecialidadComponent>) { }


  ngOnInit() {
  }

  eliminarEspecialidad() {

    this._Especialidad.deleteEspecialidad(this.idEspecialidad).subscribe(data => {
      if (data.estado == 1) {
        this.toastr.success(data.mensaje);
        this.close(1);
      } else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete')

  }

  dismiss() {
    this.dialogRef.close();
  }
  close(add) {
    this.dialogRef.close(add);
  }

}