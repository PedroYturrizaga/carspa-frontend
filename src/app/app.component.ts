import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { getCodUsuario, getIpress } from "./shared/auth/storage/cabecera.storage";
import { getToken } from "./shared/auth/storage/token.storage";
import {FormControl} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  private id;
  constructor(private toastr: ToastsManager, vRef: ViewContainerRef, private _router: Router, private _route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vRef);
    
    // this._route.queryParams.subscribe(params => {
    //   this.id = params["codeGETPASSWORD"];
    //   if(this.id != undefined || this.id != null){
    //     this.ngOnInit();
    //   }
    // });
    if (getCodUsuario() == null && getIpress() == null && getToken() == null) {
      // this._router.navigate(['login']);
    // } else {
      // this._router.navigate(['principal']);

    }
  }

  ngOnInit() {   
   this._router.navigate(['principal']);

  
  }
}
