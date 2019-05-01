import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { RecetaService } from '../../../../../services/receta.service';
import { VisualizarDetalleRecetaComponent } from './visualizar-detalle-receta/visualizar-detalle-receta.component';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort , MatDialogRef} from '@angular/material';

import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.scss']
})
export class BuscarRecetaComponent implements OnInit {
  //probando
  @Input() idPersona;
  @ViewChild(MatSort) matSort: MatSort;

  private displayedColumns: string[];
  private displayedSizes: number[];
  private pageSize: number;
  private matDataSource: MatTableDataSource<any>;
  private pagination: any;
  private fechaInicio = null;
  private fechaFin = null;
  private params = { idPersona: null, feInicio: null, feFin: null, nuPagina: 1, nuRegisMostrar: 10 };
  private recetas: any[] = [];
  private now = new Date();
  constructor(
    private _recetaService: RecetaService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe(params => {
      this.idPersona = params["idPersona"];
    });
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };

    this.displayedSizes = [5, 10, 25, 100];

    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.params.idPersona = this.idPersona;
    this.getRecetasAnteriores();
  }

  private getRecetasAnteriores() {
    // debugger
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if ((this.fechaInicio !== null && this.fechaInicio !== null) && (this.fechaFin !== '' && this.fechaFin !== '')) {
      
      this.params.feInicio = ((this.fechaInicio).toLocaleDateString('es-PE', options)).split('/').join('-');
      this.params.feFin = ((this.fechaFin).toLocaleDateString('es-PE', options)).split('/').join('-');
    }
    this.params.nuPagina = this.pagination.nuPagina;
    this.params.nuRegisMostrar = this.pageSize;
    console.log(this.params);
    this._recetaService.getRecetasAnteriores(this.params)
      .subscribe(data => {
        console.log(data);
        if (data.estado == 1) {
          console.log(data);
          this.recetas = data.recetaCabeceraList;
        } else {
          this.toastr.error(data.mensaje);
        }
      },err => { this.toastr.error(err) },
        () => {
          if (this.recetas !== null && this.recetas.length > 0) {
            //this.paginationParameter.total_rows = this.recetas[0].nuTotalReg;
            this.pagination.nuRegisMostrar = this.recetas[0].nuTotalReg;
            this.displayedColumns = ['Fecha', 'ActoMedico', 'AreaOrigen', 'EspecialidadOrigen', 'NumReceta', 'Accion'];
            this.matDataSource = new MatTableDataSource(this.recetas);
            this.matDataSource.sort = this.matSort;
          }
        });
  }

  private pageEvent(_$event: any) {
    this.pagination.nuPagina = _$event.pageIndex + 1;
    this.pageSize = _$event.pageSize;
    this.getRecetasAnteriores();
  }

  private modalVisualizarDetalleReceta(idReceta) {
    const dialogRef = this.dialog.open(VisualizarDetalleRecetaComponent, {
      autoFocus: false,
      maxWidth: '80%',
      width: '60%',
      maxHeight: '95%',
      disableClose: true
    });
    dialogRef.componentInstance.idReceta = idReceta;
    dialogRef.afterClosed().subscribe(result => { });
    
  }

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }

}
