import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarPagoComponent } from './realizar-pago.component';

describe('RealizarPagoComponent', () => {
  let component: RealizarPagoComponent;
  let fixture: ComponentFixture<RealizarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
