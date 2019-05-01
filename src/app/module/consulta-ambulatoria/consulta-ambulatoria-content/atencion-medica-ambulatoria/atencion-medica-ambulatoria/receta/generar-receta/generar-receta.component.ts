import { AtencionMedicaService } from './../../../../../services/atencion-medica.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { DeleteMedicamentoComponent } from './delete-medicamento/delete-medicamento.component';
import { DeleteRecetaComponent } from './delete-receta/delete-receta.component';
import { RecetaService } from '../../../../../services/receta.service';
import { ReporteService } from '../../../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalPdfComponent } from '../../../../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { MovimientoService } from '../../../../../../farmacia/services/movimiento.service';

@Component({
  selector: 'app-generar-receta',
  templateUrl: './generar-receta.component.html',
  styleUrls: ['./generar-receta.component.scss']
})
export class GenerarRecetaComponent implements OnInit {

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPag: MatPaginator;

  displayedColumns = ['Descripcion', 'Unidad', 'Cantidad', 'Duracion', 'Diagnostico', 'Accion'];
  matDataSource = new MatTableDataSource();
  //probando
  private numActoMedico;
  private idPersona;
  private diagnosticoActoMedico = { idActoMedico : null, descripcionDiagnostico : null}
  private recetaCabezeraRequest = { recetaCabecera: { actoMedico: { idActoMedicoEncriptado: null, area: { id: null } }, recetaDetalleList: [{ idUnidad: null, cantidad: null, diasDuracion: null, dosificacion: null, frecuencia: null, posologia: null, medicamento: { idMedicamento: null }, dispMedicoProdSanitario: { idDispMedicoProdSanitario: null }, idDiagnostico: null }], idAtencionEncriptado: null } };
  // private params = { idActoMedico: null, impresion: false, tipoFile: 0 };
  private medicDispMedicProdSanit: any[] = [];
  private medicDispProd = { idMedicDisp: null, fiTipo: null };
  private detalleRecetaCabezera: any[] = [];
  private diagnosticos: any[] = [];
  private antecedentes: any[] = [];
  // private filteredDispMedi: any[] = [];
  private idReceta: number = null;
  private descripMedicDispMedicProducSanit: String = "";
  private descripAntecedentes: String = "";
  private descripDiagnosticos: String = "";
  private date = new Date();
  private idArea;
  private idAtencion;

  private _params = { idPersona: null, idActomedico: null, idActoMedico: null, idAtencion: null, idArea: null, impresion: false, tipoFile: null, idCita: null, descripMedicDispProd: null };//, nuPagina: 1, nuRegisMostrar: 5
  private lsdiagnosticoPersona = [{ codigoDiagnostico: null, descripcionDiagnostico: null, fecha: null }];
  private lsMedicamentosAntxPersona = [];

  private unidadesMedidas = [];

  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private pdf: String = "";

  constructor(
    private _recetaService: RecetaService,
    private _atencionMedicaService: AtencionMedicaService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _movimientoService: MovimientoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this._route.queryParams.subscribe(params => {
      this._params.idPersona = params["idPersona"];
      this._params.idCita = params["idCita"];;
      this._params.idActoMedico = localStorage.getItem("idActoMedicoEncriptado");
      this._params.idActomedico = localStorage.getItem("idActoMedicoEncriptado");
      this._params.idAtencion = localStorage.getItem("idAtencionEncriptado");
      this._params.idArea = localStorage.getItem('idArea');

    });

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [4];
    this.pageSize = this.displayedSizes[0];
  }

  // filterMeds(val: any) {
  //   return val ? this._filter(this.medicDispMedicProdSanit, val) : this.medicDispMedicProdSanit;
  // }
  filterMeds(val: any) {
    this.medicDispMedicProdSanit = val ? this._filter(val) : [];
  }
  // private _filter(medicDispMedicProdSanit: any, val: string) {
  //   const filterValue = val.toLowerCase();
  //   return medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().indexOf(filterValue));
  // }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().indexOf(filterValue) === 0);
  }

  private listaDiagnostico = [];
  private getDiagnosticos() {
    this.recetaCabezeraRequest.recetaCabecera.actoMedico.idActoMedicoEncriptado = this._params.idActomedico;

    
    let idActoMedico = this.recetaCabezeraRequest.recetaCabecera.actoMedico.idActoMedicoEncriptado ;
    let param = { idActoMedicoEncriptado : idActoMedico }
    console.log(idActoMedico);
    

    
    this._atencionMedicaService.obtenerDiagnosticoPoridActoMedico(param)
      .subscribe(data => {
        console.log(data);
        
        if (data.estado == 1) {
          
          this.listaDiagnostico = data.diagnosticoActoMedico;
        } else {
          // this.toastr.error(data.mensaje);
           this.listaDiagnostico = []
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  ngOnInit() {
    if (this._params.idActomedico != null && this._params.idAtencion != null) {
      this.getDetalleRecetaCabezera();
    }
    console.log(this._params);
this.getDiagnosticos();
    this.obtenerdiagnosticoPersona();
    this.obtenerMedicamentoxPersona();
    this.recetaCabezeraRequest.recetaCabecera.actoMedico.idActoMedicoEncriptado = this._params.idActomedico;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right'
    });
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerMedicamentoxPersona();
  }

  private getMedicDispMedProdSanit() {
    this._recetaService.getMedicDispMedProdSanit(this._params)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.medicDispMedicProdSanit = data.medicamentoDispMedicoProdSanitarioList;
          if (this.medicDispMedicProdSanit.length === 0) {
            // this.toastr.warning("Producto Farmacútico/Dispositivo Médico no encontrado");
            this.openSnackBar("Producto Farmacútico/Dispositivo Médico ", "No Encontrado");
          }
          else {
            this.filterMeds(this._params.descripMedicDispProd);
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

  private buscarMedicDispProdDescripcion(descripMedicDispProd) {
    console.log(descripMedicDispProd)
    this._params.descripMedicDispProd = descripMedicDispProd;
    if (this._params.descripMedicDispProd.length % 2 == 0) {
      this.getMedicDispMedProdSanit();
    } else {
      // this.filteredDispMedi = [];
    }
  }

  private seleccionaMedicamentoMaterial(medicamentoMaterial) {
    console.log(medicamentoMaterial);
    this.medicDispProd.idMedicDisp = medicamentoMaterial.idMedicamento;
    this.medicDispProd.fiTipo = medicamentoMaterial.fiTipo;
    // this.descripMedicDispMedicProducSanit  = medicamentoMaterial.dispositivoMedicamento +' '+medicamentoMaterial.formaFarmaceutica+ ' '+medicamentoMaterial.concentracion
    this.unidadesMedidas = [];
    if (medicamentoMaterial.idMedicamento == undefined || medicamentoMaterial.idMedicamento == null) {
      this.unidadesMedidas = [];
    } else {
      if (medicamentoMaterial.fiTipo == "M") {
        this.getUnidadMedicamentoDispositivo(this.medicDispProd.idMedicDisp, null);
      } else if (medicamentoMaterial.fiTipo == "D") {
        this.getUnidadMedicamentoDispositivo(null, this.medicDispProd.idMedicDisp);
      }
    }
  }

  private saveReceta(_ngForm: any) {
    // debugger
    if (isInvalid(_ngForm)) {
      return;
    }
    this.recetaCabezeraRequest.recetaCabecera.actoMedico.idActoMedicoEncriptado = this._params.idActomedico;
    this.recetaCabezeraRequest.recetaCabecera.idAtencionEncriptado = this._params.idAtencion;
    this.recetaCabezeraRequest.recetaCabecera.actoMedico.area.id = this._params.idArea;
    if (this.medicDispProd.fiTipo == 'M') {
      this.recetaCabezeraRequest.recetaCabecera.recetaDetalleList[0].medicamento.idMedicamento = this.medicDispProd.idMedicDisp;
    } else if (this.medicDispProd.fiTipo == 'D') {
      this.recetaCabezeraRequest.recetaCabecera.recetaDetalleList[0].dispMedicoProdSanitario.idDispMedicoProdSanitario = this.medicDispProd.idMedicDisp;
    }
    console.log(this.recetaCabezeraRequest);
    this._recetaService.addCabeceraReceta(this.recetaCabezeraRequest)
      .subscribe(data => {
        console.log(data);
        
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.getDetalleRecetaCabezera();
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
          this.getDetalleRecetaCabezera();
          this.limpiarCampos();
          _ngForm.resetForm();
          // this.getDetalleRecetaCabezera();
        });
  }


  private getDetalleRecetaCabezera() {
    console.log(this._params);
    this._recetaService.getDetalleRecetaCabezera(this._params)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.recetaCabecera != null) {
            this.detalleRecetaCabezera = data.recetaCabecera;
            this.idReceta = data.recetaCabecera.idReceta;
            this.matDataSource = new MatTableDataSource(this.detalleRecetaCabezera['recetaDetalleList']);
          }
        } else if (data.estado == 0) {
          this.toastr.info(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
          console.error("")
        }
      },
        err => { this.toastr.error(err) });
  }

  private modalDetalleRecetaDelete(idDetalleReceta) {
    const modalRef = this.modalService.open(DeleteMedicamentoComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.idDetalleReceta = idDetalleReceta;
    modalRef.result.then((result) => {
      this.getDetalleRecetaCabezera();
    }, (reason) => {
      this.getDetalleRecetaCabezera();
    });
  }


  //obtiene los diagnostico encontrados a la persona
  obtenerdiagnosticoPersona() {
    console.log(this._params);
    this._recetaService.getDiagnosticosxPersona(this._params)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.lsdiagnosticoPersona = data.diagnosticoActoMedicoList;
          if (this.lsdiagnosticoPersona == null) {
            this.toastr.info("El paciente no tiene Diagnostico Anteriores")
          }
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      }, err => { this.toastr.error(err) });
  }

  //obtiene los diagnostico encontrados a la persona
  obtenerMedicamentoxPersona(numPagina?: number) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this._params).forEach(key => {
      this._params[key] = (this._params[key] === '') ? null : this._params[key];
    });
    this._params = {
      ...this._params,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    console.log(this._params);
    this._recetaService.getMedicamentosxPersona(this._params)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          this.lsMedicamentosAntxPersona = data.recetaCabeceraList;

          if (this.lsMedicamentosAntxPersona.length > 0) {
            this.pagination.nuRegisMostrar = this.lsMedicamentosAntxPersona[0].nuTotalReg;
            if (this.matPag) {
              this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
            }
          }
          if (this.lsdiagnosticoPersona == null) {
            this.toastr.info("El paciente no tiene Medicamentos Anteriores")
          }
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
        } else {
          this.toastr.error(data.mensaje);
        }
      }, err => { this.toastr.error(err) });
  }

  private modalRecetaDelete() {
    if (this.idReceta == null || this.idReceta == undefined) {
      this.toastr.error("Aun no ha creado una receta");
      return;
    }
    const modalRef = this.modalService.open(DeleteRecetaComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.idReceta = this.idReceta;
    modalRef.result.then((result) => {
      this.detalleRecetaCabezera = [];
      this.getDetalleRecetaCabezera();
    }, (reason) => {
      this.detalleRecetaCabezera = [];
      this.getDetalleRecetaCabezera();
    });
  }

  private limpiarCampos() {
    let medicamento = { idMedicamento: null };
    let dispMedicoProdSanitario = { idDispMedicoProdSanitario: null };
    this.recetaCabezeraRequest.recetaCabecera.recetaDetalleList[0].medicamento = medicamento;
    this.recetaCabezeraRequest.recetaCabecera.recetaDetalleList[0].dispMedicoProdSanitario = dispMedicoProdSanitario;
  }

  private imprimirReceta() {
    this._params.impresion = true;
    this._params.tipoFile = 2;
    console.log(this._params);
    this._recetaService.getDetalleRecetaCabezera(this._params)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          // this._reporteService.generar(null, data.imprimeFile, this._params.tipoFile);
          this.pdf = "data:application/pdf;base64," + data.imprimeFile;
          this.openModal(this.pdf);
        }
      },
        err => { this.toastr.error(err) },
        () => {
          this._params.impresion = false;
          this._params.tipoFile = 0;
        });
  }

  openModal(mystring): void {
    const dialogRef = this.dialog.open(ModalPdfComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: false,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.mystring = mystring;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
    let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
    this.unidadesMedidas = [];
    this._movimientoService.getUnidadMedicamentoDispositivo(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.unidadesMedidas = data.listUnidad;
        } else {
          // this.toastr.error(data.mensaje);
          this.unidadesMedidas = []
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private cleanRegistro(_controlVar: any) {
    _controlVar.reset();
  }

}
