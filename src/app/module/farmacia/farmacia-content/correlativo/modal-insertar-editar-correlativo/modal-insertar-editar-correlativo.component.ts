import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { CorrelativoService } from '../../../services/correlativo.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal-insertar-editar-correlativo',
  templateUrl: './modal-insertar-editar-correlativo.component.html',
  styleUrls: ['./modal-insertar-editar-correlativo.component.scss']
})
export class ModalInsertarEditarCorrelativoComponent implements OnInit {

  @Input() flag;
  @Input() correlativoCo;

  private idAlmacen;
  private correlativo: any[];
  private paramsBusqueda = { idAlmacen: null, idTipoDocumentoFarmacia: null, anio: null };
  private params = { idAlmacen: null, idTipoDocumentoFarmacia: null, anio: null, numeroSecuencia: null };
  private request = {
    anio: null,
    idAlmacen: null,
    idTipoDocumentoFarmacia: null,
    numeroSecuencia: null
  };
  private paramsBusqueda1 = { idAlmacen: null, anio: null };
  private anios = [
    { anio: 2018, viewValue: '2018' },
    { anio: 2019, viewValue: '2019' },
    { anio: 2020, viewValue: '2020' },
    { anio: 2021, viewValue: '2021' },
    { anio: 2022, viewValue: '2022' },
    { anio: 2023, viewValue: '2023' },
    { anio: 2024, viewValue: '2024' },
    { anio: 2025, viewValue: '2025' },
    { anio: 2026, viewValue: '2026' },
    { anio: 2027, viewValue: '2027' },
    { anio: 2028, viewValue: '2028' },
    { anio: 2029, viewValue: '2029' },
    { anio: 2030, viewValue: '2030' },
    { anio: 2031, viewValue: '2031' },
    { anio: 2032, viewValue: '2032' },
    { anio: 2033, viewValue: '2033' },
    { anio: 2034, viewValue: '2034' },
    { anio: 2035, viewValue: '2035' },
    { anio: 2036, viewValue: '2036' },
    { anio: 2037, viewValue: '2037' },
    { anio: 2038, viewValue: '2038' },
    { anio: 2039, viewValue: '2039' },
    { anio: 2040, viewValue: '2040' }
  ];


  constructor(
    private _correlativoService: CorrelativoService,
    private toastr: ToastsManager,
    private dialogRef: MatDialogRef<ModalInsertarEditarCorrelativoComponent>,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
    });
  }

  ngOnInit() {
    this.request.idAlmacen = this.idAlmacen;
    console.log(this.flag);
    console.log(this.correlativoCo);
    if (this.flag == 2) {
      this.getTipoDocumentoFarmacia();
      this.request.anio = this.correlativoCo.anio;
      this.request.idTipoDocumentoFarmacia = this.correlativoCo.idTipoDocumentoFarmacia;
      console.log(this.request);
    } else if (this.flag == 1) {
      this.getTipoDocumentoFarmacia();
    }
  }

  private insertarNuevoCorrelativo() {
    console.log(this.request);
    this._correlativoService.insertCorrelativo(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

  private actualizarNuevoCorrelativo() {
    console.log(this.request)
    this._correlativoService.updateCorrelativo(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
          this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        error => {
          this.toastr.error(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private getTipoDocumentoFarmacia() {
    this._correlativoService.getComboTipoDocumento()
      .subscribe(data => {
        if (data.estado == 1) {
          this.correlativo = data.tipoDocumentoFarmaciaList;
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

  seleccionaranio(idAnio) {
    console.log(idAnio);
    this.paramsBusqueda1.anio = +idAnio;
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

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

}
