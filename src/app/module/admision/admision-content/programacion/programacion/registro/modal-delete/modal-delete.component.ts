import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit 
{
  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>){}

  ngOnInit() 
  {
  }
  
  onNoClick(val): void {
    this.dialogRef.close(val);
  }

}
