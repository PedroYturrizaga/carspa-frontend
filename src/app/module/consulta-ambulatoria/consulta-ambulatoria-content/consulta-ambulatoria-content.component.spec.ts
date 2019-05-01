import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAmbulatoriaContentComponent } from './consulta-ambulatoria-content.component';

describe('ConsultaAmbulatoriaContentComponent', () => {
  let component: ConsultaAmbulatoriaContentComponent;
  let fixture: ComponentFixture<ConsultaAmbulatoriaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAmbulatoriaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAmbulatoriaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
