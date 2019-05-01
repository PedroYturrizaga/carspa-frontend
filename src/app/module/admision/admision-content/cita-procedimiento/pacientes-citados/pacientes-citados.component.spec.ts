import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesCitadosComponent } from './pacientes-citados.component';

describe('PacientesCitadosComponent', () => {
  let component: PacientesCitadosComponent;
  let fixture: ComponentFixture<PacientesCitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesCitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesCitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
