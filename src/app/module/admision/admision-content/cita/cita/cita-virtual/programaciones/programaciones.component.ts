import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-programaciones',
  templateUrl: './programaciones.component.html',
  styleUrls: ['./programaciones.component.scss']
})
export class ProgramacionesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  dismiss() {
    this.activeModal.dismiss();
  }
  close() {
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
