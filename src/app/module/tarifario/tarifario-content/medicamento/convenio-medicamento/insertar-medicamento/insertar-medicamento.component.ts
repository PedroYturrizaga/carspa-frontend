  import { log } from 'util';
  import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
  import { NgForm } from '@angular/forms';
  import { MovimientoService } from './../../../../../farmacia/services/movimiento.service';
  import { RecetaService } from './../../../../../consulta-ambulatoria/services/receta.service';
  import { Observable } from 'rxjs/Observable';
  import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
  import { ActivatedRoute } from '@angular/router';
  import { ConvenioService } from './../../../../services/convenio.service';
  import { Component, OnInit, ViewChild, Input } from '@angular/core';
  import { ToastsManager } from 'ng2-toastr';
  import { MedicamentoService } from '../../../../services/medicamento.service';
  import { setQuantifier, setValidatorPattern, setInputPattern, isInvalid } from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

  @Component({
    selector: 'app-insertar-medicamento',
    templateUrl: './insertar-medicamento.component.html',
    styleUrls: ['./insertar-medicamento.component.scss']
  })
  export class InsertarMedicamentoComponent implements OnInit {

    // , 'Precio', 'Editar', 'Accion'
    displayedColumnsMedicDisp = ['productFarma', 'Accion'];
    dataSource = new MatTableDataSource();
    @ViewChild('formInsertarEditarServicio') private _formInsertarEditarServicio: NgForm;
    @Input() convenioEdit;


    constructor(private _convenio: ConvenioService,
      private _movimientoService: MovimientoService,
      private _medicamentoService: MedicamentoService,
      private _route: ActivatedRoute,
      public _modalDialog: MatDialog,
      private _recetaService: RecetaService,
      public dialogRef: MatDialogRef<InsertarMedicamentoComponent>,
      private toastr: ToastsManager) {
        this.grupoCopago = [{ id: 1, valor: "Fijo" },
        { id: 2, valor: "Variable" }];
        this.medicamentoRequest = {  idConvenio: null, precioUnidadesJson : null, tipoCopago: null };
        console.log(this.grupoCopago);
        
      }

    private idConvenio;
    private lsconvenio: any[] = [];
    private request = { idConvenio: null, idMedicamento: null, idDispMedicoProdSanitario: null , idMedicDisp: null, precioUnidadesJson: [],  tipoCopago: null };
    private medicDispMedicProdSanit: any[] = []; 
    private medicDispProd = { idMedicDisp: null,  descMedicDisp: null, idUnidad: null, fiTipo: null, unidMed: null, lote: null , precioUnidad: [], idConvenio: null, idMedicamento: null, idDispMedicoProdSanitario: null, dciProductoFarmaceutico: null, dciDispMedicoProductosSanitario: null};
    private filteredDispMedi = [];
    private unidadesMedidas = [];
    private param = { idConvenio: null, nuPagina: null, nuTotalReg: null, idMedicamento: null, idDispMedicoProdSanitario: null, tipoCopago: null };
    private arrayMedicDisp: any[] = [];
    private descripMedicDispMedicProducSanit: String = "";
    private indiceAuxiliar;
    private confirmacion: string;
    private showGuardar = 1;
    private cantidadAux = 0;
    private disableMedic = false;
    private medicamentoRequest: any;
    private disEditar = false;
    private grupoCopago: any[];

    private umed = { precio: null}

    ngOnInit() {
      this.obtenerConvenio();
      this.setConvenioMedicamento();
    }

    private setConvenioMedicamento(){
      if(this.convenioEdit != null || this.convenioEdit != undefined){

        this.request.idConvenio = this.convenioEdit.idConvenio;
        this.request.tipoCopago = this.convenioEdit.tipoCopago;

        // if(this.request.tipoCopago = 'Fijo'){
        //   this.convenioEdit.tipoCopago = '1'
        // }else if (this.request.tipoCopago = 'Variable') {
        //   this.convenioEdit.tipoCopago = '2'
        // }

        console.log(" AEAAAA"+this.request.tipoCopago);
        
        this.descripMedicDispMedicProducSanit = this.convenioEdit.dciProductoFarmaceutico? this.convenioEdit.dciProductoFarmaceutico: this.convenioEdit.dciDispMedicoProductosSanitario;
        this.medicDispProd.descMedicDisp = this.convenioEdit.descMedicDisp;
        console.log(this.medicDispProd.descMedicDisp);
        console.log(this.request.idConvenio);
        this.request.idMedicamento = this.convenioEdit.idMedicamento;
        console.log(this.request.idMedicamento);
        this.request.idDispMedicoProdSanitario = this.convenioEdit.idDispMedicoProdSanitario;
        console.log(this.request.idDispMedicoProdSanitario);
        
        this.getUnidadMedicamentoDispositivoEditar(this.request.idConvenio, this.request.idMedicamento, this.request.idDispMedicoProdSanitario, );   
        
        // this.disEditar = true;
        this.disableMedic = true;
      }
    }

    private close(add) {
      this.dialogRef.close(add);
    }

    filterMeds(val: any) {
      this.medicDispMedicProdSanit = val ? this._filter(val) : [];
    }
    private _filter(val: string) {
      const filterValue = val.toLowerCase();
      return this.medicDispMedicProdSanit.filter(value => value.dispositivoMedicamento.toLowerCase().startsWith(filterValue));
    }

    public obtenerConvenio() {
      this._convenio.getComboConvenio()
        .subscribe(data => {
          if (data.estado == 1) {
            this.lsconvenio = data.convenioList;
            console.log(this.lsconvenio);
          }
          else if (data.estado == 0) {
            console.log(data.mensaje);
          } else if (data.estado = -1) {
            console.error(data.mensaje);
          }
        },
          error => {
            console.error(error);
          });
    }

    private seleccionarConvenio(idConvenio) {
      console.log(idConvenio);
      this.param.idConvenio = +idConvenio;
      console.log(this.param.idConvenio);
    }

    private seleccionarTipoCopago(tipoCopago){
      console.log(tipoCopago);
      this.param.tipoCopago = +tipoCopago;
      console.log(this.param.tipoCopago);
      
      
    }

    private getMedicDispMedProdSanit(descripMedicDispProd) {
      let param = { descripMedicDispProd: descripMedicDispProd }
      this._recetaService.getMedicDispMedProdSanit(param)
        .subscribe(data => {
          if (data.estado == 1) {
            console.log(data);
            this.medicDispMedicProdSanit = data.medicamentoDispMedicoProdSanitarioList;
            if (this.medicDispMedicProdSanit.length === 0) {
              // this.toastr.warning("Producto Farmacútico/Dispositivo Médico no encontrado");
            }
            else {
              this.filterMeds(descripMedicDispProd);
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
    }

    private buscarMedicDispProdDescripcion(descripMedicDispProd) {
      this.medicDispMedicProdSanit = [];
      // this.medicDispProd.idMedicDisp = null;
      if (descripMedicDispProd.length > 1) {
        this.getMedicDispMedProdSanit(descripMedicDispProd);
      } else {
        this.filteredDispMedi = [];
      }
    }

    private seleccionaMedicamentoMaterial(medicamentoMaterial) {
      this.medicDispProd.idMedicDisp = medicamentoMaterial.idMedicamento;
      this.medicDispProd.descMedicDisp = medicamentoMaterial.dispositivoMedicamento;
      this.medicDispProd.fiTipo = medicamentoMaterial.fiTipo;

      console.log(this.medicDispProd)

      if (medicamentoMaterial.fiTipo == "M") {
        this.getUnidadMedicamentoDispositivo(this.medicDispProd.idMedicDisp, null);
        console.log('id medic convenio', this.medicDispProd.idMedicDisp);

      } else if (medicamentoMaterial.fiTipo == "D") {
        this.getUnidadMedicamentoDispositivo(null, this.medicDispProd.idMedicDisp);
      }

    }

    private getUnidadMedicamentoDispositivo(idMedicamento, idDispMedicoProdSanitario) {
      let param = { idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
      console.log(param);
      this._movimientoService.getUnidadMedicamentoDispositivo(param)
        .subscribe(data => {
          if (data.estado == 1) {
            this.unidadesMedidas = data.listUnidad;
            console.log(data);

          } else {
            this.unidadesMedidas = []
          }
        },
          error => {
            this.toastr.error(error);
            return Observable.throw(error);
          }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    }

    private seleccionaMedicamentoMaterialEditar(medicamentoMaterial) {
      this.medicDispProd.idMedicamento = medicamentoMaterial.idMedicamento;
      this.medicDispProd.idDispMedicoProdSanitario = medicamentoMaterial.idDispMedicoProdSanitario;
      this.medicDispProd.dciDispMedicoProductosSanitario = medicamentoMaterial.dciDispMedicoProductosSanitario;
      this.medicDispProd.dciProductoFarmaceutico = medicamentoMaterial.dciProductoFarmaceutico;
      


      console.log(this.medicDispProd.dciProductoFarmaceutico);
      console.log(this.medicDispProd.dciDispMedicoProductosSanitario);
      

      // if (medicamentoMaterial.fiTipo == "M") {
        this.getUnidadMedicamentoDispositivoEditar(this.request.idConvenio, this.medicDispProd.idMedicamento, this.medicDispProd.idDispMedicoProdSanitario);
        console.log(this.request.idConvenio);

    }



    private getUnidadMedicamentoDispositivoEditar(idConvenio, idMedicamento, idDispMedicoProdSanitario) {
      idConvenio = this.request.idConvenio;
      let param = { idConvenio: idConvenio, idMedicamento: idMedicamento, idDispMedicoProdSanitario: idDispMedicoProdSanitario }
      console.log(param);
      console.log(idConvenio);
      this._medicamentoService.getPrecioUnidadXConvMedDisp(param).subscribe(data => {
        if (data.estado == 1) {
          console.log(data);

          this.unidadesMedidas = data.convenioMedDispList;
        } else {
          this.unidadesMedidas = []
        }
      },
        error => {
          this.toastr.error(error);
          return Observable.throw(error);
        }),
        err => this.toastr.error(err),
        () => this.toastr.success('Request Complete');
    }
    

    private postConMedDisp(formInsertarEditarServicio: NgForm) {


      this.medicamentoRequest.idConvenio = this.param.idConvenio;
      this.medicamentoRequest.tipoCopago = this.param.tipoCopago;
      // this.medicamentoRequest.idMedicamento = this.medicDispProd.idMedicDisp;
      this.medicamentoRequest.fiTipo = this.medicDispProd.fiTipo;
      console.log(this.medicamentoRequest.fiTipo);
      
      if (this.medicamentoRequest.fiTipo == "M") {
        this.medicamentoRequest.idMedicamento = this.medicDispProd.idMedicDisp;    
        this.medicamentoRequest.idDispMedicoProdSanitario = null; 
      } else if (this.medicamentoRequest.fiTipo == "D") {
        this.medicamentoRequest.idDispMedicoProdSanitario = this.medicDispProd.idMedicDisp;
        this.medicamentoRequest.idMedicamento = null;
      }

      // this.medicamentoRequest.idMedicamento = this.param.idMedicamento;
      // this.medicamentoRequest.idDispMedicoProdSanitario = this.param.idDispMedicoProdSanitario;

      console.log(this.medicamentoRequest);
      
      this._medicamentoService.validarConvMedDispExiste(this.medicamentoRequest)
        .subscribe(data => {
          console.log(data)
          if (data.estado == 1) {

            let variableException = 0;
            try {
        
              this.medicDispProd.precioUnidad = []
              this.unidadesMedidas.forEach(element => {
                console.log(element);
                let aux = {
                  idMedicDisp: this.medicDispProd.idMedicDisp,
                  idUnidad: element.idUnidad,
                  nombreUnidad: element.nombreUnidad,
                  precio: element.precio
                }
                console.log(aux);
        
                this.medicDispProd.precioUnidad.push(aux)
                this.medicDispProd.idConvenio = this.param.idConvenio;
                if (element.idUnidad == this.medicDispProd.idUnidad) {
                  this.medicDispProd.unidMed = aux;
                }
              });
        
              if (this.arrayMedicDisp.length > 0) {
                for (let i of this.arrayMedicDisp) {
                  if (this.param.idConvenio != null, (i.idMedicDisp != undefined || i.idMedicDisp != null) && (this.medicDispProd.idMedicDisp != undefined || this.medicDispProd.idMedicDisp != null)) {
                    if (i.idMedicDisp == this.medicDispProd.idMedicDisp) {
                      this.toastr.error("Ya agrego este producto farmaceútico y/o dispositivo médico");
                      variableException = 1
                      return;
                    }
        
                  }
                }
        
              }
              
              this.arrayMedicDisp.push(this.medicDispProd);
              console.log(this.arrayMedicDisp);
              this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
              
              
              // console.log(this.arrayMedicDisp)
            } catch (error) {
              console.log(error);
        
            } finally {
              
        
              if (variableException == 1) {
        
              } else {
          
                console.log("hola",this.arrayMedicDisp);
                
                this.medicDispMedicProdSanit = [];
                this.borrarJsonMedicDisp()
                this.unidadesMedidas = []     
                this.umed.precio = "";
                console.log(this.umed.precio);
                
                // formInsertarEditarServicio.resetForm();
        
                this.indiceAuxiliar = undefined;
              }
            }

            console.log(data);       
            // idComprobante = data.idComprobante;
            // this.toastr.warning(data.mensaje);
            // this.arrayMedicDisp = [];
            // this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
            // console.log("gaa",this.arrayMedicDisp);           
            // this.medicamentoRequest.idConvenio = null;
            this.medicamentoRequest.precioUnidadesJson = null;
            // this.arrayMedicDisp = [];

            // formInsertarEditarServicio.resetForm();
            // this.close(formInsertarEditarServicio);

          } else {
            this.toastr.warning(data.mensaje);

            // this.toastr.error(data.mensaje);
          }
        },
          err => { this.toastr.error(err) },
          () => {
          });

    }


    private editarMedicamento(formInsertarEditarServicio: NgForm){

      // console.log(this.unidadesMedidas);
      
      
      this.medicamentoRequest.precioUnidadesJson = JSON.stringify(this.unidadesMedidas);
      this.medicamentoRequest.idConvenio = this.convenioEdit.idConvenio;
      this.medicamentoRequest.tipoCopago = this.request.tipoCopago;
        
      console.log(this.medicamentoRequest.precioUnidadesJson );
      console.log(this.medicamentoRequest.idConvenio);
      console.log(this.medicamentoRequest.tipoCopago);
      
        
      console.log(this.medicamentoRequest)
      this._medicamentoService.putConvenioMedDisp(this.medicamentoRequest)
        .subscribe(data => {
          console.log(data)
          if (data.estado == 1) {
            console.log(data);       
            // idComprobante = data.idComprobante;
            this.toastr.success(data.mensaje);
            this.arrayMedicDisp = [];
            this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
            this.medicamentoRequest.idConvenio = null;
            this.medicamentoRequest.precioUnidadesJson = null;
            this.arrayMedicDisp = [];
            // this.obtenerConvenioMedDisp(1);

            // formInsertarEditarServicio.resetForm();
            this.close(formInsertarEditarServicio);

          } else {
            this.toastr.error(data.mensaje);
          }
        },
          err => { this.toastr.error(err) },
          () => {
          });

    }

    private insertarMedicamento(formInsertarEditarServicio: NgForm) {
      let params: any;
      console.log(this.arrayMedicDisp)
      let unidadesParam = [];
      for (let i of this.arrayMedicDisp) {
        params = { idConvenio :null,idUnidad: null, precioVenta: null };
        if (i.fiTipo == 'M') {
          params.medicamento = { idMedicamento: i.idMedicDisp };

          i.precioUnidad.forEach(element => {
            console.log(i);

          let unpre = {
              idMedicamento: i.idMedicDisp,
              idDispMedicoProdSanitario: null,
              idUnidad: element.idUnidad,
              precioVenta: element.precio
            }
            unidadesParam.push(unpre);
          });
        }

        if (i.fiTipo == 'D') {
          params.dispMedicoProdSanitario = { idDispMedicoProdSanitario: i.idMedicDisp };

          i.precioUnidad.forEach(element => {
            let unpre = {
              idMedicamento: null,
              idDispMedicoProdSanitario: i.idMedicDisp,
              idUnidad: element.idUnidad,
              precioVenta: element.precio
            }
            unidadesParam.push(unpre);
          });
        }

        this.medicamentoRequest.idConvenio = this.param.idConvenio;
        this.medicamentoRequest.tipoCopago = this.param.tipoCopago;
        this.medicamentoRequest.precioUnidadesJson  = JSON.stringify(unidadesParam);
        console.log(this.medicamentoRequest.precioUnidadesJson );
        console.log(this.medicamentoRequest.idConvenio);

        
      }

      console.log(this.medicamentoRequest)
      this._medicamentoService.postConvenioMedDisp(this.medicamentoRequest)
        .subscribe(data => {
          console.log(data)
          if (data.estado == 1) {
            console.log(data);       
            // idComprobante = data.idComprobante;
            this.toastr.success(data.mensaje);
            this.arrayMedicDisp = [];
            this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
            this.medicamentoRequest.idConvenio = null;
            this.medicamentoRequest.precioUnidadesJson = null;
            this.arrayMedicDisp = [];

            // formInsertarEditarServicio.resetForm();
            this.close(formInsertarEditarServicio);

          } else {
            this.toastr.error(data.mensaje);
          }
        },
          err => { this.toastr.error(err) },
          () => {
          });
    }

    private borrarJsonMedicDisp() {
      let params = {
        idMedicamento: null,
        idDispMedicoProdSanitario: null,
        idMedicDisp: null,
        descMedicDisp: null,
        idUnidad: null,
        unidMed: null,
        fiTipo: null,
        lote: null,
        precioUnidad: [],
        idConvenio : null,
        dciProductoFarmaceutico: null,
        dciDispMedicoProductosSanitario: null
      };
      this.medicDispProd = null;
      this.medicDispProd = params;
      this.descripMedicDispMedicProducSanit = "";
      this.unidadesMedidas = []
    }

    edicionMedicDisp(formInsertarEditarServicio: NgForm) {
      // if (isInvalid(formInsertarEditarServicio)) {
      //   return;
      // }
      if (this.medicDispProd.fiTipo == "M") {
        this.confirmacion = ('¿Está seguro que quiere editar el Producto Farmacútico ' + this.medicDispProd.descMedicDisp + '?');
      }
      else {
        this.confirmacion = ('¿Está seguro que quiere editar el Dispositivo Médico ' + this.medicDispProd.descMedicDisp + '?');
      }

      const dialogRef = this._modalDialog.open(ConfirmacionComponent, {
        autoFocus: false,
        maxWidth: '35%',
        maxHeight: '40%',
        disableClose: true
      });
      dialogRef.componentInstance.confirmacion = this.confirmacion;
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {

          if (this.arrayMedicDisp.length > 0) {

            if (this.arrayMedicDisp[this.indiceAuxiliar].lote == this.medicDispProd.lote) {

            }
            else {
              for (let i of this.arrayMedicDisp) {
                if ((i.idMedicDisp != undefined || i.idMedicDisp != null) && (this.medicDispProd.idMedicDisp != undefined || this.medicDispProd.idMedicDisp != null)) {

                }
              }
            }
            this.medicDispProd.precioUnidad = []
            this.unidadesMedidas.forEach(element => {
              let aux = {
                ididMedicDisp: element.idMedicDisp,
                idUnidad: element.idUnidad,
                nombreUnidad: element.nombreUnidad,
                precio: element.precio
              }
              console.log(aux);

              this.medicDispProd.precioUnidad.push(aux)

              if (element.idUnidad == this.medicDispProd.idUnidad) {
                this.medicDispProd.unidMed = aux;
              }
            });


          }
          this.arrayMedicDisp[this.indiceAuxiliar] = this.medicDispProd;
          this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
          this.toastr.success("Producto Farmacútico/Dispositivo Médico Editado Correctamente");
          this.borrarJsonMedicDisp();
          this.medicDispMedicProdSanit = [];
          this.indiceAuxiliar = undefined;
          this.unidadesMedidas = [];
          this.cantidadAux = 0;
          this.disableMedic = false;
          this.showGuardar = 1;
          formInsertarEditarServicio.resetForm();

        }
      });
    }


    private editarMedicDisp(element, index) {

      let auxPrecio;
      try {

        this.cantidadAux = 0;
        this.disableMedic = true;
        this.showGuardar = 2;
        this.cantidadAux = (element.cantidad * element.unidMed.precio);
        this.medicDispProd = null;
        this.descripMedicDispMedicProducSanit = "";
        this.indiceAuxiliar = index;
        this.descripMedicDispMedicProducSanit = element.descMedicDisp;

        this.unidadesMedidas = [];
        console.log(element.precioUnidad);

        element.precioUnidad.forEach(element => {
          console.log(element);

          let aux = {
            ididMedicDisp: element.idMedicDisp,
            idUnidad: element.idUnidad,
            nombreUnidad: element.nombreUnidad,
            precio: element.precio
          }
          this.unidadesMedidas.push(aux);
        });

        console.log(this.unidadesMedidas);
        auxPrecio = []
        element.precioUnidad.forEach(element => {
          let aux = {
            ididMedicDisp: element.idMedicDisp,
            idUnidad: element.idUnidad,
            nombreUnidad: element.nombreUnidad,
            precio: element.precio
          }
          auxPrecio.push(aux)
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.medicDispProd = {
          idMedicamento: element.idMedicamento,
          idDispMedicoProdSanitario: element.idDispMedicoProdSanitario,
          idMedicDisp: element.idMedicDisp,
          descMedicDisp: element.descMedicDisp,
          fiTipo: element.fiTipo,
          idUnidad: element.idUnidad,
          lote: element.lote,
          unidMed: element.unidMed,
          precioUnidad: auxPrecio,
          idConvenio : this.param.idConvenio,
          dciDispMedicoProductosSanitario : element.dciDispMedicoProductosSanitario,
          dciProductoFarmaceutico: element.dciProductoFarmaceutico

        };

      }
      console.log(this.arrayMedicDisp);

    }

    cancelarEdicion(formInsertarEditarServicio: NgForm) {

      this.close(formInsertarEditarServicio);
    }


    private deleteMedicDisp(idMedicDisp, medicamento, fiTipo) {
      if (this.showGuardar == 2) {
        this.toastr.warning("Usted se encuentra en modo edición, finalice edición o CANCELE");
        return;
      }
      if (fiTipo == "M") {
        this.confirmacion = ('¿Está seguro que quiere eliminar el Producto Farmacútico "' + medicamento + '" ?');
      }
      else {
        this.confirmacion = ('¿Está seguro que quiere eliminar el Dispositivo Médico "' + medicamento + '" ?');
      }
      const dialogRef = this._modalDialog.open(ConfirmacionComponent, {
        autoFocus: false,
        maxWidth: '35%',
        maxHeight: '40%',
        disableClose: true
      });
      dialogRef.componentInstance.confirmacion = this.confirmacion;
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          let index = 0;
          // this.totalM = this.totalM - (cantidad * precioUni);
          for (let i of this.arrayMedicDisp) {
            if (i.idMedicDisp == idMedicDisp) {
              this.arrayMedicDisp.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.arrayMedicDisp);
              this.toastr.success("Producto Farmacútico/Dispositivo Médico Eliminado Correctamente");
            }
            else {
              index++;
            }
          }
        }
      });
    }

    private isInvalid(_ngForm: any): boolean {
      return _ngForm['invalid'] || _ngForm['pending']
        // ||  this.medicamentoRequest.comprobanteFarmacia.proveedor == null || this.medicamentoRequest.comprobanteFarmacia.proveedor == undefined || this.medicamentoRequest.comprobanteFarmacia.proveedor == ""
        || this.medicDispProd.idMedicDisp == null || this.medicDispProd.idMedicDisp == undefined;
    }

    private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
      return setQuantifier(_quantifier1, _quantifier2);
    }

    private setValidatorPattern(_pattern: string, _quantifier: any,
      _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

      return setValidatorPattern(_pattern, _quantifier,
        _exactStart, _exactEnd, _regexFlags);
    }

    private setInputPattern(_event: any, _pattern: any): void {
      setInputPattern(_event, _pattern);
    }


  }
