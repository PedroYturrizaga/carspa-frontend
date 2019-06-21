import { Component, OnInit , Input} from '@angular/core';
import { isInvalid, setQuantifier, setValidatorPattern, setInputPattern } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { CompraService } from '../../services/compra.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { MatDialog,MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';
@Component({
  selector: 'app-registrar-actualizar',
  templateUrl: './registrar-actualizar.component.html',
  styleUrls: ['./registrar-actualizar.component.scss']
})
export class RegistrarActualizarComponent implements OnInit {
  @Input() e;
  @Input() op;


  private lsTipoPago = [];

  private request = {
    proveedor:{
     idProveedor:null,
      contacto: null,
    direccion: null,
    email: null,
    idTipoPago: 1,
    nombreProveedor: null,
    ruc: null,
    telefono: null
  }


}
  
  private disabled: boolean = true;
  private disabledEdit: boolean = true;

  private show=0;
  constructor(
    private _compraService: CompraService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<RegistrarActualizarComponent>
  ) { }


  ngOnInit() {
    this.getDatos();
    this.getTipoPago();
    
  }

  private close(add) {
    this.dialogRef.close(add);
  }




  public getDatos(){ 
    if(this.op==1){
     
      
      this.request.proveedor.nombreProveedor=this.e.nombreProveedor;
      this.request.proveedor.direccion=this.e.direccion;
      this.request.proveedor.email=this.e.email;
      this.request.proveedor.telefono=this.e.telefono;
      this.request.proveedor.contacto=this.e.contacto;
      this.request.proveedor.ruc=this.e.ruc;
      this.disabled=true;
      this.disabledEdit=false;
    }
    if(this.op==0){
      this.show=1;
      this.disabled=false;
    }
    if(this.op==2){
      this.request.proveedor.nombreProveedor=this.e.nombreProveedor;
      this.request.proveedor.direccion=this.e.direccion;
      this.request.proveedor.email=this.e.email;
      this.request.proveedor.telefono=this.e.telefono;
      this.request.proveedor.contacto=this.e.contacto;
      this.request.proveedor.ruc=this.e.ruc;
      this.disabled=false;
      this.show=3;
      this.disabledEdit=true;    
    }
  }


  
 

  private isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  private setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
  
    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }



  private getTipoPago(){
    this._compraService.getTipoPago().subscribe(data => {
        if (data.estado == 1) {
          this.lsTipoPago=data.proveedorList;
        } else {
          this.toastr.info(data.mensaje);
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
  

  private update(){
    this.request.proveedor.idProveedor=this.e.idProveedor;
     this._compraService.actualizarProveedor(this.request.proveedor).subscribe(data => {
     if (data.estado == 1) {
       console.log(data);        
       this.toastr.success("Se actualizó el proveedor");
       this.close(1);
     } else {
       this.toastr.warning(data.confirmacion.mensaje);
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
  
  


  private insert(){
    console.log(this.request);
    this._compraService.registrarProveedor(this.request.proveedor).subscribe(data => {
      console.log(data);
        if (data.estado == 1) {
          this.toastr.success("Se insertó el proveedor");
          this.close(1);
        } else {
          this.toastr.warning(data.confirmacion.mensaje);
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






}
