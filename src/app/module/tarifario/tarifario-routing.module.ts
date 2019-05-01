import { ConvenioComponent } from './tarifario-content/convenio/convenio.component';
import { ConvenioMedicamentoComponent } from './tarifario-content/medicamento/convenio-medicamento/convenio-medicamento.component';
import { ServicioCoberturaComponent } from './tarifario-content/servicio-cobertura/servicio-cobertura.component';
import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { CrearIafaComponent } from './tarifario-content/iafas/crear-iafa/crear-iafa.component';
import { ProductoComponent } from './tarifario-content/producto/producto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarifarioContentComponent } from './tarifario-content/tarifario-content.component';
import { ServicioComponent } from './tarifario-content/servicio/servicio.component';
import { AdministrarServicioComponent } from './tarifario-content/servicio/administrar-servicio/administrar-servicio.component';
import { AsignarIafaComponent } from './tarifario-content/servicio/asignar-iafa/asignar-iafa.component';
import { CoberturaComponent } from './tarifario-content/cobertura/cobertura.component';
import { MedicamentoComponent } from './tarifario-content/medicamento/medicamento.component';
import { ContratanteComponent } from './tarifario-content/contratante/contratante.component';
import { IafasComponent } from './tarifario-content/iafas/iafas.component';
import { EditarIafaComponent } from './tarifario-content/iafas/editar-iafa/editar-iafa.component';
import { MedicamentoCoberturaComponent } from './tarifario-content/medicamento/medicamento-cobertura/medicamento-cobertura.component';
import { PersonalContratanteComponent } from './tarifario-content/personal-contratante/personal-contratante.component';

const routes: Routes = [
  {
    path: '', component: TarifarioContentComponent, children:
      [
        {
          path: 'servicio', component: ServicioComponent, children:
            [
              { path: 'administrar-servicio', component: AdministrarServicioComponent },
              { path: 'asignar-iafas', component: AsignarIafaComponent },
              { path: 'servicio-cobertura', component: ServicioCoberturaComponent }
            ]
        },
        {
          path: 'producto', component: ProductoComponent
        },
        {
          path: 'cobertura', component: CoberturaComponent
        },
        {
          path: 'servicio-cobertura', component: ServicioCoberturaComponent
        },
        {
          path: 'medicamento', component: MedicamentoComponent, children:
            [
              { path: 'convenio-medicamento', component: ConvenioMedicamentoComponent },
              { path: 'medicamento-cobertura', component: MedicamentoCoberturaComponent }
            ]
        },
        {
          path: 'contratante', component: ContratanteComponent
        },
        {
          path: 'iafas', component: IafasComponent
        },
        {
          path: 'convenio', component: ConvenioComponent
        },
      {
        path: 'personal-contratante',component: PersonalContratanteComponent
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifarioRoutingModule { }
