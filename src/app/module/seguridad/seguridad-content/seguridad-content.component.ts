import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getChildrenRoutes } from './../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-seguridad-content',
  templateUrl: './seguridad-content.component.html',
  styleUrls: ['./seguridad-content.component.scss']
})
export class SeguridadContentComponent implements OnInit {

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  constructor(private _router: Router) {
    this.arrayChilds = getChildrenRoutes(this._router, 2);
    if(this.arrayChilds.length == 0){
      console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    this.arrayChilds.forEach(item => {
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'titulo';
    });
    this.goToModulo(this.arrayUris[0]);
  }

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'titulo');
    this.activo[modulo] = 'tituloActivo';
    this._router.navigate(['/principal/seguridad/' + modulo]);
  }

  ngOnInit() {
  }

}
