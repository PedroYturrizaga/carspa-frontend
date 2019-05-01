import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaProcedimientoComponent } from './cita-procedimiento.component';

describe('CitaProcedimientoComponent', () => {
  let component: CitaProcedimientoComponent;
  let fixture: ComponentFixture<CitaProcedimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaProcedimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
