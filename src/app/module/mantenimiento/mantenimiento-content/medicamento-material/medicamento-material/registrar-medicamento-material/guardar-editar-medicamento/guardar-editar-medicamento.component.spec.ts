import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEditarMedicamentoComponent } from './guardar-editar-medicamento.component';

describe('GuardarEditarMedicamentoComponent', () => {
  let component: GuardarEditarMedicamentoComponent;
  let fixture: ComponentFixture<GuardarEditarMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardarEditarMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarEditarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
