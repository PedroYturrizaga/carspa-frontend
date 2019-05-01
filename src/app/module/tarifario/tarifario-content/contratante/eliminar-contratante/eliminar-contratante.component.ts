import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ContratanteService } from '../../../services/contratante.service';

@Component({
  selector: 'app-eliminar-contratante',
  templateUrl: './eliminar-contratante.component.html',
  styleUrls: ['./eliminar-contratante.component.scss']
})
export class EliminarContratanteComponent implements OnInit {

  @Input() contratante;
  private params = { idEmpresaExterna: null };
  private nombreEmpresaExterna: String;

  constructor(
    private _contratanteService: ContratanteService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<EliminarContratanteComponent>) { }

  ngOnInit() {
    console.log(this.contratante);
    this.params.idEmpresaExterna = this.contratante.idEmpresaExterna;
    this.nombreEmpresaExterna = this.contratante.nombreEmpresaExterna;
  }

  private eliminarContratante() {
    console.log(this.params);
    this._contratanteService.eliminarContratante(this.params.idEmpresaExterna)
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
