import { Util } from './../../../../../shared/helpers/util/util';
import { DataService } from './../../../../../shared/services/data.service';
import { json } from './../../../../../shared/helpers/custom-validators/ng4-validators/json/validator';
import { url } from './../../../../../shared/helpers/custom-validators/ng4-validators/url/validator';
import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AtencionMedicaAmbulatoriaService } from '../../../services/atencion-medica-ambulatoria.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { DetalleAtencionMedicaAmbulatoriaComponent } from './detalle-atencion-medica-ambulatoria/detalle-atencion-medica-ambulatoria.component';
import { getChildrenRoutes, setArrayRoute } from './../../../../../shared/auth/storage/pages.storage';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { getIdUsuario } from "./../../../../../shared/auth/storage/cabecera.storage";
import { Subscription } from 'rxjs/Subscription';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { VerActoMedicoComponent } from './../../../../../shared/others/ver-acto-medico/ver-acto-medico.component';
import { HistoriaClinicaComponent } from './ultimas-atenciones/historia-clinica/historia-clinica.component';

@Component({
  selector: 'app-atencion-medica-ambulatoria',
  templateUrl: './atencion-medica-ambulatoria.component.html',
  styleUrls: ['./atencion-medica-ambulatoria.component.scss']
})
export class AtencionMedicaAmbulatoriaComponent implements OnInit {

  @ViewChild('snav') sidenav: MatSidenav;
  //tabla1
  displayedColumns = ['especialidad', 'descActividad', 'hoInicio', 'hoFinal', 'descAmbiente', 'estado'];
  dataSource = new MatTableDataSource();
  //tabla1
  displayedColumns1 = ['ordenAtencion', 'nombreCompleto', 'edad', 'historiaClinica', 'grupoEtareo', 'estado', 'atender', 'verAM'];
  dataSource1 = new MatTableDataSource();

  //DESBLOQUEAR MENUS
  dataPassed: any;
  subscription: Subscription;
  //------
  private lsProgramacionCitaPorPersonal: any[];
  private lsProgramacionCitaPorProgramacion: any[];
  private idProgramacion = null;
  private estado = null;
  private contador = 0;
  private date = new Date();
  private idCitaJson: any;
  private _params = {
    idPersonal: null, //"QzN0inAQvDG4DP21w8LnfA==",
    feProgramacion: null
  };
  private params: any = { idCita: null, idPersona: null, activo: false };
  private showMenu = 1;
  private idPersona = null;
  private idActoMedico = null;
  private activo: any = {};
  private idCita: any;
  private idAtencionEncriptado = null;

  private showRealizarProc = 1;
  private jsonNew: NavigationExtras = {
    queryParams: {
      "idPersona": null,
      "idActoMedico": null,
      "idAtencion": null,
      "idCita": null,
      "idAtencionEncriptado": null,
      "idCitaProc": null,
      "idPersonal": null
    }
  };
  private idCitaProc: any = null;
  private arrayChilds: any[] = [];
  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private index = 0;
  private indexProc = 0;
  private _idProgramacion = '';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  _menu: any[];

