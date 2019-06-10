import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-visualizar-oc',
  templateUrl: './visualizar-oc.component.html',
  styleUrls: ['./visualizar-oc.component.scss']
})
export class VisualizarOcComponent implements OnInit {

  displayedColumnsMaterialOC = ['codigo', 'nombreMaterial', 'cantidad', 'precio'];
  dataSourceMaterialOC = new MatTableDataSource();

  private jsonOrdenCompra = {
    codigoOrdenCompra: 20190605001,
    feOrdenCompra: '2019-06-05',
    nombreProveedor: 'GoodGears SAC'
  }

  private total: number = 0;

  private ordenCompraDetalleList = [];

  constructor() { }

  ngOnInit() {
    this.getOrdenCompraDetalle();
  }

  getOrdenCompraDetalle() {
    this.ordenCompraDetalleList = [
      { codigo: '12', nombreMaterial: 'silicona Liquida', cantidad: 12, precio: 18.5 },
      { codigo: '22', nombreMaterial: 'cera barra', cantidad: 5, precio: 19.5 },
      { codigo: '23', nombreMaterial: 'abrillantador super', cantidad: 82, precio: 1.5 }
    ];
    this.dataSourceMaterialOC = new MatTableDataSource(this.ordenCompraDetalleList);

    this.ordenCompraDetalleList.map(_ite => { this.total = this.total + _ite.precio })

  }
}
