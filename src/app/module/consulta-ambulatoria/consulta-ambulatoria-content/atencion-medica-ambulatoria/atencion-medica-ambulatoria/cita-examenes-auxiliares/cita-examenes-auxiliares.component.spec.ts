import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaExamenesAuxiliaresComponent } from './cita-examenes-auxiliares.component';

describe('CitaExamenesAuxiliaresComponent', () => {
  let component: CitaExamenesAuxiliaresComponent;
  let fixture: ComponentFixture<CitaExamenesAuxiliaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaExamenesAuxiliaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaExamenesAuxiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
