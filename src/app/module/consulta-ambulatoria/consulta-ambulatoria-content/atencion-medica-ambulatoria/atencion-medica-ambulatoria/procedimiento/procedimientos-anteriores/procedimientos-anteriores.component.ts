import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { DetallesProcedimientoComponent } from './detalles-procedimiento/detalles-procedimiento.component';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-procedimientos-anteriores',
  templateUrl: './procedimientos-anteriores.component.html',
  styleUrls: ['./procedimientos-anteriores.component.scss']
})
export class ProcedimientosAnterioresComponent implements OnInit {
  @Input() procedimientoA;

  displayedProcedimientosAnteriores = ['codigo', 'descProcedimientoss', 'cantidad', 'informe',
                                       'fecha',  'personal', 'estadoProc', 'ver'];
  dataSource = new MatTableDataSource();
  private estadoDetalle: any = [];

  constructor(
    private toastr: ToastsManager,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProcedimientosAnterioresComponent>
  ) { }

  // private verDetalles(detProcedimiento) {
  //   const modalRef = this.modalService.open(DetallesProcedimientoComponent, { size: "lg", backdrop: 'static', keyboard: false });
  //   modalRef.componentInstance.detProcedimiento = detProcedimiento;
  //   modalRef.result.then((result) => { }, (reason) => { });
  // }
  private verDetalles(detProcedimiento){
    const dialogRef = this.dialog.open(DetallesProcedimientoComponent, {
      autoFocus: false,
      maxWidth: '80%',
      width: '60%',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.detProcedimiento = detProcedimiento;
    dialogRef.afterClosed().subscribe(result => { });
  }
  private verificarEstadoProcedimiento() {
    for (var i = 0; i < this.procedimientoA.length; i++) {
      if (this.procedimientoA[i].estadoOrden == 'Atendida') {
        this.estadoDetalle[i] = 1;
      }
      else {
        this.estadoDetalle[i] = 2;
      }
    }
  }
  dismiss(){
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close(1);
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.procedimientoA);
    this.verificarEstadoProcedimiento();
  }

}
