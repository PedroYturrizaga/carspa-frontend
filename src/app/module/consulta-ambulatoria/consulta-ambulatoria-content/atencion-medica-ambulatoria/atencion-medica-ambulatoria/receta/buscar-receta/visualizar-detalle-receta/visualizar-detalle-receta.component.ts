import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RecetaService } from '../../../../../../services/receta.service';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-visualizar-detalle-receta',
  templateUrl: './visualizar-detalle-receta.component.html',
  styleUrls: ['./visualizar-detalle-receta.component.scss']
})
export class VisualizarDetalleRecetaComponent implements OnInit {

  @Input() idReceta;
  private recetaDetalleList: any[] = [];

  constructor(
    private _recetaService: RecetaService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<VisualizarDetalleRecetaComponent>
  ) { }

  ngOnInit() {
    this.getDetalleRecetaAnterior();
  }

  private getDetalleRecetaAnterior() {
    this._recetaService.getDetallesRecetasAnteriores(this.idReceta)
      .subscribe(data => {
        if (data.estado == 1) {
          this.recetaDetalleList = data.recetaDetalleList;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  dismiss(){
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }

}
