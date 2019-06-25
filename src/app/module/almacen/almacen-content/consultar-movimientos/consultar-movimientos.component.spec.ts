import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMovimientosComponent } from './consultar-movimientos.component';

describe('ConsultarMovimientosComponent', () => {
  let component: ConsultarMovimientosComponent;
  let fixture: ComponentFixture<ConsultarMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
