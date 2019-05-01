import { url } from './../../../../shared/helpers/custom-validators/ng4-validators/url/validator';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { TipoOrdenService } from '../../services/tipo-orden.service';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { EliminarTipoOrdenComponent } from './eliminar-tipo-orden/eliminar-tipo-orden.component';

@Component({
  selector: 'app-tipo-orden',
  templateUrl: './tipo-orden.component.html',
  styleUrls: ['./tipo-orden.component.scss']
})
export class TipoOrdenComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('tipoOrden') private formDirective: NgForm;
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private tipoOrden: any = [];
  private params = { nuPagina: null, nuRegisMostrar: null };

  private nomb = "";
  private urlSO = "";
  private id: any;

  private flbotones: boolean = true;

  private paramInsert = {
    idTipoOrden: null, descripcionTipoOrden: null, urlServicioOrigen: null
  };

  dataSource = new MatTableDataSource();
  displayedColumnsA = ['nombre', 'url', 'editar', 'eliminar'];

  constructor(private _TipoOrdenService: TipoOrdenService,
    private toastr: ToastsManager,
    private _router: Router,
    public dialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.getTipoOrdenURL(1);
  }


  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getTipoOrdenURL();
  }

  private getTipoOrdenURL(numPagina?: number) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.params).forEach(key => {
      this.params[key] = (this.params[key] === '') ? null : this.params[key];
    });

    this.params = {
      ...this.params,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._TipoOrdenService.getTipoOrden(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoOrden = [];
          this.tipoOrden = data.tipoOrdenList;
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.tipoOrden.length > 0) {
            this.pagination.nuRegisMostrar = this.tipoOrden[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron tipo de orden");
          this.tipoOrden = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          this.dataSource = new MatTableDataSource(this.tipoOrden);
        });
  }

  public insertTipoOrden() {
    if (this.nomb == "" || this.nomb == undefined) {
      this.nomb = null;
    }
    if (this.urlSO == "" || this.urlSO == undefined) {
      this.urlSO = null;
    }
    this.paramInsert = {
      idTipoOrden: null,
      descripcionTipoOrden: this.nomb,
      urlServicioOrigen: this.urlSO
    };
    this._TipoOrdenService.insertTipoOrden(this.paramInsert)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);

          this.getTipoOrdenURL();
          this.nomb = "";
          this.urlSO = "";
          this.id = null;
          this.formDirective.resetForm();

        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        });
  }

  private listEdit = { idTipoOrden: null, descripcionTipoOrden: null, urlServicioOrigen: null };

  private edit(tipoOrden) {
    this.id = tipoOrden.idTipoOrden;
    this.nomb = tipoOrden.descripcionTipoOrden;
    this.urlSO = tipoOrden.urlServicioOrigen;
    this.flbotones = false;
  }

  private editarTipoOrden(_form: any) {
    this.listEdit = {
      idTipoOrden: this.id,
      descripcionTipoOrden: this.nomb,
      urlServicioOrigen: this.urlSO
    };

    this._TipoOrdenService.actualizarTipoOrden(this.listEdit)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.nomb = "";
          this.urlSO = "";
          this.id = null;
          this.formDirective.resetForm();
          this.flbotones = true;
          this.getTipoOrdenURL();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.log(error);
        },
        () => {
        }
      );
  }

  modalDeleteTipoOrden(tipoOrden): void {
    const dialogRef = this.dialog.open(EliminarTipoOrdenComponent, {
      autoFocus: false,
      maxWidth: '90%',
      maxHeight: '95%',
      disableClose: true,
    });
    dialogRef.componentInstance.idTipoOrden = tipoOrden.idTipoOrden;
    dialogRef.componentInstance.descripcionTipoOrden = tipoOrden.descripcionTipoOrden;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getTipoOrdenURL();
    });
  }

  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
}
