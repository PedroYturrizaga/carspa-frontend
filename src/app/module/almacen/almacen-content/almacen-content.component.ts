import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen-content',
  templateUrl: './almacen-content.component.html',
  styleUrls: ['./almacen-content.component.scss']
})
export class AlmacenContentComponent implements OnInit {

  private activado: any = {
    'registrar-material': "titulo",
    'salida-material': 'titulo'
  }
  constructor(private _router: Router) { }

  ngOnInit() {
    $('.pruebon').click(function() {
      $('.todaspartes').addClass('vete');
      $('.colorMenu3').addClass('vete');
    });
  }

  goToModulo(uri) {
    this.activado[uri] = "tituloActivo"
    this._router.navigate(['/principal/almacen/' + uri]);
    $('.colorMenu3').removeClass('vete');
    
  }

}
