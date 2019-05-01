import { Diagnostico } from './../../../../../../../shared/class/diagnostico';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AtencionMedicaService } from './../../../../../services/atencion-medica.service';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatIconRegistry } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  displayedColumns = ['codigoDiagnostico', 'descripcionDiagnostico', 'idDiagnosticoCaso', 'altaDiagnostico', 'eliminar'];
  dataSource = new MatTableDataSource();

  diagnosticoCtrl: FormControl = new FormControl();

  @Input() listaComboBox;
  @Input() param;
  @Output() sendDiagnostico = new EventEmitter<string>();

  protected andy: JSON;
  private listaDiagnosticoCD: any[];
  private _params: any = { sexo: null, codigoDiagnostico: null, descripcionDiagnostico: "" };

  //arreglos para los comboBox
  private lsDiagnosticoTipo: any = [{ idOpcion: null, valorOpcion: null }];
  private lsDiagnosticoCaso: any = [{ idOpcion: null, valorOpcion: null }];

  //para almacenar los datos de la tabla
  private listaDiagnostico: any = [];

  private flg: boolean = true;
  private descripcion: string = "";

  constructor(private _atencionMedicaService: AtencionMedicaService,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.diagnostico();
    // console.log(this.param);
  }

  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaService.obtenerDiagnosticoPoridActoMedico(this.param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaDiagnostico = data.diagnosticoActoMedico;
            this.dataSource = new MatTableDataSource(this.listaDiagnostico);
            console.log(this.listaDiagnostico);
          } else {
            this.toastr.error("Diagnostico " + data.mensaje);
            console.log(data);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private diagnostico() {
    if ((this.param.idActoMedicoEncriptado != undefined || this.param.idActoMedicoEncriptado != null) && this.param.idActoMedicoEncriptado != "") {
      this.servicio().then(() => {
        this.send();
      });
    }
  }

  private send() {
    let _params: any = { diagnostico: [] };
    for (let x = 0; x < this.listaDiagnostico.length; x++) {
      let param: any = { altaDiagnostico: null, calificacionDiagnostico: null, idDiagnostico: null, tipoDiagnostico: null, flgReferencia: this.listaDiagnostico[x].flgReferencia };
      param.altaDiagnostico = this.listaDiagnostico[x].altaDiagnostico;
      param.calificacionDiagnostico = this.listaDiagnostico[x].calificacionDiagnostico;
      // param.idDiagnostico = this.listaDiagnostico[x].idDiagnosticoTipo;
      param.tipoDiagnostico = this.listaDiagnostico[x].tipoDiagnostico;
      param.idDiagnostico = this.listaDiagnostico[x].idDiagnostico;

      _params.diagnostico.push(param);
    }
    // console.log(_params);
    this.sendDiagnostico.emit(_params);
  }

  //Metodo para comsumir el servicio
  private getDiagnsoticoDescripcionPromise() {
    this._params.sexo = this.param.sexo;
    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaService.obtenerDiagnostico(this._params)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.listaDiagnosticoCD = data.diagnosticoList;
            console.log(this.listaDiagnosticoCD);
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

  //metodo para realizar busquedas por Codigo
  private busquedaDiagnosticoCodigo() {
    if (this._params.codigoDiagnostico == null || this._params.codigoDiagnostico == "") {
      this.toastr.warning("Campo de Código vacio");
      return;
    } else {
      this._params.descripcionDiagnostico = null
      this.getDiagnsoticoDescripcionPromise().then(() => {
        if (this.listaDiagnosticoCD != null) {
          this.flg = false;
          this._params.idDiagnostico = this.listaDiagnosticoCD[0].idDiagnostico;
          this._params.descripcionDiagnostico = this.listaDiagnosticoCD[0].descripcionDiagnostico;
          this._params.codigoDiagnostico = this.listaDiagnosticoCD[0].codigoDiagnostico;
          // console.log(this._params);
        }
      });
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.listaDiagnosticoCD.filter(v => v.descripcionDiagnostico.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: { descripcionDiagnostico: string }) => x.descripcionDiagnostico;

  //Metodo para realizar busqueda por Descripcion contando la cantidad de caracteres
  private busquedaDiagnosticoDescripcion(value) {
    if (value.length % 2 == 0) {
      this._params.descripcionDiagnostico = value;
      this._params.codigoDiagnostico = null;
      this._params.sexo = this.param.sexo;
      this.getDiagnsoticoDescripcionPromise().then();
    }
  }

  //selecciona el diagnostico buscado
  private seleccionarDescripcion(idDiagnostico, codigoDiagnostico, descripcionDiagnostico) {
    // console.log(item);
    this._params.idDiagnostico = idDiagnostico;
    this._params.codigoDiagnostico = codigoDiagnostico;
    this._params.descripcionDiagnostico = descripcionDiagnostico;
  }

  //agrega las busquedas a la tabla 
  private agregarDiagnostico() {
    if (this._params.codigoDiagnostico == null || this._params.descripcionDiagnostico == null) {
      this.toastr.warning("No puede estar vacio");
      $("#codigo_diagnotico").focus();
      return;
    }

    if (this.listaDiagnosticoCD[0].codigoDiagnostico == null || this.listaDiagnosticoCD[0].descripcionDiagnostico == null || this.listaDiagnosticoCD[0].idDiagnostico == null) {
      this.toastr.warning("Seleccione un diagnostico váldio");
      return;
    } else {
      for (let item of this.listaDiagnostico) {
        if (item.codigoDiagnostico == this._params.codigoDiagnostico) {
          this.toastr.warning("Ya selecciono el Diagnostico");
          return;
        }
      }
      //agregar los valores a la tabla
      let parametro = { codigoDiagnostico: null, descripcionDiagnostico: null, calificacionDiagnostico: "P", tipoDiagnostico: "R", altaDiagnostico: 0, idDiagnostico: null, flgReferencia: this.listaDiagnosticoCD[0].flgReferencia };
      // let parametro = { codigoDiagnostico: null, descripcionDiagnostico: null, calificacionDiagnostico: "P", tipoDiagnostico: "R", altaDiagnostico: 0, idDiagnostico: null };

      parametro.codigoDiagnostico = this._params.codigoDiagnostico;
      parametro.descripcionDiagnostico = this._params.descripcionDiagnostico;
      parametro.idDiagnostico = this._params.idDiagnostico;
      console.log(parametro);
      this.listaDiagnostico.push(parametro);
      this.dataSource = new MatTableDataSource(this.listaDiagnostico);
      let asss = new Diagnostico(this.listaDiagnostico);
      // localStorage.setItem("Json",this.listaDiagnostico);
      console.log(asss.getDiagnostico);

      //regresar valores por defecto
      this._params = { codigoDiagnostico: null, descripcionDiagnostico: null };
      this.listaDiagnosticoCD = [];
      this.flg = true;
      // this.descripcion = "";
    }
    console.log(this.listaDiagnostico);
    this.send();
  }
  change(pos) {
    console.log(pos);
    this.listaDiagnostico[pos].altaDiagnostico = (this.listaDiagnostico[pos].calificacionDiagnostico == 'P') ? "1" : "0";
    this.dataSource = new MatTableDataSource(this.listaDiagnostico);
  }

  //elimina diagnositico de la tabla
  private eliminarDiagnostico(indice) {
    this.listaDiagnostico.splice(indice, 1);
    this.dataSource = new MatTableDataSource(this.listaDiagnostico);
    this.send();
  }
}



