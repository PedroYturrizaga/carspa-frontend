import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import { PersonaService } from './../../services/persona.service'
// import { AtencionMedicaService } from './../../../module/consulta-ambulatoria/services/atencion-medica.service'
// import { UltimasAtencionesService } from './../../../module/consulta-ambulatoria/services/ultimas-atenciones.service'
// import { EsquemaDeVacunacionService } from './../../../module/consulta-ambulatoria/services/esquema-de-vacunacion.service'
// import { RecetaService } from './../../../module/consulta-ambulatoria/services/receta.service'
// import { ProcedimientosService } from './../../../module/consulta-ambulatoria/services/procedimientos.service'
// import { CitaExamenesAuxiliaresService } from './../../../module/consulta-ambulatoria/services/cita-examenes-auxiliares.service'
// import { TerapiaService } from '../../../module/consulta-ambulatoria/services/terapia.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-acto-medico',
  templateUrl: './ver-acto-medico.component.html',
  styleUrls: ['./ver-acto-medico.component.scss']
})
export class VerActoMedicoComponent implements OnInit {

  displayedColumns = ['Cogido', 'Descripcion', 'Unidad', 'Cantidad', 'Duracion'];
  matDataSource = new MatTableDataSource();

  displayedProcedimientosRegistrados = ['codigo', 'descProcedimiento', 'cantidad', 'motivo'];
  dataSourceProc = new MatTableDataSource();

  displayedColumnsA = ['idTerapia', 'descripcionTerapia', 'numeroSesiones'];
  dataSource = new MatTableDataSource();

  // displayedColumnsExAux = ['tipoExamen', 'descripcionExamenArea', 'codigoCpt', 'descripcionCpt', 'observacionExamenDetalle', 'motivoExamenDetalle'];
  // dataSourceExAux = new MatTableDataSource();

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPag: MatPaginator;

  @Input() idActoMedico;
  @Input() idAtencion;
  @Input() idPersona;
  @Input() idCita;

  private terapiaSoli: any = [];
  private _params: any = { idActoMedicoEncriptado: null, idAtencionEncriptado: null, idPersona: null };
  private lsActoMedico: any[] = [{ cabeceraTitulo: null, index: null }];
  private param = { idActoMedico: null, idAtencion: null, idPersona: null, idCita: null, impresion: false };

  //listas basicas
  private cabeceraDatosPersona: any = {
    persona: {
      planList: [{ iafas: {}, cobertura: { descripcionCobertura: null } }],
      estadoCivil: { id: null },
      tipoDocumentoIdentidad: {},
      tipoSangre: { id: null },
      ocupacion: { valor: null },
      sexo: { id: null },
      historiaList: [{}],
      gradoInstruccion: { id: null },
      filiadoList: [{ ubigeo: {}, parentescoAcompanante: {}, domicilioActual: null, telefonoMovil: null }],
      feNacimiento: "",
      idGrupoEtareo: "",
      nombreAcompanante: null,
      edadAcompanante: null,
      idTipoDocumentoAcompanante: null,
      diAcompanante: null,
      edad: null
    }
  };
  private listActoMedicoAdicional = null;
  private listAtencionesActoMedico = null;
  private listAntecedentesHistorial: any = {
    objAntecedentes: {
      antecedentePrenatal: {
        idEmbarazo: null,
        patologiaGestacion: null,
        numeroEmbarazo: null,
        atencionPrenatal: null,
        parto: null
      },
      antecedentePerinatal: {},
      antecedenteGeneral: {},
      antecedenteAlimentacion: {},
      antecedentePatologico: {
        lsDiagnosticoPersonal: []
      },
      antecedenteMedicamento: { lsMedicamentoFrecuente: [], lsMedicamentoAntecedentes: [] },
      antecedenteFisiologico: {}
    }
  };
  private listEsquemaDeVacunacion: any = null;
  //variables para receta
  private detalleRecetaCabezera: any[] = null;
  private idReceta: number = null;
  //varoiables para procedimiento
  private procedimientoR: any = null;
  //variables para examenes auxiliares
  private ordenExamenDetalleIngresados: any[] = null;

  //variable para almacenar una atencionMedica
  private atencionMedica = null;
  private listas: any = { perinatales: null }

