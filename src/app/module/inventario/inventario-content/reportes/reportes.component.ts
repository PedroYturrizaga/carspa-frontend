import { Component, OnInit } from '@angular/core';
import { ModalPdfComponent } from "../../../../shared/helpers/modal-pdf/modal-pdf.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastsManager } from "ng2-toastr/src/toast-manager";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  private pdf: String = "";
  constructor( public dialog: MatDialog,
  private toastr: ToastsManager,) { }

  ngOnInit() {
  }
    private getObtenerImpresionExamenes() {

    // this._examenesApoyoService.obtenerImpresionExamenes()
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       // this._reporteService.generar(null, data.imprimeFile, 2);
    //       this.pdf = "data:application/pdf;base64," + data.imprimeFile;
    //       this.openModal(this.pdf);
    //     } else if (data.estado == -1) {
    //       this.toastr.warning('No se ingresaron examenes asignados');
    //     }
    //   },
    //   err => {
    //     this.toastr.error(err)
    //   });

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
