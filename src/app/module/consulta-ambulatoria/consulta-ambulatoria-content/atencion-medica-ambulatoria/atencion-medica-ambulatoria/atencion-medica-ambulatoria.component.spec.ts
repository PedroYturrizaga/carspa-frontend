import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMedicaAmbulatoriaComponent } from './atencion-medica-ambulatoria.component';

describe('AtencionMedicaAmbulatoriaComponent', () => {
  let component: AtencionMedicaAmbulatoriaComponent;
  let fixture: ComponentFixture<AtencionMedicaAmbulatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionMedicaAmbulatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionMedicaAmbulatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
