import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { CotizacionService } from './../../services/cotizacion.service';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-ver-cotizacion',
  templateUrl: './ver-cotizacion.component.html',
  styleUrls: ['./ver-cotizacion.component.scss']
})
export class VerCotizacionComponent implements OnInit {
  @Input() jsonPadre;
  displayedColumnsCotizacionesDetalle = ['codigo', 'nombre', 'cantidad', 'precio'];
  dataSourceCotizacionesDetalle = new MatTableDataSource();

  private cotizacionDetalle = [];

  constructor(private _modalDialog: MatDialog,
    private toastr: ToastsManager,
    private _dialogRef: MatDialogRef<VerCotizacionComponent>,
    private _cotizacionService: CotizacionService) { }

  ngOnInit() {
    this.obtenerCotizacionDetalle();
  }

  obtenerCotizacionDetalle() {
    // this._cotizacionService.getCotizacionesDetalle(this.jsonPadre)
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       this.cotizacionDetalle = data.cotizacionProveedorDetalleList;
    //       this.dataSourceCotizacionesDetalle = new MatTableDataSource(this.cotizacionDetalle);
    //       // console.log(data);
    //     } else {
    //       this.toastr.error(data.mensaje, 'Error');
    //     }
    //     return true;
    //   },
    //     error => {
    //       this.toastr.error(error);
    //       return Observable.throw(error);
    //     }),
    //   err => this.toastr.error(err),
    //   () => this.toastr.success('Request Complete');
  }
  dismiss() {
    this._dialogRef.close();
  }

  confirmacionCorrecta() {
    this._dialogRef.close(1);
  }

  /*----------------------------------
  ----------- Validaciones -----------
  -----------------------------------*/

  private cleanForm(_controlVar: any) {
    _controlVar.resetForm();
  }

  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
