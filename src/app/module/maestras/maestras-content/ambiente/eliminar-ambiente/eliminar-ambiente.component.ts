import { MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AmbienteService } from './../../../services/ambiente.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar-ambiente',
  templateUrl: './eliminar-ambiente.component.html',
  styleUrls: ['./eliminar-ambiente.component.scss']
})
export class EliminarAmbienteComponent implements OnInit {
  @Input() ambiente;

  private descripcionAmbiente: String;

  constructor(private _ambienteService: AmbienteService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<EliminarAmbienteComponent>) { }

  ngOnInit() {
    console.log(this.ambiente);
    this.descripcionAmbiente = this.ambiente.descripcionAmbiente;
  }

  eliminarAmbiente() {
    this._ambienteService.deleteAmbiente(this.ambiente.idAmbiente)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

}
