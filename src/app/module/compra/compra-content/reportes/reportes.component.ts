import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  displayedColumnsSolicitudes = ['codigo', 'fecha', 'estado', 'ver'];
  dataSourceSolicitudes = new MatTableDataSource();

  private lsreporte = [{descripcion:'Ranking de Productos'}]
  constructor() { }

  ngOnInit() {
  }

}
