import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-previsualizar-detalle',
  templateUrl: './previsualizar-detalle.component.html',
  styleUrls: ['./previsualizar-detalle.component.scss']
})
export class PrevisualizarDetalleComponent implements OnInit {


  decimal:any

  @Input() list = [{ precioSubTotal: null }];

  displayedColumns4 = ['numeroDetalle', 'fecha', 'descripcionArea', 'nombreItem', 'cantidad', 'precioUnitario', 'precioSubTotal']
  dataSource4 = new MatTableDataSource();

  private total = 0.00;
  constructor(
    public dialogRef: MatDialogRef<PrevisualizarDetalleComponent>
  ) { }

  ngOnInit() {
    this.previsualizarDetalleOrdenPago();
  }

  private sumar() {
    for (let x of this.list) {
      x['precioUnitario'] = parseFloat(x['precioUnitario']).toFixed(2);
      console.log("mi precio unitario es"+ parseFloat(x['precioUnitario']).toFixed(2)    )
      this.total = Number(x['precioSubTotal']) + this.total;
      this.decimal=parseFloat(""+this.total).toFixed(2);
      console.log("mi decimal es"+this.total)
    }
  }


  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  public previsualizarDetalleOrdenPago() {
    console.log("Confirmar Detalle");
console.log(this.list);

    this.dataSource4 = new MatTableDataSource(this.list);
    this.sumar();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close(add) {
    this.dialogRef.close(add);
  }

}
