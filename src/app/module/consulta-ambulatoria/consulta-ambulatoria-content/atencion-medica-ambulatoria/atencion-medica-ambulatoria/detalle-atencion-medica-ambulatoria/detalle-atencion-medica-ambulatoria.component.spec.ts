import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAtencionMedicaAmbulatoriaComponent } from './detalle-atencion-medica-ambulatoria.component';

describe('DetalleAtencionMedicaAmbulatoriaComponent', () => {
  let component: DetalleAtencionMedicaAmbulatoriaComponent;
  let fixture: ComponentFixture<DetalleAtencionMedicaAmbulatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAtencionMedicaAmbulatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAtencionMedicaAmbulatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
