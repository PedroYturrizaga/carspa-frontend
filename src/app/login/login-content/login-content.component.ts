import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import * as $ from 'jquery';
import { saveCodUsuario ,saveIpress, saveIdUsuario, saveSubAct, saveidNivelIPRESS} from "../../shared/auth/storage/cabecera.storage";
import { saveToken, removeSession} from "../../shared/auth/storage/token.storage";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],  
  providers: [LoginService]
})
export class LoginContentComponent implements OnInit {
  private id;
  constructor(private loginService: LoginService, private _router: Router, private _route: ActivatedRoute,private toastr: ToastsManager, ) { 
    this._route.queryParams.subscribe(params => {
      this.id = params["id"];
    });
  }
  private usuarioID:String = null;
  private contrasena:String = null;
  private listIpress:any [] = null;
  private comboIpress:any = null;
  private flgComboIpress:Boolean = false;
  private accessToken:any;
  private type = "password";
  private step = 0;
  private showIt = false;
  private correoRecuperar = "";
  
  enter(){
    this.type = "text";
  }
  leave(){
    this.type = "password";
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep(_controlVar: any) {
    this.step++;
    _controlVar.reset();
  }
  prevStep(_controlVar: any) {
    this.step--;
    _controlVar.reset();
  }
  getAccessToken(_controlVar: any) {
    this.toastr.success("Exitoso", "Inicio de Sesion");

    this._router.navigate(['principal']);
    // if (isInvalid(_controlVar)) {
    //   return;
    // }
    // this.showIt = true;
    // removeSession();
    // let promise = new Promise((resolve, reject) => {
    // this.flgComboIpress = false;
    // this.comboIpress = null;
    //       let userDAO = {usuarioID : this.usuarioID,
    //                     contrasena : this.contrasena};
    //           console.log(userDAO);
                        
    //       this.loginService.solicitarToken(userDAO)
    //         .toPromise().then(data => {
              
    //           this.accessToken = data;
              
    //           if (this.accessToken.error == null) {
                
    //             saveToken(this.accessToken.accessToken);
    //             saveCodUsuario(userDAO.usuarioID.toString());
                
    //             // --------------------
    //             this.loginService.getIpress()
    //             .toPromise().then(data => {
                  
    //               if(data.estado == 1){
    //                 this.listIpress = [];
    //                 this.listIpress = data.ipress;

    //                 if(this.listIpress.length != 0){
                      
    //                   saveIdUsuario(this.listIpress[0].idPersonal);

    //                   if(this.listIpress.length > 1){
    //                     this.flgComboIpress = true;
    //                   }else if(this.listIpress.length == 1){
    //                     this.flgComboIpress = false;
    //                     this.comboIpress = this.listIpress[0];
    //                     this.chooseIpress();
    //                   }else if(this.listIpress.length == 0){
    //                     removeSession();
    //                     this.flgComboIpress = false;
    //                   }
    //                 }
    //               }
    //             },
    //             err => {
    //               console.log(err);
    //             })
    //             // --------------------

    //           } else {
    //             this.toastr.error("Usuario y/o Contraseña Incorrecto", "Error");
    //             this.showIt = false;
    //             removeSession();
    //           }
    //         },
    //           err => {
    //             console.log(err);
    //           })
    //     })
    //     return promise
  }

  chooseIpress(){
    if(this.comboIpress == null  || this.comboIpress == undefined){
      return;
    }
    this.toastr.success("Exitoso", "Inicio de Sesion");
    this.showIt = false;
    saveSubAct(this.comboIpress.subAc.toString());
    saveidNivelIPRESS(this.comboIpress.idNivel.toString());
    saveIpress(this.comboIpress.idIPRESS.toString());
    this._router.navigate(['principal']);
  }
  private recuperarUsuario(_controlVar: any){
    if (isInvalid(_controlVar)) {
      return;
    }
  }
  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
  }
  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  ngOnInit() {
    // this._router.navigate(['principal']);
  }
}
