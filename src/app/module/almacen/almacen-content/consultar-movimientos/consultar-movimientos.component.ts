import { ModalPdfComponent } from './../../../../shared/helpers/modal-pdf/modal-pdf.component';
import { AlmacenService } from './../../services/almacen.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ReporteService } from '../../../../shared/services/reporte.service';

@Component({
  selector: 'app-consultar-movimientos',
  templateUrl: './consultar-movimientos.component.html',
  styleUrls: ['./consultar-movimientos.component.scss']
})
export class ConsultarMovimientosComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  private paramListar = { idMaterial: null, feIni: null, feFin: null };
  dataSource = new MatTableDataSource();
  private pageSize: number;
  private pagination: any;
  private displayedSizes: number[];
  private listKardex: any = [];
  private feIni: Date = null;
  private feFin: Date = null;
  private listMaterial: any = [];
  displayedColumns = ['fecha', 'tipoMovimiento', 'e', 'pE', 's', 'pS', 'sT', 'pT'];

  constructor(
    private _modalDialog: MatDialog,
    private _almacenService: AlmacenService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private _reporteService: ReporteService
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.paramListar.feIni = null;
    this.paramListar.feFin = null;
    this.listarAllMaterial();
  }


  private listarAllMaterial() {
    this._almacenService.listarMateriales()
      .subscribe(data => {
        if (data.estado == 1) {
          this.listMaterial = data.nombreMaterialList;
          console.log(this.listMaterial);
        } else if (data.estado == 0) {
          this.toastr.warning("No hay materiales");
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }



  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.listarKardex();
  }


  private listarKardex(numPagina?: number) {

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    if (this.feIni != null && this.feFin != null) {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      this.paramListar.feIni = ((this.feIni).toLocaleDateString('es-PE', options)).split('/').join('-');
      this.paramListar.feFin = ((this.feFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    }

    Object.keys(this.paramListar).forEach(key => {
      this.paramListar[key] = (this.paramListar[key] === '') ? null : this.paramListar[key];
    });

    this.paramListar = {
      ...this.paramListar,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.paramListar);
    this._almacenService.listarKardex(this.paramListar)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listKardex = data.movimientosKardexList;
          console.log(this.listKardex);
          this.dataSource = new MatTableDataSource(this.listKardex);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.listKardex.length > 0) {
            this.pagination.nuRegisMostrar = this.listKardex[0].nuTotalReg;
          }

        } else if (data.estado == 0) {
          this.toastr.warning("No hay movimientos");
          this.listKardex = [];
        }
      },
        error => {
          this.toastr.error(error);
          this.listKardex = [];
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private paramReporte = { idMaterial: null, feIni: null, feFin: null, nuPagina: null, nuRegisMostrar: null, tipoFile: null };
  private pdf: String;
  private kardex: any = [];
  private imprimirReportePromise(tipoFile) {
    let promise = new Promise((resolve, reject) => {
      this.paramReporte.idMaterial = this.paramListar.idMaterial;
      this.paramReporte.feIni = this.paramListar.feIni;
      this.paramReporte.feFin = this.paramListar.feFin;
      this.paramReporte.tipoFile = tipoFile;
      console.log(this.paramReporte);
      this._almacenService.obtenerReporteKardex(this.paramReporte).toPromise().then(data => {
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
          this.toastr.error(data.mensaje, "No se encontraron movimientos.");
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


  imprimePDF_Excel(tipoFile) {
    if (this.listKardex[0] != null && this.listKardex[0] != undefined) {
      this.imprimirReportePromise(tipoFile);
    }
    else {
      this.toastr.warning("Busque nuevos movimietos");
    }
  }


  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

}
