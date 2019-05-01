import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesTipoComponent } from './examenes-tipo.component';

describe('ExamenesTipoComponent', () => {
  let component: ExamenesTipoComponent;
  let fixture: ComponentFixture<ExamenesTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
