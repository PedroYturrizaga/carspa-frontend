import { NgModule } from '@angular/core';

// BrowserModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';

// routing
import { AppRoutingModule } from './app-routing.module';

/*directiva para el sidebar principal*/
import { SidebarModule } from 'ng-sidebar';
/*directiva para calendar*/
import { CalendarModule } from 'angular-calendar';
/*toast libreria para mostrar mensajes toast*/
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

/*directiva para manipulacion de componentes bootstrap*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// app-component
import { AppComponent } from './app.component';
// import { ModuleContentComponent } from './module/module-content/module-content.component';
// import { LoginContentComponent } from "./login/login-content/login-content.component";
import { HttpClientModule } from '@angular/common/http';
import { VerActoMedicoService } from './shared/services/ver-acto-medico.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    SidebarModule.forRoot(),
    CalendarModule.forRoot(),
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    VerActoMedicoService
  ]
})
export class AppModule extends ToastOptions {
  maxShown = 3;
  showCloseButton = true;
 }