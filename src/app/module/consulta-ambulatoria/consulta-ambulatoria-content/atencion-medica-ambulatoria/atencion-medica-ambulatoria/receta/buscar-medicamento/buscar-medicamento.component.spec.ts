import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMedicamentoComponent } from './buscar-medicamento.component';

describe('BuscarMedicamentoComponent', () => {
  let component: BuscarMedicamentoComponent;
  let fixture: ComponentFixture<BuscarMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
