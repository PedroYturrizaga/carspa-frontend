import { element } from 'protractor';
import { ValoracionFuncionalComponent } from './../../../../../consulta-ambulatoria/consulta-ambulatoria-content/atencion-medica-ambulatoria/atencion-medica-ambulatoria/atencion-medica/valoracion-geriatrica/valoracion-funcional/valoracion-funcional.component';
import { ListadoProgramacionComponent } from './../../../../../admision/admision-content/cita/cita/asignar-cita/listado-programacion/listado-programacion.component';
import { GuardarEditarMedicamentoComponent } from './guardar-editar-medicamento/guardar-editar-medicamento.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import { MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from
  '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MedicamentoMaterialService } from './../../services/medicamento-material.service';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-registrar-medicamento-material',
  templateUrl: './registrar-medicamento-material.component.html',
  styleUrls: ['./registrar-medicamento-material.component.scss']
})
export class RegistrarMedicamentoMaterialComponent implements OnInit {
  @Input() grupoMedicamento;
  @Input() combosLista;
  @Input() accion;
  @Input() medicamento;
  @Input() toolTipClearOptions;

  private paramsAccion: any;
  private confirmacion: any;

  // private keysParams: any[];
  private grupoRequest: any[];
  private altoCosto: any[];
  private tipoProductoFarmaceutico: any[];
  private paramUnidad: any[] = [{ "idUnidadPadre": null, "idUnidadHijo": null, "cantidadUnidadHijo": null }];
  private paramUni = { idUnidadPadre: { idUnidad: null, nombreUnidad: null, numeroOrden: null }, idUnidadHijo: { idUnidad: null, nombreUnidad: null, numeroOrden: null }, cantidadUnidadHijo: null };
  private unidad: any = [{ idUnidad: null, nombreUnidad: null, numeroOrden: null }];
  private lsUnidadPadre = [{ idUnidad: null, nombreUnidad: null, numeroOrden: null }];
  private idUnidadPadre: any = null; // { idUnidad: null, nombreUnidad: null, numeroOrden: null, disabled: false };
  private idUnidadHija: any = { idUnidad: null, nombreUnidad: null, numeroOrden: null, disabled: false };
  // 
  private onlyDad: boolean = true;
  private lsUnidades = [];

  private arreglo: string;
  displayedColumns = ['padre', 'cantidad', 'eliminar'];
  dataSource = new MatTableDataSource();

  constructor(
    private _medicamentoMaterialService: MedicamentoMaterialService,
    private _dialogRef: MatDialogRef<RegistrarMedicamentoMaterialComponent>,
    private _toastr: ToastsManager,
    private dialog: MatDialog,
    private toastr: ToastsManager
  ) {
    this.grupoRequest = ["medicamento", "dispositivoMedicoProductosSanitario"];

    this.altoCosto = [
      { id: 1, valor: "Sí" },
      { id: 0, valor: "No" }
    ];
  }


  private activo: boolean = false;

