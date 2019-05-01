import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { RecetaService } from '../../../../../services/receta.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-medicamento',
  templateUrl: './buscar-medicamento.component.html',
  styleUrls: ['./buscar-medicamento.component.scss']
})
export class BuscarMedicamentoComponent implements OnInit {

  @Input() medicamentoRequest;
  @Input() recetaCabezeraRequest;
  private busquedaRequest: any[] = [{ idAlmacen: null, cum: null, descripcionMedicamento: null, nuPagina: null, nuRegisMostrar: null }];
  private paginationParameter = { nuPagina: 1, total_rows: 0 };
  private medicamentos: any[] = [];
  constructor(public activeModal: NgbActiveModal,
    private _recetaService: RecetaService,
    private toastr: ToastsManager) { }


  private getMedicamentos() {
    if (this.busquedaRequest[0].idAlmacen == null || this.busquedaRequest[0].idAlmacen == '' || this.busquedaRequest[0].idAlmacen == undefined) {
      this.toastr.error("Debe seleccionar un almacén");
      return;
    }
    if (this.busquedaRequest[0].cum == '' || this.busquedaRequest[0].cum == undefined) {
      this.busquedaRequest[0].cum = null;
    }
    if (this.busquedaRequest[0].descripcionMedicamento == '' || this.busquedaRequest[0].descripcionMedicamento == undefined) {
      this.busquedaRequest[0].descripcionMedicamento = null;
    }
    this._recetaService.getMedicamentos(this.busquedaRequest)
      .subscribe(data => {
        if (data.estado == 1) {
          this.medicamentos = data.medicamentos;
        } else {
          this.toastr.error(data.mensaje);
        }
      },
        err => { this.toastr.error(err) },
        () => {
          if (this.medicamentos.length > 0) {
            this.paginationParameter.total_rows = this.medicamentos[0].nuTotalReg;
          }
        });
  }

  private addMedicamento(idMedicamento) {
    this.recetaCabezeraRequest.receta.idMedicamento = idMedicamento;
    this.medicamentos.forEach(item => {
      if (item.idMedicamento == idMedicamento) {
        this.busquedaRequest[0].cum = item.cum;
        this.busquedaRequest[0].descripcionMedicamento = item.descripcionMedicamento;
        return;
      }
    });
    this.close();
  }

  close() {
    this.activeModal.close();
  }

  ngOnInit() {
    this.busquedaRequest = this.medicamentoRequest;
    this.getMedicamentos();
  }


}
