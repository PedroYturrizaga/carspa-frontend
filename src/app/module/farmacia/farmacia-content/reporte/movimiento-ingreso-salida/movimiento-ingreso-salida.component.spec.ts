import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoIngresoSalidaComponent } from './movimiento-ingreso-salida.component';

describe('MovimientoIngresoSalidaComponent', () => {
  let component: MovimientoIngresoSalidaComponent;
  let fixture: ComponentFixture<MovimientoIngresoSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoIngresoSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoIngresoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
