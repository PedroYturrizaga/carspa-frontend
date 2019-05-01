import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-acto-medico',
  templateUrl: './acto-medico.component.html',
  styleUrls: ['./acto-medico.component.scss']
})
export class ActoMedicoComponent implements OnInit {

  @Input() idCita;

  constructor(public dialogRef: MatDialogRef<ActoMedicoComponent>) { }

  ngOnInit() {
  }

  private close(add) {
    this.dialogRef.close(add);
  }

}
