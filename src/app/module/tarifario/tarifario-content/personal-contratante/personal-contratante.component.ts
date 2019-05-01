import { Component, OnInit, ViewChild } from '@angular/core';
import { ConvenioService } from './../../services/convenio.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { ProductoServiceService } from '../../services/producto-service.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { PersonalContratanteService } from '../../services/personal-contratante.service';
import { FormControl, NgForm } from '@angular/forms';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from
  '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-personal-contratante',
  templateUrl: './personal-contratante.component.html',
  styleUrls: ['./personal-contratante.component.scss']
})
export class PersonalContratanteComponent implements OnInit {
  @ViewChild('ingresarDatosPaciente') private _ingresarDatosPacienteForm: NgForm;
  @ViewChild('probarConvenioProducto') private _probarConvenioProducto: NgForm;
  private lsConvenio = [];
  private lsProducto = [];
  private lsGenero = [];
  private lsDocumento = [];
  private lsParentesco = [];
  private lsEstadoCivil = [];
  dataSource = new MatTableDataSource();
  private producto = { idConvenio: null }
  private paramsObtenerPersona = { tipoDocumento: null, nroDocumento: null, idConvenio: null };
  private requestGeneral = {
    personaContrante: {
      idAsegurado: null, idPoliza: null, idConvenio: null, nombres: null, apellidoPaterno: null, apellidoMaterno: null, codGenero: null,
      fhNacimiento: null, idParentesco: null, idDocumento: null, nroDocumento: null, edad: null, idEstadoCivil: null, inicioVigencia: null,
      finVigencia: null, fhCarencia: null, idDocumentoTitular: null, nroDocumentoTitular: null, nombreGenero: null, nombreParentesco: null,
      descripcionDocumento: null, descripcionEstadoCivil: null, nombreDocumentoTitular: null
    },
    productoPersonaContratanteList: []
  };
  private fhNacimiento: Date = null;
  private inicioVigencia: Date = null;
  private finVigencia: Date = null;
  private fhCarencia: Date = null;
  private tamDoc: any = "?";
  private tamDoc2: any = "?";
  displayedColumns = ['nombreConvenio', 'numeroProducto', 'producto', 'estado', 'cambiarEstado', 'eliminar']
  private convenioID: any;
  private tablaAuxiliar: any = [];

  constructor(
    private _productoService: ProductoServiceService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _personalContratanteService: PersonalContratanteService) { }

