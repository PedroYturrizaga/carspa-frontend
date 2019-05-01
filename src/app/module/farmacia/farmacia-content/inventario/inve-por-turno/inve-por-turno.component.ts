import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { InventarioService } from '../../../services/inventario.service';
import { VisualizarInventarioComponent } from './visualizar-inventario/visualizar-inventario.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { getIdUsuario } from '../../../../../shared/auth/storage/cabecera.storage';

@Component({
  selector: 'app-inve-por-turno',
  templateUrl: './inve-por-turno.component.html',
  styleUrls: ['./inve-por-turno.component.scss']
})
export class InvePorTurnoComponent implements OnInit {

  displayedColumnsInventarios = ['numeroInventario', 'Fecha', 'Hora', 'Estado', 'Accion'];
  dataSource = new MatTableDataSource();

  private idAlmacen = null;
  // private tipoAlmacen = null;
  // private descripAlmacen = null;

  // private _params = { idAlmacen: null, descripcionPersonal: null };
  private flgMostar: boolean = false;
  private params = { idAlmacen: null, numeroInventario: null, feDesde: null, feHasta: null };
  private tomaInveRequest = { inventario: { personalAnterior: { idPersonal: null }, almacen: { idAlmacen: null } } };
  private inventarioList: any[] = [];
  private personalList: any[] = [];
  private idInventario: any = null;
  private feDesde: Date = null;
  private feHasta: Date = null;
  private varAnaquelFiltrar: boolean;
  private varEstado = "";
  constructor(
    private _inventarioService: InventarioService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      // this.tipoAlmacen = params["tipoAlmacen"];
      // this.descripAlmacen = params["descripAlmacen"];
    });
  }

  ngOnInit() {
    this.tomaInveRequest.inventario.personalAnterior.idPersonal = getIdUsuario();
    // this._params.idAlmacen = this.idAlmacen;
    this.tomaInveRequest.inventario.almacen.idAlmacen = this.idAlmacen;
    this.getInventariosByAlmacen();
    // this.getPersonalByAlmacen();
  }

  private tomarInventario() {
    this.varAnaquelFiltrar = true;
    if (this.tomaInveRequest.inventario.personalAnterior.idPersonal != null && this.tomaInveRequest.inventario.personalAnterior.idPersonal != "" && this.tomaInveRequest.inventario.personalAnterior.idPersonal != undefined) {

      this.insertInventarioByTurnoPromise().then((estado) => {
        // console.log(estado);
        if (estado != 0) {
          this.flgMostar = true;
          // this.idInventario = 
        } else {
          this.flgMostar = false;
        }
      });
    } else {
      this.toastr.warning("Debe seleccionar un personal");
      return;
    }
    console.log(this.flgMostar);
    console.log(this.idInventario);

  }

  private cambiarFlag(flgRecibido) {
    this.flgMostar = flgRecibido;
    this.getInventariosByAlmacen();
  }

  private insertInventarioByTurnoPromise() {
    console.log(this.tomaInveRequest)
    let promise = new Promise((resolve, reject) => {
      this._inventarioService.insertInventarioByTurno(this.tomaInveRequest)
        .toPromise().then(data => {
          console.log(data)
          if (data.flgCerrado == 1) {
            this.modalVisualizarInventario(data.confirmacion.id, 'C')
          } else {
            if (data.estado == 1) {
              this.idInventario = data.confirmacion.id;
            } else {
              this.toastr.error(data.mensaje);
            }
            resolve(data.estado);
          }
        },
          err => {
            console.log(err);
          })
    })
    return promise
  }
  private modalVisualizarInventario(idInventario, estadoInventario) {
    if (estadoInventario == "C" || estadoInventario == "R") {
      this.varAnaquelFiltrar = true;
      // const modalRef = this.modalService.open(VisualizarInventarioComponent, { size: 'lg', backdrop: 'static', keyboard: false });
      // modalRef.componentInstance.idInventario = idInventario;
      // modalRef.result.then((result) => {
      //   // this.getComprobanteFarmacia();
      // }, (reason) => {
      //   // this.getComprobanteFarmacia();
      // });
      const dialogRef = this.dialog.open(VisualizarInventarioComponent, {
        autoFocus: false,
        width: '90%',
        maxWidth: '90%',
        maxHeight: '95%',
        disableClose: true
      });
      dialogRef.componentInstance.idInventario = idInventario;
      dialogRef.afterClosed().subscribe(result => { });
    }
    else {
      this.idInventario = idInventario;
      this.flgMostar = true;
    }
  }

  private getInventariosByAlmacen() {
    this.params.idAlmacen = this.idAlmacen;
    if (this.params.idAlmacen != null && this.params.idAlmacen != "" && this.params.idAlmacen != undefined) {
      if (this.params.numeroInventario == "") {
        this.params.numeroInventario = null;
      }

      if (this.feDesde != null && this.feHasta != null) {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        this.params.feDesde = ((this.feDesde).toLocaleDateString('es-PE', options)).split('/').join('-');
        this.params.feHasta = ((this.feHasta).toLocaleDateString('es-PE', options)).split('/').join('-');
      }
      console.log(this.params)
      this._inventarioService.getInventariosByAlmacen(this.params)
        .subscribe(data => {
          if (data.estado == 1) {
            console.log('trae todo esto', data.inventarioList)
            this.inventarioList = data.inventarioList;
            console.log(this.inventarioList);
            this.dataSource = new MatTableDataSource(this.inventarioList);

            console.log("el estado es", this.inventarioList)

            // for()
            // if (this.inventarioList.estadoInventario = "R") {
            //   this.varEstado == "Regularizado"

            // }
            // if (this.inventarioList.estadoInventario = "C") {
            //   this.varEstado == "Cerrado"
            // }
            // if (this.inventarioList.estadoInventario = "A") {
            //   this.varEstado == "Abierto"
            // }
            console.log("mi varEstado es", this.varEstado)
            // this.inventarioList.push(this.varEstado);
            
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
  }

  // private getPersonalByAlmacen() {
  //   this._inventarioService.getPersonalByAlmacen(this._params)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.personalList = data.personalList;
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       error => {
  //         this.toastr.error(error);
  //         return Observable.throw(error);
  //       }),
  //     err => this.toastr.error(err),
  //     () => this.toastr.success('Request Complete');
  // }
private validarCantidadEquivalencia(){

}

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  private limpiarCampos(_ngForm: any) {
    this.params.feDesde = null;
    this.params.feHasta = null;
    _ngForm.reset();
  }
}
