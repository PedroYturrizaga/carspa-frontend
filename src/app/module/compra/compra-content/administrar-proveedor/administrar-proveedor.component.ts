import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AdministrarProveedorService } from '../../administrar-proveedor.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-administrar-proveedor',
  templateUrl: './administrar-proveedor.component.html',
  styleUrls: ['./administrar-proveedor.component.scss']
})
export class AdministrarProveedorComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material', 'marca', 'fecha', 'ubicacion', 'ver', 'edit', 'eliminar'];
  dataSource = new MatTableDataSource();
  private lsproveedores = [];
  private today = new Date();
  private requestListar = { nombre: null, estado: 1 }
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _proveedorService: AdministrarProveedorService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    private calendar: NgbCalendar, ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }
  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getProveedores(1);
    }
  }
  private pageEvent($event) {
    // this.paginationParameter.numPagina = event.pageIndex;
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getProveedores();
  }
  private aviso(nuPagina?: number) {
    let fecha;
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    fecha = ((this.today).toLocaleDateString('zh-Hans-CN', options)).split('/').join('-');
    console.log(fecha);

    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.requestListar).forEach(key => {
      this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
    });
    this.requestListar = {
      ...this.requestListar,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._proveedorService.getProveedores(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsproveedores= data.maquinarias;
        this.dataSource = new MatTableDataSource(this.lsproveedores);
        this.lsproveedores.forEach(element => {
          if (element["fechaMantenimiento"] == fecha) {
            let maquina = element["nombre"];
            let marca = element["marca"];
            this.toastr.info("El mantenimiento de la máquina " + maquina + " de la marca " + marca + " es hoy")
              ;
          }
        });
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
    this._proveedorService.getProveedores(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsproveedores = data.maquinarias;
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
    this.aviso();
    this.getProveedores();
  }

}
