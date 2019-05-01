import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicamentoComponent } from './delete-medicamento.component';

describe('DeleteMedicamentoComponent', () => {
  let component: DeleteMedicamentoComponent;
  let fixture: ComponentFixture<DeleteMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
