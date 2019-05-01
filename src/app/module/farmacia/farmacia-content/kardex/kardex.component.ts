import { ReporteService } from './../../../../shared/services/reporte.service';
import { MantenimientoAnaquelService } from './../../services/mantenimiento-anaquel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalPdfComponent } from './../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ReporteFarmaciaService } from '../../services/reporte-farmacia.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('buscarKardex') private _Form: NgForm;

  private idAlmacen;
  private descripAlmacen;
  private gruposMedicamentos: any[];
  private descripAutoComplete: any = "";
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null };
  private medicDisp: any[] = [];
  private filteredDispMedi: any[] = [];
  private flgMedicDisp: any;
  private paramsBusqueda = { idAlmacen: null, fiTipo: null, idMedicamentoDispositivo: null, fhInicio: null, fhFin: null };
  private paramsBusquedaImpresion = { idAlmacen: null, fiTipo: null, idMedicamentoDispositivo: null, fhInicio: null, fhFin: null, noTipo: null, dciMedicamentoDispositivo: null, descripcionAlmacen: null, tipoFile: null };
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private productoDescripcion: String = '';
  private feIni: Date = null;
  private feFin: Date = null;
  private kardexList: any = [];
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['nMovimiento', 'td', 'nd', 'pd', 'fh', 'si', 'i', 's', 'sr'];

  constructor(
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    private __reporteFarmaciaService: ReporteFarmaciaService,
    public dialog: MatDialog,
    private _reporteService: ReporteService,
  ) {

    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    this.paramsBusquedaImpresion.idAlmacen = this.idAlmacen;
    this.paramsBusquedaImpresion.descripcionAlmacen = this.descripAlmacen;
    this.gruposMedicamentos = [
      { id: 'N', valor: "Seleccionar" },
      { id: 'M', valor: "Producto Farmaceútico" },
      { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }
    ];

    this.descripAutoComplete = this.gruposMedicamentos[0].valor;
    this.flgMedicDisp = 'N';
    this.parametrosMD.idAlmacen = null;

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
  }

  private placeDesc(opcion, _ngForm: any) {
    this.productoDescripcion = "";
    this.descripAutoComplete = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.paramsBusqueda = { idAlmacen: this.idAlmacen, fiTipo: null, idMedicamentoDispositivo: null, fhInicio: null, fhFin: null };
    this.kardexList = [];
  }

  private getMedicamentoDispositivos(descripMedicDispProd) {
    this.parametrosMD.descripcionMedicDispProdSanid = descripMedicDispProd;
    this._mantenimientoAnaquelService.getMedicamentoDispositivo(this.parametrosMD)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicDisp = data.medicamentoDispMedicoProdSanitarioList;
          console.log(this.medicDisp);
          console.log(this.medicDisp);
          this.filteredDispMedi = this.medicDisp.filter(obj => obj.fiTipo === this.flgMedicDisp);
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
    if (descripMedicDispProd.length > 1) {
      this.getMedicamentoDispositivos(descripMedicDispProd);
    }
    else {
      this.filteredDispMedi = [];
      this.paramsBusqueda.idMedicamentoDispositivo = null;
    }
  }

  private seleccionaMedicamento(medicamentoDisp) {
    this.paramsBusqueda.idMedicamentoDispositivo = medicamentoDisp.idMedicamento;
    this.paramsBusquedaImpresion.idMedicamentoDispositivo = this.paramsBusqueda.idMedicamentoDispositivo;
    this.paramsBusqueda.fiTipo = medicamentoDisp.fiTipo;
    this.paramsBusquedaImpresion.dciMedicamentoDispositivo = medicamentoDisp.dispositivoMedicamento;
    //this.parametros.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento; -> impresion
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarKardexList();
  }

  private buscarKardexList(numPagina?: number) {
    if (this.productoDescripcion == '' || this.productoDescripcion == null) {
      this.paramsBusqueda.idMedicamentoDispositivo = null;
    }
    if (this.flgMedicDisp == 'N') {
      this.paramsBusqueda.fiTipo = null;
    } else {
      this.paramsBusqueda.fiTipo = this.flgMedicDisp;
    }

    if ((this.productoDescripcion != null || this.productoDescripcion != '' || this.productoDescripcion != undefined) && this.paramsBusqueda.idMedicamentoDispositivo == null) {
      if (!(this.productoDescripcion == '')) {
        this.toastr.warning("Ingresar un medicamento válido");
        this.productoDescripcion = '';
        //this.almMedicList = [];
        return;
      }
    }

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    if (this.feIni != null && this.feFin != null) {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.paramsBusqueda.fhInicio = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
      this.paramsBusqueda.fhFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    }

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.paramsBusqueda);
    this.__reporteFarmaciaService.getKardex(this.paramsBusqueda)
      .subscribe(data => {
        if (data.estado == 1) {
          this.kardexList = data.kardexList;
          console.log(this.kardexList);
          this.dataSource = new MatTableDataSource(this.kardexList);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.kardexList.length > 0) {
            this.pagination.nuRegisMostrar = this.kardexList[0].nuTotalReg;
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos");
          this.kardexList = [];
        }
        return true;
      },
        err => { console.error(err) },
        () => {
        });
  }

  private pdf: String;

  private imprimirPDF(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.paramsBusquedaImpresion.fiTipo = this.paramsBusqueda.fiTipo;
      this.paramsBusquedaImpresion.idMedicamentoDispositivo = this.paramsBusqueda.idMedicamentoDispositivo;
      if (this.paramsBusquedaImpresion.idMedicamentoDispositivo == null || this.paramsBusquedaImpresion.idMedicamentoDispositivo == undefined) {
        this.paramsBusquedaImpresion.dciMedicamentoDispositivo = "--";
      }
      if (this.paramsBusquedaImpresion.fiTipo == "M") {
        this.paramsBusquedaImpresion.noTipo = "Producto Farmacéutico";
      }
      else if (this.paramsBusquedaImpresion.fiTipo == "D") {
        this.paramsBusquedaImpresion.noTipo = "Dispositivo Médico Producto Sanitario";
      }
      else if (this.paramsBusquedaImpresion.fiTipo == null) {
        this.paramsBusquedaImpresion.noTipo = "--";
      }
      this.paramsBusquedaImpresion.fhInicio = this.paramsBusqueda.fhInicio;
      this.paramsBusquedaImpresion.fhFin = this.paramsBusqueda.fhFin;
      this.paramsBusquedaImpresion.tipoFile = tipoFile;
      console.log(this.paramsBusquedaImpresion);
      this.__reporteFarmaciaService.getKardexImpresion(this.paramsBusquedaImpresion).toPromise().then(data => {
        if (data.estado == 1) {
          if (tipoFile == 2) {
            this.pdf = "data:application/pdf;base64," + data.imprimeFile;
            this.pruebitaModal(this.pdf);
          }
          else {
            this._reporteService.generar(null, data.imprimeFile, tipoFile);
          }
        }
        else {
          this.toastr.error(data.mensaje, "No se encontraron medicamentos en dicha fecha");
        }
        resolve(data.imprimeFile);
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    });
    return promise;
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  pruebitaModal(mystring): void {
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

  private imprimePDFKardex(tipoFile) {
    if (this.kardexList[0] != null && this.kardexList[0] != undefined) {
      this.imprimirPDF(tipoFile);
    }
    else {
      this.toastr.warning("Busque nuevos abastecimientos");
    }
  }

}
