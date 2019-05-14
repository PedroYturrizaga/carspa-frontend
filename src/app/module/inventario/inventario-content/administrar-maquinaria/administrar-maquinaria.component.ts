import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AdministrarMaquinariaService } from '../../administrar-maquinaria.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MaquinariasInactivoComponent } from './maquinarias-inactivo/maquinarias-inactivo.component';
import { RegistrarActualizarComponent } from '../administrar-material/registrar-actualizar/registrar-actualizar.component';
import { RegistActuaComponent } from './regist-actua/regist-actua.component';

@Component({
  selector: 'app-administrar-maquinaria',
  templateUrl: './administrar-maquinaria.component.html',
  styleUrls: ['./administrar-maquinaria.component.scss']
})
export class AdministrarMaquinariaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['material','marca','cantidad','fecha','ver','edit' ,'eliminar'];
  dataSource = new MatTableDataSource();
  private lsmaquinarias = [];
  private requestListar = { nombre: null ,estado:1}
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _maquinariaService: AdministrarMaquinariaService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router) {
      this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [10, 15, 25, 100];
      this.pageSize = this.displayedSizes[0];
     }
     busqueda(target) {
      if (target.length % 2 == 0) {
        this.getMaquinarias(1);
      }
    }


    private getMaquinarias(nuPagina?: number) {
      this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

      Object.keys(this.requestListar).forEach(key => {
        this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
      });
      this.requestListar = {
        ...this.requestListar,
        ...this.pagination,
        nuRegisMostrar: this.pageSize
      };
      this._maquinariaService.getMaquinarias(this.requestListar).subscribe(data => {
          if (data.estado == 1) {
            this.lsmaquinarias = data.maquinarias;
            this.dataSource = new MatTableDataSource(this.lsmaquinarias);
            if (this.matPag) {
              this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
            }
            if (this.lsmaquinarias.length > 0) {
              this.pagination.nuRegisMostrar = this.lsmaquinarias[0].nuTotalReg;
            }  
  
          } else {
            this.toastr.error(data.mensaje);
          }
          return true;
        },
          error => {
            console.error(error);
            return Observable.throw(error);
          }
        ),
        err => console.error(err),
        () => console.log('Request Complete');
    }
    private anularMaquinaria(e) {
      let request={idMaquinaria:e};
      this._maquinariaService.anularMaquinaria(request).subscribe(data => {
        console.log(data);
          if (data.estado == 1) {
            this.toastr.success("Se anuló la maquinaria");
            this.getMaquinarias();
  
          } else {
            this.toastr.error(data.mensaje);
          }
          return true;
        },
          error => {
            console.error(error);
            return Observable.throw(error);
          }
        ),
        err => console.error(err),
        () => console.log('Request Complete');
    }
    private modalelementDelete(e){
      const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
        autoFocus: false,
        maxWidth: '40%',
        width: '40%',
        maxHeight: '50%',
        height: '30%',
        disableClose: true,
        hasBackdrop: true
      });
      dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea anular la maquinaria?";
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.anularMaquinaria(e);
        }
      });

  }
private modalInactivos(){
  const dialogRef = this.dialog.open(MaquinariasInactivoComponent, {
    autoFocus: false,
    maxWidth: '60%',
    width: '60%',
    maxHeight: '80%',
    height: '80%',
    disableClose: false,
    hasBackdrop: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result == 1) {
   this.getMaquinarias();
    }
  });

}
private modalabrir(op,e?){
  const dialogRef = this.dialog.open(RegistActuaComponent, {
    autoFocus: false,
    maxWidth: '50%',
    width: '70%',
    maxHeight: '60%',
    height: '60%',
    disableClose: false,
    hasBackdrop: true
  });
  dialogRef.componentInstance.e = e;
  dialogRef.componentInstance.op =op;
  dialogRef.afterClosed().subscribe(result => {
    if (result == 1) {
   this.getMaquinarias();
    }
  });
}

  ngOnInit() {
    this.getMaquinarias();
  }

}
