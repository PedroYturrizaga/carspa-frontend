import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenesPagoComponent } from './detalle-ordenes-pago.component';

describe('DetalleOrdenesPagoComponent', () => {
  let component: DetalleOrdenesPagoComponent;
  let fixture: ComponentFixture<DetalleOrdenesPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleOrdenesPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleOrdenesPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
