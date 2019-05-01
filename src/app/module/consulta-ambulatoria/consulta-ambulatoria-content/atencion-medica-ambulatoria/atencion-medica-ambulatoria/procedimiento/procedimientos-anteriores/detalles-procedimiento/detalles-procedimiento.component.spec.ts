import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProcedimientoComponent } from './detalles-procedimiento.component';

describe('DetallesProcedimientoComponent', () => {
  let component: DetallesProcedimientoComponent;
  let fixture: ComponentFixture<DetallesProcedimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesProcedimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