  constructor(private toastr: ToastsManager,
    private _personaService: PersonaService,
    // private _atencionService: AtencionMedicaService,
    // private _ultimasAtencionesService: UltimasAtencionesService,
    // private _esquemaDeVacunacionService: EsquemaDeVacunacionService,
    // private _recetaService: RecetaService,
    // private _ProcedimientosService: ProcedimientosService,
    // private _examenesApoyoService: CitaExamenesAuxiliaresService,
    // private _terapiaService: TerapiaService, 
    public dialogRef: MatDialogRef<VerActoMedicoComponent>) {
    this.param = { idActoMedico: this.idActoMedico, idAtencion: this.idAtencion, idPersona: this.idPersona, idCita: this.idCita, impresion: false }
  }

  ngOnInit() {
    this.param = { idActoMedico: this.idActoMedico, idAtencion: this.idAtencion, idPersona: this.idPersona, idCita: this.idCita, impresion: false }
    // this.obtenerPersona();
    // this.obtenerActoMedicoAdicional();
    // this.obtenerAtencionesActoMedico();
    // this.obtenerAntecedentesHistorial();
    // this.obtenerEsquemaVacunacion();
    // this.getDetalleRecetaCabezera();
    // this.listarProcedimientosRegi();
    // this.getobtenerOrdenExamenes();
    // this.getTerapiasSolicitud();
    // console.log(this.idActoMedico);
    // console.log(this.idAtencion);
  }

  close(add) {
    this.dialogRef.close(add);
  }

