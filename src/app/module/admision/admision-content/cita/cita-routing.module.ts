// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { CitaComponent } from './cita/cita.component';
// import { AsignarCitaComponent } from './cita/asignar-cita/asignar-cita.component';
// import { CitaVirtualComponent } from './cita/cita-virtual/cita-virtual.component';
// import { ProgramacionesComponent } from './cita/cita-virtual/programaciones/programaciones.component';
// import { AuthGuard } from '../../../../shared/auth/guards/auth.guard';
// import { RoleGuard } from '../../../../shared/auth/guards/role.guard';
// const routes: Routes = [
//   {
//     path: '', component: CitaComponent, children: [
//       { 
//         path: 'asignar-cita', component: AsignarCitaComponent, canLoad: [AuthGuard, RoleGuard]   
//       },
//       {
//         path: 'cita-virtual', component: CitaVirtualComponent, canLoad: [AuthGuard, RoleGuard], children: [
//           { 
//             // path: 'programaciones', component: ProgramacionesComponent, canLoad: [AuthGuard, RoleGuard]   
//           },
//         ]
//       },
//     ]
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CitaRoutingModule { }