  ngOnInit() {
    this.TraerConvenio();
    this.TraerGenero();
    this.TraerParentesco();
    this.TraerDocumento();
    this.TraerEstadoCivil();
    this.TraerDocumentoTitular();
  }
  public TraerProducto() {
    this.lsProducto = [];
    //this.producto.idConvenio =3
    this.producto.idConvenio = this.jsonRequestGeneral.idConvenio
    //this.producto.idConvenio = lsConvenio[0].idConvenio
    this._productoService.getProductoConvenio(this.producto)
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsProducto = data.producto;
          //  this.toastr.success(data.mensaje);
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

  private jsonRequestGeneral = { codProducto: null, estado: 0, idConvenio: null, idDocumento: null, nroDocumento: null, nombreProducto: null, nombreConvenio: null };

  seleccionarProducto(producto) {
    this.jsonRequestGeneral.codProducto = producto.coProdCode;
    this.jsonRequestGeneral.nombreProducto = producto.noProdName;
  }

  lsProductoEliminado: any = [];


  private aux = {
    codProducto: null,
    noProdName: null,
    nombreConvenio: null,
    estado: null,
    idConvenio: null,
    idDocumento: null,
    nroDocumento: null
  }

  probar() {

    for (let item of this.tablaAuxiliar) {
      if (item.codProducto == this.jsonRequestGeneral.codProducto && item.idConvenio == this.jsonRequestGeneral.idConvenio) {
        this.toastr.warning("Ya ingreso este proucto")
        return;
      }
    }

    this.jsonRequestGeneral.estado = 1;

    this.aux = {
      codProducto: this.jsonRequestGeneral.codProducto,
      noProdName: this.jsonRequestGeneral.nombreProducto,
      nombreConvenio: this.jsonRequestGeneral.nombreConvenio,
      estado: 0,
      idConvenio: this.jsonRequestGeneral.idConvenio,
      idDocumento: null,
      nroDocumento: null
    }
    this.tablaAuxiliar.push(this.aux);
    this.dataSource = new MatTableDataSource(this.tablaAuxiliar);
    this.jsonRequestGeneral.idConvenio = null;
    this.jsonRequestGeneral.nombreConvenio = null;
    this.jsonRequestGeneral.codProducto = null;
    this.jsonRequestGeneral.nombreProducto = null;

    this.lsProducto = [];
  }


  public TraerConvenio() {

    this._personalContratanteService.obtenerConvenioPersonaContratante()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsConvenio = data.convenioList;
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

  seleccionarConvenio(lsConvenio) {
    this.requestGeneral.personaContrante.idConvenio = lsConvenio.idConvenio;
    this.jsonRequestGeneral.idConvenio = lsConvenio.idConvenio;
    this.jsonRequestGeneral.nombreConvenio = lsConvenio.nombreConvenio;
    this.TraerProducto();
  }


  eliminarProducto() {

  }

  public TraerGenero() {

    this._personalContratanteService.obtenerGeneroPersonaContratante()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsGenero = data.personaContratanteList;
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

  seleccionarGenero(lsGenero) {
    this.requestGeneral.personaContrante.codGenero = lsGenero.codGenero;
  }

  public TraerParentesco() {
    this._personalContratanteService.obtenerParentezco()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsParentesco = data.personaContratanteList;
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

  seleccionarParentesco(lsParentesco) {
    this.requestGeneral.personaContrante.idParentesco = lsParentesco.idParentesco;
  }

  public TraerDocumento() {
    this._personalContratanteService.obtenerDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsDocumento = data.personaContratanteList;
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

  seleccionarDocumento(lsDocumento) {
    this.requestGeneral.personaContrante.idDocumento = lsDocumento.idDocumento;
  }

  public TraerEstadoCivil() {
    this._personalContratanteService.obtenerEstadoCivil()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsEstadoCivil = data.personaContratanteList;
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


  seleccionarEstadoCivil(lsEstadoCivil) {
    this.requestGeneral.personaContrante.idEstadoCivil = lsEstadoCivil.idEstadoCivil;
  }

  private lsDocumentoTitular: any = [];
  private localTitular: any = [];
  public TraerDocumentoTitular() {
    this._personalContratanteService.obtenerDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.lsDocumentoTitular = data.personaContratanteList;
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


  seleccionarDocumentoNoTitular(lsNoTitular) {
    this.requestGeneral.personaContrante.idDocumentoTitular = lsNoTitular.idDocumento;
  }

  private insertarProductoContratante() {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.requestGeneral.personaContrante.fhNacimiento = ((this.fhNacimiento).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.requestGeneral.personaContrante.inicioVigencia = ((this.inicioVigencia).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.requestGeneral.personaContrante.finVigencia = ((this.finVigencia).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.requestGeneral.personaContrante.fhCarencia = ((this.fhCarencia).toLocaleDateString('es-PE', options)).split('/').join('-');

    this.requestGeneral.personaContrante.nroDocumentoTitular = this.contenedorPersonal.nroDocAuxiliar;
    this.requestGeneral.personaContrante.idDocumentoTitular = this.contenedorPersonal.idDocAuxiliar;

    this.aux.nroDocumento = this.requestGeneral.personaContrante.nroDocumento;
    this.aux.idDocumento = this.requestGeneral.personaContrante.idDocumento;

    this.requestGeneral.productoPersonaContratanteList = this.tablaAuxiliar.slice();

    if (this.requestGeneral.personaContrante.idParentesco == 1) {
      this.requestGeneral.personaContrante.idDocumentoTitular = null;
      this.requestGeneral.personaContrante.nroDocumentoTitular = null;
    }

    this._personalContratanteService.insertarPersonaContratante(this.requestGeneral)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.requestGeneral = {
            personaContrante: {
              idAsegurado: null, idPoliza: null, idConvenio: null, nombres: null, apellidoPaterno: null, apellidoMaterno: null, codGenero: null,
              fhNacimiento: null, idParentesco: null, idDocumento: null, nroDocumento: null, edad: null, idEstadoCivil: null, inicioVigencia: null,
              finVigencia: null, fhCarencia: null, idDocumentoTitular: null, nroDocumentoTitular: null, nombreGenero: null, nombreParentesco: null,
              descripcionDocumento: null, descripcionEstadoCivil: null, nombreDocumentoTitular: null
            },
            productoPersonaContratanteList: []
          };
          this.tablaAuxiliar = [];
          this._probarConvenioProducto.resetForm();
          this._ingresarDatosPacienteForm.resetForm();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
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

  private verificarEdad() {
    let nacido = this.fhNacimiento;
    let hoy = new Date();
    let cumpleanos = new Date(nacido);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (edad < 0) {
      this.toastr.warning("Ingrese la fecha de Nacimiento nuevamente")
      this.requestGeneral.personaContrante.edad = null;
      return;
    }
    this.requestGeneral.personaContrante.edad = edad;
  }

  verificarTamanio(item) {
    this.requestGeneral.personaContrante.idDocumento = null;
    if (item == 'Documento Nacional de Identidad') {
      this.tamDoc = '8';
    }
    if (item == 'Carné de extranjería') {
      this.tamDoc = '12';
    }
    if (item == 'Pasaporte') {
      this.tamDoc = '12';
    }
    if (item == 'Documento de Identidad Extranjero') {
      this.tamDoc = '15';
    }
    if (item == 'Código único de Identificación') {
      this.tamDoc = '8';
    }
    if (item == 'Código Nacido Vivo') {
      this.tamDoc = '10';
    }
    if (item == 'Sin Documento de Identidad') {
      this.tamDoc = '8';
    }
    if (item == 'Registro Único de Contribuyente') {
      this.tamDoc = '11';
    }
    if (item == '"Número Correlativo de Organización"') {
      this.tamDoc = '9';
    }
  }

  private lsPersContr: any = [];
  private contenedorPersonal = { idAsegurado: null, nombres: null, inicioVigencia: null, finVigencia: null, fhCarencia: null, estadoAfiliacion: null, fhAfiliacion: null, nroDocAuxiliar: null, idDocAuxiliar: null };

  traerDetalleporDocumento() {
    this.paramsObtenerPersona.idConvenio = this.requestGeneral.personaContrante.idConvenio;
    this.paramsObtenerPersona.tipoDocumento = this.requestGeneral.personaContrante.idDocumentoTitular;
    this.paramsObtenerPersona.nroDocumento = this.requestGeneral.personaContrante.nroDocumentoTitular;

    this._personalContratanteService.listarPersonaContratante(this.paramsObtenerPersona)
      .subscribe(data => {
        if (data.estado == 1) {

          this.lsPersContr = data.listaPersonaContratante;
          this.contenedorPersonal.idAsegurado = this.lsPersContr[0].idAsegurado;
          this.contenedorPersonal.nombres = this.lsPersContr[0].nombres;
          this.contenedorPersonal.inicioVigencia = this.lsPersContr[0].inicioVigencia;
          this.contenedorPersonal.finVigencia = this.lsPersContr[0].finVigencia;
          this.contenedorPersonal.fhCarencia = this.lsPersContr[0].fhCarencia;
          this.contenedorPersonal.estadoAfiliacion = this.lsPersContr[0].estadoAfiliacion;
          this.contenedorPersonal.fhAfiliacion = this.lsPersContr[0].fhAfiliacion;
          this.contenedorPersonal.nroDocAuxiliar = this.paramsObtenerPersona.nroDocumento;
          this.contenedorPersonal.idDocAuxiliar = this.paramsObtenerPersona.tipoDocumento;
        } else if (data.estado == 0) {
          this.toastr.warning("El documento no existe, ingrese otro.")
          this.contenedorPersonal = { idAsegurado: null, nombres: null, inicioVigencia: null, finVigencia: null, fhCarencia: null, estadoAfiliacion: null, fhAfiliacion: null, nroDocAuxiliar: null, idDocAuxiliar: null };
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

  private deleteProducto(indice) {
    this.tablaAuxiliar.splice(indice, 1);
    this.dataSource = new MatTableDataSource(this.tablaAuxiliar);
  }


  verificarTamanio2(item) {
    this.requestGeneral.personaContrante.idDocumentoTitular = null;
    if (item == 'Documento Nacional de Identidad') {
      this.tamDoc2 = '8';
    }
    if (item == 'Carné de extranjería') {
      this.tamDoc2 = '12';
    }
    if (item == 'Pasaporte') {
      this.tamDoc2 = '12';
    }
    if (item == 'Documento de Identidad Extranjero') {
      this.tamDoc2 = '15';
    }
    if (item == 'Código único de Identificación') {
      this.tamDoc2 = '8';
    }
    if (item == 'Código Nacido Vivo') {
      this.tamDoc2 = '10';
    }
    if (item == 'Sin Documento de Identidad') {
      this.tamDoc2 = '8';
    }
    if (item == 'Registro Único de Contribuyente') {
      this.tamDoc2 = '11';
    }
    if (item == '"Número Correlativo de Organización"') {
      this.tamDoc2 = '9';
    }
  }
}