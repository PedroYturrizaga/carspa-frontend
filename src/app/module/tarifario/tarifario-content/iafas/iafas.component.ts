import { ModalConfirmacionComponent } from './../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { EditarIafaComponent } from './editar-iafa/editar-iafa.component';
import { element } from 'protractor';
import { CrearIafaComponent } from './crear-iafa/crear-iafa.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr';
import { isInvalid } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
//para usaar tablas
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IafasService } from '../../services/iafas.service';
@Component({
  selector: 'app-iafas',
  templateUrl: './iafas.component.html',
  styleUrls: ['./iafas.component.scss']
})
export class IafasComponent implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  displayedColumns = ['codigoIafa', 'nombre', 'flagEnUso', 'flagPropio', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource();

  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private listaIafas = [];
  //nuRegisMostrar: 10, nuPagina: 1,
  private Param = { coEntilden: null, codIafa: null, nombre: null, flagPropio: null, flagEnUso: null, flagTodos: null };


  constructor(public _IafaService: IafasService,
    private toastr: ToastsManager,
    private _modalDialog: MatDialog, ) {
    // Paginacion
    this.paginator = { nuPagina: 1, nuRegisMostrar: null };
    this.displayedSizes = [5, 10, 25, 115];
    this.pageSize = this.displayedSizes[0];
  }

  ngOnInit() {
    this.Param.flagTodos = true;
    if (this.Param.flagEnUso == 0) {
      this.Param.flagEnUso = null;
    }
    if (this.Param.flagPropio == 0) {
      this.Param.flagPropio = null;
    }

    this.obtenerIafas()
  }
  changeTodo() {
    if (this.Param.flagTodos) {
      this.Param.flagPropio = null
      this.Param.flagEnUso = null
    } 
    // else {
    //   this.Param.flagPropio = this.Param.flagPropio ? 1 : 0
    //   this.Param.flagEnUso = this.Param.flagEnUso ? 1 : 0
    // }
  }
  changeNoTodos() {
    if (this.Param.flagEnUso != null || this.Param.flagPropio != null) {
      this.Param.flagTodos = null
    }
  }
  busqueda(target) {
    console.log(target);
    if (target.length % 3 == 0) {
      this.paginator = { nuPagina: 1, nuRegisMostrar: null };
      this.pageSize = this.displayedSizes[0];
      this.matPaginator.pageIndex = 0;
      this.obtenerIafas();
    }
  }
  private pageEvent($event: any) {
    this.paginator.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerIafas();
  }

  private obtenerIafas(numPagina?: any) {
    this.paginator.nuPagina = (numPagina) ? numPagina : this.paginator.nuPagina;

    Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
    });

    this.Param.flagPropio = this.Param.flagPropio ? 1 : null
    this.Param.flagEnUso = this.Param.flagEnUso ? 1 : null
    
    if (this.Param.flagTodos) {
      this.Param.flagPropio = null
      this.Param.flagEnUso = null
    }
    
    // else{
    //   this.Param.flagPropio = this.Param.flagPropio ? 1 : 0
    //   this.Param.flagEnUso = this.Param.flagEnUso ? 1 : 0
    // }


    // if (this.Param.flagEnUso == 0) {
    //   this.Param.flagEnUso = null;
    // }

    // if (this.Param.flagPropio == 0) {
    //   this.Param.flagPropio = null;
    // }

    this.Param = {
      ...this.Param,
      ...this.paginator,
      nuRegisMostrar: this.pageSize
    };
    console.log(this.Param);
    this._IafaService.obtenerIafas(this.Param)
      .subscribe(data => {
        if (data.estado == 1) {
          //this.listaIafas = [];
          this.listaIafas = data.listaIafas;
          console.log(this.listaIafas);
          let count = ((this.paginator.nuPagina - 1) * this.pageSize) + 1
          this.listaIafas.forEach(element => {
            element["index"] = count
            count++
          });
          this.dataSource = new MatTableDataSource(this.listaIafas);

          if (this.matPaginator) {
            this.matPaginator._pageIndex = (numPagina) ? numPagina - 1 : this.matPaginator._pageIndex;
          }

          if (this.listaIafas.length > 0) {
            this.paginator.nuRegisMostrar = this.listaIafas[0].nuTotalReg;
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
  crearIafa() {
    const dialogRef = this._modalDialog.open(CrearIafaComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      width: '30vw',
      // height: '30vw',
      // height: '200%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerIafas();
      }
    });
  }
  editar(element) {
    const dialogRef = this._modalDialog.open(EditarIafaComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      width: '30vw',
      // maxHeight: '80%',
      // height: '200%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.flagPropio = 1;
    dialogRef.componentInstance.element = element;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.id == 1) {
          this.toastr.success(result.mensaje);
          this.obtenerIafas(1);
        } else {
          this.toastr.error(result.mensaje);
        }
      }
    });
  }
  eliminar(element) {
    console.log(element)
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar la Iafa " + element.nombre + "?";
console.log();

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this._IafaService.deleteIafa(element.coEntilden)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.obtenerIafas(1);
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
        this.Param.nombre = null;
        this.obtenerIafas(1);

      }
    });
  }

}

