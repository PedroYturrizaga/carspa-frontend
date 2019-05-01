import { MedicamentoMaterialService } from './../mantenimiento/mantenimiento-content/medicamento-material/services/medicamento-material.service';
import { ModalPdfComponent } from './../../shared/helpers/modal-pdf/modal-pdf.component';
import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { FarmaciaRoutingModule } from './farmacia-routing.module';

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
import { VisualizarInventarioComponent } from './farmacia-content/inventario/inve-por-turno/visualizar-inventario/visualizar-inventario.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
import { RegularizarDiarioComponent } from './farmacia-content/inventario/regularizar-diario/regularizar-diario.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

//#region mantenimiento-anaquel
import { MantenimientoAnaquelComponent } from './farmacia-content/mantenimiento-anaquel/mantenimiento-anaquel.component';
//#enregion

//#region movimiento
import { MovimientoComponent } from './farmacia-content/movimiento/movimiento.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||\ 1
import { NotaEntradaComponent } from './farmacia-content/movimiento/nota-entrada/nota-entrada.component';
import { SolicitarMedicamentoMaterialComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/solicitar-medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { NuevoRequerimientoComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/nuevo-requerimiento/nuevo-requerimiento.component';
import { VisualizarSolicitudComponent } from './farmacia-content/movimiento/solicitar-medicamento-material/visualizar-solicitud/visualizar-solicitud.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
import { TransferirMedicamentoMaterialComponent } from './farmacia-content/movimiento/transferir-medicamento-material/transferir-medicamento-material.component';
// /|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\ 2
import { AtenderSolicitudComponent } from './farmacia-content/movimiento/transferir-medicamento-material/atender-solicitud/atender-solicitud.component';
// \|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||/ 2
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1

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
// \|||||||||||||||||||||||||||||||||||||||||||||||||/ 1
//#enregion

//#region services
import { AtenderRecetaService } from './services/atender-receta.service';
import { MantenimientoAnaquelService } from './services/mantenimiento-anaquel.service';
import { MovimientoService } from './services/movimiento.service';
import { InventarioService } from './services/inventario.service';
import { ReporteFarmaciaService } from './services/reporte-farmacia.service';
import { RecetaService } from '../consulta-ambulatoria/services/receta.service';
import { ConfirmacionNotaEntradaComponent } from './farmacia-content/movimiento/nota-entrada/confirmacion-nota-entrada/confirmacion-nota-entrada.component';
import { VisualizarSolicitudAtendidasComponent } from './farmacia-content/movimiento/transferir-medicamento-material/visualizar-solicitud-atendidas/visualizar-solicitud-atendidas.component';
import { PrevisualizarOrdenComponent } from './farmacia-content/atender-receta/previsualizar-orden/previsualizar-orden.component';
import { VisualizarMedicoProductoCaroComponent } from './farmacia-content/reporte/medico-producto-caro/visualizar-medico-producto-caro/visualizar-medico-producto-caro.component';
import { KardexComponent } from './farmacia-content/kardex/kardex.component';
import { CitaProcedimientoService } from '../admision/services/cita-procedimiento.service';
import { HistorialProdDispComponent } from './farmacia-content/atender-receta/historial-prod-disp/historial-prod-disp.component';
import { ActoMedicoComponent } from './farmacia-content/atender-receta/acto-medico/acto-medico.component';
import { CorrelativoComponent } from './farmacia-content/correlativo/correlativo.component';
import { CorrelativoService } from './services/correlativo.service';
import { ModalInsertarEditarCorrelativoComponent } from './farmacia-content/correlativo/modal-insertar-editar-correlativo/modal-insertar-editar-correlativo.component';
//#enregion

@NgModule({
  imports: [
    ModuleModule,
    FarmaciaRoutingModule
  ],
  declarations: [
    FarmaciaContentComponent, // content
    AtenderRecetaComponent, // atender-receta
    InventarioComponent, // inventario
    AnaquelComponent, InveInicialComponent, InvePorTurnoComponent, // 1
    TomarInventarioComponent, VisualizarInventarioComponent, // 2
    RegularizarDiarioComponent, // 1    
    MantenimientoAnaquelComponent, // mantenimiento-anaquel
    MovimientoComponent, // movimiento
    NotaEntradaComponent, SolicitarMedicamentoMaterialComponent, // 1
    NuevoRequerimientoComponent, VisualizarSolicitudComponent, // 2
    TransferirMedicamentoMaterialComponent, // 1
    AtenderSolicitudComponent, // 2
    ReporteComponent, // reporte
    AbastecimientoComponent, ConsumoServicioComponent, // 1
    MedicamentoRecetaComponent, MedicoProductoCaroComponent, // 1
    MovimientoIngresoComponent, MovimientoIngresoSalidaComponent, // 1
    ProductoRecetaComponent, RecetaAtendidaNoAtendidaComponent,
    ConfirmacionNotaEntradaComponent, VisualizarSolicitudAtendidasComponent,
    PrevisualizarOrdenComponent, VisualizarMedicoProductoCaroComponent,
    HistorialProdDispComponent, ActoMedicoComponent, KardexComponent, CorrelativoComponent, ModalInsertarEditarCorrelativoComponent // 1
  ],
  entryComponents: [
    VisualizarInventarioComponent, // inventario
    AtenderSolicitudComponent, NuevoRequerimientoComponent, // movimiento
    VisualizarSolicitudComponent, // movimiento
    ConfirmacionNotaEntradaComponent,
    ModalPdfComponent,
    VisualizarSolicitudAtendidasComponent,
    PrevisualizarOrdenComponent,
    VisualizarMedicoProductoCaroComponent,
    HistorialProdDispComponent,
    ActoMedicoComponent,
    ModalInsertarEditarCorrelativoComponent
  ],
  providers: [
    AtenderRecetaService,
    MantenimientoAnaquelService,
    MovimientoService,
    InventarioService,
    ReporteFarmaciaService,
    RecetaService,
    MedicamentoMaterialService,
    CitaProcedimientoService,
    CorrelativoService
    // { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
    // {provide:  MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay]}
  ]
})
export class FarmaciaModule { }