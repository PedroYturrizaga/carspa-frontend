import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioMedicamentoComponent } from './convenio-medicamento.component';

describe('ConvenioMedicamentoComponent', () => {
  let component: ConvenioMedicamentoComponent;
  let fixture: ComponentFixture<ConvenioMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenioMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
