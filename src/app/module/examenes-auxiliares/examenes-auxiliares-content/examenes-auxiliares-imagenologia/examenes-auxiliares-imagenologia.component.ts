import { Component, OnInit, Input } from '@angular/core';
import { ExamenesAuxiliaresService } from './../../services/examenes-auxiliares.service';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { SesionService } from "../../../../shared/services/sesion.service";
import { Router, ActivatedRoute } from '@angular/router';

import { ParticularComponent } from '../../../admision/admision-content/acredita/acredita/particular/particular.component';
import { AsignarCoberturaComponent } from './../asignar-cobertura/asignar-cobertura.component';
import { HistorialExamenesComponent } from './../historial-examenes/historial-examenes.component';

@Component({
  selector: 'app-examenes-auxiliares-imagenologia',
  templateUrl: './examenes-auxiliares-imagenologia.component.html',
  styleUrls: ['./examenes-auxiliares-imagenologia.component.scss']
})
export class ExamenesAuxiliaresImagenologiaComponent implements OnInit {
  private IPRESS: any;
  private tipoDocumento: any[] = [];
  private filtro: any[] = [];
  private ordenExamenCabecera: any[] = [];
  private ordenExamenDetalle: any[] = [];
  private id: number = null;
  private total: number = 0;
  private nombreCompleto: String = "";
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private flgMostrar: boolean = false;
  private RequestOrdenCabecera = { idTipoExamen: 2, idTipoDocumentoIdentidad: "0", nuDocumento: null, idOrdenExamenCabecera: null, idArea: 1 }
  private filtro2: any = [];
  private actoMedico: number = null;
  private idArea: number = null;
  private total2: String = "";

  private idCobertura: any;
  private persona: any = { idPersonaEncript: null };
  private vigenciaAtencion: any;
  private vigenciaAcredita: any;
  private descripcionAtencion: any;
  private descripcionAcredita: any;


  constructor(private _examenesAuxiliares: ExamenesAuxiliaresService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.IPRESS = SesionService.obtenerElementos().IPRESS;
  }

