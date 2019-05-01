import { getChildrenRoutes } from './../../../../shared/auth/storage/pages.storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  constructor(private _router: Router) {
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
    this._router.navigate(['/principal/tarifario/servicio/' + modulo]);
  }

  ngOnInit() {
  }

}
