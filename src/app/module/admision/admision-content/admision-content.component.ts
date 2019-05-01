import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { setPagesList, getChildrenRoutes, setArrayRoute } from './../../../shared/auth/storage/pages.storage';

@Component({
  selector: 'app-admision-content',
  templateUrl: './admision-content.component.html',
  styleUrls: ['./admision-content.component.scss']
})
export class AdmisionContentComponent implements OnInit {

  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private arrayChilds: any[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
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
    this._route.queryParams.subscribe(params => {
      console.log(params);
      // this.idCitaProc = params["idCitaProc"];
      // this.jsonNew.queryParams.idCitaProc = params["idCitaProc"];
      // this.jsonNew.queryParams.idPersona = params["idPersona"];
    });
  }

  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
    this.activo[modulo] = 'activeLinks';
    this._router.navigate(['/principal/admision/' + modulo]);
  }

  ngOnInit() {
  }

}
