import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { CrearEspecialidadComponent } from './crear-especialidad/crear-especialidad.component';
import { EliminarEspecialidadComponent } from './eliminar-especialidad/eliminar-especialidad.component';

//import para usar tablas
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EspecialidadService } from './../../services/especialidad.service';



@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  displayedColumns = ['id', 'especialidad', 'abreviatura', 'eliminar'];
  dataSource = new MatTableDataSource();


  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private lsEspecialidad = [];
  private Param = { descripcionEspecialidad: "" };


  constructor(public _EspecialidadService: EspecialidadService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog) {
    // Paginacion
    this.paginator = { numPagina: 1, numMostrarPagina: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];
  }



  ngOnInit() {
    this.obtenerEspecialidad(1);
    
  }


  busqueda(target) {
    if (target.length % 2 == 0) {
      this.obtenerEspecialidad(1);
    }
  }

  private pageEvent($event: any) {
    this.paginator.numPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerEspecialidad();
  }

  private obtenerEspecialidad(numPagina?: any) {
    
    console.log(this.Param);

    this.paginator.numPagina = (numPagina) ? numPagina : this.paginator.numPagina;

    Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    });

    this.Param = {
      ...this.Param,
      ...this.paginator,
      numMostrarPagina: this.pageSize
    };
    console.log(this.Param);
    this._EspecialidadService.getEspecialidad(this.Param).subscribe(data => {
      if (data.estado == 1) {
        console.log(data);
        this.lsEspecialidad = data.especialidadList;
        console.log(this.lsEspecialidad);
        this.dataSource = new MatTableDataSource(this.lsEspecialidad);
        if (this.matPaginator) {
          this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
        }

        if (this.lsEspecialidad.length > 0) {
          this.paginator.numMostrarPagina = this.lsEspecialidad[0].nuTotalReg;
          
        }


      } else {
        this.toastr.error(data.mensaje);
      }
    },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');  
  
  }

  crearEspecialidad() {
    const dialogRef = this._modalDialog.open(CrearEspecialidadComponent,
      {
        autoFocus: false,
        // maxWidth: '80%',
        // width: '30%',
        // maxHeight: '60%',
        // height: '160%',
        disableClose: true,
        hasBackdrop: true,
      }); 
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.obtenerEspecialidad();
        }
      });

  }

  eliminarEspecialidad(idEspecialidad) {
    console.log(idEspecialidad);
    const dialogRef = this._modalDialog.open(EliminarEspecialidadComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.idEspecialidad = idEspecialidad;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.Param.descripcionEspecialidad = null;
        this.obtenerEspecialidad(1);
      }
    });
  }
}

