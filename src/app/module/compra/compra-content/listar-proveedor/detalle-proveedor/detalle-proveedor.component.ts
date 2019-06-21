import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../../shared/services/data.service';
import { CompraService } from './../../services/compra.service';
import { RegistrarActualizarMpComponent } from '././registrar-actualizar-mp/registrar-actualizar-mp.component';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent implements OnInit {

  @Input() e;
  @Input() op;

  @Output() regresa = new EventEmitter<boolean>();
  private idProveedor;
  @ViewChild(MatPaginator) matPag: MatPaginator;
  private lsproveedores = [];
  private lsmaterialesproveedores = [];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  private requestListar = { idProveedor: null, nombreProveedor: null };

  displayedColumns = ['nombre', 'telefono', 'email', 'contacto', 'direccion', 'ruc', 'tpago'];

  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];


  private requestListarM = { idMaterialProveedor: null, idProveedor: null , nombre:null};
  displayedColumns2 = ['nombre', 'marca', 'codigomp', 'umedida', 'pcompra', 'fconversion','edit'];

  private pageSize2: number;
  private pagination2: any;
  private displayedSizes2: number[];


  constructor(
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private _compraService: CompraService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService,

  ) {
    this._route.queryParams.subscribe(params => {
      this.idProveedor = params["idProveedor"];
    });
    console.log(this.idProveedor);
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];

    this.pagination2 = { nuPagina2: 1, nuRegisMostrar2: 0 };
    this.displayedSizes2 = [10, 15, 25, 100];
    this.pageSize2 = this.displayedSizes2[0];




  }


 



  ngOnInit() {
    this.requestListarM.idProveedor = this.idProveedor;
    this.requestListar.idProveedor = this.idProveedor;
    this.getProveedores(1);
    this.getMaterialesProveedores(1);

  }




  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getMaterialesProveedores(1);
    }
  }


 


  private pageEvent($event) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;

    this.pagination2.nuPagina = $event.pageIndex + 1;
    this.pageSize2 = $event.pageSize;
    this.getProveedores();
    this.getMaterialesProveedores();

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




  private getMaterialesProveedores(nuPagina2?: number) {
    this.pagination2.nuPagina2 = (nuPagina2) ? nuPagina2 : this.pagination2.nuPagina;

    Object.keys(this.requestListarM).forEach(key => {
      this.requestListarM[key] = (this.requestListarM[key] === '') ? null : this.requestListarM[key];
    });
    this.requestListarM = {
      ...this.requestListarM,
      ...this.pagination2,
      nuRegisMostrar2: this.pageSize2
    };
    console.log(this.requestListarM)
    this._compraService.getMaterialProveedor(this.requestListarM).subscribe(data => {
      if (data.estado == 1) {
        this.lsmaterialesproveedores = data.materialproveedorList;
        console.log(this.lsmaterialesproveedores);

        this.dataSource2 = new MatTableDataSource(this.lsmaterialesproveedores);
        if (this.matPag) {
          this.matPag._pageIndex = (nuPagina2) ? nuPagina2 - 1 : this.matPag._pageIndex;
        }
        if (this.lsmaterialesproveedores.length > 0) {
          this.pagination2.nuRegisMostrar2 = this.lsmaterialesproveedores[0].nuTotalReg;
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
    const dialogRef = this.dialog.open(RegistrarActualizarMpComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    console.log(e);

    dialogRef.componentInstance.e = e;
    dialogRef.componentInstance.op = op;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getMaterialesProveedores();
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
