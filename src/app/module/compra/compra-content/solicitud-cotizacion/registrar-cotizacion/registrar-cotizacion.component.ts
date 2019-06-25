import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { SolicitudCotizacionService } from '../../services/solicitud-cotizacion.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-registrar-cotizacion',
  templateUrl: './registrar-cotizacion.component.html',
  styleUrls: ['./registrar-cotizacion.component.scss']
})
export class RegistrarCotizacionComponent implements OnInit {
  @Input() solicitud
  displayedColumns = ['material', 'marca', 'cantidad', 'proveedor1', 'proveedor2', 'proveedor3'];
  dataSource = new MatTableDataSource();

  private comparativoList;
  constructor(private _solicitudCotizacionService: SolicitudCotizacionService,
    private toastr: ToastsManager,
    private _dialogRef: MatDialogRef<RegistrarCotizacionComponent>) { }

  private proveedorList = [{ id: 1, nombre: 'Sociedad Comercial' }, { id: 2, nombre: 'Industrias Automotrices' }, { id: 1, nombre: 'Circulo de Belleza' }]
  ngOnInit() {
    console.log(this.solicitud);
    this.getObtenerComparativo();
  }

  getObtenerComparativo() {
    this._solicitudCotizacionService.getcomparativo(this.solicitud)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.comparativoList = data.preciosCotizacionesList;
          this.dataSource = new MatTableDataSource(this.comparativoList);
        } else if (data.estado == 0) {
          this.comparativoList = [];
        } else {
          this.toastr.error(data.mensaje, "Error");
        }
        return true;
      },
        err => console.error(err),
        () => {
        });
  }


  dismiss() {
    this._dialogRef.close();
  }

  confirmacionCorrecta() {
    this._dialogRef.close(1);
  }
}
