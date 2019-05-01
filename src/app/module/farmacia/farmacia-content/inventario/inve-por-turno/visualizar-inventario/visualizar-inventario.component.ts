import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { ToastsManager, Toast } from 'ng2-toastr';
import { InventarioService } from '../../../../services/inventario.service';
import { ReporteService } from '../../../../../../shared/services/reporte.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ModalPdfComponent } from '../../../../../../shared/helpers/modal-pdf/modal-pdf.component';


@Component({
  selector: 'app-visualizar-inventario',
  templateUrl: './visualizar-inventario.component.html',
  styleUrls: ['./visualizar-inventario.component.scss']
})
export class VisualizarInventarioComponent implements OnInit {
  @Input() idInventario;
  @Input() varAnaquelFiltrar;
  //private inventarioJSON: any;
  private pdf: String;

  displayedInventarios = ['item', 'codigo', 'producFarma','formaFarma','Marca','Presentacion','unidadDeMedida', 'conteo', 'stock'];
  dataSource = new MatTableDataSource();
  private cabecera = { nombreComercial: null, usuarioIns: null, descripcionTurno: null, feCierre: null, fhMod: null, numeroInventario: null }
  private params = { idInventario: null, anaqueL: null, feInicio: null, feFin: null, nuPagina: null, nuRegisMostrar: null };
  private inventarioJSON: any[] = [];
  private cabeceraJSON: any[] = [];
  private showCloseInve = 1;
  private showVerificar = 1;
    private verificarRegularizarr = true;
    private request = { idInventario: null, tipoFile: null };
    private requestImpresion = { idInventario: null, tipoFile: null };
  constructor(
    private _inventarioService: InventarioService,
    private toastr: ToastsManager,
    private _reporteService: ReporteService,
    public dialogRef: MatDialogRef<VisualizarInventarioComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getListarInventarioPorIdIventario();
    this.obtenerCabecera();
    this.imprimirReporteInventario();
  }
  private obtenerCabecera() {
    //debugger;
    this.varAnaquelFiltrar=1;
    this.params.idInventario = this.idInventario;
    this.cabecera.nombreComercial = this.idInventario.nombreComercial;
    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      this._inventarioService.getCabeceraInventario(this.params)
        .subscribe(data => {
          console.log(data.listarCabeceraInventario)
          if (data.estado == 1) {
            this.cabeceraJSON = data.listarCabeceraInventario;
            console.log(this.cabeceraJSON);
            this.cabecera.nombreComercial = data.listarCabeceraInventario[0].nombreComercial;
            this.cabecera.descripcionTurno = data.listarCabeceraInventario[0].descripcionTurno;
            this.cabecera.feCierre = data.listarCabeceraInventario[0].feCierre;
            this.cabecera.fhMod = data.listarCabeceraInventario[0].fhMod;
            this.cabecera.usuarioIns = data.listarCabeceraInventario[0].usuarioIns;
            this.cabecera.numeroInventario = data.listarCabeceraInventario[0].numeroInventario;

            console.log("turno de cabecera:" + this.cabeceraJSON[0].descripcionTurno)
            console.log("nombre Comercial de cabecera:" + this.cabeceraJSON[0].nombreComercial)
            console.log("feCierre Turno:" + this.cabeceraJSON[0].feCierre)
            console.log("fhMod Turno:" + this.cabeceraJSON[0].fhMod)
            console.log("Usuario Turno:" + this.cabeceraJSON[0].usuarioIns)
            console.log("Numero Inventario:" + this.cabeceraJSON[0].numeroInventario)
          }
        })
    }
  }

  private getListarInventarioPorIdIventario() {
    this.showCloseInve = 1;
    this.showVerificar = 1;
    this.params.idInventario = this.idInventario;
    if (this.params.idInventario != null && this.params.idInventario != "" && this.params.idInventario != undefined) {
      this._inventarioService.getListarInventarioPorIdIventario(this.params)
    
        .subscribe(data => {
          console.log("Mi data actual es"+data.inventario)
          if (data.estado == 1) {
            this.inventarioJSON = data.listInventario;
            console.log("Mi inventario JSON actual es"+this.inventarioJSON);
            if (this.inventarioJSON != null) {
              let total: number = 0;
              let count = 0;
            
              for (let item of this.inventarioJSON) {
                item.i = count;

                //     total = (item.medicamentoLote.medicamento ? item.medicamentoLote.medicamento.precioVenta : (item.medicamentoLote.dispMedicoProdSanitario ? item.medicamentoLote.dispMedicoProdSanitario.precioVenta : 0)) * item.cantidadSistema;
                total = (item.inventarioDetalleUnit.almacenMedicamento.medicamento ? item.inventarioDetalleUnit.almacenMedicamento.medicamento.precioVenta : (item.inventarioDetalleUnit.almacenMedicamento.dispMedicoProdSanitario ? item.inventarioDetalleUnit.almacenMedicamento.dispMedicoProdSanitario.precioVenta : 0)) * item.inventarioDetalleUnit.cantidadContada;
                console.log(total);
                count++;

              }

              // this.verificarClosed = true;
              //  this.displayedColumnsMedicsIventario = ['Item','Codigo', 'ProducFarmaDisp','UnidadDeMedida', 'Stock', 'ConteoFisico','PrecioUnidad','Subtotal'];              
              this.dataSource = new MatTableDataSource(this.inventarioJSON);
        
        
            


            }
            else {
              this.toastr.error("No hay Inventario para mostrar");
              this.dataSource = new MatTableDataSource([]);
    
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
  }



  // private getDetalleInventarioByIdIventario() {
  // //  debugger;
  //   let params = { idInventario: this.idInventario };
  //   if (params.idInventario != null && params.idInventario != "" && params.idInventario != undefined) {
  //     this._inventarioService.getDetalleInventarioByIdIventario(params)
  //       .subscribe(data => {
  //         if (data.estado == 1) {
  //           this.inventarioJSON = data.inventario;
  //           console.log(data.invetario);
  //           this.dataSource = new MatTableDataSource(this.inventarioJSON.inventarioDetalleList);
  //           console.log(this.inventarioJSON.inventarioDetalleList);
  //         } else {
  //           this.toastr.error(data.mensaje);
  //         }
  //       },
  //         error => {
  //           this.toastr.error(error);
  //           return Observable.throw(error);
  //         }),
  //       err => this.toastr.error(err),
  //       () => this.toastr.success('Request Complete');
  //   }
  // }

 

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

  close() {
    this.dialogRef.close(1);
  }

  dismiss() {
    this.dialogRef.close(0);
  }

  private imprimirReporteInventario(){
    this.request.idInventario = this.idInventario;

    this.request.tipoFile = 2;
    this._inventarioService.imprimirReporteInventario(this.request)
    .subscribe(data => {
      if(data.estado == 1 ){
        console.log(data.listarCabeceraInventario);
        console.log(data.listInventario)
        this.toastr.success(data.mensaje);
      }
    })
  }
private imprimirReporteInventarioImpresion(tipoFile){
  let promise = new Promise((resolve, reject) => {
    // this.requestImpresion.idAperturaCaja=103;
    this.requestImpresion.idInventario = this.idInventario;
    this.requestImpresion.tipoFile = tipoFile;
    this._inventarioService.imprimirReporteInventario(this.requestImpresion)
    .subscribe(data =>   {
      if (data.estado == 1) {
         if (tipoFile == 2) {
        this.pdf = "data:application/pdf;base64," + data.imprimeFile;
        this.pruebitaModal(this.pdf);
      }
      else {
        this._reporteService.generar(null, data.imprimeFile, tipoFile);
      }
      ///////////////
    } else {
      this.toastr.error(data.mensaje);
    }
  }, error => {
    this.toastr.error(error);
    return Observable.throw(error);
  }),
err => this.toastr.error(err),
() => this.toastr.success('Request Complete');

    });
} 
private imprimePDF(tipoFile) {
  this.imprimirReporteInventarioImpresion(tipoFile);
}
}
