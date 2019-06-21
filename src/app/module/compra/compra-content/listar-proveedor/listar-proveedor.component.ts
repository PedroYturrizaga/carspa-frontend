import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from './../services/compra.service';
import { Observable } from 'rxjs/Observable';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { RegistrarActualizarComponent } from './registrar-actualizar/registrar-actualizar.component';
import { Subscription } from 'rxjs';
import { DataService } from '../../../../shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.scss']
})
export class ListarProveedorComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  private requestListar = { idProveedor: null, nombreProveedor: null };
  private lsEstado: any = [];
  private lsproveedores=[];
  displayedColumns = ['nombre', 'telefono', 'email','contacto' ,'ver', 'edit'];
  private proveedoresAUX: any = [];
  dataSource = new MatTableDataSource();
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private proveedorDisabled: boolean = true;

  dataPassed: any;
  subscription: Subscription;


  constructor(
    private _compraService: CompraService,
    private toastr: ToastsManager,
    private ds: DataService,
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) 
  
  {

    this.subscription = this.ds.getData().subscribe(x => {
      this.dataPassed = x;
      if (this.dataPassed == 'vuelve') {
        this.proveedorDisabled = true;
        this.ngOnInit();
      }
    });

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  
  ngOnInit() {
    this.getProveedores();
    this.proveedorDisabled = true;
    
  }


  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getProveedores(1);
    }
  }
  

 

  private pageEvent($event) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getProveedores();

  }


  private getProveedores(nuPagina?: number) {
    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.requestListar).forEach(key => {
      this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
    });
    this.requestListar = {
      ...this.requestListar,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._compraService.getProveedor(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsproveedores = data.proveedorList;
        console.log(this.lsproveedores);
        
        this.dataSource = new MatTableDataSource(this.lsproveedores);
        if (this.matPag) {
          this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
        }
        if (this.lsproveedores.length > 0) {
          this.pagination.nuRegisMostrar = this.lsproveedores[0].nuTotalReg;
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


  private modalabrir(op, e?) {
    const dialogRef = this.dialog.open(RegistrarActualizarComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    console.log(e);

    dialogRef.componentInstance.e = e;
    dialogRef.componentInstance.op = op;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getProveedores();
      }
    });
  }


  regresa(param: boolean) {
    this.proveedorDisabled = true;
  }

  private idProveedor: any = null;

  redirige(idProveedor) {
    this.idProveedor = idProveedor;
    this.proveedorDisabled = false;
    this._router.navigate(['/principal/compra/listar-proveedor/detalle-proveedor'], { queryParams: { 'idProveedor': this.idProveedor } });
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
