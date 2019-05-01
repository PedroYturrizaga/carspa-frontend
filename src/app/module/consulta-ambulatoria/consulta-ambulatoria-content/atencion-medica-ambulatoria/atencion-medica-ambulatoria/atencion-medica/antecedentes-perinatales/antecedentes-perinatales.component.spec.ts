import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesPerinatalesComponent } from './antecedentes-perinatales.component';

describe('AntecedentesPerinatalesComponent', () => {
  let component: AntecedentesPerinatalesComponent;
  let fixture: ComponentFixture<AntecedentesPerinatalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesPerinatalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesPerinatalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
