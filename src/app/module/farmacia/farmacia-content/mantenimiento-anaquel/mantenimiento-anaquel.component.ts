import { arrayLength } from './../../../../shared/helpers/custom-validators/ng4-validators/array-length/validator';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { MantenimientoAnaquelService } from '../../services/mantenimiento-anaquel.service';
import { ProviderAst } from '@angular/compiler';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { log } from 'util';
import { element } from 'protractor';
import { MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras, UrlTree, UrlSegmentGroup, UrlSegment, ActivatedRoute } from '@angular/router';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-mantenimiento-anaquel',
  templateUrl: './mantenimiento-anaquel.component.html',
  styleUrls: ['./mantenimiento-anaquel.component.scss']
})
export class MantenimientoAnaquelComponent implements OnInit {
  private idAlmacen;
  private isvalid: Number = 0;
  private tvalid: Number = 0;
  private valid: Number = 0;
  private gruposMedicamentos: any[];
  private anaqueles: any[] = [];
  private medicDisp: any[] = [];
  private tipoM: any[] = [];
  private onlyMedic: any[] = [];
  private onlyDisp: any[] = [];
  private tipoD: any[] = [];
  private medic: any = [];
  private almacenes: any[] = [];
  private parametros = { idMedicamentoAlmacen: null, anaquel: null }
  private sMedic: any[] = [];
  private showInput: any = [];
  private params = { idAlmacen: null, anaquel: null, idMedicamento: null, idDispMedicoProdSanitario: null, fiTipo: null };
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null }
  private productoF: { idMedicamento: null, dispositivoMedicamento: null, anaquel: null };
  private anaquelPonerF: { almacenMedicamento: { anaquel: null } };
  private dispositivoM: { idMedicamento: null, dispositivoMedicamento: null, anaquel: null };
  private tipoAlmacen: any;
  private descripAlmacen: any;
  private auxMedicamento: any[] = [];
  private productoDisposiMedicamento = "";
  private labelAutocomplete = "";
  private anaquelBuscar = "";
  private auxAnaqueles = [];
  private idAlmaTipoAlma: any;
  private anaquel: String;

  dataSource = new MatTableDataSource();
  displayedColumns = ['codigo', 'dciProductoFarmaceutico', 'formaFarmaceutica', 'nombreComercial', 'marca', 'laboratorio', 'anaquel', 'edit'];
  displayedColumnsD = ['codigo', 'dciDispMedicoProdSanitario', 'formaFarmaceutica', 'nombreComercial', 'marca', 'laboratorio', 'anaquel', 'edit'];

  constructor(private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.gruposMedicamentos = [{ id: 1, valor: "Producto Farmacéutico" },
    { id: 2, valor: "Dispositivos Médicos y/o Productos Sanitarios" }];
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
  }
  private capturarTipoAlmacen() {
    if (this.idAlmaTipoAlma != null && this.idAlmaTipoAlma != '' && this.idAlmaTipoAlma != undefined) {
      let array = this.idAlmaTipoAlma.split(",");
      this.idAlmacen = array[0];
    }

    this.getMedicamentoDispositivos();
  }

  ngOnInit() {
    // this.getAlmacenesAsignados();
    this.getMedicamentoDispositivos();
  }

  filterDescProcs(val: string) {
    this.auxMedicamento = val ? this._filter(val) : [];
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.auxMedicamento.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
  }
  private auxFilter(val: string, opcion) {
    if (opcion == 1) {
      this.auxMedicamento = this.tipoM;
      this.filterDescProcs(val);
      if (this.auxMedicamento.length === 0) {
        if (val != '') {
          //this.toastr.warning("Medicamento que inicie con letra/palabra ingresada no encontrada, vuelva a intentar");
        }
      }
    }
    else if (opcion == 2) {
      this.auxMedicamento = this.tipoD;
      this.filterDescProcs(val);
      if (this.auxMedicamento.length === 0) {
        if (val != '') {
          //this.toastr.warning("Dispositivo médico que inicie con letra/palabra ingresada no encontrada, vuelva a intentar");
        }
      }
    }
  }
  filterAnaqueles(val: string) {
    this.auxAnaqueles = val ? this._filter2(val) : [];
  }

  private _filter2(val: string) {
    const filterValue = val.toLowerCase();
    return this.auxAnaqueles.filter(value => value.anaquel.toLowerCase().startsWith(filterValue));
  }
  private filterAnaquel(val: string) {
    this.auxAnaqueles = this.anaqueles;
    this.filterAnaqueles(val);
  }

  private getMedicamentoDispositivos() {
    this.tipoM = [];
    this.tipoD = [];
    this.parametrosMD.idAlmacen = this.idAlmacen;
    this._mantenimientoAnaquelService.getMedicamentoDispositivo(this.parametrosMD)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDisp = data.medicamentoDispMedicoProdSanitarioList;
          for (var i = 0; i < this.medicDisp.length; i++) {
            if (this.medicDisp[i].fiTipo == "M") {
              this.tipoM.push(this.medicDisp[i]);
            }
            if (this.medicDisp[i].fiTipo == "D") {
              this.tipoD.push(this.medicDisp[i]);
            }
          }
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

  private getAnaqueles() {
    this._mantenimientoAnaquelService.getAnaqueles(this.idAlmacen)
      .subscribe(data => {
        if (data.estado == 1) {
          this.anaqueles = data.almacenMedicamentoList;
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

  private placeDesc(opcion) {
    this.capturarTipoAlmacen();
    this.productoDisposiMedicamento = "";
    this.auxMedicamento = [];
    this.auxAnaqueles = [];
    if (opcion == 1) {
      this.labelAutocomplete = "Producto Farmacéutico:";
      this.params.fiTipo = "M";
      this.tvalid = 2;
      this.isvalid = 1;
      this.bus1(2, null);
      // this.params.anaquel = $('#todosm').val();
    } else if (opcion == 2) {
      this.labelAutocomplete = "Dispositivo Medico y/o Producto Sanitario";
      this.params.fiTipo = "D";
      this.tvalid = 2;
      this.isvalid = 1;
      this.bus1(1, null);
      // this.params.anaquel = $('#todosd').val();
    }
    else {
      this.isvalid = 0;
      this.tvalid = 2;
    }
  }

  private listarMedicamentos() {
    this.onlyMedic = [];
    this.onlyDisp = [];
    this.params.idAlmacen = this.idAlmacen;
    console.log(this.params)
    this._mantenimientoAnaquelService.getAlmacenMedicamentos(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medic = data.almacenMedicamentoList;
          console.log(this.medic);
          this.dataSource = new MatTableDataSource(this.medic);
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos");
        }
        return true;
      },
        err => { console.error(err) },
        () => {
          for (var i = 0; i < this.medic.length; i++) {
            if (this.medic[i].medicamento != undefined) {

              this.onlyMedic.push(this.medic[i]);
            }
            if (this.medic[i].dispMedicoProdSanitario != undefined) {

              this.onlyDisp.push(this.medic[i]);
            }
          }
          for (var i = 0; i < this.medic.length; i++) {
            this.showInput[i] = 1;
          }
          for (var i = 0; i < this.onlyMedic.length; i++) {
            this.showInput[i] = 1;
          }
          for (var i = 0; i < this.onlyDisp.length; i++) {
            this.showInput[i] = 1;
          }
          this.productoF = { idMedicamento: null, dispositivoMedicamento: null, anaquel: null };
          this.dispositivoM = { idMedicamento: null, dispositivoMedicamento: null, anaquel: null }
          this.productoDisposiMedicamento = "";
          this.anaquelBuscar = "";
        });
  }

  private bus1(opcion, opcion2) {
    if (opcion == 1) {
      if (opcion2 == "Todos") {
        opcion2 = null;
      }
      if (this.productoF != undefined) {
        this.params.idMedicamento = this.productoF.idMedicamento;
        this.params.anaquel = opcion2;
      }
    }
    else if (opcion == 2) {
      if (opcion2 == "Todos") {
        opcion2 = null;
      }
      if (this.dispositivoM != undefined) {
        this.params.idDispMedicoProdSanitario = this.dispositivoM.idMedicamento;
        this.params.anaquel = opcion2;
      }
    }
  }
  placeProdcutoFarma(jsonProducto, opcion) {
    if (opcion == 1) {
      this.productoF = jsonProducto;
    }
    else if (opcion == 2) {
      this.dispositivoM = jsonProducto;
    }
  }

  private buscarMD(opcion) {
    this.medic = []
    this.dataSource = new MatTableDataSource(this.medic);
    this.tvalid = 1;
    if (opcion == 1) {
      this.valid = 1;
      if (this.anaquelBuscar == "Todos") {
        this.anaquelBuscar = null;
      }
      if (this.productoF != undefined) {
        this.params.idMedicamento = this.productoF.idMedicamento;
        this.params.anaquel = this.anaquelBuscar;

      }
      this.listarMedicamentos();
    }
    else if (opcion == 2) {
      this.valid = 2;
      if (this.anaquelBuscar == "Todos") {
        this.anaquelBuscar = null;
      }
      if (this.dispositivoM != undefined) {
        this.params.idDispMedicoProdSanitario = this.dispositivoM.idMedicamento;
        this.params.anaquel = this.anaquelBuscar;
      }
      this.listarMedicamentos();
    }
    this.onlyMedic = []
    this.onlyDisp = []
    this.anaquelPonerF = { almacenMedicamento: { anaquel: null } };
    this.productoF = { idMedicamento: null, dispositivoMedicamento: null, anaquel: null };
    this.dispositivoM = { idMedicamento: null, dispositivoMedicamento: null, anaquel: null };
    this.productoDisposiMedicamento = "";
  }

  private upAnaquel(idAlmacenMedicamento, anaquel, i, idMedicamento) {
    let param = { almacenMedicamento: { almacen: { idAlmacen: null }, anaquel: null, fiTipo: null, medicamento: { idMedicamento: null } } };
    param.almacenMedicamento.almacen.idAlmacen = this.idAlmacen;
    param.almacenMedicamento.medicamento.idMedicamento = idMedicamento;
    param.almacenMedicamento.fiTipo = this.params.fiTipo;
    param.almacenMedicamento.anaquel = anaquel;
    this._mantenimientoAnaquelService.updateAnaquel(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.anaquelPonerF = { almacenMedicamento: { anaquel: null } };
          this.getAnaqueles();
          this.auxAnaqueles = [];
        }
        this.listarMedicamentos();
        return true;
      },
        error => {
          this.toastr.error('Error al Actualizar', 'Error');
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private pressEnter(idAlmacenMedicamento, anaquel, i, idMedicamento) {
    if (anaquel == "") {
      anaquel = null;
    }
    this.upAnaquel(idAlmacenMedicamento, anaquel, i, idMedicamento);
  }

  private asignarAnaquel(indice1) {
    if (this.showInput[indice1] == 1) {
      this.anaquel = "";
      this.showInput[indice1] = 2;
    }
    else { this.showInput[indice1] = 1; }
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
