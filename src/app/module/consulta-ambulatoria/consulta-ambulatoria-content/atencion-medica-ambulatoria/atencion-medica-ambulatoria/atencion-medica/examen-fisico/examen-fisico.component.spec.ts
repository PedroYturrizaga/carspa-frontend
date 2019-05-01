import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenFisicoComponent } from './examen-fisico.component';

describe('ExamenFisicoComponent', () => {
  let component: ExamenFisicoComponent;
  let fixture: ComponentFixture<ExamenFisicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenFisicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenFisicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
