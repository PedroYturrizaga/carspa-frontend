import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { Router, NavigationExtras } from '@angular/router';
import { MantenimientoAnaquelService } from '../services/mantenimiento-anaquel.service';
import { getChildrenRoutes } from './../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-farmacia-content',
  templateUrl: './farmacia-content.component.html',
  styleUrls: ['./farmacia-content.component.scss']
})
export class FarmaciaContentComponent implements OnInit {

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];
  private indexGlob = null;
  private indexInve = null;

  private showCombo = 1;
  private showCambiarFarmacia = 1;
  private almacenes: any[] = [];
  private idAlmacen: any = null;
  private tipoAlmacen: any;
  private descripAlmacen: any;
  private idAlmaTipoAlma: any = null;
  private idCita = null;
  private idArea: any;
  private nombFarmacia = "";

  private jsonNew: NavigationExtras = {
    queryParams: {
      "idAlmacen": null,
      "tipoAlmacen": null,
      "descripAlmacen": null,
      "idArea": null,
      "idCita": null
    }
  };

  constructor(
    private _mantenimientoAnaquelService: MantenimientoAnaquelService,
    private toastr: ToastsManager,
    private _router: Router
  ) {
    this.arrayChilds = getChildrenRoutes(this._router, 2);
    if (this.arrayChilds.length == 0) {
      this.toastr.success("No se encuentras paginas", "Navegacion");
      return;
    }
    // this.cargarMenu();
  }

  cargarMenu() {
    this.arrayChilds = getChildrenRoutes(this._router, 2);
    if (this.arrayChilds.length == 0) {
      this.toastr.success("No se encuentras paginas", "Navegacion");
      return;
    }
    this.arrayUris = [];
    this.jsonUris = {};
    this.activo = {};
    let index = 0;
    this.arrayChilds.forEach(item => {
      if (item.uri == 'atender-receta') {
        this.indexGlob = index;
      }
      if (item.uri == 'inventario') {
        this.indexInve = index;
      }
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'links';
      index++;
    });
    if (this.tipoAlmacen == 'G' || this.tipoAlmacen == 'A') {
      if (this.indexGlob != null && this.indexGlob != null) {
        this.arrayUris.splice(this.indexGlob, 1);
        delete this.jsonUris['atender-receta'];
        delete this.activo['atender-receta'];
      }
    }
    // if (this.tipoAlmacen == 'F') {
    //   if (this.indexInve != null &&  this.indexInve != null) {
    //     this.arrayUris.splice(this.indexInve, 1);
    //     delete this.jsonUris['inventario'];
    //     delete this.activo['inventario'];
    //   }
    // }
  }
  private cambiarTipoAlmacen() {
    this._router.navigate(['/principal/farmacia']);
    this.idAlmaTipoAlma = null;
    this.capturarTipoAlmacen(null);
  }

  private capturarTipoAlmacen(event) {
    if (event != null && event != '' && event != undefined) {
      this.idAlmacen = (event.idAlmacen).toString();
      this.tipoAlmacen = event.tipoAlmacen;
      this.descripAlmacen = event.descripcionAlmacen;
      this.idArea = (event.area.id).toString();
      this.jsonNew = {
        queryParams: {
          "idAlmacen": this.idAlmacen,
          "tipoAlmacen": this.tipoAlmacen,
          "descripAlmacen": this.descripAlmacen,
          "idArea": this.idArea,
          "idCita": this.idCita
        }
      };
      this.nombFarmacia = this.descripAlmacen;
      this.showCombo = 2;
      this.cargarMenu();
      this.goToModulo(this.arrayUris[0]);
    }
    else {
      this.idAlmacen = null
      this.tipoAlmacen = null;
      this.descripAlmacen = null;
      this.showCombo = 1;
    }
  }
  private getAlmacenesAsignados() {
    this._mantenimientoAnaquelService.getAlmacenesAsignados()
      .subscribe(data => {
        if (data.estado == 1) {
          //console.log(data)
          this.almacenes = data.almacenList;
          if (this.almacenes.length == 1) {
            this.capturarTipoAlmacen(this.almacenes[0])
            this.showCambiarFarmacia = 0;
          }
          else {
            this.showCambiarFarmacia = 1;
          }
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

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
    this.activo[modulo] = 'activeLinks';
    this._router.navigate(['/principal/farmacia/' + modulo], this.jsonNew);
  }
  ngOnInit() {
    this.getAlmacenesAsignados();
  }
}