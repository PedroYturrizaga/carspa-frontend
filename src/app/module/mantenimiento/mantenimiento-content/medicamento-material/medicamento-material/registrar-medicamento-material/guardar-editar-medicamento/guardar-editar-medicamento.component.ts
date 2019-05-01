import { Observable } from 'rxjs/Observable';
import { MedicamentoMaterialService } from './../../../services/medicamento-material.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-guardar-editar-medicamento',
  templateUrl: './guardar-editar-medicamento.component.html',
  styleUrls: ['./guardar-editar-medicamento.component.scss']
})
export class GuardarEditarMedicamentoComponent implements OnInit {
  @Input() confirmacion;
  @Input() paramsAccion;
  @Input() medicamento;
  @Input() accion;
  @Input() idUnidadPadre;
  @Input() lsUnidades;

  @Input() grupoRequest;
  @Input() grupoMedicamento;
  flagNew: boolean = false;
  constructor(private _dialogRef: MatDialogRef<GuardarEditarMedicamentoComponent>,
    private _medicamentoMaterialService: MedicamentoMaterialService,
    private _toastr: ToastsManager,
  ) { }

  ngOnChanges() {
    
  }

  private saveMedicamento(): void {
    this.flagNew = true;
    this.pack();
    debugger
    this.medicamento.porcentajeUtilidad = 0.0;
    this.medicamento.unidadCompra = { valor: "Soles", id: 6 };
    // this.medicamento.unidadVenta = { valor: "Soles", id: 8 };
    this.medicamento.descuento = 0.0;

    this.medicamento.idUnidadPadre = this.idUnidadPadre;
    this.lsUnidades.push({ idUnidadPadre: this.medicamento.idUnidadPadre });
    this.medicamento.unidadMedicDispList = this.lsUnidades;

    this._medicamentoMaterialService
      .insertUpdateMedicamento(
        {
          [this.grupoRequest[this.grupoMedicamento.id - 1]]: this.medicamento,
          unidadMedicDispList: this.lsUnidades,
          idUnidadPadre: this.idUnidadPadre.idUnidad
        },
        this.grupoMedicamento.id,
        this.accion)
      .subscribe(data => {
        if (data.estado === 1) {
          this._toastr.success(data.mensaje);
          //this.dismiss();
          this.close();
        } else {
          this._toastr.error(data.mensaje);
        }
      },
        error => {
          this._toastr.error(error);
          return Observable.throw(error);
        }),
      err => this._toastr.error(err),
      () => console.log('Request Complete');
  }
  private pack(): void {
    let keysParams = Object.keys(this.paramsAccion);
    if (this.accion === 2 && this.medicamento !== null) {
      Object.keys(this.medicamento)
        .filter(k => !(keysParams.includes(k) || k.includes('id')))
        .forEach(k => delete this.medicamento[k]);
    }
    else {
      this.medicamento = {};
    }
    keysParams.forEach(key => this.medicamento[key] = this.paramsAccion[key].valor);
  }

  dismiss() {
    this._dialogRef.close();
  }
  close() {
    this._dialogRef.close(1);
  }
  ngOnInit() {
   
  }
}