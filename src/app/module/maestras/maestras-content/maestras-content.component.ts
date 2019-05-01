import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { setPagesList, getChildrenRoutes, setArrayRoute } from './../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-maestras-content',
  templateUrl: './maestras-content.component.html',
  styleUrls: ['./maestras-content.component.scss']
})
export class MaestrasContentComponent implements OnInit {


  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  constructor(
    private _router: Router,
    private toastr: ToastsManager) {
    this.arrayChilds = getChildrenRoutes(this._router, 2);
    if(this.arrayChilds.length == 0){
      console.log('ASIGNAR PAGINAS HIJAS')
      return;
    }
    this.arrayChilds.forEach(item => {
      this.arrayUris.push(item.uri);
      this.jsonUris[item.uri] = item.nombrePagina;
      this.activo[item.uri] = 'links';
    });
    this.goToModulo(this.arrayUris[0]);
  }

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
    this.activo[modulo] = 'activeLinks';
    this._router.navigate(['/principal/maestras/' + modulo]);
  }


  ngOnInit() {
  }

}