  private getObtenerTipoDocumento() {
    this._examenesAuxiliares.obtenerTiposDocumentos()
      .subscribe(data => {
        if (data.estado == 1) {
          this.tipoDocumento = data.tipoDocumentoList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;

      },
        error => {
          console.error(error);
        });
  }

  private getObtenerDetalleCabecera() {
    this._examenesAuxiliares.obtenerOrdenExamen(this.RequestOrdenCabecera)
      .subscribe(data => {
        if (data.estado == 1) {
          this.ordenExamenCabecera = data.ordenExamenList;
          this.persona.idPersonaEncript = data.idPersonaEncriptado;
          console.log(data);
          for (let OED of this.ordenExamenCabecera) {
            OED.persona.idPersona = OED.persona.idPersona.substr(1, 8);
          }
          if (this.ordenExamenCabecera.length > 0) {
            this.paginationParameter.total_rows = this.ordenExamenCabecera[0].nuTotalReg;
          } else {
            this.toastr.error("No se Encontran Datos");
          }
        } else if (data.estado == 0) {
          this.toastr.error(data.mensje);
        }
        return true;
      },
        error => {
          console.error(error);
        },
        () => {

        });

  }
  private buscarPorFiltro() {
    if ((this.RequestOrdenCabecera.idOrdenExamenCabecera == null || this.RequestOrdenCabecera.idOrdenExamenCabecera == "") && (this.RequestOrdenCabecera.idTipoDocumentoIdentidad == null || this.RequestOrdenCabecera.idTipoDocumentoIdentidad == "" || this.RequestOrdenCabecera.nuDocumento == null || this.RequestOrdenCabecera.nuDocumento == "")) {
      this.toastr.warning("Debe Ingresar Datos de Busqueda");
      this.ordenExamenCabecera = [];

      return;
    }
    else {
      this.getObtenerDetalleCabecera();
      this.RequestOrdenCabecera.idOrdenExamenCabecera = null;
      this.RequestOrdenCabecera.idTipoDocumentoIdentidad = null;
      this.RequestOrdenCabecera.nuDocumento = null;
      this.total = null;
      this.filtro = null;
      this.id = null;
      this.nombreCompleto = null;

    }
  }
  private getObtenerDetalle(idOrdenExamenCabecera: number, nombre: string, apellidoPa: string, apellidoMa: string, idActoMed: number, idArea: number, i: number) {
    this.total = null;
    this.id = idOrdenExamenCabecera;
    this.actoMedico = idActoMed;
    this.idArea = idArea;
    this.nombreCompleto = nombre + ' ' + apellidoPa + ' ' + apellidoMa;
    this.filtro = [];
    for (let oec of this.ordenExamenCabecera) {
      oec.color = "";
      if (idOrdenExamenCabecera == oec.idOrdenExamenCabecera) {
        this.filtro = oec.ordenExamenDetalleList;
        let i = 0;
        this.filtro.forEach(item => {
          item.posicion = i;
          if ((item.cita == null || item.cita == undefined) && item.estadoExamenDetalle == "P") {
            item.seleccionado = false;
          }
          else {
            item.seleccionado = true;
          }
          if (item.cita != null && item.estadoExamenDetalle == "P") {
            item.flag = true;
          } else if (item.cita != null && item.estadoExamenDetalle == "A") {
            item.flag = true;
          } else if ((item.cita == null || item.cita == undefined) && item.estadoExamenDetalle == "A") {
            item.flag = true;
          }
          i++;
        });
        oec.color = "bg-info";
      }
    }
    console.log(this.ordenExamenCabecera);
    this.vigenciaAtencion = this.ordenExamenCabecera[i].vigenciaAtencion;
    this.vigenciaAcredita = this.ordenExamenCabecera[i].vigenciaAcredita;
    this.descripcionAtencion = this.ordenExamenCabecera[i].descripcionAtencion;
    this.descripcionAcredita = this.ordenExamenCabecera[i].descripcionAcredita;

    this.persona.nombres = this.ordenExamenCabecera[i].persona.nombres;
    this.persona.apellidoMaterno = this.ordenExamenCabecera[i].persona.apellidoMaterno;
    this.persona.apellidoPaterno = this.ordenExamenCabecera[i].persona.apellidoPaterno;
  }

  private generarCita() {
    if (this.filtro == null) {
      this.toastr.warning("Debe Seleccionar Solicitud de Examenes");
      return;
    }
    // Seleccionar Planes
    if (this.vigenciaAtencion == 1 && this.vigenciaAcredita == 1) {
      const modalRef = this.modalService.open(AsignarCoberturaComponent, { size: 'lg', backdrop: 'static', keyboard: true });
      modalRef.componentInstance.vigenciaAcredita = this.vigenciaAcredita;
      modalRef.componentInstance.vigenciaAtencion = this.vigenciaAtencion;
      modalRef.componentInstance.descripcionAtencion = this.descripcionAtencion; //"12-toma1";
      modalRef.componentInstance.descripcionAcredita = this.descripcionAcredita; //"13-toma3";
      modalRef.result.then((result) => {
        this.idCobertura = result
        console.log("id: " + this.idCobertura);
      }, (reason) => {
        console.log("id: " + this.idCobertura);
      });
    } else {
      const modalRef = this.modalService.open(ParticularComponent, { size: 'lg', backdrop: 'static', keyboard: false });
      modalRef.componentInstance.idPersona = this.persona.idPersonaEncript;
      modalRef.componentInstance.nombres = this.persona.nombres;
      modalRef.componentInstance.apellidoMaterno = this.persona.apellidoMaterno;
      modalRef.componentInstance.apellidoPaterno = this.persona.apellidoPaterno;
      modalRef.result.then((result) => {
        // this.obtenerCitasProgramadas();
      }, (reason) => {
        // this.getAllRoles();
        // this.obtenerCitasProgramadas();
      });
    }
    for (let item of this.filtro) {
      if (item.cita == null && item.estadoExamenDetalle == "P" && item.seleccionado == true) {
        this.filtro2.push(item)
      }
    }
    if (this.filtro2.length == 0) {
      this.toastr.error("Debe Seleccionar Una Orden de Examen");
      return;
    }
    this.flgMostrar = true;
  }

  private sumaTotal(codigoCpt) {
    this.total = 0;
    for (let i of this.filtro) {
      if (i.seleccionado == true && !i.flag) {
        this.total = this.total + i.precioDescuento;
      }
      this.total2 = this.total.toFixed(2);
    }
  }

  cambioFlag(flgRetorno: boolean) {
    this.flgMostrar = flgRetorno;
    this.RequestOrdenCabecera.nuDocumento = null;
    this.RequestOrdenCabecera.idOrdenExamenCabecera = null;
    this.ordenExamenCabecera = [];
    this.nombreCompleto = "";
    this.filtro = [];
    this.filtro2 = [];
    this.total2 = null;
    this.id = null;
  }

  openModalHistorial() {
    const modalRef = this.modalService.open(HistorialExamenesComponent, { size: 'lg', backdrop: 'static', keyboard: true });
    modalRef.componentInstance.idTipoDocumentoIdentidad = this.RequestOrdenCabecera.idTipoDocumentoIdentidad;
    modalRef.componentInstance.nuDocumento = this.RequestOrdenCabecera.nuDocumento;
    modalRef.componentInstance.idTipoExamen = 2;

    modalRef.result.then((result) => {
      // this.idCobertura = result
      // console.log("id: " + this.idCobertura);
    }, (reason) => {
      // console.log("id: " + this.idCobertura);
    });
  }

  ngOnInit() {
    this.getObtenerTipoDocumento();
  }
}

