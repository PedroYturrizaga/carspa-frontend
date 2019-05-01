
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { ContratanteService } from '../../services/contratante.service';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { InsertarEditarContratanteComponent } from './insertar-editar-contratante/insertar-editar-contratante.component';
import { EliminarContratanteComponent } from './eliminar-contratante/eliminar-contratante.component';

@Component({
  selector: 'app-contratante',
  templateUrl: './contratante.component.html',
  styleUrls: ['./contratante.component.scss']
})
export class ContratanteComponent implements OnInit {

  private contratante:any = [];
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['nombreEmpresaExterna', 'url', 'editar', 'eliminar'];

  constructor(
    private _contratanteService: ContratanteService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog) { }

  ngOnInit() {
    this.getContratante();
  }

  private getContratante() {
    this._contratanteService.getListContratante()
      .subscribe(data => {
        if (data.estado == 1) {
          this.contratante = data.empresaExternaList;
          this.dataSource = new MatTableDataSource(this.contratante);
          console.log(this.contratante);
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

  private modalInsertarContratante() {
    const dialogRef = this._modalDialog.open(InsertarEditarContratanteComponent, {
      autoFocus: false,
      width: '50%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getContratante();
      }
    });
  }

  private modalEditarContratante(empresaExternasList: any) {
    const dialogRef = this._modalDialog.open(InsertarEditarContratanteComponent, {
      autoFocus: false,
      width: '50%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.contratanteCo = empresaExternasList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getContratante();
      }
    });
  }

  private modalEliminarContratante(empresaExternasList: any) {
    const dialogRef = this._modalDialog.open(EliminarContratanteComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.contratante = empresaExternasList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getContratante();
      }
    });
  }

}
