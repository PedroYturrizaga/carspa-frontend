import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

  @Input() mensajeConfirmacion;

  constructor(
    private _dialogRef: MatDialogRef<ModalConfirmacionComponent>
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this._dialogRef.close();
  }

  confirmacionCorrecta(){
    this.close(1);
  }

  close(add) {
    this._dialogRef.close(add);
  }

}
