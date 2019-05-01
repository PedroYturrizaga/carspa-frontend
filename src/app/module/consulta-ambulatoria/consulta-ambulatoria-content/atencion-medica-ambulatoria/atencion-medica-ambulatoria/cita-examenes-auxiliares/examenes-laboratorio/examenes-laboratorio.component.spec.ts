import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesLaboratorioComponent } from './examenes-laboratorio.component';

describe('ExamenesLaboratorioComponent', () => {
  let component: ExamenesLaboratorioComponent;
  let fixture: ComponentFixture<ExamenesLaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesLaboratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
