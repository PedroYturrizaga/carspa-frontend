
import { CitaService } from './../admision/services/cita.service';
import { GestionarCajaComponent } from './caja-content/gestionar-caja/gestionar-caja.component';
import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { AreaService } from './../maestras/services/area.service';
import { NgModule } from '@angular/core';

// modules
import { ModuleModule } from '../module.module';

// routing
import { CajaRoutingModule } from './caja-routing.module';

// content
import { CajaContentComponent } from './caja-content/caja-content.component';

//#region apertur-cierre-caja
import { GestionComponent } from './caja-content/gestion/gestion.component';
//#endregion

//#region gestion
import { AperturCierreCajaComponent } from './caja-content/apertur-cierre-caja/apertur-cierre-caja.component';
import { ListarOrdenesCobroComponent } from './caja-content/listar-ordenes-cobro/listar-ordenes-cobro.component';
//#endregion

//#region services
import { GestionService } from './services/gestion.service';
import { AperturaCierreCajaService } from './services/apertura-cierre-caja.service';
import { ListarOrdenesCobroService } from './services/listar-ordenes-cobro.service';
import { AdministrarCajaComponent } from './caja-content/administrar-caja/administrar-caja.component';
import { AdministrarCajaService } from './services/administrar-caja.service';
// import { RealizarPagoComponent } from './caja-content/listar-ordenes-cobro/realizar-pago/realizar-pago.component';
import { RealizarPagoService } from './services/realizar-pago.service';
import { GestionarCajaService } from './services/gestionar-caja.service';

//#endregion

import { DataService } from './../../shared/services/data.service';
import { ModalPdfComponent } from './../../shared/helpers/modal-pdf/modal-pdf.component';
import { BusquedaClienteComponent } from './caja-content/listar-ordenes-cobro/busqueda-cliente/busqueda-cliente.component';
import { ReportCierreCajaService } from './services/report-cierre-caja.service';
import { ReporteCierreCajaComponent } from './caja-content/apertur-cierre-caja/reporte-cierre-caja/reporte-cierre-caja.component';
import { VisComprobanteComponent } from './caja-content/listar-ordenes-cobro/realizar-pago/vis-comprobante/vis-comprobante.component';
import { DetalleOrdenesPagoComponent } from './caja-content/listar-ordenes-cobro/detalle-ordenes-pago/detalle-ordenes-pago.component';
import { ConfirmarDetalleComponent } from './caja-content/listar-ordenes-cobro/confirmar-detalle/confirmar-detalle.component';
import { RealizarPagoComponent } from './caja-content/listar-ordenes-cobro/realizar-pago/realizar-pago.component';
import { PrevisualizarDetalleComponent } from './caja-content/listar-ordenes-cobro/previsualizar-detalle/previsualizar-detalle.component';


import { AperturarCajaComponent } from './caja-content/gestionar-caja/aperturar-caja/aperturar-caja.component';
import { CerrarCajaComponent } from './caja-content/gestionar-caja/cerrar-caja/cerrar-caja.component';
import { CrearCajaComponent } from './caja-content/administrar-caja/crear-caja/crear-caja.component';

@NgModule({
  imports: [
    ModuleModule,
    CajaRoutingModule,
  ],
  declarations: [
    CajaContentComponent, // content
    AperturCierreCajaComponent, // apertur-cierre-caja
    GestionComponent,// gestion
    AdministrarCajaComponent, 
    ListarOrdenesCobroComponent,
    BusquedaClienteComponent,
    RealizarPagoComponent,
    ListarOrdenesCobroComponent, // Listar Ordenes de Cobro
    ReporteCierreCajaComponent, 
    DetalleOrdenesPagoComponent,
    GestionarCajaComponent, //Reporte cierre caja
    VisComprobanteComponent,
    ConfirmarDetalleComponent,
    PrevisualizarDetalleComponent,
    AperturarCajaComponent,
    CerrarCajaComponent, //Reporte cierre caja
    CrearCajaComponent
  ],
  entryComponents: [
    ModalPdfComponent,
    ReporteCierreCajaComponent,
    VisComprobanteComponent,
    BusquedaClienteComponent,
    ConfirmarDetalleComponent,
    RealizarPagoComponent,
    PrevisualizarDetalleComponent,
    ModalConfirmacionComponent,
    AperturarCajaComponent,
    CerrarCajaComponent,
    GestionComponent, AdministrarCajaComponent, // gestion
    ListarOrdenesCobroComponent, CrearCajaComponent
  ],
  providers: [
    GestionService,
    AperturaCierreCajaService,
    DataService,
    ListarOrdenesCobroService,
    AdministrarCajaService,
    RealizarPagoService,
    DataService,
    ReportCierreCajaService,
    CitaService,
    GestionarCajaService,
    AreaService
  ]
})
export class CajaModule { }
