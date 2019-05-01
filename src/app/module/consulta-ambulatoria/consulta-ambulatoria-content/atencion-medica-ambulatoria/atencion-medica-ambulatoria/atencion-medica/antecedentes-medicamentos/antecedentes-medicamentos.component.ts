import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';

import { AtencionMedicaService } from '../../../../../services/atencion-medica.service';

import { FormControl } from '@angular/forms';

import { MatPaginator, MatTableDataSource, MatIconRegistry, MatSnackBar } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-antecedentes-medicamentos',
  templateUrl: './antecedentes-medicamentos.component.html',
  styleUrls: ['./antecedentes-medicamentos.component.scss']
})
export class AntecedentesMedicamentosComponent implements OnInit {

  displayedColumns = ['Nombre', 'Dosis', 'Observaciones', 'eliminar'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['medicamento', 'eliminar'];
  dataSource1 = new MatTableDataSource();

  medicamentoCtrl: FormControl = new FormControl();
  medicFrecCtrl: FormControl = new FormControl();

  @Input() listaDisabled;
  @Input() param;
  @Output() sendMedicamentos = new EventEmitter<string>();

  private listaAntecedenteMedicamentoDescripcion: any = [];
  private listaAntecedenteMedicamento = { reaccionAdversa: 0, lsMedicamentoFrecuente: null, lsMedicamentoAntecedentes: null };

  private medicFrecuente: any = {
    medicamento: {
      dciProductoFarmaceutico: null,
      idMedicamento: null
    },
    dosis: null,
    observaciones: null
  };

  private medicReacAdver: any = {
    medicamento: {
      dciProductoFarmaceutico: null,
      idMedicamento: null
    }
  };

  private lsmedicamento: any = []; //{ nombre: "", dosis: "", observaciones: "" }
  private lsreacAdver: any = []; //{ medicamento: "" }

  private flg_disabled: any;

  //flg de disabled para el boton agregar de Medicamento Frecuente
  private flg_agregarMedFrec: boolean = false;

  constructor(private toastr: ToastsManager,
    private _atencionService: AtencionMedicaService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.obtenerMedicamentoDescripcion();
    this.medicamento();
    // console.log(this.listaDisabled);
  }

  private medicamento() {
    // if ((this.param.idActoMedicoEncriptado != null || this.param.idActoMedicoEncriptado != undefined) && this.param.idActoMedicoEncriptado != "") {
    this.servicio().then();
    // }
    this.send();
  }

  /**----------------------------------------------
   * -------------       UTILS   ------------------
    ----------------------------------------------*/

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.listaAntecedenteMedicamentoDescripcion.filter(v => v.dciProductoFarmaceutico.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 15));

