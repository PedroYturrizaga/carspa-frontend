import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramacionesComponent } from './programaciones/programaciones.component';
import { RegistrarCitaVirtualComponent } from './registrar-cita-virtual/registrar-cita-virtual.component';

import { CitaService } from '../../../../services/cita.service';

@Component({
  selector: 'app-cita-virtual',
  templateUrl: './cita-virtual.component.html',
  styleUrls: ['./cita-virtual.component.scss']
})

export class CitaVirtualComponent implements OnInit {

  private params: any = { idPersonal: "10000008000", flag: 1 }; //10000008000//10000007700

  private citaVirtualProgramada: any[];
  private citaVirtualPorAtender: any[];

  constructor(private modalService: NgbModal,
    private toastr: ToastsManager,
    private _citaService: CitaService) { }

  private modalVerProgramacion() {
    const modalRef = this.modalService.open(ProgramacionesComponent,
      { size: 'lg', backdrop: 'static', keyboard: false });
    // modalRef.componentInstance.idRol = idRol;
    modalRef.result.then((result) => {
      this.obtenerCitasProgramadas();
    }, (reason) => {
      // this.getAllRoles();
      this.obtenerCitasProgramadas();
    });
  }

  private modalRegistrarCitaVirtual() {
    const modalRef = this.modalService.open(RegistrarCitaVirtualComponent, { size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'modal-xlg' });
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  private obtenerCitasProgramadas() {
    this.params.flag = 1;

    this._citaService.CitaVirtualProgramada(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.citaVirtualProgramada = data.citaProgramadaList;
          console.log(this.citaVirtualProgramada);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');

    /*Citas por atender*/
    this.params.flag = 2;
    this._citaService.CitaVirtualProgramada(this.params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.citaVirtualPorAtender = data.citaProgramadaList;
          console.log(this.citaVirtualPorAtender);
        } else {
          this.toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }


  private iniVideo() {
    localStorage.setItem('stRoom', "asdas");
    localStorage.setItem('stToken', "4");
    console.log(localStorage);
    //https://192.168.3.240:8443/demos/cuya5.html
  }

  ngOnInit() {
    this.obtenerCitasProgramadas();
  }
}