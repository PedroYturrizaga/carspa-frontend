import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaLaboratorioComponent } from './cita-laboratorio.component';

describe('CitaLaboratorioComponent', () => {
  let component: CitaLaboratorioComponent;
  let fixture: ComponentFixture<CitaLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaLaboratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
