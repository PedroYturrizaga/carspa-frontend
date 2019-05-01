import { ListarOrdenesCobroService } from './../../../caja/services/listar-ordenes-cobro.service';
import { AppService } from './../../../../shared/services/app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalService } from '../../services/personal.service';
import { PersonalDeleteComponent } from './personal-delete/personal-delete.component';
import { ReporteService } from '../../../../shared/services/reporte.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { DataService } from '../../../../shared/services/data.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { CambiarValoresEncriptados } from './../../../../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  dataPassed: any;
  subscription: Subscription;

  private headerPersonal: any[] = [{ thNombre: 'Tipo Doc' }, { thNombre: 'Nro Doc' }, { thNombre: 'Nro Colegiatura' }, { thNombre: 'RNE' }, { thNombre: 'Ape. Paterno' }, { thNombre: 'Ape. Materno' }, { thNombre: 'Nombres' }, { thNombre: 'Colegio' }, { thNombre: 'Sexo' }, { thNombre: 'Ver' }, { thNombre: 'Editar' }, { thNombre: 'Eliminar' }];

  dataSource = new MatTableDataSource();
  displayedColumnsP = ['tipoDoc', 'nroDoc', 'nroCol', 'rne', 'apePat', 'apeMat', 'nombres', 'colegio', 'sexo', 'estado', 'ver', 'editar', 'eliminar'];

  private personal: any[] = [];
  private tamDoc: any = "?";

  private displayedSizes: number[];
  private pageSize: number;
  private pagination: any;
  private verificar: any;

  /*Parametrod de filtrado de personal*/
  private personalRequest = {
    tipoDocumento: null,
    numeroDocumento: null,
    apellidoPaternoPersonal: null,
    apellidoMaternoPersonal: null,
    nombrePersonal: null,
    idPersonal: null,
    // numPagina: null,
    // numRegistroMostrar: null,
    numeroCmp: null,
    fl_estado: null 
  };

  // variables para paginar
  // private paginationParameter = {
  //   numPagina: 1,
  //   total_rows: 0
  // };

  private personalDisabled: boolean = true;
 

  constructor(
    private _OrdenPagoService: ListarOrdenesCobroService,
    private toastr: ToastsManager,
    private _appService: AppService,
    private _personalService: PersonalService,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService,
    private _cambiarValores: CambiarValoresEncriptados
  ) {
    this.pagination = { numPagina: 1, numRegistroMostrar: 0 };
    this.displayedSizes = [10, 15, 25, 100];
    this.pageSize = this.displayedSizes[0];

    this._route.queryParams.subscribe(params => {
      this.verificar = params["verificar"];
    })

    this.subscription = this.ds.getData().subscribe(x => {
      this.dataPassed = x;
      if (this.dataPassed == 'vuelve') {
        this.personalDisabled = true;
        this.ngOnInit();
      }
    });
  }

  ngOnDestroy() {
    //console.log(this.dataPassed);
    this.subscription.unsubscribe();
  }

  /**
   * lista todo el personal
   */

  private pageEvent($event: any) {
    console.log($event);
    this.pagination.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getAllPersonal();
  }


  
  private obtenerNumeroDocumentos: any = { idTipoDocumento: 0, nuDocumento: "" };
  private DocsIdentidad: any = [];
  private showAutocomplete = 1;
  private tipoDocumentos: any[];
  private tipoDoc = "";
  private numeroDocumentoIdentidad: string = "";
  private nuDocumento: string = "";
  private idPersonal: any = null;
  private obtenerDatosPersonal: any = { idPersona: ""};
  /**
   * Agregando Combo Tipo Documento
   */

  private getTipoDocumentos() {
    this._appService.getTipoDocumentos()
      .subscribe(data => {
        console.log(data);
          if (data.estado == 1) {
            this.tipoDocumentos = data.tipoDocumentoList;
          } else if (data.estado == 0) {
            console.log(data.mensaje);
          } else {
            console.log(data.mensaje);
          }
        },
        err => {
          console.log(err)
        });
  }

  filterDocs(val: string) {
    this.DocsIdentidad = val ? this._filter(val) : this.DocsIdentidad;
  }
  private _filter(val: string) {
    const filterValue = val.toLowerCase();
    return this.DocsIdentidad.filter(value => value.numeroDocumentoIdentidad.toLowerCase().startsWith(filterValue));
  }

  private verificarTamanio(tipoDoc) {
    if (tipoDoc == 1) {
      this.tamDoc = '8';
    }
    if (tipoDoc == 2) {
      this.tamDoc = '12';
    }
    if (tipoDoc == 3) {
      this.tamDoc = '12';
    }
    if (tipoDoc == 4) {
      this.tamDoc = '15';
    }
  }

  private getNumeroABuscar(numbusq) {
    this.DocsIdentidad = [];
    if (numbusq.length == 8) {
      this.obtenerNumeroDocumentos.idTipoDocumento = this.tipoDoc;
      this.obtenerNumeroDocumentos.nuDocumento = numbusq;
      this._OrdenPagoService.ObtenerNumeroDocs(this.obtenerNumeroDocumentos)
        .subscribe(data => {
          console.log(data);
          
          if (data.estado == 1) {
            if (data.personaList == [] || data.personaList.length == 0) {
             // this.toastr.info("No hay Resultados");
              this.numeroDocumentoIdentidad = "";
            }
            else {
              this.DocsIdentidad = data.personaList;
              this.filterDocs(this.nuDocumento)
              this.showAutocomplete = 2;
            }
          }
          else {
            this.toastr.error(data.mensaje);
          }
          return true;
        },
          error => {
            this.toastr.error("Error al Obtener Numeros de Documento");
            return Observable.throw(error);
          }),
        err => console.error(err),
        () => console.log('Request Complete');
    }
  }
  
  private getIdPersonal(jason) {
    this.numeroDocumentoIdentidad = jason.numeroDocumentoIdentidad;
    this.idPersonal = jason.idPersonal;
    this.DocsIdentidad = [];
  }

  /**
   * Agregando Personal
   */ 

  private lsPersonal = [];

  private getAllPersonal(nuPagina?: number) {
    this.obtenerDatosPersonal={
      idPersonal: this.idPersonal
    };
    //console.log(this.obtenerDatosPersonal.idPersonal);
    let data1: any = [];

    this.pagination.numPagina = (nuPagina) ? nuPagina : this.pagination.numPagina;

    Object.keys(this.personalRequest).forEach(key => {
      this.personalRequest[key] = (this.personalRequest[key] === '') ? null : this.personalRequest[key];
    });
    this.personalRequest = {
      ...this.personalRequest,
      ...this.pagination,
      numRegistroMostrar: this.pageSize
    };
    //console.log(this.obtenerDatosPersonal.id);
    
    data1.push(this.personalRequest);
    console.log(data1);
    this._personalService.getAllPersonal(data1)
      .subscribe(data => {
        console.log(data)
        /*evaluacion del resultado de la peticion al servidor*/
        if (data.estado == 1) {

          this.nuDocumento = "";
          this.personal = data.personalList;
          this.lsPersonal = data.personalList;
          // for (let x of this.lsPersonal) {
          //   x['color'] = x['fl_estado'] == 1 ? 'primary' : 'warn';
          // }         
          this.dataSource = new MatTableDataSource(this.personal);
          console.log(this.personal)
          if (this.matPag) {
            this.matPag._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPag._pageIndex;
          }
          this.dataSource.sort = this.matSort;
          if (this.personal.length > 0) {
            this.pagination.numRegistroMostrar = this.personal[0].numTotalReg;
          }     
          
        } else if (data.estado == 0) {
          console.log(data.mensaje);
        } else if (data.estado == -1) {
          console.log(data.mensaje);
        }
      },
        err => {
          console.log(err)
        });

        // this.tipoDoc ="";
        // this.personalRequest.numeroDocumento= "";
  }

  private modalPersonalDelete(idPersonal) {
    const modalRef = this.modalService.open(PersonalDeleteComponent, { size: 'sm',backdrop: 'static' });
    modalRef.componentInstance.idPersonal = idPersonal;
    modalRef.result.then((result) => {
      this.getAllPersonal();
    }, (reason) => {
      this.getAllPersonal();
    });
  }

  public imprimirReporte(idPersonal: any) {
    this._personalService.getPdfDocument(idPersonal, 2)
      .subscribe(data => {
        if (data.estado == 1) {
          this._reporteService.generar(null, data.imprimeFile, 2);
        }
        else {
          console.log(data.mensaje);
        }
      },
        function (error) {
          console.error("Error al Listar");
        });
  }
  redirige(idPersonal) {
    this.idPersonal = idPersonal;
    this.personalDisabled = false;
    this._router.navigate(['principal/admision/personal/mantenimiento-personal'], { queryParams: { 'idPersonal': this.idPersonal } });
  }

  private requestBoton = { idPersonal: null, fl_estado: null };

  //limpiar
  private limpiarPersonal(){
    this.tipoDoc="";
     this.personalRequest = {
       tipoDocumento: null, numeroDocumento: null, apellidoPaternoPersonal: null, apellidoMaternoPersonal: null, nombrePersonal: null, idPersonal: null, numeroCmp: null, fl_estado: null
     };
     this.getAllPersonal(1);
  }

  //verde a rojo
  private actualizarEstado1(lista) {

    console.log(lista);
    this.requestBoton.idPersonal=lista.idPersonal;
    this.requestBoton.fl_estado=lista.fl_estado;
    if (this.requestBoton.fl_estado == 1) {
      this.requestBoton.fl_estado = 0;
    }
    console.log(this.requestBoton);
    this._personalService.actualizarEstadoPersonal(this.requestBoton)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(this.requestBoton);
          this.toastr.success("Personal inhabilitado correctamente","Exitoso");
          this.getAllPersonal();
          
          console.log(data.mensaje);
          //  this.close(1);
        } else {
          this.toastr.warning(data.mensaje);
        }
      }
      ,
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
     // this.getAllPersonal(1);
  //   this.getAllPersonal(this.requestBoton.idPersonal);
     //this.actualizarEstado1(lista);
  }
//rojo a verde
  private actualizarEstado2(lista){
    console.log(lista);
    this.requestBoton.idPersonal=lista.idPersonal;
    this.requestBoton.fl_estado=lista.fl_estado;
    if (this.requestBoton.fl_estado == 0) {
      this.requestBoton.fl_estado = 1;
    }
    console.log(this.requestBoton);
    this._personalService.actualizarEstadoPersonal(this.requestBoton)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(this.requestBoton);
          this.toastr.success("Personal habilitado correctamente","Exitoso");
         this.getAllPersonal();
          console.log(data.mensaje);
          //  this.close(1);
        } else {
          this.toastr.error(data.mensaje);
        }
      }
      ,
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
      //this.getAllPersonal(1);

  }

  private isInvalid(tipoDoc: any, numDoc: any): boolean {
    return tipoDoc == null || tipoDoc == undefined || numDoc == null ||
      numDoc == "" || numDoc == undefined || numDoc == undefined || this.numeroDocumentoIdentidad == "";
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

  regresa(param: boolean) {
    this.personalDisabled = true;
  }

  ngOnInit() {
    this.getTipoDocumentos();
    this.getAllPersonal();
    this.personalDisabled = true;
    
  }

}
