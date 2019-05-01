import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoMaterialComponent } from './medicamento-material.component';

describe('MedicamentoMaterialComponent', () => {
  let component: MedicamentoMaterialComponent;
  let fixture: ComponentFixture<MedicamentoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
