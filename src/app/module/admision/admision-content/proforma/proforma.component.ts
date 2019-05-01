import { BuscarCoberturaComponent } from './buscar-cobertura/buscar-cobertura.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { TarificadorService } from '../../../tarifario/services/tarificador.service';
import { MatTableDataSource,MatPaginator, MatDialog  } from '@angular/material';
import { MovimientoService } from '../../../farmacia/services/movimiento.service';
import { TarifarioService } from '../../../tarifario/services/tarifario.service';
import { MantenimientoAnaquelService } from '../../../farmacia/services/mantenimiento-anaquel.service';
import { CoberturaServiceService } from '../../../tarifario/services/cobertura-service.service';


@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {

  constructor(
    private _servicioService: TarifarioService,
    private _tarificadorService: TarificadorService,
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private _movimientoService: MovimientoService,
    private _coberturaService: CoberturaServiceService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
  }

  private coberturas: any = [];
  private cobertura = { coSubTipoCobertura: null, coPagoFijo: null, coPagoVariable: null };

  private servicio = { idServicio: null, descripcionTarifario: null, cantidad: 1 };
  private servicioList = [];

  private dispMed = { grupo: null, idMedicamento: null, idDispositivo: null, descMedDisp: null, idUnidad: null, cantidad: null };
  private dispMedList = [];
  private unidadMedDispList = [];

  private totales = { servicio: 0, medDisp: 0, general: 0 };

  private LsServicioTarificador = [];
  dcServicio = ['Codigo Servicio', 'Descripcion Servicio', 'Tipo Moneda', 'Precio', 'Precio Total', 'eliminar'];
  dsServicio = new MatTableDataSource();

  private LsMedicamentoTarificador = [];
  dcMedDisp = ['Codigo Medicamento', 'Producto Farmaceutico - Dispositivo Medico', 'Unidad', 'Cantidad', 'Precio', 'Precio Total', 'eliminar'];
  dsMedDisp = new MatTableDataSource();

  ngOnInit() {
  }
  //Abrir modal de cobertura
  modalBuscarCobertura() {
    const dialogRef = this._modalDialog.open(BuscarCoberturaComponent, {
      autoFocus: false,
      maxWidth: '80%',
       width: '80%',
       height: '80%',
      maxHeight: '80%',
       //height: '80%',
      disableClose: true,
      hasBackdrop: true,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       console.log(result)
       this.cobertura.coSubTipoCobertura=result.coTiCobertura+result.coSubTiCobertura;
       this.cobertura.coPagoFijo = result.coPagoFijo;
       this.cobertura.coPagoVariable=result.coPagoVariable;
       this.getSubTipoCobertura(null);
      }
    });
  }
  //Sumas-----------------------------------------------------
  private sumaGeneral() {
    this.totales.general = this.totales.servicio + this.totales.medDisp;
  }

  private sumarServicios() {
    this.totales.servicio = 0;
    this.LsServicioTarificador.forEach(element => {
      this.totales.servicio += element.precioTotal;
    });
    this.sumaGeneral();
  }

  private sumarMedDisp() {
    this.totales.medDisp = 0;
    this.LsMedicamentoTarificador.forEach(element => {
      this.totales.medDisp += element.precioTotal;
    });
    this.sumaGeneral();
  }

  //Medicamentos Dsipositivos---------------------------------------------------
  private agregarMedDisp() {

    if (this.existElementInList(this.LsMedicamentoTarificador, "idItem", this.dispMed.idMedicamento)) {
      this.toastr.warning("Este Medicamento ya se encuentra agregado en la lista.");
      this.dispMed = { grupo: null, idMedicamento: null, idDispositivo: null, descMedDisp: null, idUnidad: null, cantidad: null };
      this.unidadMedDispList = [];
    } else if (this.existElementInList(this.LsMedicamentoTarificador, "idItem", this.dispMed.idDispositivo)) {
      this.toastr.warning("Este Dispositivo Médico ya se encuentra agregado en la lista.");
      this.dispMed = { grupo: null, idMedicamento: null, idDispositivo: null, descMedDisp: null, idUnidad: null, cantidad: null };
      this.unidadMedDispList = [];
    } else {
      try {
        let param = { tarificadorList: [] };

        let aux = {
          codCobertura: (this.cobertura.coSubTipoCobertura).substring(0, 1),
          codSubTipoCobertura: (this.cobertura.coSubTipoCobertura).substring(1),
          idMedicamento: this.dispMed.idMedicamento,
          idDispositivo: this.dispMed.idDispositivo,
          tipoMoneda: 1,
          copagoFijo: this.cobertura.coPagoFijo,
          copagVariable: this.cobertura.coPagoVariable,
          cantidad: this.dispMed.cantidad,
          idUnidad: this.dispMed.idUnidad
        }
        param.tarificadorList.push(aux);

        this._tarificadorService.obtenerProforma(param)
          .subscribe(data => {
            if (data.estado == 1) {
              let arr = data.itemTarificadorList;
              arr.forEach(element => {
                this.LsMedicamentoTarificador.push(element);
              });

              this.sumarMedDisp();
              this.dsMedDisp = new MatTableDataSource(this.LsMedicamentoTarificador);
            }
            else {
              console.log(data.mensaje);
              this.LsMedicamentoTarificador = [];
            }
            return true;
          },
            error => {
              console.error("Error al Listar");
              return Observable.throw(error);
            }),
          err => console.error(err),
          () => console.log('Request Complete');
      } catch (error) {
        console.log(error);
      } finally {
        this.dispMed = { grupo: null, idMedicamento: null, idDispositivo: null, descMedDisp: null, idUnidad: null, cantidad: null };
        this.unidadMedDispList = [];
      }
    }
  }



  private deleteMedDisp(indice) {
    this.LsMedicamentoTarificador.splice(indice, 1);
    this.sumarMedDisp();
    this.dsMedDisp = new MatTableDataSource(this.LsMedicamentoTarificador);
  }

  private getMedDisp(value) {
    this.dispMedList = [];
    this.dispMed.idUnidad = null;
    this.dispMed.idDispositivo = null;
    this.dispMed.idMedicamento = null;
    if (value && value.trim() != '') {
      if (value.length % 2 == 0) {
        let param = { idAlmacen: null, descripcionMedicDispProdSanid: value, idMedicamento: null, idDispMedicoProdSanitario: null };

        this._mantenimientoAnaquelService.getMedicamentoDispositivo(param)
          .subscribe(data => {
            if (data.estado == 1) {
              let lista = data.medicamentoDispMedicoProdSanitarioList;
              this.dispMedList = lista.filter(obj => obj.fiTipo === this.dispMed.grupo);
            } else {
              this.dispMedList = [];
            }
          },
            err => {
              console.error(err);
              this.dispMedList = [];
            });
      }
    }
  }

  private seleccionarMedDisp(medDisp) {
    this.dispMedList = [];

    if (this.dispMed.grupo == "M") {
      this.dispMed.idMedicamento = medDisp.idMedicamento;
      this.dispMed.idDispositivo = null;
      this.getUnidadMedicamentoDispositivo(medDisp.idMedicamento, null)
    } else {
      this.dispMed.idDispositivo = medDisp.idMedicamento;
      this.dispMed.idMedicamento = null;
      this.getUnidadMedicamentoDispositivo(null, medDisp.idMedicamento)
    }
  }

  private getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
    let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
    this.unidadMedDispList = [];
    this._movimientoService.getUnidadMedicamentoDispositivo(param)
      .subscribe(data => {

        if (data.estado == 1) {
          this.unidadMedDispList = data.listUnidad;
        } else {
          this.unidadMedDispList = []
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  //-----------------------------------------------------

  private agregarServicio() {
    if (this.existElementInList(this.LsServicioTarificador, "idItem", this.servicio.idServicio)) {
      this.toastr.warning("Este Servicio ya se encuentra agregado en la lista.");
      this.servicio.idServicio = null;
      this.servicio.descripcionTarifario = null;
    } else {
      try {
        let param = { tarificadorList: [] };
        let aux = {
          codCobertura: (this.cobertura.coSubTipoCobertura).substring(0, 1),
          codSubTipoCobertura: (this.cobertura.coSubTipoCobertura).substring(1),
          idServicio: this.servicio.idServicio,
          tipoMoneda: 1,
          copagoFijo: this.cobertura.coPagoFijo,
          copagVariable: this.cobertura.coPagoVariable,
          cantidad: this.servicio.cantidad
        }
        param.tarificadorList.push(aux);

        this._tarificadorService.obtenerProforma(param)
          .subscribe(data => {
            if (data.estado == 1) {
              let arr = data.itemTarificadorList;
              arr.forEach(element => {
                this.LsServicioTarificador.push(element);
              });

              this.sumarServicios();
              this.dsServicio = new MatTableDataSource(this.LsServicioTarificador);
            }
            else {
              console.log(data.mensaje);
              this.LsServicioTarificador = [];
            }
            return true;
          },
            error => {
              console.error("Error al Listar");
              return Observable.throw(error);
            }),
          err => console.error(err),
          () => console.log('Request Complete');
      } catch (error) {
        console.log(error);
      } finally {
        this.servicio.idServicio = null;
        this.servicio.descripcionTarifario = null;
      }
    }
  }

  private deleteServicio(indice) {
    this.LsServicioTarificador.splice(indice, 1);
    this.sumarServicios();
    this.dsServicio = new MatTableDataSource(this.LsServicioTarificador);
  }

  private getServicios(value) {
    this.servicioList = [];
    if (value && value.trim() != '') {
      if (value.length % 2 == 0) {
        let param = { descripcionTarifario: value, flgCpt: null, flgActividad: null, nuPagina: null, nuRegisMostrar: null };

        this._servicioService.getServicios(param)
          .subscribe(data => {
            if (data.estado == 1) {
              this.servicioList = data.serviciosList;
            } else {
              this.servicioList = [];
            }
          },
            err => {
              console.error(err);
              this.servicioList = [];
            });
      }
    }
  }

  private placeServDesc(detallesServicio) {
    this.servicio.idServicio = detallesServicio.idServicio;
    this.servicioList = [];
  }

  //Algoritmo de Busqueda
  private existElementInList(list, prop, element): boolean {
    for (let _item of list) {
      if (_item[prop] == element) {
        return true;
      }
    }
    return false;
  }

  private getSubTipoCobertura(event) {
    let param = { coCoberSubCober: this.cobertura.coSubTipoCobertura };
    this._coberturaService.getSubTipoCobertura(param)
      .subscribe(data => {
        console.log(data, data.subTipoCoberturaList[0].copagoFijo);
        if (data.estado == 1) {
          this.cobertura.coPagoFijo = data.subTipoCoberturaList[0].copagoFijo;
          this.cobertura.coPagoVariable = data.subTipoCoberturaList[0].copagoVariable;
          console.log(data);
        }
         else {
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
