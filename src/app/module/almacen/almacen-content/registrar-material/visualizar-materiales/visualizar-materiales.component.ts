import { AlmacenService } from './../../../services/almacen.service';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-visualizar-materiales',
  templateUrl: './visualizar-materiales.component.html',
  styleUrls: ['./visualizar-materiales.component.scss']
})
export class VisualizarMaterialesComponent implements OnInit {

  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  private almacenOrdenCompraMateriales: any = [];

  @Input() row;
  private cantidadFisica: String;
  private showInput: any = [];
  private cont: any = 0;
  dataSource = new MatTableDataSource();
  constructor(
    private dialogRef: MatDialogRef<VisualizarMaterialesComponent>,
    private toastr: ToastsManager,
    private _almacenService: AlmacenService
  ) { }
  displayedColumns = ['codigo', 'producto', 'marca', 'cantidad', 'cantidadFaltante', 'cantidadFisica', 'editar', 'restaurar'];

  ngOnInit() {
    this.listarMaterialesxOrdenCompra();
    this.asignarCantidadFisica(1);
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
  }

  private pressEnter(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra) {
    if (cantidadFisica == "") {
      cantidadFisica = null;
      return;
    } else {
      if (this.almacenOrdenCompraMateriales[i].cantidadFaltante < cantidadFisica || cantidadFisica < 0) {
        this.cont = 1;
        this.toastr.warning("Ingrese una cantidad válida");
        return;
      } else {
        this.cont = 0;

        this.almacenOrdenCompraMateriales[i].cantidadFaltante = this.almacenOrdenCompraMateriales[i].cantidadFaltante - (+(cantidadFisica));
        // if (this.almacenOrdenCompraMateriales[i].cantidadFaltante == 0) {
        //   cantidadFisica = this.almacenOrdenCompraMateriales[i].cantidad;
        // }
        this.almacenOrdenCompraMateriales[i].cantidadFisica = +cantidadFisica;
      }
    }
    this.upCantidadFisica(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra);
  }

  private asignarCantidadFisica(indice1) {
    if (this.showInput[indice1] == 1) {
      this.cantidadFisica = "";
      this.showInput[indice1] = 2;
      this.cont = 1;
    }
    else {
      this.showInput[indice1] = 1;
      this.cont = 0;
    }
  }

  private upCantidadFisica(idAlmacenOrdenCompraMaterial, cantidadFisica, i, idMaterial, idAlmacenOrdenCompra) {

    let par = { idAlmacenOrdenCompraMaterial: null, idAlmacenOrdenCompra: null, idMaterial: null, cantidadFisica: null };

    par.idAlmacenOrdenCompraMaterial = idAlmacenOrdenCompraMaterial;
    par.idAlmacenOrdenCompra = idAlmacenOrdenCompra;
    par.idMaterial = idMaterial;
    par.cantidadFisica = +(cantidadFisica);
    console.log(par);
    this._almacenService.actualizarCantidadFisica(par)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);
        }
        this.listarMaterialesxOrdenCompra();
        return true;
      },
        error => {
          this.toastr.error('Error al Actualizar', 'Error');
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');

  }

  private actualizarEstado() {
    let paramAct = { idAlmacenOrdenCompra: null };
    paramAct.idAlmacenOrdenCompra = this.row.idAlmacenOrdenCompra;
    this._almacenService.actualizarEstado(paramAct)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Materiales ingresados correctamente al Almacén");
          this.close(1);
        } else if (data.estado == 0) {
          this.toastr.warning(data.mensaje);
          this.close(1);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private close(add) {
    this.dialogRef.close(add);
  }

  private param = { idAlmacenOrdenCompra: null };

  private listarMaterialesxOrdenCompra() {
    this.param.idAlmacenOrdenCompra = this.row.idAlmacenOrdenCompra;
    this._almacenService.getAlmacenOrdenCompraMaterial(this.param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.almacenOrdenCompraMateriales = data.almacenOrdenCompraMaterialList;
          for (let x of this.almacenOrdenCompraMateriales) {

            x.cantidadFaltante = x.cantidad;
            if (x.cantidadFisica > 0) {
              x.cantidadFaltante = x.cantidad - x.cantidadFisica;
            }
            console.log("lista materiales ", x);
          }
          this.dataSource = new MatTableDataSource(this.almacenOrdenCompraMateriales);

          this.dataSource.sort = this.matSort;

          for (var i = 0; i < this.almacenOrdenCompraMateriales.length; i++) {
            this.showInput[i] = 1;
          }

        } else if (this.almacenOrdenCompraMateriales == []) {
          this.toastr.error("No se encontraron datos");
        } else {
          this.toastr.error(data.mensaje);
          this.almacenOrdenCompraMateriales = [];
          this.close(1);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
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



  restaurarCantidad(e, i) {
    let par = { idAlmacenOrdenCompraMaterial: null, idAlmacenOrdenCompra: null, idMaterial: null, cantidadFisica: null };
    par.cantidadFisica = -e.cantidadFisica;
    this.upCantidadFisica(e.idAlmacenOrdenCompraMaterial, par.cantidadFisica, i, e.idMaterial, e.idAlmacenOrdenCompra);
  }
}
