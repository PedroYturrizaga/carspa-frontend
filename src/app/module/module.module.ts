import { ModuleRoutingModule } from './module-routing.module';
import { NgModule } from '@angular/core';

// modules
import { SharedModule } from '../shared/shared.module';

/*directiva para calendar*/
import { CalendarModule } from 'angular-calendar';

/*directiva para manipulacion de componentes bootstrap*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*configuracion material date*/
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { NativeDateAdapter } from '@angular/material';
import { RegistrarActualizarComponent } from './compra/compra-content/administrar-proveedor/registrar-actualizar/registrar-actualizar.component';
// import { CompraModule } from './compra/compra.module';
// import { AlmacenModule } from './almacen/almacen.module';
// import { TerapiaComponent } from './consulta-ambulatoria/consulta-ambulatoria-content/atencion-medica-ambulatoria/atencion-medica-ambulatoria/terapia/terapia.component';

export class CustomDateAdapter extends NativeDateAdapter {
  // format(date: Date, displayFormat: Object): string {
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   return ((date).toLocaleDateString('es-PE', options));
  // }
  // If required extend other NativeDateAdapter methods.
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
  format(date: Date, displayFormat: string): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else if (displayFormat == "inputMonth") {
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(month) + '/' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@NgModule({
  imports: [
    ModuleRoutingModule,
    // CompraModule,
    // AlmacenModule
  ],
  exports: [
    SharedModule,
    CalendarModule,
    MomentDateModule,
    NgbModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  declarations: [
    // TerapiaComponent
  RegistrarActualizarComponent]
})
export class ModuleModule { }
