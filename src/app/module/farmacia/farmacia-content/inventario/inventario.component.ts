import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { getChildrenRoutes } from './../../../../shared/auth/storage/pages.storage';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  private idAlmacen = null;
  private tipoAlmacen = null;
  private descripAlmacen = null;
  
  private jsonNew: NavigationExtras = {

    queryParams: {
      "idAlmacen": null,
      "tipoAlmacen": null,
      "descripAlmacen": null
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
    });

    this.jsonNew = {
      queryParams: {
        "idAlmacen": this.idAlmacen,
        "tipoAlmacen": this.tipoAlmacen,
        "descripAlmacen": this.descripAlmacen
      }
    };

    this.arrayChilds = getChildrenRoutes(this._router, 3);
    if(this.arrayChilds.length == 0){
      console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    this.arrayChilds.forEach(item => {
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'links2';
    });
    this.goToModulo(this.arrayUris[0]);
  }

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links2');
    this.activo[modulo] = 'activeLinks2';
    this._router.navigate(['/principal/farmacia/inventario/' + modulo], this.jsonNew);
  }
  ngOnInit() {
  }

}
