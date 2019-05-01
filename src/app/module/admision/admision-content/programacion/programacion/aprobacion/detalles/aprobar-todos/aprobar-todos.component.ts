import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionAprobacionService } from '../../../../../../services/programacion-aprobacion.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-aprobar-todos',
  templateUrl: './aprobar-todos.component.html',
  styleUrls: ['./aprobar-todos.component.scss']
})
export class AprobarTodosComponent implements OnInit {
  @Input() idProgramacion;
  @Input() estadoID: string;

  private programacionRequest = { idEstado: this.estadoID, idMotivoSuspencion: null };

  constructor(
    private _programacionAprobacionService: ProgramacionAprobacionService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<AprobarTodosComponent>
  ) { }


  private confirmarProgramacion() {
    // this.close(1);
    this.dialogRef.close(1);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
