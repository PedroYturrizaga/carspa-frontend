import { log } from 'util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AdministrarMaquinariaService } from '../../administrar-maquinaria.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MaquinariasInactivoComponent } from './maquinarias-inactivo/maquinarias-inactivo.component';
import { RegistrarActualizarComponent } from '../administrar-material/registrar-actualizar/registrar-actualizar.component';
import { RegistActuaComponent } from './regist-actua/regist-actua.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-administrar-maquinaria',
  templateUrl: './administrar-maquinaria.component.html',
  styleUrls: ['./administrar-maquinaria.component.scss']
})
export class AdministrarMaquinariaComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['codigo', 'material', 'marca', 'fecha','compra','precio', 'ubicacion', 'ver', 'edit', 'eliminar'];
  dataSource = new MatTableDataSource();
  private lsmaquinarias = [];
  private today = new Date();
  private requestListar = { nombre: null, estado: 1 }
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  constructor(private _maquinariaService: AdministrarMaquinariaService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    private calendar: NgbCalendar, ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }
  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getMaquinarias(1);
    }
  }
  private pageEvent($event) {
    // this.paginationParameter.nuPagina = event.pageIndex;
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getMaquinarias();
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
      nuRegisMostrar: 10000
    };
    this._maquinariaService.getMaquinarias(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsmaquinarias = data.maquinarias;
        this.dataSource = new MatTableDataSource(this.lsmaquinarias);
        this.lsmaquinarias.forEach(element => {
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
        if (this.lsmaquinarias.length > 0) {
          this.pagination.nuRegisMostrar = this.lsmaquinarias[0].nuTotalReg;
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
  private getMaquinarias(nuPagina?: number) {
    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.requestListar).forEach(key => {
      this.requestListar[key] = (this.requestListar[key] === '') ? null : this.requestListar[key];
    });
    this.requestListar = {
      ...this.requestListar,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._maquinariaService.getMaquinarias(this.requestListar).subscribe(data => {
      if (data.estado == 1) {
        this.lsmaquinarias = data.maquinarias;
        console.log(this.lsmaquinarias);
        
        this.dataSource = new MatTableDataSource(this.lsmaquinarias);
        if (this.matPag) {
          this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
        }
        if (this.lsmaquinarias.length > 0) {
          this.pagination.nuRegisMostrar = this.lsmaquinarias[0].nuTotalReg;
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
  private anularMaquinaria(e) {
    let request = { idMaquinaria: e };
    this._maquinariaService.anularMaquinaria(request).subscribe(data => {
      console.log(data);
      if (data.estado == 1) {
        this.toastr.success("Se anuló la maquinaria");
        this.getMaquinarias();

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
  private modalelementDelete(e) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '40%',
      maxHeight: '50%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea anular la maquinaria '" + e.nombre + "' ?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.anularMaquinaria(e.idMaquinaria);
      }
    });

  }
  private modalInactivos() {
    const dialogRef = this.dialog.open(MaquinariasInactivoComponent, {
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
        this.getMaquinarias();
      }
    });

  }
  private modalabrir(op, e?) {
    const dialogRef = this.dialog.open(RegistActuaComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    console.log(e);

    dialogRef.componentInstance.e = e;
    dialogRef.componentInstance.op = op;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getMaquinarias();
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

  ngOnInit() {
    this.aviso();
    this.getMaquinarias(); 

    $('.pruebon').click(function() {
    $('.todaspartes').addClass('vete');
    $('.colorMenu3').addClass('vete');
    });
  }

}
