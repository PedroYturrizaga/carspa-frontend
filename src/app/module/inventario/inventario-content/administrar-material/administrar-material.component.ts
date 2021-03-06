import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { AdministrarMaterialService } from '../../administrar-material.service';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { RegistrarActualizarComponent } from './registrar-actualizar/registrar-actualizar.component';
import { MaterialesInactivoComponent } from './materiales-inactivo/materiales-inactivo.component';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-administrar-material',
  templateUrl: './administrar-material.component.html',
  styleUrls: ['./administrar-material.component.scss']
})
export class AdministrarMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material','marca','ana','cantidad','sm','smi','pp','ver','edit' ,'eliminar'];
  dataSource = new MatTableDataSource();
  private lsMateriales = [];
  private requestListar = { nombre: null ,estado:1}
  private request = {idMaterial:0}
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router) {
      this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [5, 15, 25, 100];
      this.pageSize = this.displayedSizes[0];
     }

     busqueda(target) {
      if (target.length % 2 == 0) {
        this.getMateriales(1);
      }
    }
      private pageEvent($event) {
    // this.paginationParameter.nuPagina = event.pageIndex;
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMateriales();
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
          if (data.estado == 1) {
            console.log(data);
            this.lsMateriales = data.materiales;
            this.dataSource = new MatTableDataSource(this.lsMateriales);
            if (this.matPag) {
              this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
            }
            if (this.lsMateriales.length > 0) {
              this.pagination.nuRegisMostrar = this.lsMateriales[0].nuTotalReg;
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
    private anularMaterial(e) {
      this.request.idMaterial=e;
      this._materialService.anularMaterial(this.request).subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success("Se anuló el material");
            this.getMateriales();
  
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
    this.getMateriales(
    );
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
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
      dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea anular el material '"+e.nombre+"' ?";
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.anularMaterial(e.idMaterial);
        }
      });

  }
  private modalEdit(op,e){
    const dialogRef = this.dialog.open(RegistrarActualizarComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.e = e;
    dialogRef.componentInstance.op =op;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getMateriales();
      }
    });

}
private modalInactivos(){
  const dialogRef = this.dialog.open(MaterialesInactivoComponent, {
    autoFocus: false,
    maxWidth: '60%',
    width: '60%',
    maxHeight: '80%',
    height: '80%',
    disableClose: true,
    hasBackdrop: true
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result == 1) {
   this.getMateriales();
    }
  });

}
 private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }


}
