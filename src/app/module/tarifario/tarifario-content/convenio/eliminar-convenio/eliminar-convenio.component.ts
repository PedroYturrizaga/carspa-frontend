import { MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ConvenioService } from './../../../services/convenio.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar-convenio',
  templateUrl: './eliminar-convenio.component.html',
  styleUrls: ['./eliminar-convenio.component.scss']
})
export class EliminarConvenioComponent implements OnInit {

  @Input() convenioDelete;
  private noProdName: String;

  constructor(private _convenioService: ConvenioService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<EliminarConvenioComponent>) { }

  ngOnInit() {
    this.noProdName = this.convenioDelete.nombreConvenio;
  }


  private eliminarConvenio() {
    this._convenioService.eliminarConvenio(this.convenioDelete.idConvenio)
      .subscribe(data => {
        if (data.confirmacion.id == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        }
        else if (data.confirmacion.id == 0) {
          this.toastr.warning(data.mensaje);
          this.close(1);
        }
        else {
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
