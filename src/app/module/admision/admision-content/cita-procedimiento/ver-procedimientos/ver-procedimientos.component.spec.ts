import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProcedimientosComponent } from './ver-procedimientos.component';

describe('VerProcedimientosComponent', () => {
  let component: VerProcedimientosComponent;
  let fixture: ComponentFixture<VerProcedimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerProcedimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
