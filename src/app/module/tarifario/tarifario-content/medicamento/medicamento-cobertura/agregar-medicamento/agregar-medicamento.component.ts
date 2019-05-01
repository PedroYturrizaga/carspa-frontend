import { inject } from '@angular/core/testing';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { ModalConfirmacionComponent } from '../../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { MantenimientoAnaquelService } from '../../../../../farmacia/services/mantenimiento-anaquel.service';
import { Observable } from 'rxjs';
import { MedicamentoService } from '../../../../services/medicamento.service';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrls: ['./agregar-medicamento.component.scss']
})
export class AgregarMedicamentoComponent implements OnInit {
  @Input() element;
  @Input() idConvenio;
  @ViewChild(MatPaginator) matPag: MatPaginator;
  displayedColumns = ['Codigo', 'Nombre', 'Tipo', 'Eliminar'];
  dataSource = new MatTableDataSource();
  private lsMedicaCober = [];
  private lsMedicamentos = [];
  private gruposMedicamentos: any[];
  private productoDescripcion: String;
  private pageSize: number;
  private pagination: any;
  private obtenerDes = { busqueda: "", idConvenio: null, tipoMedicamento: "" };
  private insert = { coSubtipocober: "", idMedicamento: null, tipoMedicamento: "",coCoberCode:null };
  private descripAutoComplete: any = "";
  private idServicio;
  private request = { coSubtipocober: null };
  private eliminar = { idMedicamentoCobertura: null };
  private displayedSize: number[];
  private showCoberturas = 0;
  private medicamento;
  constructor(
    private _medicamentoService: MedicamentoService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<AgregarMedicamentoComponent>,
    public _modalDialog: MatDialog,
  ) {
    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };
    this.displayedSize = [5,10, 20, 50, 100];
    this.pageSize = this.displayedSize[0];
    this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
    { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];
    this.insert.tipoMedicamento = 'M';
    this.descripAutoComplete = this.gruposMedicamentos[0].valor;

  }
  close(add) {
    this.dialogRef.close(add);
  }
  dismiss() {
    this.dialogRef.close(0);
  }
  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerMediCobertura();
  }
  private placeDesc(opcion, _ngForm?: any) {
    this.insert.tipoMedicamento = opcion;
    this.productoDescripcion = "";
    this.descripAutoComplete = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    this.insert.tipoMedicamento = opcion;
    this.medicamento = null;
    this.lsMedicamentos = [];
  }
  private busquedaServicioDescripcion(value) {
    if (value.length % 2 == 0) {
      this.obtenerDes.busqueda = value;
      this.obtenerDes.tipoMedicamento = this.insert.tipoMedicamento;
      this.obtenerDes.idConvenio = this.idConvenio;
      this.getServicioDescripcionPromise().then();

    }
  }

  private getServicioDescripcionPromise() {
    let promise = new Promise((resolve, reject) => {
      this._medicamentoService.getAuto(this.obtenerDes)
        .toPromise().then(data => {
          if (data.estado == 1) {
            this.lsMedicamentos = data.autoMedicaList;
          } else {

          }
          resolve();
        },
          err => {
            console.error(err);
          });
    })
    return promise;
  }
  private seleccionarId(i) {
    this.insert.idMedicamento = i;
  }
  private insertarMedicamento() {
    this.insert.coCoberCode=this.element.coCoberCode;
    this.insert.coSubtipocober = this.element.coSubTipoCober;
    this._medicamentoService.insertMedicamentos(this.insert)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.confirmacion.id == 1) {
            this.toastr.success("Medicamento agregado correctamente");
            this.obtenerMediCobertura();
            this.medicamento=null;
            this.lsMedicamentos = [];
          }
          if (data.confirmacion.id == 0) {
            this.toastr.warning("Este medicamento ya está agregado");
          }
        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al Agregar Medicamento: ");
          return Observable.throw(error);
        }),
      err => console.error(err)
  }
  private eliminarMC(id) {
    this.eliminar.idMedicamentoCobertura = id;
    this._medicamentoService.deleteMedicamentoCober(this.eliminar.idMedicamentoCobertura)
      .subscribe(data => {
        if (data.estado == 1) {
          this.obtenerMediCobertura();
          this.toastr.success("Se eliminó correctamente");
          this.lsMedicamentos = [];

        }
        else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error("Error al eliminar Medicamento: ");
          return Observable.throw(error);
        }),
      err => console.error(err)

  }
  modalEliminarServicioCobertura(id, nombre) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea eliminar el medicamento " + nombre +"?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.eliminarMC(id);
      }
    });
  }
  private obtenerMediCobertura(numPagina?) {
    this.pagination.nuPagina = (numPagina) ? numPagina : this.pagination.nuPagina;

    Object.keys(this.request).forEach(key => {
      this.request[key] = (this.request[key] === '') ? null : this.request[key];
    });

    this.request.coSubtipocober = this.element.coSubTipoCober;

    this.request = {
      ...this.request,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };
    this._medicamentoService.getMedicamCober(this.request)
      .subscribe(data => {
        if (data.estado == 1) {

          this.lsMedicaCober = data.medicamentoCoberturaList;
          this.dataSource = new MatTableDataSource(this.lsMedicaCober);

          if (this.matPag) {
            this.matPag._pageIndex = (numPagina) ? numPagina - 1 : this.matPag._pageIndex;
          }

          if (this.lsMedicaCober.length > 0) {
            this.pagination.nuRegisMostrar = this.lsMedicaCober[0].nuTotalReg;
            this.showCoberturas = 1;
          }
          if (this.lsMedicaCober.length == 0) {
            this.toastr.info("No hay Medicamentos");
            this.showCoberturas = 0;
          }
        } else {
          this.toastr.info(data.error);
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  ngOnInit() {
    this.obtenerMediCobertura();
  }

}
