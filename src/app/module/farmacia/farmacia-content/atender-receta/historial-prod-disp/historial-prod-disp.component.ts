import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-historial-prod-disp',
  templateUrl: './historial-prod-disp.component.html',
  styleUrls: ['./historial-prod-disp.component.scss']
})
export class HistorialProdDispComponent implements OnInit {

  @Input() historialReceta;

  constructor(public dialogRef: MatDialogRef<HistorialProdDispComponent>) { }

  ngOnInit() {
  }

  private close(add) {
    this.dialogRef.close(add);
  }

}
