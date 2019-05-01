import { EliminarConvenioComponent } from './eliminar-convenio/eliminar-convenio.component';
import { InsertarEditarConvenioComponent } from './insertar-editar-convenio/insertar-editar-convenio.component';
import { ToastsManager } from 'ng2-toastr';
import { ConvenioService } from './../../services/convenio.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.scss']
})
export class ConvenioComponent implements OnInit {

  private convenio: any = [];
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['nomConvenio', 'IAFAEmpresa', 'TipOrg', 'FHA', 'FSA', 'Editar', 'Eliminar'];

  constructor(
    private _convenioService: ConvenioService,
    private toastr: ToastsManager,
    public _modalDialog: MatDialog
  ) { }

  ngOnInit() {
    this.listarConvenio();
  }

  private listarConvenio() {
    this._convenioService.getListConvenio()
      .subscribe(data => {
        if (data.estado == 1) {
          this.convenio = data.convenioList;
          this.dataSource = new MatTableDataSource(this.convenio);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "No se encontraron datos");
          this.convenio = [];
          this.dataSource = new MatTableDataSource(this.convenio);
        } else {
          this.toastr.error(data.mensaje);
          this.convenio = [];
          this.dataSource = new MatTableDataSource(this.convenio);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  modalInsertarConvenio() {
    const dialogRef = this._modalDialog.open(InsertarEditarConvenioComponent, {
      autoFocus: false,
      width: '45%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.listarConvenio();
      }
    });
  }

  modalActualizarConvenio(convenList: any) {
    const dialogRef = this._modalDialog.open(InsertarEditarConvenioComponent, {
      autoFocus: false,
      width: '45%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.convenioCoList = convenList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.listarConvenio();
      }
    });
  }

  modalEliminarConvenio(convenList: any) {
    const dialogRef = this._modalDialog.open(EliminarConvenioComponent, {
      autoFocus: false,
      disableClose: true
    });
    dialogRef.componentInstance.convenioDelete = convenList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.listarConvenio();
      }
    });
  }

}
