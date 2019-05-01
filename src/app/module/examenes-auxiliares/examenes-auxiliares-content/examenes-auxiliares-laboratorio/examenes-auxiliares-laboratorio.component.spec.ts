import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAuxiliaresLaboratorioComponent } from './examenes-auxiliares-laboratorio.component';

describe('ExamenesAuxiliaresLaboratorioComponent', () => {
  let component: ExamenesAuxiliaresLaboratorioComponent;
  let fixture: ComponentFixture<ExamenesAuxiliaresLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenesAuxiliaresLaboratorioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAuxiliaresLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
