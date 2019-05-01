import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { RealizarPagoService } from '../../../../services/realizar-pago.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReporteService } from '../../../../../../shared/services/reporte.service';
import { ModalPdfComponent } from '.././../../../../../shared/helpers/modal-pdf/modal-pdf.component';

@Component({
  selector: 'app-vis-comprobante',
  templateUrl: './vis-comprobante.component.html',
  styleUrls: ['./vis-comprobante.component.scss']
})
export class VisComprobanteComponent implements OnInit {

  private listCabecera: any[] = [];
  private listDetalle: any[] = [];
  private request = { idComprobantePago: null, tipoFile: null };
  private dataCabe = {
    value1: null, value2: null, value3: null, value4: null, value5: null, montoPago: null,
    serieComprobante: null, montoLetras: null, rucIpress: null,subTotal:null,igv:null,igvPor:null
  };
private descuentoDecimal:any;
private precioSubtotal:any;
private precioUnitario:any;
  private titulos = {
    titulo1: null, titulo2: null, titulo3: null, titulo4: null, titulo5: null,titulo6: null,titulo7: null
  }
  private noComprobante = null;
  private descripcionRuc: string;
  private pdf: String;

  @Input() idComprobante;

  constructor(public dialogRef: MatDialogRef<VisComprobanteComponent>,
    private _realizarPagoService: RealizarPagoService,
    private _reporteService: ReporteService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router) { }

  private detalleOrden: any = [];
  dsComprobanteD = new MatTableDataSource();
  tablaDetalle = ['idItem', 'nombreItem', 'cantidad', 'precioUnitario','descuento', 'precioSubtotal']

  private getComprobante() {
    this.request.idComprobantePago = this.idComprobante;
    this.request.tipoFile = 2;

    this._realizarPagoService.getObtenerComprobante(this.request).subscribe(data => {
      
      if (data.estado == 1) {
        this.listCabecera = data.listaCabecera;
        this.listDetalle = data.listaDetalle;
console.log(data)
        if (this.listCabecera[0].idTipoComprobantePago == 1) {
          this.noComprobante = "BOLETA DE VENTA";
          this.descripcionRuc = "Nro Boleta:";
          this.titulos.titulo1 = "Nombre: ";
          this.dataCabe.value1 = this.listCabecera[0].nombreCliente;
          this.titulos.titulo2 = "Dirección: ";
          this.dataCabe.value2 = this.listCabecera[0].direccionCliente;
          this.titulos.titulo3 = "Establecimiento Medico: ";
          this.dataCabe.value3 = this.listCabecera[0].razonSocialIpress;
          this.titulos.titulo4 = "Fecha: ";
          this.dataCabe.value4 = this.listCabecera[0].fecha + "   Hora: " + this.listCabecera[0].hora;

        } else {
          this.noComprobante = "FACTURA";
          this.descripcionRuc = "Nro RUC:";
          this.titulos.titulo1 = "Razón Social: ";
          this.dataCabe.value1 = this.listCabecera[0].razonSocial;
          this.titulos.titulo2 = "RUC: ";
          this.dataCabe.value2 = this.listCabecera[0].rucCliente; 
          this.titulos.titulo3 = "Dirección: ";
          this.dataCabe.value3 = this.listCabecera[0].direccionCliente;
          this.titulos.titulo4 = "Establecimiento Medico: ";
          this.dataCabe.value4 = this.listCabecera[0].razonSocialIpress;
          this.titulos.titulo5 = "Fecha de Emisión: ";
          this.dataCabe.value5 = this.listCabecera[0].fecha;

          this.dataCabe.rucIpress = "RUC: " + this.listCabecera[0].rucIpress;          
          this.dataCabe.subTotal= this.listCabecera[0].subTotal;
          this.dataCabe.igv= this.listCabecera[0].igvPor+"%  S/ "+ this.listCabecera[0].igv;
         
        }
     //   this.descuento=parseFloat(""+this.listDetalle).toFixed(2);

        this.dataCabe.montoPago = this.listCabecera[0].montoPago;
        this.dataCabe.montoLetras =  this.listCabecera[0].montoLetras;
        this.dataCabe.serieComprobante = this.listCabecera[0].serieComprobante;
       
        this.dsComprobanteD = new MatTableDataSource(this.listDetalle);
          this.listDetalle.forEach(element => {
          element["descuento"] = parseFloat(element.descuento).toFixed(2);
          element["precioSubtotal"] = parseFloat(element.precioUnitario).toFixed(2);
          element["precioUnitario"] = parseFloat(element.precioUnitario).toFixed(2);
       console.log("mi lista detalle es"+this.listDetalle)
        });

       // this.listaDetalle['descuentoDecimal']=parseFloat(this.listaDetalle.descuento).toFixed(2)
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


  ngOnInit() {
    this.getComprobante();
  }
  closeModal() {
    this.dialogRef.close(true);
  }
  close(add) {
    this.dialogRef.close(add);
  }


  private obtenerCrearBoletaFactura(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.request.idComprobantePago = this.idComprobante;
      this.request.tipoFile = 2;

      if (this.listCabecera[0].idTipoComprobantePago == 1) {
        this._realizarPagoService.getObtenerBoleta(this.request).subscribe(data => {
          if (data.estado == 1) {
        
            this.toastr.success(data.mensaje);

            if (tipoFile == 2) {
              this.pdf = "data:application/pdf;base64," + data.imprimeFile;
              this.pruebitaModal(this.pdf);
            }
            else {
              this._reporteService.generar(null, data.imprimeFile, tipoFile);
            }
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
      }else{
        this._realizarPagoService.getObtenerFactura(this.request).subscribe(data => {
          if (data.estado == 1) {
            console.log(data.listarDatosPersonalCierreCaja);
            this.toastr.success(data.mensaje);

            if (tipoFile == 2) {
              this.pdf = "data:application/pdf;base64," + data.imprimeFile;
              this.pruebitaModal(this.pdf);
            }
            else {
              this._reporteService.generar(null, data.imprimeFile, tipoFile);
            }
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
     
        
    });
    return promise;
  }

  private imprimePDF(tipoFile) {
    this.obtenerCrearBoletaFactura(tipoFile);
  }

  pruebitaModal(mystring): void {
    const dialogRef = this.dialog.open(ModalPdfComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.mystring = mystring;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
