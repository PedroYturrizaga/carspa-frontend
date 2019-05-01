import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';
import { ListarOrdenesCobroService } from './../../../services/listar-ordenes-cobro.service';
import { getIdUsuario, getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';



@Component({
  selector: 'app-confirmar-detalle',
  templateUrl: './confirmar-detalle.component.html',
  styleUrls: ['./confirmar-detalle.component.scss']
})
export class ConfirmarDetalleComponent implements OnInit {

  @Input() list = [];
  @Input() idAperturaCaja: Number;

  displayedColumns3 = ['numeroDetalle', 'fecha', 'descripcionArea', 'nombreItem', 'cantidad', 'precioUnitario', 'precioSubTotal']
  dataSource3 = new MatTableDataSource();
  private decimal : any;
  private total = 0;

  private request = {
    detalleComprobantePagoList: [],
    idAperturaCaja: null,
  }

  private sumar() {
    for (let x of this.list) {
      x['precioUnitario'] = parseFloat(x['precioUnitario']).toFixed(2);
      console.log("Mi precio unitario es"+ x['precioUnitario'] );
      
      this.total = Number(x['precioSubTotal']) + this.total;
      this.decimal=parseFloat(""+this.total).toFixed(2);
      console.log("mi decimal es"+this.decimal)
    }
  }

  constructor(
    public _OrdenPagoService: ListarOrdenesCobroService,
    public dialogRef: MatDialogRef<ConfirmarDetalleComponent>,
    private toastr: ToastsManager
  ) { }

  private limpiar() {
    this.list = null;
  }

  
  ngOnInit() {
    this.obtenerDetalleOrdenPago();


  }

  public obtenerDetalleOrdenPago() {

    this.dataSource3 = new MatTableDataSource(this.list);
    this.sumar();

  }

  private insertarDetalle() {
    this.request.detalleComprobantePagoList = this.list;
    this.request.idAperturaCaja = this.idAperturaCaja;

    let param = { estado: 1, idComprobantePago: null };
    console.log(this.request);

    this._OrdenPagoService.postComprobanteDetalle(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          // this.toastr.success(data.mensaje, "Insertado Correctamente");
          param.idComprobantePago = data.idComprobantePago
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }, () => {
          this.close(param);
        }),
      err => this.toastr.error(err),

      () => this.toastr.success('Request Complete');


  }

  close(add?) {
    this.dialogRef.close(add);
  }

  onNoClick(): void {
    let param = { estado: 0, idComprobantePago: null };
    this.dialogRef.close(param);
    //   this.limpiar();

  }
}

