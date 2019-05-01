import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoCoberturaComponent } from './medicamento-cobertura.component';

describe('MedicamentoCoberturaComponent', () => {
  let component: MedicamentoCoberturaComponent;
  let fixture: ComponentFixture<MedicamentoCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
