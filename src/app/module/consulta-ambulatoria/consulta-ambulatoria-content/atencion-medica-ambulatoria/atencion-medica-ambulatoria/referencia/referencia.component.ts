import { ModalConfirmacionComponent } from './../../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CambiarValoresEncriptados } from '../../../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { ActividadService } from '../../../../../../shared/services/actividad.service';
import { ComboGeneralService } from '../../../../../../shared/services/combo-general.service';
import { RedAsistencialService } from '../../../../services/red-asistencial.service';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatIconRegistry, MatDialog } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { getIpress } from "./../../../../../../shared/auth/storage/cabecera.storage";
import { ReferenciaService } from '../../../../services/referencia.service';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.scss']
})

export class ReferenciaComponent implements OnInit {
  @ViewChild('referenciaForm') private _Form: NgForm;

  // displayedColumnsDiagnosticos = ['codigoDiagnostico', 'descripcionDiagnostico', 'idDiagnosticoCaso', 'altaDiagnostico', 'editar', 'eliminar'];
  displayedColumnsDiagnosticos = ['codigoDiagnostico', 'descripcionDiagnostico', 'idDiagnosticoCaso', 'altaDiagnostico', 'eliminar'];
  dataSourceDiagnosticos = new MatTableDataSource();

  toppings = new FormControl();

  private _params = { idPersona: "", idIPRESS: "", idDiagnostico: null, idActoMedicoEncriptado: null, idAtencionEncriptado: null, flidSubActividad: null };
  private txtButton = 'Referenciar';

  private referenciaJson = {
    referencia: {
      idActoMedicoEncriptado: null,
      idAtencionEncriptado: null,
      idDiagnosticoJson: null,
      idDiagnostico: null,
      idDiagnosticos: null,
      idIPRESSDestino: null,
      idArea: null,
      idEspecialidad: null,
      idActividad: null,
      idSubActividad: null,
      fhReferenciaCompleto: new Date(),
      fhReferencia: null,
      idPrioridad: null,
      telefonoFijo: null,
      telefonoCelular: null,
      email: null,
      resumenHistoria: null,
      idMotivoReferencia: null,
      observacion: null,
      usuarioIns: null
    }
  }

  private ipressList = [];
  private areaList = [];
  private especialidadList = [];
  private actividadList = [];
  private subActividadList = [];
  private diagnosticoListR: any = [];
  private diagnosticoListNR: any = [];
  private contador = 1;

  constructor(public _cambiarValoresEn: CambiarValoresEncriptados,
    public _actividadService: ActividadService,
    private toastr: ToastsManager,
    public _comboGeneralService: ComboGeneralService,
    public _redAsistencialService: RedAsistencialService,
    public _referenciaService: ReferenciaService,
    private _route: ActivatedRoute,
    private dialog: MatDialog) {
    this._route.queryParams.subscribe(params => {
      // this._params.idActoMedicoEncriptado = params["idActoMedico"]; //"ZK4+zy/e7XE="; //
      // this._params.idAtencionEncriptado = params["idCita"]; //"95hwvFXv2Yk="; //
      this._params.idActoMedicoEncriptado = localStorage.getItem("idActoMedicoEncriptado");//params["idActoMedico"]; //"ZK4+zy/e7XE="; // PMvVRZhPHg=
      this._params.idAtencionEncriptado = localStorage.getItem('idAtencionEncriptado'); // params["idCita"]; 
      this._params.idPersona = params["idPersona"];
      this._params.idPersona = params["idPersona"];
    });
  }

