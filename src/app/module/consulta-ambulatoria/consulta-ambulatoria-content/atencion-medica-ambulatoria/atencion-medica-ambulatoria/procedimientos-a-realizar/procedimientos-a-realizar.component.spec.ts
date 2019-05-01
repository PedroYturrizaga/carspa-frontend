import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosARealizarComponent } from './procedimientos-a-realizar.component';

describe('ProcedimientosARealizarComponent', () => {
  let component: ProcedimientosARealizarComponent;
  let fixture: ComponentFixture<ProcedimientosARealizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosARealizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosARealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
