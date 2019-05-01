import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoIngresoComponent } from './movimiento-ingreso.component';

describe('MovimientoIngresoComponent', () => {
  let component: MovimientoIngresoComponent;
  let fixture: ComponentFixture<MovimientoIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
