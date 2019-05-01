import { Component, OnInit, Input, style } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramacionAprobacionService } from '../../../../../services/programacion-aprobacion.service';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { SuspenderComponent } from './suspender/suspender.component';
import { AprobarTodosComponent } from './aprobar-todos/aprobar-todos.component';
import { SlicePipe } from '@angular/common';

import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatDatepicker, MatPaginatorIntl } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  displayedColumns = ['programacionDia', 'areaDescripcion', 'actividadDescripcion', 'horaInicio', 'horaFin', 'ambienteDescripcion', 'aprobar', 'bloquear', 'suspender', 'estado'];
  dataSource = new MatTableDataSource();


  @Input() paramJson: any = { idPersonal: null, idEspecialidad: null, anio: null, mes: null };

  public detalleProgramacion: any[] = [];
  private totalHoras: any[] = [];
  private confirmacion: any;
  private flAprobadosAll: boolean;

  private nMes: string;
  private estadoP: string = 'Oculto';

  constructor(public _programacionAprobacionService: ProgramacionAprobacionService,
              public route: ActivatedRoute,
              public toastr: ToastsManager,
              // public modalService: NgbModal,
              public dialog: MatDialog) {
                                          this.flAprobadosAll = false;
                                        }

  private liaVaquita: any[];

  private getAllHorasTotal() {
    console.log(this.paramJson);
    
    this._programacionAprobacionService.getAllHorasTotales(this.paramJson)
      .subscribe(data => {
        if (data.estado == 1) {
          this.totalHoras = data.totalHorasPersonalList[0];

          if (data.totalHorasPersonalList[0].mes == 9) {
            data.totalHorasPersonalList[0].mes = "Setiembre";
            this.nMes = "Set";
          }
          else if (data.totalHorasPersonalList[0].mes == 10) {
            data.totalHorasPersonalList[0].mes = "Octubre";
            this.nMes = "Oct";
          }
          else if (data.totalHorasPersonalList[0].mes == 11) {
            data.totalHorasPersonalList[0].mes = "Noviembre";
            this.nMes = "Nov";
          }
          else if (data.totalHorasPersonalList[0].mes == 12) {
            data.totalHorasPersonalList[0].mes = "Diciembre";
            this.nMes = "Dic";
          }
          else if (data.totalHorasPersonalList[0].mes == 8) {
            data.totalHorasPersonalList[0].mes = "Agosto";
            this.nMes = "Ago";
          }
          else if (data.totalHorasPersonalList[0].mes == 7) {
            data.totalHorasPersonalList[0].mes = "Julio";
            this.nMes = "Jul";
          }
          else if (data.totalHorasPersonalList[0].mes == 6) {
            data.totalHorasPersonalList[0].mes = "Junio";
            this.nMes = "Jun";
          }
          else if (data.totalHorasPersonalList[0].mes == 5) {
            data.totalHorasPersonalList[0].mes = "Mayo";
            this.nMes = "May";
          }
          else if (data.totalHorasPersonalList[0].mes == 4) {
            data.totalHorasPersonalList[0].mes = "Abril";
            this.nMes = "Abr";
          }
          else if (data.totalHorasPersonalList[0].mes == 3) {
            data.totalHorasPersonalList[0].mes = "Marzo";
            this.nMes = "Mar";
          }
          else if (data.totalHorasPersonalList[0].mes == 2) {
            data.totalHorasPersonalList[0].mes = "Febrero";
            this.nMes = "Feb";
          }
          else if (data.totalHorasPersonalList[0].mes == 1) {
            data.totalHorasPersonalList[0].mes = "Enero";
            this.nMes = "Ene";
          }
        }
        else if (data.estado == 0) {
          //console.log(data.mensaje)
          this.toastr.warning(data.mensaje, "Totales programación");
        }
        else if (data.estado == -1) {
          //console.log(data.mensaje)
          this.toastr.error(data.mensaje, "Totales programación");
        }
      },
        error => {
          console.error(error);
        })
  }

  private getAllDetalleProgramacion() {
    this._programacionAprobacionService.getAllDetalleProgramacion(this.paramJson)
      .subscribe(data => {
        this.detalleProgramacion = null;
        if (data.estado == 1) {
          this.detalleProgramacion = data.horarioProgramadoList;
          this.dataSource = new MatTableDataSource(this.detalleProgramacion);
          if (this.detalleProgramacion != null) {
            this.estadoP = "Visible";
          }
        }
        else if (data.estado == 0) {
          //console.log(data.mensaje)
          this.toastr.warning(data.mensaje, "Detalle programación");
        }
        else if (data.estado == -1) {
          //console.log(data.mensaje)
          this.toastr.error(data.mensaje, "Detalle programación");
        }
      },
        error => {
          console.error(error);
        })
  }


  // private modalConfirmacionProgramacion(idProgramacion, estadoID) {
  //   this.liaVaquita = [];
  //   const modalRef = this.modalService.open(ConfirmacionComponent, {});
  //   modalRef.componentInstance.idProgramacion = idProgramacion;
  //   modalRef.componentInstance.estadoID = estadoID;
  //   modalRef.componentInstance.liaVaquita = this.liaVaquita;
  //   modalRef.result.then((result) => {
  //     if (this.liaVaquita.length != 0) {
  //       this.getAllDetalleProgramacion();
  //     }
  //   }, (reason) => { });
  // }

  modalConfirmacionProg(idProgramacion, estadoID){
    this.liaVaquita = [];
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      autoFocus: true,
      hasBackdrop: true,
      // width: '700px',
      // height: '350px',
      disableClose: true
    });
    dialogRef.componentInstance.idProgramacion = idProgramacion;
    dialogRef.componentInstance.estadoID = estadoID;
    dialogRef.componentInstance.liaVaquita = this.liaVaquita;
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.liaVaquita);
      if (this.liaVaquita.length != 0) {
        this.getAllDetalleProgramacion();
      }
    });
  }

  public aprobarTodos() {
    var i = 0;
    var failed = false;
    while (i < this.detalleProgramacion.length && !failed) {
      var programacion = this.detalleProgramacion[i];

      var that = this;
      that._programacionAprobacionService
        .aprobarProgramacionSync(programacion.idProgramacion, { "idEstado": "A" })
        .then(function (confirmacion) {
          that.confirmacion = confirmacion;
          if (that.confirmacion.idResultado != 1) {
            console.log(`Aprobación turno: ${programacion.turno.horaInicio} - ${programacion.turno.horaFin} ${that.confirmacion.mensaje}`);
          }
        })
        .catch(function (error) {
          that.confirmacion.mensaje = "Error de servidor."
          that.toastr.error(that.confirmacion.mensaje, "Error");
          failed = true;
        });

      i++;
    }

    if (!failed) {
      this.toastr.success("Programaciones aprobadas exitosamente.", "Mensaje del sistema");
      this.flAprobadosAll = true;
    }

    this.getAllDetalleProgramacion();
  }

  // private modalSuspenderProgramacion(idProgramacion, estadoID) {
  //   this.liaVaquita = [];
  //   const modalRef = this.modalService.open(SuspenderComponent, {});
  //   modalRef.componentInstance.idProgramacion = idProgramacion;
  //   modalRef.componentInstance.estadoID = estadoID;
  //   modalRef.componentInstance.liaVaquita = this.liaVaquita;
  //   modalRef.result.then((result) => {
  //     if (this.liaVaquita.length != 0) {
  //       this.getAllDetalleProgramacion();
  //     }
  //   }, (reason) => {
  //   });
  // }

  modalSuspenderProg(idProgramacion, estadoID){
    this.liaVaquita = [];
    const dialogRef = this.dialog.open(SuspenderComponent, {
      autoFocus: false,
      width: '30%',
      hasBackdrop: true,
      // width: '700px',
      // height: '350px',
      disableClose: true
    });
    dialogRef.componentInstance.idProgramacion = idProgramacion;
    dialogRef.componentInstance.estadoID = estadoID;
    dialogRef.componentInstance.liaVaquita = this.liaVaquita;
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.liaVaquita);
      if (this.liaVaquita.length != 0) {
        this.getAllDetalleProgramacion();
      }
    });
  }


  // private modalConfirmacionTodosProgramacion() {
  //   const modalRef = this.modalService.open(AprobarTodosComponent, {});
  //   modalRef.result.then((result) => {
  //     if (result == 1) {
  //       this.aprobarTodos();
  //     }

  //     this.getAllDetalleProgramacion();
  //   }, (reason) => {
  //     this.getAllDetalleProgramacion();
  //   });
  // }

  modalConfirmacionTodosProg(){
    this.liaVaquita = [];
    const dialogRef = this.dialog.open(AprobarTodosComponent, {
      autoFocus: true,
      hasBackdrop: true,
      // width: '700px',
      // height: '350px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.aprobarTodos();
      }

      this.getAllDetalleProgramacion();
    });
  }

  ngOnInit() {
    this.getAllHorasTotal();
    this.getAllDetalleProgramacion();
  }
}


