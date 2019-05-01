import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMedicamentoMaterialComponent } from './registrar-medicamento-material.component';

describe('RegistrarMedicamentoMaterialComponent', () => {
  let component: RegistrarMedicamentoMaterialComponent;
  let fixture: ComponentFixture<RegistrarMedicamentoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarMedicamentoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMedicamentoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
