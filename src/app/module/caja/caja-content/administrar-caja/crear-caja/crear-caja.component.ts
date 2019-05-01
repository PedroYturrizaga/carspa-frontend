import { log } from 'util';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { AdministrarCajaService } from '../../../services/administrar-caja.service';
import { MatDialog, MatDialogRef, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatSelectionList, MatSelect } from '@angular/material';
import { AreaService } from '../../../../maestras/services/area.service';
import { DataSource } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material';
import { ViewChild } from '@angular/core';
import { getIpress } from '../../../../../shared/auth/storage/cabecera.storage';
import { element, $ } from 'protractor';
import { isInvalid, setInputPattern, setValidatorPattern, setQuantifier } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
@Component({
  selector: 'app-crear-caja',
  templateUrl: './crear-caja.component.html',
  styleUrls: ['./crear-caja.component.scss']
})
export class CrearCajaComponent implements OnInit {
  @Input() element;
  @Input() flag;
  private requestArea = { descripcionArea: null, numPagina: 1, numRegisMostrar: 1000 };

  private requestParam = { idCaja: null, descripcionCaja: null, abreviatura: null, idArea: null, tipoOrdenSeleccionado: null, estado:null};

  private LsAreaFisica = [];

  private LsTipoOrdenPago = [];

  constructor(public _AdministrarCajaService: AdministrarCajaService,
    public _area: AreaService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearCajaComponent>) {

  }