  formatter = (x: { dciProductoFarmaceutico: string }) => x.dciProductoFarmaceutico;


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: "success-dialog"
    });
  }
  send() {
    let _params: any = { medicamentos: {} };
    /**comprueba si ha seleccionado reacciones adversas 
     *0 = No, 1 = Si
      si es 0 manda vacio la lista de medicamento adversos*/
    if (this.listaAntecedenteMedicamento.reaccionAdversa == 0) {
      _params.medicamentos.lsMedicamentoAntecedentes = {};
    }
    _params.medicamentos.lsMedicamentoAntecedentes = this.lsreacAdver;
    _params.medicamentos.lsMedicamentoFrecuente = this.lsmedicamento;
    this.sendMedicamentos.emit(_params);
    // console.log(_params);
  }
  clear(){
    this.medicFrecuente = { medicamento: { dciProductoFarmaceutico: "", idMedicamento: "" }, dosis: "", observaciones: "" };
  }

  /**----------------------------------------------
   * ----------     USO DE SERVICIOS     ----------
     ---------------------------------------------*/


  private servicio() {
    let promise = new Promise((resolve, reject) => {
      this._atencionService.obtenerAntecedentesMedicamento(this.param)
        .toPromise().then(data => {
          // console.log(data);
          if (data.estado == 1) {
            this.listaAntecedenteMedicamento = data.antecedenteMedicamento;
            this.dataSource = new MatTableDataSource(this.listaAntecedenteMedicamento.lsMedicamentoFrecuente);
            this.dataSource1 = new MatTableDataSource(this.listaAntecedenteMedicamento.lsMedicamentoAntecedentes);
            // console.log(this.listaAntecedenteMedicamento);
          } else {
            this.toastr.error("Error en Medicamento" + data.mensaje);
          } resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }

  private obtenerMedicamentoDescripcion() {
    console.log(this.param);
    this._atencionService.obtenerMedicamentoDescripcion(this.param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listaAntecedenteMedicamentoDescripcion = data.lsMedicamento;
        } else if (data.estado == 0) {
          this.listaAntecedenteMedicamentoDescripcion = data.lsMedicamento;
        } else {
          this.toastr.error("Error al obtenerMedicamentoDescripcion" + data.mensaje);
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }

    /**-------------------------------------------
   * -----------     USO DE METODOS    -----------
     ---------------------------------------------*/


  //Metodo para realizar busqueda por Descripcion contando la cantidad de caracteres
  private busquedaMedicamentoDescripcion(value) {
    if (value.length % 2 == 0 && value.length > 3) {
      this.param.medicamentoDescripcion = value;
      this.obtenerMedicamentoDescripcion();
    }
  }

  private selectDescripcion(flg, idMedicamento, dciProductoFarmaceutico) {
    if (flg == 1) {
      this.medicFrecuente.medicamento.dciProductoFarmaceutico = dciProductoFarmaceutico;
      this.medicFrecuente.medicamento.idMedicamento = idMedicamento;
    } else if (flg == 2) {
      this.medicReacAdver.medicamento.dciProductoFarmaceutico = dciProductoFarmaceutico;
      this.medicReacAdver.medicamento.idMedicamento = idMedicamento;
    }
  }

  private agregarMedicamento() {
    // if (this.medicFrecuente.medicamento.dciProductoFarmaceutico == null || this.medicFrecuente.medicamento.idMedicamento == null) {
    //   this.toastr.warning("debe seleccionar un medicamento válido");
    //   return;
    // } else {
    //   //valida que no se repita un medicamento seleccionado
    for (let item of this.lsmedicamento) {
      if (item.nombre == this.medicFrecuente.medicamento.dciProductoFarmaceutico) {
        // this.toastr.warning("Medicamento ya seleccionado");
        this.openSnackBar("Medicamento ya seleccionado", "No Encontrado");
        return;
      }
    }
    let param = { nombre: "", dosis: "", observaciones: "" };
    param.nombre = this.medicFrecuente.medicamento.dciProductoFarmaceutico;
    param.dosis = this.medicFrecuente.dosis;
    param.observaciones = this.medicFrecuente.observaciones;
    this.lsmedicamento.push(param);
    console.log(this.lsmedicamento);
    this.dataSource = new MatTableDataSource(this.lsmedicamento);
    // }
    this.clear();
    this.send();
  }

  private eliminarMedicFrecuen(item) {
    let pos = 0;
    for (let v of this.lsmedicamento) {
      if (v.nombre == item) {
        break;
      }
      pos++;
    }
    this.lsmedicamento.splice(pos, 1);
    this.dataSource = new MatTableDataSource(this.lsmedicamento);
    this.send();
  }

  private agregarMedicReacAdver() {
    // console.log(this.medicReacAdver);
    // if (this.medicReacAdver.medicamento.dciProductoFarmaceutico == null || this.medicReacAdver.medicamento.idMedicamento == null || this.medicReacAdver.medicamento.dciProductoFarmaceutico == "") {
    if (this.medicReacAdver.medicamento.dciProductoFarmaceutico == null || this.medicReacAdver.medicamento.dciProductoFarmaceutico == "") {
      this.toastr.warning("Debe seleccionar un medicamento válido");
      return;
    } else {
      //valida que no se repita un medicamento seleccionado
      for (let item of this.lsreacAdver) {
        if (item.medicamento == this.medicReacAdver.medicamento.dciProductoFarmaceutico) {
          this.toastr.warning("Medicamento ya seleccionado");
          return;
        }
      }
      let param = { medicamento: "" };
      param.medicamento = this.medicReacAdver.medicamento.dciProductoFarmaceutico;
      this.lsreacAdver.push(param);
      console.log(this.lsreacAdver);
      this.dataSource1 = new MatTableDataSource(this.lsreacAdver);
    }
    this.medicReacAdver = { medicamento: { dciProductoFarmaceutico: null, idMedicamento: null } };
    this.send();
  }

  private eliminarMedicReacAdver(item) {
    let pos = 0;
    for (let v of this.lsreacAdver) {
      if (v.medicamento == item) {
        break;
      }
      pos++;
      // console.log(pos);
    }
    this.lsreacAdver.splice(pos, 1);
    this.dataSource1 = new MatTableDataSource(this.lsreacAdver);
    this.send();
  }
}
