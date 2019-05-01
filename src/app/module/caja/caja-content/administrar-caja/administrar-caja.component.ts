import { element } from 'protractor';
import { CrearCajaComponent } from './crear-caja/crear-caja.component';
import { AreaService } from './../../../maestras/services/area.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatSelectionList, MatSelect } from '@angular/material';
import { truncate } from 'fs';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Request } from '@angular/http';
import { AdministrarCajaService } from '../../services/administrar-caja.service';
 
@Component({
  selector: 'app-administrar-caja',
  templateUrl: './administrar-caja.component.html',
  styleUrls: ['./administrar-caja.component.scss']
})
export class AdministrarCajaComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['Nombre', 'Area Fisica', 'Tipo Orden de Pago', 'estado', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource();
  private requestParam = { idArea: null, idAreaCobro: null, tipoOrden: null, idCaja: null, tipoestado: null };
  private LsCaja = [];
  private LsAreaFisica = [];
  private LsAreaCobro = [];
  private LsTipoOrdenPago = [];
  private LsCajaDescripcion = [];
  private requestArea = { descripcionArea: null, numPagina: 1, numRegisMostrar: 1000 };
  private requestAreaCobro = { descripcionArea: null, numPagina: 1, numRegisMostrar: 1000 };
  private requestTipoOrdenPago = { descripcionTipoOrdenPago: null };
  private requestCajaDescripcion = { descripcionCaja: null };
  private requestBoton = { idCaja: null, descripcionCaja: null, abreviatura: null, idArea: null, tipoOrdenSeleccionado: null, estado: null };
  //Paginacion
  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;

  //ComboCheck
  toppings = new FormControl();

  //ColorButton
  private flbotones: boolean = true;


  constructor(public _AdministrarCajaService: AdministrarCajaService,
    public _area: AreaService,

    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.obtenerCaja(1);
    this.obtenerArea();
    this.obtenerAreaCobro();
    this.obtenerTipoOrdenPago();
    this.obtenerCajaDescripcion();
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerCaja();
  }

  private obtenerCaja(numPagina?: any) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.requestParam).forEach(key => {
      this.requestParam[key] = (this.requestParam[key] === '') ? null : this.requestParam[key];
    });

    this.requestParam = {
      ...this.requestParam,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.requestParam);
    this._AdministrarCajaService.getCaja(this.requestParam)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {

          this.LsCaja = data.cajaList;
          console.log(this.LsCaja);
          for (let x of this.LsCaja) {
            x['color'] = x['tipoestado'] == 1 ? 'primary' : 'warn';
          }
          this.dataSource = new MatTableDataSource(this.LsCaja);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.LsCaja.length > 0) {
            this.pagination.nuRegisMostrar = this.LsCaja[0].nuTotalReg;
          }
          this.requestParam = {
            idArea: null, idAreaCobro: null, tipoOrden: null, idCaja: null, tipoestado: null
          };
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private obtenerArea() {

    this._area.getAreas(this.requestArea)
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsAreaFisica = data.areaList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
      error => {
        console.error(error);
      });
  }

  private obtenerAreaCobro() {

    this._area.getAreas(this.requestAreaCobro)
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsAreaCobro = data.areaList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
      error => {
        console.error(error);
      });
  }
  private obtenerTipoOrdenPago() {

    this._AdministrarCajaService.getTipoOrdenPago()
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsTipoOrdenPago = data.tipoOrdenList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
      error => {
        console.error(error);
      });
  }

  private obtenerCajaDescripcion() {

    this._AdministrarCajaService.getCajaDescripcion()
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsCajaDescripcion = data.cajaList;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
      error => {
        console.error(error);
      });
  }

  crearCaja() {
    const dialogRef = this._modalDialog.open(CrearCajaComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '900px',
     // maxHeight: '60%',
     // height: '1000px',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.flag=1
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerCajaDescripcion();
        this.obtenerCaja(1);
      }
    });
  }

  public editarCaja(element) {
    const dialogRef = this._modalDialog.open(CrearCajaComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '900px',
     // height: '450px',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.flag=2
    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerCajaDescripcion();
        this.obtenerCaja(1);
      }

    }
    );
  }

  eliminar(element) {
    console.log(element);

    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '50%',
      maxHeight: '80%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Esta seguro que desea eliminar la " + element.descripcionCaja + "?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._AdministrarCajaService.deleteCaja(element.idCaja)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.obtenerCaja(1);
            } else {
              this.toastr.error("No se puede eliminar la " + element.descripcionCaja + " porque esta en uso");
            }
          },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
          err => this.toastr.error(err),
          () => this.toastr.success('Request Complete');
        this.requestParam.idCaja = null;
        this.obtenerCaja(1);

      }
    });
  }


  private actualizar(lista) {

    console.log(lista);
    console.log(this.requestBoton);
    this.requestBoton.idCaja=lista.idCaja;
    this.requestBoton.descripcionCaja=lista.descripcionCaja;
    this.requestBoton.estado = lista.tipoestado;
    if (this.requestBoton.estado == 0) {
      this.requestBoton.estado = 1;
    }
    console.log(this.requestBoton);
    this._AdministrarCajaService.updateCaja(this.requestBoton)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(this.requestBoton);
          this.toastr.success(data.mensaje);
          this.obtenerCaja();
          console.log(data.mensaje);
          //  this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      }
      ,
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
      this.obtenerCaja(1);
  }

}
