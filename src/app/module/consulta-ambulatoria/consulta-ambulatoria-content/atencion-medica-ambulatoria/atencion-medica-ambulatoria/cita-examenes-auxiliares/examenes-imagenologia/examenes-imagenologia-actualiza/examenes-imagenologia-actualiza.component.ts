import { Component, OnInit, Input } from '@angular/core';
import { CitaExamenesAuxiliaresService } from '../../../../../../services/cita-examenes-auxiliares.service';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/map';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-examenes-imagenologia-actualiza',
  templateUrl: './examenes-imagenologia-actualiza.component.html',
  styleUrls: ['./examenes-imagenologia-actualiza.component.scss'],
})
export class ExamenesImagenologiaActualizaComponent implements OnInit {
  @Input() idOrdenExamenDetalle;
  private idOrdenExamenDetalleI: number = null;
  RequestOrdenExamenDetalle = { ordenExamenDetalle: { idOrdenExamenDetalle: null, observacionExamenDetalle: null } }


  constructor(
    public dialogRef: MatDialogRef<ExamenesImagenologiaActualizaComponent>,
    private _examenesApoyoService: CitaExamenesAuxiliaresService,
    private toastr: ToastsManager) { }

  private actualizarOrdenExamenesDetalle() {
    this.RequestOrdenExamenDetalle.ordenExamenDetalle.idOrdenExamenDetalle = this.idOrdenExamenDetalle;
    this._examenesApoyoService.ActulizarOrdenExamenDetalle(this.RequestOrdenExamenDetalle)
      .subscribe(data => {
        if (data.estado == 1) {

          if (data.confirmacion.id == 0) {

            this.toastr.error(data.confirmacion.mensaje);
          } else {
            this.toastr.success('Examen Actualizado', 'Examenes');
            this.onNoClick();
          }
        } else {
          this.toastr.error(data.mensaje);
        }

        return true;
      },
        error => {
          this.toastr.error('Error al Actualizar', 'Examenes');
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
