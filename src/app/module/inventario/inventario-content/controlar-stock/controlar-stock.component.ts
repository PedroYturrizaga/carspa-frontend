import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { AdministrarMaterialService } from "../../administrar-material.service";
import { ToastsManager } from "ng2-toastr/src/toast-manager";
import { MatDialog } from "@angular/material/dialog";
import { OrdenPedidoComponent } from "./orden-pedido/orden-pedido.component";
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-controlar-stock',
  templateUrl: './controlar-stock.component.html',
  styleUrls: ['./controlar-stock.component.scss']
})
export class ControlarStockComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material', 'marca', 'cantidad', 'sm', 'smi', 'pp', 'alerta'];
  dataSource = new MatTableDataSource();
  private show = 0;
  private lsMateriales = [];
  private requestListar = { nombre: null, estado: 1 };
  private request = { idMaterial: 0 }
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _materialService: AdministrarMaterialService,
    private toastr: ToastsManager,
    private dialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getMateriales(1);
    }
  }
  private pageEvent($event) {
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMateriales();
  }
  private getMateriales(nuPagina?: number) {
    let b = 0;
    let p = 0;
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
        this.show=0;
        this.dataSource = new MatTableDataSource(this.lsMateriales);
        this.lsMateriales.forEach(element => {
          if (element["idAlerta"] == 1) {
            b++;
          }
          if (element["idAlerta"] == 2) {
            p++;
          }
        });
        if (b > 0) {
          this.toastr.warning("Hay " + b + " material(es) con Bajo Stock.");
          this.show = 1;
        }
        if (p > 0) {
          this.toastr.info("Hay " + p + " material(es) en Punto de pedido.");
          this.show = 1;
        }

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
  private modalEdit() {
    const dialogRef = this.dialog.open(OrdenPedidoComponent, {
      autoFocus: false,
      width:'90%',
      height:'90%',
      maxHeight:'95%',
      disableClose: false,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getMateriales();
      }
      this.getMateriales();
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

  ngOnInit() {
    this.getMateriales();
  }

}
