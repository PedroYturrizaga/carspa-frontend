// import { Component, OnInit, Input } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/src/toast-manager';
// import { Observable } from 'rxjs/Observable';
// import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
// import {
//   setQuantifier, setValidatorPattern,
//   setInputPattern, isInvalid
// } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
// import { ContratanteService } from '../../../services/contratante.service';


// @Component({
//   selector: 'app-insertar-editar-contratante',
//   templateUrl: './insertar-editar-contratante.component.html',
//   styleUrls: ['./insertar-editar-contratante.component.scss']
// })
// export class InsertarEditarContratanteComponent implements OnInit {

//   @Input() flag;
//   @Input() contratanteCo;

//   private contratante: any[];
//   private paramsBusqueda = { nombreEmpresaExterna: null, url: null };
//   private params = { idEmpresaExterna: null, nombreEmpresaExterna: null, url: null };

//   constructor(
//     private _contratanteService: ContratanteService,
//     private toastr: ToastsManager,
//     private dialogRef: MatDialogRef<InsertarEditarContratanteComponent>) { }

//   ngOnInit() {
//     console.log(this.flag);
//     console.log(this.contratanteCo);
//     if (this.flag == 2) {
//       this.paramsBusqueda.nombreEmpresaExterna = this.contratanteCo.nombreEmpresaExterna;
//       this.paramsBusqueda.url = this.contratanteCo.url;
//       // this.getConvenios();
//       // this.getListProductos();
//       // this.getComboTipoCobertura();
//     } else if (this.flag == 1) {
//       // this.getConvenios();
//       // this.getComboTipoCobertura();
//     }
//   }

//   private insertarNuevoContratante() {
//     console.log(this.paramsBusqueda);
//     this._contratanteService.insertarContratante(this.paramsBusqueda)
//       .subscribe(data => {
//         if (data.estado == 1) {
//           this.toastr.success(data.mensaje);
//           this.close(1);
//         } else {
//           this.toastr.error(data.mensaje);
//         }
//       },
//       error => {
//         this.toastr.error(error);
//       }),
//       err => this.toastr.error(err),
//       () => this.toastr.success('Request Complete');
//   }

//   private actualizarNuevoContratante() {
//     this.params.idEmpresaExterna = this.contratanteCo.idEmpresaExterna;
//     this.params.nombreEmpresaExterna = this.paramsBusqueda.nombreEmpresaExterna;
//     this.params.url = this.paramsBusqueda.url;
//     console.log(this.params)
//     this._contratanteService.editarContratante(this.params)
//       .subscribe(data => {
//         if (data.estado == 1) {
//           this.toastr.success(data.mensaje);
//           this.close(1);
//         } else {
//           this.toastr.error(data.mensaje);
//         }
//       },
//       error => {
//         this.toastr.error(error);
//       }),
//       err => this.toastr.error(err),
//       () => this.toastr.success('Request Complete');
//   }

//   private close(add) {
//     this.dialogRef.close(add);
//   }
//   private setInputPattern(_event: any, _pattern: any): void {
//     setInputPattern(_event, _pattern);
//   }
//   private setValidatorPattern(_pattern: string, _quantifier: any,
//     _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {

//     return setValidatorPattern(_pattern, _quantifier,
//       _exactStart, _exactEnd, _regexFlags);
//   }
//   private setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
//     return setQuantifier(_quantifier1, _quantifier2);
//   }

// c

// }
