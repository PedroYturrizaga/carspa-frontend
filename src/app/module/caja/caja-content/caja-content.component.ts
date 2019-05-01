import { DataService } from './../../../shared/services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { setPagesList, getChildrenRoutes, setArrayRoute } from './../../../shared/auth/storage/pages.storage';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-caja-content',
  templateUrl: './caja-content.component.html',
  styleUrls: ['./caja-content.component.scss']
})
export class CajaContentComponent implements OnInit {

  private activo: any = {};
  private arrayChilds: any[] = [];
  private arrayUris: any[] = [];
  private jsonUris: any = {};

  //CAMBIAR ESTILO
  dataPassed: any;
  subscription: Subscription;
  //------
  constructor(
    private _router: Router,
    private ds: DataService) {
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
    this.subscription = this.ds.getData().subscribe(x => {
      this.dataPassed = x;
      if (this.dataPassed == 'verificarCitaProc') {
        Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
        this.activo["atencion-medica-ambulatoria"] = 'activeLinks';
      }
      if (this.dataPassed == 'goToAtencionProcedimiento') {
        Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
        this.activo["atencion-de-procedimientos"] = 'activeLinks';
      }
    });
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
  goToModulo(modulo) {
    Object.keys(this.activo).forEach(key => this.activo[key] = 'links');
    this.activo[modulo] = 'activeLinks';
    this._router.navigate(['/principal/caja/' + modulo]);
  }
  ngOnInit() {
  }

}
