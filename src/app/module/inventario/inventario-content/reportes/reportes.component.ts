import { Component, OnInit } from '@angular/core';
import { ModalPdfComponent } from "../../../../shared/helpers/modal-pdf/modal-pdf.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastsManager } from "ng2-toastr/src/toast-manager";
import { AdministrarMaquinariaService } from "../../administrar-maquinaria.service";
import { AdministrarMaterialService } from "../../administrar-material.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  private lista = [];
  private pdf: String = "";
  private combo = { nombre: null }
  private requestListar = { nombre: null, idAlerta1: 1, idAlerta2: 3, nuPagina: 1, nuRegisMostrar: 100000000 };
  private request = { idMaterial:null,fechaRegistro:null ,tipoFile: 2 };
  private listMaterial = [];
  private listAnos = [];
  displayedColumns = ['codigo', 'material', 'orden'];
  dataSource = new MatTableDataSource();
  constructor(
    public dialog: MatDialog,
    private toastr: ToastsManager,
    private _maquinariaService: AdministrarMaquinariaService,
    private _materialService: AdministrarMaterialService) { }

  ngOnInit() {
    this.lista = [{ inv: 'Maquinarias', id: 1 }, { inv: 'Materiales con Alerta de Stock', id: 2 }, { inv: 'Salidas del Material', id: 3 }];
    this.dataSource = new MatTableDataSource(this.lista);
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
      });
  }
  private generarReporte(e) {
    if (e.id == 1) {
      this.getObtenerImpresionMaquinas();
    }
    if (e.id == 2) {
      this.getObtenerImpresionMaterialesAlerta();
    }
    if (e.id == 3) {
      if (this.request.idMaterial == null) {
        this.toastr.info("Debe seleccionar un material")
      }
      if (this.request.fechaRegistro == null) {
        this.toastr.info("Debe seleccionar año")
      }
      else {
        this.getMaterialesMes();
      }
    }
  }
  private getObtenerImpresionMaquinas() {

    this._maquinariaService.getMaquinariasReporte()
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          // this._reporteService.generar(null, data.imprimeFile, 2);
          this.pdf = "data:application/pdf;base64," + data.imprimeFile;
          this.openModal(this.pdf);
        } else if (data.estado == -1) {
          console.log(data);
        }
      },
      err => {
        this.toastr.error(err)
      });

  }
  private getObtenerImpresionMaterialesAlerta() {

    this._materialService.getMaterialesAlertaReporte(this.requestListar)
      .subscribe(data => {
        if (data.estado == 1) {
          // this._reporteService.generar(null, data.imprimeFile, 2);
          this.pdf = "data:application/pdf;base64," + data.imprimeFile;
          this.openModal(this.pdf);
        } else if (data.estado == -1) {
          console.log(data);
        }
      },
      err => {
        this.toastr.error(err)
      });

  }
  private getMaterialesMes() {
    this._materialService.getMaterialMes(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.pdf = "data:application/pdf;base64," + data.imprimeFile;
          this.openModal(this.pdf);
          this.request.idMaterial=null;
          this.listMaterial=null;
          this.combo.nombre=null;
          this.request.fechaRegistro=null;
          this.listAnos=null;
        } else if (data.estado == -1) {
          console.log(data);
        }
      },
      err => {
        this.toastr.error(err)
      });
  }
  busqueda(target) {
    if (target.length % 2 == 0) {
      this.getMateriales();
    }
  }
  selectMaterial(e) {
    this.request.idMaterial = e.idMaterial;
    this.getAnosMateriales();
  }
    private getAnosMateriales() {    
    this._materialService.getMaterialesAnoCombo(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listAnos = data.materiales;
        } else if (data.estado == -1) {
          console.log(data);
        }
      },
      err => {
        this.toastr.error(err)
      });

  }

  private getMateriales() {
    this._materialService.getMaterialesCombo(this.combo)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listMaterial = data.materiales;
        } else if (data.estado == -1) {
          console.log(data);
        }
      },
      err => {
        this.toastr.error(err)
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


}
