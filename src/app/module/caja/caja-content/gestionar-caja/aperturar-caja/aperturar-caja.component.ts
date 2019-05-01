import { GestionarCajaService } from './../../../services/gestionar-caja.service';
import { AperturCierreCajaComponent } from './../../apertur-cierre-caja/apertur-cierre-caja.component';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatTableDataSource, MatDialog, MatPaginator  } from '@angular/material';
import { AperturaCierreCajaService } from './../../../services/apertura-cierre-caja.service';
import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { getIdUsuario, getCodUsuario } from '../../../../../shared/auth/storage/cabecera.storage';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { DataService } from '../../../../../shared/services/data.service';
@Component({
  selector: 'app-aperturar-caja',
  templateUrl: './aperturar-caja.component.html',
  styleUrls: ['./aperturar-caja.component.scss']
})
export class AperturarCajaComponent implements OnInit {
  @Input() element;
  @ViewChild(MatPaginator) matPag: MatPaginator;
  dataSource = new MatTableDataSource();
  private pagination: any;
  private lsCabecera ={periodoTurno:null,nombreCaja:null,abreviatura:null,turno:null,horario:null,turnoCaja:null,idProgramacion:null,idCaja:null};
  private aperturaCajasList: any[] = [];
  private request = { fechaInicio:null,fechaFin:null,estado:null,idArea:null,idAperturaCaja: null,idUsuario:null,descripcionCaja:null };
  
  private requestApertura = {
     descripcionAperturaCaja: null, idCaja: null, idProgramacion: null, idUsuario: null, montoApertura: null, turnoCaja: null ,cajaChica: false
  }
    // private caja = { idCaja: null, descripcionCaja: null, abreviaturaAmbiente: null };

  // private programacionPersonal = { idProgramacion: null, idTurno: null, descripcionTurno: null, periodoTurno: null, horaInicio: null, horaFinal: null, mensaje: null };
  // private request = {
  //   apertura: { descripcionAperturaCaja: null, idCaja: null, idProgramacion: null, idUsuario: null, montoApertura: null, turnoCaja: null }}
  
  //Para paginacion
  private displayedSize: number[];
  private pageSize: number;
  constructor(  
    private _gestionarCajaService: GestionarCajaService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog,
    private _aperturaCierreCajaService: AperturaCierreCajaService,
    public dialogRef: MatDialogRef<AperturarCajaComponent>,
    public dialog: MatDialog
    // private _aperturaCajaService: AperturaCierreCajaService,
    // private toastr: ToastsManager,
    
    ) {  this.pagination = { nuPagina: 1, nuRegisMostrar: 10 };
    this.displayedSize = [10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];}

  ngOnInit() {
    this.obtenerCabecera();
  console.log(this.element)
  }
private obtenerCabecera()
{
this.request.idUsuario=this.element.idUsuario;
this.lsCabecera.abreviatura=this.element.abreviaturaAmbiente
this.lsCabecera.nombreCaja=this.element.descripcionCaja
this.lsCabecera.turno=this.element.descripcionTurno
this.lsCabecera.periodoTurno=this.element.periodoTurno

this.lsCabecera.horario=this.element.horario

this.lsCabecera.idProgramacion=this.element.idProgramacion

this.lsCabecera.idCaja=this.element.idCaja
// this._aperturaCierreCajaService.obtenerAperturaCajaPorPersonal(this.request.idUsuario)
//       .subscribe(data => {
//          if (data.estado == 1) {
//            console.log(data.areaList);
//           // this.toastr.success(data.mensaje);
//           this.lsCabecera.nombreCaja=data.descripcionCaja;
//           this.lsCabecera.turno=data.descripcionTurno;
//           this.lsCabecera.horario=data.turno;
     
          
//           // console.log(this.lsAreas);
//          } else {
//            this.toastr.error(data.mensaje);
//          }
//       },
//         error => {
//           this.toastr.error(error);
//           return Observable.throw(error);
//         }),
//       err => this.toastr.error(err),
//       () => this.toastr.success('Request Complete');

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
close(add) {
  this.dialogRef.close(add);
}
private insertarMontoInicial(){

this.requestApertura.descripcionAperturaCaja =this.lsCabecera.nombreCaja;
this.requestApertura.turnoCaja=this.lsCabecera.periodoTurno;
this.requestApertura.idCaja=this.lsCabecera.idCaja;
this.requestApertura.idProgramacion=this.lsCabecera.idProgramacion;
this.requestApertura.idUsuario=this.request.idUsuario;



this._aperturaCierreCajaService.insertarAperturaCaja(this.requestApertura)
.subscribe(data => {
  if (data.estado == 1) {
    this.toastr.success(data.mensaje);
    this.close({ id: 1, mensaje: data.mensaje });
  } else {
    this.toastr.error(data.mensaje);
    this.close({ id: 2, mensaje: data.mensaje });
  }
},
  error => {
    console.log(error);
  });
}




private obtenerAperturaCajas(numPagina?: number) {

  this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

  Object.keys(this.request).forEach(key => {
    this.request[key] = (this.request[key] === '') ? null : this.request[key];
  });

  let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  if (this.request.fechaInicio != null) { this.request.fechaInicio = ((this.request.fechaInicio).toLocaleDateString('es-PE', options)).split('/').join('-') }
  if (this.request.fechaFin != null) { this.request.fechaFin = ((this.request.fechaFin).toLocaleDateString('es-PE', options)).split('/').join('-') }



  this.request = {
    ...this.request,
    ...this.pagination,
    nuRegisMostrar: this.pageSize
  };

  this._gestionarCajaService.obtenerAperturaCierreCajas(this.request)
    .subscribe(data => {
      console.log(data);
      if (data.estado == 1) {
        this.aperturaCajasList = data.aperturaCajaList;
        console.log(this.aperturaCajasList);

        this.dataSource = new MatTableDataSource(this.aperturaCajasList);

        this.request.fechaInicio = null;
        this.request.fechaFin = null;
        this.request.estado = null;
        this.request.idArea = null;

        if (this.matPag) {
          this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
        }
        if (this.aperturaCajasList.length > 0) {
          this.pagination.nuRegisMostrar = this.aperturaCajasList[0].nuTotalReg;
        }
      }
      else {
        this.toastr.error(data.mensaje, "No se encontraron aperturas cajas list");
        this.aperturaCajasList = [];
      }
      return true;
    },
      err => { console.error(err) },
      () => {
      }); console.log(this.request)

    }
    
  sinCajaChica() {
    if (this.requestApertura.montoApertura == null) {
      if (this.requestApertura.cajaChica == true) {
        this.requestApertura.montoApertura = null
      } else {
        this.requestApertura.montoApertura = 0
      }
    } else if (this.requestApertura.montoApertura == 0) {
      if (this.requestApertura.cajaChica == true) {
        this.requestApertura.montoApertura = null
      }
    }else if(this.requestApertura.montoApertura < 0){
      if (this.requestApertura.cajaChica == true) {
        this.requestApertura.montoApertura = null
      } else {
        this.requestApertura.montoApertura = 0
      }
    }
}

inputCajaChica() {

  if(this.requestApertura.montoApertura == null){

  }else{
    if (this.requestApertura.montoApertura <= 0) {
      this.requestApertura.montoApertura = 0;
      this.requestApertura.cajaChica = true;
    }//else{
    //   this.aperturaCaja.montoApertura = 0;
    // }
  }

  console.log(this.requestApertura.montoApertura);

  // if(this.aperturaCaja.montoApertura == 0){
  //   this.aperturaCaja.cajaChica = true;
  // }
}


}