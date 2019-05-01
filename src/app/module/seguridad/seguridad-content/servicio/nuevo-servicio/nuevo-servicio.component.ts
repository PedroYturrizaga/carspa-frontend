import { Component, OnInit, Input, OnChanges } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ToastsManager, Toast } from 'ng2-toastr';
import { ServicioService } from '../../../services/servicio.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.scss']
})
export class NuevoServicioComponent implements OnInit {

  private stringIdPaginas: string[] = [];
  private componenteSeleccionado: number;

  @Input() componentes;
  @Input() tipoServicio;
  @Input() servicioRequest: any = {
    idServicio: null,
    nombreServicio: "",
    descripcionServicio: null,
    uri: null,
    idmetodo: 0,
    idComponente: 0,
    pagina: null,
    paginaList: null
  };

  private metodos: any = [{ id: 1, valor: "POST" }, { id: 2, valor: "GET" }, { id: 3, valor: "PUT" }, { id: 4, valor: "DELETE" },]
  private request: any = { controladoraDescripcion: null, idComponente: null, metodo: null, nombreServicio: null, uri: null, idServicio: null };
  constructor(public activeModal: NgbActiveModal,
    private _servicioService: ServicioService,
    private toastr: ToastsManager,
    private modalService: NgbModal) {
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

  add() {
    if (this.servicioRequest.descripcion == null || this.servicioRequest.descripcion == "") {
      this.toastr.warning("Debe Ingresar el nombre del Servicio");
      return;
    }
    if (this.servicioRequest.idComponente == 0) {
      this.toastr.warning("Debe Seleccionar un componente");
      return;
    }
    if (this.servicioRequest.controladora == null || this.servicioRequest.controladora == "") {
      this.toastr.warning("Falta Completar el nombre del Controlador");
      return;
    }
    if (this.servicioRequest.metodo == null || this.servicioRequest.metodo == "") {
      this.toastr.warning("Falta Seleccionar un Metodo");
      return;
    }
    if (this.servicioRequest.url == null || this.servicioRequest.url == "") {
      this.toastr.warning("Falta Igresar el URL");
      return;
    }


    this.request.controladoraDescripcion = this.servicioRequest.controladora;
    this.request.idComponente = this.servicioRequest.idComponente;
    this.request.metodo = this.servicioRequest.metodo;
    this.request.nombreServicio = this.servicioRequest.descripcion;
    this.request.uri = this.servicioRequest.url;
    this.request.idServicio = this.servicioRequest.idServicio;
    let param: any = { servicio: this.request };

    if (this.tipoServicio == 1) {
      this._servicioService.addServicio(param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
          } else {
            this.toastr.error("Error al insertar servicio" + data.mensaje);
          }
          return true;
        },
          err => { console.error(err) },
          () => { });

    } else if (this.tipoServicio == 2) {
      this._servicioService.editServicio(param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.toastr.success(data.mensaje);
          } else {
            this.toastr.error("Error al actualizar servicio" + data.mensaje);
          }
          return true;
        },
          err => { console.error(err) },
          () => { });
    }
    this.dismiss();
  }


  ngOnInit() {
    console.log(this.servicioRequest);
  }

}


// public guardarServicio(){
//   if(this.servicioRequest.servicio.nombreServicio.trim() == ""){
//     this.toastr.error("El campo \"Nombre de servicio\" no puede ser vacio");
//     return;  
//   }
//   if(this.servicioRequest.servicio.idComponente==0||this.servicioRequest.servicio.idComponente==null){
//     this.toastr.error("El servicio debe tener un componente");
//     return;  
//   }
//   this.armarServicio();
//   if(this.idServicio==null){
//     this._servicioService.addServicio(this.servicioRequest)
//       .subscribe(data=>{
//         console.log(data);
//         if(data.confirmacion.id == -1){
//           this.toastr.error(data.confirmacion.mensaje, "Nuevo servicio");
//         }else if(data.confirmacion.id == 0){
//           this.toastr.error(data.confirmacion.mensaje, "Nuevo servicio");
//         }else if(data.estado == -1){
//           this.toastr.error(data.mensake,"Nuevo Servicio");
//         }else if(data.estado == 1){
//           this.toastr.success(data.mensaje, "Nuevo servicio");
//           this.idServicio == null;
//           this.dismiss();
//         }
//         return true;
//       },
//       error=>{
//         console.log(error);
//       }),
//       err=>console.log(err);
//       ()=>uest complete");
//   }else{
//     this.servicioRequest.servicio.idServicio=this.idServicio;
//     this._servicioService.editServicio(this.servicioRequest)
//       .subscribe((data)=>{
//         if(data.confirmacion.id == -1){
//           this.toastr.error(data.confirmacion.mensaje, "Actualizar servicio");
//         }else if(data.confirmacion.id == 0){
//           this.toastr.error(data.confirmacion.mensaje, "Actualizar servicio");
//         }else if(data.estado == -1){
//           this.toastr.error(data.mensaje, "Actualizar servicio");
//         }else if(data.estado == 1){
//           this.toastr.success(data.mensaje, "Actualizar servicio");
//           this.idServicio==null;
//            this.dismiss();
//         }console.log("Req
//         return true;
//       },
//       error=>{
//         console.log(error);
//       }),
//       err=>console.log(err);
//       ()=>console.log("Request complete");
//   }    
// }

// public armarServicio(){
//   this.paginas.forEach(pagPadre=>{
//     if(pagPadre.hijosList!=null){
//       pagPadre.hijosList.forEach(pagHijo=>{
//         if(pagHijo.seleccionado==true){
//           this.stringIdPaginas.push(pagHijo.idPagina);
//         }
//       });
//     }
//   });
//   this.servicioRequest.servicio.pagina = this.stringIdPaginas.toString();
// }

// ngOnInit() {
//     this.paginas.forEach(pagPadre=>{
//     if(pagPadre.hijosList!=null){
//       pagPadre.hijosList.forEach(pagHijo=>{
//       })
//     }
//   })
// }