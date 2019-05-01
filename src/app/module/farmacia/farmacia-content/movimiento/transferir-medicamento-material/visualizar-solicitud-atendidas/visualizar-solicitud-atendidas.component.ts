import { Component, OnInit, Input, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { MovimientoService } from '../../../../services/movimiento.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-visualizar-solicitud-atendidas',
  templateUrl: './visualizar-solicitud-atendidas.component.html',
  styleUrls: ['./visualizar-solicitud-atendidas.component.scss']
})
export class VisualizarSolicitudAtendidasComponent implements OnInit {
  displayedColumnsComrobantes = ['Codigo', 'productFarma', 'formaFarma', 'Presentacion', 'Lote',
    'fechaVen', 'Marca', 'unidadMedida', 'cantidadSolicitada'];
    // , 'cantidadAtendida'
  matDataSource2 = new MatTableDataSource();

  private index: any = null;

  //@Input() idComprobanteNew: number;
  @Input() cabeceraSolicitud2;
  @Input() idAlmacen;
  @Input() tipoAlmacen;

  private medicDispMedProducSani: any = [];
  private medicamentoLote: any[] = [];
  private descripLote: any[] = [];
  private date = new Date();
  private position = 'above';
  private nuevoArrayDetallesComprobanteFarmaciaAtendidos = [];
  private listComprobanteFarmaciaDetalle = [];

  constructor(
    private _movimientoService: MovimientoService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<VisualizarSolicitudAtendidasComponent>
  ) { }

  filterMeds(val: any) {
    this.medicamentoLote = val ? this._filter(val) : this.medicamentoLote = [];
  }

  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.medicamentoLote.filter(value => value.descripcionMedicamentoLote.toLowerCase().startsWith(filterValue));
  }

  ngOnInit() {
    this.getDetalleComprobanteFarmacia2();
  }

  private getDetalleComprobanteFarmacia2() {
    // let _params = { idComprobante: this.idComprobanteNew }
    this._movimientoService.getDetalleComprobanteFarmacia(this.cabeceraSolicitud2.idComprobante)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDispMedProducSani = data.comprobanteFarmaciaList[0];
          console.log(this.medicDispMedProducSani);
          console.log(this.medicDispMedProducSani);
          // Object.keys(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']).forEach(key => {
          //   this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][key]["cantidadAtendida"] = "";
          //   this.descripLote.push({ descripcion: null })
          // });

          for (let a of this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']) {
            let b = a.cantidadSolicitud.split(" / ");
            a.cantidadSolicitud = b[0];
          }

          if (this.cabeceraSolicitud2.flEstadoComprobante == "E" || this.cabeceraSolicitud2.flEstadoComprobante == "C") {
            this.concatenerListas(this.medicDispMedProducSani, this.medicDispMedProducSani.idComprobante);
          }

          this.matDataSource2 = new MatTableDataSource(this.medicDispMedProducSani['comprobanteFarmaciaDetalleList']);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => { });
  }

  private getLotePromise(valor, params, index) {
    this.medicamentoLote = []
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].feVencimiento = null;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].stockLote = null;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].idMedicamentoLote = null;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][index].descripcionMedicamentoLote = null;
    let busquedaLote = { idAlmacen: null, idMedicamento: null, idDispMedicoProdSanitario: null };
    busquedaLote.idAlmacen = this.idAlmacen;
    if (params.medicamento != null) {
      busquedaLote.idMedicamento = params.medicamento.idMedicamento;
    } else if (params.dispMedicoProdSanitario != null) {
      busquedaLote.idDispMedicoProdSanitario = params.dispMedicoProdSanitario.idDispMedicoProdSanitario;
    }

    this._movimientoService.getMedicamentoLote(busquedaLote)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicamentoLote = data.medicamentoLoteList;
          if (this.medicamentoLote.length === 0) {
            this.medicamentoLote = []
            this.toastr.warning("No hay lotes para este Producto Farmacútico/Dispositivo Médico");
          }
          else {
            this.filterMeds(valor);
            if (this.medicamentoLote.length === 0) {
              this.toastr.warning("Lote que inicie con letra/palabra ingresada no encontrada, vuelva a intentar");
            }
          }
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => {
          console.log(err);
        })
  }

  private selectMedicamentoLote(medicLote, i) {
    this.medicamentoLote = [];
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].feVencimiento = medicLote.feVencimiento;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].stockLote = medicLote.stockLote;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].idMedicamentoLote = medicLote.idMedicamentoLote;
    this.medicDispMedProducSani['comprobanteFarmaciaDetalleList'][i].descripcionMedicamentoLote = medicLote.descripcionMedicamentoLote;
  }

  close() {
    this.dialogRef.close(1);
  }

  dismiss() {
    this.dialogRef.close(0);
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  private concatenerListas(dataList, idComprobante) {
    this._movimientoService.getComprobanteFarmaciaDetalleAtendidos(idComprobante)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listComprobanteFarmaciaDetalle = data.comprobanteFarmaciaDetalleAtendidosList;
          for (let x in dataList) {
            if (x == 'comprobanteFarmaciaDetalleList') {
              for (let y of dataList[x]) {
                for (let z of this.listComprobanteFarmaciaDetalle) {
                  if (z['idMedicamentoLote'] == y['idMedicamentoLote']) {
                    for (let r in z) {
                      y[r] = z[r];
                    }
                  }
                }
              }
            }
          }
          //console.log(dataList);
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