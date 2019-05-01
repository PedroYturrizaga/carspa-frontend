import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  @Input() confirmacion
  constructor(private _dialogRef: MatDialogRef<ConfirmacionComponent>,) { }

  ngOnInit() {
  }

  dismiss() {
    this._dialogRef.close();
  }
  confirmacionCorrecta() {
    this._dialogRef.close(1);
  }

}
