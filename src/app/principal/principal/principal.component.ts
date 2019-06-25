import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { MenuPrincipalService } from '../services/menu-principal.service';
import { setPagesList } from './../../shared/auth/storage/pages.storage';
import { removeSession } from "../../shared/auth/storage/token.storage";
import { getCodUsuario } from "../../shared/auth/storage/cabecera.storage";
import { MatDialog } from '@angular/material';
import { a } from '@angular/core/src/render3';
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [MenuPrincipalService]
})
export class PrincipalComponent implements OnInit {
  private img1 = "assets/images/Iconos/t-cuido.png";;
  private img = "assets/images/Iconos/T.png";
  private imgAvatar = "assets/images/avatars/profile.jpg";

  private params: any = { codigoUsuario: null, flagMaestro: null };
  private paginaList: any[];
  private arrayUris: any[] = [];
  private jsonUris: any = {};
  private activo: any = {};
  private activado = { almacen: "titulo", compra: 'titulo', inventario: 'titulo' }
  
  constructor(
    private _router: Router,
    private toastr: ToastsManager,
    private _menuPrincipalService: MenuPrincipalService,
    public dialog: MatDialog) {

    // this.getMenuPrincipal().then((pages: any[]) => {
    //   if (!pages) {
    //     return;
    //   }
    //   if (pages.length > 0) {
    //     setPagesList(pages);
    //     this.paginaList.forEach(item => {
    //       this.arrayUris.push(item.uri);
    //       this.jsonUris[item.uri] = item.nombrePagina;
    //       this.activo[item.uri] = 'titulo';
    //     });
    //   }
    //   this.goToModulo(this.arrayUris[0]);
    // });
  }


  // private getMenuPrincipal() {
  //   let promise = new Promise((resolve, reject) => {
  //     this._menuPrincipalService.getMenuByCodUsuario(this.params)
  //       .toPromise().then(data => {
  //         if (data.estado == 1) {
  //           this.paginaList = data.paginaList;
  //         } else {
  //           this.toastr.error(data.mensaje);
  //         }
  //         resolve(this.paginaList);
  //       },
  //         err => {
  //           console.log(err);
  //         })
  //   })
  //   return promise;
  // }

  cerrarSesion() {
    removeSession();
    this._router.navigate(['/login']);
  }

  cambiarContrasena() {
    const dialogRef = this.dialog.open(CambiarContrasenaComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      // width: '60%',
      // maxHeight: '95%',
      width: '25%',
      maxWidth: '50%',
      height: '54%',
      maxHeight: '70%',
      disableClose: true,
      panelClass: 'loginPanel'
    });
    // dialogRef.componentInstance.detProcedimiento = detProcedimiento;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == 1) {
        this.cerrarSesion();
      }
    });
  }
  
  visible = true;
  goToModulo(mod) {
    this.visible = !this.visible;
    // Object.keys(this.activo).forEach(key => this.activo[key] = 'titulo');
    for (let x in this.activado) {
      this.activado[x] = (x == mod) ? "tituloActivo" : "titulo" 
    }
    this._router.navigate(['/principal/' + mod]);
    $('.colorMenu3').removeClass('vete');
  }
  
  atras(){
    this.visible =! this.visible;
  }

  // goToModulo(modulo: any) {
  //   console.log(modulo);
  //   Object.keys(this.activo).forEach(key => this.activo[key] = 'titulo');
  //   this.activo[modulo] = 'tituloActivo';
  //   let _params: NavigationExtras = { queryParams: { val: true } }
  //   this._router.navigate(['/principal/' + modulo], _params).then(() => {
  //     //habilita el menu cuando recien carga el modulo
  //     this.isDisabledMenu = false;
  //     this.isDisabledback = false;
  //     this.namModulo = this.jsonUris[modulo];
  //   });
  // }

  ngOnInit() {
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
    $('.menu-icon').click(function() {
      $('.colorMenu3').toggle(0, function(){
        $('.todaspartes').toggleClass('crece');
      });
      // $('.colorMenu3').addClass('vete');
    });
  }

}
