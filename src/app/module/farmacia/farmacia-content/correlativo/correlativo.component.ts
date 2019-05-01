import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CorrelativoService } from '../../services/correlativo.service';
import { ActivatedRoute } from '@angular/router';
import { ModalInsertarEditarCorrelativoComponent } from './modal-insertar-editar-correlativo/modal-insertar-editar-correlativo.component';

@Component({
  selector: 'app-correlativo',
  templateUrl: './correlativo.component.html',
  styleUrls: ['./correlativo.component.scss']
})
export class CorrelativoComponent implements OnInit {

  private idAlmacen;
  private paramsBusqueda = { idAlmacen: null, anio: null };
  private correlativo: any = [];
  dataSource = new MatTableDataSource();
  displayedColumnsA = ['documento', 'numero', 'anio', 'editar'];

  private request = { anio: null };
  anios = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
    { value: '2028', viewValue: '2028' },
    { value: '2029', viewValue: '2029' },
    { value: '2030', viewValue: '2030' },
    { value: '2031', viewValue: '2031' },
    { value: '2032', viewValue: '2032' },
    { value: '2033', viewValue: '2033' },
    { value: '2034', viewValue: '2034' },
    { value: '2035', viewValue: '2035' },
    { value: '2036', viewValue: '2036' },
    { value: '2037', viewValue: '2037' },
    { value: '2038', viewValue: '2038' },
    { value: '2039', viewValue: '2039' },
    { value: '2040', viewValue: '2040' }
  ];

  constructor(
    private toastr: ToastsManager,
    public _modalDialog: MatDialog,
    private _correlativoService: CorrelativoService,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
    });
  }

  ngOnInit() {
    // this.paramsBusqueda.anio = this.anios[0].viewValue;


  }

  seleccionaranio(idAnio) {
    console.log(idAnio);
    this.paramsBusqueda.anio = +idAnio;
  }

  private getCorrelativos() {

    if (this.paramsBusqueda.anio == null || this.paramsBusqueda.anio == undefined) {
      this.toastr.warning("Ingrese año");
      return;
    }

    this.paramsBusqueda.idAlmacen = this.idAlmacen;
    console.log(this.paramsBusqueda);
    this._correlativoService.getCorrelativo(this.paramsBusqueda)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.correlativo = data.secuenciaComprobanteList;
          this.dataSource = new MatTableDataSource(this.correlativo);
          console.log(this.correlativo);
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

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private modalInsertarCorrelativo() {
    const dialogRef = this._modalDialog.open(ModalInsertarEditarCorrelativoComponent, {
      autoFocus: false,
      width: '30%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 1;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCorrelativos();
      }
    });
  }

  private modalEditarCorrelativo(correlativosList: any) {
    const dialogRef = this._modalDialog.open(ModalInsertarEditarCorrelativoComponent, {
      autoFocus: false,
      width: '30%',
      disableClose: true
    });
    dialogRef.componentInstance.flag = 2;
    dialogRef.componentInstance.correlativoCo = correlativosList;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCorrelativos();
      }
    });
  }

}
