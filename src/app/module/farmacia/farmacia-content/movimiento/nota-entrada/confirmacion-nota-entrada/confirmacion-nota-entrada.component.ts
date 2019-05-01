import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion-nota-entrada',
  templateUrl: './confirmacion-nota-entrada.component.html',
  styleUrls: ['./confirmacion-nota-entrada.component.scss']
})
export class ConfirmacionNotaEntradaComponent implements OnInit {

  @Input() confirmacion
  constructor(private _dialogRef: MatDialogRef<ConfirmacionNotaEntradaComponent>,) { }

  ngOnInit() {
  }

  dismiss() {
    this._dialogRef.close();
  }
  confirmacionCorrecta() {
    this._dialogRef.close(1);
  }
}
