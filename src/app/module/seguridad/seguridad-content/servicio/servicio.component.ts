import { Component, OnInit, Input, } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoServicioComponent } from './nuevo-servicio/nuevo-servicio.component';
import { DeleteServicioComponent } from './delete-servicio/delete-servicio.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  constructor(private _servicioService: ServicioService,
    private _modalService: NgbModal,
    private toastr: ToastsManager) {
  }
  // private servicioRequest = { servicio: { idServicio: null,
  //                                         nombreServicio: "",
  //                                         descripcionServicio: null,
  //                                         uri: null,
  //                                         metodo: null,
  //                                         idComponente: 0,
  //                                         idPagina: 0,
  //                                         nuRegisMostrar: 10,
  //                                         paginaList: null,
  //                                         idmetodo: 0,
  //                                         controladora: ""
  //                                       },
  //                             nuTotalReg: null
  // };

  private paginationParameter = { nuPagina: 1, total_rows: 0, nombreServicio: null };
  componentes: any[] = [];
  paginas: any[] = [];
  servicios: any[] = [];
  paginasTotales: any[] = [];
  paginasSeleccionadas: any[] = [];

  private servicioprueba: any = [{ idServicio: 1, nombreServicio: "Obtner Medoto Farmacia", uri: "http://localhost:9090/sigs-farmacia-ws/medicamentos", idmetodo: 1, idComponente: 2, controladora: "Controlador 2" },
  { idServicio: 2, nombreServicio: "Obtner Medoto Medicamento", uri: "http://localhost:9090/sigs-medicamento-ws/medicamentos", idmetodo: 1, idComponente: 2, controladora: "Controlador 3" },
  { idServicio: 3, nombreServicio: "Obtner Medoto Admision", uri: "http://localhost:9090/sigs-admision-ws/medicamentos", idmetodo: 1, idComponente: 2, controladora: "Controlador 4" }]
  private serviciosList: any = [];

  private getComponentes() {
    this._servicioService.getComponentes(0)
      .subscribe(data => {
        if (data.estado == 1) {
          this.componentes = data.itemList;
        } else if (data.estado == -1) {
          this.toastr.warning(data.mensaje);
        } else if (data.estado == 0) {
          this.toastr.error(data.mensaje);
        }
      },
        err => {
          this.toastr.error("Error al listar los componentes")
          console.log(err);
        });
  }

  getServicios() {
    let params: any = { nuRegisMostrar: null, nombreServicio: null, nuPagina: null };
    params.nuPagina = this.paginationParameter.nuPagina;
    params.nombreServicio = this.paginationParameter.nombreServicio;
    console.log(params);
    this._servicioService.getServicios(params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.serviciosList = data.serviciosList;
          this.paginationParameter.total_rows = data.nuTotalReg;
          console.log(this.serviciosList);
          if (this.serviciosList == []) {
            this.toastr.info("No Existe ese Servicio");
          }
        } else {
          this.toastr.error("Error al obtenerOcupacionPersona" + data.mensaje);
        }
        return true;
      },
        err => { console.error(err) },
        () => { });
  }

  private modalNuevoServicio(servicio) {
    const modalRef = this._modalService.open(NuevoServicioComponent, { size: "lg", backdrop: 'static', keyboard: true });
    modalRef.componentInstance.tipoServicio = 1;
    modalRef.componentInstance.componentes = this.componentes;
    modalRef.result.then(result => {
      this.getServicios();
    }, reason => {
      this.getServicios();
    });
  }

  private getPaginasSeleccionadas(idServicio) {
    this._servicioService.getPaginasSeleccionadas(idServicio)
      .subscribe(data => {
        if (data.estado == 1) {
          this.paginasSeleccionadas = data.paginaList;
        } else if (data.estado == -1) {
          console.log(data.mensaje);
        } else if (data.estado == 0) {
          console.log(data.mensaje);
        }
      },
        err => {
          console.log(err)
        },
        () => {
          this.modalActualizarServicio(idServicio);
        }
      );
  }

  private modalActualizarServicio(servicio) {

    const modalRef = this._modalService.open(NuevoServicioComponent, { size: "lg", backdrop: 'static', keyboard: true });
    modalRef.componentInstance.componentes = this.componentes;
    modalRef.componentInstance.tipoServicio = 2;
    // modalRef.componentInstance.paginas = this.paginasSeleccionadas;
    // modalRef.componentInstance.servicioRequest = this.servicioRequest;
    modalRef.componentInstance.servicioRequest = servicio;
    modalRef.result.then(result => {
      this.getServicios();
    }, reason => {
      this.getServicios();
    })
  }

  private modalDeleteServicio(idServicio) {
    const modalRef = this._modalService.open(DeleteServicioComponent, { size: "sm", backdrop: 'static', keyboard: true });
    modalRef.componentInstance.idServicio = idServicio;
    modalRef.result.then(result => {
      //boton X
      this.getServicios();
    }, reason => {
      //boton cerrar o guardar
      this.getServicios();
    });
  }




  ngOnInit() {
    this.getComponentes();
    this.getServicios();
  }
}












