import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionDeProcedimientosComponent } from './atencion-de-procedimientos.component';

describe('AtencionDeProcedimientosComponent', () => {
  let component: AtencionDeProcedimientosComponent;
  let fixture: ComponentFixture<AtencionDeProcedimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionDeProcedimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionDeProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
