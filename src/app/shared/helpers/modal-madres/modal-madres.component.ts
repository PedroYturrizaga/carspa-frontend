import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-modal-madres',
  templateUrl: './modal-madres.component.html',
  styleUrls: ['./modal-madres.component.scss']
})
export class ModalMadresComponent implements OnInit {
  
  displayedColumns = ['nombres','sexo','edad'];
  dataSource = new MatTableDataSource();  

  @Input() listFamiliares;
  @Input() paciente;
  constructor(public dialogRef: MatDialogRef<ModalMadresComponent>) { 

  }

  private ChoosePerson(c){
    let promise = new Promise((resolve, reject) => {
      
      for(let j of this.listFamiliares){
        if(c.idPersona == j.idPersona){
            this.paciente.push(j);
            break;
        }
      }
      this.onNoClick()
    })
      return promise
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.listFamiliares);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
