import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

//#region medicamento-material
import { MedicamentoMaterialComponent } from './medicamento-material/medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
// import { RegistrarMedicamentoMaterialComponent } from './medicamento-material/registrar-medicamento-material/registrar-medicamento-material.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#endregion

const routes: Routes = [
  {
    path: '', component: MedicamentoMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentoMaterialRoutingModule { }
