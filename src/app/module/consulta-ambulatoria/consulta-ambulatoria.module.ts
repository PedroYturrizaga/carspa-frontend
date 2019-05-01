import { RecetaComponent } from './consulta-ambulatoria-content/atencion-medica-ambulatoria/atencion-medica-ambulatoria/receta/receta.component';
import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { ConsultaAmbulatoriaRoutingModule } from './consulta-ambulatoria-routing.module';

// content
import { ConsultaAmbulatoriaContentComponent } from './consulta-ambulatoria-content/consulta-ambulatoria-content.component';

//services
import { RecetaService } from './services/receta.service';
import { AtencionProcedimientosService } from './services/atencion-procedimientos.service';

import { DataService } from './../../shared/services/data.service';
import { ModalPdfComponent } from './../../shared/helpers/modal-pdf/modal-pdf.component';
import { VerActoMedicoComponent } from './../../shared/others/ver-acto-medico/ver-acto-medico.component';
import { MovimientoService } from '../farmacia/services/movimiento.service';
// import { AtencionMedicaService } from './services/atencion-medica.service';

const EXPORTS = [
  RecetaComponent
];

@NgModule({
  imports: [
    ModuleModule,
    ConsultaAmbulatoriaRoutingModule,
    //RecetaComponent
  ], 
  //exports: EXPORTS,
  declarations: [
    ConsultaAmbulatoriaContentComponent,
    //RecetaComponent
  ],entryComponents: [
    ModalPdfComponent,
    VerActoMedicoComponent,
    ModalConfirmacionComponent,
    //RecetaComponent
  ],
  providers:[
    RecetaService,
    AtencionProcedimientosService,
    DataService,
    MovimientoService
    // AtencionMedicaService
  ]
  
})
export class ConsultaAmbulatoriaModule { }
