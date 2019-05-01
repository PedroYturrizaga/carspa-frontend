import { GestionarCajaComponent } from './caja-content/gestionar-caja/gestionar-caja.component';
import { NgModule } from '@angular/core';

//routes
import { Routes, RouterModule } from '@angular/router';

// content
import { CajaContentComponent } from './caja-content/caja-content.component';

//#region apertur-cierre-caja
import { GestionComponent } from './caja-content/gestion/gestion.component';
//#endregion

//#region gestion
import { AperturCierreCajaComponent } from './caja-content/apertur-cierre-caja/apertur-cierre-caja.component';

import { ListarOrdenesCobroComponent } from './caja-content/listar-ordenes-cobro/listar-ordenes-cobro.component';
import { AdministrarCajaComponent } from './caja-content/administrar-caja/administrar-caja.component';
//#endregion

// import { RealizarPagoComponent } from './caja-content/realizar-pago/realizar-pago.component';

//#endregion
// LOS COMPONENTES QUE NO INCLUYAS EN LAS RUTAS, COMENTAR ARRIBA ^

const routes: Routes = [
  {
    path: '', component: CajaContentComponent, children: [
      { path: 'gestion', component: GestionComponent },
      { path: 'apertur-cierre-caja', component: AperturCierreCajaComponent },
      { path: 'listar-ordenes-cobro', component: ListarOrdenesCobroComponent },
      // { path: 'realizar-pago', component: RealizarPagoComponent },
      { path: 'gestionar-caja', component: GestionarCajaComponent },

    { path: 'listarOrdenesCobro', component: ListarOrdenesCobroComponent },
      { path: 'administrar-caja', component: AdministrarCajaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
