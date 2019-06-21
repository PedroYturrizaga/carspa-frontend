import { CompraService } from './compra-content/services/compra.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraRoutingModule } from './compra-routing.module'
import { CompraContentComponent } from './compra-content/compra-content.component';
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ModuleModule } from '../module.module';
import { RegistrarActualizarComponent } from './compra-content/listar-proveedor/registrar-actualizar/registrar-actualizar.component';
import { InsertarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/insertar-material-proveedor/insertar-material-proveedor.component';
import { DetalleProveedorComponent } from './compra-content/listar-proveedor/detalle-proveedor/detalle-proveedor.component';
import { DataService } from '../../shared/services/data.service';
import { RegistrarActualizarMpComponent } from './compra-content/listar-proveedor/detalle-proveedor/registrar-actualizar-mp/registrar-actualizar-mp.component';
import { ListarOrdenCompraComponent } from './compra-content/listar-orden-compra/listar-orden-compra.component';

import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component';
import { GenerarOcComponent } from './compra-content/orden-compra/generar-oc/generar-oc.component'

import { ModalConfirmacionComponent } from './../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { VisualizarOcComponent } from './compra-content/orden-compra/visualizar-oc/visualizar-oc.component';
import { SolicitudCotizacionComponent } from './compra-content/solicitud-cotizacion/solicitud-cotizacion.component';
import { GenerarSolicitudComponent } from './compra-content/solicitud-cotizacion/generar-solicitud/generar-solicitud.component';
import { RegistrarCotizacionComponent } from './compra-content/solicitud-cotizacion/registrar-cotizacion/registrar-cotizacion.component';
import { CotizacionesComponent } from './compra-content/cotizaciones/cotizaciones.component';
import { GenerarCotizacionComponent } from './compra-content/cotizaciones/generar-cotizacion/generar-cotizacion.component';
import { VerCotizacionComponent } from './compra-content/cotizaciones/ver-cotizacion/ver-cotizacion.component';
import { CotizacionService } from './compra-content/services/cotizacion.service';
import { OrdenCompraService } from './compra-content/services/orden-compra.service';
import { SolicitudCotizacionService } from './compra-content/services/solicitud-cotizacion.service';
import { VerSolicitudComponent } from './compra-content/solicitud-cotizacion/ver-solicitud/ver-solicitud.component';

@NgModule({
  imports: [
    ModuleModule,
    CompraRoutingModule
  ],

  declarations: [
    CompraContentComponent,
    ListarProveedorComponent,
    ListarMaterialProveedorComponent,
    RegistrarActualizarComponent,
    InsertarMaterialProveedorComponent,
    DetalleProveedorComponent,
    RegistrarActualizarMpComponent,
    ListarOrdenCompraComponent,
    OrdenCompraComponent,
    GenerarOcComponent,
    VisualizarOcComponent,
    SolicitudCotizacionComponent,
    GenerarSolicitudComponent,
    RegistrarCotizacionComponent,
    CotizacionesComponent,
    GenerarCotizacionComponent,
    VerCotizacionComponent,
    VerSolicitudComponent
 


  ],

  entryComponents: [
    RegistrarActualizarComponent,
    InsertarMaterialProveedorComponent,
    RegistrarActualizarMpComponent,
    GenerarOcComponent,
    VisualizarOcComponent,
    ModalConfirmacionComponent,
    GenerarSolicitudComponent,
    GenerarCotizacionComponent,
    VerCotizacionComponent,
    VerSolicitudComponent
  ],

  providers: [
    CompraService,
    DataService,
    CotizacionService,
    OrdenCompraService,
    SolicitudCotizacionService
  ]
})
export class CompraModule { }
