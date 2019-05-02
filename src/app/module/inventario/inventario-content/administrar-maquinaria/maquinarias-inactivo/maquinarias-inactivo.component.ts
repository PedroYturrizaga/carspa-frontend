import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministrarMaquinariaService } from '../../../administrar-maquinaria.service';

@Component({
  selector: 'app-maquinarias-inactivo',
  templateUrl: './maquinarias-inactivo.component.html',
  styleUrls: ['./maquinarias-inactivo.component.scss']
})
export class MaquinariasInactivoComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['material','marca','cantidad','fecha','ver','edit' ,'eliminar'];
  dataSource = new MatTableDataSource();
  private lsmaquinarias = [];
  private requestListar = { nombre: null ,estado:0}
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

    private getMaquinarias(nuPagina?: number) {
      this.pagination.numPagina = (nuPagina) ? nuPagina : this.pagination.numPagina;

      Object.keys(this.requestListar).forEach(key => {
        this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
      });
      this.requestListar = {
        ...this.requestListar,
        ...this.pagination,
        numRegistroMostrar: this.pageSize
      };
      this._maquinariaService.getMaquinarias(this.requestListar).subscribe(data => {
          if (data.estado == 1) {
            this.lsmaquinarias = data.proveedor;
            this.dataSource = new MatTableDataSource(this.lsmaquinarias);
            if (this.matPag) {
              this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
            }
            if (this.lsmaquinarias.length > 0) {
              this.pagination.numRegistroMostrar = this.lsmaquinarias[0].nuTotalReg;
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
    private activarMaquinaria() {
      let idMaquinaria;
      this._maquinariaService.activarMaquinaria(idMaquinaria).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se anuló la maquinaria");
  
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

  ngOnInit() {
    this.getMaquinarias();
  }

}
