import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { SolicitudCotizacionService } from '../../services/solicitud-cotizacion.service';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.scss']
})
export class VerSolicitudComponent implements OnInit {

  @ViewChild('DetalleSolicitudForm') private _etalleSolicitudForm: NgForm;
  @Input() SolicitudCotizacion;

  displayedColumnsSolicitudesProveedor = ['codigo', 'nombreProveedor', 'estado', 'ver', 'cotizacion'];
  dataSourceSolicitudesProveedor = new MatTableDataSource();

  displayedColumnsSolicitudesProveedorDetalle = ['codMatProv', 'nombre', 'marca', 'cantidadCompra'];
  dataSourceSolicitudesProveedorDetalle = new MatTableDataSource();

  private SolicitudProveedorList = [];
  private SolicitudProveedorDetalleList = [];

  private SolicitudCotizacionDetalle = [];

  private flgProveedor: boolean = true;

  private paramsBusqueda: any = { idSolicitudCotizacion: null }

  private temp: any;
  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _solicitudCotizacionService: SolicitudCotizacionService) { }

  ngOnInit() {
    this.paramsBusqueda.idSolicitudCotizacion = this.SolicitudCotizacion.idSolicitudCotizacion
    this.getProveedorCabecera();
    console.log(this.paramsBusqueda);

  }

  backTo() {
    this.flgProveedor = true;
  }


  getProveedorCabecera() {

    this._solicitudCotizacionService.getSolicitudesCabeceraProveedor(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.SolicitudProveedorList = data.solicitudcotizacionlist;
          this.dataSourceSolicitudesProveedor = new MatTableDataSource(this.SolicitudProveedorList);
        } else if (data.estado == 0) {
          this.SolicitudProveedorList = [];
          this.dataSourceSolicitudesProveedor = new MatTableDataSource(this.SolicitudProveedorList);
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }

  visualizarDetalleSolictud(datos) {

    this._solicitudCotizacionService.getSolicitudesProveedorDetalle(datos)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.flgProveedor = false;
          this.SolicitudProveedorDetalleList = data.solicitudproveedordetallelist;
          this.displayedColumnsSolicitudesProveedorDetalle = ['codMatProv', 'nombre', 'marca', 'cantidadCompra'];
          this.dataSourceSolicitudesProveedorDetalle = new MatTableDataSource(this.SolicitudProveedorDetalleList);
        } else if (data.estado == 0) {
          this.SolicitudProveedorList = [];
          this.dataSourceSolicitudesProveedorDetalle = new MatTableDataSource(this.SolicitudProveedorDetalleList);
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
          if (this.flg) {
            this.flgProveedor = true;
            this.flg = false;
          }
        });
  }

  private flg: boolean = false;
  generarCotizacion(element) {
    console.log(element)
    let data = { idSolicitudProveedor: element.idSolicitudProveedor };
    this._solicitudCotizacionService.postGenerarCotizacion(data)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.toastr.success("Cotizacion Generada", "Exitoso");
          this.flg = true;
          this.visualizarDetalleSolictud(element);
          
        } else if (data.estado == 0) {
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }


  visualizarCotizacionDetalle(_data) {
    this.temp = _data;
    this._solicitudCotizacionService.getCotizacionDetalle(_data)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.flgProveedor = false;
          this.SolicitudCotizacionDetalle = data.cotizacionproveeedordetalleList;
          this.displayedColumnsSolicitudesProveedorDetalle = ['codMatProv', 'nombre', 'marca', 'cantidadCompra', 'precioUnit'];

          this.dataSourceSolicitudesProveedorDetalle = new MatTableDataSource(this.SolicitudCotizacionDetalle);
        } else if (data.estado == 0) {
          this.SolicitudCotizacionDetalle = [];
          this.dataSourceSolicitudesProveedorDetalle = new MatTableDataSource(this.SolicitudCotizacionDetalle);
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }

  insertarCotizacion() {
    let datos = {
      idCotizacionProveedorDetalle: this.obtenerConcat(this.SolicitudCotizacionDetalle, 'idCotizacionProveedorDetalle'),
      precios: this.obtenerConcat(this.SolicitudCotizacionDetalle, 'precioUnit')
    }
    console.log(datos)

    this._solicitudCotizacionService.postPreciosCotizacion(datos)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.flgProveedor;
          this.toastr.success("Cotizacion Generada", "Exitoso");
          this.visualizarDetalleSolictud(this.temp);
          this.flgProveedor = true;
        } else if (data.estado == 0) {
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
          this.temp = null;
        });
  }

  obtenerConcat(_array: any, _item: any) {
    let concatenado = ''
    _array.map((_it, _id) => {
      if (_id == 0) {
        concatenado = '{' + _it[_item];
      } else if (_id == _array.length - 1 && _array.length === 2) {
        concatenado = concatenado + ',' + _it[_item] + '}';
      } else if (_id == _array.length - 1) {
        concatenado = concatenado + ',' + _it[_item] + '}';
      } else {
        concatenado = concatenado + ',' + _it[_item];
      }
    })
    return concatenado;
  }


  // 
  /*----------------------------------
  ----------- Validaciones -----------
  -----------------------------------*/

  private cleanForm(_controlVar: any) {
    _controlVar.resetForm();
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

