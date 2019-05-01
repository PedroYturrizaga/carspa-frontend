import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';

import {FormControl} from '@angular/forms';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-antecedentes-patologicos',
  templateUrl: './antecedentes-patologicos.component.html',
  styleUrls: ['./antecedentes-patologicos.component.scss']
})
export class AntecedentesPatologicosComponent implements OnInit {

  @Input() listfechas;
  @Input() listaDisabled;
  @Input() param;
  @Output() sendPatologicos = new EventEmitter<string>();

  displayedColumns = ['diagnostico', 'fecha', 'eliminar'];
  dataSource = new MatTableDataSource();

  diagnosticoCtrl: FormControl = new FormControl();
  private today = new Date();
  private listaDiagnostico: any = [];
  private listaAntecedentePatologico: any = {};
  //se usa para agregar los datos a ka tabla
  private lst_diagnostico: any = [];

  private diagnosticoModel: any = { medicamento: {idDiagnostico: null,
                                                  descripcionDiagnostico: null
                                                },
                                    fecha: null,
                                    fechaCompleta: null
                                  };

  //parametros para usar el servicio
  private _params: any = { sexo: null, codigoDiagnostico: null, descripcionDiagnostico: "" };
  //
  private descripcion: any;
  private disa: boolean = true;
                                  
  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService) { }

  // search = (text$: Observable<string>) =>
  //   text$
  //     .debounceTime(200)
  //     .map(term => term === '' ? []
  //       : this.listaDiagnostico.filter(v => v.descripcionDiagnostico.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  // formatter = (x: { descripcionDiagnostico: string }) => x.descripcionDiagnostico;

  ngOnInit() {
    // if ((this.param.idActoMedicoEncriptado != null || this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
      this.patologico();
    // }
  }

  private patologico() {
    this.servicio().then(() => {
      this.send();
    });
  }

  private send() {
    let _params: any = {};
    _params.patologicos = this.listaAntecedentePatologico;
    _params.patologicos.lsDiagnosticoPersonal = this.lst_diagnostico;
    this.sendPatologicos.emit(_params);
    // console.log(_params);
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerAntecedentesPatologicos(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaAntecedentePatologico = data.antecedentePatologico;
            if (this.listaAntecedentePatologico.lsDiagnosticoPersonal != undefined) {
              this.lst_diagnostico = this.listaAntecedentePatologico.lsDiagnosticoPersonal;              
              this.dataSource = new MatTableDataSource(this.lst_diagnostico);   
            }
          } else {
            this.toastr.error("Error en obtenerAntecedentesPatologicos" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  //Metodo para realizar busqueda por Descripcion
  private busquedaDiagnosticoDescripcion(value) {
    console.log(value);
    if (value.length % 2 == 0) {
      this._params.descripcionDiagnostico = value;
      this._params.codigoDiagnostico = null;
      this._params.sexo = this.param.sexo;
      this.getDiagnsoticoDescripcionPromise().then();
    }
  }

  //Metodo para comsumir el servicio eniando solo la descripcion
  private getDiagnsoticoDescripcionPromise() {
    this._params.sexo = this.param.sexo;
    // this._params.descripcionDiagnostico = this.busquedaDiagnosticoDescripcion;
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerDiagnostico(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaDiagnostico = data.diagnosticoList;
            console.log(this.listaDiagnostico);
          } else {
            this.toastr.error("Diagnostico" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private selectDescripcion(descripcionDiagnostico,idDiagnostico){
    this.diagnosticoModel.medicamento.idDiagnostico = idDiagnostico;
    this.diagnosticoModel.medicamento.descripcionDiagnostico = descripcionDiagnostico;
  } 


  private agregarDiagnostico() {
    // debugger
    console.log(this.diagnosticoModel);
    //cambio de fecha
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    if ((this.diagnosticoModel.medicamento.idDiagnostico == null || this.diagnosticoModel.medicamento.descripcionDiagnostico == null) || (this.diagnosticoModel.medicamento.idDiagnostico == "" || this.diagnosticoModel.medicamento.descripcionDiagnostico == "")) {
      this.toastr.warning("Debe seleccionar un DIANOSTICO válido");
      return;
    } else {
      // debugger
      // if ((this.diagnosticoModel.fecha == null || this.diagnosticoModel.fechaCompleta != null) && (this.diagnosticoModel.fecha != null || this.diagnosticoModel.fechaCompleta == null) ) {
      if ((this.diagnosticoModel.fecha == null && this.diagnosticoModel.fechaCompleta == null) || (this.diagnosticoModel.fecha == "" && this.diagnosticoModel.fechaCompleta == "") ) {
        this.toastr.warning("debe seleccionar una FECHA válido");
        return;
      }
      if(this.diagnosticoModel.fechaCompleta != null ){
        this.diagnosticoModel.fechaCompleta = ((this.diagnosticoModel.fechaCompleta).toLocaleDateString('es-PE', options)).split('/').join('-');
      }
  
      if (this.lst_diagnostico != null) {
        for (let item of this.lst_diagnostico) {
          if (item.diagnostico == this.diagnosticoModel.medicamento.descripcionDiagnostico && (item.desde == this.diagnosticoModel.fecha || item.desde == this.diagnosticoModel.fechaCompleta)) {
            this.toastr.warning("El DIAGNOSTICO y FECHA ya fueron seleccionado");
            return;
          }
        }
      }
      

      let param = { diagnostico: null, desde: null, flg:null };
      param.diagnostico = this.diagnosticoModel.medicamento.descripcionDiagnostico;
      param.desde = (this.diagnosticoModel.fechaCompleta != null) ? this.diagnosticoModel.fechaCompleta : this.diagnosticoModel.fecha;
      param.flg = 1;

      this.lst_diagnostico.push(param);
      this.dataSource = new MatTableDataSource(this.lst_diagnostico); 
    }
    //limpiar las variables
    this.diagnosticoModel = { medicamento: { idDiagnostico: "", descripcionDiagnostico: "" }, fecha: null, fechaCompleta: null };
    this.listaDiagnostico = [];
    this.descripcion="";
    this.send();
  }

  private eliminarDiagnostico(item) {
    let pos = 0;
    for (let cv of this.lst_diagnostico) {
      if (cv.diagnostico == item) {
        break;
      }
      pos++;
    }
    this.lst_diagnostico.splice(pos, 1);
    this.dataSource = new MatTableDataSource(this.lst_diagnostico); 
  }

  
  prueba(prueba: any){

    console.log(prueba);
    this.diagnosticoModel.medicamento = prueba;
  }

  private isInvalid(_ngForm: any): boolean {
    // console.log(_ngForm);
    return isInvalid(_ngForm);
  }




}
