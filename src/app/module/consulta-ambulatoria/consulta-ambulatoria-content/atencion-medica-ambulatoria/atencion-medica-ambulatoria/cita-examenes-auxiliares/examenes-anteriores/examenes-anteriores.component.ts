import { number } from './../../../../../../../shared/helpers/custom-validators/ng4-validators/number/validator';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CitaExamenesAuxiliaresService } from '../../../../../services/cita-examenes-auxiliares.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';


import { MatTableDataSource, MatIconRegistry, MatPaginator } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-examenes-anteriores',
  templateUrl: './examenes-anteriores.component.html',
  styleUrls: ['./examenes-anteriores.component.scss']
})
export class ExamenesAnterioresComponent implements OnInit {
  //tabla1
  // displayedColumns = ['descripcionExamenTipo', 'codigoCpt', 'descripcionCpt', 'feCita', 'resultado'];
  // dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) matPag: MatPaginator;
  @Input() idPersona;
  @Input() idAtencionEncriptado;

  private examenesTipos: any[] = [];
  private ExamenAnteriores: any[] = [{ ordenExamenDetalleList: [{ codigoCpt: null, descripcionCpt: null, feCita: null }] }];
  private ExamenesAnteriores = { idPersona: null, idTipoExamen: null, feDesde: null, feHasta: null };
  private pagination: any;
  private displayedSizes = [5, 10, 15, 20];
  private pageSize: number;

  private _params: any = { idTipoExamen: null, feDesde: null, feHasta: null };
  private now = new Date();

  constructor(private _examenesApoyoService: CitaExamenesAuxiliaresService,
    private toastr: ToastsManager
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }

  private getObtenerExamenTipos() {
    this._examenesApoyoService.obtenerExamenTipos(this.examenesTipos)
      .subscribe(data => {
        if (data.estado == 1) {
          this.examenesTipos = data.examenTipoList;
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }
  getexamanesanteriores($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerExamenesAnteriores();
  }

  private obtenerExamenesAnteriores(numPagina?: number) {
    this.ExamenesAnteriores.idTipoExamen = this._params.idTipoExamen;
    this.ExamenesAnteriores.idPersona = this.idPersona;

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // if (this._params.feDesde != null || this._params.feHasta != null) {
    this.ExamenesAnteriores.feDesde = (this._params.feDesde != null) ? ((this._params.feDesde).toLocaleDateString('es-PE', options)).split('/').join('-') : this._params.feDesde;
    this.ExamenesAnteriores.feHasta = (this._params.feHasta != null) ? ((this._params.feHasta).toLocaleDateString('es-PE', options)).split('/').join('-') : this._params.feHasta;
    // }

    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.ExamenesAnteriores).forEach(key => {
      this.ExamenesAnteriores[key] = (this.ExamenesAnteriores[key] === '') ? null : this.ExamenesAnteriores[key];
    });

    this.ExamenesAnteriores = {
      ...this.ExamenesAnteriores,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    //console.log(this.ExamenesAnteriores);
    this._examenesApoyoService.obtenerExamenesAnteriores(this.ExamenesAnteriores)
      .subscribe(data => {
        //console.log(data);
        if (data.estado == 1) {
          this.ExamenAnteriores = data.ordenExamenList;
          // this.dataSource = new MatTableDataSource(this.ExamenAnteriores);
          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }
          if (this.ExamenAnteriores.length > 0) {
            this.pagination.nuRegisMostrar = this.ExamenAnteriores[0].nuTotalReg;
          } else {
            this.toastr.warning("No se Encontran Datos");
          }
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          this.toastr.error("Error al listar");
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  // private buscarPorFiltro() {
  //   if ((this.ExamenesAnteriores.idTipoExamen == null || this.ExamenesAnteriores.idTipoExamen == 0) && (this.ExamenesAnteriores.feDesde == null || this.ExamenesAnteriores.feHasta == null || this.ExamenesAnteriores.feDesde == "" || this.ExamenesAnteriores.feHasta == "")) {
  //     this.toastr.warning("Debe ingresar Datos de busqueda");
  //   } else {

  //     this.obtenerExamenesAnteriores();
  //     //  this.ExamenesAnteriores.idTipoExamen = 0;
  //     //  this.ExamenesAnteriores.feDesde = null;
  //     //  this.ExamenesAnteriores.feHasta = null;
  //   }
  // }
  ngOnInit() {
    this.getObtenerExamenTipos();
    this.obtenerExamenesAnteriores();
  }

}
