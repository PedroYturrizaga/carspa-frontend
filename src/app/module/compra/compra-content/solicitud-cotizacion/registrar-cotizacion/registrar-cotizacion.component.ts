import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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
    private toastr: ToastsManager) { }

  ngOnInit() {
  }

  getObtenerComparativo(){
    this._solicitudCotizacionService.getcomparativo(this.solicitud)
    .subscribe(data => {
      if (data.estado == 1) {
        this.comparativoList = data.proveedorList;
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
}
