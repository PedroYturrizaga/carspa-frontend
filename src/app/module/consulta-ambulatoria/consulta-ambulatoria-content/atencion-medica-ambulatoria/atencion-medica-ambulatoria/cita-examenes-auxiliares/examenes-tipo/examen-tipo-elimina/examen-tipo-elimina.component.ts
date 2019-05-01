import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import { CitaExamenesAuxiliaresService } from '../../../../../../services/cita-examenes-auxiliares.service';

@Component({
  selector: 'app-examen-tipo-elimina',
  templateUrl: './examen-tipo-elimina.component.html',
  styleUrls: ['./examen-tipo-elimina.component.scss']
})
export class ExamenTipoEliminaComponent implements OnInit {

  @Input() idOrdenExamenDetalle;
  @Input() exTipoSelect;
  private idOrdenExamenDetallee: number = null;

  constructor(public dialogRef: MatDialogRef<ExamenTipoEliminaComponent>,
              private _examenesApoyoService: CitaExamenesAuxiliaresService,
              private toastr: ToastsManager) { }

  ngOnInit() {
  }
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


}
