import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import { CitaExamenesAuxiliaresService } from '../../../../../../services/cita-examenes-auxiliares.service';

@Component({
  selector: 'app-examen-tipo-acatualiza',
  templateUrl: './examen-tipo-acatualiza.component.html',
  styleUrls: ['./examen-tipo-acatualiza.component.scss']
})
export class ExamenTipoAcatualizaComponent implements OnInit {

  @Input() idOrdenExamenDetalle;
  @Input() exTipoSelect;
  RequestOrdenExamenDetalle = { ordenExamenDetalle: { idOrdenExamenDetalle: null, observacionExamenDetalle: null } }

  constructor(public dialogRef: MatDialogRef<ExamenTipoAcatualizaComponent>,
    private _examenesApoyoService: CitaExamenesAuxiliaresService,
    private toastr: ToastsManager) { }


  ngOnInit() {
  }

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

}
