import { query } from '@angular/animations/src/animation_metadata';
import { PrevisualizarDetalleComponent } from './previsualizar-detalle/previsualizar-detalle.component';
import { AperturaCierreCajaService } from './../../services/apertura-cierre-caja.service';
import { ListarOrdenesCobroService } from './../../services/listar-ordenes-cobro.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { getCodUsuario, getIdUsuario } from "../../../../shared/auth/storage/cabecera.storage";

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { BusquedaClienteComponent } from './busqueda-cliente/busqueda-cliente.component';
import { ConfirmarDetalleComponent } from './confirmar-detalle/confirmar-detalle.component';
import { NgForm } from '@angular/forms';
import { ModalConfirmacionComponent } from '../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-listar-ordenes-cobro',
  templateUrl: './listar-ordenes-cobro.component.html',
  styleUrls: ['./listar-ordenes-cobro.component.scss']
})
export class ListarOrdenesCobroComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild('busquedaPaciente') private form: NgForm;

  //Selector
  private pacienteRequest = {
    tipoDocumento: null,
    idCliente: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    nombres: null
  };


  private idComprobante;
  private pago = false;

  private apertura = { id: null, estado: null, mensajeBienvenida: null };


  //Tabla 1
  dataSource = new MatTableDataSource();
  displayedColumns = ['numero', 'fecha', 'descripcionArea', 'descripcionTipoOrden', 'totalGeneral', 'totalSinPagar', 'totalPagado', 'detalle', 'seleccionar'];


  //Tabla2
  displayedColumns2 = ['numeroDetalle', 'fecha', 'descripcionArea', 'nombreItem', 'cantidad', 'precioUnitario', 'precioSubTotal', 'seleccionar2']
  dataSource2 = new MatTableDataSource();

  //Show
  private showAutocomplete = 1;
  private longitudDocumento = "?";
  private isValid = 1;
  private hideButton = 1;
  private flgDatosModal: any[] = [];

  //Variables
  private total = 0.00;
  private listDetalleFinal = [];
  private tipoDoc = "";
  private idPersona: string = "";
  private idAperturaCaja: "";
  private idOrdenPago: string = "";
  private nuDocumento: string = "";
  private numeroDocumentoIdentidad: string = "";
  private seleccionar: Boolean;
  private seleccionar2: Boolean;
  private disableGenerar
    : boolean = false;
