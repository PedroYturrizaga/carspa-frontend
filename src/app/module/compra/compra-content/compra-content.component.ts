import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-content',
  templateUrl: './compra-content.component.html',
  styleUrls: ['./compra-content.component.scss']
})
export class CompraContentComponent implements OnInit {

  private activado: any = {
    'listar-proveedor': "titulo" ,
    'listar-material-proveedor': "titulo"
  
  }
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToModulo(uri) {
    this.activado[uri] = "tituloActivo"
    this._router.navigate(['/principal/compra/' + uri]);
  }

}
