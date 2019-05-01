import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { HospitalizacionContentComponent } from './hospitalizacion-content/hospitalizacion-content.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalizacionRoutingModule { }
