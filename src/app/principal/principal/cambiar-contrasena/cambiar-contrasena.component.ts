import { Component, OnInit } from '@angular/core';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { MenuPrincipalService } from './../../services/menu-principal.service';
import { ToastsManager, Toast } from 'ng2-toastr';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
  providers: [MenuPrincipalService]
})
export class CambiarContrasenaComponent implements OnInit {

  private contrasenaAct = "";
  private nuevaPassword = "";
  private confirmarPassword = "";
  private type = "password";
  private type2 = "password";
  private type3 = "password";
  private changePassword: any = {};
  constructor(public dialogRef: MatDialogRef<CambiarContrasenaComponent>,
              private _menuPrincipalService: MenuPrincipalService,
              private toastr: ToastsManager,) { }


  enter(event) {
    if(event == 'type')
    { 
      this.type = "text";
    }
    if(event == 'type2')
    {
      this.type2 = 'text';
    }
    if(event == "type3")
    {
      this.type3 = 'text';
    }
  }
  leave(event) {
    if(event == "type")
    {
      this.type = 'password';
    }
    if(event == "type2")
    {
      this.type2 = 'password';
    }
    if(event == "type3")
    {
      this.type3 = 'password';
    }
  }
  dismiss(){
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close(1);
  }
  private cambiarContrasena(_controlVar: any){
    if(isInvalid(_controlVar)){
      return;
    }
    this.changePassword = {
      "pOldPassword": this.contrasenaAct,
      "pNewPassword": this.nuevaPassword
    };
    this._menuPrincipalService.updatePassword(this.changePassword)
      .subscribe(data => {
        if (data.estado == 1) {
          this.toastr.success("Contraseña Actualizada", "");
          this.close();
        }
        else {
          this.toastr.warning(data.mensaje, "");
          console.log(data.mensaje);
        }
      },
        error => {
          this.toastr.error("Error al Actualizar Contraseña, volver a intentar", "");
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }
  private isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
  }
  ngOnInit() {
  }

}
