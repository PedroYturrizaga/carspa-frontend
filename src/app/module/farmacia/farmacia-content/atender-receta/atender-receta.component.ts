import { CambiarValoresEncriptados } from './../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { PrevisualizarOrdenComponent } from './previsualizar-orden/previsualizar-orden.component';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { AtenderRecetaService } from '../../../farmacia/services/atender-receta.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { CitaProcedimientoService } from '../../../admision/services/cita-procedimiento.service';
import { HistorialProdDispComponent } from './historial-prod-disp/historial-prod-disp.component';
import { ActoMedicoComponent } from './acto-medico/acto-medico.component';
// import CambiarValoresEncriptados from '../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Component({
  selector: 'app-atender-receta',
  templateUrl: './atender-receta.component.html',
  styleUrls: ['./atender-receta.component.scss']
})
export class AtenderRecetaComponent implements OnInit {
  displayedColumnsReceta = ['numeroReceta', 'actoMedicoatencion', 'Area', 'Especialidad', 'Fecha', 'Estado', 'Accion', 'verActoMedico'];
  private dataSource = new MatTableDataSource();

  private position = "above"
  private tipoDocumento: any[] = [];
  private historialReceta: any[] = [];
  private recetaDetalleList: any[] = [];
  private receta: any = [{ actoMedico: { cita: { idCita: null } } }];
  private jsonFlags = { flgReceta: false, flgPaciente: false, flgIdTipoDoc: false, flgNroDoc: false, flgIdActoMedico: false, flgIdReceta: false, flgInserta: 0 };
  private params = { idActoMedico: null, idTipoDocumentoIdentidad: null, numeroDocumentoIdentidad: "", idReceta: null };
  private atencionRecetaRequest = { recetaCabecera: { idReceta: null, recetaDetalleList: [] }, ComprobanteFarmacia: { idComprobanteFarmacia: null } , idPersona: null }
  private recetaDetalle;
  private actoMedico;
  private total: number = 0;
  private longitudDocumento = "?";
  private disabledAtender: boolean = true;

  private datPaciente = {
    sexo: {}, tipoSangre: {}, gradoInstruccion: {}, estadoCivil: {}, ocupacion: {},
    tipoDocumentoIdentidad: {}, numeroDocumentoIdentidad:{}, filiadoList: [{ ubigeo: {} }], historiaList: [{}], planList: []
  };

  private flgConPago: boolean = false;

  private jsonRuta: NavigationExtras = {

    queryParams: {
      "idAlmacen": null,
      "descripAlmacen": null
    }
  };

  private request = {
    apellidosPersona: null,
    descripcionAlmacen: null,
    fhOrden: null,
    idAlmacen: null,
    idPersona: null,
    idReceta: null,
    nombreIPRESS: null,
    nombrePersona: null,
    ordenPagoFarmaciaDetalleList: [],
    total: null,
    totalPrecio: null
  }