// private paramOption: any[] = [{ idServicio: null }, { nombreServicio: null }, { descripcionServicio: null }, { metodo: null }, { idComponente: 0 }, { idPagina: 0 }, { nuPagina: null }, { nuRegisMostrar: null }];


// ngOnInit() {
//   this.getComponentes()
//   this.getPaginasAnidadas();
//   this.getServicios();
// }

// private getPaginasSeleccionadas(idServicio) {
//   this._servicioService.getPaginasSeleccionadas(idServicio)
//     .subscribe(data => {
//       if (data.estado == 1) {
//         this.paginasSeleccionadas = data.paginaList;
//       } else if (data.estado == -1) {
//         console.log(data.mensaje);
//       } else if (data.estado == 0) {
//         console.log(data.mensaje);
//       }
//     },
//       err => {
//         console.log(err)
//       },
//       () => {
//         this.modalActualizarServicio(idServicio);
//       });
// }

// private getPaginasAnidadas() {
//   this._servicioService.getPaginasSeleccionadas(0)
//     .subscribe(data => {
//       this.paginasTotales = data.paginaList;
//       if (data.paginaList != null) {
//         data.paginaList.forEach(paginaPadre => {
//           if (paginaPadre.hijosList != null) {//no es hijo
//             paginaPadre.hijosList.forEach(pagina => {
//               this.paginas.push(pagina);//para el select
//             })
//           }
//         });
//       }
//     },
//       err => {
//         this.toastr.error("Error al listar las paginas");
//         console.log(err);
//       }),
//     error => console.log(error),
//     () => console.log("Request Complete");
// }

// private getServicios() {
//   this.paramOption[0].nombreServicio = this.servicioRequest.servicio.nombreServicio;
//   this.paramOption[0].idComponente = this.servicioRequest.servicio.idComponente;
//   this.paramOption[0].idPagina = this.servicioRequest.servicio.idPagina
//   this.paramOption[0].nuPagina = this.paginationParameter.nuPagina;
//   this.paramOption[0].nuRegisMostrar = this.servicioRequest.servicio.nuRegisMostrar;
//   this.paramOption[0].metodo = this.servicioRequest.servicio.metodo;

//   this._servicioService.getServicios(this.paramOption)
//     .subscribe(data => {
//       if (data.estado == 1) {
//         this.servicios = data.servicioList;
//       } else if (data.estado == -1) {
//         console.log(data.mensaje);
//       } else if (data.estado == 0) {
//         console.log(data.mensaje)
//       }
//     },
//       err => {
//         console.log(err)
//       },
//       () => {
//         if (this.servicios.length > 0) {
//           this.paginationParameter.total_rows = this.servicios[0].nuTotalReg;
//         }
//       });
// }
