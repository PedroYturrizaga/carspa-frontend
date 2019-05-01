import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosAnterioresComponent } from './procedimientos-anteriores.component';

describe('ProcedimientosAnterioresComponent', () => {
  let component: ProcedimientosAnterioresComponent;
  let fixture: ComponentFixture<ProcedimientosAnterioresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimientosAnterioresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosAnterioresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
