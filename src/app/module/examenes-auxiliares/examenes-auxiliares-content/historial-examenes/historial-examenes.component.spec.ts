import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialExamenesComponent } from './historial-examenes.component';

describe('HistorialExamenesComponent', () => {
  let component: HistorialExamenesComponent;
  let fixture: ComponentFixture<HistorialExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
