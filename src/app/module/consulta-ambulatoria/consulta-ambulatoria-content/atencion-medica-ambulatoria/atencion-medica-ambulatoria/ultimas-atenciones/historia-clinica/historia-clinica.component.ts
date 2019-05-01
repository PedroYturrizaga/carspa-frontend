import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { UltimasAtencionesComponent } from '../ultimas-atenciones.component';

import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';

import { PersonaService } from '../../../../../../../shared/services/persona.service';
import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';
import { UltimasAtencionesService } from '../../../../../services/ultimas-atenciones.service';
import { EsquemaDeVacunacionService } from '../../../../../services/esquema-de-vacunacion.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  @Input() idActoMedico;
  @Input() idAtencionEncriptado;
  @Input() posicion;
  @Input() actoMedico;
  @Input() idPersona;
  @Input() idActoMedicoEncriptado;

  constructor(
    private toastr: ToastsManager,
    private _personaService: PersonaService,
    private _atencionService: AtencionMedicaService,
    private _ultimasAtencionesService: UltimasAtencionesService,
    private _esquemaDeVacunacionService: EsquemaDeVacunacionService,
    public dialogRef: MatDialogRef<HistoriaClinicaComponent>) { }

  //private _params = { idPersona:"mLZddbRuBjFVHK0PDT6cwA==", idIPRESS: "gONZnF9vN/bocT+JhfnMGw=="};
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

  private listaDisabled: any = {
    datoPaciente: { acompaniante: null, estadoCivil: null },
    general: { gradoInstruccion: null, alimentacion: null },
    alimentacion: false,
    fisiologico: { fisiologico: null, metodoAnticonceptivo: null, fur: null, climaterio: null },
    medicamento: { medicamento: false, medicamentoFrecuente: true },
    prenatales: false,
    perinatales: false,
    patologicos: { psicosociales: null, saludSexul: null },
    esquemaVacunacion: { esquemaVacunacion: null, a: null }
  }


  private cont: number = 0;
  private cont1: number = 0;
  private btnAtencionMedica: boolean = false;

  private listActoMedicoAdicional: any = {};
  private listAtencionesActoMedico: any = [];
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
  private listEsquemaDeVacunacion: any = {};
  //variable para almacenar una atencionMedica
  private atencionMedica: any = { idAtencion: null };
  private listas: any = { perinatales: null }

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

  private obtenerPersona() {
    let _params = { idAtencionEncriptado: this.idAtencionEncriptado, idActoMedicoEncriptado: this.idActoMedicoEncriptado }

    this._personaService.getDatosPersonaPorActoMedico(_params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cabeceraDatosPersona.persona = data.persona;
          console.log(data);
        } else {
          this.toastr.error("Error al obtenerPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

  private obtenerActoMedicoAdicional() {
    let param = { idActoMedicoEncriptado: this.idActoMedicoEncriptado, idAtencionEncriptado: this.idAtencionEncriptado }
    param.idActoMedicoEncriptado = this.idActoMedicoEncriptado;
    this._atencionService.obtenerActoMedicoAdicionalAdicional(param)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.listActoMedicoAdicional = data.actoMedico;
          //this.btnActoMedico = (this.listActoMedicoAdicional.length > 0) ? false : true;
        } else {
          this.toastr.error("Error al listar ActoMedico Adicional " + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }


  private sigActoMedico(accion) {
    let tam = this.actoMedico.length - 1;

    if (accion == 1) {
      this.cont++;
      this.cont = (this.cont > tam) ? 0 : this.cont;

    } else if (accion == 2) {
      this.cont--;
      this.cont = (this.cont < 0) ? tam : this.cont;
    }

    this.idActoMedico = this.actoMedico[this.cont].idActoMedicoEncriptado;
    this.obtenerActoMedicoAdicional();
    this.obtenerAtencionesActoMedico();
    this.obtenerAntecedentesHistorial();
    this.sigAtencionMedica(null);
  }

  private obtenerAtencionesActoMedico() {
    this._ultimasAtencionesService.getAtencionesPorActoMedico(this.idActoMedicoEncriptado)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listAtencionesActoMedico = data.actoMedicoList;
          this.atencionMedica = this.listAtencionesActoMedico[0];
          // console.log(this.listAtencionesActoMedico);
        } else {
          this.toastr.error("Error al listar Atenciones por Acto Medico" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

  private obtenerAntecedentesHistorial() {
    console.log(this.idActoMedicoEncriptado, this.idAtencionEncriptado)
    this._ultimasAtencionesService.getAntecedentesHistorial(this.idActoMedicoEncriptado, this.idAtencionEncriptado)
      .subscribe(data => {

        if (data.estado == 1) {
          console.log(data);
          this.listAntecedentesHistorial = data.objAntecedentesJS;
          for (let x in this.listAntecedentesHistorial.objAntecedentes) {
            if (JSON.stringify(this.listAntecedentesHistorial.objAntecedentes[x]) === '{}') {
              this.listAntecedentesHistorial.objAntecedentes[x] = null
            }
          }
          console.log(this.listAntecedentesHistorial);

          // this.listAntecedentesHistorial.objAntecedentes.antecedentePrenatal = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePrenatal);
          // this.listAntecedentesHistorial.objAntecedentes.antecedentePerinatal = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePerinatal);
          // this.listAntecedentesHistorial.objAntecedentes.antecedenteGeneral = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteGeneral);
          // this.listAntecedentesHistorial.objAntecedentes.antecedenteAlimentacion = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteAlimentacion);
          // this.listAntecedentesHistorial.objAntecedentes.antecedenteFisiologico = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteFisiologico);
          // this.listAntecedentesHistorial.objAntecedentes.antecedenteMedicamento = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedenteMedicamento);
          // this.listAntecedentesHistorial.objAntecedentes.antecedentePatologico = this.JsontoString(this.listAntecedentesHistorial.objAntecedentes.antecedentePatologico);

        } else {
          this.toastr.error("Error en obtenerAntecedentesHistorial" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
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

  private obtenerEsquemaVacunacion() {

    this._esquemaDeVacunacionService.getFechasEsqVac(this.idPersona)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listEsquemaDeVacunacion = data.esquemaVacunacion;

          console.log(this.listEsquemaDeVacunacion);

        } else {
          this.toastr.error("Error en obtenerEsquemaVacunacion" + data.mensaje);
        }
        return true;
      },
        err => { console.log(err) },
        () => {
        });
  }

  private sigAtencionMedica(accion:any) {
    // debugger
    let tam = this.listAtencionesActoMedico.length - 1;
    console.log(tam);
    if (tam == 0) {
      this.btnAtencionMedica = true;
    } else {
      if (accion == 1) {
        this.cont1++;
        this.cont1 = (this.cont1 > tam) ? 0 : this.cont1;

      } else if (accion == 2) {
        this.cont1--;
        this.cont1 = (this.cont1 < 0) ? tam : this.cont1;
      }
    }
    this.atencionMedica = this.listAtencionesActoMedico[this.cont1];
  }

  private grupoEtario(_params) {
    if (_params == 1) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = true;
      this.listaDisabled.fisiologico.fisiologico = false;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = false;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = true;
      this.listaDisabled.perinatales = true;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = true;
      this.listaDisabled.datoPaciente.estadoCivil = true;
      this.listaDisabled.funcionesBiologicas = false;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = true;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = false;

    } else if (_params == 2) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = true;
      this.listaDisabled.fisiologico.fisiologico = false;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = false;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = true;
      this.listaDisabled.perinatales = true;
      this.listaDisabled.patologicos.psicosociales = true;
      this.listaDisabled.patologicos.saludSexul = true;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = false;
      this.listaDisabled.funcionesBiologicas = false;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = false;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = false;

    } else if (_params == 3) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = false;
      this.listaDisabled.fisiologico.fisiologico = true;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = true;
      this.listaDisabled.fisiologico.fur = false;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = true;
      this.listaDisabled.medicamento.medicamentoFrecuente = false;
      this.listaDisabled.prenatales = false;
      this.listaDisabled.perinatales = false;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = false;
      this.listaDisabled.funcionesBiologicas = true;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = false;
      this.listaDisabled.valoracionGeriatrica = false;
      this.listaDisabled.categoriaAdulto = true;


    } else if (_params == 4) {
      this.listaDisabled.general.gradoInstruccion = false;
      this.listaDisabled.general.alimentacion = false;
      this.listaDisabled.alimentacion = false;
      this.listaDisabled.fisiologico.fisiologico = false;
      this.listaDisabled.fisiologico.metodoAnticonceptivo = false;
      this.listaDisabled.fisiologico.fur = true;
      this.listaDisabled.fisiologico.climaterio = false;
      this.listaDisabled.medicamento.medicamento = true;
      this.listaDisabled.medicamento.medicamentoFrecuente = true;
      this.listaDisabled.prenatales = false;
      this.listaDisabled.perinatales = false;
      this.listaDisabled.patologicos.psicosociales = false;
      this.listaDisabled.patologicos.saludSexul = false;
      this.listaDisabled.datoPaciente.acompaniante = false;
      this.listaDisabled.datoPaciente.estadoCivil = false;
      this.listaDisabled.funcionesBiologicas = true;
      this.listaDisabled.esquemaVacunacion.esquemaVacunacion = _params;
      this.listaDisabled.esquemaVacunacion.a = false;
      this.listaDisabled.valoracionGeriatrica = true;
      this.listaDisabled.categoriaAdulto = true;

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.cont = this.posicion;
    console.log(this.idActoMedico);

    this.obtenerPersona();
    this.obtenerActoMedicoAdicional();
    this.obtenerAtencionesActoMedico();
    this.obtenerAntecedentesHistorial();
    this.obtenerEsquemaVacunacion();
    // this.sigAtencionMedica(null);
  }
}
