import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionProcedimientoComponent } from './atencion-procedimiento.component';

describe('AtencionProcedimientoComponent', () => {
  let component: AtencionProcedimientoComponent;
  let fixture: ComponentFixture<AtencionProcedimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionProcedimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