  private obtenerPersona() {
    console.log(this.param);
    this._personaService.getDatosPersona(this.param.idCita)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraDatosPersona.persona = data.persona;
          // console.log(this.cabeceraDatosPersona);
        } else {
          this.toastr.error("Error al obtenerPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          // this.listarFechas();
          // this.grupoEtario(this.idGrupoEtareo);
        });
  }

  // private obtenerActoMedicoAdicional() {
  //   let param = { idActoMedicoEncriptado: null, idAtencionEncriptado: null }
  //   param.idActoMedicoEncriptado = this.idActoMedico;
  //   param.idAtencionEncriptado = this.idAtencion;
  //   this._atencionService.obtenerActoMedicoAdicionalAdicional(param)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.listActoMedicoAdicional = data.actoMedico;
  //         console.log(this.listActoMedicoAdicional)
  //         //this.btnActoMedico = (this.listActoMedicoAdicional.length > 0) ? false : true;
  //       } else {
  //         this.toastr.error("Error al listar ActoMedico Adicional " + data.mensaje);
  //       }
  //       return true;
  //     },
  //       err => { console.error(err) },
  //       () => {
  //       });
  // }
  // private obtenerAtencionesActoMedico() {
  //   this._ultimasAtencionesService.getAtencionesPorActoMedico(this.param.idActoMedico)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.listAtencionesActoMedico = data.actoMedicoList;
  //         this.atencionMedica = this.listAtencionesActoMedico[0];
  //         // console.log(this.listAtencionesActoMedico);
  //       } else {
  //         this.toastr.error("Error al listar Atenciones por Acto Medico" + data.mensaje);
  //       }
  //       return true;
  //     },
  //       err => { console.error(err) },
  //       () => {
  //       });
  // }

  // private obtenerAntecedentesHistorial() {
  //   // console.log(this.idActoMedico, this.idAtencionEncriptado)
  //   this._ultimasAtencionesService.getAntecedentesHistorial(this.idActoMedico, this.idAtencion)
  //     .subscribe(data => {
  //       console.log(data)
  //       if (data.estado == 1) {
  //         this.listAntecedentesHistorial = data.objAntecedentesJS;
  //         for (let x in this.listAntecedentesHistorial.objAntecedentes) {
  //           if (JSON.stringify(this.listAntecedentesHistorial.objAntecedentes[x]) === '{}') {
  //             this.listAntecedentesHistorial.objAntecedentes[x] = null
  //           }
  //         }
  //         console.log(this.listAntecedentesHistorial)

  //         // this.listAntecedentesHistorial.objAntecedentes.antecedentePrenatal = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePrenatal);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedentePerinatal = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePerinatal);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedenteGeneral = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteGeneral);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedenteAlimentacion = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteAlimentacion);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedenteFisiologico = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteFisiologico);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedenteMedicamento = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteMedicamento);
  //         // this.listAntecedentesHistorial.objAntecedentes.antecedentePatologico = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePatologico);
  //       } else {
  //         this.toastr.error("Error en obtenerAntecedentesHistorial" + data.mensaje);
  //       }
  //       return true;
  //     },
  //       err => { console.error(err) },
  //       () => {
  //       });
  // }

  // private obtenerEsquemaVacunacion() {
  //   console.log(this.param);
  //   this._esquemaDeVacunacionService.getFechasEsqVac(this.param.idPersona)
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.estado == 1) {
  //         this.listEsquemaDeVacunacion = data.esquemaVacunacion;

  //         if (JSON.stringify(this.listEsquemaDeVacunacion) === '{}') this.listEsquemaDeVacunacion = null;

  //       } else if (data.estado == -1) {
  //         this.toastr.error("Error en obtenerEsquemaVacunacion" + data.mensaje);
  //       }
  //       return true;
  //     },
  //       err => { console.log(err) },
  //       () => {
  //       });
  // }

  // private getDetalleRecetaCabezera() {

  //   console.log(this.param);
  //   this._recetaService.getDetalleRecetaCabezera(this.param)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         if (data.recetaCabecera != null) {
  //           this.detalleRecetaCabezera = data.recetaCabecera;
  //           this.idReceta = data.recetaCabecera.idReceta;
  //           this.matDataSource = new MatTableDataSource(this.detalleRecetaCabezera['recetaDetalleList']);
  //         }
  //       } else if (data.estado == 0) {
  //         this.toastr.info(data.mensaje);
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       err => { this.toastr.error(err) });
  // }

  // listarProcedimientosRegi() {
  //   let _paramss = { idActoMedicoEncrip: this.idActoMedico, idAtencionEncrip: this.idAtencion, idCitaProcedimientoEncrip: this.idCita }
  //   this._ProcedimientosService.listarProcedimientosR(_paramss)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         console.log(data);
  //         if (data.lsProcedimientoRegistrado.length > 0) {
  //           this.procedimientoR = data.lsProcedimientoRegistrado;
  //           this.dataSourceProc = new MatTableDataSource(this.procedimientoR);
  //         }
  //       } else if (data.estado == 0) {
  //         this.toastr.info(data.mensaje);
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       err => { this.toastr.error(err) });
  // }

  // getobtenerOrdenExamenes() {
  //   this._examenesApoyoService.obtenerOrdenExamenes(this.param)
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data.estado == 1) {
  //         if (data.ordenExamenList.length > 0) {
  //           this.ordenExamenDetalleIngresados = data.ordenExamenList;
  //         } else {
  //           this.toastr.info("Acto Medico no tuvo ordenes de Examenes", "ORDENES No Solicitados")
  //         }
  //       } else if (data.estado == 0) {
  //         this.toastr.info(data.mensaje, "ORDENES No Solicitados")
  //       } else {
  //         this.toastr.error(data.mensaje);
  //         console.log(data.mensaje);
  //       }
  //     },
  //       err => { this.toastr.error(err) });
  // }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  JsontoString(par) {
    let result: string = "";
    let promise = new Promise((resolve, reject) => {
      Object.keys(par).forEach(key => {
        if (Array.isArray(par[key])) {
          var segundaPart = "";
          let primerSalto = "\n[\n";
          let coma = ",";
          par[key].forEach(element => {
            segundaPart = segundaPart + primerSalto + this.JsontoString(element) + coma;
            primerSalto = "";
          });
          segundaPart = segundaPart.substring(0, segundaPart.length - 1);
          result = result + key + ":" + segundaPart + "]\n"
        } else {
          result = result + key + ": " + par[key] + "\n"
        }
      });

    })
    promise
    return result;
  }

  private get = { idActoMedicoEncriptado: null, idAtencionEncriptado: null };
  // public getTerapiasSolicitud() {
  //   this.get.idActoMedicoEncriptado = this.idActoMedico;
  //   this.get.idAtencionEncriptado = this.idAtencion;
  //   this._terapiaService.getTerapiasEncrip(this.get)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.terapiaSoli = data.terapiaList;
  //         console.log(this.terapiaSoli);
  //         this.dataSource = new MatTableDataSource(this.terapiaSoli);
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //       error => {
  //         this.toastr.error(error);
  //         return Observable.throw(error);
  //       }),
  //     err => this.toastr.error(err),
  //     () => this.toastr.success('Request Complete');
  // }
}
