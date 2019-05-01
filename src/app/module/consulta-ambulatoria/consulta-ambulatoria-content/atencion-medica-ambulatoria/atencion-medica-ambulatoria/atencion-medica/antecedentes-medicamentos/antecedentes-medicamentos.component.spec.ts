import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesMedicamentosComponent } from './antecedentes-medicamentos.component';

describe('AntecedentesMedicamentosComponent', () => {
  let component: AntecedentesMedicamentosComponent;
  let fixture: ComponentFixture<AntecedentesMedicamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesMedicamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
