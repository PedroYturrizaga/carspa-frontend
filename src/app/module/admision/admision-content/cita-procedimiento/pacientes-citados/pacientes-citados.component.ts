import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CitaProcedimientoService } from '../../../services/cita-procedimiento.service';
import { MatDialogRef, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager, Toast } from 'ng2-toastr';
import { getIpress, getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';
import { ConfirmarReservaComponent } from '../confirmar-reserva/confirmar-reserva.component';

@Component({
  selector: 'app-pacientes-citados',
  templateUrl: './pacientes-citados.component.html',
  styleUrls: ['./pacientes-citados.component.scss']
})
export class PacientesCitadosComponent implements OnInit {


  // dialog: any;
  @Input() medicojs;
  @Input() opcion;
  @Input() idProc;
  @Input() obtenerSolicitudes;

  private obtenerDatos = { idProgramacion: 0 };
  private requestOtorgar = {
    idProgramacion: 0,
    dataProc: null,
    idEspecialidad: 0
  };
  private requestInsertar = {
    citaProcedimiento:{
      idPersona:"",
      idProgramacion: 0,
      feCita:"",
      usuarioIns:"",
      dataCita: []
    }
  };
  private pacientesCitados: any = [];
  private pacienteCita: any = [];
  private showCitaPaciente = 0;
  private showBtConfirmar = 0;
  private showCitados=0;
  displayedColumnsPacienteCitados = ['HIniTur', 'HFinTur', 'tipoDoc', 'numDoc', 'Paciente', 'Procedimiento'];
  dataSource = new MatTableDataSource();
  displayedColumnsPaciente = ['HIniTur', 'HFinTur', 'tipoDoc', 'numDoc', 'Paciente', 'Procedimiento'];
  dataSource1 = new MatTableDataSource();

  constructor
    (
    // private activeModal: NgbActiveModal,
    private _otorgarCitaService: CitaProcedimientoService,
    public dialogRef: MatDialogRef<PacientesCitadosComponent>,
    private toastr: ToastsManager,
    private dialog: MatDialog

    ) { }
  close() {
    this.dialogRef.close(true);
  }
  dismiss() {
    this.dialogRef.close(false);
  }

  private getDatos() {
    this.obtenerDatos.idProgramacion = this.medicojs.idProgramacion;
    this._otorgarCitaService.getPacientesCitados(this.obtenerDatos)
      .subscribe(data => {
        if (data.estado == 1) {
          this.pacientesCitados = data.lsCitados;
          this.dataSource = new MatTableDataSource(this.pacientesCitados);
          if (this.pacientesCitados.length == 0 && this.opcion==0) {
            this.toastr.info("No hay Paciente Citados");
            
          }
          if (this.pacientesCitados.length != 0) {
            this.showCitados=1;
            
          }
          if (this.opcion == 1) {
            this.showBtConfirmar = 1;
            this.showCitaPaciente = 1;
            this.getOtorgarCita();
          }
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Paciente Citados");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private getOtorgarCita() {
    this.requestOtorgar.dataProc = JSON.stringify(this.idProc);
    this.requestOtorgar.idProgramacion = this.medicojs.idProgramacion;
    this.requestOtorgar.idEspecialidad = this.obtenerSolicitudes.idEspecialidad;
    console.log(this.requestOtorgar);
    this._otorgarCitaService.ObtenerCita(this.requestOtorgar)
      .subscribe(data => {
        if (data.estado == 1) {
          this.pacienteCita = data.lsOtorgarCita;
          this.dataSource1 = new MatTableDataSource(this.pacienteCita);
          this.llenarRequestInsert();
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.log("Error al Obtener Paciente Citados");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private llenarRequestInsert(){
    this.requestInsertar.citaProcedimiento.idPersona=this.obtenerSolicitudes.idPersona,
    this.requestInsertar.citaProcedimiento.idProgramacion = this.medicojs.idProgramacion;
    this.requestInsertar.citaProcedimiento.feCita=this.medicojs.feProgramacion;
    this.requestInsertar.citaProcedimiento.usuarioIns=getCodUsuario();
    for (let ls of this.pacienteCita) {
        let json = 
          {
            "idProcedimiento": ls.idProcedimiento,
            "cantidad":ls.cantidad,
            "hoInicio":ls.hoInicio,
            "hoFin":ls.hoFin,
            "precio":ls.precio,
            "descuento":ls.descuento,
            "subTotal":ls.subTotal
          }       
        this.requestInsertar.citaProcedimiento.dataCita.push(json);
    }
  }
  private confirmarCita(requestInsertar) {
    const dialogRef = this.dialog.open(ConfirmarReservaComponent, {
      autoFocus: false,
      width: '25%',
      height: '35%',
      disableClose: true
    });
    dialogRef.componentInstance.requestInsertar = this.requestInsertar;
    dialogRef.afterClosed().subscribe(result => { 
      (result) ? this.close() : this.dismiss(); 
    });
  }
  ngOnInit() {
    this.getDatos();
  }
}
