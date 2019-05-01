import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent implements OnInit {

  private activo: any[] = [{ aprobacionActive: "links2", registroActive: "links2"}];
        
  constructor(private _router: Router,) { }

  
  goToAprobacion() {
    this.activo = [{ aprobacionActive: "activeLinks2", registroActive: "links2"}];
    this._router.navigate(['/principal/admision/programacion/aprobacion-personal']);
  }
  goRegistro() {
    this.activo = [{ aprobacionActive: "links2", registroActive: "activeLinks2"}];
    this._router.navigate(['principal/admision/programacion/programacion-personal']);
  }

  ngOnInit() {
    this.goToAprobacion();
  }

}
