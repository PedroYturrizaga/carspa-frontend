import { ModalPdfComponent } from './../../shared/helpers/modal-pdf/modal-pdf.component';
import { AlmacenService } from './services/almacen.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenContentComponent } from './almacen-content/almacen-content.component';
import { RegistrarMaterialComponent } from './almacen-content/registrar-material/registrar-material.component';
import { ModuleModule } from '../module.module';
import { VisualizarMaterialesComponent } from './almacen-content/registrar-material/visualizar-materiales/visualizar-materiales.component';
import { RegistrarAnaquelComponent } from './almacen-content/registrar-material/registrar-anaquel/registrar-anaquel.component';
import { SalidaMaterialComponent } from './almacen-content/salida-material/salida-material.component';
import { VisualizarSalidaMaterialComponent } from './almacen-content/salida-material/visualizar-salida-material/visualizar-salida-material.component';
import { ModalUsuarioComponent } from './almacen-content/salida-material/modal-usuario/modal-usuario.component';
import { ConsultarMovimientosComponent } from './almacen-content/consultar-movimientos/consultar-movimientos.component';

@NgModule({
  imports: [
    ModuleModule,
    AlmacenRoutingModule
  ],
  declarations: [
    AlmacenContentComponent,
    RegistrarMaterialComponent,
    VisualizarMaterialesComponent,
    RegistrarAnaquelComponent,
    SalidaMaterialComponent,
    VisualizarSalidaMaterialComponent,
    ModalUsuarioComponent,
    ConsultarMovimientosComponent
  ],

  entryComponents: [
    VisualizarMaterialesComponent,
    RegistrarAnaquelComponent,
    VisualizarSalidaMaterialComponent,
    ModalUsuarioComponent,
    ModalPdfComponent
  ],

  providers: [
    AlmacenService
  ]
})
export class AlmacenModule { }
