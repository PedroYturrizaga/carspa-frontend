
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from './../services/compra.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../../../shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-orden-compra',
  templateUrl: './listar-orden-compra.component.html',
  styleUrls: ['./listar-orden-compra.component.scss']
})




export class ListarOrdenCompraComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  private requestListar = { idProveedor: null, nombreProveedor: null };
  private lsEstado: any = [];
  private lsproveedores=[];
  displayedColumns = ['codigo', 'fecha', 'cantidad', 'subtotal','total' ,'nombrematerial' , 'nombreproveedor',''];
  private ordenescomprasAUX: any = [];
  dataSource = new MatTableDataSource();
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private proveedorDisabled: boolean = true;

  dataPassed: any;
  subscription: Subscription;

  constructor( private _compraService: CompraService,
    private toastr: ToastsManager,
    private ds: DataService,
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute) {



      this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
      this.displayedSizes = [10, 15, 25, 100];
      this.pageSize = this.displayedSizes[0];

     }

  ngOnInit() {
  }

}
