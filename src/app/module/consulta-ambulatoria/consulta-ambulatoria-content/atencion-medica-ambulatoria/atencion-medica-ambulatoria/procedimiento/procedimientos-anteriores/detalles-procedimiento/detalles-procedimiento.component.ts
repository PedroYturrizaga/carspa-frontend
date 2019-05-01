import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ProcedimientosService } from '../../../../../../services/procedimientos.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-detalles-procedimiento',
  templateUrl: './detalles-procedimiento.component.html',
  styleUrls: ['./detalles-procedimiento.component.scss']
})
export class DetallesProcedimientoComponent implements OnInit {

  @Input() detProcedimiento;
  
  private params5: any = { idProcedimiento: 0, idActoMedico: 0 };
  private vector: any = {
    actoMedico:
      {
        idActoMedico: null,
        idHistoria: null
      },
    fecha: null,
    descProcedimiento: null,
    persona:
      {
        apellidoMaterno: null,
        apellidoPaterno: null,
        descripcionDocumento: null,
        numeroDocumentoIdentidad: null
      },
    personal:
      {
        nombrePersonal: null,
        apellidoPaternoPersonal: null,
        apellidoMaternoPersonal: null,
      }
  };
  private vector1: any = {};

  constructor(
    private _ProcedimientosService: ProcedimientosService,
    public dialogRef: MatDialogRef<DetallesProcedimientoComponent>
  ) { }
  dismiss(){
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close(1);
  }
  private verDetallesProcedimiento() {
    this.params5.idProcedimiento = this.detProcedimiento.idProcedimiento;
    this.params5.idActoMedico = this.detProcedimiento.actoMedico.idActoMedico;
    console.log(this.params5);
    this._ProcedimientosService.ObtenerDetallesProc(this.params5)
      .subscribe(data => {
        if (data.estado == 1) {
          this.vector = data.lsDetalleProc[0];
          console.log(this.vector)
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Detalles");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  ngOnInit() {
    this.verDetallesProcedimiento();
  }
}
