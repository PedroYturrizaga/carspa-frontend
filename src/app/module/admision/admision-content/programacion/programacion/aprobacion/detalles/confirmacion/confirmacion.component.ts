import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionAprobacionService } from '../../../../../../services/programacion-aprobacion.service';
import { ToastsManager } from 'ng2-toastr';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  @Input() idProgramacion;
  @Input() estadoID;
  @Input() liaVaquita;

  constructor(//public activeModal: NgbActiveModal,
    private _programacionAprobacionService: ProgramacionAprobacionService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<ConfirmacionComponent>
  ) { }

  private confirmarProgramacion() {

    let idEstado = this.estadoID;
    if (this.estadoID == "B1") {
      idEstado = "A";
    } else if (this.estadoID == "B0") {
      idEstado = "B";
    }

    let programacionRequest = {
      idEstado: idEstado
    };

    this._programacionAprobacionService.aprobarItemDetalle(this.idProgramacion, programacionRequest)
      .subscribe(data => {
        if (data.estado == 1 && data.confirmacion.id == 1) {
          if (this.estadoID == "P") {
            this.toastr.success("Programación aprobada exitosamente", "Programacion");
          } else if (this.estadoID == "B1") {
            this.toastr.success("Programación desbloqueada exitosamente", "Programacion");
          } else if (this.estadoID == "B0") {
            this.toastr.success("Programación bloqueada exitosamente", "Programacion");
          }

          this.liaVaquita.push("gguvbds");
          // this.close();
          this.dialogRef.close();
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Programacion");
        }
        else if (data.estado == -1) {
          this.toastr.error(data.mensaje, "Programacion");
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
  }

}
