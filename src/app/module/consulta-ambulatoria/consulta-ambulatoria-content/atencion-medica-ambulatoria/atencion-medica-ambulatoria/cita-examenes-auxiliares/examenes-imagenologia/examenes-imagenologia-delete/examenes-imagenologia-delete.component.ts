import { Component, OnInit, Input } from '@angular/core';
import { CitaExamenesAuxiliaresService } from '../../../../../../services/cita-examenes-auxiliares.service';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-examenes-imagenologia-delete',
  templateUrl: './examenes-imagenologia-delete.component.html',
  styleUrls: ['./examenes-imagenologia-delete.component.scss']
})
export class ExamenesImagenologiaDeleteComponent implements OnInit {
  @Input() idOrdenExamenDetalle;

  private idOrdenExamenDetalleI: number = null;

  constructor(public dialogRef: MatDialogRef<ExamenesImagenologiaDeleteComponent>,
              private _examenesApoyoService: CitaExamenesAuxiliaresService,
              private toastr: ToastsManager
              ) { }

  private eliminarOrdenExamenesDetalle() {
    this._examenesApoyoService.eliminarOrdenExamenes(this.idOrdenExamenDetalleI)
      .subscribe(data => {
        if (data.estado == 1) {
          this.onNoClick();
          if (data.confirmacion.id == 0) {
            this.toastr.error(data.confirmacion.mensaje);
          } else {
            this.toastr.success('Examen Eliminado', 'Examenes');
          }
        } else {
          this.toastr.error(data.mensaje);
        }

        return true;
      },
        error => {
          this.toastr.error('Error al Eliminar', 'Examenes');
          return Observable.throw(error);

        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.idOrdenExamenDetalleI = this.idOrdenExamenDetalle;
  }

}
