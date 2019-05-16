import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministrarMaterialService } from '../../../administrar-material.service';


@Component({
  selector: 'app-materiales-inactivo',
  templateUrl: './materiales-inactivo.component.html',
  styleUrls: ['./materiales-inactivo.component.scss']
})
export class MaterialesInactivoComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material','marca','proveedor','activar'];
  dataSource = new MatTableDataSource();
  private lsMateriales = [];
  private requestListar = { nombre: null ,estado:0}
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<MaterialesInactivoComponent>) {
      this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [10, 15, 25, 100];
      this.pageSize = this.displayedSizes[0];
     }
     private getMateriales(nuPagina?: number) {
      this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

      Object.keys(this.requestListar).forEach(key => {
        this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
      });
      this.requestListar = {
        ...this.requestListar,
        ...this.pagination,
        nuRegisMostrar: this.pageSize
      };
      console.log(this.requestListar);
      this._materialService.getMateriales(this.requestListar).subscribe(data => {
        console.log(data);
        
          if (data.estado == 1) {
            this.lsMateriales = data.materiales;
            this.dataSource = new MatTableDataSource(this.lsMateriales);
            if (this.matPag) {
              this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
            }
            if (this.lsMateriales.length > 0) {
              this.pagination.nuRegisMostrar = this.lsMateriales[0].nuTotalReg;
            }  
            if (this.lsMateriales.length == 0) {
              this.toastr.info("No hay materiales inactivos");
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
    close(add) {
      this.dialogRef.close(add);
    }
    private activarMaterial() {
      let idMaterial;
      this._materialService.activarMaterial(idMaterial).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se activó el material");
            this.close(1);
  
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
