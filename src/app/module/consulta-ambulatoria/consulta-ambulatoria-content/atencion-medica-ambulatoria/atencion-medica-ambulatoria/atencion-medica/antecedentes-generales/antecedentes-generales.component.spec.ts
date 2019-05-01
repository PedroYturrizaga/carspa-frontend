import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesGeneralesComponent } from './antecedentes-generales.component';

describe('AntecedentesGeneralesComponent', () => {
  let component: AntecedentesGeneralesComponent;
  let fixture: ComponentFixture<AntecedentesGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
