import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionAprobacionService } from '../../../../services/programacion-aprobacion.service';
import { ToastsManager } from 'ng2-toastr';
import { FechaService } from '../../../../../../shared/services/fecha.service';

import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatDatepicker, MatPaginatorIntl } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.scss']
})
export class AprobacionComponent implements OnInit {
  //tabla1
  displayedColumns = ['nombreApellido', 'HNP', 'HNA', 'HNS', 'HEP', 'HEA', 'HES', 'Ver'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['areaDescripcion', 'horasNormalesProgramadas', 'horasNormalesAprobadas', 'horasNormalesSuspendidas', 'horasExtrasProgramadas', 'horasExtrasAprobadas', 'horasExtrasSuspendidas'];
  dataSource1 = new MatTableDataSource();

  @Input() mivartiable;
  private especialidades: any[] = [];
  private areas: any[] = [];
  private personales: any[] = [];

  private meses: any[];
  private anios: any[];
  private flVisible: boolean = false;
  private descEspecialidad: string = null;
  private descMes: string = null;
  private descanio: string = null;
  //private minombre2: String = 'JGBS';

  private paramJson: any = { idPersonal: null, idEspecialidad: null, anio: null, mes: null };
  private detalleDisabled: boolean = true;

  constructor(
    private _programacionAprobacionService: ProgramacionAprobacionService,
    private toastr: ToastsManager,
    private _fechaService: FechaService
  ) { }

  private paramOption: any[] = [{ idEspecialidad: null }, { anio: null }, { mes: null }];
  private aprobRequest = { idEspecialidad: null, anio: null, mes: null };

  private getAllEspecialidades() {
    this._programacionAprobacionService.getAllEspecialidades()
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidades = data.especialidadList;
          console.log(this.especialidades);
          this.aprobRequest.idEspecialidad = 0;
        }
        else if (data.estado == 0) {
          console.log(data.mensaje);
        }
        else {
          console.log(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
        });
  }


  private getAllAreasHosp() {
    // this.paramOption[0].idEspecialidad=this.aprobRequest.idEspecialidad;
    // this.paramOption[0].anio=this.aprobRequest.anio;
    // this.paramOption[0].mes=this.aprobRequest.mes;
    this._programacionAprobacionService.getAllAreasHosp(this.aprobRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.areas = data.areaProgramadaList;
          this.dataSource1 = new MatTableDataSource(this.areas);
        }
        else if (data.estado == 0) {
          this.toastr.dispose();
          this.areas = data.areaProgramadaList;
          this.toastr.warning(data.mensaje, "Areas");
          this.dataSource1 = new MatTableDataSource(this.areas);
        }
        else if (data.estado == -1) {
          //console.log(data.mensaje);
          this.toastr.error(data.mensaje, "Areas");
        }
      },
        error => {
          console.error(error);
        });
  }


  private getAllProgramacionPersonales() {
    // this.paramOption[0].idEspecialidad=this.aprobRequest.idEspecialidad;
    // this.paramOption[0].anio=this.aprobRequest.anio;
    // this.paramOption[0].mes=this.aprobRequest.mes;
    if (this.aprobRequest.idEspecialidad == 0 || this.aprobRequest.anio == 0 || this.aprobRequest.mes == 0) {
      this.toastr.error("Debe seleccionar mes , año y especialidad para realizar la busqueda", "Aprobar Programación");
      return;
    }
    this._programacionAprobacionService.getAllPersonales(this.aprobRequest)
      .subscribe(data => {
        console.log(data)
        if (data.estado == 1) {
          this.personales = data.personalProgramadoList;
          for (let p of this.personales) {
            p.disable = "";
            (p.horasNormalesProgramadas == "0 h" && p.horasNormalesAprobadas.substring(0, 3) == "0 h" &&
              p.horasNormalesSuspendidas == "0 h" && p.horasExtrasProgramadas == "0 h" &&
              p.horasExtrasAprobadas.substring(0, 3) == "0 h" && p.horasExtrasSuspendidas == "0 h") ? p.disable = true : p.disable = false;
            // p.disable = "matardisabled";
          }
          this.dataSource = new MatTableDataSource(this.personales);

          for (let a of this.especialidades) {
            if (a.idEspecialidad == this.aprobRequest.idEspecialidad) {
              this.descEspecialidad = a.descripcionEspecialidad;
            }
          }
          for (let b of this.meses) {
            if (b.id == this.aprobRequest.mes) {
              this.descMes = b.valor;
            }
          }
          this.descanio = this.aprobRequest.anio;
        }
        else if (data.estado == 0) {
          this.toastr.warning(data.mensaje, "Personales");
          this.personales = null;
          this.dataSource = new MatTableDataSource(this.personales);
          //this.toastr.dispose();
        }
        else if (data.estado == -1) {
          this.toastr.error(data.mensaje, "Personales");
          this.personales = null;
          this.dataSource = new MatTableDataSource(this.personales);
        }
        this.flVisible = false;
        if (this.personales != null) {
          this.flVisible = true;
        }
      },
        error => {
          console.error(error);
        })
  }

  public obtenerMeses() {
    this._fechaService.obtenerMeses()
      .subscribe(data => {
        this.meses = data;
        this.aprobRequest.mes = 0;
      },
        error => {
          console.error(error);
        });
  }

  public obtenerAnios() {
    this._fechaService.obtenerAnios()
      .subscribe(data => {
        this.anios = data;
        this.aprobRequest.anio = 0;
      },
        error => {
          console.error(error);
        });
  }

  redirige(idPersonal, idEspecialidad, anio, mes) {
    this.paramJson.idPersonal = idPersonal;
    this.paramJson.idEspecialidad = idEspecialidad;
    this.paramJson.anio = anio;
    this.paramJson.mes = mes;
    this.detalleDisabled = false;
    
  }

  ngOnInit() {
    this.getAllEspecialidades();
    this.obtenerMeses();
    this.obtenerAnios();
    //this.getAllAreasHosp();
    //this.getAllProgramacionPersonales();
  }

}
