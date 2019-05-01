import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarMedicamentoComponent } from './insertar-medicamento.component';

describe('InsertarMedicamentoComponent', () => {
  let component: InsertarMedicamentoComponent;
  let fixture: ComponentFixture<InsertarMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
