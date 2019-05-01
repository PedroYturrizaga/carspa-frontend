import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { ToastsManager, Toast } from 'ng2-toastr';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import { MovimientoService } from '../../../../services/movimiento.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-nuevo-requerimiento',
  templateUrl: './nuevo-requerimiento.component.html',
  styleUrls: ['./nuevo-requerimiento.component.scss']
})
export class NuevoRequerimientoComponent implements OnInit {

  displayedColumnsSolicitudes = ['codigo', 'DCI', 'formaFarma', 'presentacion', 'marca', 'unidad', 'cantidad', 'accion'];
  dataSource = new MatTableDataSource();

  @Input() idAlmacen;
  private date: any;
  private position = 'above';
  private showInput = 0;
  private showInfo = 1;
  private arrayInsertMedicamento: any[] = [];
  private dispMedicosProdSanit: any[] = [];
  private medicamentos: any[] = [];
  private medicamento: any;
  private sugerencia: any;
  private flgServicio = null;
  private flgInserta = 0;
  private descMediMate = null;
  private requerimientoRequest = { comprobanteFarmacia: { almacenOrigen: { idAlmacen: null }, comprobanteFarmaciaDetalleList: [] } }
  private cabeceraAlmacenHijoPadre = { descripcionAlmacenHijo: null, descripcionAlmacenPadre: null };
  private jsonDataMedicDisp = { cantidad: null, stock: null, cpm: null, unidMed: null, stockTotal: null };
  private medicamentoAux = null;
  private i = 0;
  private unidadMedida = [];


  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<NuevoRequerimientoComponent>
  ) { }

  filterMediMate(val: any) {
    this.borrarLabels();
    return val ? this._filter(this.medicamentos, val) : [];
  }
  private _filter(medicamentos: any, val: string) {
    const filterValue = val.toLowerCase();
    return medicamentos.filter(value => value.dciProductoFarmaceutico.toLowerCase().startsWith(filterValue));
  }

  filterDispMed(val: any) {
    this.borrarLabels();
    return val ? this.__filter(this.dispMedicosProdSanit, val) : [];
  }
  private __filter(dispMedicosProdSanit: any, val: string) {
    const filterValue = val.toLowerCase();
    return dispMedicosProdSanit.filter(value => value.dciDispMedicoProdSanitario.toLowerCase().startsWith(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.requerimientoRequest.comprobanteFarmacia.almacenOrigen.idAlmacen = this.idAlmacen;
    this.getAlmacenPadre();
    this.date = (new Date()).toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  private getMedicamentoMaterial() {
    this.showInfo = 1;
    this.descMediMate = null;
    if (this.flgServicio == undefined) {
      this.flgServicio = 0;
    }
    if (this.flgServicio == 1) {
      this.getMedicamentosByBusqueda();
    } else if (this.flgServicio == 2) {
      this.getDispMedicoByBusqueda();
    }
  }

  private getMedicamentosByBusqueda() {
    this._movimientoService.getMedicamentosByBusqueda(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicamentos = data.medicamentoList;
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

  private getDispMedicoByBusqueda() {
    this._movimientoService.getDispMedicoByBusqueda(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.dispMedicosProdSanit = data.dispMedicoProdSanitarioList;
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

  private seleccionaMedicamentoMaterial(even, medicamentoMaterial) {
    let promise = new Promise((resolve, reject) => {
      console.log(medicamentoMaterial);
      this.medicamentoAux = null;
      medicamentoMaterial.dciDispMedicoProdSanitario ?
        this.medicamentoAux = medicamentoMaterial.dciDispMedicoProdSanitario : (medicamentoMaterial.dciProductoFarmaceutico ? this.medicamentoAux = medicamentoMaterial.dciProductoFarmaceutico : this.medicamentoAux = null);
      this.showInfo = 2;
      this.medicamento = medicamentoMaterial;
      if (even.isUserInput) {
        // this.jsonDataMedicDisp.stock = medicamentoMaterial.stock;
        this.jsonDataMedicDisp.stockTotal = medicamentoMaterial.stockTotal;
        this.jsonDataMedicDisp.cpm = medicamentoMaterial.cpm;
        if (this.jsonDataMedicDisp.cpm != null && this.jsonDataMedicDisp.cpm != 0) {
          //  this.sugerencia = (1.1 * this.jsonDataMedicDisp.cpm - medicamentoMaterial.stockTotal);
        }
      }
    })
    if (medicamentoMaterial.idMedicamento == undefined || medicamentoMaterial.idMedicamento == null) {
      this.getUnidadMedicamentoDispositivo(null, medicamentoMaterial.idDispMedicoProdSanitario);
    } else {
      this.getUnidadMedicamentoDispositivo(medicamentoMaterial.idMedicamento, null);
    }
    return promise
  }

  private borrarLabels() {
    if (this.descMediMate == null || this.descMediMate == '' || this.descMediMate == undefined) {
      // this.jsonDataMedicDisp.stock = null;
      this.jsonDataMedicDisp.stockTotal = null;
      this.jsonDataMedicDisp.cpm = null;
      this.sugerencia = null;
      this.showInfo = 1;
      this.medicamentoAux = null;
    }
  }
  private AgregarMedicamentoMaterial(_controlVar: any) {
    if (isInvalid(_controlVar)) {
      return;
    }

    this.medicamento.cantidad = this.jsonDataMedicDisp.cantidad;
    this.medicamento.unidadJson = this.jsonDataMedicDisp.unidMed;

    if (this.medicamento.idDispMedicoProdSanitario !== null && this.medicamento.idMedicamento == null) {
      this.medicamento.tipoDispositivo = this.dispMedicosProdSanit[0].tipoDispositivo;
    }

    if (this.arrayInsertMedicamento.length > 0) {
      for (let i of this.arrayInsertMedicamento) {
        if (i.idMedicamento != undefined && this.medicamento.idMedicamento != undefined) {
          if (i.idMedicamento == this.medicamento.idMedicamento) {
            this.toastr.error("Ya agrego este medicamento");
            _controlVar.reset();
            return;
          }
        } else {
          if (i.idDispMedicoProdSanitario == this.medicamento.idDispMedicoProdSanitario) {
            this.toastr.error("Ya agrego este dispositivo médico o producto sanitario");
            _controlVar.reset();
            return;
          }
        }
      }
    }
    this.arrayInsertMedicamento.push(this.medicamento);
    this.dataSource = new MatTableDataSource(this.arrayInsertMedicamento);
    this.medicamento = [];
    this.showInfo = 1;
    this.medicamentoAux = null
    _controlVar.reset();
    this.medicamentos = [];
    this.dispMedicosProdSanit = [];
  }

  private insertarDetalleComproFarmacia() {
    if (this.flgInserta == 0) {
      let params: any;
      for (let i of this.arrayInsertMedicamento) {
        params = { cantidad: null };
        if (i.idMedicamento != null && i.idMedicamento != undefined) {
          params.medicamento = { idMedicamento: i.idMedicamento };
        }
        if (i.idDispMedicoProdSanitario != null && i.idDispMedicoProdSanitario != undefined) {
          params.dispMedicoProdSanitario = { idDispMedicoProdSanitario: i.idDispMedicoProdSanitario };
        }
        params.cantidad = i.cantidad;
        params.idUnidad = i.unidadJson.idUnidad;
        this.requerimientoRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.push(params);
      }
      if (this.requerimientoRequest.comprobanteFarmacia.comprobanteFarmaciaDetalleList.length > 0) {
        this._movimientoService.insertDetalleCompFarmacia(this.requerimientoRequest)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
            } else {
              this.toastr.error(data.mensaje);
            }
            return true;
          },
            err => { this.toastr.error(err) },
            () => {
              this.dialogRef.close();
            });
        this.flgInserta = 1;
      }
      else {
        this.toastr.warning("Tabla vacia, por favor registrar solicitud");
      }
    }
  }

  private deleteMedicamento(idMedicamento) {
    let index = 0;
    for (let i = 0; i < this.arrayInsertMedicamento.length; i++) {
      if (this.arrayInsertMedicamento[i].idMedicamento == idMedicamento) {
        index = i;
      }
    }
    this.arrayInsertMedicamento.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.arrayInsertMedicamento);
  }

  private getAlmacenPadre() {
    this._movimientoService.getAlmacenPadre(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraAlmacenHijoPadre.descripcionAlmacenHijo = data.almacen.descripcionAlmacen;
          this.cabeceraAlmacenHijoPadre.descripcionAlmacenPadre = data.almacen.almacenPadreList[0].descripcionAlmacen;
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

  public getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
    let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }

    this._movimientoService.getUnidadMedicamentoDispositivo(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.unidadMedida = data.listUnidad;
        } else {
          this.toastr.error(data.mensaje)
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
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
}