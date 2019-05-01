import { NgModule } from '@angular/core';

// module
import { ModuleModule } from '../../../module.module';

// routing
import { MedicamentoMaterialRoutingModule } from './medicamento-material-routing.module';

//#region medicamento-material
import { MedicamentoMaterialComponent } from './medicamento-material/medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { RegistrarMedicamentoMaterialComponent } from './medicamento-material/registrar-medicamento-material/registrar-medicamento-material.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

//#region services
import { MedicamentoMaterialService } from './services/medicamento-material.service';
import { GuardarEditarMedicamentoComponent } from './medicamento-material/registrar-medicamento-material/guardar-editar-medicamento/guardar-editar-medicamento.component';
//#endregion

@NgModule({
  imports: [
    ModuleModule,
    MedicamentoMaterialRoutingModule
  ],
  declarations: [
    MedicamentoMaterialComponent,
    RegistrarMedicamentoMaterialComponent,
    GuardarEditarMedicamentoComponent
  ],
  entryComponents: [
    RegistrarMedicamentoMaterialComponent,
    GuardarEditarMedicamentoComponent
  ],
  providers: [
    MedicamentoMaterialService
  ]
})
export class MedicamentoMaterialModule { }
