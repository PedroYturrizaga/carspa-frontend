import { Component, OnInit, Input } from '@angular/core';
import { CptEspecialidadService } from '../../../services/cpt-especialidad.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-actualizar-mapro',
  templateUrl: './actualizar-mapro.component.html',
  styleUrls: ['./actualizar-mapro.component.scss']
})
export class ActualizarMaproComponent implements OnInit {
  @Input() mapro;
  private etapas:"";

  constructor(
    private _cptEspecialidad: CptEspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    public dialogRef: MatDialogRef<ActualizarMaproComponent>
  ) { }

    private updateDatos(){
      let request={
        idEspecialidad:this.mapro.idEspecialidad,
        idCpt:this.mapro.idCpt,
        tiempo:+this.mapro.tiempo,
        detalle:this.etapas
      }
      console.log(request);
      this._cptEspecialidad.actualizarCptEspecialidades(request)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.toastr.success("Registro exitoso");
            this.close(true);
            }
            else{
              this.toastr.warning(data.confirmacion.mensaje);
            }
          }
        else {
          this.toastr.warning(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
    }
    close(add) {
      this.dialogRef.close(add);
    }
  ngOnInit() {
    this.etapas=this.mapro.detalle;

  }

}
