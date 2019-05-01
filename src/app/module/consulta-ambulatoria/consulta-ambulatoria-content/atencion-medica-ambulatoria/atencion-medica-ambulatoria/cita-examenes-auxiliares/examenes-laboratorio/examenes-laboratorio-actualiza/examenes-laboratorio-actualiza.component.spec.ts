import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesLaboratorioActualizaComponent } from './examenes-laboratorio-actualiza.component';

describe('ExamenesLaboratorioActualizaComponent', () => {
  let component: ExamenesLaboratorioActualizaComponent;
  let fixture: ComponentFixture<ExamenesLaboratorioActualizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesLaboratorioActualizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesLaboratorioActualizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
