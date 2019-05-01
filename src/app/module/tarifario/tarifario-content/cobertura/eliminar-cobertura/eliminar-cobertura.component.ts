import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CoberturaServiceService } from '../../../services/cobertura-service.service';

@Component({
  selector: 'app-eliminar-cobertura',
  templateUrl: './eliminar-cobertura.component.html',
  styleUrls: ['./eliminar-cobertura.component.scss']
})
export class EliminarCoberturaComponent implements OnInit {
  @Input() cobertura;
  private params = { coSubTipoCober: null };
  private noSubTipoCoberName: String;

  constructor(private _coberturaService: CoberturaServiceService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<EliminarCoberturaComponent>) { }

  ngOnInit() {
    console.log(this.cobertura);
    this.params.coSubTipoCober = this.cobertura.coSubTipoCober;
    this.noSubTipoCoberName = this.cobertura.noSubTipoCoberName;
  }

  private eliminarCobertura() {
    console.log(this.params);
    this._coberturaService.eliminarCobertura(this.params.coSubTipoCober)
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
