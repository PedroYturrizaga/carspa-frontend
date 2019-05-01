import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {


  private paginationParameterNivel = { nuPagina: 1, total_rows: 0 };
  private paginationParameterOcupacional = { nuPagina: 1, total_rows: 0 };
  private paginationParameterPagina = { nuPagina: 1, total_rows: 0 };

  constructor() { }

  ngOnInit() {
  }
}
