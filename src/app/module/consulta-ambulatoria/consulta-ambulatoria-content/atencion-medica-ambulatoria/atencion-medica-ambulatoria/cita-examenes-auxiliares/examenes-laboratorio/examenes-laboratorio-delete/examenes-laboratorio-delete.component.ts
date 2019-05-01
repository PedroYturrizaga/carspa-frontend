import { Component, Input, OnInit } from '@angular/core';
import { CitaExamenesAuxiliaresService } from '../../../../../../services/cita-examenes-auxiliares.service';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-examenes-laboratorio-delete',
  templateUrl: './examenes-laboratorio-delete.component.html',
  styleUrls: ['./examenes-laboratorio-delete.component.scss'],
})
export class ExamenesLaboratorioDeleteComponent implements OnInit {
  @Input() idOrdenExamenDetalle;
  private idOrdenExamenDetallee: number = null;

  constructor(public dialogRef: MatDialogRef<ExamenesLaboratorioDeleteComponent>,
    private _examenesApoyoService: CitaExamenesAuxiliaresService,
    private toastr: ToastsManager) { }

  private eliminarOrdenExamenesDetalle() {
    this._examenesApoyoService.eliminarOrdenExamenes(this.idOrdenExamenDetallee)
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
    this.idOrdenExamenDetallee = this.idOrdenExamenDetalle;


  }

}
