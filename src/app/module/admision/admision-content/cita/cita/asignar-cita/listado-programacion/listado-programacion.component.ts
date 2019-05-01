import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../../../../services/cita.service';

import { MatDialogRef, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-listado-programacion',
  templateUrl: './listado-programacion.component.html',
  styleUrls: ['./listado-programacion.component.scss']
})
export class ListadoProgramacionComponent implements OnInit {
  //tabla1
  displayedColumns = ['cupos', 'horaI', 'descripcionyNumeroDocumento', 'nombres', 'seleccionar'];
  dataSource = new MatTableDataSource();

  @Input() fechaProgramacion;
  @Input() flgCambioCita;
  @Input() idProgramacion;
  @Input() nombreMedico;
  @Input() descpEspecialida;
  @Input() turnoIni;
  @Input() turnoFin;

  private listadoDetalleProgramacion: any = [];

  private listadoFirmeDetalle: any = [];

  constructor(
    private _citaService: CitaService,
    private toastr: ToastsManager,
    private router: ActivatedRoute,
    public dialogRef: MatDialogRef<ListadoProgramacionComponent>,
  ) { }

  private listarDetalleProgramacion() {
    console.log(this.idProgramacion);
    this._citaService.getListadoDetalleProgramacion(this.idProgramacion)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.listadoDetalleProgramacion = data.cita;
          console.log(this.listarDetalleProgramacion)
          for (let a of this.listadoDetalleProgramacion) {
            var datos = {
              horaI: null, horaF: null, descripcionyNumeroDocumento: null, idPersona: null,
              nombres: null, cupos: null, botonSeleccion: null, fechaProgramacion: null, nombreMedico: null, idProgramacion: null,
              descpEspecialida: null
            };
            datos.horaI = a.horaAtencion;
            datos.horaF = a.horaAtencionFin;
            datos.cupos = a.programacion.cupos;
            datos.botonSeleccion = true;
            datos.fechaProgramacion = this.fechaProgramacion;
            datos.nombreMedico = this.nombreMedico;
            datos.idProgramacion = this.idProgramacion;
            datos.descpEspecialida = this.descpEspecialida;
            if (a.persona != null || a.persona != undefined) {
              datos.descripcionyNumeroDocumento = a.persona.descripcionDocumento + " / " + a.persona.numeroDocumentoIdentidad;
              datos.idPersona = a.persona.idPersona;
              datos.nombres = a.persona.nombres;
              datos.botonSeleccion = false;
            }
            this.listadoFirmeDetalle.push(datos);
          }
          this.dataSource = new MatTableDataSource(this.listadoFirmeDetalle)
          // console.log(this.listadoFirmeDetalle);

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



  private preInsercionCita(p: any) {
    this.flgCambioCita[0] = 1;
    this.flgCambioCita[1] = p;
    this.onNoClick()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.listarDetalleProgramacion();
  }

}
