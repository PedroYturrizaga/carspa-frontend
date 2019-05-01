import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { getChildrenRoutes } from './../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-mantenimiento-content',
  templateUrl: './mantenimiento-content.component.html',
  styleUrls: ['./mantenimiento-content.component.scss']
})
export class MantenimientoContentComponent implements OnInit {

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
    this.cargarMenu();
    this.goToModulo(this.arrayUris[0]);
  }
  cargarMenu() {    
    this.arrayChilds = getChildrenRoutes(this._router, 2);  
    this.arrayUris = [];
    this.jsonUris = {};
    this.activo = {};
    this.arrayChilds.forEach(item => {
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'links';
    });
  }
  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
    this.activo[modulo] = 'activeLinks';
    this._router.navigate(['/principal/mantenimiento/' + modulo]);
  }
  ngOnInit() {
  }

}
