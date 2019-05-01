import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.scss']
})
export class VerDetalleComponent implements OnInit {

  @Input() RegMos;
  constructor(public dialogRef: MatDialogRef<VerDetalleComponent>) { }

  ngOnInit() {
    console.log(this.RegMos);
  }

  close(){
    this.dialogRef.close();
  }

}