  constructor(
    private _atenderRecetaService: AtenderRecetaService,
    private _otorgarCitaService: CitaProcedimientoService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modalDialog: MatDialog,
    private _cambiarValores: CambiarValoresEncriptados
    //private location: Location
  ) {
    this._route.queryParams.subscribe(params => {
      this.jsonRuta.queryParams.idAlmacen = params["idAlmacen"];
      this.jsonRuta.queryParams.descripAlmacen = params["descripAlmacen"];
    });
  }
  ngOnInit() {
    this.getAllTipoDocumento();
  }
  private getAllTipoDocumento() {
    this._atenderRecetaService.getAllTipoDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDocumento = data.tipoDocumentoList;
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

  private buscarReceta() {
    if ((this.params.idTipoDocumentoIdentidad == null || this.params.idTipoDocumentoIdentidad == '') && (this.params.numeroDocumentoIdentidad == null || this.params.numeroDocumentoIdentidad == '') && (this.params.idActoMedico == null || this.params.idActoMedico == '') && (this.params.idReceta == null || this.params.idReceta == '')) {
      this.toastr.error("Debe seleccionar almenos un filtro de búsqueda");
      return;
    } else if (this.params.idTipoDocumentoIdentidad == undefined && this.params.numeroDocumentoIdentidad) {
      this.toastr.error("Debe seleccionar un tipo de documento");
      return;
    }
    if (this.params.idTipoDocumentoIdentidad == 0) {
      this.params.idTipoDocumentoIdentidad = null;
    }
    this._atenderRecetaService.getRecetabyBusqueda(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.receta = data.recetaList;
          this.jsonFlags.flgPaciente = true;
          console.log(this.receta)
          this.dataSource = new MatTableDataSource(this.receta);
          this.getNumeroABuscar();
        } else if (data.estado == 1) {
          this.toastr.warning("Error en Busqueda de Receta" + data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      err => { this.toastr.error(err) },
      () => {
        if (this.receta.length > 0) {
          this.getHistorialRecetaByPersona(this.receta[0].actoMedico.cita.persona.idPersona);
        }
      });
    this.jsonFlags.flgReceta = true;
  }

  private getHistorialRecetaByPersona(idPersona) {
    this._atenderRecetaService.getHistorialRecetaByPersona(idPersona)
      .subscribe(data => {
        if (data.estado == 1) {
          this.historialReceta = data.recetaCabeceraList;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        console.log(error);
      });
  }

  private getNumeroABuscar() {
      let param = {
        idTipoDocumento: this.params.idTipoDocumentoIdentidad,
        nuDocumento: this.params.numeroDocumentoIdentidad
      }

      this._otorgarCitaService.ObtenerNumeroDocs(param)
        .subscribe(data => {
          if (data.estado == 1) {
            if (data.personaList == [] || data.personaList.length == 0) {
              this.toastr.info("No hay Resultados");
            }
            else {
              let idPersona = data.personaList[0].idPersona;
              this.buscarPaciente(idPersona);
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

  private buscarPaciente(idPersona) {
    let param = { idPersona: idPersona };
    this._otorgarCitaService.getDatosPaciente(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.datPaciente = data.personaList[0];
          // this.nombreCompleto = this.datPaciente['apellidoPaterno'] + " " + this.datPaciente['apellidoMaterno'] + " " + this.datPaciente['nombres'];
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

  private getPacienteActoMedico(idReceta, estado, idPersona) {
    // console.log(idCita)
    if (estado === "Atendido total") {
      this.toastr.warning("Receta ya Fue Atendida")
      return;
    }
    this.total = 0;
    // this.jsonFlags.flgPaciente = false;
    this.getRecetaById(idReceta, idPersona);
    this.getFarmaciaConfigByNombre("conpago");
    this.request.idReceta = idReceta;

    $("#listadoDeRecetasID").focus();
  }

  private getActoMedico(idReceta) {
    this._atenderRecetaService.getActoMedicobyReceta(idReceta)
      .subscribe(data => {
        if (data.estado == 1) {
          this.actoMedico = data.actoMedico;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        console.log(error);
      });
  }

  private getRecetaById(idReceta, idPersona) {
    // idPersona = this.params.numeroDocumentoIdentidad;
    idPersona = this.params.idTipoDocumentoIdentidad+""+this.datPaciente.numeroDocumentoIdentidad+"00";
    console.log(idReceta);
    console.log(idPersona);
    
    
    this._atenderRecetaService.getRecetaById(idReceta, idPersona)
      .subscribe(data => {
        console.log(data);
        
        if (data.estado == 1) {
          console.log(data);
          
          console.log("recetaCabecera: ", data.recetaCabecera)
          this.recetaDetalle = [];
          this.recetaDetalle = data.recetaCabecera;
          let i = 0;
          let istock = 0;
          if (this.recetaDetalle['recetaDetalleList'] && this.recetaDetalle['recetaDetalleList'] != null) {
            for (let x of this.recetaDetalle['recetaDetalleList']) {
              if (x.cantidadAtendidaActual == null) {
                x.cantidadAtendidaActual = 0;
              }
              //Si la cantidad atendiada es igual a la solicitada se desactiva el campo "Cant. a Atender" y se setea la cantidad atendida
              if (x.cantidad == x.cantidadAtendida) {
                x.desaactivado = true;
                x.cantidadAtendidaActual = x.cantidadAtendida;
                x.cantPend = 0
              } else {
                x.cantPend = x.cantidad - x.cantidadAtendida;
              }
              x.total = 0;
              x.posicion = null;
              x.stock = (x.stock ? x.stock : 0);
              if (x.cantidad - x.cantidadAtendida == 0) {
                x.flgAtendido = true;
              } else {
                x.flgAtendido = false;
              }

              i++;
              //comprobar si puede realizar la atencion de la receta; sino desactiva el boton ATENDER RECETA
              if (x.stock != 0 || x.flgAtendido != true) {
                if (x.stock != 0 && x.flgAtendido == false) {
                  this.disabledAtender = false;
                  istock++
                } else {
                  this.disabledAtender = true;
                }
              } else {
                this.disabledAtender = true;
              }
              if (istock > 0)
                this.disabledAtender = (istock > 0) ? false : true;
              //--------------------------------------------------------
            }
          }
          this.atencionRecetaRequest.recetaCabecera.idReceta = data.recetaCabecera.idReceta;
        } else {
          this.toastr.error(data.mensaje);
          console.log(data.mensaje);
        }
      },
      err => {
        console.log(err);
      })
  }

  private validatipoDoc() {
    if (this.params.idTipoDocumentoIdentidad != null && this.params.idTipoDocumentoIdentidad != '' && this.params.idTipoDocumentoIdentidad != undefined && this.params.idTipoDocumentoIdentidad != 0) {
      this.jsonFlags.flgIdActoMedico = true;
      this.jsonFlags.flgIdReceta = true;
      if (this.params.idTipoDocumentoIdentidad == 1) {
        this.longitudDocumento = '8';
      }
      if (this.params.idTipoDocumentoIdentidad == 2) {
        this.longitudDocumento = '12';
      }
      if (this.params.idTipoDocumentoIdentidad == 3) {
        this.longitudDocumento = '12';
      }
      if (this.params.idTipoDocumentoIdentidad == 4) {
        this.longitudDocumento = '15';
      }
    } else if (this.params.idTipoDocumentoIdentidad == undefined || this.params.idTipoDocumentoIdentidad == null) {
      this.jsonFlags.flgIdActoMedico = false;
      this.jsonFlags.flgIdReceta = false;
      this.params.numeroDocumentoIdentidad = '';
      this.longitudDocumento = "?";
    }
  }
  verificarDoc(nroDocNota: any, nroReceta: any): boolean {
    if (nroDocNota || nroReceta) {
      return true;
    } else {
      return false;
    }
  }
  verificarActoMed(nroReceta: any): boolean {
    if (nroReceta == null || nroReceta == undefined || nroReceta == "") {
      return false;
    }
    else {
      return true;
    }
  }
  verificarReceta(nroDocNota: any): boolean {
    if (nroDocNota == null || nroDocNota == undefined || nroDocNota == "") {
      return false; 
    }
    else {
      return true;
    }
  }

  private atenderReceta(_ngForm: any) {
    if (isInvalid(_ngForm)) {
      return;
    }
    let param: any;
    this.atencionRecetaRequest.recetaCabecera.recetaDetalleList = [];
    console.log(this.recetaDetalle);
    
    for (let i of this.recetaDetalle.recetaDetalleList) {
      // debugger
      if (i.flgAtendido == false && i.cantidadAtendidaActual != 0) {
        param = { idRecetaDetalle: i.idRecetaDetalle, 
                  cantidad: parseInt(i.cantidadAtendidaActual),
                  idUnidad: i.idUnidad,
                  precioVenta: i['medicamento'] ? i['medicamento']['precioVenta'] : i['dispMedicoProdSanitario']['precioVenta']
                };

        this.atencionRecetaRequest.recetaCabecera.recetaDetalleList.push(param);
      }
    }
    let dt = new Date();
    this.atencionRecetaRequest.ComprobanteFarmacia.idComprobanteFarmacia = parseInt(dt.getFullYear() + "" + this.atencionRecetaRequest.recetaCabecera.idReceta);
    //borrar esta parte de idcomprobantefarmacia en el controllador igual.
    this.atencionRecetaRequest.idPersona = this.params.idTipoDocumentoIdentidad+""+this.datPaciente.numeroDocumentoIdentidad+"00";
    console.log(this.atencionRecetaRequest.idPersona);
    
    this._atenderRecetaService.atenderReceta(this.atencionRecetaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.getRecetaById(this.atencionRecetaRequest.recetaCabecera.idReceta, this.atencionRecetaRequest.idPersona);
          this.getHistorialRecetaByPersona(this.request.idPersona);
          this.jsonFlags.flgInserta = 1;
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      err => { this.toastr.error(err) },
      () => {
      });
  }

  private sumaTotal(cantidadAtender, posicion) {
    // debugger
    this.recetaDetalle['recetaDetalleList'][posicion].cantPend = this.recetaDetalle['recetaDetalleList'][posicion].cantidad - this.recetaDetalle['recetaDetalleList'][posicion].cantidadAtendida - this.recetaDetalle['recetaDetalleList'][posicion].cantidadAtendidaActual;

    this.recetaDetalle['recetaDetalleList'][posicion].total = cantidadAtender * (this.recetaDetalle['recetaDetalleList'][posicion].medicamento ? this.recetaDetalle['recetaDetalleList'][posicion].medicamento.precioVenta : (this.recetaDetalle['recetaDetalleList'][posicion].dispMedicoProdSanitario ? this.recetaDetalle['recetaDetalleList'][posicion].dispMedicoProdSanitario.precioVenta : 0));
    let total: number = 0;
    for (let i of this.recetaDetalle['recetaDetalleList']) {
      total = total + i.total;
    }
    this.total = total;
  }

  private borrarInput(posicion) {
    this.recetaDetalle.recetaDetalleList[posicion].cantidadAtendidaActual = 0;
    this.recetaDetalle.recetaDetalleList[posicion].total = 0;
  }

  private validarCantAtendida(_cantidadSolicitada: number, _stockLote: number): number {
    return (
      ((_stockLote === 0 || _stockLote === null) || (_cantidadSolicitada === 0 || _cantidadSolicitada === null)) ? 0 :
        (
          (_cantidadSolicitada === 0 || _cantidadSolicitada === null) ? _stockLote :
            (
              (_stockLote === 0 || _stockLote === null) ? _cantidadSolicitada :
                (
                  (_stockLote < _cantidadSolicitada) ? _stockLote : _cantidadSolicitada
                )
            )
        )
    );
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

  //----Genera Orden-----------
  private generarOrden() {
    let fecha = new Date();

    this.request.descripcionAlmacen = this.jsonRuta.queryParams.descripAlmacen
    this.request.fhOrden = fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear()
    this.request.idAlmacen = this.jsonRuta.queryParams.idAlmacen
    this.request.idPersona = this.params.idTipoDocumentoIdentidad+""+this.datPaciente.numeroDocumentoIdentidad+"00";
    this.request.total = this.total // - this.descuento
    this.request.totalPrecio = this.total

    this.request.ordenPagoFarmaciaDetalleList = []
    this.recetaDetalle.recetaDetalleList.forEach(element => {
      let detalle = {
        cantidadAtendida: element.cantidadAtendidaActual,
        cantidadSolicitada: element.cantidad,
        descripcionAlmacen: this.request.descripcionAlmacen,
        fechaVencimientoPago: null, //null
        idAlmacen: this.request.idAlmacen,
        idMedicamento: null,
        idDispMedicoProdSanitario: null,
        idRecetaDetalle: element.idRecetaDetalle,
        nombreMedicamento: null,
        nombreDispMedicoProdSanitario: null,
        formaFarmaceutica: null,
        tipoDispositivo: null,
        precioSubTotal: element.total,
        precioUnitario: null,
        precioVenta: null,
        unidad: element.nombreUnidad,
        idUnidad: null
        
      }

      if(element.medicamento == undefined){
        detalle.idDispMedicoProdSanitario = element.dispMedicoProdSanitario.idDispMedicoProdSanitario;
        detalle.nombreDispMedicoProdSanitario = element.dispMedicoProdSanitario.dciDispMedicoProdSanitario;
        detalle.tipoDispositivo = element.dispMedicoProdSanitario.tipoDispositivo.valor;
        detalle.precioUnitario = element.dispMedicoProdSanitario.precioVenta;
        detalle.precioVenta = element.dispMedicoProdSanitario.precioVenta;  
        detalle.idUnidad = element.idUnidad;        
      }else{
        detalle.idMedicamento = element.medicamento.idMedicamento;
        detalle.nombreMedicamento = element.medicamento.dciProductoFarmaceutico;
        detalle.formaFarmaceutica = element.medicamento.formaFarmaceutica;
        detalle.precioUnitario = element.medicamento.precioVenta;
        detalle.precioVenta = element.medicamento.precioVenta;
        detalle.idUnidad = element.idUnidad;
      }

      this.request.ordenPagoFarmaciaDetalleList.push(detalle);
    });

    const dialogRef = this._modalDialog.open(PrevisualizarOrdenComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      // height: '80%',
      disableClose: false,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.listaOrden = null;
    dialogRef.componentInstance.total = this.total;
    dialogRef.componentInstance.request = this.request;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
      }
    });

    console.log(this.request);
  }

  private getFarmaciaConfigByNombre(nombreConfig) {
    this._atenderRecetaService.getFarmaciaConfigPorNombre(nombreConfig)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          if (data.farmaciaConfig.valorConfig == "1") {
            this.flgConPago = true;
          } else {
            this.flgConPago = false;
          }
        } else {
          this.flgConPago = false;
        }
      },
      error => {
        console.log(error);
      });
  }

  private previsualizar() {
    const dialogRef = this._modalDialog.open(PrevisualizarOrdenComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      // height: '95%',
      disableClose: false,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.listaOrden = this.recetaDetalle.recetaDetalleList;
    dialogRef.componentInstance.total = this.total;
    dialogRef.componentInstance.request = null;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
      }
    });
  }

  private verHistorial(){
    const dialogRef = this._modalDialog.open(HistorialProdDispComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      // height: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.historialReceta = this.historialReceta;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
      }
    });
  }

  private verActoMedico(idCita){
    idCita = this._cambiarValores.replace(idCita);

    const dialogRef = this._modalDialog.open(ActoMedicoComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
      maxHeight: '95%',
      height: '56%',
      disableClose: true
    });
    dialogRef.componentInstance.idCita = idCita;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
      }
    });
  }

  private requestDatosPersonales(params) {
    this.request.apellidosPersona = params.persona.apellidoPaterno + " " + params.persona.apellidoMaterno;
    this.request.idPersona = params.persona.idPersona;
    this.request.nombrePersona = params.persona.nombres;

  }

}



// {
//   "recetaCabecera": {
//     "idReceta": 1,
      
//     "recetaDetalleList": [
//       {
//            "idRecetaDetalle": 1,
//            "cantidad": 5,
//            "idUnidad": 1,
//            "precioVenta": 10.2
//       },
//       {
//            "idRecetaDetalle": 2,
//            "cantidad": 5,
//            "idUnidad": 1,
//            "precioVenta": 10.2
//       }
//     ]
//   },
//   "ComprobanteFarmacia": {
//     "idComprobanteFarmacia": 20191
//   }
// }