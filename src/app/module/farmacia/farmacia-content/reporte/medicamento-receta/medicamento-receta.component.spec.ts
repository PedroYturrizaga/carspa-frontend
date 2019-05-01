import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoRecetaComponent } from './medicamento-receta.component';

describe('MedicamentoRecetaComponent', () => {
  let component: MedicamentoRecetaComponent;
  let fixture: ComponentFixture<MedicamentoRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
