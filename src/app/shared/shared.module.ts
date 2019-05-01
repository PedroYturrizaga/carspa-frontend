import { ModalPdfComponent } from './helpers/modal-pdf/modal-pdf.component';
import { NgModule, ModuleWithProviders } from '@angular/core';

//#region modules
import { CommonModule } from '@angular/common';
//#endregion

//#region custom modules
import { MaterialModule } from './material.module';
import { CustomFormsModule } from './helpers/custom-validators/ng4-validators/custom-forms.module';
//#endregion

//#region components
import { ValidatorsMessagesComponent } from './helpers/custom-validators/validators-messages/validators-messages.component';
import { PersonaDatosComponent } from './others/persona-datos/persona-datos.component';
import { ActoMedicoCitaComponent } from './others/acto-medico-cita/acto-medico-cita.component';
import { VerActoMedicoComponent } from './others/ver-acto-medico/ver-acto-medico.component'
import { ModalConfirmacionComponent } from './others/modal-confirmacion/modal-confirmacion.component';
//#endregion

//#PipesMudle
import { PipesModule } from './pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//##

const IMPORTS = [
  CommonModule,
  MaterialModule,
  PipesModule
];

const EXPORTS = [
  CommonModule,
  MaterialModule,
  CustomFormsModule,
  ValidatorsMessagesComponent,
  PersonaDatosComponent,
  ActoMedicoCitaComponent,
  ModalPdfComponent,
  VerActoMedicoComponent,
  ModalConfirmacionComponent,
  PipesModule,
  NgbModule
  // TruncatePipe
];

const DECLARATIONS = [
  ValidatorsMessagesComponent,
  PersonaDatosComponent,
  ActoMedicoCitaComponent,
  ModalPdfComponent,
  VerActoMedicoComponent,
  ModalConfirmacionComponent
  // TruncatePipe
];

@NgModule({
  imports: IMPORTS,
  exports: EXPORTS,
  declarations: DECLARATIONS
})
export class SharedModule { }
