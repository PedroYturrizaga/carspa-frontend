import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProcedimientoComponent } from './registrar-procedimiento.component';

describe('RegistrarProcedimientoComponent', () => {
  let component: RegistrarProcedimientoComponent;
  let fixture: ComponentFixture<RegistrarProcedimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarProcedimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProcedimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
