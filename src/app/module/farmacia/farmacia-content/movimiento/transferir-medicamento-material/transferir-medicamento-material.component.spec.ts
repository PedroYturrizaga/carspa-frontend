import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirMedicamentoMaterialComponent } from './transferir-medicamento-material.component';

describe('TransferirMedicamentoMaterialComponent', () => {
  let component: TransferirMedicamentoMaterialComponent;
  let fixture: ComponentFixture<TransferirMedicamentoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferirMedicamentoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirMedicamentoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
