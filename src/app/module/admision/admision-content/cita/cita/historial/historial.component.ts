import { Component, OnInit, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { ReporteService } from '../../../../../../shared/services/reporte.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ModalPdfComponent } from '../../../../../../shared/helpers/modal-pdf/modal-pdf.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  //tabla1
  displayedColumnsH = ['idCita', 'fechaCita', 'horaAtencion' , 'servicio', 'actividad', 'medicoTratante', 'consultorio', 'tipoCita', 'estado'];
  dataSourceH = new MatTableDataSource();
  
  @Input() paciente;
  private citas: any[] = [];
  private citasHistorial: any[] = [];

  constructor(private _citaService: CitaService,
              private _reporteService: ReporteService,
              private toastr: ToastsManager,
              public dialogRef: MatDialogRef<HistorialComponent>,
              public dialog: MatDialog
              ) { }

  

  private getcitas() {
    this._citaService.getCitasPorPaciente(this.paciente[0].idPersona, 1)
      .subscribe(data => {
        if (data.estado == 1) {
          this.citas = data.citaList;

          for (let ct of this.citas) {
            if (ct.estado != "Reservado") {
              this.citasHistorial.push(ct);
            }
          }
          this.dataSourceH = new MatTableDataSource(this.citasHistorial);
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

  private imprimirHistorialCita() {
    console.log(this.paciente);
    
    this._citaService.imprimirHistorialCita(this.paciente[0]["idPersona"], this.paciente[0]["numeroDocumentoIdentidad"], 1, 2)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          
          // this._reporteService.generar(null, data.fileBase64, null);
          const dialogRef1 = this.dialog.open(ModalPdfComponent, {
            autoFocus: false,
            maxWidth: '90%',
            width: '80%',
            maxHeight: '95%',
            height: '95%',
            disableClose: false,
            panelClass: 'pdfs'
          });
          dialogRef1.componentInstance.mystring = "data:application/pdf;base64,"+data.fileBase64;
          dialogRef1.afterClosed().subscribe(result => {
          });



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
    console.log(this.paciente)
    this.getcitas();
  }

}
