import { CitaService } from './../../../../admision/services/cita.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.scss']
})
export class BusquedaClienteComponent implements OnInit {


  displayedColumns = ['descripcionTipoDocumentoIdentidad', 'numeroDocumentoIdentidad', 'apellidoPaterno', 'apellidoMaterno', 'nombres'];
  dataSource = new MatTableDataSource();

  @Input() tipoDocumento;
  @Input() paciente;
  @Input() flgDatosModal;
  private CombotipoDocumento: String;
  private numeroDocumento: String;
  private apellidoPate: String;
  private apellidoMate: String;
  private nombres: String;
  private personas: any[] = [];

  constructor(
    private _citaService: CitaService,
    public dialogRef: MatDialogRef<BusquedaClienteComponent>,
    private toastr: ToastsManager
  ) { }

  private limpiar() {
    this.CombotipoDocumento = null;
    this.numeroDocumento = null;
    this.apellidoPate = null;
    this.apellidoMate = null;
    this.nombres = null;
  }

  private obtenerPersona() {

    this.CombotipoDocumento = "";
    this.numeroDocumento = "";

    if (this.apellidoPate == undefined || this.apellidoPate == "" || this.apellidoPate == null) {
      this.apellidoPate = "";
    }
    if (this.apellidoMate == undefined || this.apellidoMate == "" || this.apellidoMate == null) {
      this.apellidoMate = "";
    }
    if (this.nombres == undefined || this.nombres == "" || this.nombres == null) {
      this.nombres = "";
    }


    if (this.apellidoPate == "" && this.apellidoMate == "" && this.nombres == "") {
      this.toastr.error("Debe ingresar un parámetro de busqueda", "Búsqueda de Pacientes");
      return;
    }
    console.log("---------------")
    console.log(this.CombotipoDocumento);
    console.log(this.numeroDocumento);
    console.log(this.apellidoPate);
    console.log(this.apellidoMate);
    console.log(this.nombres);
    console.log("---------------")
    this._citaService.getPaciente(this.CombotipoDocumento, this.numeroDocumento, this.apellidoPate, this.apellidoMate, this.nombres)
      .subscribe(data => {
        this.limpiar();
        if (data.estado == 1) {
          this.personas = data.pacienteList;
          console.log(this.personas);
          this.dataSource = new MatTableDataSource(this.personas);
          if (this.personas.length != 0) {
          } else {
            this.toastr.error("No se encontro resultados", "Búsqueda de Pacientes");
          }
        } else {
          console.log(data.mensaje);
        }
      },
        error => {
          console.error("Error al Listar");
          return Observable.throw(error);
        }),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private asigPaciente(newPaciente) {
    this.paciente[0] = newPaciente;
    this.flgDatosModal[0] = 1;
    console.log(this.paciente);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  ngOnInit() {
  }

}
