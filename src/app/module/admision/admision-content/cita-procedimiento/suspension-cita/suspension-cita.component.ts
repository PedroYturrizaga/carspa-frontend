import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CitaService } from '../../../services/cita.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { CitaProcedimientoService } from '../../../services/cita-procedimiento.service';
import { getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';


@Component({
  selector: 'app-suspension-cita',
  templateUrl: './suspension-cita.component.html',
  styleUrls: ['./suspension-cita.component.scss']
})

export class SuspensionCitaComponent implements OnInit {
  @Input() CitaProc;
  @Input() Proc;
  @Input() op;

  private cmbMotivoSuspencion: String =  "";
  private motivoSuspencion: any[] = [];
  private request1={idCitaProcedimiento: null,idProcedimiento: 0,idSuspencion:null,usuarioIns:null};
  constructor(
    private _citaService: CitaService,
    private _citaProcedimientoService :CitaProcedimientoService,
    public dialogRef: MatDialogRef<SuspensionCitaComponent>,
    public dialog: MatDialog,
    private toastr: ToastsManager
  ) { }
  close(_param?: any) {
    this.dialogRef.close(_param);
  }
  
  private getMotivosAnulacion() {
    this._citaService.getMotivosAnulacion()
      .subscribe(data => {
        if (data.estado == 1) {
          this.motivoSuspencion = data.motivosAnulacionList;
        } else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private updateCitaPro(){
    if(this.op==1){
      this.request1.idCitaProcedimiento=this.CitaProc.idCitaProcedimiento;
      this.request1.idProcedimiento=null;
      this.request1.idSuspencion=this.cmbMotivoSuspencion;
      this.request1.usuarioIns=getCodUsuario();
    }
    if(this.op==0){
      this.request1.idCitaProcedimiento=this.CitaProc.idCitaProcedimiento;
      this.request1.idProcedimiento=this.Proc.idProcedimiento;
      this.request1.idSuspencion=this.cmbMotivoSuspencion;
      this.request1.usuarioIns=getCodUsuario();
    }

      this._citaProcedimientoService.suspenderCabeceraReserva(this.request1)
    .subscribe(data => {
      if (data.estado == 1) {
        this.toastr.success("", "Se suspendio la cita ");
        this.close(true);
      }
      else {
        this.toastr.error(data.mensaje, "Suspensión de cita");
      }
      return true;
    },
      error => {
        console.error("Error al suspender");
        return Observable.throw(error);
      }),
    err => console.error(err),
    () => console.log('Request Complete');
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.getMotivosAnulacion();
  }

}
