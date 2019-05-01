import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asignar-cobertura',
  templateUrl: './asignar-cobertura.component.html',
  styleUrls: ['./asignar-cobertura.component.scss']
})
export class AsignarCoberturaComponent implements OnInit {
  @Input() vigenciaAcredita;
  @Input() vigenciaAtencion;
  @Input() descripcionAtencion;
  @Input() descripcionAcredita;
  @Input() resultado;

  constructor(private activeModal: NgbActiveModal) { }
  private atencion: any = {};
  private acredita: any = {};
  private array: any = [{ id: null, valor: null }];

  ngOnInit() {
    // atencion
    // debugger
    let array = this.descripcionAtencion.split("-");
    this.atencion.id = array[0];
    this.atencion.valor = array[1];

    //acredita
    let array1 = this.descripcionAcredita.split("-");
    this.acredita.id = array[0];
    this.acredita.valor = array[1];
    console.log(this.atencion);

    //metodo 2
    this.array[0].id = array[0];
    this.array[0].valor = array[1];

    let param = { id: null, valor: null };
    param.id = array1[0];
    param.valor = array1[1];
    this.array.push(param);
    // console.log(this.array);

  }

  public capturar(id) {
    this.resultado = id;
    // console.log(this.resultado);
    this.activeModal.close(id);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
  close() {
    this.activeModal.close();
  }

}
