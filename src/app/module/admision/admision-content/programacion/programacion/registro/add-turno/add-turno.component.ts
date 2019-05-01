import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TurnoService } from '../../../../../../../shared/services/turno.service';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.scss']
})

export class AddTurnoComponent implements OnInit {
  @Input() turnos;
  @Input() idActividad;
  @Input() addTurnoA;
  horaInicio = { hour: 0, minute: 0 };
  meridian1 = true;
  horaFin = { hour: 0, minute: 0 };
  meridian2 = true;


  constructor(
    private _turnoService: TurnoService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<AddTurnoComponent>,
    private router: ActivatedRoute
  ) { }

  public agregarTurno() {
    if (this.horaInicio.hour == 0 && this.horaInicio.minute == 0 && this.horaFin.hour == 0 && this.horaFin.minute == 0) {
      this.toastr.error("Debe indicar una hora inicio y fin", "Asignar Turno");
      return;
    }
    let ho_inicio: String;
    let ho_fin: String;

    if (this.horaInicio.hour.toString().length == 1) {
      ho_inicio = "0" + this.horaInicio.hour.toString() + ":";
    } else {
      ho_inicio = this.horaInicio.hour.toString() + ":";
    }
    if (this.horaInicio.minute.toString().length == 1) {
      ho_inicio = ho_inicio + "0" + this.horaInicio.minute.toString() + ":00";
    } else {
      ho_inicio = ho_inicio + this.horaInicio.minute.toString() + ":00";
    }
    if (this.horaFin.hour.toString().length == 1) {
      ho_fin = "0" + this.horaFin.hour.toString() + ":";
    } else {
      ho_fin = this.horaFin.hour.toString() + ":";
    }
    if (this.horaFin.minute.toString().length == 1) {
      ho_fin = ho_fin + "0" + this.horaFin.minute.toString() + ":00";
    } else {
      ho_fin = ho_fin + this.horaFin.minute.toString() + ":00";
    }

    for (let a of this.turnos) {
      let splitted = a.valor.split(" - ");
      if (splitted[0] == ho_inicio && splitted[1] == ho_fin) {
        this.toastr.error("Ya existe un turno con esta hora inicio y fin.", "Asignar Turno");
        return;
      } 
    }

    let addTurnoJson: any = {
      ho_final: ho_fin,
      ho_inicio: ho_inicio,
      idActividad: this.idActividad
    };
    this._turnoService.insertarTurno(addTurnoJson)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Se registro correctamente el turno", "Asignar Turno");
          this.addTurnoA.push(",dnvkjdsnvlsdvk");
          this.onNoClick();
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
