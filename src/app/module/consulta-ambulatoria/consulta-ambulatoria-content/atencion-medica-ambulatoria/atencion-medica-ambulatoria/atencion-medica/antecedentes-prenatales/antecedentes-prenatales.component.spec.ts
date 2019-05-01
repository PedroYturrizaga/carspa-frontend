import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesPrenatalesComponent } from './antecedentes-prenatales.component';

describe('AntecedentesPrenatalesComponent', () => {
  let component: AntecedentesPrenatalesComponent;
  let fixture: ComponentFixture<AntecedentesPrenatalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesPrenatalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesPrenatalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
