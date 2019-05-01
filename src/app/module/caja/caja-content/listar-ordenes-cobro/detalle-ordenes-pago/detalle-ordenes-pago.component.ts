import { Component, OnInit, Input } from '@angular/core';
import { RealizarPagoService } from '../../../services/realizar-pago.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-detalle-ordenes-pago',
  templateUrl: './detalle-ordenes-pago.component.html',
  styleUrls: ['./detalle-ordenes-pago.component.scss']
})
export class DetalleOrdenesPagoComponent implements OnInit {

  @Input() idOrdenPago;
  private mediosPago: any[] = [];

  private jsonPago = [
    {
      "placeholder": "Monto 1",
      // "idTipoMedioPago": "",
      "monto": ""
    },
  ];

  private montoJ = [{ "placeholder": "Monto 1", "monto": null }];
  private tOrden = { orden: null, fecha: null, area: null, descripción: null, cantidad: null, precioUnitario: null, precioSubtotal: null };
  private request = { idOrdenPago: null };
  private tipoComp = null;
  private suma = 0;
  private monto = 0;
  private decimal : any;
  constructor(private _realizarPagoService: RealizarPagoService,
    private toastr: ToastsManager,
    private _modalService: NgbModal,
    private router: Router) { }

  private detalleOrden: any = [];
  dsOrden = new MatTableDataSource();
  dispOrden = ['idOrdenPago', 'fhIns', 'area', 'nombreItem', 'cantidad', 'precioUnitario', 'precioSubtotal']

  private getMedioPago() {
    this._realizarPagoService.getAllMedioPago()
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.mediosPago = data.listaMedioPago;

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
  private listarOrdenes() {
    this.request.idOrdenPago = 1;
    this._realizarPagoService.getAllOrdenes(this.request.idOrdenPago).subscribe(data => {
      console.log(data);
      if (data.estado == 1) {
        console.log(data.detalleOrden);
        this.toastr.success(data.mensaje);
        this.detalleOrden = data.detalleOrden;
        this.dsOrden = new MatTableDataSource(this.detalleOrden);

        this.detalleOrden.forEach(element => {
          this.suma += element.precioSubtotal;
          this.decimal=parseFloat(""+this.suma).toFixed(2);
          console.log("mi decimal es"+this.decimal)
        });
      }
      else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err);
    () => this.toastr.success('Request Complete')

  }
  ngOnInit() {
    this.getMedioPago();
    this.listarOrdenes();
  }
}