private decimal : any;
  //Listas
  private DocsIdentidad: any = [];
  private tipoDocs: any[];
  private paciente: any[] = [];
  private displayedSizes: number[];
  private lsOrdenPago = [];//[{ seleccionar: null, fhIns: null, total: null }];
  private lsOrdenPagoDetalle: any[] = [];// [{ seleccionar2: null, idOrdenPago: null, idDetalleOrdenPago: null }];
  private Param = { idCliente: "" };

  private request = {

    idGrupoOcupacional: null,
    descripcionGrupoOcupacional: null,
    abreviatura: null,
    idTipoProfesional: null,
    emitirReceta: null,
    otorgarSolicitarExamen: null,
    emitirCitt: null,
    otorgarMateriales: null,
    emitirReferencia: null,
    regularAntecedente: null

  };

  //Json
  private obtenerDatosPaciente: any = { idPersona: "", idAperturaCaja: 103 };
  private obtenerDetalleOrden: any = { idOrdenPago: "" };
  private obtenerNumeroDocumentos: any = { idTipoDocumento: 0, nuDocumento: "" };
  private datPaciente = {
    idPersona: null, sexo: {}, tipoSangre: {}, gradoInstruccion: {}, estadoCivil: {}, ocupacion: {},
    tipoDocumentoIdentidad: {}, filiadoList: [{ ubigeo: {} }], historiaList: [{}], planList: []
  };
  private nombreCompleto = ""
  private requestOrdenDetalle = {
    montoPago: null,
    estado: null,
    usuarioIns: null,
    idAperturaCaja: null,
    fhIns: null,

    detalleComprobantePago: {
      idItem: null,
      nombreItem: null,
      unidad: null,
      cantidad: null,
      precioUnitario: null,
      precioSubTotal: null,
      descuento: null,
      costoEnvio: null,
      impuestoEnvio: null,
      impuestoItem: null,
      estadoItem: null,
      detalleProducto: null,
      idAlmacen: null
    }
  };

  constructor(
    public _OrdenPagoService: ListarOrdenesCobroService,
    public _aperturaCajaService: AperturaCierreCajaService,
    private toastr: ToastsManager,
    public dialog: MatDialog
  ) {
  }



  private getTipoDocs() {
    this._OrdenPagoService.getTipoDocumentos()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDocs = data.lsComboTipoDoc;
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Tipo de Documento: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  filterDocs(val: string) {
    this.DocsIdentidad = val ? this._filter(val) : this.DocsIdentidad;
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.DocsIdentidad.filter(value => value.numeroDocumentoIdentidad.toLowerCase().startsWith(filterValue));
  }
  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
    }
    if (tipoDoc == 1) {
      this.longitudDocumento = '8';
    }
    if (tipoDoc == 2) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 3) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 4) {
      this.longitudDocumento = '15';
    }
  }
  private getNumeroABuscar(numbusq) {
    this.DocsIdentidad = [];
    if (numbusq.length == 8) {
      this.obtenerNumeroDocumentos.idTipoDocumento = this.tipoDoc;
      this.obtenerNumeroDocumentos.nuDocumento = numbusq;
      this._OrdenPagoService.ObtenerNumeroDocs(this.obtenerNumeroDocumentos)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.personaList == [] || data.personaList.length == 0) {
              this.toastr.info("No hay Resultados");
              this.numeroDocumentoIdentidad = "";
            }
            else {
              this.DocsIdentidad = data.personaList;
              this.idPersona = this.DocsIdentidad[0].idPersona;
              this.showAutocomplete = 2;
              this.buscarPaciente();
              this.obtenerOrdendePago();
              this.obtenerDetalleOrdenPago(0);
            }
          }
          else {
            this.toastr.error(data.mensaje);
          }
          return true;
        },
          error => {
            this.toastr.error("Error al Obtener Numeros de Documento");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  private getIdPersona(jason) {
    this.numeroDocumentoIdentidad = jason.numeroDocumentoIdentidad;
    this.idPersona = jason.idPersona;
    this.DocsIdentidad = [];

  }
  private buscarPaciente() {
    // if (isInvalid(_controlVar)) {
    //   return;
    // }
    this.obtenerDatosPaciente = { idPersona: this.idPersona };
    this._OrdenPagoService.getDatosPaciente(this.obtenerDatosPaciente)
      .subscribe(data => {
        console.log(data);
        
        if (data.estado == 1) {
          console.log(data);
          
          this.tipoDoc = "";
          this.nuDocumento = "";
          this.numeroDocumentoIdentidad = "";
          this.datPaciente = data.personaList[0];
          this.nombreCompleto = this.datPaciente['apellidoPaterno'] + " " + this.datPaciente['apellidoMaterno'] + " " + this.datPaciente['nombres'];
          this.isValid = 1;
          this.hideButton = 2;
          // this.obtenerProcedimientosParaCita(x,y);

        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Obtener Datos del Paciente: ");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private cleanDetalleFinal() {
    this.lsOrdenPagoDetalle = [];
    this.listDetalleFinal = [];
    this.total = 0.00;
  }

  disabledGenerar(i): boolean {
    return this.lsOrdenPagoDetalle[i].pagoCompleto;
  }
  private isInvalid(tipoDoc: any, numDoc: any): boolean {
    return tipoDoc == null || tipoDoc == undefined || numDoc == null ||
      numDoc == "" || numDoc == undefined || numDoc == undefined || this.numeroDocumentoIdentidad == "";
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

  ngOnInit() {
    this.getTipoDocs();
    this.getAperturaCaja();
  }

  private sumar() {
    this.total = 0.00;
    // for(let y of this.lsOrdenPago){
    for (let x of this.listDetalleFinal) {
      
  x['precioSubTotal']=parseFloat(x['precioSubTotal']).toFixed(2);
      this.total = Number(x['precioSubTotal']) + this.total;
      this.decimal=parseFloat(""+this.total).toFixed(2);
  //this.decimal=Number(this.total);
  console.log("mi decimal es"+this.decimal)
    }

  }

  public obtenerOrdendePago($event?) {
    // if (this.datPaciente[0].idPaciente != null || this.datPaciente[0].idPaciente != undefined || this.datPaciente[0].idPaciente != "") {
    this._OrdenPagoService.getOrdenPago(this.obtenerDatosPaciente.idPersona, this.apertura.id).subscribe(data => {
      if (data.estado == 1) {
        this.lsOrdenPago = data.ordenPagoList;

        for (let x of this.lsOrdenPago) {
          x.total = x.total.toFixed(2);
          // x['totalPagado'] = x['totalPagado'].toFixed(2);
          // x['totalSinPagar'] = x['totalSinPagar'].toFixed(2);

          x['totalPagado'] = parseFloat(x['totalPagado']).toFixed(2);
          x['totalSinPagar'] = parseFloat(x['totalSinPagar']).toFixed(2);

          var a = Math.round(x['totalSinPagar'] * 100) / 100;
   console.log("Mi amigo"+a)
        }

        this.dataSource = new MatTableDataSource(this.lsOrdenPago);
      }
      else if (data.estado == 0) {
        console.log(data.mensaje);
      }
    },
      error => {
        console.error(error);
      });

  }
  comparar(valor: any, propiedad: string, list): boolean {
    let _list: any[] = list;
    let value: boolean = false;
    for (let x of _list) {
      if (x[propiedad] == valor) {
        return true;
      }
    }
    return false;
  }

  private checked(event, e) {

    //asignar el check a todos los detalles
    for (let x of this.lsOrdenPagoDetalle) {
      x['seleccionar2'] = event;
    }

    if (event) {
      // debugger
      for (let item of this.lsOrdenPagoDetalle) {
        // for (const { item, index } of this.listDetalleFinal.map((item, index) => ({ item, index }))) {
        if (!this.comparar(item['idDetalleOrdenPago'], 'idDetalleOrdenPago', this.listDetalleFinal)) {
          this.listDetalleFinal.push(item);
        }
        // for (let y of this.listDetalleFinal) {
        //   if (x['idDetalleOrdenPago'] != y['idDetalleOrdenPago']) {
        //     this.listDetalleFinal.push(x);
        //   }
        // }
      }
    }
    else {
      let lsindex = [];
      for (const { item, index } of this.listDetalleFinal.map((item, index) => ({ item, index }))) {
        for (let item2 of this.lsOrdenPagoDetalle) {
          if (item.idDetalleOrdenPago == item2.idDetalleOrdenPago) {
            // this.listDetalleFinal.splice(index, 1);
            lsindex.push(item.idDetalleOrdenPago);
          }
        }
      }
      for (let x of lsindex) {
        let indice = 0;
        for (let item of this.listDetalleFinal) {
          // console.log(item.idDetalleOrdenPago.indexOf[+x]);
          if (item.idDetalleOrdenPago == x) {
            this.listDetalleFinal.splice(indice, 1);
          }
          indice++;
        }
      }
      // this.lsOrdenPago.push();
    }
    this.sumar();
  }

  private checked2($event, i, e) {



    let cont;
    let count = 0;
    for (let y of this.lsOrdenPagoDetalle) {
      if (y['seleccionar2'])
        count++;
    }

    //si count es igual al tamaño del hijo CHECKECD al padre
    if (count == this.lsOrdenPagoDetalle.length) {

      for (let x of this.lsOrdenPago) {
        if (x['idOrdenPago'] == this.lsOrdenPagoDetalle[i].idOrdenPago) {
          x['seleccionar'] = true;
          this.dataSource = new MatTableDataSource(this.lsOrdenPago);
        }
      }
    } else {
      for (let x of this.lsOrdenPago) {
        if (x['idOrdenPago'] == this.lsOrdenPagoDetalle[i].idOrdenPago) {
          x['seleccionar'] = false;
          this.dataSource = new MatTableDataSource(this.lsOrdenPago);
        }
      }
    }
    for (let y of this.lsOrdenPagoDetalle) {
      // debugger
      if (y['idDetalleOrdenPago'] == e.idDetalleOrdenPago) {

        if (y['seleccionar2'] == true) {
          this.listDetalleFinal.push(y);
        } else {
          for (let index in this.listDetalleFinal) {
            if (this.listDetalleFinal[index].idDetalleOrdenPago == y['idDetalleOrdenPago'])
              this.listDetalleFinal.splice(+index, 1);
          }
        }
      }
    }

    for (let x of this.listDetalleFinal) {
      this.listDetalleFinal[0].precioSubTotal;
    }
    // this.lsOrdenPago.push();
    // console.log(this.lsOrdenPago);
    this.sumar();

  }

  public obtenerDetalleOrdenPago(_detalleOrdenPagoList) {
    this.lsOrdenPagoDetalle = _detalleOrdenPagoList;
    for (let x of this.lsOrdenPagoDetalle) {
      // x.precioUnitario = x.precioUnitario.toFixed(2);
      // x.precioSubTotal = x.precioSubTotal.toFixed(2);
      x.precioUnitario = parseFloat(x.precioUnitario).toFixed(2);
      x.precioSubTotal = parseFloat(x.precioSubTotal).toFixed(2);
    }

    this.dataSource2 = new MatTableDataSource(this.lsOrdenPagoDetalle);
  }

  //Modal Busqueda Paciente
  private openModalBuscar() {
    const dialogRef = this.dialog.open(BusquedaClienteComponent, {
      autoFocus: false,
      maxWidth: '90%',
      maxHeight: '95%',
      disableClose: false,
    });
    dialogRef.componentInstance.tipoDocumento = this.tipoDocs;
    dialogRef.componentInstance.paciente = this.paciente;
    dialogRef.componentInstance.flgDatosModal = this.flgDatosModal;
    this._OrdenPagoService.getDatosPaciente(this.obtenerDatosPaciente)
    dialogRef.afterClosed().subscribe(result => {
      if (this.flgDatosModal.length != 0) {
        this.obtenerDatosPaciente.idPersona = this.paciente[0].idPersona;
        this.idPersona = this.paciente[0].idPersona;
        this.buscarPaciente();
        this.obtenerOrdendePago();
      }
    });
  }


  private cancelar() {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      maxWidth: '40%',
      width: '32%',
      maxHeight: '80%',
      height: '30%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea cancelar la Orden de Pago?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.lsOrdenPago = [];
        this.lsOrdenPagoDetalle = [];
        this.listDetalleFinal = [];
        this.dataSource = new MatTableDataSource();
        this.dataSource2 = new MatTableDataSource();
        this.total = 0.00;
        this.nombreCompleto = "";
        this.datPaciente = {
          idPersona: null, sexo: {}, tipoSangre: {}, gradoInstruccion: {}, estadoCivil: {}, ocupacion: {},
          tipoDocumentoIdentidad: {}, filiadoList: [{ ubigeo: {} }], historiaList: [{}], planList: []
        };

      }
    });
  }
  recive(event) {
    
    this.pago = false;
    if (event.save) {
      this.lsOrdenPagoDetalle.length=0;
      this.lsOrdenPago.length=0;
      this.nombreCompleto = "";
      this.datPaciente = {
        idPersona: null, sexo: {}, tipoSangre: {}, gradoInstruccion: {}, estadoCivil: {}, ocupacion: {},
        tipoDocumentoIdentidad: {}, filiadoList: [{ ubigeo: {} }], historiaList: [{}], planList: []};
    
      // this.form.resetForm();
    }
  }
  private list: any[] = [];
  //Modal Confirmar
  private openModalConfirmar() {

    const dialogRef = this.dialog.open(ConfirmarDetalleComponent, {
      autoFocus: false,
      //maxWidth: '80%',
      width: '980px',
      height: '50%',
      // height: '500px',
       maxHeight: '90%',
      //margin: '0 auto',
      disableClose: true,

    });
    dialogRef.componentInstance.idAperturaCaja = this.apertura.id;
    dialogRef.componentInstance.list = this.listDetalleFinal;
    dialogRef.afterClosed().subscribe(result => {
      if (result.estado == 1) {
        
        this.idComprobante = result.idComprobantePago;
        this.pago = true;
        this.idPersona=null;
        this.total = 0;
        this.lsOrdenPago = [];
        this.lsOrdenPagoDetalle = [];
        this.listDetalleFinal = [];
      } else {
        this.total = 0;
      }
    });
  }

  openprueba() {
    this.pago = true;
  }

  private openModalPrevisualizar() {
    const dialogRef = this.dialog.open(PrevisualizarDetalleComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      width: '980px',
      height: '50%',
      maxHeight: '90%',
      disableClose: true,
    });
    dialogRef.componentInstance.list = this.listDetalleFinal;
  }
  private apCaja: any[] = [];
  //apertura caja
  private getAperturaCaja() {
    this._aperturaCajaService.obtenerAperturaCajaPorPersonal(getIdUsuario())
      .subscribe(data => {
        if (data.estado == 1) {
          // this.toastr.success(data.mensaje);
          if (data.aperturaCaja.estadoCaja == 1) {
            this.apertura.id = data.aperturaCaja.idAperturaCaja
          } else if (data.aperturaCaja.estadoCaja == 0) {
            this.apertura.mensajeBienvenida = "Su caja esta cerrada"
          } else {
            this.apertura.mensajeBienvenida = data.mensaje
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
  // private guardarOrdenyDetalle(FormPago) {

  //   this.requestOrdenDetalle.usuarioIns = getCodUsuario();

  //   this._OrdenPagoService.postComprobanteDetale(this.requestOrdenDetalle)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.toastr.success(data.mensaje);
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       error => {
  //         console.log(error);
  //       });
  // }




