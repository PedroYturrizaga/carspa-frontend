import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionAprobacionService } from '../../../../../../services/programacion-aprobacion.service';
import { ToastsManager } from 'ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-suspender',
  templateUrl: './suspender.component.html',
  styleUrls: ['./suspender.component.scss']
})
export class SuspenderComponent implements OnInit {
  @Input() idProgramacion;
  @Input() estadoID;
  @Input() liaVaquita;

  private motivosSuspencion: any[] = [];
  private programacionRequest = { idEstado: this.estadoID, idMotivoSuspencion: null };


  constructor(//public activeModal: NgbActiveModal,
    private _programacionAprobacionService: ProgramacionAprobacionService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<SuspenderComponent>
  ) { }

  private getAllMotivosSuspencion() {
    this._programacionAprobacionService.getAllMotivosSuspencion()
      .subscribe(data => {
        if (data.estado == 1) {
          this.motivosSuspencion = data.obtieneMotivoList;
          this.programacionRequest.idMotivoSuspencion = 0;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }

  private suspenderProgramacion() {
    //console.log("IdPROZZZXX:: ",this.programacionRequest.idMotivoSuspencion);
    this.programacionRequest.idEstado = this.estadoID;
    this._programacionAprobacionService.aprobarItemDetalle(this.idProgramacion, this.programacionRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Programación suspendida exitosamente", "Programacion");
          this.liaVaquita.push("gguvbds");
          // this.close();
          this.dialogRef.close();
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Programacion");
        }
        else if (data.estado == -1) {
          this.toastr.error(data.mensaje, "Programacion");
          // ]console.log('Conexion fallida');
        }
      }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // dismiss() {
  //   this.activeModal.dismiss();
  // }

  // close() {
  //   this.activeModal.close();
  // }

  ngOnInit() {
    this.getAllMotivosSuspencion();
  }

}
