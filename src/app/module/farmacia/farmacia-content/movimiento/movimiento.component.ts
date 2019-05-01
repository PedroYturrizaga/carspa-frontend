import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { getChildrenRoutes } from './../../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {

  @ViewChild('t') t;

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  private idAlmacen = null;
  private tipoAlmacen = null;
  private  descripAlmacen= null;
  private jsonNew: NavigationExtras = {
    queryParams: {
      "idAlmacen": null,
      "tipoAlmacen": null
    }
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe(params => {
      this.idAlmacen = params["idAlmacen"];
      this.tipoAlmacen = params["tipoAlmacen"];
      this.descripAlmacen = params["descripAlmacen"];
    });
    
    this.jsonNew = {
      queryParams: {
        "idAlmacen": this.idAlmacen,
        "tipoAlmacen": this.tipoAlmacen,
        "descripAlmacen":this.descripAlmacen
      }
    };
    this.arrayChilds = getChildrenRoutes(this._router, 3);
    if(this.arrayChilds.length == 0){
      console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    this.arrayChilds.forEach(item => {
      if (this.tipoAlmacen == 'G' && item.uri != 'solicitar-medicamento-material') {
        this.jsonUris[item.uri] = item.nombrePagina;
        this.arrayUris.push(item.uri);
      }
      else if (this.tipoAlmacen == 'A' && item.uri != 'nota-entrada') {
        this.jsonUris[item.uri] = item.nombrePagina;
        this.arrayUris.push(item.uri);
      }
      else if (this.tipoAlmacen == 'F' && item.uri != 'nota-entrada' && item.uri != 'transferir-medicamento-material') {
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
    this._router.navigate(['/principal/farmacia/movimiento/' + modulo], this.jsonNew);
  }

  ngOnInit() {

  }
}
