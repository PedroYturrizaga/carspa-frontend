import { Component, OnInit, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { ConfirmarCitaComponent } from '../confirmar-cita/confirmar-cita.component';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-suspender-cita',
  templateUrl: './suspender-cita.component.html',
  styleUrls: ['./suspender-cita.component.scss']
})
export class SuspenderCitaComponent implements OnInit {

  @Input() flgReserva;
  @Input() pacienteConf;
  @Input() flgActualizacionTableInterModal;
  private tipoConfirmacion: number = 1;
  private flgtitle: boolean = true;
  private tipoCita: String = "";
  private cmbMotivoSuspencion: String =  "";
  private motivoSuspencion: any[] = [];
  constructor(
    private _citaService: CitaService,
    public dialogRef: MatDialogRef<SuspenderCitaComponent>,
    public dialog: MatDialog,
    private toastr: ToastsManager
  ) { }

  private openModalConfirmacion() {
    if (this.cmbMotivoSuspencion == "" || this.cmbMotivoSuspencion == null || this.cmbMotivoSuspencion == undefined) {
      this.toastr.error("Debe seleccionar un motivo de suspenci&oacute;n", "Gestionar cita");
      return;
    }
    const dialogRef = this.dialog.open(ConfirmarCitaComponent, {
      autoFocus: false,
      width: "25%",
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
    });
    dialogRef.componentInstance.pacienteConf = this.pacienteConf;
    dialogRef.componentInstance.tipoCita = this.tipoCita;
    dialogRef.componentInstance.tipoConfirmacion = this.tipoConfirmacion;
    dialogRef.componentInstance.cmbMotivoSuspencion = this.cmbMotivoSuspencion;
    dialogRef.componentInstance.flgActualizacionTableInterModal = this.flgActualizacionTableInterModal;
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.flgActualizacionTableInterModal[0]);
      
      if (this.flgActualizacionTableInterModal[0] == 1) {
        this.onNoClick();
      }
    });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.flgReserva == 1) {
      this.tipoCita = "Reserva"
      this.flgtitle = false;
    }
    this.getMotivosAnulacion();
  }

}