  constructor(private _atencionMedicaAmbulatoriaService: AtencionMedicaAmbulatoriaService,
    private toastr: ToastsManager,
    private _router: Router,
    private _route: ActivatedRoute,
    private ds: DataService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private _util: Util) {

    this._params.idPersonal = getIdUsuario();
    this._route.queryParams.subscribe(params => {
      this.idCitaProc = params["idCitaProc"];
      this.jsonNew.queryParams.idCitaProc = params["idCitaProc"];
      this.jsonNew.queryParams.idPersona = params["idPersona"];
    });
    //MENU
    this.arrayChilds = getChildrenRoutes(this._router, 3);
    // console.log("Childs: ", this.arrayChilds);
    if (this.arrayChilds.length == 0) {
      // console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    let index = 0;
    let indexCitaProc = 0;
    // console.log(this.arrayChilds);
    this._menu = this.arrayChilds.map(x => { return { uri: x.uri, nombrePagina: x.nombrePagina, activo: 'isDisabled', hidden: false } });

    this.arrayChilds.forEach(item => {
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'isDisabled';
      if (item.uri == 'atencion-procedimiento') {
        this.index = index;
      }
      if (item.uri == 'atencion-medica') {
        this.indexProc = indexCitaProc;
      }
      index++;
      indexCitaProc++;
    });
    //---------------------------------------------------

    //verificacion STORAGE
    this.subscription = this.ds.getData().subscribe(x => {
      // debugger
      this.dataPassed = x;
      // if (this.dataPassed == 'verificarStorages') {
      //   this.verificarStorage();
      // }
      if (this.dataPassed == 'regresar') {
        this.showMenu = 1;
      } else {

        this.dataPassed == 'verificarStorages' ? this.verificarStorage(true) : this.verificarStorage(false);
      }
    });
    //-------------------------------------------------------

    //verificacion menu CITA-PROCEDIMIENTO
    let _uri = (this.idCitaProc != undefined || this.idCitaProc != null) ? 'atencion-medica' : 'atencion-procedimiento';
    for (let ls of this._menu) {
      if (ls.uri == _uri) ls.hidden = true;
    }
    if (this.idCitaProc != undefined || this.idCitaProc != null)
      this.verificarCitaProcedimiento();


    // if (this.idCitaProc != undefined || this.idCitaProc != null) {
    //   this.verificarCitaProcedimiento();
    //   this.arrayUris.splice(this.indexProc, 1);
    //   delete this.activo['atencion-medica'];

    // this.arrayUris.push('atencion-procedimiento');
    // this.activo['atencion-procedimiento'] = 'isDisabled'
    // }
    // else {
    //   this.arrayUris.splice(this.index, 1);
    //   delete this.activo['atencion-procedimiento'];

    // this.arrayUris.push('atencion-medica');
    // this.activo['atencion-medica'] = 'isDisabled'
    // }
    //-------------------------------------------------------

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private verificarCitaProcedimiento() {
    // debugger
    this.jsonNew.queryParams.idCitaProc = this.idCitaProc
    this.showMenu = 2;
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links2');
    this.activo["atencion-medica"] = 'isDisabled';

    let modulo = "atencion-procedimiento"
    this.activo[modulo] = 'activeLinks2';
    this._menu.map((_it, _ix) => { if (_it['uri'] == modulo) this._menu[_ix]['activo'] = 'activeLinks2'; })
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-medica-ambulatoria/' + modulo], this.jsonNew);
  }

  private verificarStorage(refer?: any) {
    // console.log("entro");

    // if (localStorage.getItem("idActoMedicoEncriptado") == undefined || localStorage.getItem("idActoMedicoEncriptado") == undefined == null) {
    //   return;
    // }
    // if (localStorage.getItem("idAtencionEncriptado") == undefined || localStorage.getItem("idAtencionEncriptado") == undefined == null) {
    //   return;
    // }
    // console.log(refer);
    Object.keys(this.activo).forEach(key => refer ? this.activo[key] = 'links2' : (key == 'atencion-medica-referencia' ? this.activo['atencion-medica-referencia'] = 'isDisabled' : this.activo[key] = 'links2'));

    //////----- 2da forma
    this._menu.map((_it, _ix) => { this._menu[_ix]['activo'] = refer ? 'links2' : (_it['uri'] == 'atencion-medica-referencia') ? 'isDisabled' : 'links2' });
    //////-------
    let modulo = "atencion-medica"
    this.activo[modulo] = 'activeLinks2';
    // console.log(this.activo);
  }

  private getHoraActual() {
    if (this._params.feProgramacion == null) {
      let dia = this.date.getDate();
      let mes = this.date.getMonth() + 1;
      let anio = this.date.getFullYear();
      if (dia.toString().length == 1 && mes.toString().length == 1) {
        this._params.feProgramacion = anio + "-0" + mes + "-0" + dia;
      } else if (dia.toString().length == 1 && mes.toString().length == 2) {
        this._params.feProgramacion = anio + "-" + mes + "-0" + dia;
      } else if (dia.toString().length == 2 && mes.toString().length == 1) {
        this._params.feProgramacion = anio + "-0" + mes + "-" + dia;
      }
    } else {
      this._params.feProgramacion;
    }
  }
  private getListaCitaxProgramacion() {
    this.idProgramacion = null;

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let param: any = { feProgramacion: ((this._params.feProgramacion).toLocaleDateString('es-PE', options)).split('/').join('-'), idPersonal: this._params.idPersonal };

    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaAmbulatoriaService.getListaCitaxPersonal(param)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.lsProgramacionCitaPorPersonal = data.lsProgramacionCitaPorPersonal;
            // console.log(this.lsProgramacionCitaPorPersonal);
            if (this.lsProgramacionCitaPorPersonal.length > 0) {
              for (let key in this.lsProgramacionCitaPorPersonal) {
                this.estado = (this.lsProgramacionCitaPorPersonal[key].flEstado == 1) ? 'ACTIVO' : 'INACTIVO';
              }
            } else {
              this.idProgramacion = null;
              this.toastr.warning("No Tiene Programaciones", "Advertencia")
            }
            this.dataSource = new MatTableDataSource(this.lsProgramacionCitaPorPersonal);
            this.dataSource1 = new MatTableDataSource();
          } else if (data.mensaje == 0) {
            this.toastr.warning(data.mensaje +" asignadas.", "Advertencia");
          } else {
            this.toastr.error(data.mensaje, "Error de Servicio");

          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;

    // this._atencionMedicaAmbulatoriaService.getListaCitaxPersonal(param)
    //   .subscribe(data => {
    //     if (data.estado == 1) {
    //       this.lsProgramacionCitaPorPersonal = data.lsProgramacionCitaPorPersonal;
    //       console.log(this.lsProgramacionCitaPorPersonal);
    //       if (this.lsProgramacionCitaPorPersonal.length > 0) {
    //         for (let key in this.lsProgramacionCitaPorPersonal) {
    //           this.estado = (this.lsProgramacionCitaPorPersonal[key].flEstado == 1) ? 'ACTIVO' : 'INACTIVO';
    //         }
    //       } else {
    //         this.idProgramacion = null;
    //       }
    //       this.dataSource = new MatTableDataSource(this.lsProgramacionCitaPorPersonal);
    //     } else {
    //       this.toastr.error(data.mensaje);
    //     }
    //   },
    //     error => {
    //       this.toastr.error(error);
    //       return Observable.throw(error);
    //     }),
    //   err => this.toastr.error(err),
    //   () => this.toastr.success('Request Complete');
  }

  private tablePacientesCitados(idProgramacion?) {

    // this._idProgramacion = idProgramacion ? idProgramacion : this._idProgramacion;

    this.idProgramacion = idProgramacion ? idProgramacion : this.idProgramacion;
    let promise = new Promise((resolve, reject) => {
      this._atencionMedicaAmbulatoriaService.getListaCitaxProgramacion(this.idProgramacion)
        .toPromise().then(data => {
          if (data.estado == 1) {
            // debugger
            this.lsProgramacionCitaPorProgramacion = data.lsCitadoPorProgramacion;
            if (this.lsProgramacionCitaPorProgramacion.length != 0) {
              this.dataSource1 = new MatTableDataSource(this.lsProgramacionCitaPorProgramacion);
              if (this.lsProgramacionCitaPorProgramacion[0].idEstadoCita == "S") {
                // this.cambiarColorRow(this.lsProgramacionCitaPorProgramacion[0].idCitaEncrip, "");
              }
            } else {
              this.toastr.warning("No tiene Citas Asginadas");
              this.dataSource1 = new MatTableDataSource();
            }
            // console.log(this.lsProgramacionCitaPorProgramacion);
          } else {
            this.toastr.error("No se obtuvieron la lista des Citas" + data.mensaje);
          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;

    // this._atencionMedicaAmbulatoriaService.getListaCitaxProgramacion(idProgramacion)
    //   .subscribe(data => {
    //     console.log(data);
    //     if (data.estado == 1) {
    //       // debugger
    //       this.lsProgramacionCitaPorProgramacion = data.lsCitadoPorProgramacion;
    //       if (this.lsProgramacionCitaPorProgramacion.length != 0) {
    //         this.dataSource1 = new MatTableDataSource(this.lsProgramacionCitaPorProgramacion);
    //         if (this.lsProgramacionCitaPorProgramacion[0].idEstadoCita == "S") {
    //           this.cambiarColorRow(this.lsProgramacionCitaPorProgramacion[0].idCitaEncrip, "");

    //         }
    //       }

    //       console.log(this.lsProgramacionCitaPorProgramacion);
    //     } else {
    //       this.toastr.error(data.mensaje);
    //     }
    //   },
    //     error => {
    //       this.toastr.error(error);
    //       return Observable.throw(error);
    //     }),
    //   err => this.toastr.error(err),
    //   () => this.toastr.success('Request Complete');
  }

  private openModalCancelar(idCita) {
    this.idCitaJson = idCita;

    const dialogRef = this.dialog.open(DetalleAtencionMedicaAmbulatoriaComponent, {
      autoFocus: false,
      hasBackdrop: true,
      width: '500px',
      height: '250px',
      disableClose: true
    });
    dialogRef.componentInstance.idCitaJson = this.idCitaJson;
    dialogRef.afterClosed().subscribe(result => {
      this.tablePacientesCitados(this.idProgramacion).then();
      if (result == 1) {
        // this.cambiarColorRow(idCita, this.idCitaJson);
      }

    });
  }

  private cambiarColorRow(id, idAnterior) {
    if (idAnterior == null) {
      // $('#'+id).addClass("bg-danger");
      document.getElementById(id).style.background = "rgb(248, 155, 155)";
    } else {
      document.getElementById(idAnterior).style.background = "white";
      document.getElementById(id).style.background = "rgb(248, 155, 155)";
      $("#" + id).attr("disabled", 'disabled')
    }
  }

  private ingresar(idCita, idGrupoEtareo, idPersona) {
    this.params.idCita = idCita;
    this.params.idPersona = idPersona;
    this.showMenu = 2;
    localStorage.removeItem('idActoMedicoEncriptado');
    localStorage.removeItem('idAtencionEncriptado');
    this.jsonNew = {
      queryParams: {
        "idPersona": idPersona,
        "idCita": idCita
      }
    };
    let modulo = "atencion-medica"
    this.activo[modulo] = 'activeLinks2';
    /////2da forma
    this._menu.map((_m, _i) => { if (_m['uri'] == modulo) this._menu[_i]['activo'] = 'activeLinks2' })
    /////-----
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-medica-ambulatoria/' + modulo], this.jsonNew);
  }
  goToModulo(modulo: any) {
    // if (this.idCitaProc != undefined && this.idCitaProc != null && modulo == "atencion-medica") {
    //   return;
    // }
    // if (localStorage.getItem("idActoMedicoEncriptado") == undefined || localStorage.getItem("idActoMedicoEncriptado") == undefined == null) {
    //   return;
    // }
    // if (localStorage.getItem("idAtencionEncriptado") == undefined || localStorage.getItem("idAtencionEncriptado") == undefined == null) {
    //   return;
    // }
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links2');
    this.activo[modulo] = 'activeLinks2';
    /////2da forma
    for (let m of this._menu) {
      m['activo'] = m['uri'] == modulo ? 'activeLinks2' : 'links2';
    }
    //////-----
    this._router.navigate(['/principal/consulta-ambulatoria/atencion-medica-ambulatoria/' + modulo], this.jsonNew);
  }
  close(reason: string) {
    if (reason == "escape") {
      return;
    }
    this.sidenav.close();
  }
  finalizar() {
    this.showMenu = 1;
    this._params.feProgramacion = new Date();
    // console.log("fecha", this._util.parseFetch(this._params.feProgramacion));
    // if (this.idCitaProc) {
    this.getListaCitaxProgramacion().then(() => {
      // if (this.lsProgramacionCitaPorPersonal[0].idProgramacion != undefined || this.lsProgramacionCitaPorPersonal[0].idProgramacion != null || this.lsProgramacionCitaPorPersonal[0].idProgramacion != "")
      if (this.lsProgramacionCitaPorPersonal.length > 0)
        this.tablePacientesCitados(this.lsProgramacionCitaPorPersonal[0].idProgramacion).then();
    });
    // }
  }

  verificando() {
    let vari: boolean = true;
    vari = localStorage.getItem('idActoMedicoEncriptado') && localStorage.getItem('idAtencionEncriptado') ? false : true;
    return vari;
  }


  private abrirModalHistoriaClinica(idActoMedico, i, idActoMedicoEncriptado, idAtencionEncriptado, idPersona) {
    const dialogRef = this.dialog.open(HistoriaClinicaComponent, {
      autoFocus: false,
      hasBackdrop: true,
      minWidth: '80%',
      width: '1500px',
      maxHeight: '85%',
      height: '750px',
      disableClose: false
    });
    dialogRef.componentInstance.actoMedico = "";
    dialogRef.componentInstance.idActoMedico = idActoMedico;
    dialogRef.componentInstance.idActoMedicoEncriptado = idActoMedicoEncriptado;
    dialogRef.componentInstance.posicion = i;
    dialogRef.componentInstance.idAtencionEncriptado = idAtencionEncriptado;
    dialogRef.componentInstance.idPersona = idPersona;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openModal(element): void {
    const dialogRef = this.dialog.open(VerActoMedicoComponent, {
      autoFocus: false,
      maxWidth: '90%',
      width: '80%',
      maxHeight: '95%',
      height: '95%',
      disableClose: true,
      panelClass: 'pdfs'
    });
    dialogRef.componentInstance.idActoMedico = element.idActoMedicoEncrip ? element.idActoMedicoEncrip : null;
    dialogRef.componentInstance.idAtencion = element.idAtencionEncrip ? element.idAtencionEncrip : null;
    dialogRef.componentInstance.idPersona = element.idPersona;
    dialogRef.componentInstance.idCita = element.idCitaEncrip;
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit() {
    // console.log(window);
    this._params.feProgramacion = new Date();
    // console.log("fecha", this._util.parseFetch(this._params.feProgramacion));
    // if (this.idCitaProc) {
    this.getListaCitaxProgramacion().then(() => {
      // if (this.lsProgramacionCitaPorPersonal[0].idProgramacion != undefined || this.lsProgramacionCitaPorPersonal[0].idProgramacion != null || this.lsProgramacionCitaPorPersonal[0].idProgramacion != "")
      if (this.lsProgramacionCitaPorPersonal.length > 0)
        this.tablePacientesCitados(this.lsProgramacionCitaPorPersonal[0].idProgramacion).then();
    });
    // }
  }

}