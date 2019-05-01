import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from '../registro.component';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-modal-restricciones',
  templateUrl: './modal-restricciones.component.html',
  styleUrls: ['./modal-restricciones.component.scss']
})
export class ModalRestriccionesComponent implements OnInit 
{
  @Input() dataModal; 
  
  private mensaje;
  private restricciones:any[];
  
  constructor(public dialogRef: MatDialogRef<ModalRestriccionesComponent>){
  }

  
  ngOnInit() 
  {
    this.mensaje = this.dataModal.mensaje;
    this.restricciones = this.dataModal.confirmacionList;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
