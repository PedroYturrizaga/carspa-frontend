import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-content',
  templateUrl: './inventario-content.component.html',
  styleUrls: ['./inventario-content.component.scss']
})
export class InventarioContentComponent implements OnInit {

  private activado: any = {
    'administrarMaquinaria': "titulo",
    'administrarMaterial': 'titulo',
    'controlarStock': 'titulo',
    'reportes': 'titulo'
  }
  constructor(private _router: Router) { }
  
  ngOnInit() {

  }

  goToModulo(uri) {
<<<<<<< Updated upstream
    // this.activado[uri] = "tituloActivo"
    for(let x in this.activado){
      this.activado[x] = (x == uri) ? 'tituloActivos' : 'titulo' 
=======
    for(let x in this.activado){
      this.activado[x] = (x == uri) ? 'tituloActivo' : 'titulo' 
>>>>>>> Stashed changes
    }
    this._router.navigate(['/principal/inventario/' + uri]);
    // $('.colorMenu3').removeClass('vete');
  
  }


}
