import { VerDetalleComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/generar-receta/ver-detalle/ver-detalle.component';
import { DeleteRecetaComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/generar-receta/delete-receta/delete-receta.component';
import { DeleteMedicamentoComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/generar-receta/delete-medicamento/delete-medicamento.component';
import { GenerarRecetaComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/generar-receta/generar-receta.component';
import { VisualizarDetalleRecetaComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/buscar-receta/visualizar-detalle-receta/visualizar-detalle-receta.component';
import { BuscarRecetaComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/buscar-receta/buscar-receta.component';
import { BuscarMedicamentoComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/buscar-medicamento/buscar-medicamento.component';
import { RecetaComponent } from './../atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/receta.component';
import { ProcedimientosService } from './../../services/procedimientos.service';
import { AtencionMedicaAmbulatoriaService } from './../../services/atencion-medica-ambulatoria.service';
import { NgModule } from '@angular/core';
// module
import { ModuleModule } from '../../../module.module';

import { AtencionDeProcedimientosRoutingModule } from './atencion-de-procedimientos-routing.module';
import { AtencionDeProcedimientosComponent } from './atencion-de-procedimientos/atencion-de-procedimientos.component';
import { ConfirmarAusenciaComponent } from './atencion-de-procedimientos/confirmar-ausencia/confirmar-ausencia.component';
import { RegistrarProcedimientoComponent } from './atencion-de-procedimientos/registrar-procedimiento/registrar-procedimiento.component';

@NgModule({
  imports: [
    ModuleModule,
    AtencionDeProcedimientosRoutingModule,
    // RecetaComponent,    
    //   BuscarMedicamentoComponent, 
    //   BuscarRecetaComponent, // 2
    //     VisualizarDetalleRecetaComponent, // 3
    //   GenerarRecetaComponent, // 2
    //     DeleteMedicamentoComponent, 
    //     DeleteRecetaComponent, // 3
    //     VerDetalleComponent
  ],
  declarations: [
    AtencionDeProcedimientosComponent,
    ConfirmarAusenciaComponent,
    RegistrarProcedimientoComponent,
  //  RecetaComponent,
  //  BuscarMedicamentoComponent, 
  //     BuscarRecetaComponent, // 2
  //       VisualizarDetalleRecetaComponent, // 3
  //     GenerarRecetaComponent, // 2
  //       DeleteMedicamentoComponent, 
  //       DeleteRecetaComponent, // 3
  //       VerDetalleComponent
  ],
  entryComponents:[
     ConfirmarAusenciaComponent,
  //    RecetaComponent,
  //    BuscarMedicamentoComponent, 
  //     BuscarRecetaComponent, // 2
  //       VisualizarDetalleRecetaComponent, // 3
  //     GenerarRecetaComponent, // 2
  //       DeleteMedicamentoComponent, 
  //       DeleteRecetaComponent, // 3
  //       VerDetalleComponent
  ],
  providers: [
    AtencionMedicaAmbulatoriaService,
    ProcedimientosService
  ] 
})
export class AtencionDeProcedimientosModule { }
