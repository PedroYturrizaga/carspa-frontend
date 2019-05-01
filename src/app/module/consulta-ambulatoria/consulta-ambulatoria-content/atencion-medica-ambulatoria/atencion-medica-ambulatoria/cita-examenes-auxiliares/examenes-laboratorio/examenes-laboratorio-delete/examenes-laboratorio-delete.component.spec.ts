import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesLaboratorioDeleteComponent } from './examenes-laboratorio-delete.component';

describe('ExamenesLaboratorioDeleteComponent', () => {
  let component: ExamenesLaboratorioDeleteComponent;
  let fixture: ComponentFixture<ExamenesLaboratorioDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesLaboratorioDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesLaboratorioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
