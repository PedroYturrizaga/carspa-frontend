import { AreaEspeActiGrupOcupService } from './../../../services/area-espe-acti-grup-ocup.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-eliminar-aeagp',
  templateUrl: './eliminar-aeagp.component.html',
  styleUrls: ['./eliminar-aeagp.component.scss']
})
export class EliminarAeagpComponent implements OnInit {

  
  @Input() idArea;
  @Input() idEspecialidad;
  @Input() idActividad;
  @Input() idGrupoOcupacional;
  
  params = {"idArea":null, "idEspecialidad":null, "idActividad":null, "idGrupoOcupacional":null};

  constructor(public _AreaEspecActiviGrup: AreaEspeActiGrupOcupService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<EliminarAeagpComponent>) { }


    ngOnInit() {
      console.log(this.idEspecialidad);
    }
    eliminarAreaEspecialidadActividadGrupoOcupacional() {

      this.params = {"idArea":this.idArea, "idEspecialidad":this.idEspecialidad, "idActividad":this.idActividad, "idGrupoOcupacional":this.idGrupoOcupacional};
      this._AreaEspecActiviGrup.eliminarAreaEspActGrpOcp(this.params).subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
          //this.reset(1);
  
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete')
  
    }
  
    dismiss() {
      this.dialogRef.close();
    }
    close(add) {
      this.dialogRef.close(add);
    }
  
  
  }