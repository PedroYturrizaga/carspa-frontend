import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { getChildrenRoutes } from './../../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  private idAlmacen = null;
  private tipoAlmacen = null;
  private descripAlmacen = null;
  private idArea = null;

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  private jsonNew: NavigationExtras = {

    queryParams: {
      "idAlmacen": null,
      "tipoAlmacen": null,
      "descripAlmacen": null,
      "idArea": null
    }
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) 
  {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
      this.idArea = params["idArea"];
    });
    this.jsonNew = {

      queryParams: {
        "idAlmacen": this.idAlmacen,
        "tipoAlmacen": this.tipoAlmacen,
        "descripAlmacen": this.descripAlmacen,
        "idArea": this.idArea
      }
    };
    this.arrayChilds = getChildrenRoutes(this._router, 3);
    console.log(this.arrayChilds)
    if(this.arrayChilds.length == 0){
      console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    this.arrayChilds.forEach(item => {
      // this.arrayUris.push(item.uri);
      if (this.tipoAlmacen == 'G' && item.uri != 'medicamento-receta' && item.uri != 'movimiento-ingreso-salida') {
        console.log('ENTRO1')
        this.jsonUris[item.uri] = item.nombrePagina;
        this.arrayUris.push(item.uri);
      } else if (this.tipoAlmacen == 'A' && item.uri != 'medicamento-receta' && item.uri != 'movimiento-ingreso') {
        console.log('ENTRO2')
        this.jsonUris[item.uri] = item.nombrePagina;
        this.arrayUris.push(item.uri);
      } else if (this.tipoAlmacen == 'F' && item.uri != 'movimiento-ingreso' && item.uri != 'movimiento-ingreso-salida') {
        console.log('ENTRO3')
        this.jsonUris[item.uri] = item.nombrePagina;
        this.arrayUris.push(item.uri);
      }
      this.activo[item.uri] = 'links2';
    });
    this.goToModulo(this.arrayUris[0]);
  }

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links2');
    this.activo[modulo] = 'activeLinks2';
    this._router.navigate(['/principal/farmacia/reporte/' + modulo], this.jsonNew);
  }

  ngOnInit() {
  }

}