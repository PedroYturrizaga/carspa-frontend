import { Component, OnInit, ViewChild } from '@angular/core';
import { FiliacionService } from '../../services/filiacion.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { AppService } from '../../../../shared/services/app.service';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-filiacion',
  templateUrl: './filiacion.component.html',
  styleUrls: ['./filiacion.component.scss'],
  providers: [FiliacionService, AppService]
})
export class FiliacionComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['descripcionTipoDocumentoIdentidad', 'numeroDocumentoIdentidad', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'tipoHistoria', 'editar'];
  dataSource = new MatTableDataSource();

  private pacientes: any[] = null;
  private tipoDocumentos: any[] = [];
  private params: any = { tipoDocumentoIdentidad: null, numeroDocumentoIdentidad: null, apellidoPaterno: null, apellidoMaterno: null, nombres: null };
  private paramsAuxi: any = { tipoDocumentoIdentidad: null, numeroDocumentoIdentidad: null, apellidoPaterno: null, apellidoMaterno: null, nombres: null };
  private flag: any = true;
  private flagSerchFiliado: any = false;
  private longitudDocumento = "?";
  private prueba = true;
  private longitud = 0;
  private persona: any[] = null;
  private disabled: any = { persona: false, direccionActual: null, datoAcompaniante: null, datoRepreLegal: null, datoPadre: null, datoRecienNacido: null, tipoPaciente: null, actualizar: null, registrar: null };
  private pagination: any;
  private displayedSize: number[];
  private pageSize;

  constructor(
    private _appService: AppService,
    private _filiacionService: FiliacionService,
    private toastr: ToastsManager
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [5, 10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
  }

  ngOnInit() {
    this.getPaciente(1).then();
    this.getTipoDocumentos();
  }
  private getTipoDocumentos() {
    this._appService.getTipoDocumentos()
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.tipoDocumentos = data.tipoDocumentoList;
          } else if (data.estado == 0) {
          } else {
            console.log(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }
  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
      this.params.numeroDocumentoIdentidad = null;
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
  private pageEvent($event) {
    // this.paginationParameter.nuPagina = event.pageIndex;
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getPaciente().then();
  }

  private getPaciente(numPagina?: number, formulario?: FormGroupDirective) {
    // this.params.nuPagina = this.paginationParameter.nuPagina;

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.paramsAuxi).forEach(key => {
      this.paramsAuxi[key] = (this.paramsAuxi[key] === '') ? null : this.paramsAuxi[key];
    });
    this.paramsAuxi = {
      ...this.paramsAuxi,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    let promise = new Promise((resolve, reject) => {
      console.log(this.paramsAuxi);
      
      this._filiacionService.getPaciente(this.paramsAuxi)
        .toPromise().then(data => {
          console.log(data);
          if (data.estado == 1) {
            this.pacientes = data.pacienteList;
            this.dataSource = new MatTableDataSource(this.pacientes);

            if (this.matPag) {
              this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
            }
            if (this.pacientes.length > 0) {
              this.pagination.nuRegisMostrar = this.pacientes[0].numTotalReg;
            }

          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private getPersona() {
    if (this.paramsAuxi.numeroDocumentoIdentidad != null && this.paramsAuxi.tipoDocumentoIdentidad != null) {
      let promise = new Promise((resolve, reject) => {
        this._filiacionService.getPersona(this.paramsAuxi)
          .toPromise().then(data => {
            if (data.estado == 1) {
              // debugger
              if (data.personaList.length > 0) {
                this.persona = data.personaList;
              } //else {
              //   // this.toastr.warning(data.mensaje);
              //   console.log(data.mensaje);
              //   return;
              // }
            } else if (data.estado == -1) {
              this.toastr.error("Error en el Servicio ..." + data.mensaje);
            } else if (data.estado == 0) {
              this.toastr.error("Error en el negocio del Servicio ..." + data.mensaje);
            }
            resolve();
          },
            err => {
              console.error(err);
            });
      })
      return promise;
    }
  }
  cleanRegistro(findPersona: FormGroupDirective) {
    findPersona.resetForm();
  }

  private buscarFIliado(findPersona: FormGroupDirective) {
    if (isInvalid(findPersona)) {
      this.toastr.warning("Completar Datos");
      return;
    }
    this.paramsAuxi = this.params
    this.getPaciente(1, findPersona).then(() => {
      this.matPag.firstPage();
      if (this.pacientes == null) {
        this.toastr.warning("La persona no se encuentra filiada");
      }
    });
  }

  private filiarPersona(findPersona: FormGroupDirective) {
    //Valida los campos necesarios para consultar
    if (this.params.tipoDocumentoIdentidad == null || this.params.tipoDocumentoIdentidad == undefined) {
      this.toastr.warning("debe seleccionar un tipo de documento");
      return;
    }
    if (this.params.numeroDocumentoIdentidad == null || this.params.numeroDocumentoIdentidad == "") {
      this.toastr.warning("Debe ingresar un número de documento.");
      return;
    }
    if (isInvalid(findPersona)) {
      this.toastr.warning("Completar Datos");
      return;
    }
    this.paramsAuxi = this.params
    //comprobar si la persona se encuentra filiada
    this.getPaciente(1).then(() => {
      //debugger
      if (this.pacientes != null) {

        let param: any;
        param = this.pacientes.findIndex(obj => obj['tipoDocumento'] == this.params.tipoDocumentoIdentidad && obj['numeroDocumentoIdentidad'] == this.params.numeroDocumentoIdentidad)
        if (param != -1) {
          this.toastr.warning("La persona ya esta filiado");
          findPersona.resetForm();
        }
        else {
          this.paramsAuxi = this.params
          this.getPersona().then(() => {
            //debugger
            if (this.persona == null) {
              this.toastr.warning("La persona No existe");
              findPersona.resetForm();
            }
            else {
              findPersona.resetForm();
              this.disabled = { persona: true, direccionActual: true, datoAcompaniante: true, datoRepreLegal: true, datoPadre: false, datoRecienNacido: false, tipoPaciente: true, actualizar: false, registrar: true };
            }
          });
        }
      }
    });
  }

  filiarPersonaManual(findPersona: FormGroupDirective) {
    this.cleanRegistro(findPersona);
    // this.paramsAuxi.numeroDocumentoIdentidad = null;
    // this.paramsAuxi.tipoDocumentoIdentidad = null;
    // this.params = null;
    this.persona = null;
    this.disabled = { persona: true, direccionActual: true, datoAcompaniante: true, datoRepreLegal: true, datoPadre: false, datoRecienNacido: false, tipoPaciente: true, actualizar: false, registrar: true };
  }

  abrirRN(findPersona: FormGroupDirective) {
    if (this.params.tipoDocumentoIdentidad == null || this.params.tipoDocumentoIdentidad == undefined) {
      this.toastr.warning("debe seleccionar un tipo de documento");
      return;
    }
    if (this.params.numeroDocumentoIdentidad == null || this.params.numeroDocumentoIdentidad == "") {
      this.toastr.warning("Debe ingresar un número de documento.");
      return;
    }
    //Valida los campos necesarios para consultar
    if (isInvalid(findPersona)) {
      this.toastr.warning("Completar Datos");
      return;
    }
    this.paramsAuxi = this.params;
    // obtener datos de la madre
    this.getPaciente(1).then(() => {
      if (this.pacientes != null) {
        let param: any;
        // debugger
        param = this.pacientes.findIndex(obj => (obj['tipoDocumento'] == this.paramsAuxi.tipoDocumentoIdentidad && obj['numeroDocumentoIdentidad'] == this.paramsAuxi.numeroDocumentoIdentidad) && obj['idSexo'] == 2)
        if (param == -1) {
          this.toastr.warning("Solo una mujer puede ser madre");
          findPersona.resetForm();
        } else {
          this.persona = [{}];
          this.persona[0] = this.pacientes[param];
          this.persona[0].descripcionDocumento = this.pacientes[param].descripcionTipoDocumentoIdentidad;
          this.persona[0].sexo = this.pacientes[param].descripcionSexo;
          this.persona[0].fecInscripcion = this.pacientes[param].fechInscripcion;
          this.persona[0].fecExpedicion = this.pacientes[param].fechExpedicion;
          this.persona[0].domicilio = this.pacientes[param].direccionDomicilio;
          findPersona.resetForm();
          this.disabled = { persona: true, direccionActual: false, datoAcompaniante: true, datoRepreLegal: false, datoPadre: true, datoRecienNacido: true, tipoPaciente: false, actualizar: false, registrar: true };

        }
      }
    });
  }

  actualizarFiliado(filiado, buscarPersona: FormGroupDirective) {
    console.log(filiado);

    this.persona = [];
    // this.paramsAuxi = this.params;
    //Ejecuta el metodo para buscar al paciente

    let param: any;
    //si encuentra al paciente devolverá su indice sino -1
    param = this.pacientes.findIndex(obj => obj['tipoDocumento'] == filiado.tipoDocumento && obj['idPersona'] == filiado.idPersona)
    if (param != -1) {
      this.persona = [];
      // debugger

      this.persona.push(this.pacientes[param]);
      // this.persona[0].domicilioUbigeo = this.pacientes[param].codigoDepartamento +""+ this.pacientes[param].codigoProvincia+""+ this.pacientes[param].codigoDistrito ;
      this.persona[0].descripcionDocumento = this.pacientes[param].descripcionTipoDocumentoIdentidad;
      this.persona[0].sexo = this.pacientes[param].descripcionSexo;
      this.persona[0].fecInscripcion = this.pacientes[param].fechInscripcion;
      this.persona[0].fecExpedicion = this.pacientes[param].fechExpedicion;
      this.persona[0].domicilio = this.pacientes[param].direccionDomicilio;

      // this.persona[0].distritoNacimiento = this.pacientes[param].descripcionSexo;
      // this.persona[0].gradoInstruccion = this.pacientes[param].descripcionSexo;
      // this.persona[0].distritoNacimiento = this.pacientes[param].descripcionSexo;
      // this.persona[0].distritoNacimiento = this.pacientes[param].descripcionSexo;
      this.disabled = { persona: true, direccionActual: true, datoAcompaniante: false, datoRepreLegal: false, datoPadre: false, datoRecienNacido: false, actualizar: true };
      buscarPersona.resetForm();
    }

    // this.disabled = { persona: true, direccionActual: true, datoAcompaniante: false, datoRepreLegal: false, datoPadre: false, datoRecienNacido: false };
  }
  apePaterno(): boolean {
    if ((this.params.apellidoMaterno == null && this.params.nombres == null) ||
      (this.params.apellidoMaterno === "" && this.params.nombres === "") ||
      (this.params.apellidoMaterno == null && this.params.nombres === "") ||
      (this.params.apellidoMaterno === "" && this.params.nombres == null)) {
      return false;
    }
    else {
      return true;
    }
  }
  apeMaterno(): boolean {
    if ((this.params.apellidoPaterno == null && this.params.nombres == null) ||
      (this.params.apellidoPaterno === "" && this.params.nombres === "") ||
      (this.params.apellidoPaterno == null && this.params.nombres === "") ||
      (this.params.apellidoPaterno === "" && this.params.nombres == null)) {
      return false;
    }
    else {
      return true;
    }
  }
  apeNombres(): boolean {
    if ((this.params.apellidoMaterno == null && this.params.apellidoPaterno == null) ||
      (this.params.apellidoMaterno === "" && this.params.apellidoPaterno === "") ||
      (this.params.apellidoMaterno == null && this.params.apellidoPaterno === "") ||
      (this.params.apellidoMaterno === "" && this.params.apellidoPaterno == null)) {
      return false;
    }
    else {
      return true;
    }
  }
  private cambiarFlag(flgRecibido) {
    this.disabled.persona = flgRecibido;
    this.paramsAuxi = this.params;
    this.getPaciente(1);
    window.scroll(0, 0);
  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private verificarFiliacion(_ngForm: any): boolean {
    if (isInvalid(_ngForm) || !this.params.tipoDocumentoIdentidad || this.params.nombres || this.params.apellidoPaterno || this.params.apellidoMaterno) {
      return true;
    }
    else return false;
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


}