  private obtenerDiagnosticosPromise() {
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getDiagnosticosReferencia(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            console.log(data.diagnosticoList);
            // debugger
            this.diagnosticoListNR = [];
            this.diagnosticoListR = [];
            for (let ls of data.diagnosticoList) {
              if (ls['flgReferencia'] == true) { this.diagnosticoListR.push(ls); this.contador++; } else { this.diagnosticoListNR.push(ls) };
            }
            this.dataSourceDiagnosticos = new MatTableDataSource(this.diagnosticoListR);
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerIpressPromise() {
    this.changeArray();
    console.log(this._params);
    // this._referenciaService.getIPRESSReferencia(this._params)
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       this.ipressList = data.ipressList;

    //       this.areaList = [];
    //       this.especialidadList = [];
    //       this.actividadList = [];
    //       this.subActividadList = [];
    //     } else {
    //       this.toastr.error(data.mensaje, "Error");
    //     }
    //   },
    //     error => {
    //       console.error(error);
    //     })
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getIPRESSReferencia(this._params)
        .toPromise().then(data => {
          console.log(data);
          if (data.estado == 1) {
            this.ipressList = data.ipressList;

            this.areaList = [];
            this.especialidadList = [];
            this.actividadList = [];
            this.subActividadList = [];
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
            this.ipressList = [];
          });
    })
    return promise;
  }

  private obtenerAreasPromise(params?: any) {
    for (let x of this.ipressList) {
      if (x['idIPRESS'] == this.referenciaJson.referencia.idIPRESSDestino)
        this._params.flidSubActividad = x['flSubActividad'];
    }
    params = { idIPRESSDestino: this.referenciaJson.referencia.idIPRESSDestino };
    console.log(params);
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getAreasReferencia(params)
        .toPromise().then(data => {
          console.log(data);
          if (data.estado == 1) {
            this.areaList = data.areaList;
            this.especialidadList = [];
            this.actividadList = [];
            this.subActividadList = [];
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerEspecialidadesPromise(params?: any) {
    params = { idIPRESSDestino: this.referenciaJson.referencia.idIPRESSDestino, idArea: this.referenciaJson.referencia.idArea };
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getEspecialidadesReferencia(params)
        .toPromise().then(data => {
          console.log(data);
          if (data.estado == 1) {
            this.especialidadList = data.especialidadList;
            this.actividadList = [];
            this.subActividadList = [];
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerActividadesPromise(params?: any) {
    params = { idIPRESSDestino: this.referenciaJson.referencia.idIPRESSDestino, idArea: this.referenciaJson.referencia.idArea, idEspecialidad: this.referenciaJson.referencia.idEspecialidad };
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getActividadesReferencia(params)
        .toPromise().then(data => {
          console.log(data);
          if (data.estado == 1) {
            this.actividadList = data.actividadList;
            this.subActividadList = [];
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerSubActividadesPromise(params?: any) {
    params = { idIPRESSDestino: this.referenciaJson.referencia.idIPRESSDestino, idArea: this.referenciaJson.referencia.idArea, idEspecialidad: this.referenciaJson.referencia.idEspecialidad, idActividad: this.referenciaJson.referencia.idActividad };
    let promise = new Promise((resolve, reject) => {
      this._referenciaService.getSubActividadesReferencia(params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.subActividadList = data.subActividadList;
          } else {
            this.toastr.error("Error", data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  changeArray() {
    this._params.idDiagnostico = "";
    console.log(this.referenciaJson);
    if (this.referenciaJson.referencia.idDiagnostico.length > 0)
      for (let x of this.referenciaJson.referencia.idDiagnostico) {
        // ajson.idDiagnostico = x;
        this._params.idDiagnostico = x + "," + this._params.idDiagnostico;
      } else {
      this._params.idDiagnostico = null;
    }
    console.log(this.referenciaJson);

    // this._params.idDiagnostico = JSON.stringify(this.referenciaJson.referencia.idDiagnosticoJson);
    // this.obtenerIpressPromise().then();
    // this.obtenerIpressPromise().then();;

  }

  registrarReferencia(_referenciaForm) {

    this.referenciaJson.referencia.idDiagnosticos = this._params.idDiagnostico.slice(0, -1);
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.referenciaJson.referencia.fhReferencia = ((this.referenciaJson.referencia.fhReferenciaCompleto).toLocaleDateString('es-PE', options)).split('/').join('-');
    this.referenciaJson.referencia.idActoMedicoEncriptado = this._params.idActoMedicoEncriptado;
    this.referenciaJson.referencia.idAtencionEncriptado = this._params.idAtencionEncriptado;
    let _param = this.referenciaJson;
    _param.referencia.idDiagnostico = null;
    console.log(this.referenciaJson);

    this._referenciaService.postReferencia(this.referenciaJson)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Exitoso");
          this.contador++;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        }, () => {
          for (let x in this.referenciaJson.referencia) {
            this.referenciaJson.referencia[x] = "";
          }
          this.referenciaJson.referencia.fhReferenciaCompleto = new Date();
          console.log(this.referenciaJson);
          this.obtenerDiagnosticosPromise();
          this.txtButton = 'Referenciar';
          this._Form.resetForm();
        })
  }


  obtenerReferencia(_params) {
    this._referenciaService.getReferencia(_params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.referenciaJson.referencia = data.referencia;
          console.log(this.convertir(this.referenciaJson.referencia.idDiagnostico));
          this.referenciaJson.referencia.idDiagnostico = this.convertir(this.referenciaJson.referencia.idDiagnostico);

          console.log(data.referencia);
          console.log(this.referenciaJson);
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
      },
        error => {
          console.error(error);
        }, () => {
          this.obtenerSelect();
        })
  }

  eliminarReferencia(_params) {
    console.log(_params);

    this._referenciaService.deleteReferencia(_params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje, "Exitoso")
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        }, () => {
          this.obtenerDiagnosticosPromise();
        })
  }

  modaConfirmacion(_params) {

    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '50%',
      width: '450px',
      maxHeight: '45%',
      height: '200px',
      disableClose: false,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿ Desea Eliminar el Siguiente Registro ?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.eliminarReferencia(_params);
      }
    });
  }

  /*----------------------------------
  ------------- Metodos --------------
  -----------------------------------*/
  convertir(id: Number) {
    let item = [];
    item.push(id.toString());
    return item;
  }

  obtenerSelect() {
    // this.changeArray();
    this.txtButton = 'Actualizar Referencia';
    this.obtenerIpressPromise().then(() => {
      this.obtenerAreasPromise().then(() => {
        this.obtenerEspecialidadesPromise().then(() => {
          this.obtenerActividadesPromise().then(() => {
            if (this._params.flidSubActividad) {
              this.obtenerSubActividadesPromise().then();
            }
          });
        });
      });
    });




  }

  /*----------------------------------
  ----------- Validaciones -----------
  -----------------------------------*/

  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
    this.obtenerDiagnosticosPromise().then();

  }
}
