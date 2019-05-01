import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesAlimentacionComponent } from './antecedentes-alimentacion.component';

describe('AntecedentesAlimentacionComponent', () => {
  let component: AntecedentesAlimentacionComponent;
  let fixture: ComponentFixture<AntecedentesAlimentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesAlimentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
