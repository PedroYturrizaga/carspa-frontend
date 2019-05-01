import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import { AreaService } from '../../../../shared/services/area.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionService } from '../../services/gestion.service';
import { Router } from '@angular/router';
//import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  public dataShared: any;
  public flgDetalle: boolean = false;
  private areas: any[] = [];
  private turnos: any[] = [];
  private origen: any[] = [];
  private aperCaja: any[] = [];
  private buscarRequest: any[] = [{ nombre: null }];
  private _param: any[] = [{
    nuPagina: 1,
    nuRegisMostrar: 10,
    idOrigen: null,
    idTurno: null,
    fecha: null,
    total_rows: null
  }];
  constructor(private _areaService: AreaService,
    private _gestionService: GestionService,
    private toastr: ToastsManager,
    private _modalService: NgbModal,
    //private _dataService    : DataService,
    private router: Router) { }

  componentes: any[] = [];

  private buscar() {
    console.log(this.buscarRequest);
  }

  private getAllAreas() {
    this._areaService.obtenerAreas()
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllTurnos() {
    this._gestionService.getAllTurnos("gONZnF9vN/bocT+JhfnMGw==")
      .subscribe(data => {
        if (data.estado == 1) {
          this.turnos = data.turnoList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllOrigen() {
    this._gestionService.getAllOrigen("gONZnF9vN/bocT+JhfnMGw==")
      .subscribe(data => {
        if (data.estado == 1) {
          this.origen = data.origenList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllAperturaCaja() {
    this._gestionService.getAllAperturaCaja("gONZnF9vN/bocT+JhfnMGw==", this._param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.aperCaja = data.aperturaCajaList;
          if (this.aperCaja.length > 0) {
            this._param[0].total_rows = this.aperCaja.length;
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private detalleCaja() {
    this.flgDetalle = true;
    //this._dataService.shared( { flgDetalle : this.flgDetalle } );
    this.router.navigate(['/aperturCierreCaja']);
    debugger;
  }

  ngOnInit() {
    this.getAllOrigen();
    this.getAllAreas();
    this.getAllTurnos();
    this.getAllAperturaCaja();
    // this._dataService.currentData.subscribe( function(data)
    // {
    //   this.dataShared = data
    // });
  }
}
