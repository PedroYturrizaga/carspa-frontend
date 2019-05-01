import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisComprobanteComponent } from './vis-comprobante.component';

describe('VisComprobanteComponent', () => {
  let component: VisComprobanteComponent;
  let fixture: ComponentFixture<VisComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
