import { Component, OnInit, Input } from '@angular/core';
import { AdministrarMaquinariaService } from '../../../administrar-maquinaria.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { log } from 'util';

@Component({
  selector: 'app-regist-actua',
  templateUrl: './regist-actua.component.html',
  styleUrls: ['./regist-actua.component.scss']
})
export class RegistActuaComponent implements OnInit {
  @Input() e;
  @Input() op;
  private request={    
    maquinaria:{    
    idMaquinaria:null,
    nombre:null,
    marca:null,
    cantidad:null,
    fechaMantenimiento:null,
    detalle:null
    }
  }
  private disabled: boolean = true;
  private show=0;
  constructor(private _maquinariaService: AdministrarMaquinariaService,
    private toastr: ToastsManager,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<RegistActuaComponent>) { }
private inicial(){

}
close(add) {
  this.dialogRef.close(add);
}
public getDatos(){
  console.log(this.e);
  
  if(this.op==1){
    this.request.maquinaria.nombre=this.e.nombre;
    this.request.maquinaria.marca=this.e.marca;
    this.request.maquinaria.cantidad=this.e.cantidad;
    this.request.maquinaria.fechaMantenimiento=this.e.fechaMantenimiento;
    this.request.maquinaria.detalle=this.e.detalle;
    this.disabled=true;
  }
  if(this.op==0){
    this.show=1;
  }
  if(this.op==2){
    this.request.maquinaria.nombre=this.e.nombre;
    this.request.maquinaria.marca=this.e.marca;
    this.request.maquinaria.cantidad=this.e.cantidad;
    this.request.maquinaria.fechaMantenimiento=this.e.fechaMantenimiento;
    this.request.maquinaria.detalle=this.e.detalle;
    this.disabled=false;
    this.show=3;
  }
}
private update(){
  this.request.maquinaria.idMaquinaria=this.e.idMaquinaria;
  console.log(this.request);
  this._maquinariaService.updateMaquinaria(this.request).subscribe(data => {
      if (data.estado == 1) {
        this.toastr.success("Se actualizó la maquinaria");
        this.close(1);
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
private insert(){
  console.log(this.request);
  this._maquinariaService.insertMaquinaria(this.request).subscribe(data => {
    console.log(data);
      if (data.estado == 1) {
        this.toastr.success("Se insertó la maquinaria");
        this.close(1);
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
  ngOnInit() {
    this.getDatos();
  }

}
