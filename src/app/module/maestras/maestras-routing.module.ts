import { CptEspecialidadComponent } from './maestras-content/cpt-especialidad/cpt-especialidad.component';
import { AmbienteComponent } from './maestras-content/ambiente/ambiente.component';
import { MaestrasContentComponent } from './maestras-content/maestras-content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEspeActiGrupOcupComponent } from './maestras-content/area-espe-acti-grup-ocup/area-espe-acti-grup-ocup.component';
import { AreaEspecialidadActividadComponent } from './maestras-content/area-especialidad-actividad/area-especialidad-actividad.component';
import { AreaComponent } from './maestras-content/area/area.component';
import { EspecialidadComponent } from './maestras-content/especialidad/especialidad.component';
import { ActividadComponent } from './maestras-content/actividad/actividad.component';
import { SubActividadComponent } from './maestras-content/sub-actividad/sub-actividad.component';
import { GrupoOcupacionalComponent } from './maestras-content/grupo-ocupacional/grupo-ocupacional.component';
import { AreaEspecialidadComponent } from './maestras-content/area-especialidad/area-especialidad.component';
import { TipoOrdenComponent } from './maestras-content/tipo-orden/tipo-orden.component';
import { MaproComponent } from './maestras-content/mapro/mapro.component';


const routes: Routes = [
  {
    path: '', component: MaestrasContentComponent, children: [
      {
        path: 'area', component: AreaComponent
      },
      {
        path: 'especialidad', component: EspecialidadComponent
      },
      {
        path: 'actividad', component: ActividadComponent
      },
      {
        path: 'sub-actividad', component: SubActividadComponent
      },
      {
        path: 'area-especialidad', component: AreaEspecialidadComponent
      },
      {
        path: 'area-especialidad-actividad', component: AreaEspecialidadActividadComponent
      },
      {
        path: 'grupo-ocupacional', component: GrupoOcupacionalComponent
      },
      {
        path: 'area-espe-acti-grup-ocup', component: AreaEspeActiGrupOcupComponent
      },
      {
        path: 'tipo-orden', component: TipoOrdenComponent
      },
      {
        path: 'ambiente', component: AmbienteComponent
      },
      {
        path: 'cpt-especialidad' , component: CptEspecialidadComponent
      }  ,
      {
        path: 'mapro' , component: MaproComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestrasRoutingModule { }
