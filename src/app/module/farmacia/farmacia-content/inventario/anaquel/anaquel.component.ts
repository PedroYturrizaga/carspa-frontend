import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-anaquel',
  templateUrl: './anaquel.component.html',
  styleUrls: ['./anaquel.component.scss']
})
export class AnaquelComponent implements OnInit {
  constructor(
    private _inventarioService: InventarioService,
    private toastr: ToastsManager,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

}
