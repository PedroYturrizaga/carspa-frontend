import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-content',
  templateUrl: './compra-content.component.html',
  styleUrls: ['./compra-content.component.scss']
})
export class CompraContentComponent implements OnInit {

  private activado: any = {
    'listarProveedor': "titulo" ,
    'listarMaterialProveedor': "titulo",
    'ordenCompra': 'titulo',
    'solicitarCotizacion': 'titulo',
    'cotizaciones': 'titulo',
    'reporte': 'titulo'
  
  }
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToModulo(uri) {
    // this.activado.map(item => { this.activado[item] = item == uri ? 'tituloActivo' : 'titulo' })
    for(let x in this.activado){
      this.activado[x] = (x == uri) ? 'tituloActivo' : 'titulo' 
    }
    this._router.navigate(['/principal/compra/' + uri]);
  }

}