  ngOnInit() {
    console.log(this.medicamento);
    this.tipoProductoFarmaceutico = [
      { id: 4, valor: "Esencial" },
      { id: 5, valor: "Vital" }
    ];
    let gMedicamento = (this.grupoMedicamento.id === 1) ?
      {
        formaFarmaceutica:
          { valor: null, descripcion: "Forma Farmacéutica" },
        concentracion:
          { valor: null, descripcion: "Concentración" },
        nombreComercial:
          { valor: null, descripcion: "Nombre del Medicamento (Comercial)" },
        atc:
          { valor: null, descripcion: "ATC (Familia de Medicina)" },
        productoControlado:
          { valor: null, descripcion: "Producto Controlado" },
        porcentajeUtilidad:
          { valor: null, descripcion: "Porcentaje de Utilidad" }
      } :
      {
        viaAdministracion:
          { valor: null, descripcion: "Vía de Administración" }
      };
    this.paramsAccion =
      {
        codigo:
          { valor: null, descripcion: "Código" },
        ['dci' +
          ((this.grupoMedicamento.id === 1) ?
            'ProductoFarmaceutico' : 'DispMedicoProdSanitario')]:
        {
          valor: null,
          descripcion: "DCI " +
            ((this.grupoMedicamento.id === 1) ?
              'Producto Farmacéutico' : 'Dispositivo Médico y/o Producto Sanitario')
        },
        ['presentacion' +
          ((this.grupoMedicamento.id === 1) ?
            'Envase' : '')]:
        {
          valor: null,
          descripcion: "Presentación" +
            ((this.grupoMedicamento.id === 1) ?
              ' de Envase' : '')
        },
        ['dci' +
          ((this.grupoMedicamento.id === 1) ?
            'ProductoFarmaceutico' : 'DispMedicoProdSanitario')]:
        {
          valor: null,
          descripcion: "DCI " +
            ((this.grupoMedicamento.id === 1) ?
              'Producto Farmacéutico' : 'Dispositivo Médico y/o Producto Sanitario')
        },
        ['tipo' +
          ((this.grupoMedicamento.id === 1) ?
            'ProductoFarmaceutico' : 'Dispositivo')]:
        {
          valor: null,
          descripcion: "Tipo de " +
            ((this.grupoMedicamento.id === 1) ?
              'Producto Farmacéutico' : 'Dispositivo Médico')
        },
        laboratorio:
          { valor: null, descripcion: "Laboratorio" },
        unidadCompra:
          { valor: null, descripcion: "Unidad de Compra" },
        paisOrigen:
          { valor: null, descripcion: "País de Origen" },
        unidadVenta:
          { valor: null, descripcion: "Unidad de Venta" },
        marca:
          { valor: null, descripcion: "Marca" },
        altoCosto:
          { valor: null, descripcion: "Alto Costo" },
        ean13:
          { valor: null, descripcion: "EAN-13 (Código de Barras)" },
        descuento:
          { valor: null, descripcion: "Descuento" },
        ...gMedicamento
      };
    this.getUnidades();

    if (this.accion === 2 && this.medicamento !== null) {
      this.unpack();
      // this.paramsAccion.unidadVenta.valor = { valor: this.medicamento.nombreUnidadVenta, id: this.medicamento.idUnidadVenta };
      console.log(this.paramsAccion.unidadVenta.valor);
      this.medicamento.lsUnidades = this.medicamento.jsonUnidad ? JSON.parse(this.medicamento.jsonUnidad) : [];
      this.lsUnidades = this.medicamento.lsUnidades
      this.onlyDad = false;
      //  console.log(array);
      if (this.medicamento != null) {
        this.dataSource = new MatTableDataSource(this.medicamento.lsUnidades);
        this.activo = true;
      }
      this.idUnidadPadre = this.medicamento.idUnidadPadre;
      if (this.lsUnidades.length == 0) this.lsUnidades.sort((a, b) => a.numeroOrden - b.numeroOrden);

    }
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.medicamento.jsonUnidad);
    this.activo = true;
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
  _isValidUnid(): boolean {
    return true;
  }
  private isInvalid(_controlVar: any): boolean {
    // console.clear();
    // console.log("ele: ", _controlVar);
    // console.log("isInvalid: ", isInvalid(_controlVar));
    // console.log("isInvalid: ", this.idUnidadPadre);
    // let _return = isInvalid(_controlVar) && this.idUnidadPadre == null ? false : true;
    // console.log("_return: ", _return);

    // console.clear();
    // console.log("idUnidadPadre: ", this.idUnidadPadre)
    // console.log("isInvalid: ", isInvalid(_controlVar))
    // console.log("retturn: ", _return)
    return isInvalid(_controlVar); // && this.idUnidadPadre.idUnidad != null ? true : false
  }
  // _isInivalid(_controlVar: any) {
  //   let _isInv = isInvalid(_controlVar);

  // }

