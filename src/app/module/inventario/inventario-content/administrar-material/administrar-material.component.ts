import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { AdministrarMaterialService } from '../../administrar-material.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrar-material',
  templateUrl: './administrar-material.component.html',
  styleUrls: ['./administrar-material.component.scss']
})
export class AdministrarMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material','marca','stock','proveedor','ver','edit' ,'eliminar'];
  dataSource = new MatTableDataSource();
  private lsMateriales = [];
  private requestListar = { nombre: null ,estado:1}
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router) {
      this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [10, 15, 25, 100];
      this.pageSize = this.displayedSizes[0];
     }

    private getMateriales(nuPagina?: number) {
      this.pagination.numPagina = (nuPagina) ? nuPagina : this.pagination.numPagina;

      Object.keys(this.requestListar).forEach(key => {
        this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
      });
      this.requestListar = {
        ...this.requestListar,
        ...this.pagination,
        numRegistroMostrar: this.pageSize
      };
      this._materialService.getMateriales(this.requestListar).subscribe(data => {
          if (data.estado == 1) {
            this.lsMateriales = data.proveedor;
            this.dataSource = new MatTableDataSource(this.lsMateriales);
            if (this.matPag) {
              this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
            }
            if (this.lsMateriales.length > 0) {
              this.pagination.numRegistroMostrar = this.lsMateriales[0].nuTotalReg;
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
    private anularMaterial() {
      let idMaterial;
      this._materialService.anularMaterial(idMaterial).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se anuló el material");
  
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
    this.getMateriales();
  }

}
