import { Component, OnInit,Input } from '@angular/core';
import { CompraService } from '../../../services/compra.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { setInputPattern, setValidatorPattern, setQuantifier, isInvalid } from '../../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-registrar-actualizar-mp',
  templateUrl: './registrar-actualizar-mp.component.html',
  styleUrls: ['./registrar-actualizar-mp.component.scss']
})
export class RegistrarActualizarMpComponent implements OnInit {
  @Input() e;
  @Input() op;
  private lsMaterial = [];
  private request={    
    materialProveedor:{    
   idMaterialProveedor:null,
      codMatProv :null,
    nombre:null,
    precioCompra:null,
    idMaterial:1,
    idProveedor:null,
    unidadMedida:null,
    factorConversion:null,
    }
  }
  private disabled: boolean = true;
  private disabledEdit: boolean = true;
  private show=0;

  constructor(private _compraService: CompraService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<RegistrarActualizarMpComponent>) { 


  }
  ngOnInit() {
   
    this.getDatos();
    this.getMaterial();
   
    
  }



  close(add) {
    this.dialogRef.close(add);
  }


  public getDatos(){ 
    if(this.op==1){
           
      this.request.materialProveedor.codMatProv=this.e.codMatProv;
       this.request.materialProveedor.nombre=this.e.nombre;
      this.request.materialProveedor.precioCompra=this.e.precioCompra;
      this.request.materialProveedor.unidadMedida=this.e.unidadMedida;
      this.request.materialProveedor.factorConversion=this.e.factorConversion;
     
      this.disabled=true;
      this.disabledEdit=false;
    }
    if(this.op==0){
   
      this.show=1;
      this.disabled=false;
    }
    if(this.op==2){
      this.request.materialProveedor.codMatProv=this.e.codMatProv;
       this.request.materialProveedor.precioCompra=this.e.precioCompra;
      this.request.materialProveedor.unidadMedida=this.e.unidadMedida;
      this.request.materialProveedor.factorConversion=this.e.factorConversion;
         this.show=3;
      this.disabled=false;
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



  private getMaterial(){
    this._compraService.getMaterial().subscribe(data => {
        if (data.estado == 1) {
          this.lsMaterial=data.materialproveedorList;
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
    this.request.materialProveedor.idMaterialProveedor=this.e.idMaterialProveedor;
     this._compraService.actualizarMaterialProveedor(this.request.materialProveedor).subscribe(data => {
     if (data.estado== 1) {
       console.log(data);        
       this.toastr.success("Se actualizó el material ");
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
   this.request.materialProveedor.idProveedor=1;
  this._compraService.registrarMaterialProveedor(this.request.materialProveedor).subscribe(data => {
    console.log(data);
      if (data.estado == 1) {
        this.toastr.success("Se insertó el material");
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
