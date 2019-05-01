import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarMedicamentoMaterialComponent } from './solicitar-medicamento-material.component';

describe('SolicitarMedicamentoMaterialComponent', () => {
  let component: SolicitarMedicamentoMaterialComponent;
  let fixture: ComponentFixture<SolicitarMedicamentoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarMedicamentoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarMedicamentoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