  ngOnInit() {

    this.obtenerArea();
    // this.obtenerAreaCobro();

    if (this.element == undefined || this.element == null) {
      this.obtenerTipoOrdenPago();
    } else {
      this.setDatos();
    }

  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

  private obtenerArea() {

    this._area.getAreas(this.requestArea)
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsAreaFisica = data.areaList;
          // console.log(this.LsAreaFisica)
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        });
  }

  private obtenerTipoOrdenPago() {

    this._AdministrarCajaService.getTipoOrdenPago()
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsTipoOrdenPago = data.tipoOrdenList;
          this.LsTipoOrdenPago.forEach(element => {
            element["seleccionado"] = false;
          });
          console.log(this.LsTipoOrdenPago);
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else if (data.estado = -1) {
          console.error(data.mensaje);
        }
      },
        error => {
          console.error(error);
        }, () => {
          // if (this.element != undefined) {
          //   this.obtenerAreaCobroTipoOrdenPago(this.element.idCaja)
          // }
        });
  }

  private setDatos() {
    console.log(this.element)
    this.requestParam.idCaja = this.element.idCaja;
    this.requestParam.descripcionCaja = this.element.descripcionCaja
    this.requestParam.abreviatura = this.element.abreviatura
    this.requestParam.idArea = this.element.idAreaFisica

    this._AdministrarCajaService.getTipoOrdenCaja(this.requestParam.idCaja)
      .subscribe(data => {
        if (data.estado == 1) {
          this.LsTipoOrdenPago = data.tipoOrdenList;
          console.log(this.LsTipoOrdenPago);
        }
      },
        error => {
          console.error(error);
        }, () => {
        });
  }

  close(add) {
    this.dialogRef.close(add);

  }

  private insertar() {
    let newLs = [];

    for (let item of this.LsTipoOrdenPago) {
      if (item.seleccionado == true) {
        let ls = { tipoOrden: item.tipoOrden }
        newLs.push(ls);
      }
    }
    this.requestParam.tipoOrdenSeleccionado = JSON.stringify(newLs);

    this._AdministrarCajaService.postCaja(this.requestParam)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);

          console.log(data.mensaje);
          this.close(1);
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

  private actualizar(){
    let newLs = [];

    for (let item of this.LsTipoOrdenPago) {
      if (item.seleccionado == true) {
        let ls = { tipoOrden: item.tipoOrden }
        newLs.push(ls);
      }
    }
    this.requestParam.tipoOrdenSeleccionado = JSON.stringify(newLs);

    this._AdministrarCajaService.updateCaja(this.requestParam)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success(data.mensaje);

          console.log(data.mensaje);
          this.close(1);
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

  

  // dataSource = new MatTableDataSource();
  // displayedColumns = ['Area', 'Tipo Orden de Pago', 'eliminar'];
  // @ViewChild('myCheckbox') private myCheckbox: MatCheckbox;

  // private LsAreaCobro = [];

  // private LsTabla: any = [];
  // private lsTip = [];
  // private listAreaCobroTipoOrden = [{ areaTipoOrdenList: [] }];

  // private Lsnew = {
  //   abreviaturaArea: null,
  //   descripcionArea: null,
  //   idArea: null,
  //   nuTotalReg: null
  // };

  // private LsPrueba = [];
  // private StringIdTipoOrdenPago;
  // private LsMarcado = [];

  // private areaCobroLsCadena;
  // private tipoOrdenLsCadena;
  // private funcionActualizar = 0;



  // private insertarCaja() {

  //   // console.log(this.LsTabla);
  //   let i = 0;
  //   for (let q of this.LsTabla) {
  //     let j = 0;
  //     for (let r of q['tipoOrden']) {
  //       r.check = false;
  //       for (let p of this.LsPrueba) {
  //         if (i == p['x'] && j == p['y']) {
  //           console.log(i + " " + p['x'] + " " + j + " " + p['y']);
  //           let marcado = { idAreaCobro: q.idAreaCobro, tipoOrden: r.tipoOrden }
  //           this.LsMarcado.push(marcado);

  //           r.check = true;
  //         }
  //       }
  //       j++;
  //     }
  //     i++;
  //   }
  //   let strjson = JSON.stringify(this.LsMarcado);
  //   console.log(strjson);

  //   console.log("Lsnew: ", this.Lsnew)
  //   console.log("limpiado y seteado");
  //   console.log(this.LsMarcado)
  //   console.log(this.LsPrueba)

  //   this.requestParam.tipoOrdenSeleccionado = strjson;
  //   console.log("requestParam: ", this.requestParam);
  //   this._AdministrarCajaService.postCaja(this.requestParam)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.toastr.success(data.mensaje);

  //         console.log(data.mensaje);
  //         this.close(1);
  //       } else {
  //         this.toastr.error(data.mensaje);
  //       }
  //     },
  //     error => {
  //       this.toastr.error(error);
  //       return Observable.throw(error);
  //     }),
  //     err => this.toastr.error(err),
  //     () => this.toastr.success('Request Complete');

  // }



  // private obtenerAreaCobro() {

  //   this._area.getAreas(this.requestAreaCobro)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.LsAreaCobro = data.areaList;
  //         // console.log("lista lsareacobro");
  //         // console.log(this.LsAreaCobro);
  //       }
  //       else if (data.estado == 0) {
  //         console.log(data.mensaje);
  //       }
  //       else if (data.estado = -1) {
  //         console.error(data.mensaje);
  //       }
  //     },
  //     error => {
  //       console.error(error);
  //     });
  // }



  // private obtenerAreaCobroTipoOrdenPago(idCaja) {
  //   console.log(idCaja);
  //   this._AdministrarCajaService.getAreaTipoCobre(idCaja)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         console.log("VERIFICAR", data);

  //         this.listAreaCobroTipoOrden = data.listAreaCobroTipoOrden;

  //         this.LsTipoOrdenPago.forEach(element => {
  //           element["check"] = false;
  //         });
  //         //this.LsTabla = [];

  //         data.listAreaCobroTipoOrden.forEach(element => {
  //           // let areaCobro: any = {};
  //           if (element.idArea == this.element.idareacobro) {
  //             let areaCobro = {
  //               idAreaCobro: element.idArea,
  //               descripcionArea: element.descripcionArea,
  //               idAreaCobroList: element.idAreaCobroList,
  //               tipoOrden: this.LsTipoOrdenPago
  //             }
  //             this.LsTabla.push(areaCobro);
  //             // console.log(areaCobro);
  //             console.log(this.LsTabla);
  //           }
  //         });

  //       } else {
  //         this.toastr.error("Error", data.mensaje);
  //       }

  //     },
  //     error => {
  //       console.error(error);
  //     }, () => {
  //       this.updateChecked();
  //       console.log("Tabla final: ", this.LsTabla);
  //     });
  // }
  //this.listAreaCobroTipoOrden

  // updateChecked() {
  //   debugger
  //   for (let z of this.listAreaCobroTipoOrden) {
  //     for (let u of z['areaTipoOrdenList']) {
  //       for (let x of this.LsTabla) {
  //         if (z['idArea'] == x['idAreaCobro']) {
  //           for (let y of x['tipoOrden']) {
  //             if (u['idTipoOrden'] == y['tipoOrden']) {
  //               y['check'] = true;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // for (let x of this.LsTabla) {
  //   //   for (let y of x['tipoOrden']) {
  //   //     for (let z of this.listAreaCobroTipoOrden) {
  //   //       if (z['idArea'] == x['idAreaCobro']) {
  //   //         for (let u of z['areaTipoOrdenList']) {
  //   //           if (y['tipoOrden'] == u['idTipoOrden']) {
  //   //             y['check'] = true;
  //   //           }
  //   //         }
  //   //       }
  //   //     }
  //   //   }
  //   // }
  //   this.dataSource = new MatTableDataSource(this.LsTabla);
  // }

  // agregar() {
  //   this.LsTipoOrdenPago.forEach(element => {
  //     element["check"] = false;
  //   });

  //   for (let s of this.LsAreaCobro) {
  //     if (s['idArea'] == this.Lsnew) {
  //       let areaCobro = {
  //         idAreaCobro: this.Lsnew,
  //         descripcionArea: s['descripcionArea'],
  //         tipoOrden: this.LsTipoOrdenPago
  //       }
  //       this.LsTabla.push(areaCobro);
  //     }
  //   }
  //   this.updateChecked();

  //   // this.dataSource = new MatTableDataSource(this.LsTabla);
  //   console.log(this.LsTabla);
  // }

  // metodsso(evt, x, i) {
  //   console.log(evt);
  //   console.log(x + "  --  " + i);
  //   if (evt.checked) {
  //     let temp = { x: x, y: i }
  //     this.LsPrueba.push(temp);
  //   }

  //   console.log(this.LsTabla);
  //   console.log(x, i);
  //   this.dataSource = new MatTableDataSource(this.LsTabla);
  // }



  // public actualizarCaja() {
  //   let i = 0;
  //   for (let q of this.LsTabla) {
  //     let j = 0;
  //     for (let r of q['tipoOrden']) {
  //       r.check = false;
  //       for (let p of this.LsPrueba) {
  //         if (i == p['x'] && j == p['y']) {
  //           console.log(i + " " + p['x'] + " " + j + " " + p['y']);
  //           let marcado = { idAreaCobro: q.idAreaCobro, tipoOrden: r.tipoOrden }
  //           this.LsMarcado.push(marcado);

  //           r.check = true;
  //         }
  //       }
  //       j++;
  //     }
  //     i++;
  //   }
  //   let strjson = JSON.stringify(this.LsMarcado);
  //   this.requestParam.tipoOrdenSeleccionado = strjson;
  //   console.log(this.requestParam);
  //   // this._AdministrarCajaService.updateCaja(this.requestParam).subscribe(data => {
  //   //   if (data.estado == 1) {
  //   //     this.toastr.success(data.mensaje);
  //   //   } else {
  //   //     this.toastr.error(data.mensaje);
  //   //   }
  //   // },
  //   //   error => {
  //   //     console.log(error);
  //   //   });
  // }
}


