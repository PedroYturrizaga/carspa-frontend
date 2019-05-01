import { ModalConfirmacionComponent } from './../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { InsertarMedicamentoComponent } from './insertar-medicamento/insertar-medicamento.component';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoAnaquelService } from './../../../../farmacia/services/mantenimiento-anaquel.service';
import { ConvenioService } from './../../../services/convenio.service';
import { log } from 'util';
import { MedicamentoService } from './../../../services/medicamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { TarifarioService } from '../../../services/tarifario.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { isInvalid } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { element } from 'protractor';

@Component({
  selector: 'app-convenio-medicamento',
  templateUrl: './convenio-medicamento.component.html',
  styleUrls: ['./convenio-medicamento.component.scss']
})
export class ConvenioMedicamentoComponent implements OnInit {



   @ViewChild(MatPaginator) matPaginator: MatPaginator;
  constructor(private toastr: ToastsManager,
   private _convenioMedDispService: MedicamentoService,
   private _mantenimientoAnaquelService: MantenimientoAnaquelService,
   private _convenio: ConvenioService,
   private _tarifarioService: TarifarioService,
   private _route: ActivatedRoute,
    public _modalDialog: MatDialog) {

    this.paginator = { nuPagina: 1, nuTotalReg: null };
    this.displayedSizes = [5, 10, 25, 100];
    this.pageSize = this.displayedSizes[0];

      this.gruposMedicamentos = [{ id: 'M', valor: "Producto Farmaceútico" },
      { id: 'D', valor: "Dispositivos Médicos y/o Productos Sanitarios" }];
      this._route.queryParams.subscribe(params => {
        this.idConvenio = params["idConvenio"];

      });

      this.flgMedicDisp = 'M';
      this.descripAutoCompleteMedicamento = this.gruposMedicamentos[0].valor;

      

  }
  dataSource = new MatTableDataSource();
  private idConvenio;
  private displayedColumns = ['nombreC', 'dci', 'precio', 'tipoCopago','editar', 'eliminar'];
  private displayedSizes: number[];
  private pageSize: number;
  private paginator: any;
  private listConvenios: any[];
  // private obtenerServicios = { idConvenio: 0, idServicio: null, flgCpt: null, flgActividad: null };null
  private Param = { idConvenio: null, nuPagina: null, nuTotalReg: null, idMedicamento: null, idDispMedicoProdSanitario: null, descripcionMedicamento: null, fiTipo: null};
  private lsconvenioMedDisp = []; 
  private lsconvenio: any[] = [ { idConvenio: 1 } ];
  private convenioRequest = { nombreConvenio: null };
  private request = { idConvenio: null, idMedicamento: null, idDispMedicoProdSanitario:null , dispositivoMedicamento: null, tipoCopago: null };
  private parametrosMD = { idAlmacen: null, descripcionMedicDispProdSanid: null, idMedicamento: null, idDispMedicoProdSanitario: null };
  private parametros = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null, tipoFile: null, descripcionAlmacen: null, noTipo: null, descripcionMedicamento: null, descripcionPersonal: null };
  private medicDisp: any[] = [];
  private filteredDispMedi: any[] = [];
  private flgMedicDisp: any;
  private productoDescripcion: String = "";
  private convenioDescripcion: String = "";
  private receCab: any = [];
  private descripAutoCompleteMedicamento: any = "";
  private gruposMedicamentos: any[];
  // private paramsBusqueda = { idMedicamento: null, idConvenio: null };


  private pageEvent($event: any, _ngForm: any) {
    this.paginator.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.obtenerConvenioMedDisp();
  }
  
  private placeDesc(opcion) {
    this.productoDescripcion = "";
    this.convenioDescripcion = "";
    this.filteredDispMedi = [];
    this.receCab = [];
    this.descripAutoCompleteMedicamento = (this.gruposMedicamentos.find(obj => obj['id'] === opcion))['valor'];
    // this.paramsBusqueda = {idMedicamento: null, idConvenio: null };
  }

  ngOnInit() {
    try { 
      this.obtenerConvenio();    
    } catch (error) {
    }finally{  
      this.request.idConvenio = this.lsconvenio[0].idConvenio;
      this.obtenerConvenioMedDisp(1);
    }
  }

  public obtenerConvenio(){
    this._convenio.getComboConvenio()
    .subscribe(data=> {
      if(data.estado == 1){
        this.lsconvenio = data.convenioList;
        console.log(this.lsconvenio);
      }
      else if(data.estado == 0){
        console.log(data.mensaje);
      }else if(data.estado = -1){
        console.error(data.mensaje);    
      }
    },
    error => {
      console.error(error);    
    });
  }

  private obtenerConvenioMedDisp(nuPagina?: any) {

    console.log();
    
    this.paginator.nuPagina = (nuPagina) ? nuPagina : this.paginator.nuPagina;

     Object.keys(this.Param).forEach(key => {
      this.Param[key] = (this.Param[key] === '') ? null : this.Param[key];
     });
    this.Param.idConvenio = this.request.idConvenio;

    this.Param = {
      ...this.Param,
      ...this.paginator,
     nuTotalReg: this.pageSize
    };

    console.log(this.Param);
    
    this._convenioMedDispService.getConvenioMedDisp(this.Param) 
     .subscribe(data => {
      if (data.estado == 1) {
        console.log(data);
        
        this.lsconvenioMedDisp = this.convertirBinario(data.convenioMedDispList);
         console.log(this.lsconvenioMedDisp);
          
         this.dataSource = new MatTableDataSource(this.lsconvenioMedDisp);
         if (this.matPaginator) {
           this.matPaginator._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPaginator._pageIndex;
         }
         if (this.lsconvenioMedDisp.length > 0) {
           this.paginator.nuTotalReg = this.lsconvenioMedDisp[0].nuTotalRegi;
         }
         } else {
          this.toastr.error(data.mensaje);
         }
        },
         error => {
           this.toastr.error(error);
           return Observable.throw(error);
          }),
         err => this.toastr.error(err),
         () => this.toastr.success('Request Complete'); 

         this.request.idMedicamento = null;
         this.Param.idMedicamento = null;
         this.Param.idDispMedicoProdSanitario = null;
         this.medicDisp = null;
   }

   private getMedicamentoDispositivos(descripMedicDisp) {
    this.parametrosMD.descripcionMedicDispProdSanid = descripMedicDisp;
    this._mantenimientoAnaquelService.getMedicamentoDispositivo(this.parametrosMD)
      .subscribe(data => {
        if (data.estado == 1) {
          console.log(data);
          
          this.medicDisp = data.medicamentoDispMedicoProdSanitarioList;
          console.log(this.medicDisp);
          
          this.filteredDispMedi = this.medicDisp.filter(obj => obj.fiTipo === this.flgMedicDisp);
          console.log(this.filteredDispMedi);
          
        } else {
          this.toastr.error(data.mensaje);
        }
      },
      error => {
        this.toastr.error(error);
        return Observable.throw(error);
      }),
      err => this.toastr.error(err),
      () => this.toastr.success('Request Complete');
  }

  private buscarMedicDispProdDescripcion(descripMedicDispProd) {
    if (descripMedicDispProd.length > 1) {
      this.getMedicamentoDispositivos(descripMedicDispProd);
    }
    else {
      this.filteredDispMedi = [];
    }
  }

  private seleccionaMedicamento(medicamentoDisp) {
    this.Param.idMedicamento = medicamentoDisp.idMedicamento;
    // this.Param.idDispMedicoProdSanitario = medicamentoDisp.idDispMedicoProdSanitario
    console.log(this.Param.idMedicamento);
    console.log(this.Param.idDispMedicoProdSanitario);
    // this.Param.idMedicamento = medicamentoDisp.idDispMedicoProdSanitario;
    // this.paramsBusqueda.idMedicamento = medicamentoDisp.idMedicamento;
    // this.paramsBusqueda.idConvenio = medicamentoDisp.idConvenio;
    this.Param.fiTipo = medicamentoDisp.fiTipo;
    this.Param.descripcionMedicamento = medicamentoDisp.dispositivoMedicamento;
    // console.log(this.paramsBusqueda);
    console.log(medicamentoDisp);
    
    if (medicamentoDisp.fiTipo == "M") {
      this.Param.idMedicamento = medicamentoDisp.idMedicamento;    
      this.Param.idDispMedicoProdSanitario = null; 
    } else if (medicamentoDisp.fiTipo == "D") {
      this.Param.idDispMedicoProdSanitario = medicamentoDisp.idMedicamento;
      this.Param.idMedicamento = null;
    }

    console.log(this.Param);

  }

  private modalNuevoConvenioMedicamento() {
    const dialogRef = this._modalDialog.open(InsertarMedicamentoComponent, {
      autoFocus: false,
      hasBackdrop: true,
     maxWidth: '90%',
      width: '90%',
       maxHeight: '90%',
       height: '70%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

        this.request.idConvenio =this.Param.idConvenio;
        this.obtenerConvenioMedDisp(1);

    });
  }

  private modificarConvenioMed(element) {
    const dialogRef = this._modalDialog.open(InsertarMedicamentoComponent, {
      autoFocus: false,
      hasBackdrop: true,
      maxWidth: '90%',
      width: '90%',
       maxHeight: '90%',
       height: '50%',
      disableClose: true
    });
    dialogRef.componentInstance.convenioEdit = element;
    dialogRef.afterClosed().subscribe(result => {
      // this.request.tipoCopago = this.convertStringToBit(element.tipoCopago);

      this.request.idConvenio =this.Param.idConvenio;
        this.obtenerConvenioMedDisp(1);
    });

  }

  private eliminarConvenioMed(element){

    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el registro?";
    dialogRef.afterClosed().subscribe(result => {

      if (result == 1) {
        let param = { idConvenio : element.idConvenio, idMedicamento : element.idMedicamento, idDispMedicoProdSanitario: element.idDispMedicoProdSanitario }
    console.log(this.request);
    
      
        this._convenioMedDispService.deleteConvenioMedDisp(param)
          .subscribe(data => {
            console.log();
            
            if (data.estado == 1) {
              this.toastr.success("Se Eliminó correctamente");

              this.obtenerConvenioMedDisp(1);
              // this.request.idMedicamento = null;
              // this.request.idDispMedicoProdSanitario = null;
            } else {
              // this.request.idMedicamento = null;
              // this.request.idDispMedicoProdSanitario = null;
              this.toastr.error("El Medicamento/Dispositivo esta asignado a una cobertura.");
            }
            return true;
          }, error => {
            
            console.error(error);
            return Observable.throw(error);
          }),
          err => console.error(err),
          () => console.log('Request Complete');
      }
    });
  }

  private convertStringToBit(descripcion) {
    if (descripcion == "Fijo") {
      return '1';
    } else if (descripcion == "Variable") {
      return '2';
    }
  }

  private convertirBinario(dataList) {
    var nuevaLista = [];
    dataList.forEach(element => {
    if (element.tipoCopago == 1) {
     element["tipoCopagoDef"] = 'Fijo';
    } else if (element.tipoCopago == 2) {
      element["tipoCopagoDef"] = 'Variable';
    } else {
    } 
    nuevaLista.push(element);
    });
    return nuevaLista;
    }




  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }



}
