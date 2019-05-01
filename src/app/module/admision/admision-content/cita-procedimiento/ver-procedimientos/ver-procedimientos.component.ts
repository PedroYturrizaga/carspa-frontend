import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CitaProcedimientoService } from '../../../services/cita-procedimiento.service';
import { MatDialogRef, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager, Toast } from 'ng2-toastr';
import { getIpress, getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';
import { ConfirmarReservaComponent } from '../confirmar-reserva/confirmar-reserva.component';
import { SuspensionCitaComponent } from '../suspension-cita/suspension-cita.component';

@Component({
  selector: 'app-ver-procedimientos',
  templateUrl: './ver-procedimientos.component.html',
  styleUrls: ['./ver-procedimientos.component.scss']
})
export class VerProcedimientosComponent implements OnInit {

  @Input() CitaProc;
  private  request={idCitaProcedimiento: 0 };
  private procedimientos: any = [];
  private total=0;
  displayedColumnsProced = ['Procedimiento', 'Cantidad', 'Precio', 'Estado', 'Cancelar'];
  dataSource = new MatTableDataSource();
  constructor(
    private _otorgarCitaService: CitaProcedimientoService,
    public dialogRef: MatDialogRef<VerProcedimientosComponent>,
    private toastr: ToastsManager,
    private dialog: MatDialog
  ) { }
  close() {
    this.dialogRef.close(true);
  }
  dismiss() {
    this.dialogRef.close(false);
  }
  private openModalCancelar(Proc,op) {
    const dialogRef = this.dialog.open(SuspensionCitaComponent, {
      autoFocus: false,
      width: '30%',
      height: '38%',
      disableClose: false
    });
    dialogRef.componentInstance.Proc = Proc;
    dialogRef.componentInstance.CitaProc =  this.CitaProc;
    dialogRef.componentInstance.op = op;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDatos();
      }
      else {
        //modal cancelado o cerrado

      }
    });
  }
  private getDatos() {
    this.request.idCitaProcedimiento = this.CitaProc.idCitaProcedimiento;
    this._otorgarCitaService.getObtenerProc(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.procedimientos = data.lsProcedimientos;
          this.dataSource = new MatTableDataSource(this.procedimientos);
          this.total=this.CitaProc.total;
          if (this.procedimientos.length == 0) {
            this.toastr.info("No hay procedimientos");
            
          }
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Procedimientos");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  ngOnInit() {
    this.getDatos();
  }

}
