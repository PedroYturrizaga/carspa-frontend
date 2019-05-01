import { Component, OnInit, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import {
  setQuantifier, setValidatorPattern,
  setInputPattern, isInvalid
} from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-search-paciente',
  templateUrl: './search-paciente.component.html',
  styleUrls: ['./search-paciente.component.scss']
})
export class SearchPacienteComponent implements OnInit {

  displayedColumns = ['descripcionTipoDocumentoIdentidad', 'numeroDocumentoIdentidad', 'apellidoPaterno', 'apellidoMaterno', 'nombres', 'tipoHistoria'];
  dataSource = new MatTableDataSource();

  @Input() tipoDocumento;
  @Input() paciente;
  @Input() flgDatosModal;
  private CombotipoDocumento: String;
  private numeroDocumento: String;
  private apellidoPate: String;
  private apellidoMate: String;
  private nombres: String;
  private flSearchTable: boolean = false;
  private personas: any[] = [];
  private longitudDocumento = "?";

  constructor(
    private _citaService: CitaService,
    public dialogRef: MatDialogRef<SearchPacienteComponent>,
    private toastr: ToastsManager
  ) { }

  private changeInput(tipoDoc) {
    if (tipoDoc == null || tipoDoc == undefined) {
      this.longitudDocumento = "?";
      this.numeroDocumento = null;
    }
    if (tipoDoc == 1) {
      this.longitudDocumento = '8';
    }
    if (tipoDoc == 2) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 3) {
      this.longitudDocumento = '12';
    }
    if (tipoDoc == 4) {
      this.longitudDocumento = '15';
    }
  }
  private clearRequest() {
    this.CombotipoDocumento = null;
    this.numeroDocumento = null;
    this.apellidoPate = null;
    this.apellidoMate = null;
    this.nombres = null;
  }

  private getPersona() {
    if (this.CombotipoDocumento == null || this.CombotipoDocumento == "" || this.CombotipoDocumento == undefined) {
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
    }
    else {
      if (this.numeroDocumento == undefined || this.numeroDocumento == "" || this.numeroDocumento == null) {
        this.toastr.error("Debe ingresar el número de documento", "Gestionar cita");
        return;
      }
    }
    if (this.CombotipoDocumento == "" && this.numeroDocumento == "" && this.apellidoPate == "" && this.apellidoMate == "" && this.nombres == "") {
      this.toastr.error("Debe ingresar un parametro de busqueda", "Gestionar cita");
      return;
    }
    this._citaService.getPaciente(this.CombotipoDocumento, this.numeroDocumento, this.apellidoPate, this.apellidoMate, this.nombres)
      .subscribe(data => {
        this.clearRequest();
        if (data.estado == 1) {
          this.personas = data.pacienteList;
          this.dataSource = new MatTableDataSource(this.personas);
          if (this.personas.length != 0) {
            this.flSearchTable = true;
          } else {
            this.toastr.error("No se encontro resultados", "Gestionar cita");
            this.flSearchTable = false;
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
