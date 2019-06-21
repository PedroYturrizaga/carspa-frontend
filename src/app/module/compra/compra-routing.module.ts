import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraContentComponent } from './compra-content/compra-content.component';
import { ListarProveedorComponent } from './compra-content/listar-proveedor/listar-proveedor.component';
import { ListarMaterialProveedorComponent } from './compra-content/listar-material-proveedor/listar-material-proveedor.component';
import { DetalleProveedorComponent } from './compra-content/listar-proveedor/detalle-proveedor/detalle-proveedor.component';
import { RegistrarActualizarComponent } from './compra-content/listar-proveedor/registrar-actualizar/registrar-actualizar.component';
import { RegistrarActualizarMpComponent } from './compra-content/listar-proveedor/detalle-proveedor/registrar-actualizar-mp/registrar-actualizar-mp.component';
import { ListarOrdenCompraComponent } from './compra-content/listar-orden-compra/listar-orden-compra.component';
import { OrdenCompraComponent } from './compra-content/orden-compra/orden-compra.component'
// import { GenerarSolicitudComponent } from './compra-content/solicitud-cotizacion/generar-solicitud/generar-solicitud.component';
import { SolicitudCotizacionComponent } from './compra-content/solicitud-cotizacion/solicitud-cotizacion.component';
import { CotizacionesComponent } from './compra-content/cotizaciones/cotizaciones.component';


const routes: Routes = [
  {
    path: '', component: CompraContentComponent, children: [
      {
        path: 'listar-proveedor', component: ListarProveedorComponent, children: [
          {
            path: 'detalle-proveedor', component: DetalleProveedorComponent, children: [
              { path: 'registrar-actualizar-mp', component: RegistrarActualizarMpComponent }
            ]
          }
          ,
          {
            path: 'registrar-actualizar', component: RegistrarActualizarComponent
          }

        ]
      } ,
      {
        path: 'listar-material-proveedor', component: ListarMaterialProveedorComponent
      } ,
      /*{
        path: 'listar-orden-compra', component: ListarOrdenCompraComponent
      },*/
      {
        path:'ordenCompra', component: OrdenCompraComponent
      },
      {
        path: 'solicitarCotizacion', component: SolicitudCotizacionComponent
      },
      {
        path: 'cotizaciones', component: CotizacionesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