  private confirmDialog(_controlVar: any): void {
    if (isInvalid(_controlVar)) {
      return;
    }

    if (this.idUnidadPadre == null) {
      this.toastr.warning("No ha ingresado equivalencia.");
      return;
    }

    let self = this;
    this.confirmacion = ('¿Está seguro que desea guardar el ' +
      ((self.accion === 1) ? 'Nuevo ' : '') +
      self.grupoMedicamento.valor +
      (' \"' + self.paramsAccion[((self.grupoMedicamento.id === 1) ?
        'dciProductoFarmaceutico' : 'dciDispMedicoProdSanitario')].valor +
        '\"') + '?');

    const dialogRef = this.dialog.open(GuardarEditarMedicamentoComponent, {
      autoFocus: false,
      maxWidth: '35%',
      maxHeight: '40%',
      disableClose: true
    });
    console.log(this.lsUnidades);
    dialogRef.componentInstance.confirmacion = this.confirmacion;
    dialogRef.componentInstance.paramsAccion = this.paramsAccion;
    dialogRef.componentInstance.medicamento = this.medicamento;
    dialogRef.componentInstance.accion = this.accion;
    dialogRef.componentInstance.idUnidadPadre = this.idUnidadPadre;
    dialogRef.componentInstance.lsUnidades = (!this.onlyDad) ? this.lsUnidades : [];
    dialogRef.componentInstance.grupoRequest = this.grupoRequest;
    dialogRef.componentInstance.grupoMedicamento = this.grupoMedicamento;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.close();
      }
    });
  }

  private saveMedicamento(): void {
    this.pack();
    this.paramsAccion.porcentajeUtilidad.valor = 0;
    this.paramsAccion.unidadCompra.valor = 6;
    this.paramsAccion.descuento.valor = 0;

    // this.medicamento.idUnidadPadre = this.idUnidadPadre;

    // this.medicamento.push(this.lsUnidades);

    this._medicamentoMaterialService
      .insertUpdateMedicamento({ [this.grupoRequest[this.grupoMedicamento.id - 1]]: this.medicamento }, this.grupoMedicamento.id, this.accion)
      .subscribe(data => {
        if (data.estado === 1) {
          this._toastr.success(data.mensaje);
          // this.close();
        } else {
          this._toastr.error(data.mensaje);
        }
      },
        error => {
          this._toastr.error(error);
          return Observable.throw(error);
        }),
      err => this._toastr.error(err),
      () => console.log('Request Complete');
  }

  private pack(): void {
    let keysParams = Object.keys(this.paramsAccion);
    if (this.accion === 2 && this.medicamento !== null) {
      Object.keys(this.medicamento)
        .filter(k => !(keysParams.includes(k) || k.includes('id')))
        .forEach(k => delete this.medicamento[k]);
    } else {
      this.medicamento = {};
    }
    keysParams.forEach(key => this.medicamento[key] = this.paramsAccion[key].valor);
  }

  private unpack(): void {
    debugger
    let combos = Object.keys(this.combosLista);
    Object.keys(this.paramsAccion).forEach(key => {
      if (combos.includes(key) && this.medicamento[key].id) {
        this.paramsAccion[key].valor =
          (this.combosLista[key].list.find(obj =>
            obj['id'] === this.medicamento[key].id));
      } else {
        this.paramsAccion[key].valor = this.medicamento[key];
      }
    });
  }

  private getUnidades() {
    let param = { idUnidad: null, tipo: null };

    if (this.grupoMedicamento.id == 1) {
      param.tipo = 1;
    } else { param.tipo = 2; }

    this._medicamentoMaterialService.getUnidades(param).subscribe(data => {
      if (data.estado == 1) {
        this.unidad = data.unidadList;
        this.lsUnidadPadre = data.unidadList;
        for (let x of this.unidad) {
          x['disabled'] = false;
        }
      }
      else {
        this.toastr.error(data.mensaje, "No se encontraron unidades");
      }
      return true;
    },
      err => { console.error(err) },
      () => {
        if (this.accion === 2) {
          // let _uh = this.lsUnidadPadre.find(lsUP => lsUP.idUnidad === this.lsUnidades[this.lsUnidades.length - 1]['numeroOrdenHijo']);
          // this.lsUnidades.map(cesar => this.unidad.splice(this.unidad.findIndex(item => item.idUnidad == cesar.idUnidadHijo), 1));
          //si No tiene unidad Hijas el check box esta seleccionado y el idPadre esta en paramUni
          if (this.lsUnidades.length == 0) {
            let _unidadPadre: any = this.lsUnidadPadre.find(item => item.idUnidad == this.idUnidadPadre);
            this.paramUni.idUnidadPadre = _unidadPadre;
            this.onlyDad = true;
          } else if (this.lsUnidades.length > 0) {
            this.unidad = this.lsUnidadPadre.filter(item => item.numeroOrden > this.lsUnidades[this.lsUnidades.length - 1]['numeroOrdenHijo']);
            if (this.lsUnidades.length == 0) this.lsUnidades.sort((a, b) => a.numeroOrden - b.numeroOrden);
            this.paramUni.idUnidadPadre = this.lsUnidadPadre.find(lsU => lsU.idUnidad === this.lsUnidades[this.lsUnidades.length - 1]['idUnidadHijo']);
          }
        }
      });
  }

  cambio(item?) {
    let _unidadPadre: any = this.lsUnidadPadre.find(item => item.idUnidad == this.idUnidadPadre);
    this.paramUni.idUnidadPadre = _unidadPadre;
    this.unidad = this.lsUnidadPadre.filter(item => this.paramUni.idUnidadPadre.numeroOrden < item.numeroOrden);
  }

  agregarEquivalencia() {

    this.paramUni.idUnidadHijo = this.lsUnidadPadre.find(lsu => lsu.idUnidad == this.idUnidadHija);

    let param = {
      "idUnidadPadre": this.paramUni.idUnidadPadre.idUnidad,
      "nombreUnidad": this.paramUni.idUnidadPadre.nombreUnidad,
      "numeroOrden": this.paramUni.idUnidadPadre.numeroOrden,
      "idUnidadHijo": this.paramUni.idUnidadHijo.idUnidad,
      "nombreUnidadHijo": this.paramUni.idUnidadHijo.nombreUnidad,
      "cantidadUnidadHijo": this.paramUni.cantidadUnidadHijo,
      "numeroOrdenHijo": this.paramUni.idUnidadHijo.numeroOrden,
    };

    if (this.accion == 2) {

      this.lsUnidades.map(lsu => {
        if (lsu.idUnidadPadre == param.idUnidadPadre) {
          lsu.cantidadUnidadHijo = this.paramUni.cantidadUnidadHijo;
        }
      });
      //elimina el registro de la lista de Unidades Hijas
      // this.unidad.splice(this.unidad.findIndex(carlos => carlos.idUnidad == this.idUnidadHija), 1);

      // this.lsUnidades.map(item => {
      //   this.unidad = this.unidad.splice(this.unidad.findIndex(item2 => item2.idUnidad == item.idUnidadHijo))
      // });
      this.dis = false;
      //busca alguna coincidencia sino devuelve undefined
      let _bUnidad = this.lsUnidades.find(ls => ls.idUnidadPadre == param.idUnidadPadre);
      //agrega si NO existe en la busqueda
      if (!_bUnidad) {
        this.lsUnidades.push(param);
      }
      this.unidad = this.unidad.filter(filt => filt.numeroOrden > param.numeroOrdenHijo);
    } else
      if (this.accion == 1) {
        this.unidad = this.unidad.filter(filt => filt.numeroOrden > param.numeroOrdenHijo);
        this.lsUnidades.push(param);
      }

    this.lsUnidades.sort((a, b) => a.numeroOrden - b.numeroOrden);
    // this._param.monto = null;
    this.dataSource = new MatTableDataSource(this.lsUnidades);

    this.paramUni.idUnidadPadre = this.idUnidadPadre;
    this.paramUni.cantidadUnidadHijo = null;
    this.paramUni.idUnidadPadre = this.paramUni.idUnidadHijo;
    this.paramUni.idUnidadHijo = { idUnidad: null, nombreUnidad: null, numeroOrden: null };
    this.idUnidadHija = null;
  }

  deleteUnidad(items: any) {
    let promise = new Promise((resolve, reject) => {

      //encuentra si se existe alguna padre es igual al id del hijo
      const found = this.lsUnidades.filter(x => x.idUnidadPadre === items.idUnidadHijo);

      if (found.length == 0) {
        //elimina el registro de la lista final y de la tabla


        for (const { item, index } of this.lsUnidades.map((item, index) => ({ item, index }))) {
          if (item == items) {
            this.paramUni.idUnidadPadre = { idUnidad: item.idUnidadPadre, nombreUnidad: item.nombreUnidad, numeroOrden: item.numeroOrden };
            this.lsUnidades.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.lsUnidades);
            this.toastr.success("Registro Eliminado correctamente", "Exitoso");
          }
        }
        let _Upadre = this.lsUnidadPadre.find(lsUP => lsUP.idUnidad === this.idUnidadPadre);
        this.unidad = this.lsUnidadPadre.filter(i => i.idUnidad != _Upadre.idUnidad && i.numeroOrden > _Upadre.numeroOrden);

        this.lsUnidades.map(lsU => this.unidad.splice(this.unidad.findIndex(carlos => carlos.idUnidad == lsU.idUnidadHijo), 1));

        this.unidad.sort((a, b) => a.numeroOrden - b.numeroOrden)
        if (this.lsUnidades.length > 0) {
          let _uh = this.lsUnidadPadre.find(lsUP => lsUP.idUnidad === this.lsUnidades[this.lsUnidades.length - 1]['idUnidadHijo']);

          this.unidad = this.unidad.filter(_u => _u.numeroOrden > _uh.numeroOrden);
        }
        // let _newUn = [];
        // for (let x of this.unidad) {

        // }


        // this.unidad.map((u, i) => {
        //   this.lsUnidades.map(lsU => {
        // if (this.lsUnidades.length > 0) {
        //   for (let u of this.unidad) {
        //     for (let lsU of this.lsUnidades) {
        //       if (u.numeroOrden > lsU.numeroOrdenHijo) {
        //         if (!_newUn.find(_u => _u.idUnidad == u.idUnidad))
        //           _newUn.push(u);
        //       }
        //     }//)
        //   }//);
        // }
        // console.log(_newUn);
        // this.unidad = _newUn;
        // u.numeroOrden < lsU.numeroOrdenHijo


      } else {
        this.toastr.warning("Registro No puede ser Eliminado", "Advertencia");
      }
      resolve();
    })
    return promise;
  }

  isValidateButton(): boolean {
    console.clear();

    const val = (this.paramUni.cantidadUnidadHijo == null && this.paramUni.idUnidadHijo.idUnidad == null) ? true : false;
    return val
  }

  private dis: boolean = false;
  updateUnidad(element) {

    this.unidad.push(this.lsUnidadPadre.find(item => item.idUnidad == element.idUnidadHijo));
    //agrregamos el idUniad Hijo que se actualizará y se coloca en @paramUni
    this.idUnidadHija = element.idUnidadHijo
    //agregas los datos para actualizar
    this.paramUni.idUnidadPadre.idUnidad = element.idUnidadPadre;
    this.paramUni.idUnidadPadre.nombreUnidad = element.nombreUnidad;
    this.paramUni.cantidadUnidadHijo = element.cantidadUnidadHijo;
    this.paramUni.idUnidadHijo.idUnidad = element.idUnidadHijo;
    this.paramUni.idUnidadHijo.idUnidad = element.idUnidadHijo;
    this.dis = true;
  }

  private close(): void {
    this._dialogRef.close(1);
  }

  private dismiss(): void {
    this._dialogRef.close(0);
  }
}