import { Component, OnInit, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { ConfirmarSelectCitaComponent } from './confirmar-select-cita/confirmar-select-cita.component';
import { Router } from '@angular/router';

import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource, MatIconRegistry, MatDialogRef } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-cita',
  templateUrl: './select-cita.component.html',
  styleUrls: ['./select-cita.component.scss']
})
export class SelectCitaComponent implements OnInit {
  //tabla
  displayedColumns = ['descIafas', 'descCobertura', 'copagoFijo' , 'copagoVariable', 'descuentoFarm'];
  dataSource = new MatTableDataSource();

  @Input() pacienteConf;
  @Input() coberturaVigente;
  @Input() flgModalConfirmarSelectPlan;
  @Input() flgReprogra;
  @Input() numeroDocumento;
  @Input() CombotipoDocumento;

  constructor(private _citaService: CitaService,
    private router: Router,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<SelectCitaComponent>,
    public dialog: MatDialog) { }

  private planesAescoger: any[] = [];
  private routerRepro: any[] = [];
  private flgBtnConfirmar = false;
  private idCita: number;
  private idPlan: number;
  private descripMedico: String;
  private tipoCita: String;
  private descripServicio: String;
  private descripCobertura: String;
  private descripIafas: String;
  private flgRepro: number;
  private repro: any = {
    numeroDocumento: null, CombotipoDocumento: null, flgOperacion: null, idCita: null,
    flgValidacionRouter: null, clave: null
  };

  buieldListOfPlanes() {
    console.log(this.pacienteConf);

    let variable1 = {
      descIafas: null, descCobertura: null, copagoFijo: null, copagoVariable: null,
      descuentoFarm: null, index: null, idPlan: null, repro: null
    };

    for (let a of this.coberturaVigente) {
      variable1.descIafas = a.descripcionIafas;
      variable1.descCobertura = a.cobertura.descripcionCobertura;
      variable1.copagoFijo = a.cobertura.copagoFijo;
      variable1.copagoVariable = a.cobertura.copagoVariable;
      variable1.descuentoFarm = a.cobertura.descuentoFarmacia1;
      variable1.index = 0;
      variable1.idPlan = a.idPlan;
      variable1.repro = 0;
      // variable1.router = this.pacienteConf.condicionRouter;
      this.planesAescoger.push(variable1);
      variable1 = {
        descIafas: null, descCobertura: null, copagoFijo: null, copagoVariable: null,
        descuentoFarm: null, index: null, idPlan: null, repro: null
      };
    }

    variable1.descIafas = this.pacienteConf.iafas.descripcionIafas;
    variable1.descCobertura = this.pacienteConf.iafas.cobertura.descripcionCobertura;
    variable1.copagoFijo = this.pacienteConf.iafas.cobertura.copagoFijo;
    variable1.copagoVariable = this.pacienteConf.iafas.cobertura.copagoVariable;
    variable1.descuentoFarm = this.pacienteConf.iafas.cobertura.descuentoFarm1;
    variable1.index = 1;
    variable1.idPlan = this.pacienteConf.idPlan;
    variable1.repro = 1;
    // variable1.router = this.pacienteConf.condicionRouter;
    this.planesAescoger.push(variable1);

    this.idCita = this.pacienteConf.idCita;
    this.descripMedico = this.pacienteConf.medicoTratante;
    this.tipoCita = this.pacienteConf.tipoCita;
    this.descripServicio = this.pacienteConf.servicio;
  }

  selectPlan(index) {
    this.routerRepro = [];
    for (let a of this.planesAescoger) {
      a.color = "";
      if (a.index == index) {
        a.color = "bg-primary";
        this.idPlan = a.idPlan;
        this.descripCobertura = a.descCobertura;
        this.descripIafas = a.descIafas;
        this.flgRepro = a.repro;
      }
    }
    this.repro.clave = 0;
    this.repro.numeroDocumento = this.numeroDocumento;
    this.repro.CombotipoDocumento = this.CombotipoDocumento;
    this.repro.flgOperacion = this.pacienteConf.flgOperacion;
    this.repro.idCita = this.pacienteConf.idCita;
    this.repro.flgValidacionRouter = this.flgReprogra;
    if (this.flgReprogra == true) {
      this.repro.clave = 1;
    }
    this.routerRepro.push(this.repro);
    this.flgBtnConfirmar = true;
  }

  confirmarCitaNewPlan(repro) {
    if (repro == 0) {
      const dialogRef = this.dialog.open(ConfirmarSelectCitaComponent, {
        autoFocus: false,
        hasBackdrop: true,
        minWidth: '70%',
        width: '1400px',
        maxHeight: '80%',
        height: '700px',
        disableClose: true
      });

      dialogRef.componentInstance.idCita = this.idCita;
      dialogRef.componentInstance.idPlan = this.idPlan;
      dialogRef.componentInstance.flgModalConfirmarSelectPlan = this.flgModalConfirmarSelectPlan;
      dialogRef.componentInstance.descripMedico = this.descripMedico;
      dialogRef.componentInstance.tipoCita = this.tipoCita;
      dialogRef.componentInstance.descripServicio = this.descripServicio;
      dialogRef.componentInstance.descripServicio = this.descripServicio;
      dialogRef.componentInstance.descripIafas = this.descripIafas;
      dialogRef.afterClosed().subscribe(result => {
        if (this.flgModalConfirmarSelectPlan[0] == 1) {
          this.onNoClick();
        }
      });
     
    } else {
      this.router.navigate(['cita/asignar-cita/' + this.routerRepro[0]['numeroDocumento'] + '/' + this.routerRepro[0]['CombotipoDocumento']
        + '/' + this.routerRepro[0]['flgOperacion'] + '/' + this.routerRepro[0]['idCita'] + '/' + this.flgRepro]);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.buieldListOfPlanes();
  }

}
