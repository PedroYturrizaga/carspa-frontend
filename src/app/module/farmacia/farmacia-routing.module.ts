import { KardexComponent } from './farmacia-content/kardex/kardex.component';
import { NgModule } from '@angular/core';

// routes
import { Routes, RouterModule } from '@angular/router';

// content
import { FarmaciaContentComponent } from './farmacia-content/farmacia-content.component';

//#region atender-receta
import { AtenderRecetaComponent } from './farmacia-content/atender-receta/atender-receta.component';
//#enregion

//#region inventario
import { InventarioComponent } from './farmacia-content/inventario/inventario.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { AnaquelComponent } from './farmacia-content/inventario/anaquel/anaquel.component';
import { InveInicialComponent } from './farmacia-content/inventario/inve-inicial/inve-inicial.component';
import { InvePorTurnoComponent } from './farmacia-content/inventario/inve-por-turno/inve-por-turno.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { TomarInventarioComponent } from './farmacia-content/inventario/inve-por-turno/tomar-inventario/tomar-inventario.component';
// import { VisualizarInventarioComponent } from './farmacia-content/inventario/inve-por-turno/visualizar-inventario/visualizar-inventario.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
import { RegularizarDiarioComponent } from './farmacia-content/inventario/regularizar-diario/regularizar-diario.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

//#region mantenimiento-anaquel
import { MantenimientoAnaquelComponent } from './farmacia-content/mantenimiento-anaquel/mantenimiento-anaquel.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
/* import { GestionarAlmacenComponent } from './farmacia-content/mantenimiento/gestionar-almacen/gestionar-almacen.component';
import { GestionarProveedorComponent } from './farmacia-content/mantenimiento/gestionar-proveedor/gestionar-proveedor.component';
import { MedicamentoMaterialComponent } from './farmacia-content/mantenimiento/medicamento-material/medicamento-material.component';
 */// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { RegistrarMedicamentoMaterialComponent } from './farmacia-content/mantenimiento/medicamento-material/registrar-medicamento-material/registrar-medicamento-material.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

//#region movimiento
import { MovimientoComponent } from './farmacia-content/movimiento/movimiento.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { NotaEntradaComponent } from './farmacia-content/movimiento/nota-entrada/nota-entrada.component';
import { SolicitarMedicamentoMaterialComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/solicitar-medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { NuevoRequerimientoComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/nuevo-requerimiento/nuevo-requerimiento.component';
// import { VisualizarSolicitudComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/visualizar-solicitud/visualizar-solicitud.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
import { TransferirMedicamentoMaterialComponent } from './farmacia-content/movimiento/transferir-medicamento-material/transferir-medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
// import { AtenderSolicitudComponent } from './farmacia-content/movimiento/transferir-medicamento-material/atender-solicitud/atender-solicitud.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

//#region reporte
import { ReporteComponent } from './farmacia-content/reporte/reporte.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { AbastecimientoComponent } from './farmacia-content/reporte/abastecimiento/abastecimiento.component';
import { ConsumoServicioComponent } from './farmacia-content/reporte/consumo-servicio/consumo-servicio.component';
import { MedicamentoRecetaComponent } from './farmacia-content/reporte/medicamento-receta/medicamento-receta.component';
import { MedicoProductoCaroComponent } from './farmacia-content/reporte/medico-producto-caro/medico-producto-caro.component';
import { MovimientoIngresoComponent } from './farmacia-content/reporte/movimiento-ingreso/movimiento-ingreso.component';
import { MovimientoIngresoSalidaComponent } from './farmacia-content/reporte/movimiento-ingreso-salida/movimiento-ingreso-salida.component';
import { ProductoRecetaComponent } from './farmacia-content/reporte/producto-receta/producto-receta.component';
import { RecetaAtendidaNoAtendidaComponent } from './farmacia-content/reporte/receta-atendida-no-atendida/receta-atendida-no-atendida.component';
import { CorrelativoComponent } from './farmacia-content/correlativo/correlativo.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

// LOS COMPONENTES QUE NO INCLUYAS EN LAS RUTAS, COMENTAR ARRIBA ^
const routes: Routes = [
  {
    path: '', component: FarmaciaContentComponent, children: [
      {
        path: 'atender-receta', component: AtenderRecetaComponent
      },
      {
        path: 'mantenimiento-anaquel', component: MantenimientoAnaquelComponent
      },
      {
        path: 'movimiento', component: MovimientoComponent, children: [
          { path: 'nota-entrada', component: NotaEntradaComponent },
          { path: 'solicitar-medicamento-material', component: SolicitarMedicamentoMaterialComponent },
          { path: 'transferir-medicamento-material', component: TransferirMedicamentoMaterialComponent },
        ]
      },
      {
        path: 'inventario', component: InventarioComponent, children: [
          { path: 'inve-por-turno', component: InvePorTurnoComponent },
          { path: 'inve-inicial', component: InveInicialComponent },
          { path: 'regularizar-diario', component: RegularizarDiarioComponent },
          { path: 'anaquel', component: AnaquelComponent }
        ]
      },
      {
        path: 'reporte', component: ReporteComponent, children: [
          { path: 'abastecimiento', component: AbastecimientoComponent },
          { path: 'consumo-servicio', component: ConsumoServicioComponent },
          { path: 'medicamento-receta', component: MedicamentoRecetaComponent },
          { path: 'medico-producto-caro', component: MedicoProductoCaroComponent },
          { path: 'movimiento-ingreso', component: MovimientoIngresoComponent },
          { path: 'movimiento-ingreso-salida', component: MovimientoIngresoSalidaComponent },
          { path: 'producto-receta', component: ProductoRecetaComponent },
          { path: 'receta-atendida-no-atendida', component: RecetaAtendidaNoAtendidaComponent }
        ]
      },
      {
        path: 'kardex', component: KardexComponent
      },
      {
        path: 'correlativo', component: CorrelativoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmaciaRoutingModule { }
